// ── lib/pdf/usePdfWorker.ts ───────────────────────────────────────
// Client-side wrapper around pdfWorker.ts. Spawns a fresh worker per
// task (simple, avoids message-routing bugs for a UI where one
// operation runs at a time) and terminates it when done.

export type PdfWorkerType =
  | 'merge' | 'split' | 'compress' | 'rotate' | 'jpgToPdf' | 'pdfToJpg'
  | 'removePages' | 'rearrangePages' | 'watermark' | 'protect' | 'unlock';

export function runPdfWorkerTask<T = any>(
  type: PdfWorkerType,
  payload: any,
  transfer: Transferable[],
  onProgress?: (done: number, total: number) => void
): Promise<T> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./pdfWorker.ts', import.meta.url));
    const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const cleanup = () => worker.terminate();

    worker.onmessage = (e: MessageEvent<any>) => {
      if (e.data.id !== id) return;
      if (e.data.kind === 'progress') {
        onProgress?.(e.data.done, e.data.total);
      } else if (e.data.kind === 'done') {
        cleanup();
        resolve(e.data.result as T);
      } else if (e.data.kind === 'error') {
        cleanup();
        reject(new Error(e.data.message));
      }
    };

    worker.onerror = (err) => {
      cleanup();
      reject(err.error || new Error(err.message || 'Worker error'));
    };

    worker.postMessage({ id, type, payload }, transfer);
  });
}