// ── lib/pdf/compressImages.ts ────────────────────────────────────
// Real image recompression for PDFs, browser-side (and Worker-side).
//
// pdf-lib has no high-level "recompress this image" API, so this walks
// the low-level object model: find Image XObjects, decode the embedded
// JPEG, re-encode at a lower quality/resolution, and swap the object in
// place with PDFContext.assign().
//
// Deliberately scoped to plain baseline JPEG (DCTDecode) images with no
// SMask and no CMYK color space — that covers the dominant case (photo-
// heavy PDFs) without risking corruption of transparency, color-managed
// CMYK output, or less common encodings (CCITTFax/JBIG2/JPXDecode),
// which are left untouched.
//
// Canvas handling is environment-agnostic: uses OffscreenCanvas when
// available (required inside a Web Worker, which has no `document`),
// falling back to a real <canvas> on the main thread in browsers that
// lack OffscreenCanvas (older Safari).

import {
  PDFDocument,
  PDFDict,
  PDFName,
  PDFRawStream,
  PDFRef,
  PDFNumber,
  PDFArray,
} from 'pdf-lib';

export interface CompressOptions {
  /** JPEG re-encode quality, 0–1. */
  quality: number;
  /** Optional cap on the longest side in px — downsamples oversized images. */
  maxDimension?: number;
  /** Skip images smaller than this many bytes — not worth the CPU cost. */
  minSourceBytes?: number;
  onProgress?: (done: number, total: number) => void;
}

export interface CompressResult {
  bytes: Uint8Array;
  imagesFound: number;
  imagesCompressed: number;
  imagesSkipped: number;
  originalSize: number;
  compressedSize: number;
}

type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;

function makeCanvas(width: number, height: number): AnyCanvas {
  if (typeof OffscreenCanvas !== 'undefined') {
    return new OffscreenCanvas(width, height);
  }
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  return c;
}

function getFilterNames(dict: PDFDict): string[] {
  const filter = dict.get(PDFName.of('Filter'));
  if (!filter) return [];
  if (filter instanceof PDFArray) {
    return filter.asArray().map((f) => (f instanceof PDFName ? f.asString() : ''));
  }
  if (filter instanceof PDFName) return [filter.asString()];
  return [];
}

function isNameEqual(obj: unknown, name: string): boolean {
  return obj instanceof PDFName && obj.asString() === `/${name}`;
}

/** Decode raw JPEG bytes into a canvas. Returns null if the environment
 *  can't decode it (corrupt data, unsupported variant like Adobe CMYK JPEG). */
async function decodeJpegToCanvas(bytes: Uint8Array): Promise<AnyCanvas | null> {
  try {
    const blob = new Blob([bytes as BlobPart], { type: 'image/jpeg' });
    const bitmap = await createImageBitmap(blob);
    const canvas = makeCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d') as any;
    if (!ctx) { bitmap.close(); return null; }
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
    return canvas;
  } catch {
    return null;
  }
}

function maybeDownscale(canvas: AnyCanvas, maxDimension?: number): AnyCanvas {
  if (!maxDimension) return canvas;
  const longest = Math.max(canvas.width, canvas.height);
  if (longest <= maxDimension) return canvas;
  const scale = maxDimension / longest;
  const w = Math.max(1, Math.round(canvas.width * scale));
  const h = Math.max(1, Math.round(canvas.height * scale));
  const out = makeCanvas(w, h);
  const ctx = out.getContext('2d') as any;
  ctx.drawImage(canvas as any, 0, 0, w, h);
  return out;
}

async function canvasToJpegBytes(canvas: AnyCanvas, quality: number): Promise<Uint8Array> {
  if ('convertToBlob' in canvas) {
    const blob = await (canvas as OffscreenCanvas).convertToBlob({ type: 'image/jpeg', quality });
    return new Uint8Array(await blob.arrayBuffer());
  }
  return new Promise((resolve, reject) => {
    (canvas as HTMLCanvasElement).toBlob(
      (blob) => {
        if (!blob) { reject(new Error('canvas.toBlob returned null')); return; }
        blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf))).catch(reject);
      },
      'image/jpeg',
      quality
    );
  });
}

/** Collects every unique Image XObject reference across all pages
 *  (dedup by ref — the same logo/background can be reused on many pages). */
