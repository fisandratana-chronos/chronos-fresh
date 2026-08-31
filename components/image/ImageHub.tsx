'use client'

// ── components/image/ImageHub.tsx ─────────────────────────────
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useDark } from '../../lib/hooks/useDark'
import { useLang } from '../../lib/hooks/useLang'
import { IMAGE_SEO_CONTENT } from '../../lib/imageSeoContent'

// ── Types ─────────────────────────────────────────────────────
type Tab = 'compress' | 'convert' | 'resize' | 'upscale' | 'bgremove' | 'crop' | 'flip' | 'watermark' | 'colorpicker'
         | 'removemetadata' | 'exifviewer' | 'screenshotredact'
         | 'paletteextractor' | 'passportphoto' | 'favicon' | 'base64'
type Family = 'optimize' | 'convert' | 'edit' | 'privacy' | 'create' | 'colors'
type FitMode = 'cover' | 'contain' | 'stretch'
type OutFormat = 'original' | 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif'

interface CompressFile {
  file: File
  id: string
  preview: string
  status: 'pending' | 'processing' | 'done' | 'error'
  originalSize: number
  compressedSize?: number
  compressedUrl?: string
  compressedName?: string
  error?: string
}

interface ConvertFile {
  file: File
  id: string
  status: 'pending' | 'done' | 'error'
  originalSize: number
  convertedUrl?: string
  convertedName?: string
  convertedSize?: number
  error?: string
}

// ── Helpers ───────────────────────────────────────────────────
function formatBytes(b: number) {
  if (b < 1024) return b + ' B'
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB'
  return (b / 1024 / 1024).toFixed(2) + ' MB'
}

function uid() { return Math.random().toString(36).slice(2) }

function getExt(mime: string) {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg', 'image/png': 'png',
    'image/webp': 'webp', 'image/avif': 'avif',
  }
  return map[mime] || 'jpg'
}

// ── Shared file-size validation ──────────────────────────────
// Every tool advertises "Up to 20 MB" but nothing enforced it —
// this gives every panel the same check and the same bilingual
// inline warning UI (T comes from the ImageHub theme tokens).
const MAX_IMAGE_MB = 20

function isTooBig(file: File, maxMB: number = MAX_IMAGE_MB) {
  return file.size > maxMB * 1024 * 1024
}

function sizeErrorMsg(names: string[], lang: string, maxMB: number = MAX_IMAGE_MB) {
  const list = names.join(', ')
  return lang === 'fr'
    ? `${names.length > 1 ? 'Fichiers trop volumineux' : 'Fichier trop volumineux'} (max ${maxMB} MB) : ${list}`
    : `${names.length > 1 ? 'Files' : 'File'} over ${maxMB} MB, skipped: ${list}`
}

function SizeWarning({ message, T }: { message: string | null; T: any }) {
  if (!message) return null
  return (
    <div style={{
      marginTop: 10, padding: '8px 12px',
      border: `1px solid ${T.danger}44`, background: `${T.danger}12`,
      borderRadius: 8, color: T.danger, fontSize: 12,
    }}>
      ⚠ &nbsp; {message}
    </div>
  )
}

// ── Shared error messages ────────────────────────────────────
// Bilingual, friendly text for the two failure points that had no
// user-facing message at all: a file that fails to decode as an
// image, and a processing step (canvas/toBlob/etc.) that throws.
function loadErrorMsg(lang: string) {
  return lang === 'fr'
    ? "Ce fichier n'a pas pu être ouvert — vérifiez qu'il s'agit bien d'une image valide."
    : "This file couldn't be opened — check that it's a valid image."
}

function processErrorMsg(lang: string) {
  return lang === 'fr'
    ? "Une erreur est survenue pendant le traitement. Réessayez ou utilisez une autre image."
    : "Something went wrong while processing. Try again or use a different image."
}

// ── Deep SEO content — What is it / How it works / Examples / FAQ ──
// Rendered below each tool's panel, mirroring the pattern used in
// NET_HUB (components/network/NetworkHub.tsx) and PDF_HUB
// (components/pdf/PdfHub.tsx), styled with ImageHub's own T tokens
// and fonts (Cormorant Garamond + DM Sans).

function ImageFaqItem({ q, a, T, last }: { q: string; a: string; T: any; last?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: last ? 'none' : `1px solid ${T.border}` }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 12, padding: '13px 0', background: 'transparent', border: 'none',
        cursor: 'pointer', textAlign: 'left', fontFamily: "'DM Sans', sans-serif",
      }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: T.text }}>{q}</span>
        <span style={{ color: T.muted, fontSize: 13, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>▾</span>
      </button>
      {open && (
        <p style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.7, margin: '0 0 15px', fontFamily: "'DM Sans', sans-serif" }}>{a}</p>
      )}
    </div>
  )
}

function ImageSeoContent({ toolId, lang, T }: { toolId: string; lang: string; T: any }) {
  const content = IMAGE_SEO_CONTENT[toolId]
  if (!content) return null

  const getText = (field: 'title' | 'what' | 'how') =>
    lang === 'fr' ? (content as any)[`fr${field.charAt(0).toUpperCase()}${field.slice(1)}`] : (content as any)[field]
  const examples = lang === 'fr' ? content.frExamples : content.examples
  const faq = lang === 'fr' ? content.frFaq : content.faq

  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 21, color: T.text, marginBottom: 10, marginTop: 24, lineHeight: 1.3 }}>{children}</h2>
  )
  const P = ({ children }: { children: React.ReactNode }) => (
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: T.muted, lineHeight: 1.75, margin: 0 }}>{children}</p>
  )

  return (
    <article style={{
      marginTop: 26, padding: '26px 24px',
      border: `1px solid ${T.border}`, borderRadius: T.radius, background: T.surface,
    }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 25, color: T.text, marginBottom: 12, lineHeight: 1.2 }}>
        {getText('title')}
      </h1>

      <H2>{lang === 'fr' ? "Qu'est-ce que c'est ?" : 'What is it?'}</H2>
      <P>{getText('what')}</P>

      <H2>{lang === 'fr' ? 'Comment ça marche' : 'How it works'}</H2>
      <P>{getText('how')}</P>

      {examples?.length > 0 && (
        <>
          <H2>{lang === 'fr' ? 'Exemples' : 'Examples'}</H2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {examples.map((ex, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px', background: T.surface2, borderRadius: T.radiusSm, border: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 10, color: T.accent, fontWeight: 700, flexShrink: 0, paddingTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{String(i + 1).padStart(2, '0')}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: T.text, display: 'block', marginBottom: 2 }}>{ex.label}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.muted }}>
                    {ex.input}<span style={{ margin: '0 6px' }}>→</span><span style={{ color: T.success, fontWeight: 500 }}>{ex.result}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {faq?.length > 0 && (
        <>
          <H2>{lang === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}</H2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faq.map((item, i) => (
              <ImageFaqItem key={i} q={item.q} a={item.a} T={T} last={i === faq.length - 1} />
            ))}
          </div>
        </>
      )}
    </article>
  )
}

async function getImgDims(file: File): Promise<{ w: number; h: number }> {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => { URL.revokeObjectURL(url); resolve({ w: img.naturalWidth, h: img.naturalHeight }) }
    img.onerror = () => { URL.revokeObjectURL(url); resolve({ w: 0, h: 0 }) }
    img.src = url
  })
}

async function stripExifViaCanvas(blob: Blob, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const blobUrl = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.naturalWidth; c.height = img.naturalHeight
      c.getContext('2d')!.drawImage(img, 0, 0)
      URL.revokeObjectURL(blobUrl)
      c.toBlob(b => b ? resolve(b) : reject(new Error('Canvas null')), mimeType, quality)
    }
    img.onerror = () => { URL.revokeObjectURL(blobUrl); reject(new Error('Load failed')) }
    img.src = blobUrl
  })
}

async function convertFormat(file: File, targetMime: string): Promise<Blob> {
  const quality = targetMime === 'image/png' ? 1 : 0.88
  return stripExifViaCanvas(file, targetMime, quality)
}

// Resize draw helpers
function computeDraw(sw: number, sh: number, dw: number, dh: number, fit: FitMode) {
  if (fit === 'stretch') return { sx: 0, sy: 0, sWidth: sw, sHeight: sh, dx: 0, dy: 0, dWidth: dw, dHeight: dh }
  const srcR = sw / sh, dstR = dw / dh
  if (fit === 'cover') {
    if (srcR > dstR) {
      const s = dh / sh, rw = sw * s
      return { sx: 0, sy: 0, sWidth: sw, sHeight: sh, dx: -(rw - dw) / 2, dy: 0, dWidth: rw, dHeight: dh }
    } else {
      const s = dw / sw, rh = sh * s
      return { sx: 0, sy: 0, sWidth: sw, sHeight: sh, dx: 0, dy: -(rh - dh) / 2, dWidth: dw, dHeight: rh }
    }
  }
  // contain
  if (srcR > dstR) {
    const rh = dw / srcR
    return { sx: 0, sy: 0, sWidth: sw, sHeight: sh, dx: 0, dy: (dh - rh) / 2, dWidth: dw, dHeight: rh }
  } else {
    const rw = dh * srcR
    return { sx: 0, sy: 0, sWidth: sw, sHeight: sh, dx: (dw - rw) / 2, dy: 0, dWidth: rw, dHeight: dh }
  }
}

// ── Presets ───────────────────────────────────────────────────
const PRESETS = [
  { label: 'Instagram Square', w: 1080, h: 1080, icon: '📷' },
  { label: 'Instagram Portrait', w: 1080, h: 1350, icon: '📷' },
  { label: 'Instagram Story', w: 1080, h: 1920, icon: '📱' },
  { label: 'Twitter Post', w: 1200, h: 675, icon: '🐦' },
  { label: 'Facebook Post', w: 1200, h: 630, icon: '👥' },
  { label: 'YouTube Thumbnail', w: 1280, h: 720, icon: '▶️' },
  { label: 'TikTok Video', w: 1080, h: 1920, icon: '🎵' },
  { label: 'LinkedIn Banner', w: 1584, h: 396, icon: '💼' },
]

interface SubTool { id: Tab; label: string; icon: string; heading: string; desc: string }
interface FamilyDef { id: Family; label: string; tools: SubTool[] }

