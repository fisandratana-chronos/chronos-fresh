// ── lib/pdf/pdfWorker.ts ──────────────────────────────────────────
// Runs all pdf-lib (and now pdf.js render) operations off the main
// thread, so the UI never freezes on large files.
//
// Protocol:
//   in  → { id: string, type: 'merge'|'split'|'compress'|'rotate'|'jpgToPdf'|'pdfToJpg'
//                             |'removePages'|'rearrangePages'|'watermark'|'protect'|'unlock', payload: any }
//   out → { id, kind: 'progress', done: number, total: number, message?: string }
//       | { id, kind: 'done', result: any }
//       | { id, kind: 'error', message: string }
//
// Every 'done' message that carries a large Uint8Array explicitly lists its
// underlying ArrayBuffer in the `transfer` argument to postMessage — moves
// ownership (zero-copy) instead of a synchronous structured-clone copy.

import * as PDFLib from 'pdf-lib';
// @cantoo/pdf-lib is a drop-in, API-compatible fork of pdf-lib that adds
// real PDF encryption/decryption (AES-256 via Web Crypto API) — pdf-lib
// itself has no write support for encryption and only reads unencrypted
// documents. Used ONLY for the protect/unlock tasks below so the rest of
// this worker's behavior (merge/split/compress/rotate/...) is untouched.
// npm install @cantoo/pdf-lib
import { PDFDocument as SecurePDFDocument } from '@cantoo/pdf-lib';
import { compressPdfImages } from './compressImages';

type InMessage =
  | { id: string; type: 'merge'; payload: { files: ArrayBuffer[] } }
  | { id: string; type: 'split'; payload: { file: ArrayBuffer; sets: number[][]; total: number } }
  | { id: string; type: 'compress'; payload: { file: ArrayBuffer; quality: number; maxDimension?: number } }
  | { id: string; type: 'rotate'; payload: { file: ArrayBuffer; idxs: number[]; angle: number } }
  | { id: string; type: 'jpgToPdf'; payload: { images: { ext: string; buffer: ArrayBuffer }[] } }
  | { id: string; type: 'pdfToJpg'; payload: { file: ArrayBuffer; scale: number; baseName: string } }
  | { id: string; type: 'removePages'; payload: { file: ArrayBuffer; removeIdxs: number[] } }
  | { id: string; type: 'rearrangePages'; payload: { file: ArrayBuffer; order: number[] } }
  | { id: string; type: 'watermark'; payload: WatermarkPayload }
  | { id: string; type: 'protect'; payload: { file: ArrayBuffer; userPassword: string; ownerPassword?: string } }
  | { id: string; type: 'unlock'; payload: { file: ArrayBuffer; password: string } };

export type WatermarkPosition = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface WatermarkPayload {
  file: ArrayBuffer;
  mode: 'text' | 'image';
  text?: string;
  fontSize?: number;
  image?: { ext: string; buffer: ArrayBuffer };
  imageScale?: number; // fraction of page width, image mode only, default 0.3
  opacity: number; // 0–1
  position: WatermarkPosition;
  rotation: number; // degrees
}

function post(id: string, msg: object, transfer: Transferable[] = []) {
  (self as any).postMessage({ id, ...msg }, transfer);
}

async function handleMerge({ files }: { files: ArrayBuffer[] }) {
  const { PDFDocument } = PDFLib;
  const merged = await PDFDocument.create();
  for (const buf of files) {
    const src = await PDFDocument.load(buf);
    const pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach((p) => merged.addPage(p));
  }
  return await merged.save();
}

async function handleSplit(
  { file, sets, total }: { file: ArrayBuffer; sets: number[][]; total: number },
  id: string
) {
  const { PDFDocument } = PDFLib;
  const src = await PDFDocument.load(file);
  const outputs: { name: string; bytes: Uint8Array }[] = [];
  for (let i = 0; i < sets.length; i++) {
    post(id, { kind: 'progress', done: i, total: sets.length });
    const out = await PDFDocument.create();
    const cp = await out.copyPages(src, sets[i]);
    cp.forEach((p) => out.addPage(p));
    const name = sets.length === total ? `page_${sets[i][0] + 1}.pdf` : `part_${i + 1}.pdf`;
    outputs.push({ name, bytes: await out.save() });
  }
  return outputs;
}