function collectImageRefs(pdfDoc: PDFDocument): Map<string, PDFRef> {
  const refs = new Map<string, PDFRef>();
  for (const page of pdfDoc.getPages()) {
    let resources: PDFDict | undefined;
    try {
      resources = page.node.Resources();
    } catch {
      continue;
    }
    if (!resources || !resources.has(PDFName.of('XObject'))) continue;

    let xObjects: PDFDict;
    try {
      xObjects = resources.lookup(PDFName.of('XObject'), PDFDict);
    } catch {
      continue; // malformed Resources — skip this page's images rather than abort
    }

    for (const key of xObjects.keys()) {
      const raw = xObjects.get(key); // NOT dereferenced — we need the ref itself
      if (raw instanceof PDFRef) refs.set(raw.tag, raw);
    }
  }
  return refs;
}

export async function compressPdfImages(
  pdfBytes: Uint8Array,
  opts: CompressOptions
): Promise<CompressResult> {
  const minSourceBytes = opts.minSourceBytes ?? 20_000; // skip tiny icons/thumbnails
  const pdfDoc = await PDFDocument.load(pdfBytes, { updateMetadata: false });
  const context = pdfDoc.context;

  const candidates = collectImageRefs(pdfDoc);
  const total = candidates.size;
  let done = 0;
  let imagesFound = 0, imagesCompressed = 0, imagesSkipped = 0;

  for (const ref of candidates.values()) {
    done++;
    opts.onProgress?.(done, total);

    try {
      const obj = context.lookup(ref);
      if (!(obj instanceof PDFRawStream)) continue;
      const dict = obj.dict;

      const subtype = dict.get(PDFName.of('Subtype'));
      if (!isNameEqual(subtype, 'Image')) continue;
      imagesFound++;

      const filters = getFilterNames(dict);
      const isPlainJpeg = filters.length === 1 && filters[0] === '/DCTDecode';
      const hasSMask = !!dict.get(PDFName.of('SMask')) || !!dict.get(PDFName.of('Mask'));
      const colorSpace = dict.get(PDFName.of('ColorSpace'));
      const isCmyk = isNameEqual(colorSpace, 'DeviceCMYK');

      if (!isPlainJpeg || hasSMask || isCmyk) { imagesSkipped++; continue; }

      const originalBytes = obj.getContents(); // = the JPEG bitstream itself for DCTDecode
      if (originalBytes.length < minSourceBytes) { imagesSkipped++; continue; }

      const decoded = await decodeJpegToCanvas(originalBytes);
      if (!decoded) { imagesSkipped++; continue; } // couldn't decode — leave untouched

      const canvas = maybeDownscale(decoded, opts.maxDimension);
      const newBytes = await canvasToJpegBytes(canvas, opts.quality);

      // Only keep the result if it's actually smaller.
      if (newBytes.length >= originalBytes.length) { imagesSkipped++; continue; }

      dict.set(PDFName.of('Width'), PDFNumber.of(canvas.width));
      dict.set(PDFName.of('Height'), PDFNumber.of(canvas.height));
      dict.set(PDFName.of('Length'), PDFNumber.of(newBytes.length));
      // Filter stays /DCTDecode — unchanged, we only replaced the JPEG payload.

      const newStream = PDFRawStream.of(dict, newBytes);
      context.assign(ref, newStream);
      imagesCompressed++;
    } catch {
      // Any per-image failure (malformed stream, decode error, etc.) is skipped,
      // never aborts the whole document — the rest of the PDF must still save.
      imagesSkipped++;
    }
  }

  const bytes = await pdfDoc.save({ useObjectStreams: true });
  return {
    bytes,
    imagesFound,
    imagesCompressed,
    imagesSkipped,
    originalSize: pdfBytes.byteLength,
    compressedSize: bytes.byteLength,
  };
}

/** Preset levels matching the existing Low/Medium/High UI. */
export const COMPRESS_PRESETS: Record<'low' | 'medium' | 'high', CompressOptions> = {
  low:    { quality: 0.82, maxDimension: undefined },
  medium: { quality: 0.65, maxDimension: 2000 },
  high:   { quality: 0.45, maxDimension: 1400 },
};