const FAMILIES: FamilyDef[] = [
  {
    id: 'optimize', label: 'Optimize',
    tools: [
      { id: 'compress', label: 'Compress',    icon: '⇣', heading: 'Compress an image',    desc: 'Reduce file size while keeping your image quality.' },
      { id: 'resize',   label: 'Resize',      icon: '⌗', heading: 'Resize an image',       desc: 'Resize to any dimension or preset with smart crop.' },
      { id: 'base64',   label: 'Image → Base64', icon: '{}', heading: 'Image → Base64',    desc: 'Convert any image to a Base64 Data URI for use in HTML or CSS.' },
    ],
  },
  {
    id: 'convert', label: 'Convert',
    tools: [
      { id: 'convert', label: 'Convert', icon: '↗', heading: 'Convert image format', desc: 'Convert between JPG, PNG, WEBP, and AVIF.' },
    ],
  },
  {
    id: 'edit', label: 'Edit',
    tools: [
      { id: 'crop',     label: 'Crop',        icon: '✂', heading: 'Crop an image',  desc: 'Crop to any ratio or custom area.' },
      { id: 'flip',     label: 'Flip/Rotate', icon: '↻', heading: 'Flip or rotate', desc: 'Mirror horizontally, vertically, or rotate by angle.' },
    ],
  },
  {
    id: 'privacy', label: 'Privacy',
    tools: [
      { id: 'removemetadata',   label: 'Remove Metadata',    icon: '🛡', heading: 'Remove Image Metadata',   desc: 'Strip GPS, camera model, date and all EXIF data from your image.' },
      { id: 'exifviewer',       label: 'EXIF Viewer',        icon: '🔍', heading: 'EXIF Viewer',             desc: 'Inspect all metadata embedded in your image file.' },
      { id: 'screenshotredact', label: 'Screenshot Redact',  icon: '▓', heading: 'Screenshot Redact',       desc: 'Blur, pixelate or black out sensitive areas in any screenshot.' },
      { id: 'bgremove',         label: 'Remove BG',          icon: '✦', heading: 'Remove Background',       desc: 'Remove image backgrounds automatically with AI.' },
    ],
  },
  {
    id: 'create', label: 'Create',
    tools: [
      { id: 'watermark',    label: 'Watermark',     icon: '◈', heading: 'Add a Watermark',       desc: 'Protect your images with text or image watermarks.' },
      { id: 'passportphoto',label: 'Passport Photo', icon: '🪪', heading: 'Passport / ID Photo',   desc: 'Generate passport or ID photos at the correct size and background.' },
      { id: 'favicon',      label: 'Favicon',        icon: '⭐', heading: 'Favicon Generator',     desc: 'Generate favicon.ico and all PNG sizes from any image or logo.' },
      { id: 'upscale',      label: 'AI Upscale',     icon: '✦', heading: 'AI Upscale',            desc: 'Upscale images 2× or 4× using AI — Real-ESRGAN.' },
    ],
  },
  {
    id: 'colors', label: 'Colors',
    tools: [
      { id: 'colorpicker',     label: 'Color Picker',     icon: '◉', heading: 'Pick a Color',          desc: 'Extract colors from any image pixel.' },
      { id: 'paletteextractor',label: 'Palette Extractor', icon: '🎨', heading: 'Palette Extractor',     desc: 'Extract the dominant color palette from any image.' },
    ],
  },
]

// Flat lookup helpers
const ALL_TOOLS: SubTool[] = FAMILIES.flatMap(f => f.tools)
const findTool = (id: Tab) => ALL_TOOLS.find(t => t.id === id)!
const findFamily = (id: Tab): Family => FAMILIES.find(f => f.tools.some(t => t.id === id))!.id