async function handleCompress(
  { file, quality, maxDimension }: { file: ArrayBuffer; quality: number; maxDimension?: number },
  id: string
) {
  return await compressPdfImages(new Uint8Array(file), {
    quality,
    maxDimension,
    onProgress: (done, total) => post(id, { kind: 'progress', done, total }),
  });
}

async function handleRotate({ file, idxs, angle }: { file: ArrayBuffer; idxs: number[]; angle: number }) {
  const { PDFDocument, degrees } = PDFLib;
  const doc = await PDFDocument.load(file);
  idxs.forEach((i) => {
    const pg = doc.getPage(i);
    pg.setRotation(degrees((pg.getRotation().angle + angle) % 360));
  });
  return { bytes: await doc.save(), rotatedCount: idxs.length };
}

async function handleJpgToPdf({ images }: { images: { ext: string; buffer: ArrayBuffer }[] }) {
  const { PDFDocument } = PDFLib;
  const doc = await PDFDocument.create();
  for (const img of images) {
    const embedded = img.ext === 'png' ? await doc.embedPng(img.buffer) : await doc.embedJpg(img.buffer);
    const { width, height } = embedded.scale(1);
    const page = doc.addPage([width, height]);
    page.drawImage(embedded, { x: 0, y: 0, width, height });
  }
  return await doc.save();
}

async function handleRemovePages({ file, removeIdxs }: { file: ArrayBuffer; removeIdxs: number[] }) {
  const { PDFDocument } = PDFLib;
  const src = await PDFDocument.load(file);
  const total = src.getPageCount();
  const removeSet = new Set(removeIdxs);
  const keepIdxs = Array.from({ length: total }, (_, i) => i).filter((i) => !removeSet.has(i));
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, keepIdxs);
  pages.forEach((p) => out.addPage(p));
  return { bytes: await out.save(), remainingCount: keepIdxs.length };
}

async function handleRearrangePages({ file, order }: { file: ArrayBuffer; order: number[] }) {
  const { PDFDocument } = PDFLib;
  const src = await PDFDocument.load(file);
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, order);
  pages.forEach((p) => out.addPage(p));
  return { bytes: await out.save() };
}

// Positions the watermark's bounding box (w×h) within the page, with a
// fixed margin from the edges for the corner presets.
function watermarkOrigin(pos: WatermarkPosition, pageW: number, pageH: number, w: number, h: number) {
  const margin = 36; // 0.5in
  switch (pos) {
    case 'top-left':     return { x: margin, y: pageH - h - margin };
    case 'top-right':    return { x: pageW - w - margin, y: pageH - h - margin };
    case 'bottom-left':  return { x: margin, y: margin };
    case 'bottom-right': return { x: pageW - w - margin, y: margin };
    case 'center':
    default:             return { x: (pageW - w) / 2, y: (pageH - h) / 2 };
  }
}

async function handleWatermark(payload: WatermarkPayload) {
  const { PDFDocument, StandardFonts, rgb, degrees } = PDFLib;
  const doc = await PDFDocument.load(payload.file);
  const pages = doc.getPages();

  let font: Awaited<ReturnType<typeof doc.embedFont>> | undefined;
  let image: Awaited<ReturnType<typeof doc.embedJpg>> | undefined;
  if (payload.mode === 'text') {
    font = await doc.embedFont(StandardFonts.HelveticaBold);
  } else if (payload.mode === 'image' && payload.image) {
    image = payload.image.ext === 'png'
      ? await doc.embedPng(payload.image.buffer)
      : await doc.embedJpg(payload.image.buffer);
  }

  for (const page of pages) {
    const { width: pageW, height: pageH } = page.getSize();

    if (payload.mode === 'text' && font && payload.text) {
      const fontSize = payload.fontSize ?? 48;
      const textWidth = font.widthOfTextAtSize(payload.text, fontSize);
      const textHeight = font.heightAtSize(fontSize);
      const { x, y } = watermarkOrigin(payload.position, pageW, pageH, textWidth, textHeight);
      page.drawText(payload.text, {
        x, y, size: fontSize, font,
        color: rgb(0.5, 0.5, 0.5),
        opacity: payload.opacity,
        rotate: degrees(payload.rotation),
      });
    } else if (payload.mode === 'image' && image) {
      const targetW = pageW * (payload.imageScale ?? 0.3);
      const scale = targetW / image.width;
      const w = targetW;
      const h = image.height * scale;
      const { x, y } = watermarkOrigin(payload.position, pageW, pageH, w, h);
      page.drawImage(image, { x, y, width: w, height: h, opacity: payload.opacity, rotate: degrees(payload.rotation) });
    }
  }

  return { bytes: await doc.save() };
}

