// ── lib/pdf/pdfWorker.ts ──────────────────────────────────────────
// Runs all pdf-lib (and now pdf.js render) operations off the main
// thread, so the UI never freezes on large files.
//
// Protocol:
//   in  → { id: string, type: 'merge'|'split'|'compress'|'rotate'|'jpgToPdf'|'pdfToJpg', payload: any }
//   out → { id, kind: 'progress', done: number, total: number, message?: string }
//       | { id, kind: 'done', result: any }
//       | { id, kind: 'error', message: string }
//
// Every 'done' message that carries a large Uint8Array explicitly lists its
// underlying ArrayBuffer in the `transfer` argument to postMessage — moves
// ownership (zero-copy) instead of a synchronous structured-clone copy.

import * as PDFLib from 'pdf-lib';
import { compressPdfImages } from './compressImages';

type InMessage =
  | { id: string; type: 'merge'; payload: { files: ArrayBuffer[] } }
  | { id: string; type: 'split'; payload: { file: ArrayBuffer; sets: number[][]; total: number } }
  | { id: string; type: 'compress'; payload: { file: ArrayBuffer; quality: number; maxDimension?: number } }
  | { id: string; type: 'rotate'; payload: { file: ArrayBuffer; idxs: number[]; angle: number } }
  | { id: string; type: 'jpgToPdf'; payload: { images: { ext: string; buffer: ArrayBuffer }[] } }
  | { id: string; type: 'pdfToJpg'; payload: { file: ArrayBuffer; scale: number; baseName: string } };

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