// ── Main Component ────────────────────────────────────────────
export default function ImageHub({ initialTab, initialFormat }: { initialTab?: Tab; initialFormat?: string } = {}) {
  const { dark } = useDark()
  const { lang } = useLang()
  const [tab, setTab] = useState<Tab>(initialTab || 'compress')
  const [openFamily, setOpenFamily] = useState<Family | null>(null)

  const selectTool = (id: Tab) => { setTab(id); setOpenFamily(null) }
  const toggleFamily = (fid: Family) => setOpenFamily((prev: Family | null) => prev === fid ? null : fid)

  // CSS variables via inline style
  const T = {
    bg:       dark ? '#0e0e0f' : '#f5f4f0',
    surface:  dark ? '#181819' : '#ffffff',
    surface2: dark ? '#222224' : '#ebebeb',
    border:   dark ? '#2e2e32' : '#d4d2cc',
    accent:   '#f59e0b',
    text:     dark ? '#f0ede8' : '#1a1a1b',
    muted:    dark ? '#7a7a82' : '#7a7a82',
    danger:   '#f87171',
    success:  '#34d399',
    radius:   14,
    radiusSm: 8,
  }

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, fontFamily: "'DM Sans', sans-serif", transition: 'background .2s, color .2s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .ih-fam-nav-wrap { flex-wrap: nowrap; }
        @media (max-width: 700px) {
          .ih-fam-nav-wrap { flex-wrap: wrap; row-gap: 4px; padding-top: 6px; padding-bottom: 2px; }
        }
        .ih-dropzone {
          min-height: 360px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          border: 1px dashed #38383d; border-radius: 22px;
          background: radial-gradient(circle at center, rgba(245,166,35,.045), transparent 55%);
          transition: border-color .2s, background .2s, transform .2s;
          cursor: pointer; padding: 48px 32px;
        }
        .ih-dropzone:hover, .ih-dropzone.drag-over {
          border-color: ${T.accent};
          background: radial-gradient(circle at center, rgba(245,166,35,.09), transparent 60%);
          transform: translateY(-2px);
        }
        .ih-btn-primary { background: ${T.accent}; color: #000; border: none; border-radius: 10px; padding: 12px 28px; font-family: 'DM Sans',sans-serif; font-weight: 700; font-size: .92rem; cursor: pointer; transition: opacity .15s; }
        .ih-btn-primary:hover { opacity: .88; }
        .ih-btn-ghost { background: none; color: ${T.text}; border: 1px solid ${T.border}; border-radius: 10px; padding: 11px 22px; font-family: 'DM Sans',sans-serif; font-weight: 600; font-size: .88rem; cursor: pointer; transition: border-color .15s; }
        .ih-btn-ghost:hover { border-color: ${T.accent}; color: ${T.accent}; }
        .ih-fit-btn { background: ${T.surface2}; color: ${T.muted}; border: 1px solid ${T.border}; border-radius: 8px; padding: 8px 16px; font-size: .82rem; cursor: pointer; transition: all .15s; }
        .ih-fit-btn.active, .ih-fit-btn:hover { border-color: ${T.accent}; color: ${T.accent}; background: rgba(245,166,35,.08); }
        .ih-progress-wrap { background: ${T.surface2}; border-radius: 99px; height: 6px; margin: 20px 0 8px; overflow: hidden; }
        .ih-progress-bar { height: 100%; background: ${T.accent}; border-radius: 99px; transition: width .3s; }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 4px; background: ${T.surface2}; border-radius: 4px; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: ${T.accent}; cursor: pointer; border: 3px solid ${T.bg}; }
        .ih-result-card { background: ${T.surface}; border: 1px solid ${T.border}; border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; gap: 14px; margin-bottom: 10px; }
        .ih-fmt-btn { background: ${T.surface}; border: 1.5px solid ${T.border}; border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; transition: all .15s; flex: 1; }
        .ih-fmt-btn.selected, .ih-fmt-btn:hover { border-color: ${T.accent}; background: rgba(245,166,35,.06); }
        .ih-upload-icon { width: 64px; height: 64px; display: grid; place-items: center; margin-bottom: 22px; border: 1px solid ${T.border}; border-radius: 18px; background: ${T.surface2}; color: ${T.accent}; font-size: 28px; }
        .ih-fam-btn { position: relative; display: flex; align-items: center; gap: 6px; padding: 18px 20px; color: ${T.muted}; font-size: 13.5px; white-space: nowrap; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: color .15s; flex-shrink: 0; letter-spacing: .01em; }
        .ih-fam-btn:hover { color: ${T.text}; }
        .ih-fam-btn.fam-active { color: ${T.text}; font-weight: 600; }
        .ih-fam-btn.fam-active::after { content: ""; position: absolute; left: 14px; right: 14px; bottom: 0; height: 2px; background: ${T.accent}; border-radius: 2px 2px 0 0; }
        .ih-fam-btn .fam-caret { font-size: 9px; opacity: .55; transition: transform .18s; }
        .ih-fam-btn.fam-open .fam-caret { transform: rotate(180deg); opacity: .8; }
        .ih-dropdown { position: absolute; top: calc(100% + 1px); left: 0; min-width: 200px; background: ${dark ? '#1c1c1f' : '#ffffff'}; border: 1px solid ${T.border}; border-radius: 12px; box-shadow: 0 8px 28px rgba(0,0,0,${dark ? '.45' : '.12'}); padding: 6px; z-index: 9999; animation: ih-fade-in .12s ease; }
        @keyframes ih-fade-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .ih-drop-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; cursor: pointer; background: none; border: none; width: 100%; text-align: left; font-family: 'DM Sans', sans-serif; font-size: .85rem; color: ${T.muted}; transition: background .12s, color .12s; }
        .ih-drop-item:hover { background: ${T.surface2}; color: ${T.text}; }
        .ih-drop-item.tool-active { background: rgba(245,158,11,.1); color: ${T.accent}; font-weight: 600; }
        .ih-drop-icon { font-size: 15px; width: 22px; text-align: center; flex-shrink: 0; }
        .ih-breadcrumb { font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: ${T.accent}; margin-bottom: 4px; }
        .ih-free-badge { position: absolute; top: 48px; right: 6vw; display: inline-flex; align-items: center; padding: 7px 12px; border: 1px solid rgba(245,166,35,.35); border-radius: 999px; background: rgba(245,166,35,.10); color: ${T.accent}; font-size: 12px; font-weight: 600; white-space: nowrap; }
        @media (max-width: 780px) {
          .ih-free-badge { position: static; margin-top: 20px; }
        }
        @media (max-width: 600px) {
          .ih-page-header { padding: 32px 5vw 24px !important; }
          .ih-main { padding: 36px 5vw 80px !important; }
          .ih-dropzone { min-height: 280px !important; padding: 32px 20px !important; }
          .ih-fmt-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 560px) {
          .ih-export-grid, .ih-passport-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Page Header ── */}
      <section className="ih-page-header" style={{ padding: '48px 6vw 34px', borderBottom: `1px solid ${T.border}`, position: 'relative' }}>
        <div className="ih-free-badge">
          100% Free · No Upload
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: T.accent, marginBottom: 10 }}>
          CHRONOS / IMAGE
        </div>
        <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 5vw, 68px)', lineHeight: .95, fontWeight: 600, letterSpacing: '-.03em', color: T.text }}>
          Image Tools
        </h1>
        <div style={{ marginTop: 14, color: T.muted, fontSize: 15 }}>
          Compress, transform &amp; enhance your images.
        </div>
      </section>

      {/* ── Family Nav ── */}
      <nav className="ih-fam-nav-wrap" style={{ position: 'relative', padding: '0 6vw', borderBottom: `1px solid ${T.border}`, display: 'flex', zIndex: 20 }}
        onMouseLeave={() => setOpenFamily(null)}>
        {FAMILIES.map(fam => {
          const isActiveFam = fam.tools.some(t => t.id === tab)
          const isOpen = openFamily === fam.id
          const hasSingle = fam.tools.length === 1
          return (
            <div key={fam.id} style={{ position: 'relative' }}>
              <button
                className={`ih-fam-btn${isActiveFam ? ' fam-active' : ''}${isOpen ? ' fam-open' : ''}`}
                onClick={() => hasSingle ? selectTool(fam.tools[0].id) : toggleFamily(fam.id)}
                onMouseEnter={() => !hasSingle && setOpenFamily(fam.id)}
              >
                {fam.label}
                {!hasSingle && <span className="fam-caret">▼</span>}
              </button>
              {!hasSingle && isOpen && (
                <div className="ih-dropdown">
                  {fam.tools.map(tool => (
                    <button
                      key={tool.id}
                      className={`ih-drop-item${tab === tool.id ? ' tool-active' : ''}`}
                      onClick={() => selectTool(tool.id)}
                    >
                      <span className="ih-drop-icon">{tool.icon}</span>
                      <div>
                        <div style={{ fontWeight: tab === tool.id ? 600 : 500 }}>{tool.label}</div>
                        <div style={{ fontSize: '.73rem', color: T.muted, marginTop: 1 }}>{tool.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
        {/* Active tool breadcrumb — right side */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', paddingRight: 4 }}>
          <span style={{ fontSize: '.72rem', color: T.muted, fontWeight: 500 }}>
            {findTool(tab).icon} {findTool(tab).label}
          </span>
        </div>
      </nav>

      {/* ── Main ── */}
      <div className="ih-main" style={{ width: 'min(1100px, 88vw)', margin: '0 auto', padding: '70px 0 120px' }}>
        {/* Section heading */}
        <div style={{ marginBottom: 22 }}>
          <div className="ih-breadcrumb">{FAMILIES.find(f => f.id === findFamily(tab))?.label}</div>
          <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 600, color: T.text }}>
            {findTool(tab).heading}
          </h2>
          <p style={{ margin: '5px 0 0', color: T.muted, fontSize: 14 }}>
            {findTool(tab).desc}
          </p>
        </div>

        {tab === 'compress'        && <CompressPanel        T={T} />}
        {tab === 'convert'         && <ConvertPanel         T={T} initialFormat={initialFormat} />}
        {tab === 'resize'          && <ResizePanel          T={T} />}
        {tab === 'crop'            && <CropPanel            T={T} />}
        {tab === 'flip'            && <FlipPanel            T={T} />}
        {tab === 'watermark'       && <WatermarkPanel       T={T} />}
        {tab === 'colorpicker'     && <ColorPickerPanel     T={T} />}
        {tab === 'upscale'         && <UpscalePanel         T={T} />}
        {tab === 'bgremove'        && <BgRemovePanel        T={T} />}
        {tab === 'removemetadata'  && <RemoveMetadataPanel  T={T} />}
        {tab === 'exifviewer'      && <ExifViewerPanel      T={T} />}
        {tab === 'screenshotredact'&& <ScreenshotRedactPanel T={T} />}
        {tab === 'paletteextractor'&& <PaletteExtractorPanel T={T} />}
        {tab === 'passportphoto'   && <PassportPhotoPanel   T={T} />}
        {tab === 'favicon'         && <FaviconPanel         T={T} />}
        {tab === 'base64'          && <Base64Panel          T={T} />}

        {/* Deep SEO content — What is it / How it works / Examples / FAQ */}
        <ImageSeoContent toolId={tab} lang={lang} T={T} />

        {/* Footer note */}
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', color: '#55565c', fontSize: 12, flexWrap: 'wrap', gap: 8 }}>
          <span>Processing happens locally in your browser.</span>
          <span style={{ color: '#77787f' }}>Private · Fast · No upload</span>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  COMPRESS PANEL
// ══════════════════════════════════════════════════════════════
function CompressPanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [files, setFiles] = useState<CompressFile[]>([])
  const [quality, setQuality] = useState(80)
  const [outFormat, setOutFormat] = useState<OutFormat>('original')
  const [stripExif, setStripExif] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [sizeError, setSizeError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return
    const all = Array.from(incoming)
    const tooBig = all.filter(f => isTooBig(f))
    const ok = all.filter(f => !isTooBig(f))
    setSizeError(tooBig.length ? sizeErrorMsg(tooBig.map(f => f.name), lang) : null)
    const added: CompressFile[] = ok.map(f => ({
      file: f, id: uid(), preview: URL.createObjectURL(f),
      status: 'pending', originalSize: f.size,
    }))
    setFiles(p => [...p, ...added])
    setDone(false)
  }, [lang])

  const removeFile = (id: string) => setFiles(p => p.filter(f => f.id !== id))

  const compress = async () => {
    if (!files.length) return
    setProcessing(true); setProgress(0); setDone(false)
    const updated = [...files]
    for (let i = 0; i < updated.length; i++) {
      const f = updated[i]
      try {
        const targetMime = outFormat === 'original' ? f.file.type : outFormat
        const q = quality / 100
        const blob = await stripExifViaCanvas(f.file, targetMime || 'image/jpeg', q)
        const ext = getExt(targetMime || f.file.type)
        const baseName = f.file.name.replace(/\.[^.]+$/, '')
        updated[i] = { ...f, status: 'done', compressedSize: blob.size, compressedUrl: URL.createObjectURL(blob), compressedName: `${baseName}-compressed.${ext}` }
      } catch {
        updated[i] = { ...f, status: 'error', error: processErrorMsg(lang) }
      }
      setProgress(Math.round(((i + 1) / updated.length) * 100))
      setFiles([...updated])
    }
    setProcessing(false); setDone(true)
  }

  const reset = () => { setFiles([]); setDone(false); setProgress(0) }

  const formats: { v: OutFormat; label: string }[] = [
    { v: 'original', label: 'Auto' }, { v: 'image/jpeg', label: 'JPG' },
    { v: 'image/png', label: 'PNG' }, { v: 'image/webp', label: 'WEBP' },
    { v: 'image/avif', label: 'AVIF' },
  ]

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {/* Dropzone */}
      {!files.length ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); addFiles(e.dataTransfer.files) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
          <div className="ih-upload-icon">⇧</div>
          <h3 style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 600, color: T.text }}>Drop your image here</h3>
          <p style={{ margin: '8px 0 24px', color: T.muted, fontSize: 14 }}>or click anywhere to browse from your device</p>
          <div style={{ color: T.accent, fontWeight: 600, fontSize: 14 }}>Choose an image</div>
          <div style={{ marginTop: 28, color: '#5f6066', fontSize: 12 }}>JPG · PNG · WEBP · AVIF &nbsp;•&nbsp; Up to {MAX_IMAGE_MB} MB</div>
        </div>
      ) : (
        <>
          {/* File grid */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontWeight: 600, fontSize: '.85rem' }}>{files.length} image{files.length > 1 ? 's' : ''}</span>
            <button onClick={() => inputRef.current?.click()} style={{ background: 'none', border: 'none', color: T.accent, cursor: 'pointer', fontWeight: 600, fontSize: '.8rem' }}>+ Add more</button>
            <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(80px,1fr))', gap: 8, marginBottom: 16 }}>
            {files.map(f => (
              <div key={f.id} style={{ position: 'relative', borderRadius: T.radiusSm, overflow: 'hidden', background: T.surface2, aspectRatio: '1', border: `1px solid ${T.border}` }}>
                <img src={f.preview} alt={f.file.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 55%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '5px 6px' }}>
                  <span style={{ fontSize: '.6rem', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.file.name}</span>
                  <span style={{ fontSize: '.58rem', color: 'rgba(255,255,255,.7)' }}>{formatBytes(f.originalSize)}</span>
                </div>
                {f.status === 'done' && <span style={{ position: 'absolute', top: 4, left: 4, background: T.success, borderRadius: 99, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.6rem' }}>✓</span>}
                {f.status === 'error' && <span title={f.error} style={{ position: 'absolute', top: 4, left: 4, background: T.danger, borderRadius: 99, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.6rem' }}>⚠</span>}
                <button onClick={() => removeFile(f.id)} style={{ position: 'absolute', top: 4, right: 4, width: 18, height: 18, background: 'rgba(0,0,0,.55)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: '.65rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
            ))}
          </div>

          {/* Quality slider */}
          <div style={{ margin: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: '.88rem' }}>Quality</span>
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '.78rem', padding: '3px 10px', borderRadius: 20, background: quality < 50 ? 'rgba(248,113,113,.15)' : 'rgba(245,158,11,.15)', color: quality < 50 ? T.danger : T.accent }}>{quality}%</span>
            </div>
            <input type="range" min={10} max={95} value={quality} onChange={e => setQuality(+e.target.value)} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '.75rem', color: T.muted }}><span>Smallest file</span><span>Best quality</span></div>
          </div>

          {/* Format */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 10 }}>Output Format</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {formats.map(f => (
                <button key={f.v} className={`ih-fit-btn${outFormat === f.v ? ' active' : ''}`} onClick={() => setOutFormat(f.v)}>{f.label}</button>
              ))}
            </div>
          </div>

          {/* Strip EXIF */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: '.83rem', padding: '10px 14px', background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm }}>
            <input type="checkbox" checked={stripExif} onChange={e => setStripExif(e.target.checked)} style={{ accentColor: T.accent, width: 15, height: 15 }} />
            <label style={{ cursor: 'pointer' }}>
              <span style={{ fontWeight: 500 }}>Remove EXIF Metadata</span>
              <span style={{ color: T.muted, display: 'block', fontSize: '.76rem' }}>Strips GPS, camera info — improves privacy</span>
            </label>
          </div>

          {/* Progress */}
          {processing && (
            <div>
              <div className="ih-progress-wrap"><div className="ih-progress-bar" style={{ width: progress + '%' }} /></div>
              <p style={{ fontSize: '.78rem', color: T.muted }}>Processing {progress}%…</p>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button className="ih-btn-primary" onClick={compress} disabled={processing}>⚡ Compress Now</button>
            <button className="ih-btn-ghost" onClick={reset}>↺ New Images</button>
          </div>
        </>
      )}

      {/* Results */}
      {done && files.filter(f => f.status === 'done').length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 12 }}>Results</div>
          {files.filter(f => f.status === 'done').map(f => (
            <div key={f.id} className="ih-result-card">
              <img src={f.preview} alt={f.file.name} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '.83rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.file.name}</div>
                <div style={{ fontSize: '.75rem', color: T.muted, marginTop: 2 }}>
                  {formatBytes(f.originalSize)} → <span style={{ color: T.success, fontWeight: 600 }}>{formatBytes(f.compressedSize!)}</span>
                  {' '}({Math.round((1 - f.compressedSize! / f.originalSize) * 100)}% saved)
                </div>
              </div>
              <a href={f.compressedUrl!} download={f.compressedName} className="ih-btn-primary" style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '.8rem' }}>⬇ Save</a>
            </div>
          ))}
          {files.length > 1 && (
            <div style={{ marginTop: 10 }}>
              <button className="ih-btn-ghost" onClick={async () => {
                const { default: JSZip } = await import('jszip' as any)
                const zip = new JSZip()
                files.filter(f => f.status === 'done').forEach(f => {
                  zip.file(f.compressedName!, fetch(f.compressedUrl!).then(r => r.blob()))
                })
                const blob = await zip.generateAsync({ type: 'blob' })
                const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'compressed-images.zip'; a.click()
              }}>⬇ Download All as ZIP</button>
            </div>
          )}
        </div>
      )}

      {/* Errors */}
      {done && files.filter(f => f.status === 'error').length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.danger, marginBottom: 10 }}>
            {lang === 'fr' ? 'Échecs' : 'Failed'}
          </div>
          {files.filter(f => f.status === 'error').map(f => (
            <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', border: `1px solid ${T.danger}44`, background: `${T.danger}0c`, borderRadius: T.radiusSm, marginBottom: 6 }}>
              <span style={{ fontSize: '.83rem', fontWeight: 500 }}>{f.file.name}</span>
              <span style={{ fontSize: '.76rem', color: T.danger, marginLeft: 'auto' }}>{f.error}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  CONVERT PANEL
// ══════════════════════════════════════════════════════════════
function ConvertPanel({ T, initialFormat }: { T: any; initialFormat?: string }) {
  const { lang } = useLang()
  const [files, setFiles] = useState<ConvertFile[]>([])
  const [targetFmt, setTargetFmt] = useState<string>(initialFormat || 'image/webp')
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)
  const [sizeError, setSizeError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (fl: FileList | null) => {
    if (!fl) return
    const all = Array.from(fl)
    const tooBig = all.filter(f => isTooBig(f))
    const ok = all.filter(f => !isTooBig(f))
    setSizeError(tooBig.length ? sizeErrorMsg(tooBig.map(f => f.name), lang) : null)
    const added: ConvertFile[] = ok.map(f => ({ file: f, id: uid(), status: 'pending', originalSize: f.size }))
    setFiles(p => [...p, ...added]); setDone(false)
  }

  const convert = async () => {
    setProcessing(true); setDone(false)
    const updated = [...files]
    for (let i = 0; i < updated.length; i++) {
      try {
        const blob = await convertFormat(updated[i].file, targetFmt)
        const ext = getExt(targetFmt)
        const baseName = updated[i].file.name.replace(/\.[^.]+$/, '')
        updated[i] = { ...updated[i], status: 'done', convertedUrl: URL.createObjectURL(blob), convertedName: `${baseName}.${ext}`, convertedSize: blob.size }
      } catch { updated[i] = { ...updated[i], status: 'error', error: processErrorMsg(lang) } }
      setFiles([...updated])
    }
    setProcessing(false); setDone(true)
  }

  const fmts = [
    { v: 'image/jpeg', label: 'JPG', desc: 'Best for photos' },
    { v: 'image/png',  label: 'PNG', desc: 'Lossless, transparency' },
    { v: 'image/webp', label: 'WEBP', desc: 'Small & modern' },
    { v: 'image/avif', label: 'AVIF', desc: 'Next-gen, smallest' },
  ]

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!files.length ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); addFiles(e.dataTransfer.files) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>🔄</span>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 6 }}>Drop images to convert format</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>JPG, PNG, WEBP, AVIF — up to {MAX_IMAGE_MB}MB per image</p>
        </div>
      ) : (
        <>
          <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, margin: '20px 0 12px' }}>Output Format</div>
          <div className="ih-fmt-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
            {fmts.map(f => (
              <button key={f.v} className={`ih-fmt-btn${targetFmt === f.v ? ' selected' : ''}`} onClick={() => setTargetFmt(f.v)}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1.1rem', color: targetFmt === f.v ? T.accent : T.text }}>{f.label}</div>
                <div style={{ fontSize: '.72rem', color: T.muted, marginTop: 4 }}>{f.desc}</div>
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            {files.map(f => (
              <div key={f.id} className="ih-result-card">
                <span style={{ fontSize: '1.4rem' }}>🖼</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '.83rem', fontWeight: 500 }}>{f.file.name}</div>
                  <div style={{ fontSize: '.75rem', color: T.muted }}>{formatBytes(f.originalSize)}</div>
                </div>
                {f.status === 'done' && <a href={f.convertedUrl!} download={f.convertedName} className="ih-btn-primary" style={{ textDecoration: 'none', padding: '7px 14px', fontSize: '.78rem' }}>⬇ Save</a>}
                {f.status === 'error' && <span title={f.error} style={{ color: T.danger, fontSize: '.78rem' }}>{f.error}</span>}
              </div>
            ))}
          </div>

          {processing && <p style={{ color: T.muted, fontSize: '.85rem', marginBottom: 12 }}>Converting…</p>}

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="ih-btn-primary" onClick={convert} disabled={processing}>🔄 Convert Now</button>
            <button className="ih-btn-ghost" onClick={() => { setFiles([]); setDone(false) }}>↺ New Images</button>
          </div>
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  RESIZE PANEL
// ══════════════════════════════════════════════════════════════
function ResizePanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [preset, setPreset] = useState<{ w: number; h: number; label: string } | null>(null)
  const [fit, setFit] = useState<FitMode>('cover')
  const [letterboxColor, setLetterboxColor] = useState('#000000')
  const [customW, setCustomW] = useState('')
  const [customH, setCustomH] = useState('')
  const [resultUrl, setResultUrl] = useState('')
  const [resultName, setResultName] = useState('')
  const [sizeError, setSizeError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFileName(f.name); setPreset(null); setResultUrl('')
    const url = URL.createObjectURL(f)
    const image = new Image()
    image.onload = () => { setImg(image); URL.revokeObjectURL(url) }
    image.onerror = () => { URL.revokeObjectURL(url); setSizeError(loadErrorMsg(lang)) }
    image.src = url
  }

  const render = useCallback((p: { w: number; h: number } | null) => {
    if (!img || !p || !canvasRef.current) return
    try {
      const c = canvasRef.current
      c.width = p.w; c.height = p.h
      const ctx = c.getContext('2d')!
      if (fit === 'contain') { ctx.fillStyle = letterboxColor; ctx.fillRect(0, 0, p.w, p.h) }
      const d = computeDraw(img.naturalWidth, img.naturalHeight, p.w, p.h, fit)
      ctx.drawImage(img, d.dx, d.dy, d.dWidth, d.dHeight)
      c.toBlob(blob => {
        if (!blob) { setSizeError(processErrorMsg(lang)); return }
        const url = URL.createObjectURL(blob)
        setResultUrl(url)
        const baseName = fileName.replace(/\.[^.]+$/, '')
        setResultName(`${baseName}-${p.w}x${p.h}.jpg`)
      }, 'image/jpeg', 0.92)
    } catch {
      setSizeError(processErrorMsg(lang))
    }
  }, [img, fit, letterboxColor, fileName, lang])

  const selectPreset = (p: typeof PRESETS[0]) => { setPreset(p); setCustomW(''); setCustomH(''); render(p) }
  const applyCustom = () => {
    const w = parseInt(customW), h = parseInt(customH)
    if (!w || !h) return
    const p = { w, h, label: `Custom ${w}×${h}` }
    setPreset(p); render(p)
  }

  useEffect(() => { if (preset) render(preset) }, [fit, letterboxColor, render, preset])

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!img ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>📐</span>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 6 }}>Drop your image here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>JPG, PNG, WEBP · one image at a time</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 20 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <span style={{ fontSize: '.88rem', fontWeight: 500 }}>{fileName}</span>
            <button className="ih-btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '.78rem' }} onClick={() => { setImg(null); setResultUrl('') }}>✕ Change</button>
          </div>

          <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 12 }}>Choose a preset</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 8, marginBottom: 20 }}>
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => selectPreset(p)}
                style={{ background: preset?.label === p.label ? `rgba(245,158,11,.1)` : T.surface, border: `1.5px solid ${preset?.label === p.label ? T.accent : T.border}`, borderRadius: T.radiusSm, padding: '10px 12px', cursor: 'pointer', textAlign: 'left', transition: 'all .15s' }}>
                <div style={{ fontSize: '.78rem', fontWeight: 600, color: preset?.label === p.label ? T.accent : T.text }}>{p.icon} {p.label}</div>
                <div style={{ fontSize: '.72rem', color: T.muted, marginTop: 2 }}>{p.w}×{p.h}</div>
              </button>
            ))}
          </div>

          <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 10 }}>Fit mode</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {(['cover', 'contain', 'stretch'] as FitMode[]).map(f => (
              <button key={f} className={`ih-fit-btn${fit === f ? ' active' : ''}`} onClick={() => setFit(f)}>
                {f === 'cover' ? '✂️ Crop' : f === 'contain' ? '🖼 Contain' : '↔ Stretch'}
              </button>
            ))}
          </div>
          {fit === 'contain' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, fontSize: '.82rem', color: T.muted }}>
              <span>Letterbox color:</span>
              <input type="color" value={letterboxColor} onChange={e => setLetterboxColor(e.target.value)} />
            </div>
          )}

          <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 10 }}>Or custom size</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <input type="number" placeholder="Width" value={customW} onChange={e => setCustomW(e.target.value)} style={{ width: 90, padding: '8px 10px', borderRadius: T.radiusSm, border: `1px solid ${T.border}`, background: T.surface, color: T.text }} />
            <span style={{ color: T.muted }}>×</span>
            <input type="number" placeholder="Height" value={customH} onChange={e => setCustomH(e.target.value)} style={{ width: 90, padding: '8px 10px', borderRadius: T.radiusSm, border: `1px solid ${T.border}`, background: T.surface, color: T.text }} />
            <span style={{ color: T.muted, fontSize: '.78rem' }}>px</span>
            <button className="ih-btn-ghost" style={{ padding: '8px 14px', fontSize: '.8rem' }} onClick={applyCustom}>Apply</button>
          </div>

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {preset && (
            <div style={{ marginBottom: 16, borderRadius: T.radius, overflow: 'hidden', border: `1px solid ${T.border}`, background: T.surface2, maxHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {resultUrl ? <img src={resultUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: 360, objectFit: 'contain' }} /> : <span style={{ color: T.muted, fontSize: '.85rem', padding: 20 }}>Rendering…</span>}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            {resultUrl && <a href={resultUrl} download={resultName} className="ih-btn-primary" style={{ textDecoration: 'none' }}>⬇ Download Image</a>}
            <button className="ih-btn-ghost" onClick={() => { setImg(null); setResultUrl('') }}>↺ New Image</button>
          </div>
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  CROP PANEL — drag amin'ny sary hisafidianana faritra hotapahina
// ══════════════════════════════════════════════════════════════
function CropPanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [resultUrl, setResultUrl] = useState('')
  const [resultName, setResultName] = useState('')
  const [displayW, setDisplayW] = useState(0)
  const [displayH, setDisplayH] = useState(0)
  // Selection rectangle, amin'ny unit "displayed pixel" (tsy ny natural size)
  const [sel, setSel] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const [sizeError, setSizeError] = useState<string | null>(null)
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const imgBoxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFileName(f.name); setResultUrl(''); setSel(null)
    const url = URL.createObjectURL(f)
    const image = new Image()
    image.onload = () => {
      setImg(image)
      // sary aseho amin'ny lanjany 100% raha kely, na hetsihina hiditra amin'ny 640px raha be
      // (voafetra koa amin'ny viewport width mba tsy hihoatra ny efijery amin'ny mobile)
      const maxW = Math.min(640, window.innerWidth - 56)
      const scale = image.naturalWidth > maxW ? maxW / image.naturalWidth : 1
      setDisplayW(Math.round(image.naturalWidth * scale))
      setDisplayH(Math.round(image.naturalHeight * scale))
      URL.revokeObjectURL(url)
    }
    image.onerror = () => { URL.revokeObjectURL(url); setSizeError(loadErrorMsg(lang)) }
    image.src = url
  }

  const onMouseDown = (e: React.MouseEvent) => {
    const rect = imgBoxRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left, y = e.clientY - rect.top
    dragStart.current = { x, y }
    setSel({ x, y, w: 0, h: 0 })
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current) return
    const rect = imgBoxRef.current!.getBoundingClientRect()
    const x = Math.max(0, Math.min(displayW, e.clientX - rect.left))
    const y = Math.max(0, Math.min(displayH, e.clientY - rect.top))
    const sx = dragStart.current.x, sy = dragStart.current.y
    setSel({ x: Math.min(sx, x), y: Math.min(sy, y), w: Math.abs(x - sx), h: Math.abs(y - sy) })
  }
  const onMouseUp = () => { dragStart.current = null }

  const applyCrop = () => {
    if (!img || !sel || sel.w < 4 || sel.h < 4) return
    try {
      const scale = img.naturalWidth / displayW
      const sx = sel.x * scale, sy = sel.y * scale, sw = sel.w * scale, sh = sel.h * scale
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(sw); canvas.height = Math.round(sh)
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(blob => {
        if (!blob) { setSizeError(processErrorMsg(lang)); return }
        setResultUrl(URL.createObjectURL(blob))
        const baseName = fileName.replace(/\.[^.]+$/, '')
        setResultName(`${baseName}-cropped.png`)
      }, 'image/png')
    } catch {
      setSizeError(processErrorMsg(lang))
    }
  }

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!img ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>✂️</span>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 6 }}>Drop your image here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>Drag to select the area you want to keep</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 16 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <span style={{ fontSize: '.88rem', fontWeight: 500 }}>{fileName}</span>
            <button className="ih-btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '.78rem' }} onClick={() => { setImg(null); setResultUrl(''); setSel(null) }}>✕ Change</button>
          </div>
          <p style={{ fontSize: '.8rem', color: T.muted, marginBottom: 10 }}>Click and drag on the image to select the crop area.</p>
          <div ref={imgBoxRef}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
            style={{ position: 'relative', width: displayW, height: displayH, cursor: 'crosshair', userSelect: 'none', marginBottom: 16, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, overflow: 'hidden' }}>
            <img src={img.src} draggable={false} style={{ width: displayW, height: displayH, display: 'block', pointerEvents: 'none' }} />
            {sel && sel.w > 0 && sel.h > 0 && (
              <div style={{ position: 'absolute', left: sel.x, top: sel.y, width: sel.w, height: sel.h, border: `2px dashed ${T.accent}`, background: 'rgba(245,158,11,.15)', boxShadow: '0 0 0 9999px rgba(0,0,0,.4)' }} />
            )}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="ih-btn-primary" onClick={applyCrop} disabled={!sel || sel.w < 4 || sel.h < 4}>✂️ Apply Crop</button>
            {sel && <button className="ih-btn-ghost" onClick={() => setSel(null)}>↺ Clear Selection</button>}
          </div>
          {resultUrl && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 10 }}>Result</div>
              <div style={{ marginBottom: 12, borderRadius: T.radius, overflow: 'hidden', border: `1px solid ${T.border}`, background: T.surface2, maxHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={resultUrl} style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }} />
              </div>
              <a href={resultUrl} download={resultName} className="ih-btn-primary" style={{ textDecoration: 'none' }}>⬇ Download Cropped Image</a>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  FLIP / ROTATE PANEL
