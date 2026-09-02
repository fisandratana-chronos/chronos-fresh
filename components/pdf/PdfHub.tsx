'use client'

// ── components/pdf/PdfHub.tsx ──────────────────────────────────
// Redesigned shell: CHRONOS dark UI (sidebar layout, Cormorant Garamond
// display type, amber accent, trust badges) — all tab logic unchanged.
//
// All 8 tabs run fully in-browser, no server engine:
// Merge, Split, Compress, Rotate, JPG→PDF (pdf-lib), and
// PDF→JPG, PDF→Word, PDF→Excel (pdfjs-dist, dynamically imported
// only inside these 3 tabs).

import React from 'react'
import * as PDFLib from 'pdf-lib'
import { useLang } from '../../lib/hooks/useLang'
import { BP } from '../../lib/breakpoints'
import { PDF_SEO_CONTENT } from '../../lib/pdfSeoContent'
import { compressPdfImages, COMPRESS_PRESETS } from '../../lib/pdf/compressImages'
import { runPdfWorkerTask } from '../../lib/pdf/usePdfWorker';

// ── Theme tokens — CHRONOS design system ──

const C = {
  bg:      "#090b0f",
  panel:   "#11161d",
  panel2:  "#171d26",
  border:  "#28313d",
  text:    "#f5f2eb",
  muted:   "#8b94a1",
  accent:  "#06B6D4",   // cyan — itovizana amin'ny Converters/Calculators (CHRONOS brand accent)
  hot:     "#ff6b55",   // coral/red
  green:   "#63d39b",
  err:     "#ff6b55",
  warn:    "#f2a63b",
};

// Fonts injected once via a <style> tag inside the component
const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
`;

// Mobile breakpoint rules. Inline styles below have higher specificity than
// plain selectors, so these use !important to override at ≤880px / ≤560px.
const RESPONSIVE_STYLE = `
  @media (max-width: ${BP.tablet}px) {
    .chronos-shell { grid-template-columns: 1fr !important; }
    .chronos-sidebar {
      border-right: none !important;
      border-bottom: 1px solid ${C.border};
      padding: 12px !important;
    }
    .chronos-sidebar-groups {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      overflow-x: auto !important;
      gap: 18px !important;
      -webkit-overflow-scrolling: touch;
    }
    .chronos-sidebar-groups > div { margin-top: 0 !important; flex: 0 0 auto; }
    .chronos-sidebar-groups button { white-space: nowrap; }
    .chronos-privacy-badge { display: none !important; }
    .chronos-main { width: 100% !important; padding: 16px 16px 40px !important; }
    .chronos-hero-title { font-size: 34px !important; }
    .chronos-hero-row { flex-wrap: wrap; gap: 10px; }
    .chronos-trust-badges { flex-wrap: wrap !important; gap: 16px !important; }
    .chronos-tool-grid { grid-template-columns: 1fr !important; }
    .chronos-related-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: ${BP.mobile}px) {
    .chronos-related-grid { grid-template-columns: 1fr !important; }
    .chronos-hero-title { font-size: 28px !important; }
  }
`;

// ── Tab configuration ──

const PDF_TABS = [
  { id: "merge",     icon: "▧",  en: "Merge PDF",    fr: "Fusionner PDF",    group: "popular",  enDesc: "Combine multiple PDFs into one",        frDesc: "Combiner plusieurs PDF en un seul" },
  { id: "split",     icon: "✂",  en: "Split PDF",    fr: "Diviser PDF",      group: "popular",  enDesc: "Extract pages or split by range",       frDesc: "Extraire des pages ou diviser par plage" },
  { id: "compress",  icon: "⇣",  en: "Compress PDF", fr: "Compresser PDF",   group: "popular",  enDesc: "Reduce PDF file size",                  frDesc: "Réduire la taille du fichier PDF" },
  { id: "jpg2pdf",   icon: "▣",  en: "JPG → PDF",    fr: "JPG → PDF",        group: "convert",  enDesc: "Convert images to PDF",                 frDesc: "Convertir des images en PDF" },
  { id: "pdf2jpg",   icon: "▤",  en: "PDF → JPG",    fr: "PDF → JPG",        group: "convert",  enDesc: "Convert PDF pages to images",           frDesc: "Convertir les pages PDF en images" },
  { id: "pdf2word",  icon: "W",  en: "PDF → Word",   fr: "PDF → Word",       group: "convert",  enDesc: "Extract text content from PDF",         frDesc: "Extraire le contenu texte d'un PDF" },
  { id: "pdf2excel", icon: "X",  en: "PDF → Excel",  fr: "PDF → Excel",      group: "convert",  enDesc: "Extract tables from PDF",               frDesc: "Extraire les tableaux d'un PDF" },
  { id: "rotate",    icon: "↻",  en: "Rotate PDF",   fr: "Pivoter PDF",      group: "other",    enDesc: "Rotate pages 90°, 180° or 270°",       frDesc: "Faire pivoter les pages 90°, 180° ou 270°" },
];

const GROUPS = [
  { key: "popular", en: "Popular",  fr: "Populaires" },
  { key: "convert", en: "Convert",  fr: "Convertir"  },
  { key: "other",   en: "Other",    fr: "Autres"     },
];

// ── Shared style helpers ──

const s = {
  // File row inside the queue
  fileRow: {
    display: "grid",
    gridTemplateColumns: "22px 35px 1fr auto 18px",
    gap: 10,
    alignItems: "center",
    padding: "9px 10px",
    marginTop: 6,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    background: C.panel2,
  } as React.CSSProperties,

  pdfBadge: {
    width: 33, height: 37, borderRadius: 5,
    background: "#d84b43",
    display: "grid", placeItems: "center",
    fontSize: 9, fontWeight: 700, color: "#fff",
  } as React.CSSProperties,

  // Primary CTA button
  cta: (disabled = false) => ({
    width: "100%", height: 42, border: 0, borderRadius: 9,
    background: disabled
      ? "#2a3040"
      : `linear-gradient(135deg, ${C.hot}, ${C.accent})`,
    color: disabled ? C.muted : "#17110b",
    fontWeight: 700, fontSize: 13, cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "opacity .15s",
  } as React.CSSProperties),

  // Secondary / outline button
  outline: {
    border: `1px solid ${C.border}`, borderRadius: 8,
    background: "transparent", color: C.muted,
    padding: "6px 12px", fontSize: 12, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  } as React.CSSProperties,

  // Toggle pill (split / rotate mode selector)
  pill: (active: boolean) => ({
    border: `1px solid ${active ? C.accent : C.border}`,
    borderRadius: 8, background: active ? `${C.accent}18` : "transparent",
    color: active ? C.accent : C.muted,
    padding: "7px 14px", fontSize: 12, fontWeight: 700,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
  } as React.CSSProperties),

  input: {
    width: "100%", height: 38,
    border: `1px solid #303946`, borderRadius: 8,
    background: "#0e1319", color: C.text,
    padding: "0 10px", fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
  } as React.CSSProperties,

  label: {
    display: "block", color: C.muted, fontSize: 9,
    letterSpacing: "0.1em", textTransform: "uppercase" as const,
    marginBottom: 5,
  } as React.CSSProperties,
};