// Protect/unlock use @cantoo/pdf-lib (SecurePDFDocument) instead of pdf-lib,
// since only that fork can write encryption or read a password-protected
// source file. See the import comment above for why.
async function handleProtect({ file, userPassword, ownerPassword }: {
  file: ArrayBuffer; userPassword: string; ownerPassword?: string;
}) {
  const doc = await SecurePDFDocument.load(file);
  doc.encrypt({
    userPassword,
    ownerPassword: ownerPassword || userPassword,
    permissions: { printing: 'highResolution' },
  });
  return { bytes: await doc.save() };
}

async function handleUnlock({ file, password }: { file: ArrayBuffer; password: string }) {
  // Throws if the password is wrong — surfaced to the UI as a 'error' message
  // and mapped to a friendly string in friendlyError() on the client side.
  const doc = await SecurePDFDocument.load(file, { password });
  // No .encrypt() call before save() → the output PDF is unencrypted.
  return { bytes: await doc.save() };
}

async function handlePdfToJpg(
  { file, scale, baseName }: { file: ArrayBuffer; scale: number; baseName: string },
  id: string
) {
  const pdfjsLib = await import('pdfjs-dist');
  // We're already off the main UI thread inside this dedicated Worker, so
  // pdf.js's own nested worker isn't needed — spawning one from inside a
  // Worker isn't reliably supported anyway, so we simply don't set
  // GlobalWorkerOptions.workerSrc and let pdf.js fall back to running
  // parsing on this same thread automatically.
  const doc = await pdfjsLib.getDocument({ data: file }).promise;
  const outputs: { name: string; bytes: Uint8Array }[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    post(id, { kind: 'progress', done: i - 1, total: doc.numPages });
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = new OffscreenCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d') as any;
    await page.render({ canvas: canvas as any, canvasContext: ctx, viewport }).promise;
    const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.92 });
    const bytes = new Uint8Array(await blob.arrayBuffer());
    outputs.push({
      name: doc.numPages === 1 ? `${baseName}.jpg` : `${baseName}_page${i}.jpg`,
      bytes,
    });
  }
  return outputs;
}

self.onmessage = async (e: MessageEvent<InMessage>) => {
  const { id, type, payload } = e.data;
  try {
    switch (type) {
      case 'merge': {
        const bytes = await handleMerge(payload);
        post(id, { kind: 'done', result: { bytes } }, [bytes.buffer]);
        break;
      }
      case 'split': {
        const outputs = await handleSplit(payload, id);
        post(id, { kind: 'done', result: { outputs } }, outputs.map((o) => o.bytes.buffer));
        break;
      }
      case 'compress': {
        const result = await handleCompress(payload, id);
        post(id, { kind: 'done', result }, [result.bytes.buffer]);
        break;
      }
      case 'rotate': {
        const result = await handleRotate(payload);
        post(id, { kind: 'done', result }, [result.bytes.buffer]);
        break;
      }
      case 'jpgToPdf': {
        const bytes = await handleJpgToPdf(payload);
        post(id, { kind: 'done', result: { bytes } }, [bytes.buffer]);
        break;
      }
      case 'removePages': {
        const result = await handleRemovePages(payload);
        post(id, { kind: 'done', result }, [result.bytes.buffer]);
        break;
      }
      case 'rearrangePages': {
        const result = await handleRearrangePages(payload);
        post(id, { kind: 'done', result }, [result.bytes.buffer]);
        break;
      }
      case 'watermark': {
        const result = await handleWatermark(payload);
        post(id, { kind: 'done', result }, [result.bytes.buffer]);
        break;
      }
      case 'protect': {
        const result = await handleProtect(payload);
        post(id, { kind: 'done', result }, [result.bytes.buffer]);
        break;
      }
      case 'unlock': {
        const result = await handleUnlock(payload);
        post(id, { kind: 'done', result }, [result.bytes.buffer]);
        break;
      }
      case 'pdfToJpg': {
        const outputs = await handlePdfToJpg(payload, id);
        post(id, { kind: 'done', result: { outputs } }, outputs.map((o) => o.bytes.buffer));
        break;
      }
      default:
        post(id, { kind: 'error', message: `Unknown task type: ${type}` });
    }
  } catch (err: any) {
    post(id, { kind: 'error', message: String(err?.message || err) });
  }
};

export {}; // keep this file a module