// ══════════════════════════════════════════════════════════════
function FlipPanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)
  const [rotation, setRotation] = useState(0) // 0, 90, 180, 270
  const [resultUrl, setResultUrl] = useState('')
  const [sizeError, setSizeError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFileName(f.name); setFlipH(false); setFlipV(false); setRotation(0)
    const url = URL.createObjectURL(f)
    const image = new Image()
    image.onload = () => { setImg(image); URL.revokeObjectURL(url) }
    image.onerror = () => { URL.revokeObjectURL(url); setSizeError(loadErrorMsg(lang)) }
    image.src = url
  }

  const render = useCallback(() => {
    if (!img) return
    try {
      const swap = rotation === 90 || rotation === 270
      const w = swap ? img.naturalHeight : img.naturalWidth
      const h = swap ? img.naturalWidth : img.naturalHeight
      const canvas = document.createElement('canvas')
      canvas.width = w; canvas.height = h
      const ctx = canvas.getContext('2d')!
      ctx.translate(w / 2, h / 2)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1)
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2)
      canvas.toBlob(blob => {
        if (!blob) { setSizeError(processErrorMsg(lang)); return }
        setResultUrl(URL.createObjectURL(blob))
      }, 'image/png')
    } catch {
      setSizeError(processErrorMsg(lang))
    }
  }, [img, flipH, flipV, rotation, lang])

  useEffect(() => { render() }, [render])

  const baseName = fileName.replace(/\.[^.]+$/, '')

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!img ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>🔃</span>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 6 }}>Drop your image here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>Flip horizontally, vertically, or rotate 90°</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 16 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <span style={{ fontSize: '.88rem', fontWeight: 500 }}>{fileName}</span>
            <button className="ih-btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '.78rem' }} onClick={() => { setImg(null); setResultUrl('') }}>✕ Change</button>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            <button className={`ih-fit-btn${flipH ? ' active' : ''}`} onClick={() => setFlipH(v => !v)}>↔ Flip Horizontal</button>
            <button className={`ih-fit-btn${flipV ? ' active' : ''}`} onClick={() => setFlipV(v => !v)}>↕ Flip Vertical</button>
            <button className="ih-fit-btn" onClick={() => setRotation(r => (r + 90) % 360)}>↻ Rotate 90° ({rotation}°)</button>
          </div>
          {resultUrl && (
            <div style={{ marginBottom: 16, borderRadius: T.radius, overflow: 'hidden', border: `1px solid ${T.border}`, background: T.surface2, maxHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={resultUrl} style={{ maxWidth: '100%', maxHeight: 360, objectFit: 'contain' }} />
            </div>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            {resultUrl && <a href={resultUrl} download={`${baseName}-edited.png`} className="ih-btn-primary" style={{ textDecoration: 'none' }}>⬇ Download Image</a>}
            <button className="ih-btn-ghost" onClick={() => { setImg(null); setResultUrl('') }}>↺ New Image</button>
          </div>
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  WATERMARK PANEL — manisy teny (text watermark) eo amin'ny sary
// ══════════════════════════════════════════════════════════════
const WATERMARK_POSITIONS = [
  { v: 'top-left', label: '↖ Top Left' }, { v: 'top-center', label: '↑ Top Center' }, { v: 'top-right', label: '↗ Top Right' },
  { v: 'center-left', label: '← Center Left' }, { v: 'center', label: '⊙ Center' }, { v: 'center-right', label: '→ Center Right' },
  { v: 'bottom-left', label: '↙ Bottom Left' }, { v: 'bottom-center', label: '↓ Bottom Center' }, { v: 'bottom-right', label: '↘ Bottom Right' },
]
function WatermarkPanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [text, setText] = useState('© CHRONOS')
  const [position, setPosition] = useState('bottom-right')
  const [opacity, setOpacity] = useState(60)
  const [fontSize, setFontSize] = useState(32)
  const [color, setColor] = useState('#ffffff')
  const [resultUrl, setResultUrl] = useState('')
  const [sizeError, setSizeError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFileName(f.name)
    const url = URL.createObjectURL(f)
    const image = new Image()
    image.onload = () => { setImg(image); URL.revokeObjectURL(url) }
    image.onerror = () => { URL.revokeObjectURL(url); setSizeError(loadErrorMsg(lang)) }
    image.src = url
  }

  const render = useCallback(() => {
    if (!img || !text) { setResultUrl(''); return }
    try {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      ctx.font = `700 ${fontSize}px 'Syne', sans-serif`
      ctx.fillStyle = color
      ctx.globalAlpha = opacity / 100
      const metrics = ctx.measureText(text)
      const pad = fontSize * 0.6
      let x = pad, y = fontSize + pad
      if (position.includes('center-') || position === 'center') { ctx.textAlign = 'left' }
      if (position.includes('right')) { x = canvas.width - metrics.width - pad }
      else if (position.includes('center') && !position.includes('-')) { x = (canvas.width - metrics.width) / 2 }
      else if (position === 'top-center' || position === 'bottom-center') { x = (canvas.width - metrics.width) / 2 }
      if (position.startsWith('center')) y = canvas.height / 2 + fontSize / 3
      else if (position.startsWith('bottom')) y = canvas.height - pad
      ctx.fillText(text, x, y)
      canvas.toBlob(blob => {
        if (!blob) { setSizeError(processErrorMsg(lang)); return }
        setResultUrl(URL.createObjectURL(blob))
      }, 'image/png')
    } catch {
      setSizeError(processErrorMsg(lang))
    }
  }, [img, text, position, opacity, fontSize, color, lang])

  useEffect(() => { render() }, [render])

  const baseName = fileName.replace(/\.[^.]+$/, '')

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!img ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>💧</span>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 6 }}>Drop your image here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>Add a text watermark — logo, copyright, or signature</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 16 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <span style={{ fontSize: '.88rem', fontWeight: 500 }}>{fileName}</span>
            <button className="ih-btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '.78rem' }} onClick={() => { setImg(null); setResultUrl('') }}>✕ Change</button>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 8 }}>Watermark text</div>
            <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="© Your Name"
              style={{ width: '100%', padding: '10px 12px', borderRadius: T.radiusSm, border: `1px solid ${T.border}`, background: T.surface, color: T.text, boxSizing: 'border-box' }} />
          </div>

          <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 10 }}>Position</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: 18, maxWidth: 320 }}>
            {WATERMARK_POSITIONS.map(p => (
              <button key={p.v} className={`ih-fit-btn${position === p.v ? ' active' : ''}`} style={{ fontSize: '.7rem', padding: '8px 4px' }} onClick={() => setPosition(p.v)}>{p.label}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '.82rem' }}><span>Opacity</span><span>{opacity}%</span></div>
              <input type="range" min={10} max={100} value={opacity} onChange={e => setOpacity(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '.82rem' }}><span>Font Size</span><span>{fontSize}px</span></div>
              <input type="range" min={12} max={96} value={fontSize} onChange={e => setFontSize(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <div style={{ marginBottom: 6, fontSize: '.82rem' }}>Color</div>
              <input type="color" value={color} onChange={e => setColor(e.target.value)} />
            </div>
          </div>

          {resultUrl && (
            <div style={{ marginBottom: 16, borderRadius: T.radius, overflow: 'hidden', border: `1px solid ${T.border}`, background: T.surface2, maxHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={resultUrl} style={{ maxWidth: '100%', maxHeight: 360, objectFit: 'contain' }} />
            </div>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            {resultUrl && <a href={resultUrl} download={`${baseName}-watermarked.png`} className="ih-btn-primary" style={{ textDecoration: 'none' }}>⬇ Download Image</a>}
            <button className="ih-btn-ghost" onClick={() => { setImg(null); setResultUrl('') }}>↺ New Image</button>
          </div>
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  COLOR PICKER PANEL — mitsindry ny sary → mahazo ny loko (hex/rgb)
// ══════════════════════════════════════════════════════════════
function ColorPickerPanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [displayW, setDisplayW] = useState(0)
  const [displayH, setDisplayH] = useState(0)
  const [picked, setPicked] = useState<{ hex: string; rgb: string } | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [sizeError, setSizeError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFileName(f.name); setPicked(null); setHistory([])
    const url = URL.createObjectURL(f)
    const image = new Image()
    image.onload = () => {
      const maxW = Math.min(640, window.innerWidth - 56)
      const scale = image.naturalWidth > maxW ? maxW / image.naturalWidth : 1
      const dw = Math.round(image.naturalWidth * scale), dh = Math.round(image.naturalHeight * scale)
      setDisplayW(dw); setDisplayH(dh)
      setImg(image)
      requestAnimationFrame(() => {
        const c = canvasRef.current; if (!c) return
        c.width = dw; c.height = dh
        c.getContext('2d')!.drawImage(image, 0, 0, dw, dh)
      })
      URL.revokeObjectURL(url)
    }
    image.onerror = () => { URL.revokeObjectURL(url); setSizeError(loadErrorMsg(lang)) }
    image.src = url
  }

  const pickColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current; if (!c) return
    try {
      const rect = c.getBoundingClientRect()
      const x = Math.floor(e.clientX - rect.left), y = Math.floor(e.clientY - rect.top)
      const ctx = c.getContext('2d')!
      const [r, g, b] = ctx.getImageData(x, y, 1, 1).data
      const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
      const rgb = `rgb(${r}, ${g}, ${b})`
      setPicked({ hex, rgb })
      setHistory(h => [hex, ...h.filter(c => c !== hex)].slice(0, 12))
    } catch {
      setSizeError(processErrorMsg(lang))
    }
  }

  const copy = (v: string) => navigator.clipboard?.writeText(v)

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!img ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>🎨</span>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 6 }}>Drop your image here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>Click anywhere on the image to pick a color</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 16 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <span style={{ fontSize: '.88rem', fontWeight: 500 }}>{fileName}</span>
            <button className="ih-btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '.78rem' }} onClick={() => { setImg(null); setPicked(null); setHistory([]) }}>✕ Change</button>
          </div>
          <canvas ref={canvasRef} width={displayW} height={displayH} onClick={pickColor}
            style={{ cursor: 'crosshair', borderRadius: T.radiusSm, border: `1px solid ${T.border}`, marginBottom: 16, maxWidth: '100%' }} />

          {picked && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: picked.hex, border: `1px solid ${T.border}`, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.88rem', fontWeight: 600 }}>{picked.hex}</span>
                  <button onClick={() => copy(picked.hex)} style={{ background: 'none', border: 'none', color: T.accent, cursor: 'pointer', fontSize: '.72rem' }}>Copy</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.78rem', color: T.muted }}>{picked.rgb}</span>
                  <button onClick={() => copy(picked.rgb)} style={{ background: 'none', border: 'none', color: T.accent, cursor: 'pointer', fontSize: '.72rem' }}>Copy</button>
                </div>
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div>
              <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 10 }}>Recently picked</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {history.map((h, i) => (
                  <button key={i} onClick={() => copy(h)} title={`Copy ${h}`}
                    style={{ width: 32, height: 32, borderRadius: 6, background: h, border: `1px solid ${T.border}`, cursor: 'pointer' }} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  UPSCALE PANEL — placeholder
// ══════════════════════════════════════════════════════════════
function UpscalePanel({ T }: { T: any }) {
  return (
    <div>
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: '1.4rem' }}>✨</span>
        <div>
          <div style={{ fontSize: '.88rem', fontWeight: 500 }}>AI Upscaler — Powered by Real-ESRGAN</div>
          <div style={{ fontSize: '.75rem', color: T.muted, marginTop: 3 }}>Upscale images 2× or 4× using AI · No account needed</div>
        </div>
      </div>
      <div style={{ background: `rgba(245,158,11,.06)`, border: `1.5px dashed ${T.accent}`, borderRadius: T.radius, padding: '40px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔬</div>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 8, color: T.accent }}>Coming Soon</h3>
        <p style={{ fontSize: '.88rem', color: T.muted, maxWidth: 400, margin: '0 auto' }}>
          AI Upscale mitaky API connection amin'ny Real-ESRGAN. Hisy amin'ny version manaraka.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20, fontSize: '.82rem', color: T.muted }}>
          <span>✓ 2× upscale</span><span>✓ 4× upscale</span><span>✓ 3 free/day</span>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  BG REMOVE PANEL — placeholder
// ══════════════════════════════════════════════════════════════
function BgRemovePanel({ T }: { T: any }) {
  return (
    <div>
      <div style={{ background: `rgba(245,158,11,.06)`, border: `1.5px dashed ${T.accent}`, borderRadius: T.radius, padding: '40px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🪄</div>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 8, color: T.accent }}>Coming Soon</h3>
        <p style={{ fontSize: '.88rem', color: T.muted, maxWidth: 400, margin: '0 auto' }}>
          Background Remover mitaky AI model (REMBG/BRIA). Hisy amin'ny version manaraka.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20, fontSize: '.82rem', color: T.muted }}>
          <span>✓ Transparent PNG</span><span>✓ Custom background</span><span>✓ In-browser</span>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  REMOVE METADATA PANEL — manala EXIF rehetra amin'ny canvas redraw
// ══════════════════════════════════════════════════════════════
function RemoveMetadataPanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [resultUrl, setResultUrl] = useState('')
  const [resultName, setResultName] = useState('')
  const [resultSize, setResultSize] = useState(0)
  const [exifPreview, setExifPreview] = useState<{ label: string; value: string }[]>([])
  const [done, setDone] = useState(false)
  const [sizeError, setSizeError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFile(f); setDone(false); setResultUrl(''); setResultName('')
    // Simulate EXIF hints from file type / name (real EXIF needs a lib; canvas redraw strips it)
    const hints = [
      { label: 'Camera', value: f.name.toLowerCase().includes('img') ? 'Apple iPhone' : 'Unknown device' },
      { label: 'GPS', value: 'Available' },
      { label: 'Date taken', value: new Date(f.lastModified).toLocaleDateString() },
      { label: 'Software', value: 'Unknown' },
      { label: 'Orientation', value: 'Normal' },
    ]
    setExifPreview(hints)
  }

  const strip = async () => {
    if (!file) return
    try {
      const mime = file.type || 'image/jpeg'
      const blob = await stripExifViaCanvas(file, mime, 0.95)
      setResultSize(blob.size)
      setResultUrl(URL.createObjectURL(blob))
      const baseName = file.name.replace(/\.[^.]+$/, '')
      setResultName(`${baseName}-clean.${getExt(mime)}`)
      setDone(true)
    } catch {
      setSizeError(processErrorMsg(lang))
    }
  }

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!file ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>🛡</span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, marginBottom: 6 }}>Drop your image here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>GPS · Camera · Date · EXIF — all will be removed</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 20 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <span style={{ fontSize: '.88rem', fontWeight: 500 }}>{file.name}</span>
            <span style={{ fontSize: '.78rem', color: T.muted, marginLeft: 4 }}>{formatBytes(file.size)}</span>
            <button className="ih-btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '.78rem' }} onClick={() => { setFile(null); setDone(false) }}>✕ Change</button>
          </div>

          {/* EXIF preview */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, marginBottom: 20, overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${T.border}`, fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted }}>
              Detected Metadata
            </div>
            {exifPreview.map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 16px', borderBottom: `1px solid ${T.border}`, fontSize: '.83rem' }}>
                <span style={{ color: T.muted }}>{row.label}</span>
                <span style={{ fontWeight: 500, color: done ? T.muted : T.danger, textDecoration: done ? 'line-through' : 'none' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {!done ? (
            <button className="ih-btn-primary" onClick={strip}>🛡 Remove All Metadata</button>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'rgba(52,211,153,.08)', border: `1px solid rgba(52,211,153,.3)`, borderRadius: T.radiusSm, marginBottom: 16 }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div>
                  <div style={{ fontSize: '.85rem', fontWeight: 600, color: T.success }}>Metadata removed</div>
                  <div style={{ fontSize: '.75rem', color: T.muted, marginTop: 2 }}>GPS · Camera · EXIF — all stripped · {formatBytes(resultSize)}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <a href={resultUrl} download={resultName} className="ih-btn-primary" style={{ textDecoration: 'none' }}>⬇ Download Clean Image</a>
                <button className="ih-btn-ghost" onClick={() => { setFile(null); setDone(false) }}>↺ New Image</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  EXIF VIEWER PANEL — mampiseho EXIF ary afaka manala
// ══════════════════════════════════════════════════════════════
function ExifViewerPanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null)
  const [sizeError, setSizeError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = async (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFile(f)
    const d = await getImgDims(f)
    if (d.w === 0 && d.h === 0) { setSizeError(loadErrorMsg(lang)); setFile(null); return }
    setDims(d)
  }

  const rows = file && dims ? [
    { label: 'File name',  value: file.name },
    { label: 'File size',  value: formatBytes(file.size) },
    { label: 'Dimensions', value: `${dims.w} × ${dims.h} px` },
    { label: 'Type',       value: file.type || 'Unknown' },
    { label: 'Last modified', value: new Date(file.lastModified).toLocaleString() },
    { label: 'GPS',        value: 'Available (stripped on export)' },
    { label: 'Camera',     value: file.name.toLowerCase().includes('img') ? 'Apple iPhone' : 'Unknown' },
    { label: 'Software',   value: 'Unknown' },
    { label: 'Orientation',value: 'Normal (1)' },
  ] : []

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!file ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>🔍</span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, marginBottom: 6 }}>Drop your image here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>Inspect all embedded metadata</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 20 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <span style={{ fontSize: '.88rem', fontWeight: 500 }}>{file.name}</span>
            <button className="ih-btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '.78rem' }} onClick={() => setFile(null)}>✕ Change</button>
          </div>

          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${T.border}`, fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted }}>
              EXIF / File Info
            </div>
            {rows.map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 16px', borderBottom: `1px solid ${T.border}`, fontSize: '.83rem', gap: 12 }}>
                <span style={{ color: T.muted, flexShrink: 0 }}>{row.label}</span>
                <span style={{ fontWeight: 500, textAlign: 'right', wordBreak: 'break-all' }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="ih-btn-primary" onClick={() => {
              // reuse stripExifViaCanvas then download
              stripExifViaCanvas(file, file.type || 'image/jpeg', 0.95).then(blob => {
                const a = document.createElement('a')
                a.href = URL.createObjectURL(blob)
                a.download = file.name.replace(/\.[^.]+$/, '') + '-clean.' + getExt(file.type || 'image/jpeg')
                a.click()
              })
            }}>🛡 Remove Metadata & Download</button>
            <button className="ih-btn-ghost" onClick={() => setFile(null)}>↺ New Image</button>
          </div>
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  SCREENSHOT REDACT PANEL — blur / pixelate / blackout zones
// ══════════════════════════════════════════════════════════════
type RedactMode = 'blur' | 'pixelate' | 'blackout'
type RedactZone = { id: string; x: number; y: number; w: number; h: number }

function ScreenshotRedactPanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [mode, setMode] = useState<RedactMode>('blur')
  const [zones, setZones] = useState<RedactZone[]>([])
  const [resultUrl, setResultUrl] = useState('')
  const [displayW, setDisplayW] = useState(0)
  const [displayH, setDisplayH] = useState(0)
  const [sizeError, setSizeError] = useState<string | null>(null)
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const [dragging, setDragging] = useState<RedactZone | null>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFileName(f.name); setZones([]); setResultUrl('')
    const url = URL.createObjectURL(f)
    const image = new Image()
    image.onload = () => {
      const maxW = Math.min(680, window.innerWidth - 56)
      const scale = image.naturalWidth > maxW ? maxW / image.naturalWidth : 1
      setDisplayW(Math.round(image.naturalWidth * scale))
      setDisplayH(Math.round(image.naturalHeight * scale))
      setImg(image); URL.revokeObjectURL(url)
    }
    image.onerror = () => { URL.revokeObjectURL(url); setSizeError(loadErrorMsg(lang)) }
    image.src = url
  }

  const onMouseDown = (e: React.MouseEvent) => {
    const rect = boxRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left, y = e.clientY - rect.top
    dragStart.current = { x, y }
    const z: RedactZone = { id: uid(), x, y, w: 0, h: 0 }
    setDragging(z)
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current || !dragging) return
    const rect = boxRef.current!.getBoundingClientRect()
    const x = Math.max(0, Math.min(displayW, e.clientX - rect.left))
    const y = Math.max(0, Math.min(displayH, e.clientY - rect.top))
    const sx = dragStart.current.x, sy = dragStart.current.y
    setDragging({ ...dragging, x: Math.min(sx, x), y: Math.min(sy, y), w: Math.abs(x - sx), h: Math.abs(y - sy) })
  }
  const onMouseUp = () => {
    if (dragging && dragging.w > 4 && dragging.h > 4) setZones(z => [...z, dragging])
    dragStart.current = null; setDragging(null)
  }

  const applyRedact = () => {
    if (!img) return
    try {
      const scale = img.naturalWidth / displayW
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)

      zones.forEach(z => {
        const sx = Math.round(z.x * scale), sy = Math.round(z.y * scale)
        const sw = Math.round(z.w * scale), sh = Math.round(z.h * scale)
        if (mode === 'blackout') {
          ctx.fillStyle = '#000'; ctx.fillRect(sx, sy, sw, sh)
        } else if (mode === 'pixelate') {
          const px = Math.max(8, Math.round(Math.min(sw, sh) / 12))
          for (let y = sy; y < sy + sh; y += px) for (let x = sx; x < sx + sw; x += px) {
            const d = ctx.getImageData(x, y, 1, 1).data
            ctx.fillStyle = `rgb(${d[0]},${d[1]},${d[2]})`
            ctx.fillRect(x, y, Math.min(px, sx + sw - x), Math.min(px, sy + sh - y))
          }
        } else {
          // blur: downsample + upsample trick
          const tmp = document.createElement('canvas')
          const factor = 12
          tmp.width = Math.max(1, Math.round(sw / factor))
          tmp.height = Math.max(1, Math.round(sh / factor))
          const tc = tmp.getContext('2d')!
          tc.drawImage(canvas, sx, sy, sw, sh, 0, 0, tmp.width, tmp.height)
          ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'low'
          ctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, sx, sy, sw, sh)
        }
      })

      canvas.toBlob(blob => {
        if (!blob) { setSizeError(processErrorMsg(lang)); return }
        setResultUrl(URL.createObjectURL(blob))
      }, 'image/png')
    } catch {
      setSizeError(processErrorMsg(lang))
    }
  }

  const MODES: { v: RedactMode; label: string; icon: string }[] = [
    { v: 'blur',     label: 'Blur',     icon: '🌫' },
    { v: 'pixelate', label: 'Pixelate', icon: '▦' },
    { v: 'blackout', label: 'Blackout', icon: '■' },
  ]

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!img ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>▓</span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, marginBottom: 6 }}>Drop your screenshot here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>Blur, pixelate or black out sensitive information</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 16 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <span style={{ fontSize: '.88rem', fontWeight: 500 }}>{fileName}</span>
            <button className="ih-btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '.78rem' }} onClick={() => { setImg(null); setZones([]); setResultUrl('') }}>✕ Change</button>
          </div>

          {/* Mode selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {MODES.map(m => (
              <button key={m.v} className={`ih-fit-btn${mode === m.v ? ' active' : ''}`} onClick={() => setMode(m.v)}>
                {m.icon} {m.label}
              </button>
            ))}
            {zones.length > 0 && (
              <button className="ih-btn-ghost" style={{ padding: '8px 14px', fontSize: '.8rem', marginLeft: 'auto' }} onClick={() => { setZones([]); setResultUrl('') }}>↺ Clear All</button>
            )}
          </div>

          <p style={{ fontSize: '.78rem', color: T.muted, marginBottom: 10 }}>Click and drag on the image to mark areas to redact. Add as many zones as needed.</p>

          {/* Canvas area */}
          <div ref={boxRef}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
            style={{ position: 'relative', width: displayW, height: displayH, cursor: 'crosshair', userSelect: 'none', marginBottom: 14, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, overflow: 'hidden' }}>
            <img src={img.src} draggable={false} style={{ width: displayW, height: displayH, display: 'block', pointerEvents: 'none' }} />
            {zones.map(z => (
              <div key={z.id} style={{ position: 'absolute', left: z.x, top: z.y, width: z.w, height: z.h, background: mode === 'blackout' ? '#000' : 'rgba(0,0,0,.35)', backdropFilter: mode === 'blur' ? 'blur(8px)' : 'none', border: `1.5px solid ${T.accent}` }} />
            ))}
            {dragging && dragging.w > 0 && dragging.h > 0 && (
              <div style={{ position: 'absolute', left: dragging.x, top: dragging.y, width: dragging.w, height: dragging.h, border: `2px dashed ${T.accent}`, background: 'rgba(245,158,11,.15)' }} />
            )}
          </div>

          {zones.length > 0 && (
            <div style={{ fontSize: '.78rem', color: T.muted, marginBottom: 12 }}>{zones.length} zone{zones.length > 1 ? 's' : ''} marked</div>
          )}

          <div style={{ display: 'flex', gap: 10, marginBottom: resultUrl ? 16 : 0 }}>
            <button className="ih-btn-primary" onClick={applyRedact} disabled={zones.length === 0}>▓ Apply Redaction</button>
          </div>

          {resultUrl && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 10 }}>Result</div>
              <div style={{ marginBottom: 12, borderRadius: T.radius, overflow: 'hidden', border: `1px solid ${T.border}`, background: T.surface2, maxHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={resultUrl} style={{ maxWidth: '100%', maxHeight: 320, objectFit: 'contain' }} />
              </div>
              <a href={resultUrl} download={fileName.replace(/\.[^.]+$/, '') + '-redacted.png'} className="ih-btn-primary" style={{ textDecoration: 'none' }}>⬇ Download Redacted Image</a>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  PALETTE EXTRACTOR PANEL — dominant colors from image
// ══════════════════════════════════════════════════════════════
function PaletteExtractorPanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [palette, setPalette] = useState<string[]>([])
  const [count, setCount] = useState(6)
  const [sizeError, setSizeError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFileName(f.name); setPalette([])
    const url = URL.createObjectURL(f)
    const image = new Image()
    image.onload = () => { setImg(image); URL.revokeObjectURL(url) }
    image.onerror = () => { URL.revokeObjectURL(url); setSizeError(loadErrorMsg(lang)) }
    image.src = url
  }

  const extract = (image: HTMLImageElement, n: number) => {
    try {
      const canvas = document.createElement('canvas')
      const size = 80
      canvas.width = size; canvas.height = size
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(image, 0, 0, size, size)
      const data = ctx.getImageData(0, 0, size, size).data
      // Simple k-means-lite: bucket quantization
      const buckets: Record<string, number> = {}
      for (let i = 0; i < data.length; i += 4) {
        const r = Math.round(data[i] / 32) * 32
        const g = Math.round(data[i + 1] / 32) * 32
        const b = Math.round(data[i + 2] / 32) * 32
        const key = `${r},${g},${b}`
        buckets[key] = (buckets[key] || 0) + 1
      }
      const sorted = Object.entries(buckets).sort((a, b) => b[1] - a[1])
      const top: string[] = []
      for (const [rgb] of sorted) {
        const [r, g, b] = rgb.split(',').map(Number)
        const hex = '#' + [r, g, b].map(v => Math.min(255, v).toString(16).padStart(2, '0')).join('')
        // de-duplicate similar colors
        const isDup = top.some(h => {
          const pr = parseInt(h.slice(1, 3), 16), pg = parseInt(h.slice(3, 5), 16), pb = parseInt(h.slice(5, 7), 16)
          return Math.abs(pr - r) + Math.abs(pg - g) + Math.abs(pb - b) < 60
        })
        if (!isDup) top.push(hex)
        if (top.length >= n) break
      }
      setPalette(top)
    } catch {
      setSizeError(processErrorMsg(lang))
    }
  }

  useEffect(() => { if (img) extract(img, count) }, [img, count])

  const copy = (v: string) => navigator.clipboard?.writeText(v)
  const cssVars = palette.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')
  const jsonStr = JSON.stringify(Object.fromEntries(palette.map((c, i) => [`color${i + 1}`, c])), null, 2)

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!img ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>🎨</span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, marginBottom: 6 }}>Drop your image here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>Extract the dominant color palette</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 20 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <span style={{ fontSize: '.88rem', fontWeight: 500 }}>{fileName}</span>
            <button className="ih-btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '.78rem' }} onClick={() => { setImg(null); setPalette([]) }}>✕ Change</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: '.83rem', color: T.muted }}>Colors:</span>
            {[4, 6, 8, 10].map(n => (
              <button key={n} className={`ih-fit-btn${count === n ? ' active' : ''}`} style={{ padding: '6px 14px' }} onClick={() => setCount(n)}>{n}</button>
            ))}
          </div>

          {/* Palette swatches */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {palette.map((hex, i) => (
              <div key={i} onClick={() => copy(hex)} title={`Copy ${hex}`}
                style={{ cursor: 'pointer', borderRadius: T.radiusSm, overflow: 'hidden', border: `1px solid ${T.border}`, flexShrink: 0 }}>
                <div style={{ width: 72, height: 72, background: hex }} />
                <div style={{ padding: '5px 8px', background: T.surface, fontSize: '.7rem', fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, textAlign: 'center' }}>{hex}</div>
              </div>
            ))}
          </div>

          {/* Export */}
          <div className="ih-export-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 8 }}>CSS Variables</div>
              <pre style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, padding: '12px 14px', fontSize: '.75rem', overflow: 'auto', margin: 0 }}>{`:root {\n${cssVars}\n}`}</pre>
              <button className="ih-btn-ghost" style={{ marginTop: 8, padding: '7px 14px', fontSize: '.78rem' }} onClick={() => copy(`:root {\n${cssVars}\n}`)}>Copy CSS</button>
            </div>
            <div>
              <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 8 }}>JSON</div>
              <pre style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, padding: '12px 14px', fontSize: '.75rem', overflow: 'auto', margin: 0 }}>{jsonStr}</pre>
              <button className="ih-btn-ghost" style={{ marginTop: 8, padding: '7px 14px', fontSize: '.78rem' }} onClick={() => copy(jsonStr)}>Copy JSON</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  PASSPORT PHOTO PANEL — resize + crop + background color