// ── Shared UI components ──

function PdfDropZone({ accept, multiple, onFiles, label, hint, maxSizeMB = 100, lang = "en" }: {
  accept?: string[], multiple?: boolean,
  onFiles: (f: File[]) => void,
  label: string, hint: string,
  maxSizeMB?: number, lang?: string,
}) {
  const [drag, setDrag] = React.useState(false);
  const [sizeError, setSizeError] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLInputElement>(null);
  const maxBytes = maxSizeMB * 1024 * 1024;
  const handle = (files: FileList) => {
    const matched = Array.from(files).filter((f): f is File =>
      !accept || accept.some(ext => f.name.toLowerCase().endsWith(ext))
    );
    const ok = matched.filter(f => f.size <= maxBytes);
    const tooBig = matched.filter(f => f.size > maxBytes);

    if (tooBig.length) {
      const names = tooBig.map(f => f.name).join(", ");
      setSizeError(
        lang === "fr"
          ? `${tooBig.length > 1 ? "Fichiers trop volumineux" : "Fichier trop volumineux"} (max ${maxSizeMB} MB) : ${names}`
          : `${tooBig.length > 1 ? "Files" : "File"} over ${maxSizeMB} MB, skipped: ${names}`
      );
    } else {
      setSizeError(null);
    }
    if (ok.length) onFiles(ok);
  };
  return (
    <div>
    <div
      onClick={() => ref.current?.click()}
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files); }}
      style={{
        height: 220,
        border: `1px dashed ${drag ? C.accent : "#3a4655"}`,
        borderRadius: 16,
        background: drag
          ? `radial-gradient(circle at center,${C.accent}10,transparent 60%),${C.panel}`
          : `radial-gradient(circle at center,${C.accent}07,transparent 58%),#11161e`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", cursor: "pointer",
        transition: "all .2s",
        transform: drag ? "translateY(-1px)" : "none",
      }}>
      <input ref={ref} type="file" accept={accept?.join(",")} multiple={multiple}
        style={{ display: "none" }} onChange={e => handle(e.target.files!)} />
      <div style={{
        width: 50, height: 50, border: `1px solid #3a4653`,
        borderRadius: 14, background: "#1a2029",
        display: "grid", placeItems: "center",
        color: C.accent, fontSize: 22, marginBottom: 12,
      }}>↥</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 26, color: C.text, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>{hint}</div>
      <button
        onClick={e => { e.stopPropagation(); ref.current?.click(); }}
        style={{
          border: 0, borderRadius: 9, padding: "10px 18px",
          background: C.accent, color: "#17120a",
          fontSize: 12, fontWeight: 700, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}>
        ▱ &nbsp; Choose files
      </button>
      <small style={{ fontSize: 9, color: "#626d79", marginTop: 10 }}>
        {accept?.join(" · ").toUpperCase()} · {lang === "fr" ? `Jusqu'à ${maxSizeMB} MB chacun` : `Up to ${maxSizeMB} MB each`}
      </small>
    </div>
    {sizeError && (
      <div style={{
        marginTop: 8, padding: "8px 12px",
        border: `1px solid ${C.hot}44`, background: `${C.hot}12`,
        borderRadius: 8, color: C.hot, fontSize: 11,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        ⚠ &nbsp; {sizeError}
      </div>
    )}
    </div>
  );
}

function PdfFileList({ files, onRemove, onMoveUp, onMoveDown }: {
  files: File[],
  onRemove?: (i: number) => void,
  onMoveUp?: (i: number) => void,
  onMoveDown?: (i: number) => void,
}) {
  const fmtSize = (b: number) => b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(2) + " MB";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Your files ({files.length})</span>
        {onRemove && (
          <button onClick={() => files.forEach((_, i) => onRemove(i))}
            style={{ border: 0, background: "none", color: C.hot, fontSize: 10, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
            Clear all
          </button>
        )}
      </div>
      {files.map((f, i) => (
        <div key={i} style={s.fileRow} draggable>
          <span style={{ color: "#697381", fontSize: 14, cursor: "grab" }}>⋮⋮</span>
          <div style={s.pdfBadge}>PDF</div>
          <div>
            <div style={{ fontSize: 11, color: C.text }}>{f.name}</div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{fmtSize(f.size)}</div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {onMoveUp && i > 0 && (
              <button onClick={() => onMoveUp(i)} style={s.outline}>↑</button>
            )}
            {onMoveDown && i < files.length - 1 && (
              <button onClick={() => onMoveDown(i)} style={s.outline}>↓</button>
            )}
          </div>
          {onRemove && (
            <button onClick={() => onRemove(i)}
              style={{ border: 0, background: "none", color: C.muted, cursor: "pointer", fontSize: 14, padding: 0 }}>
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function SingleFileRow({ file, onClear }: { file: File, onClear: () => void }) {
  const fmtSize = (b: number) => (b / 1048576).toFixed(2) + " MB";
  return (
    <div style={{ ...s.fileRow, gridTemplateColumns: "35px 1fr auto" }}>
      <div style={s.pdfBadge}>PDF</div>
      <div>
        <div style={{ fontSize: 12, color: C.text }}>{file.name}</div>
        <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{fmtSize(file.size)}</div>
      </div>
      <button onClick={onClear} style={s.outline}>Change</button>
    </div>
  );
}

function PdfStatus({ status, message }: { status: string | null, message: string }) {
  if (!status) return null;
  const color = status === "ok" ? C.green : status === "err" ? C.hot : C.accent;
  const icon = status === "ok" ? "✓" : status === "err" ? "✕" : "⏳";
  return (
    <div style={{
      background: `${color}12`,
      border: `1px solid ${color}44`,
      borderRadius: 9, padding: "10px 14px",
      fontSize: 12, color, fontWeight: 600,
      display: "flex", alignItems: "center", gap: 8,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <span style={{ fontSize: 14 }}>{icon}</span> {message}
    </div>
  );
}

function pdfDownload(bytes: Uint8Array, name: string) {
  const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" }));
  const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

function fileDownload(content: Blob | string, name: string, mime: string) {
  const url = URL.createObjectURL(content instanceof Blob ? content : new Blob([content], { type: mime }));
  const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

async function loadPdfJs() {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  return pdfjsLib;
}
async function loadJSZip() {
  const { default: JSZip } = await import('jszip');
  return JSZip;
}

// Map raw pdf-lib / pdfjs error text to a friendly, on-brand, bilingual message.
function friendlyError(e: any, lang: string): string {
  const raw = String(e?.message || e || "");
  const low = raw.toLowerCase();
  if (low.includes("encrypt") || low.includes("password")) {
    return lang === "fr"
      ? "Ce PDF est protégé par mot de passe — retirez la protection avant de continuer."
      : "This PDF is password-protected — remove the protection before continuing.";
  }
  if (low.includes("invalid") || low.includes("corrupt") || low.includes("parse") || low.includes("structure")) {
    return lang === "fr"
      ? "Ce fichier semble corrompu ou n'est pas un PDF valide."
      : "This file looks corrupted or isn't a valid PDF.";
  }
  if (low.includes("memory") || low.includes("alloc")) {
    return lang === "fr"
      ? "Le fichier est trop volumineux pour être traité dans le navigateur."
      : "This file is too large to process in the browser.";
  }
  return lang === "fr"
    ? "Une erreur est survenue. Vérifiez le fichier et réessayez."
    : "Something went wrong. Check the file and try again.";
}

// ── How it works card ──

function HowItWorksCard({ steps, tip, lang }: {
  steps: { en: string, fr: string, descEn: string, descFr: string }[],
  tip?: { en: string, fr: string },
  lang: string,
}) {
  return (
    <div style={{
      border: `1px solid ${C.border}`, borderRadius: 14,
      background: `linear-gradient(#151a22, #11161d)`, overflow: "hidden",
    }}>
      <div style={{
        padding: "12px 16px", borderBottom: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>
          {lang === "fr" ? "Comment ça marche" : "How it works"}
        </span>
        <span style={{ fontSize: 10, color: C.muted }}>{steps.length} {lang === "fr" ? "étapes" : "steps"}</span>
      </div>
      <div style={{ padding: "4px 16px 14px" }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "11px 0" }}>
            <span style={{
              width: 23, height: 23, flexShrink: 0,
              border: `1px solid #4b5664`, borderRadius: "50%",
              display: "grid", placeItems: "center",
              color: C.accent, fontSize: 10,
            }}>{i + 1}</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>
                {lang === "fr" ? step.fr : step.en}
              </div>
              <div style={{ fontSize: 9, color: "#747e8a", marginTop: 3 }}>
                {lang === "fr" ? step.descFr : step.descEn}
              </div>
            </div>
          </div>
        ))}
        {tip && (
          <div style={{
            padding: "10px 11px", border: `1px solid #3b3427`,
            background: `${C.accent}06`, borderRadius: 9,
            color: "#9f9887", fontSize: 9,
          }}>
            <span style={{ color: C.accent, fontWeight: 700, display: "block", marginBottom: 3 }}>
              💡 {lang === "fr" ? "Conseil" : "Tip"}
            </span>
            {lang === "fr" ? tip.fr : tip.en}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Deep SEO content — What is it / How it works / Examples / FAQ ──
// Rendered below the tool panel for each tab, mirroring the pattern
// used in NET_HUB (components/network/NetworkHub.tsx), but styled
// with PdfHub's own tokens (C, Cormorant Garamond + DM Sans) instead
// of Network Hub's font stack, to stay visually consistent with the
// rest of this component.

function PdfFaqItem({ q, a, last }: { q: string, a: string, last?: boolean }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: last ? "none" : `1px solid ${C.border}` }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 12, padding: "13px 0", background: "transparent", border: "none",
        cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif",
      }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{q}</span>
        <span style={{
          color: C.muted, fontSize: 13, flexShrink: 0,
          transform: open ? "rotate(180deg)" : "none", transition: "transform .15s",
        }}>▾</span>
      </button>
      {open && (
        <p style={{ fontSize: 12.5, color: "#9aa3ae", lineHeight: 1.7, margin: "0 0 15px", fontFamily: "'DM Sans', sans-serif" }}>
          {a}
        </p>
      )}
    </div>
  );
}

function PdfSeoContent({ toolId, lang }: { toolId: string, lang: string }) {
  const content = PDF_SEO_CONTENT[toolId];
  if (!content) return null;

  const getText = (field: "title" | "what" | "how") =>
    lang === "fr" ? (content as any)[`fr${field.charAt(0).toUpperCase()}${field.slice(1)}`] : content[field];
  const examples = lang === "fr" ? content.frExamples : content.examples;
  const faq = lang === "fr" ? content.frFaq : content.faq;

  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 22,
      color: C.text, marginBottom: 10, marginTop: 26, lineHeight: 1.3,
    }}>
      {children}
    </h2>
  );
  const P = ({ children }: { children: React.ReactNode }) => (
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: C.muted, lineHeight: 1.75, margin: 0 }}>
      {children}
    </p>
  );

  return (
    <article style={{
      marginTop: 26, padding: "26px 24px",
      border: `1px solid ${C.border}`, borderRadius: 16,
      background: `linear-gradient(#131820, ${C.panel})`,
    }}>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 27,
        color: C.text, marginBottom: 12, lineHeight: 1.2,
      }}>
        {getText("title")}
      </h1>

      <H2>{lang === "fr" ? "Qu'est-ce que c'est ?" : "What is it?"}</H2>
      <P>{getText("what")}</P>

      <H2>{lang === "fr" ? "Comment ça marche" : "How it works"}</H2>
      <P>{getText("how")}</P>

      {examples?.length > 0 && (
        <>
          <H2>{lang === "fr" ? "Exemples" : "Examples"}</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {examples.map((ex, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "10px 14px", background: C.panel2,
                borderRadius: 9, border: `1px solid ${C.border}`,
              }}>
                <span style={{ fontSize: 10, color: C.accent, fontWeight: 700, flexShrink: 0, paddingTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: C.text, display: "block", marginBottom: 2 }}>
                    {ex.label}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9aa3ae" }}>
                    {ex.input}
                    <span style={{ margin: "0 6px" }}>→</span>
                    <span style={{ color: C.green, fontWeight: 500 }}>{ex.result}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {faq?.length > 0 && (
        <>
          <H2>{lang === "fr" ? "Questions fréquentes" : "Frequently asked questions"}</H2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {faq.map((item, i) => (
              <PdfFaqItem key={i} q={item.q} a={item.a} last={i === faq.length - 1} />
            ))}
          </div>
        </>
      )}
    </article>
  );
}

// ── Tool tabs (logic unchanged, UI refreshed) ──

function PdfMergeTab({ lang }: { lang: string }) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [outName, setOutName] = React.useState("merged.pdf");
  const [st, setSt] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState("");
  const add = (f: File[]) => setFiles(p => [...p, ...f]);
  const remove = (i: number) => setFiles(p => p.filter((_, j) => j !== i));
  const up = (i: number) => setFiles(p => { const a = [...p]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a; });
  const dn = (i: number) => setFiles(p => { const a = [...p]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a; });
  const run = async () => {
    if (files.length < 2) return;
    setSt("loading"); setMsg(lang === "fr" ? "Fusion en cours…" : "Merging PDFs…");
    try {
      const { PDFDocument } = PDFLib;
      const merged = await PDFDocument.create();
      for (const f of files) {
        const src = await PDFDocument.load(await f.arrayBuffer());
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach(p => merged.addPage(p));
      }
      pdfDownload(await merged.save(), outName || "merged.pdf");
      setSt("ok"); setMsg(lang === "fr" ? `${files.length} fichiers fusionnés !` : `Merged ${files.length} files!`);
    } catch (e: any) { setSt("err"); setMsg(friendlyError(e, lang)); }
  };

  return (
    <div className="chronos-tool-grid" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 14 }}>
      {/* Left column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <PdfDropZone
          accept={[".pdf"]} multiple onFiles={add} lang={lang}
          label={lang === "fr" ? "Déposez vos fichiers PDF" : "Drop your PDF files here"}
          hint={lang === "fr" ? "ou cliquez pour parcourir" : "or click to browse your files"}
        />
        {files.length > 0 && (
          <div style={{
            border: `1px solid ${C.border}`, borderRadius: 14,
            background: C.panel, padding: 13,
          }}>
            <PdfFileList files={files} onRemove={remove} onMoveUp={up} onMoveDown={dn} />
          </div>
        )}
        <PdfStatus status={st} message={msg} />
      </div>

      {/* Right column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <HowItWorksCard lang={lang} steps={[
          { en: "Add 2 or more PDF files", fr: "Ajoutez 2 fichiers PDF ou plus", descEn: "Drag & drop or choose your files", descFr: "Glissez-déposez ou choisissez vos fichiers" },
          { en: "Arrange the order", fr: "Ordonnez les fichiers", descEn: "Drag to reorder your PDFs", descFr: "Faites glisser pour réorganiser" },
          { en: "Merge and download", fr: "Fusionner et télécharger", descEn: "Get a single PDF file", descFr: "Obtenez un seul fichier PDF" },
        ]} tip={{ en: "Change the order by dragging the files.", fr: "Changez l'ordre en faisant glisser les fichiers." }} />

        {/* Output card */}
        <div style={{
          border: `1px solid ${C.border}`, borderRadius: 14,
          background: `linear-gradient(#151a22, #11161d)`, overflow: "hidden",
        }}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Output</span>
          </div>
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <label style={s.label}>{lang === "fr" ? "NOM DU FICHIER" : "FILE NAME"}</label>
              <input value={outName} onChange={e => setOutName(e.target.value)} style={s.input} />
            </div>
            <button onClick={run} disabled={files.length < 2} style={s.cta(files.length < 2)}>
              ⌘ &nbsp; {lang === "fr" ? "Fusionner les PDF" : "Merge PDFs"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PdfSplitTab({ lang }: { lang: string }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [count, setCount] = React.useState(0);
  const [mode, setMode] = React.useState("all");
  const [ranges, setRanges] = React.useState("");
  const [st, setSt] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState("");
  const load = async ([f]: File[]) => {
    setFile(f);
    const { PDFDocument } = PDFLib;
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setCount(doc.getPageCount()); setSt(null);
  };
  const run = async () => {
    setSt("loading"); setMsg(lang === "fr" ? "Division en cours…" : "Splitting…");
    try {
      const { PDFDocument } = PDFLib;
      const src = await PDFDocument.load(await file!.arrayBuffer());
      const total = src.getPageCount();
      let sets: number[][] = mode === "all"
        ? Array.from({ length: total }, (_, i) => [i])
        : ranges.split(",").map(p => {
          p = p.trim();
          if (p.includes("-")) { const [a, b] = p.split("-").map(n => parseInt(n) - 1); return Array.from({ length: b - a + 1 }, (_, i) => a + i); }
          return [parseInt(p) - 1];
        });

      const outputs: { name: string; bytes: Uint8Array }[] = [];
      for (let i = 0; i < sets.length; i++) {
        setMsg(lang === "fr" ? `Traitement ${i + 1}/${sets.length}…` : `Processing ${i + 1}/${sets.length}…`);
        const out = await PDFDocument.create();
        const cp = await out.copyPages(src, sets[i]); cp.forEach(p => out.addPage(p));
        const name = sets.length === total ? `page_${sets[i][0] + 1}.pdf` : `part_${i + 1}.pdf`;
        outputs.push({ name, bytes: await out.save() });
      }

      if (outputs.length === 1) {
        pdfDownload(outputs[0].bytes, outputs[0].name);
      } else {
        // Zip multi-file output into one download — browsers block or prompt
        // for permission after several auto-triggered downloads in one tab.
        setMsg(lang === "fr" ? "Compression en ZIP…" : "Zipping…");
        const JSZip = await loadJSZip();
        const zip = new JSZip();
        outputs.forEach(o => zip.file(o.name, o.bytes));
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const base = file!.name.replace(/\.pdf$/i, "");
        fileDownload(zipBlob, `${base}_split.zip`, "application/zip");
      }

      setSt("ok"); setMsg(lang === "fr" ? `Divisé en ${sets.length} fichier(s) !` : `Split into ${sets.length} file(s)!`);
    } catch (e: any) { setSt("err"); setMsg(friendlyError(e, lang)); }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!file
        ? <PdfDropZone accept={[".pdf"]} multiple={false} onFiles={load} lang={lang}
            label={lang === "fr" ? "Déposez un fichier PDF" : "Drop a PDF file here"}
            hint={lang === "fr" ? "Sélectionnez un PDF à diviser" : "Select one PDF to split"} />
        : <SingleFileRow file={file} onClear={() => { setFile(null); setCount(0); setSt(null); }} />}
      {file && (
        <>
          <div style={{ fontSize: 11, color: C.muted }}>
            {count} {lang === "fr" ? "pages détectées" : "pages detected"}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setMode("all")} style={s.pill(mode === "all")}>
              {lang === "fr" ? "Toutes les pages" : "All pages"}
            </button>
            <button onClick={() => setMode("range")} style={s.pill(mode === "range")}>
              {lang === "fr" ? "Plages personnalisées" : "Custom ranges"}
            </button>
          </div>
          {mode === "range" && (
            <input value={ranges} onChange={e => setRanges(e.target.value)}
              placeholder="e.g. 1-3, 5, 7-10" style={s.input} />
          )}
          <button onClick={run} style={s.cta()}>
            ✂ &nbsp; {lang === "fr" ? "Diviser le PDF" : "Split PDF"}
          </button>
        </>
      )}
      <PdfStatus status={st} message={msg} />
    </div>
  );
}

// ── Replacement for PdfCompressTab in components/pdf/PdfHub.tsx ──
// 1. Add this import near the top of PdfHub.tsx, alongside the existing
//    `import * as PDFLib from 'pdf-lib'`:
//
//      import { compressPdfImages, COMPRESS_PRESETS } from '../../lib/pdf/compressImages';
//
// 2. Replace the existing `function PdfCompressTab(...) { ... }` block
//    (around line 692) with this entire function.

function PdfCompressTab({ lang }: { lang: string }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [level, setLevel] = React.useState<"low" | "medium" | "high">("medium");
  const [st, setSt] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState("");
  const fmtSize = (b: number) => (b / 1048576).toFixed(2) + " MB";

  const run = async () => {
    setSt("loading");
    setMsg(lang === "fr" ? "Compression en cours…" : "Compressing…");
    try {
      const buf = new Uint8Array(await file!.arrayBuffer());
      const result = await compressPdfImages(buf, {
        ...COMPRESS_PRESETS[level],
        onProgress: (done, total) => {
          if (total > 0) {
            setMsg(
              lang === "fr"
                ? `Compression des images ${done}/${total}…`
                : `Compressing images ${done}/${total}…`
            );
          }
        },
      });

      pdfDownload(result.bytes, "compressed.pdf");

      const ratio = +((1 - result.compressedSize / result.originalSize) * 100).toFixed(1);

      if (result.imagesCompressed === 0) {
        // Honest message when there was nothing this engine could safely shrink —
        // e.g. a text-only PDF, or one with only CMYK/CCITT/JBIG2/masked images.
        setSt("ok");
        setMsg(
          lang === "fr"
            ? `Aucune image compressible trouvée (PDF texte, ou images déjà optimisées/CMYK). Fichier enregistré sans changement notable : ${fmtSize(result.compressedSize)}`
            : `No compressible images found (text-only PDF, or images already optimized/CMYK). Saved with no significant change: ${fmtSize(result.compressedSize)}`
        );
      } else if (ratio > 0) {
        setSt("ok");
        setMsg(
          lang === "fr"
            ? `Réduit de ${ratio}% (${result.imagesCompressed}/${result.imagesFound} image(s) recompressée(s)) : ${fmtSize(result.originalSize)} → ${fmtSize(result.compressedSize)}`
            : `Reduced by ${ratio}% (${result.imagesCompressed}/${result.imagesFound} image(s) recompressed): ${fmtSize(result.originalSize)} → ${fmtSize(result.compressedSize)}`
        );
      } else {
        setSt("ok");
        setMsg(
          lang === "fr"
            ? `Déjà optimisé — pas de réduction supplémentaire possible. Enregistré : ${fmtSize(result.compressedSize)}`
            : `Already optimized — no further reduction possible. Saved as ${fmtSize(result.compressedSize)}`
        );
      }
    } catch (e: any) {
      setSt("err");
      setMsg(friendlyError(e, lang));
    }
  };

  const levels: Array<"low" | "medium" | "high"> = ["low", "medium", "high"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!file
        ? <PdfDropZone accept={[".pdf"]} multiple={false} onFiles={([f]) => { setFile(f); setSt(null); }} lang={lang}
            label={lang === "fr" ? "Déposez un fichier PDF" : "Drop a PDF file here"}
            hint={lang === "fr" ? "Traitement dans votre navigateur" : "All processing in your browser"} />
        : <SingleFileRow file={file} onClear={() => { setFile(null); setSt(null); }} />}
      {file && (
        <>
          <div>
            <label style={s.label}>{lang === "fr" ? "NIVEAU DE COMPRESSION" : "COMPRESSION LEVEL"}</label>
            <div style={{ display: "flex", gap: 8 }}>
              {levels.map(lv => (
                <button key={lv} onClick={() => setLevel(lv)} style={s.pill(level === lv)}>
                  {lang === "fr"
                    ? { low: "Léger", medium: "Moyen", high: "Élevé" }[lv]
                    : lv.charAt(0).toUpperCase() + lv.slice(1)}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 6, lineHeight: 1.5 }}>
              {lang === "fr"
                ? "Recompresse les images JPEG intégrées (RVB/niveaux de gris, sans transparence). Les PDF principalement composés de texte, ou d'images CMJN/scannées, verront peu ou pas de réduction — c'est normal."
                : "Recompresses embedded JPEG images (RGB/grayscale, no transparency). Text-heavy PDFs, or ones with CMYK/scanned images, will see little or no reduction — that's expected."}
            </div>
          </div>
          <button onClick={run} style={s.cta()} disabled={st === "loading"}>
            ⇣ &nbsp; {lang === "fr" ? "Compresser le PDF" : "Compress PDF"}
          </button>
        </>
      )}
      <PdfStatus status={st} message={msg} />
    </div>
  );
}

function PdfRotateTab({ lang }: { lang: string }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [count, setCount] = React.useState(0);
  const [angle, setAngle] = React.useState(90);
  const [target, setTarget] = React.useState("all");
  const [pages, setPages] = React.useState("");
  const [st, setSt] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState("");
  const load = async ([f]: File[]) => {
    setFile(f);
    const { PDFDocument } = PDFLib;
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setCount(doc.getPageCount()); setSt(null);
  };
  const run = async () => {
    setSt("loading"); setMsg(lang === "fr" ? "Rotation en cours…" : "Rotating…");
    try {
      const { PDFDocument, degrees } = PDFLib;
      const doc = await PDFDocument.load(await file!.arrayBuffer());
      const total = doc.getPageCount();
      let idxs: number[] = target === "all" ? Array.from({ length: total }, (_, i) => i)
        : target === "odd" ? Array.from({ length: total }, (_, i) => i).filter(i => i % 2 === 0)
        : target === "even" ? Array.from({ length: total }, (_, i) => i).filter(i => i % 2 !== 0)
        : pages.split(",").flatMap(p => {
          p = p.trim();
          if (p.includes("-")) { const [a, b] = p.split("-").map(n => parseInt(n) - 1); return Array.from({ length: b - a + 1 }, (_, i) => a + i); }
          return [parseInt(p) - 1];
        }).filter(i => i >= 0 && i < total);
      idxs.forEach(i => { const pg = doc.getPage(i); pg.setRotation(degrees((pg.getRotation().angle + angle) % 360)); });
      pdfDownload(await doc.save(), "rotated.pdf");
      setSt("ok"); setMsg(lang === "fr" ? `${idxs.length} page(s) pivotées de ${angle}°` : `Rotated ${idxs.length} page(s) by ${angle}°`);
    } catch (e: any) { setSt("err"); setMsg(friendlyError(e, lang)); }
  };
  const targets = [
    { k: "all", en: "All", fr: "Toutes" }, { k: "odd", en: "Odd", fr: "Impaires" },
    { k: "even", en: "Even", fr: "Paires" }, { k: "custom", en: "Custom", fr: "Personnalisé" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!file
        ? <PdfDropZone accept={[".pdf"]} multiple={false} onFiles={load} lang={lang}
            label={lang === "fr" ? "Déposez un fichier PDF" : "Drop a PDF file here"}
            hint={lang === "fr" ? "Sélectionnez un PDF à pivoter" : "Select PDF to rotate"} />
        : <SingleFileRow file={file} onClear={() => { setFile(null); setCount(0); setSt(null); }} />}
      {file && (
        <>
          <div>
            <label style={s.label}>{lang === "fr" ? "ANGLE DE ROTATION" : "ROTATION ANGLE"}</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[90, 180, 270].map(a => (
                <button key={a} onClick={() => setAngle(a)} style={s.pill(angle === a)}>{a}°</button>
              ))}
            </div>
          </div>
          <div>
            <label style={s.label}>{lang === "fr" ? "QUELLES PAGES ?" : "WHICH PAGES?"}</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {targets.map(t => (
                <button key={t.k} onClick={() => setTarget(t.k)} style={s.pill(target === t.k)}>
                  {lang === "fr" ? t.fr : t.en}
                </button>
              ))}
            </div>
          </div>
          {target === "custom" && (
            <input value={pages} onChange={e => setPages(e.target.value)}
              placeholder="e.g. 1, 3-5, 8" style={s.input} />
          )}
          <button onClick={run} style={s.cta()}>
            ↻ &nbsp; {lang === "fr" ? "Pivoter le PDF" : "Rotate PDF"}
          </button>
        </>
      )}
      <PdfStatus status={st} message={msg} />
    </div>
  );
}

function PdfJpg2PdfTab({ lang }: { lang: string }) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [st, setSt] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState("");
  const add = (f: File[]) => setFiles(p => [...p, ...f]);
  const remove = (i: number) => setFiles(p => p.filter((_, j) => j !== i));
  const up = (i: number) => setFiles(p => { const a = [...p]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a; });
  const dn = (i: number) => setFiles(p => { const a = [...p]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a; });
  const run = async () => {
    if (!files.length) return;
    setSt("loading"); setMsg(lang === "fr" ? "Création du PDF…" : "Creating PDF…");
    try {
      const { PDFDocument } = PDFLib;
      const doc = await PDFDocument.create();
      for (const f of files) {
        const buf = await f.arrayBuffer();
        const ext = f.name.split(".").pop()?.toLowerCase();
        const img = ext === "png" ? await doc.embedPng(buf) : await doc.embedJpg(buf);
        const { width, height } = img.scale(1);
        const page = doc.addPage([width, height]);
        page.drawImage(img, { x: 0, y: 0, width, height });
      }
      pdfDownload(await doc.save(), "images.pdf");
      setSt("ok"); setMsg(lang === "fr" ? `PDF créé avec ${files.length} page(s) !` : `Created PDF with ${files.length} page(s)!`);
    } catch (e: any) { setSt("err"); setMsg(friendlyError(e, lang)); }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <PdfDropZone accept={[".jpg", ".jpeg", ".png"]} multiple onFiles={add} lang={lang}
        label={lang === "fr" ? "Déposez vos images ici" : "Drop image files here"}
        hint={lang === "fr" ? "JPG, PNG — une image par page" : "JPG, PNG — one image per page"} />
      {files.length > 0 && (
        <>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, background: C.panel, padding: 13 }}>
            <PdfFileList files={files} onRemove={remove} onMoveUp={up} onMoveDown={dn} />
          </div>
          <button onClick={run} style={s.cta()}>
            ▣ &nbsp; {lang === "fr" ? `Créer le PDF (${files.length} images)` : `Create PDF (${files.length} images)`}
          </button>
        </>
      )}
      <PdfStatus status={st} message={msg} />
    </div>
  );
}

function PdfToJpgTab({ lang }: { lang: string }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [count, setCount] = React.useState(0);
  const [scale, setScale] = React.useState(2);
  const [st, setSt] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState("");
  const load = async ([f]: File[]) => {
    setFile(f); setSt(null);
    try {
      const pdfjsLib = await loadPdfJs();
      const doc = await pdfjsLib.getDocument({ data: await f.arrayBuffer() }).promise;
      setCount(doc.numPages);
    } catch (e: any) { setSt("err"); setMsg("Couldn't read PDF: " + e.message); }
  };
  const run = async () => {
    setSt("loading"); setMsg(lang === "fr" ? "Rendu des pages…" : "Rendering pages…");
    try {
      const buf = await file!.arrayBuffer();
      const base = file!.name.replace(/\.pdf$/i, "");

      const { outputs } = await runPdfWorkerTask<{ outputs: { name: string; bytes: Uint8Array }[] }>(
        'pdfToJpg',
        { file: buf, scale, baseName: base },
        [buf],
        (done, total) =>
          setMsg(lang === "fr" ? `Rendu page ${done + 1} sur ${total}…` : `Rendering page ${done + 1} of ${total}…`)
      );

      if (outputs.length === 1) {
        fileDownload(new Blob([outputs[0].bytes as BlobPart], { type: "image/jpeg" }), outputs[0].name, "image/jpeg");
      } else {
        setMsg(lang === "fr" ? "Compression en ZIP…" : "Zipping…");
        const JSZip = await loadJSZip();
        const zip = new JSZip();
        outputs.forEach(o => zip.file(o.name, o.bytes));
        const zipBlob = await zip.generateAsync({ type: "blob" });
        fileDownload(zipBlob, `${base}_pages.zip`, "application/zip");
      }

      setSt("ok"); setMsg(lang === "fr" ? `${outputs.length} page(s) exportées en JPG !` : `Exported ${outputs.length} page(s) as JPG!`);
    } catch (e: any) { setSt("err"); setMsg(friendlyError(e, lang)); }
  };

  const qualities = [
    { k: 1.5, en: "Standard", fr: "Standard" },
    { k: 2,   en: "High",     fr: "Haute" },
    { k: 3,   en: "Print (3×)", fr: "Impression (3×)" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!file
        ? <PdfDropZone accept={[".pdf"]} multiple={false} onFiles={load} lang={lang}
            label={lang === "fr" ? "Déposez un fichier PDF" : "Drop a PDF file here"}
            hint={lang === "fr" ? "Exporter les pages en JPG" : "Select PDF to export as JPG"} />
        : <SingleFileRow file={file} onClear={() => { setFile(null); setCount(0); setSt(null); }} />}
      {file && (
        <>
          <div>
            <label style={s.label}>{lang === "fr" ? "QUALITÉ D'IMAGE" : "IMAGE QUALITY"}</label>
            <div style={{ display: "flex", gap: 8 }}>
              {qualities.map(q => (
                <button key={q.k} onClick={() => setScale(q.k)} style={s.pill(scale === q.k)}>
                  {lang === "fr" ? q.fr : q.en}
                </button>
              ))}
            </div>
          </div>
          <button onClick={run} style={s.cta()}>
            ▤ &nbsp; {lang === "fr" ? (count > 1 ? `Exporter ${count} JPGs` : "Exporter en JPG") : (count > 1 ? `Export ${count} JPGs` : "Export as JPG")}
          </button>
        </>
      )}
      <PdfStatus status={st} message={msg} />
      <div style={{ fontSize: 11, color: C.muted }}>
        {lang === "fr" ? "Chaque page est téléchargée comme un fichier JPG séparé." : "Each page downloads as a separate JPG file."}
      </div>
    </div>
  );
}

function PdfToWordTab({ lang }: { lang: string }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [st, setSt] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState("");
  const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const run = async () => {
    setSt("loading"); setMsg(lang === "fr" ? "Extraction du texte…" : "Extracting text…");
    try {
      const pdfjsLib = await loadPdfJs();
      const doc = await pdfjsLib.getDocument({ data: await file!.arrayBuffer() }).promise;
      let bodyHtml = "";
      for (let i = 1; i <= doc.numPages; i++) {
        setMsg(lang === "fr" ? `Lecture page ${i} sur ${doc.numPages}…` : `Reading page ${i} of ${doc.numPages}…`);
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const lines = new Map<number, any[]>();
        for (const item of content.items) {
          if (!("str" in item) || !(item as any).str.trim()) continue;
          const y = Math.round((item as any).transform[5]);
          if (!lines.has(y)) lines.set(y, []);
          lines.get(y)!.push(item);
        }
        const sortedY = [...lines.keys()].sort((a, b) => b - a);
        for (const y of sortedY) {
          const text = lines.get(y)!.sort((a, b) => a.transform[4] - b.transform[4]).map((it: any) => it.str).join(" ").trim();
          if (text) bodyHtml += `<p>${escapeHtml(text)}</p>\n`;
        }
        if (i < doc.numPages) bodyHtml += `<br clear="all" style="page-break-before:always" />\n`;
      }
      const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset="utf-8"><title>${escapeHtml(file!.name)}</title></head>
<body>${bodyHtml || "<p></p>"}</body></html>`;
      fileDownload(html, file!.name.replace(/\.pdf$/i, "") + ".doc", "application/msword");
      setSt("ok"); setMsg(lang === "fr" ? `Texte extrait de ${doc.numPages} page(s) !` : `Extracted text from ${doc.numPages} page(s)!`);
    } catch (e: any) { setSt("err"); setMsg(friendlyError(e, lang)); }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!file
        ? <PdfDropZone accept={[".pdf"]} multiple={false} onFiles={([f]) => { setFile(f); setSt(null); }} lang={lang}
            label={lang === "fr" ? "Déposez un fichier PDF" : "Drop a PDF file here"}
            hint={lang === "fr" ? "Extraire le texte du PDF" : "Select PDF to extract text from"} />
        : <SingleFileRow file={file} onClear={() => { setFile(null); setSt(null); }} />}
      {file && (
        <button onClick={run} style={s.cta()}>
          W &nbsp; {lang === "fr" ? "Exporter en Word (.doc)" : "Export as Word (.doc)"}
        </button>
      )}
      <PdfStatus status={st} message={msg} />
      <div style={{ fontSize: 11, color: C.muted }}>
        {lang === "fr"
          ? "Extrait le texte seulement — la mise en page, les images et les polices ne sont pas préservées."
          : "Extracts text only — original layout, images and fonts aren't preserved."}
      </div>
    </div>
  );
}

function PdfToExcelTab({ lang }: { lang: string }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [st, setSt] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState("");
  const csvCell = (s: string) => /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  const run = async () => {
    setSt("loading"); setMsg(lang === "fr" ? "Extraction des tableaux…" : "Extracting tables…");
    try {
      const pdfjsLib = await loadPdfJs();
      const doc = await pdfjsLib.getDocument({ data: await file!.arrayBuffer() }).promise;
      let csv = "";
      for (let i = 1; i <= doc.numPages; i++) {
        setMsg(lang === "fr" ? `Lecture page ${i} sur ${doc.numPages}…` : `Reading page ${i} of ${doc.numPages}…`);
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const rows = new Map<number, any[]>();
        for (const item of content.items) {
          if (!("str" in item) || !(item as any).str.trim()) continue;
          const y = Math.round((item as any).transform[5]);
          if (!rows.has(y)) rows.set(y, []);
          rows.get(y)!.push(item);
        }
        const sortedY = [...rows.keys()].sort((a, b) => b - a);
        if (doc.numPages > 1) csv += `Page ${i}\n`;
        for (const y of sortedY) {
          const cells = rows.get(y)!.sort((a: any, b: any) => a.transform[4] - b.transform[4]).map((it: any) => it.str.trim()).filter(Boolean);
          if (cells.length) csv += cells.map(csvCell).join(",") + "\n";
        }
      }
      fileDownload("\uFEFF" + csv, file!.name.replace(/\.pdf$/i, "") + ".csv", "text/csv;charset=utf-8");
      setSt("ok"); setMsg(lang === "fr" ? `${doc.numPages} page(s) exportées en CSV !` : `Extracted ${doc.numPages} page(s) as CSV!`);
    } catch (e: any) { setSt("err"); setMsg(friendlyError(e, lang)); }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!file
        ? <PdfDropZone accept={[".pdf"]} multiple={false} onFiles={([f]) => { setFile(f); setSt(null); }} lang={lang}
            label={lang === "fr" ? "Déposez un fichier PDF" : "Drop a PDF file here"}
            hint={lang === "fr" ? "Extraire les tableaux du PDF" : "Select PDF to extract tables from"} />
        : <SingleFileRow file={file} onClear={() => { setFile(null); setSt(null); }} />}
      {file && (
        <button onClick={run} style={s.cta()}>
          X &nbsp; {lang === "fr" ? "Exporter en Excel (.csv)" : "Export as Excel (.csv)"}
        </button>
      )}
      <PdfStatus status={st} message={msg} />
      <div style={{ fontSize: 11, color: C.muted }}>
        {lang === "fr"
          ? "Exporte en CSV (s'ouvre directement dans Excel) — idéal pour les tableaux simples."
          : "Exports as CSV (opens directly in Excel) — best for simple grid tables; complex layouts may need manual cleanup."}
      </div>
    </div>
  );
}

// ── CHRONOS Hub shell ──

function PdfHub({ onBack, initialTab }: { onBack?: () => void; initialTab?: string }) {
  const { lang } = useLang();
  const [tab, setTab] = React.useState(initialTab || "merge");
  const cur = PDF_TABS.find(t => t.id === tab)!;

  const panels: Record<string, React.ReactNode> = {
    merge:     <PdfMergeTab    lang={lang} />,
    split:     <PdfSplitTab    lang={lang} />,
    compress:  <PdfCompressTab lang={lang} />,
    rotate:    <PdfRotateTab   lang={lang} />,
    jpg2pdf:   <PdfJpg2PdfTab  lang={lang} />,
    pdf2jpg:   <PdfToJpgTab    lang={lang} />,
    pdf2word:  <PdfToWordTab   lang={lang} />,
    pdf2excel: <PdfToExcelTab  lang={lang} />,
  };

  const popularTabs  = PDF_TABS.filter(t => t.group === "popular");
  const convertTabs  = PDF_TABS.filter(t => t.group === "convert");
  const otherTabs    = PDF_TABS.filter(t => t.group === "other");

  const SideLink = ({ t }: { t: typeof PDF_TABS[0] }) => {
    const active = tab === t.id;
    return (
      <button
        key={t.id}
        onClick={() => setTab(t.id)}
        style={{
          height: 42, width: "100%",
          display: "flex", alignItems: "center", gap: 10,
          padding: "0 12px",
          color: active ? C.hot : "#c4cad2",
          textDecoration: "none",
          borderRadius: 8, fontSize: 13,
          background: active ? `${C.hot}18` : "transparent",
          border: active ? `none` : "none",
          borderLeft: active ? `2px solid ${C.hot}` : "2px solid transparent",
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          textAlign: "left",
          transition: "all .15s",
        }}>
        <span style={{ width: 16 }}>{t.icon}</span>
        {lang === "fr" ? t.fr : t.en}
      </button>
    );
  };

  const SideGroup = ({ label, tabs }: { label: string, tabs: typeof PDF_TABS }) => (
    <div style={{ marginTop: 24 }}>
      <div style={{ fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase", color: "#69727f", padding: "0 12px 8px" }}>
        {label}
      </div>
      {tabs.map(t => <SideLink key={t.id} t={t} />)}
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(circle at 65% 10%, ${C.accent}0a, transparent 30%), ${C.bg}`,
      fontFamily: "'DM Sans', sans-serif",
      color: C.text,
    }}>
      <style>{FONT_STYLE}</style>
      <style>{RESPONSIVE_STYLE}</style>

      {/* ── Layout: sidebar + content ── */}
      <div className="chronos-shell" style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "calc(100vh - 64px)" }}>

        {/* Sidebar */}
        <aside className="chronos-sidebar" style={{
          borderRight: `1px solid ${C.border}`,
          padding: "20px 16px",
          background: "rgba(12,15,21,.72)",
        }}>
          <div style={{ color: C.hot, fontWeight: 700, fontSize: 13 }}>PDF TOOLS</div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>8 tools</div>

          <div className="chronos-sidebar-groups">
            <SideGroup label={lang === "fr" ? "Populaires" : "Popular"} tabs={popularTabs} />
            <SideGroup label={lang === "fr" ? "Convertir"  : "Convert"}  tabs={convertTabs} />
            <SideGroup label={lang === "fr" ? "Autres"     : "Other"}    tabs={otherTabs} />
          </div>

          {/* Privacy badge */}
          <div className="chronos-privacy-badge" style={{
            marginTop: 30, padding: 15,
            border: `1px solid ${C.border}`, borderRadius: 12,
            background: C.panel,
          }}>
            <b style={{ fontSize: 11, display: "block" }}>
              ♧ &nbsp; {lang === "fr" ? "100% Dans le navigateur" : "100% In-Browser"}
            </b>
            <p style={{ color: "#78828e", fontSize: 10, lineHeight: 1.5, margin: "6px 0 0" }}>
              {lang === "fr"
                ? "Vos fichiers restent sur votre appareil. Rien n'est téléchargé."
                : "Your files stay on your device. Nothing is uploaded."}
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className="chronos-main" style={{ width: "min(1100px, calc(100vw - 280px))", margin: "0 auto", padding: "20px 40px 65px" }}>

          {/* Breadcrumb */}
          <div style={{ fontSize: 11, color: "#69727f", marginBottom: 18 }}>
            CHRONOS / PDF / <b style={{ color: "#aeb6c0" }}>{lang === "fr" ? cur.fr : cur.en}</b>
          </div>

          {/* Hero */}
          <div className="chronos-hero-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
            <div>
              <div style={{ color: C.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", marginBottom: 7 }}>
                PDF / {(lang === "fr" ? cur.fr : cur.en).toUpperCase()}
              </div>
              <h1 className="chronos-hero-title" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600, fontSize: 54, lineHeight: 0.92,
                letterSpacing: "-0.02em", margin: 0,
              }}>
                {lang === "fr" ? cur.fr : cur.en}
              </h1>
              <p style={{ color: C.muted, fontSize: 14, margin: "9px 0 0" }}>
                {lang === "fr" ? cur.frDesc : cur.enDesc}
              </p>
            </div>
            <div style={{
              border: `1px solid #24543d`, color: C.green,
              background: `${C.green}0a`, borderRadius: 999,
              padding: "8px 12px", fontSize: 10, whiteSpace: "nowrap",
            }}>
              ● &nbsp; In-Browser
            </div>
          </div>

          {/* Trust badges */}
          <div className="chronos-trust-badges" style={{ display: "flex", gap: 32, marginBottom: 24 }}>
            {[
              { icon: "♧", title: lang === "fr" ? "100% Privé" : "100% Private", sub: lang === "fr" ? "Traité dans votre navigateur" : "Processed in your browser" },
              { icon: "↯", title: lang === "fr" ? "Rapide & Sécurisé" : "Fast & Secure", sub: lang === "fr" ? "Pas d'upload, pas d'attente" : "No upload, no waiting" },
              { icon: "✓", title: lang === "fr" ? "Facile à utiliser" : "Easy to Use", sub: lang === "fr" ? "Glissez-déposez simplement" : "Just drag and drop" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{
                  width: 30, height: 30, border: `1px solid ${C.border}`,
                  borderRadius: 9, display: "grid", placeItems: "center", color: C.accent,
                }}>
                  {item.icon}
                </div>
                <div>
                  <strong style={{ fontSize: 11, display: "block", color: C.text }}>{item.title}</strong>
                  <small style={{ fontSize: 9, color: "#737d89" }}>{item.sub}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Tool panel */}
          <div style={{
            border: `1px solid ${C.border}`, borderRadius: 16,
            background: `linear-gradient(#131820, ${C.panel})`,
            padding: 24,
          }}>
            {panels[tab]}
          </div>

          {/* Deep SEO content — What is it / How it works / Examples / FAQ */}
          <PdfSeoContent toolId={tab} lang={lang} />

          {/* Related tools */}
          <section style={{ marginTop: 26 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 25, margin: "0 0 10px", color: C.text }}>
              {lang === "fr" ? "Autres outils PDF dont vous pourriez avoir besoin" : "Other PDF tools you might need"}
            </h3>
            <div className="chronos-related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 9 }}>
              {PDF_TABS.filter(t => t.id !== tab).slice(0, 4).map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    border: `1px solid ${C.border}`, borderRadius: 10,
                    padding: 13, background: C.panel,
                    textAlign: "left", cursor: "pointer",
                    transition: "border-color .15s",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = C.accent)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
                >
                  <b style={{ fontSize: 11, color: C.text, display: "block" }}>
                    {t.icon} &nbsp; {lang === "fr" ? t.fr : t.en}
                  </b>
                  <p style={{ fontSize: 9, lineHeight: 1.45, color: "#727c88", margin: "4px 0 0" }}>
                    {lang === "fr" ? t.frDesc : t.enDesc}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 22, paddingTop: 14, textAlign: "center", color: "#66717e", fontSize: 9 }}>
            ♧ &nbsp; {lang === "fr" ? "Privé · Rapide · Dans le navigateur — Vos fichiers ne quittent jamais votre appareil." : "Private · Fast · In-Browser — Your files never leave your device."}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PdfHub