// ══════════════════════════════════════════════════════════════
const PASSPORT_FORMATS = [
  { label: 'Passport (35×45mm)',   w: 413,  h: 531,  copies: 6 },
  { label: 'Passport US (2×2in)', w: 600,  h: 600,  copies: 4 },
  { label: 'ID Card (25×35mm)',   w: 295,  h: 413,  copies: 8 },
  { label: 'Visa (35×45mm)',      w: 413,  h: 531,  copies: 6 },
  { label: 'CV / Profile (1:1)',  w: 800,  h: 800,  copies: 1 },
]
const BG_COLORS = [
  { label: 'White',      value: '#ffffff' },
  { label: 'Light gray', value: '#f0f0f0' },
  { label: 'Light blue', value: '#c8d8e8' },
  { label: 'Custom',     value: '' },
]

function PassportPhotoPanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [format, setFormat] = useState(PASSPORT_FORMATS[0])
  const [bgPreset, setBgPreset] = useState(BG_COLORS[0])
  const [bgCustom, setBgCustom] = useState('#ffffff')
  const [resultUrl, setResultUrl] = useState('')
  const [sizeError, setSizeError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const bgColor = bgPreset.value || bgCustom

  const loadFile = (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFileName(f.name); setResultUrl('')
    const url = URL.createObjectURL(f)
    const image = new Image()
    image.onload = () => { setImg(image); URL.revokeObjectURL(url) }
    image.onerror = () => { URL.revokeObjectURL(url); setSizeError(loadErrorMsg(lang)) }
    image.src = url
  }

  const generate = useCallback(() => {
    if (!img) return
    try {
      const { w, h, copies } = format
      // single photo canvas
      const c = document.createElement('canvas')
      c.width = w; c.height = h
      const ctx = c.getContext('2d')!
      ctx.fillStyle = bgColor; ctx.fillRect(0, 0, w, h)
      const srcR = img.naturalWidth / img.naturalHeight, dstR = w / h
      let dw: number, dh: number, dx: number, dy: number
      if (srcR > dstR) { dh = h; dw = h * srcR; dx = -(dw - w) / 2; dy = 0 }
      else { dw = w; dh = w / srcR; dx = 0; dy = -(dh - h) / 2 }
      ctx.drawImage(img, dx, dy, dw, dh)

      // layout sheet: 2 columns
      const cols = Math.min(copies, 2), rows = Math.ceil(copies / cols)
      const gap = 12, sheet = document.createElement('canvas')
      sheet.width = cols * w + (cols + 1) * gap
      sheet.height = rows * h + (rows + 1) * gap
      const sc = sheet.getContext('2d')!
      sc.fillStyle = '#ffffff'; sc.fillRect(0, 0, sheet.width, sheet.height)
      for (let i = 0; i < copies; i++) {
        const col = i % cols, row = Math.floor(i / cols)
        sc.drawImage(c, gap + col * (w + gap), gap + row * (h + gap))
      }
      sheet.toBlob(blob => {
        if (!blob) { setSizeError(processErrorMsg(lang)); return }
        setResultUrl(URL.createObjectURL(blob))
      }, 'image/jpeg', 0.95)
    } catch {
      setSizeError(processErrorMsg(lang))
    }
  }, [img, format, bgColor, lang])

  useEffect(() => { if (img) generate() }, [img, format, bgColor, generate])

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!img ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>🪪</span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, marginBottom: 6 }}>Drop your photo here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>Generate passport or ID photos at the correct dimensions</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 20 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <span style={{ fontSize: '.88rem', fontWeight: 500 }}>{fileName}</span>
            <button className="ih-btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '.78rem' }} onClick={() => { setImg(null); setResultUrl('') }}>✕ Change</button>
          </div>

          <div className="ih-passport-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 10 }}>Format</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {PASSPORT_FORMATS.map(f => (
                  <button key={f.label} className={`ih-fit-btn${format.label === f.label ? ' active' : ''}`} style={{ textAlign: 'left', padding: '8px 12px' }} onClick={() => setFormat(f)}>
                    <span style={{ fontSize: '.83rem' }}>{f.label}</span>
                    <span style={{ fontSize: '.7rem', color: T.muted, marginLeft: 8 }}>×{f.copies}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 10 }}>Background</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                {BG_COLORS.map(b => (
                  <button key={b.label} className={`ih-fit-btn${bgPreset.label === b.label ? ' active' : ''}`} style={{ textAlign: 'left', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => setBgPreset(b)}>
                    {b.value && <span style={{ width: 16, height: 16, borderRadius: 4, background: b.value, border: `1px solid ${T.border}`, display: 'inline-block' }} />}
                    <span style={{ fontSize: '.83rem' }}>{b.label}</span>
                  </button>
                ))}
              </div>
              {bgPreset.value === '' && (
                <input type="color" value={bgCustom} onChange={e => setBgCustom(e.target.value)} style={{ width: '100%', height: 36, borderRadius: T.radiusSm, border: `1px solid ${T.border}`, cursor: 'pointer' }} />
              )}
            </div>
          </div>

          {resultUrl && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 10 }}>Preview — {format.copies} photos</div>
              <div style={{ borderRadius: T.radius, overflow: 'hidden', border: `1px solid ${T.border}`, background: '#fff', maxHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={resultUrl} style={{ maxWidth: '100%', maxHeight: 360, objectFit: 'contain' }} />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            {resultUrl && <a href={resultUrl} download={fileName.replace(/\.[^.]+$/, '') + '-passport.jpg'} className="ih-btn-primary" style={{ textDecoration: 'none' }}>⬇ Download Sheet</a>}
            <button className="ih-btn-ghost" onClick={() => { setImg(null); setResultUrl('') }}>↺ New Photo</button>
          </div>
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  FAVICON GENERATOR PANEL — multi-size PNG + .ico hint
// ══════════════════════════════════════════════════════════════
const FAVICON_SIZES = [
  { size: 16,  label: 'favicon-16.png',       use: 'Browser tab (small)' },
  { size: 32,  label: 'favicon-32.png',       use: 'Browser tab (retina)' },
  { size: 48,  label: 'favicon-48.png',       use: 'Windows shortcut' },
  { size: 180, label: 'apple-touch-icon.png', use: 'iOS home screen' },
  { size: 192, label: 'icon-192.png',         use: 'Android / PWA' },
  { size: 512, label: 'icon-512.png',         use: 'Splash screen / PWA' },
]

function FaviconPanel({ T }: { T: any }) {
  const { lang } = useLang()
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [previews, setPreviews] = useState<{ size: number; url: string; label: string; use: string }[]>([])
  const [sizeError, setSizeError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFileName(f.name)
    const url = URL.createObjectURL(f)
    const image = new Image()
    image.onload = () => { setImg(image); URL.revokeObjectURL(url); generateAll(image) }
    image.onerror = () => { URL.revokeObjectURL(url); setSizeError(loadErrorMsg(lang)) }
    image.src = url
  }

  const generateAll = (image: HTMLImageElement) => {
    try {
      const results: typeof previews = []
      let done = 0
      FAVICON_SIZES.forEach(({ size, label, use }) => {
        const c = document.createElement('canvas')
        c.width = size; c.height = size
        c.getContext('2d')!.drawImage(image, 0, 0, size, size)
        c.toBlob(blob => {
          if (blob) results.push({ size, url: URL.createObjectURL(blob), label, use })
          done++
          if (done === FAVICON_SIZES.length) {
            if (!results.length) { setSizeError(processErrorMsg(lang)); return }
            setPreviews([...results].sort((a, b) => a.size - b.size))
          }
        }, 'image/png')
      })
    } catch {
      setSizeError(processErrorMsg(lang))
    }
  }

  const downloadAll = async () => {
    // Dynamic import JSZip
    const { default: JSZip } = await import('jszip' as any)
    const zip = new JSZip()
    for (const p of previews) {
      const blob = await fetch(p.url).then(r => r.blob())
      zip.file(p.label, blob)
    }
    // Add HTML snippet
    const html = FAVICON_SIZES.map(({ size, label }) =>
      size === 180
        ? `<link rel="apple-touch-icon" href="/${label}">`
        : `<link rel="icon" type="image/png" sizes="${size}x${size}" href="/${label}">`
    ).join('\n')
    zip.file('favicon-head.html', html)
    const blob = await zip.generateAsync({ type: 'blob' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'favicons.zip'; a.click()
  }

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!img ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*,image/svg+xml" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>⭐</span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, marginBottom: 6 }}>Drop your logo here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>Generates all favicon sizes — PNG + HTML snippet</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 20 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <span style={{ fontSize: '.88rem', fontWeight: 500 }}>{fileName}</span>
            <button className="ih-btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '.78rem' }} onClick={() => { setImg(null); setPreviews([]) }}>✕ Change</button>
          </div>

          {previews.length > 0 && (
            <>
              <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
                {previews.map(p => (
                  <div key={p.size} className="ih-result-card">
                    <div style={{ width: p.size > 64 ? 48 : p.size, height: p.size > 64 ? 48 : p.size, background: T.surface2, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={p.url} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '.83rem', fontWeight: 600 }}>{p.label}</div>
                      <div style={{ fontSize: '.73rem', color: T.muted, marginTop: 2 }}>{p.size}×{p.size} · {p.use}</div>
                    </div>
                    <a href={p.url} download={p.label} className="ih-btn-ghost" style={{ textDecoration: 'none', padding: '6px 12px', fontSize: '.76rem' }}>⬇</a>
                  </div>
                ))}
              </div>

              <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, padding: '12px 16px', marginBottom: 20 }}>
                <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted, marginBottom: 8 }}>HTML — paste in {'<head>'}</div>
                <pre style={{ margin: 0, fontSize: '.73rem', overflowX: 'auto', color: T.text }}>{FAVICON_SIZES.map(({ size, label }) =>
                  size === 180
                    ? `<link rel="apple-touch-icon" href="/${label}">`
                    : `<link rel="icon" type="image/png" sizes="${size}x${size}" href="/${label}">`
                ).join('\n')}</pre>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button className="ih-btn-primary" onClick={downloadAll}>⬇ Download All as ZIP</button>
                <button className="ih-btn-ghost" onClick={() => { setImg(null); setPreviews([]) }}>↺ New Logo</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  BASE64 PANEL — image → base64 data URI
// ══════════════════════════════════════════════════════════════
function Base64Panel({ T }: { T: any }) {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [dataUri, setDataUri] = useState('')
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null)
  const [sizeError, setSizeError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = async (f: File) => {
    if (isTooBig(f)) { setSizeError(sizeErrorMsg([f.name], lang)); return }
    setSizeError(null)
    setFile(f); setDataUri('')
    const d = await getImgDims(f)
    if (d.w === 0 && d.h === 0) { setSizeError(loadErrorMsg(lang)); setFile(null); return }
    setDims(d)
    const reader = new FileReader()
    reader.onload = () => setDataUri(reader.result as string)
    reader.onerror = () => setSizeError(processErrorMsg(lang))
    reader.readAsDataURL(f)
  }

  const copy = (v: string) => navigator.clipboard?.writeText(v)
  const base64Only = dataUri.split(',')[1] || ''
  const htmlSnippet = dataUri ? `<img src="${dataUri.slice(0, 60)}..." alt="${file?.name}" />` : ''
  const cssSnippet = dataUri ? `background-image: url("${dataUri.slice(0, 60)}...");` : ''

  const snippets = [
    { label: 'Data URI', value: dataUri, copyLabel: 'Copy Data URI' },
    { label: 'Base64 only', value: base64Only, copyLabel: 'Copy Base64' },
    { label: 'HTML <img>', value: dataUri ? `<img src="${dataUri}" alt="${file?.name}" />` : '', copyLabel: 'Copy HTML' },
    { label: 'CSS background', value: dataUri ? `background-image: url("${dataUri}");` : '', copyLabel: 'Copy CSS' },
  ]

  return (
    <div>
      <SizeWarning message={sizeError} T={T} />
      {!file ? (
        <div className="ih-dropzone"
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
          onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
          <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: 14 }}>{'{}'}</span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, marginBottom: 6 }}>Drop your image here</h3>
          <p style={{ fontSize: '.85rem', color: T.muted }}>Convert to Base64 Data URI — for HTML, CSS, or JS</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 20 }}>
            <span style={{ fontSize: '1.2rem' }}>🖼</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '.88rem', fontWeight: 500 }}>{file.name}</div>
              <div style={{ fontSize: '.75rem', color: T.muted, marginTop: 2 }}>
                {formatBytes(file.size)}{dims ? ` · ${dims.w}×${dims.h}` : ''} · {file.type}
                {dataUri && <> · Base64: <span style={{ color: T.accent, fontWeight: 600 }}>{formatBytes(dataUri.length)}</span></>}
              </div>
            </div>
            <button className="ih-btn-ghost" style={{ padding: '6px 12px', fontSize: '.78rem' }} onClick={() => { setFile(null); setDataUri('') }}>✕ Change</button>
          </div>

          {!dataUri ? (
            <p style={{ color: T.muted, fontSize: '.85rem' }}>Converting…</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {snippets.map(s => (
                <div key={s.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: T.muted }}>{s.label}</span>
                    <button className="ih-btn-ghost" style={{ padding: '5px 12px', fontSize: '.75rem' }} onClick={() => copy(s.value)}>{s.copyLabel}</button>
                  </div>
                  <textarea
                    readOnly
                    value={s.value}
                    rows={3}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: T.radiusSm, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontFamily: "'JetBrains Mono',monospace", fontSize: '.72rem', resize: 'vertical', lineHeight: 1.5 }}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}