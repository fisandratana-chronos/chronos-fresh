'use client'

// ── components/calculators/SmartCalcHub.tsx ────────────────────
// Ity ihany no "shell" (sidebar, grid, search, history, share...).
// Ny calculator tsirairay dia nafindra tany amin'ny category folder
// avy (Health/, Finance/, Education/, DateTime/, Developer/,
// Convert/, Misc/) mba ho azo alaina tsirairay sy tsy lava loatra
// ny file iray.
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLang } from '../../lib/hooks/useLang'
import { DARK, LIGHT, COLORS } from '../../lib/theme'
import { BP } from '../../lib/breakpoints'
import { TOOLS, resolveToolFromPath, getCats, RELATED_TOOLS, registryTools } from '../../lib/tools'
import { SEO_CONTENT } from '../../lib/seoContent'
import { ThemeCtx, useTheme, ResultCtx, useOnResult, HistoryCtx, useHistory } from './shared/contexts'
import { HEALTH_PANEL_MAP } from './Health/HealthHome'
import { FINANCE_PANEL_MAP } from './Finance/FinanceHome'
import { EDUCATION_PANEL_MAP } from './Education/EducationHome'
import { DATETIME_PANEL_MAP } from './DateTime/DateTimeHome'
import { DEVELOPER_PANEL_MAP } from './Developer/DeveloperHome'
import { CONVERT_PANEL_MAP } from './Convert/ConvertHome'
import { MISC_PANEL_MAP } from './Misc/MiscHome'

const FONTS = ``;
const ADSENSE_CONFIG = {
  placeholderMode: true,
  publisherId: "ca-pub-XXXXXXXXXXXXXXXX",
  slots: {
    leaderboard: { id: "1234567890", fmt: "auto", label: "Leaderboard" },
    sidebar:     { id: "1234567891", fmt: "auto", label: "Sidebar" },
    rectangle:   { id: "1234567892", fmt: "auto", label: "Rectangle" },
    afterResult: { id: "1234567893", fmt: "auto", label: "After Result" },
    nativeCard:  { id: "1234567894", fmt: "fluid", label: "Native Card" },
  },
};

function useAdPush(ref: any, opts?: any) {}
function PWAInstallBanner() { return null; }
const getToolLabel = (t: any, lang: string) => lang === "fr" ? t?.frLabel || t?.label : t?.label || "";
const getToolKeywords = (t: any, lang: string) => t?.keywords || [];
const ID_TO_SLUG = Object.fromEntries(TOOLS.map(t => [t.id, "/tools" + t.slug]));
// Tool (TOOLS array) tsy manana description/frDescription — ireo saha
// ireo dia ao amin'ny registryTools (ilay full registry 63-tool) ihany,
// ka ilaina lookup map amin'ny id mba hahazoana azy amin'ny grid card.
const REGISTRY_BY_ID = Object.fromEntries(registryTools.map(r => [r.id, r]));

// ── PANEL_MAP — atambatra avy amin'ny category Home.tsx tsirairay ──
const PANEL_MAP = {
  ...HEALTH_PANEL_MAP,
  ...FINANCE_PANEL_MAP,
  ...EDUCATION_PANEL_MAP,
  ...DATETIME_PANEL_MAP,
  ...DEVELOPER_PANEL_MAP,
  ...CONVERT_PANEL_MAP,
  ...MISC_PANEL_MAP
};

// ── Hub shell ──

function SmartCalcHub({ darkProp, favsProp, onFavsChange, onBack, initialTool }: { darkProp?: any; favsProp?: any; onFavsChange?: any; onBack?: () => void; initialTool?: string }) {
  const { lang, t } = useLang();
  const router = useRouter();
  const CATS = useMemo(() => getCats(t), [t]);
  const [activeTool, setActiveTool] = useState(()=>{
    // Priority 1: explicit prop from the router (ex: /tools/age-calculator
    // → initialTool="age") — jereo PDF_TAB_BY_SLUG-mitovy mapping ao
    // amin'ny ToolPageClient.tsx. Marina kokoa noho ny resolveToolFromPath()
    // satria io farany io dia mamerina ny URL segment FENO (ohatra
    // "age-calculator") izay tsy mitovy amin'ny PANEL_MAP id fohy ("age").
    if(initialTool) return initialTool;
    // Priority 2: URL contains a tool slug (direct link / refresh on tool page)
    const fromUrl = resolveToolFromPath();
    if(fromUrl) return fromUrl;
    // Priority 3 (localStorage "recent") dia tsy azo atao eto — SSR
    // dia tsy manana localStorage, ka raha novakiana teto ity dia
    // hiteraka HYDRATION MISMATCH (server=null, client=avy amin'ny
    // storage) izay mahatonga an'i React hanao "regenerate ny tree"
    // manontolo — very ny event handlers rehetra (onClick) ka tsy
    // misokatra intsony ny tools rehefa tsindrina. Nafindra ho ao
    // amin'ny useEffect eto ambany io logic io.
    return null;
  });

  // ── Priority 3 (aorian'ny mount ihany): restore last used tool
  // avy amin'ny localStorage "sc-recent" — client-side ihany mba
  // tsy hisy hydration mismatch (jereo fanazavana etsy ambony). ──
  useEffect(()=>{
    if(initialTool || resolveToolFromPath()) return; // efa voafaritra avy amin'ny URL/prop
    try {
      const recent = JSON.parse(localStorage.getItem("sc-recent")||"[]");
      if(recent.length > 0 && TOOLS.find(t=>t.id===recent[0])) {
        setActiveTool(recent[0]);
      }
    } catch{}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const [activeCat,  setActiveCat]  = useState("all");
  const [query,      setQuery]      = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [showSugg,   setShowSugg]   = useState(false);
  const searchRef = useRef(null);
  const gridRef   = useRef(null);

  // ── Calc history — max 10 entries, in-memory only (resets on page reload)
  const [histEntries, setHistEntries] = useState([]);
  const [histPinned,  setHistPinned]  = useState([]);

  const pushHistory = useCallback((toolId, payload) => {
    if(!payload) return;
    setHistEntries(prev => {
      const entry = { id: toolId, ts: Date.now(), ...payload };
      // Dedup: replace if same tool + same label as most recent entry
      if(prev.length > 0 && prev[0].id === toolId && prev[0].label === payload.label) {
        return [entry, ...prev.slice(1)];
      }
      return [entry, ...prev].slice(0, 10);
    });
  }, []);

  const togglePin = useCallback((entry) => {
    setHistPinned(prev => {
      const already = prev.some(p => p.ts === entry.ts);
      if(already) return prev.filter(p => p.ts !== entry.ts);
      if(prev.length >= 2) return prev; // max 2
      if(prev.length === 1 && prev[0].id !== entry.id) return prev; // same tool only
      return [...prev, entry];
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistEntries([]);
    setHistPinned([]);
  }, []);

  // ── Theme — parent prop takes priority, fallback to localStorage.
  // Default mitovy amin'ny server (true) mba tsy hisy HYDRATION MISMATCH
  // (jereo fanazavana efa nisy teo amin'ny activeTool etsy ambony) —
  // ny tena famakiana localStorage dia atao ao amin'ny useEffect eto ambany.
  const [isDarkInternal, setIsDarkInternal] = useState(true);
  useEffect(()=>{
    try {
      const s = localStorage.getItem("sc-theme");
      if(s) setIsDarkInternal(s === "dark");
    } catch{}
  },[]);
  const isDark = darkProp !== undefined ? darkProp : isDarkInternal;
  const T = isDark ? DARK : LIGHT;
  const toggle = useCallback(()=>{
    setIsDarkInternal(d=>{ const next=!d; try{ localStorage.setItem("sc-theme", next?"dark":"light"); }catch{} return next; });
  },[]);

  // ── Favorites — parent prop takes priority, fallback to localStorage.
  // Default [] mitovy amin'ny server; ny localStorage dia vakiana ao
  // amin'ny useEffect ihany mba tsy hisy HYDRATION MISMATCH.
  const [favoritesInternal, setFavoritesInternal] = useState([]);
  useEffect(()=>{
    try {
      const stored = JSON.parse(localStorage.getItem("sc-favorites")||"[]");
      if(stored.length > 0) setFavoritesInternal(stored);
    } catch{}
  },[]);
  const favorites = favsProp !== undefined ? favsProp : favoritesInternal;
  const toggleFav = useCallback((id, e)=>{
    e?.stopPropagation();
    const next = favorites.includes(id) ? favorites.filter(x=>x!==id) : [...favorites, id];
    setFavoritesInternal(next);
    try { localStorage.setItem("sc-favorites", JSON.stringify(next)); } catch{}
    onFavsChange?.(next);
  },[favorites, onFavsChange]);

  // ── Recent tools — max 8, localStorage. Default [] mitovy amin'ny
  // server; ny localStorage dia vakiana ao amin'ny useEffect ihany
  // mba tsy hisy HYDRATION MISMATCH.
  const [recent, setRecent] = useState([]);
  useEffect(()=>{
    try {
      const stored = JSON.parse(localStorage.getItem("sc-recent")||"[]");
      if(stored.length > 0) setRecent(stored);
    } catch{}
  },[]);
  const panelRef = useRef(null);

  const openTool = useCallback((id)=>{
    setActiveTool(id);
    setRecent(prev=>{
      const next = [id, ...prev.filter(x=>x!==id)].slice(0,8);
      try { localStorage.setItem("sc-recent", JSON.stringify(next)); } catch{}
      return next;
    });
    setTimeout(()=>{
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  },[]);

  // ── Browser Back / Forward button support
  useEffect(()=>{
    const onPop = (e)=>{
      const id = e.state?.toolId || resolveToolFromPath();
      setActiveTool(id); // null → gallery
    };
    window.addEventListener("popstate", onPop);
    return ()=> window.removeEventListener("popstate", onPop);
  },[]);

  // ── SW registration
  useEffect(()=>{
    if("serviceWorker" in navigator){
      navigator.serviceWorker.register("/sw.js")
        .then(reg => console.log("[SW] Registered:", reg.scope))
        .catch(err => console.warn("[SW] Registration failed:", err));
    }
  },[]);

  // Reset result count on tool change
  useEffect(()=>{ setResultCount(0); },[activeTool]);

  // ── Dynamic <title> — updates on every tool open/close (SEO + browser tab)
  useEffect(()=>{
    if(!activeTool) {
      document.title = lang === "fr" ? "SmartCalc Hub — 25 Calculatrices Gratuites en Ligne" : "SmartCalc Hub — 25 Free Online Calculators";
    } else {
      const entry = SEO_CONTENT[activeTool];
      const seoTitle = (lang === "fr" && entry?.frTitle) ? entry.frTitle : entry?.title;
      const toolMeta = TOOLS.find(tl=>tl.id===activeTool);
      const toolLabel = getToolLabel(toolMeta, lang);
      document.title = seoTitle
        ? `${seoTitle} | SmartCalc Hub`
        : `${toolLabel || activeTool} | SmartCalc Hub`;
    }
  },[activeTool, lang]);

  // ── Keyboard shortcut: "/" focuses search
  useEffect(()=>{
    const h=(e)=>{ if(e.key==="/"&&document.activeElement!==searchRef.current){e.preventDefault();searchRef.current?.focus();setShowSugg(true);} };
    window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h);
  },[]);

  // ── Arrow-key navigation inside tool grid
  const handleGridKeyDown = useCallback((e)=>{
    const grid = gridRef.current;
    if(!grid) return;
    const ARROW = ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"];
    if(!ARROW.includes(e.key)) return;
    const buttons = Array.from(grid.querySelectorAll("button[data-tool-id]"));
    if(!buttons.length) return;
    const focused = document.activeElement;
    const idx = buttons.indexOf(focused);
    if(idx === -1) return;
    e.preventDefault();
    // Derive column count from computed style
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    let next = idx;
    if(e.key==="ArrowRight") next = Math.min(idx+1, buttons.length-1);
    if(e.key==="ArrowLeft")  next = Math.max(idx-1, 0);
    if(e.key==="ArrowDown")  next = Math.min(idx+cols, buttons.length-1);
    if(e.key==="ArrowUp")    next = Math.max(idx-cols, 0);
    (buttons[next] as HTMLElement)?.focus();
  },[]);

  // Close suggestions on outside click
  useEffect(()=>{
    const h=(e)=>{ if(!e.target.closest(".search-wrap")) setShowSugg(false); };
    document.addEventListener("mousedown",h); return ()=>document.removeEventListener("mousedown",h);
  },[]);

  // ── Filtered tools
  const filtered = useMemo(()=>{
    if(activeCat==="favorites") return TOOLS.filter(t=>favorites.includes(t.id));
    if(activeCat==="recent")    return recent.map(id=>TOOLS.find(t=>t.id===id)).filter(Boolean);
    const q=query.toLowerCase().trim();
    return TOOLS.filter(t=>{
      const catOk = activeCat==="all" || t.cat===activeCat;
      const searchOk = !q || getToolLabel(t,lang).toLowerCase().includes(q) || getToolKeywords(t,lang).some(k=>k.toLowerCase().includes(q));
      return catOk && searchOk;
    });
  },[query,activeCat,favorites,recent,lang]);

  // ── Search suggestions (cross-category, max 6)
  const suggestions = useMemo(()=>{
    const q=query.toLowerCase().trim();
    if(!q||q.length<1) return [];
    return TOOLS.filter(t=>
      getToolLabel(t,lang).toLowerCase().includes(q)||getToolKeywords(t,lang).some(k=>k.toLowerCase().includes(q))
    ).slice(0,6);
  },[query,lang]);

  const tool = TOOLS.find(t=>t.id===activeTool);
  const Panel = PANEL_MAP[activeTool];

  // ── Insert native ad card at adaptive position in grid
  // Injects at midpoint (min 3 before, max at position 7) so ad appears
  // in all category views, not only when ≥8 tools are visible.
  const gridItems = useMemo(():({type:"tool";data:any}|{type:"native-ad"})[]=>{
    const items:({type:"tool";data:any}|{type:"native-ad"})[] = filtered.map(t=>({ type:"tool", data:t }));
    if(items.length >= 4) {
      const pos = Math.min(7, Math.max(3, Math.floor(items.length / 2)));
      items.splice(pos, 0, { type:"native-ad" });
    }
    return items;
  },[filtered]);

  // ── Structured Data — JSON-LD schemas (SEO)
  const SITE_URL = "https://smartcalchub.com"; // ← hanova amin'ny tena URL
  const currentSlug = ID_TO_SLUG[activeTool] || "";
  const currentUrl  = SITE_URL + currentSlug;

  const schemaWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool ? `${getToolLabel(tool, lang)} — SmartCalc Hub` : "SmartCalc Hub",
    "url": currentUrl,
    "description": "25 free online calculators — Finance, Health, Dev Tools, Converters and more. No signup, no tracking, works offline.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": TOOLS.map(t => getToolLabel(t, lang)).join(", "),
    "screenshot": `${SITE_URL}/icons/icon-512.png`,
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",      "item": SITE_URL },
      ...CATS.filter(c => c.id !== "all").map((cat, i) => ({
        "@type": "ListItem",
        "position": i + 2,
        "name": cat.label,
        "item": `${SITE_URL}/?cat=${cat.id}`
      }))
    ]
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are all calculators free to use?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes — all 25 calculators on SmartCalc Hub are completely free, with no signup or account required." }
      },
      {
        "@type": "Question",
        "name": "Does SmartCalc Hub work offline?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. SmartCalc Hub is a Progressive Web App (PWA). Once loaded, all calculators work without an internet connection." }
      },
      {
        "@type": "Question",
        "name": "How do I calculate my BMI?",
        "acceptedAnswer": { "@type": "Answer", "text": "Use the BMI calculator: enter your weight in kg and height in cm, then click Calculate. The result shows your BMI score and category (Underweight, Normal, Overweight, or Obese)." }
      },
      {
        "@type": "Question",
        "name": "How does the Mortgage calculator work?",
        "acceptedAnswer": { "@type": "Answer", "text": "Enter your loan amount, annual interest rate, and term in years. The calculator computes your monthly payment, total interest paid, and total payout." }
      },
      {
        "@type": "Question",
        "name": "Can I install SmartCalc Hub on my phone?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Open the site in Chrome or Safari on your phone, then tap 'Add to Home Screen'. It installs like a native app and works offline." }
      },
      {
        "@type": "Question",
        "name": "What tools are available?",
        "acceptedAnswer": { "@type": "Answer", "text": `SmartCalc Hub offers 25 free tools: ${TOOLS.map(t=>getToolLabel(t, lang)).join(", ")}.` }
      }
    ]
  };

  return (
    <HistoryCtx.Provider value={{ entries:histEntries, pinned:histPinned, pushHistory, togglePin, clearHistory }}>
    <ThemeCtx.Provider value={{ T, isDark, toggle }}>
    <div style={{minHeight:"100vh",background:T.bg0,color:T.txt,fontFamily:"'Space Grotesk',sans-serif",transition:"background .2s,color .2s"}}>

      {/* ── STRUCTURED DATA — JSON-LD (SEO Rich Results) ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaWebApp)}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaBreadcrumb)}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaFAQ)}}/>

      <style>{FONTS}{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:${T.scrollTrack};}
        ::-webkit-scrollbar-thumb{background:${T.scrollThumb};border-radius:99px;}
        input[type=number]::-webkit-inner-spin-button{opacity:1;}
        input[type=range]{width:100%;height:4px;border-radius:99px;}
        textarea{font-family:'JetBrains Mono',monospace;}
        select option{background:${T.selectOption};color:${T.txt};}
        @media(max-width:${BP.laptop}px){
          .layout{grid-template-columns:220px 1fr!important;}
          .right-panel{display:none!important;}
        }
        @media(max-width:${BP.tablet}px){
          .layout{grid-template-columns:1fr!important;}
          .sidebar{border-right:none!important;border-bottom:1px solid ${T.border}!important;padding:12px!important;max-height:none!important;position:relative!important;top:auto!important;overflow-y:visible!important;display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;gap:4px!important;}
          .sidebar-ad{display:none!important;}
          .tool-grid{grid-template-columns:repeat(3,1fr)!important;}
        }
        @media(max-width:${BP.mobile}px){
          .tool-grid{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>

      {/* ── TOP HEADER ─────────────────────────────────────────── */}
      <header style={{borderBottom:`1px solid ${T.border}`,background:`${T.bg1}E8`,
        backdropFilter:"blur(10px)",position:"sticky",top:64,zIndex:200}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"12px 20px",
          display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          {/* Back to CHRONOS */}
          {onBack && (
            <button onClick={onBack} style={{
              flexShrink:0, background:"#2563EB", color:"#fff",
              border:"none", borderRadius:10, padding:"7px 14px",
              cursor:"pointer", fontSize:13, fontWeight:700,
              display:"flex", alignItems:"center", gap:6,
            }}>← CHRONOS</button>
          )}
          {/* Logo */}
          <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:18,color:T.amber}}>{"<calc/>"}</span>
            <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,letterSpacing:"0.05em"}}>{t("sc.toolCount")}</span>
          </div>
          {/* Search */}
          <div style={{flex:1,minWidth:200,position:"relative"}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:T.txt3,fontSize:15,pointerEvents:"none"}}>⌕</span>
            <input ref={searchRef} type="text" value={query}
              onChange={e=>setQuery(e.target.value)}
              placeholder={t("sc.searchPlaceholder")}
              style={{width:"100%",padding:"9px 36px 9px 36px",borderRadius:9,
                background:T.bg3,border:`1px solid ${query?T.amber:T.border}`,
                color:T.txt,fontFamily:"Inter,sans-serif",fontSize:13,outline:"none",
                transition:"border-color .15s"}}
            />
            {query&&<button onClick={()=>setQuery("")} aria-label="Clear search" style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:T.txt3,cursor:"pointer",fontSize:14}}>✕</button>}
          </div>
        </div>

      </header>

      {/* ── BODY LAYOUT ────────────────────────────────────────── */}
      <div className="layout" style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"220px 1fr 260px",minHeight:"calc(100vh - 64px)",alignItems:"start",gap:0}}>

        {/* ── SIDEBAR ──────────────────────────────────────────── */}
        <aside className="sidebar" style={{width:220,flexShrink:0,borderRight:`1px solid ${T.border}`,
          padding:"18px 14px",display:"flex",flexDirection:"column",gap:4,
          alignSelf:"start",position:"sticky",top:64,overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>

          {CATS.map(cat=>(
            <button key={cat.id} onClick={()=>{setActiveCat(cat.id);setQuery("");}}
              style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",
                borderRadius:8,border:"none",textAlign:"left",cursor:"pointer",
                background:activeCat===cat.id?`${T.amber}15`:"transparent",
                color:activeCat===cat.id?T.amber:T.txt2,
                fontFamily:"'Space Grotesk',sans-serif",fontWeight:activeCat===cat.id?600:400,
                fontSize:13,transition:"all .12s"}}>
              <span style={{fontSize:14}}>{cat.icon}</span>
              <span>{cat.label}</span>
              <span style={{marginLeft:"auto",fontSize:10,color:activeCat===cat.id?T.amberL:T.txt4}}>
                {cat.id==="all"?TOOLS.length
                  :cat.id==="favorites"?favorites.length
                  :cat.id==="recent"?recent.length
                  :TOOLS.filter(t=>t.cat===cat.id).length}
              </span>
            </button>
          ))}

          {/* ── Quick access box ── */}
          <div style={{marginTop:"auto",paddingTop:16,borderTop:`1px solid ${T.border}`}}>
            <div style={{background:`${T.amber}10`,border:`1px solid ${T.amber}30`,borderRadius:10,padding:"12px"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                <span style={{color:T.amber,fontSize:14}}>⚡</span>
                <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:12,color:T.txt}}>Quick access</span>
              </div>
              <p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,lineHeight:1.5,marginBottom:8}}>
                Pin your favorite tools for faster access.
              </p>
              <button style={{background:"none",border:`1px solid ${T.amber}50`,borderRadius:7,
                padding:"5px 10px",color:T.amber,cursor:"pointer",
                fontFamily:"Inter,sans-serif",fontSize:11,fontWeight:600}}>
                Learn how →
              </button>
            </div>
          </div>

          {/* ── SIDEBAR AD — 160×600 wide skyscraper ── */}
          <div className="sidebar-ad" style={{borderTop:`1px solid ${T.border}`,margin:"10px 0",paddingTop:10}}>
            <AdSlot size="160×600" label="Advertisement" slot={ADSENSE_CONFIG.slots.sidebar.id} minH={250}/>
          </div>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────── */}
        <main style={{flex:1,padding:"20px",minWidth:0}}>

          {/* ── TOP BANNER AD — 728×90 leaderboard ── */}
          <div style={{marginBottom:16}}>
            <AdSlot size="728×90" label="Advertisement" slot={ADSENSE_CONFIG.slots.leaderboard.id} minH={90}/>
          </div>

          {/* ── Sort / view controls ── */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <span style={{fontFamily:"Inter,sans-serif",fontSize:12,color:T.txt3}}>
              {filtered.length} tool{filtered.length!==1?"s":""}
              {activeCat!=="all"&&activeCat!=="favorites"&&activeCat!=="recent"?` in ${CATS.find(c=>c.id===activeCat)?.label||activeCat}`:""}
            </span>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontFamily:"Inter,sans-serif",fontSize:12,color:T.txt3}}>Sort by: Popular</span>
              <div style={{display:"flex",gap:2}}>
                {["▦","≡"].map((icon,i)=>(
                  <button key={i} style={{background:i===0?T.blue:"none",border:`1px solid ${i===0?T.blue:T.border}`,
                    borderRadius:6,padding:"4px 8px",cursor:"pointer",color:i===0?"#fff":T.txt3,fontSize:13}}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>




          {/* ── Tool grid + native ad card injected at position 8 ── */}
          <div ref={gridRef} role="grid" className="tool-grid"
            onKeyDown={handleGridKeyDown}
            style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
            {gridItems.map((item, i)=>(
              item.type==="native-ad"
                ? <NativeAdCard key="native-ad"/>
                : (
                  <div key={item.data.id}
                    style={{display:"flex",flexDirection:"column",position:"relative",
                      border:`1px solid ${activeTool===item.data.id?T.amber:T.border}`,
                      background:activeTool===item.data.id?`${T.amber}08`:T.bg1,
                      borderRadius:12,overflow:"hidden",transition:"all .15s",
                      cursor:"pointer"}}
                    onClick={() => {
                      const slug = ID_TO_SLUG[item.data.id];
                      if (slug) { router.push(slug); }
                      else { openTool(item.data.id); }
                    }}>
                    {/* ⭐ Favorite toggle */}
                   <button
                      onClick={e=>toggleFav(item.data.id,e)}
                      aria-label={favorites.includes(item.data.id)?`${t("palette.removeFromFavorites")} ${getToolLabel(item.data, lang)}`:`${t("palette.addToFavorites")} ${getToolLabel(item.data, lang)}`}
                      aria-pressed={favorites.includes(item.data.id)}
                      title={favorites.includes(item.data.id)?t("toolCard.removeFromFavorites"):t("toolCard.addToFavorites")}
                      style={{position:"absolute",top:8,right:8,fontSize:13,
                        color:favorites.includes(item.data.id)?T.amber:T.txt4,
                        cursor:"pointer",lineHeight:1,transition:"color .15s",
                        background:"none",border:"none",padding:"2px",borderRadius:4,
                        userSelect:"none",zIndex:1}}>
                      {favorites.includes(item.data.id)?"⭐":"☆"}
                    </button>
                    {/* Card body */}
                    <div style={{padding:"20px 16px 12px",display:"flex",flexDirection:"column",alignItems:"center",gap:10,flex:1}}>
                      <div style={{width:52,height:52,borderRadius:"50%",
                        background:activeTool===item.data.id?`${T.amber}20`:`${T.bg3}`,
                        display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>
                        {item.data.icon}
                      </div>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:13,
                          color:activeTool===item.data.id?T.amber:T.txt,lineHeight:1.3,marginBottom:4}}>
                          {getToolLabel(item.data, lang)}
                        </div>
                        <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,lineHeight:1.5,
                          display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
                          {lang==="fr"
                            ? (REGISTRY_BY_ID[item.data.id]?.frDescription || "")
                            : (REGISTRY_BY_ID[item.data.id]?.description || "")}
                        </div>
                      </div>
                    </div>
                    {/* Open tool button */}
                    <div style={{padding:"0 16px 14px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:4,
                        color:T.blue,fontFamily:"Inter,sans-serif",fontSize:12,fontWeight:600}}>
                        Open tool <span style={{fontSize:14}}>→</span>
                      </div>
                    </div>
                  </div>
                )
            ))}
            {filtered.length===0&&(
              <div style={{gridColumn:"1/-1",padding:"32px",textAlign:"center",
                fontFamily:"Inter,sans-serif",fontSize:14,color:T.txt3}}>
                {t("sc.noResults")} {query}
              </div>
            )}
          </div>

          {/* ── Active tool panel ── */}
          {Panel && (
            <div ref={panelRef} style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden"}}>
              {/* Panel header */}
              <div style={{padding:"16px 22px",borderBottom:`1px solid ${T.border}`,
                display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:20}}>{tool?.icon}</span>
                <div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16,color:T.txt}}>{getToolLabel(tool,lang)}</div>
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,marginTop:1}}>
                    {getToolKeywords(tool,lang).slice(0,3).join(" · ")}
                  </div>
                </div>
              </div>
              {/* Panel body */}
              <div style={{padding:"22px"}}>
                <ResultCtx.Provider value={(payload: any)=>{setResultCount((c: number)=>c+1);if(payload)pushHistory(activeTool,payload);}}>
                  <Panel key={activeTool}/>
                </ResultCtx.Provider>
                {/* ── AFTER-RESULT AD — highest CTR ── */}
                <AfterResultAd key={resultCount} toolId={activeTool} visible={resultCount>0}/>
                {/* ── SHARE RESULT BAR ── */}
                <ShareResultBar tool={tool} visible={resultCount>0}/>
                {/* ── SEO CONTENT PAGE — 500–1000 words per tool ── */}
                <ToolSeoPage toolId={activeTool}/>
                {/* ── RELATED TOOLS — internal linking / page views ── */}
                <RelatedTools currentId={activeTool} onOpen={openTool}/>
                {/* ── SCENARIO COMPARE — shown when 2 entries pinned ── */}
                <ScenarioCompare/>
                {/* ── CALC HISTORY — last 10 calculations ── */}
                <CalcHistory onOpen={openTool}/>
              </div>
            </div>
          )}

          {/* ── FOOTER BANNER AD — 728×90 ── */}
          <div style={{marginTop:20}}>
            <AdSlot size="728×90" label="Advertisement" slot={ADSENSE_CONFIG.slots.rectangle.id} minH={90}/>
          </div>

        </main>

        {/* ── RIGHT PANEL ──────────────────────────────────────── */}
        <aside className="right-panel" style={{borderLeft:`1px solid ${T.border}`,
          padding:"20px 16px",display:"flex",flexDirection:"column",gap:16,
          alignSelf:"start",position:"sticky",top:64,overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>

          {/* About box */}
          <div style={{background:T.bg1,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{width:24,height:24,borderRadius:"50%",background:`${T.blue}20`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>ℹ</span>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,color:T.txt}}>
                About Smart Calculator
              </span>
            </div>
            <p style={{fontFamily:"Inter,sans-serif",fontSize:12,color:T.txt2,lineHeight:1.7,marginBottom:14}}>
              A collection of smart and easy-to-use calculators for daily life, health, finance, and more. All tools are free to use.
            </p>
            {[
              {icon:"✅",color:T.emerald,title:"100% Free",desc:"All calculators are free to use with no sign-up required."},
              {icon:"⚡",color:T.amber,  title:"Fast & Accurate",desc:"Get instant and reliable results with our smart calculators."},
              {icon:"🛡",color:T.blue,   title:"Private",desc:"Your data stays on your device. We respect your privacy."},
              {icon:"📱",color:T.purple, title:"Works Everywhere",desc:"Use on any device, anytime, anywhere."},
            ].map(({icon,color,title,desc})=>(
              <div key={title} style={{display:"flex",gap:10,marginBottom:12}}>
                <span style={{width:22,height:22,borderRadius:"50%",background:`${color}20`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>{icon}</span>
                <div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:12,color:T.txt,marginBottom:2}}>{title}</div>
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,lineHeight:1.5}}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Unlock More box */}
          <div style={{background:"linear-gradient(135deg,#4F46E5,#7C3AED)",borderRadius:12,padding:"16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontSize:18}}>👑</span>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,color:"#fff"}}>
                Unlock More
              </span>
            </div>
            <p style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"rgba(255,255,255,0.85)",lineHeight:1.6,marginBottom:12}}>
              Get advanced tools and ad-free experience.
            </p>
            <button style={{background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.3)",
              borderRadius:8,padding:"8px 14px",color:"#fff",cursor:"pointer",
              fontFamily:"Inter,sans-serif",fontSize:12,fontWeight:600,
              display:"flex",alignItems:"center",gap:6}}>
              Learn more →
            </button>
          </div>

          {/* Right panel ad */}
          <div style={{borderRadius:10,overflow:"hidden"}}>
            <AdSlot size="300×250" label="Advertisement" slot={ADSENSE_CONFIG.slots.rectangle.id} minH={250}/>
          </div>

        </aside>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{borderTop:`1px solid ${T.border}`,padding:"16px 20px",
        display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
        <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt4}}>
          © 2026 &lt;calc/&gt; · 25 free tools · No signup · No tracking
        </span>
        <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt4}}>
          Press <kbd style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,
            padding:"1px 5px",border:`1px solid ${T.border}`,borderRadius:4,
            background:T.bg3,color:T.txt3}}>/</kbd> to search
        </span>
      </footer>
      {/* ── PWA INSTALL BANNER ── */}
      <PWAInstallBanner/>

    </div>
    </ThemeCtx.Provider>
    </HistoryCtx.Provider>
  );
}

function ToolSeoPage({ toolId }) {
  const { T } = useTheme();
  const { t, lang } = useLang();
  const content = SEO_CONTENT[toolId];
  if (!content) return null;

  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:18,
      color:T.txt,marginBottom:10,marginTop:28,lineHeight:1.3}}>
      {children}
    </h2>
  );
  const P = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <p style={{fontFamily:"Inter,sans-serif",fontSize:14,color:T.txt2,
      lineHeight:1.75,marginBottom:0,...style}}>
      {children}
    </p>
  );

  // For SEO_CONTENT text fields — use fr* variant when available & lang=fr
  const getText = (field) => (lang === "fr" && content[`fr${field.charAt(0).toUpperCase()}${field.slice(1)}`]) || content[field];
  const getFormula = () => lang === "fr" && content.frFormula ? content.frFormula : content.formula;
  const getExamples = () => (lang === "fr" && content.frExamples) ? content.frExamples : content.examples;
  const getFaq = () => (lang === "fr" && content.frFaq) ? content.frFaq : content.faq;

  return (
    <article style={{marginTop:36,paddingTop:28,borderTop:`1px solid ${T.border}`}}>

      {/* ── Title */}
      <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:22,
        color:T.txt,marginBottom:14,lineHeight:1.3}}>
        {getText("title")}
      </h1>

      {/* ── What is */}
      <H2>{t("sc.seo.whatIsIt")}</H2>
      <P>{getText("what")}</P>

      {/* ── How it works */}
      <H2>{t("sc.seo.howItWorks")}</H2>
      <P>{getText("how")}</P>

      {/* ── Formula */}
      {content.formula && (
        <>
          <H2>{t("sc.seo.formula")}</H2>
          <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:10,
            padding:"14px 18px",marginBottom:8}}>
            <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,
              color:T.amber,display:"block",marginBottom:6}}>
              {getFormula().expr}
            </code>
            {getFormula().note && (
              <span style={{fontFamily:"Inter,sans-serif",fontSize:12,color:T.txt3}}>
                {getFormula().note}
              </span>
            )}
          </div>
        </>
      )}

      {/* ── Examples */}
      {getExamples()?.length > 0 && (
        <>
          <H2>{t("sc.seo.examples")}</H2>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {getExamples().map((ex, i) => (
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,
                padding:"10px 14px",background:T.bg2,borderRadius:9,
                border:`1px solid ${T.border}`}}>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                  color:T.amber,fontWeight:700,flexShrink:0,paddingTop:2}}>
                  {String(i+1).padStart(2,"0")}
                </span>
                <div style={{flex:1}}>
                  <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,
                    fontSize:12,color:T.txt,display:"block",marginBottom:2}}>
                    {ex.label}
                  </span>
                  <span style={{fontFamily:"Inter,sans-serif",fontSize:12,color:T.txt3}}>
                    {t("sc.seo.inputLabel")} <code style={{fontFamily:"'JetBrains Mono',monospace",
                      color:T.txt2,fontSize:11}}>{ex.input}</code>
                    <span style={{margin:"0 6px",color:T.txt4}}>→</span>
                    <span style={{color:T.emerald,fontWeight:500}}>{ex.result}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── FAQ */}
      {getFaq()?.length > 0 && (
        <>
          <H2>{t("sc.seo.faqTitle")}</H2>
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {getFaq().map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} last={i===getFaq().length-1}/>
            ))}
          </div>
        </>
      )}

    </article>
  );
}

function CalcHistory({ onOpen }) {
  const { T } = useTheme();
  const { lang } = useLang();
  const { entries, pinned, togglePin, clearHistory } = useHistory();
  const [open, setOpen] = useState(false);

  if(entries.length === 0) return null;

  const fmt = (ts) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - (d as Date).getTime();
    if(diff < 60000) return "just now";
    if(diff < 3600000) return Math.floor(diff/60000) + "m ago";
    if(diff < 86400000) return Math.floor(diff/3600000) + "h ago";
    return d.toLocaleDateString();
  };

  return (
    <div style={{marginTop:28,borderTop:`1px solid ${T.border}`,paddingTop:20}}>
      {/* Header row */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:open?14:0}}>
        <button onClick={()=>setOpen(o=>!o)}
          style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",
            cursor:"pointer",padding:0}}>
          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:13,
            color:T.txt2,letterSpacing:"0.03em"}}>
            🕐 Calculation History
          </span>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,
            background:`${T.amber}20`,color:T.amber,borderRadius:99,
            padding:"2px 7px",fontWeight:700}}>
            {entries.length}
          </span>
          <span style={{color:T.txt4,fontSize:12,marginLeft:2,
            transform:open?"rotate(180deg)":"rotate(0deg)",transition:"transform .2s"}}>▾</span>
        </button>
        {open && entries.length > 0 && (
          <button onClick={clearHistory}
            style={{background:"none",border:"none",cursor:"pointer",
              fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt4,
              padding:"3px 8px",borderRadius:6,transition:"color .15s"}}>
            Clear all
          </button>
        )}
        
      </div>

      {open && (
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {entries.map((entry) => {
            const toolMeta = TOOLS.find(t=>t.id===entry.id);
            const isPinned = pinned.some(p=>p.ts===entry.ts);
            return (
              <div key={entry.ts}
                style={{display:"flex",alignItems:"flex-start",gap:10,
                  padding:"10px 13px",borderRadius:10,
                  border:`1px solid ${isPinned?T.amber:T.border}`,
                  background:isPinned?`${T.amber}08`:T.bg2,
                  transition:"border-color .15s"}}>

                {/* Tool icon + name */}
                <button onClick={()=>onOpen(entry.id)}
                  style={{display:"flex",alignItems:"center",gap:7,background:"none",
                    border:"none",cursor:"pointer",padding:0,flexShrink:0}}>
                  <span style={{fontSize:16}}>{toolMeta?.icon}</span>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,
                      fontSize:12,color:T.txt,lineHeight:1.2}}>
                      {getToolLabel(toolMeta, lang)}
                    </div>
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:10,color:T.txt4,marginTop:1}}>
                      {fmt(entry.ts)}
                    </div>
                  </div>
                </button>

                {/* Rows summary */}
                <div style={{flex:1,display:"flex",flexWrap:"wrap",gap:"3px 14px",alignItems:"center"}}>
                  {entry.rows.map((row,i)=>(
                    <span key={i} style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3}}>
                      <span style={{color:T.txt4}}>{row.k}: </span>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:600,
                        color:i===0?T.amber:T.txt2}}>{row.v}</span>
                    </span>
                  ))}
                </div>

                {/* Pin button */}
                <button
                  onClick={()=>togglePin(entry)}
                  title={isPinned?"Unpin from comparison":"Pin to compare"}
                  style={{flexShrink:0,padding:"4px 9px",borderRadius:7,
                    border:`1px solid ${isPinned?T.amber:T.border}`,
                    background:isPinned?`${T.amber}15`:"none",
                    color:isPinned?T.amber:T.txt4,
                    fontFamily:"Inter,sans-serif",fontSize:10,fontWeight:600,
                    cursor:"pointer",transition:"all .15s",whiteSpace:"nowrap"}}>
                  {isPinned ? "📌 Pinned" : "Pin"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ScenarioCompare() {
  const { T } = useTheme();
  const { t, lang } = useLang();
  const { pinned, togglePin } = useHistory();

  if(pinned.length < 2) return null;

  const [a, b] = pinned;
  const toolMeta = TOOLS.find(t=>t.id===a.id);

  // Build unified row keys (preserve order from first entry, add any extras from second)
  const keysA = a.rows.map(r=>r.k);
  const keysB = b.rows.map(r=>r.k);
  const allKeys = [...new Set([...keysA, ...keysB])];

  const getVal = (entry, key) => entry.rows.find(r=>r.k===key)?.v ?? "—";

  // Detect numeric delta: parse floats, strip non-numeric chars
  const parseFlt = v => parseFloat(String(v).replace(/[^0-9.\-]/g,""));
  const delta = (va, vb) => {
    const na = parseFlt(va), nb = parseFlt(vb);
    if(isNaN(na)||isNaN(nb)||na===0) return null;
    const pct = ((nb - na) / Math.abs(na) * 100).toFixed(1);
    return { pct, dir: nb > na ? "up" : nb < na ? "down" : "eq" };
  };

  return (
    <div style={{marginTop:20,borderRadius:12,overflow:"hidden",
      border:`1px solid ${T.amber}40`,
      background:`linear-gradient(135deg,${T.bg1},${T.bg2})`}}>

      {/* Header */}
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${T.amber}25`,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background:`${T.amber}08`}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:15}}>{toolMeta?.icon}</span>
          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,
            fontSize:13,color:T.amber}}>
            {t("sc.scenario.comparisonTitle")} {getToolLabel(toolMeta, lang)}
          </span>
        </div>
        <button onClick={()=>{togglePin(a);togglePin(b);}}
        style={{background:"none",border:"none",cursor:"pointer",
          fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt4,
          padding:"3px 8px",borderRadius:6}}>
        Clear ✕
      </button>
      </div>

      {/* Column headers */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",
        borderBottom:`1px solid ${T.border}`}}>
        {[
          { label:"Metric", sub:"" },
          { label:"Scenario A", sub:a.label },
          { label:"Scenario B", sub:b.label },
        ].map((col,i)=>(
          <div key={i} style={{padding:"10px 14px",
            borderRight:i<2?`1px solid ${T.border}`:"none",
            background:i>0?`${T.amber}05`:"none"}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,
              fontSize:11,color:i===0?T.txt3:T.amber,textTransform:"uppercase",
              letterSpacing:"0.06em"}}>
              {col.label}
            </div>
            {col.sub && (
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                color:T.txt2,marginTop:2,whiteSpace:"nowrap",overflow:"hidden",
                textOverflow:"ellipsis"}}>
                {col.sub}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Data rows */}
      {allKeys.map((key, i) => {
        const va = getVal(a, key);
        const vb = getVal(b, key);
        const d = delta(va, vb);
        const deltaColor = d?.dir==="up" ? T.red : d?.dir==="down" ? T.emerald : T.txt3;
        const deltaIcon  = d?.dir==="up" ? "↑" : d?.dir==="down" ? "↓" : "=";
        return (
          <div key={key}
            style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",
              borderBottom:i<allKeys.length-1?`1px solid ${T.border}20`:"none",
              background:i%2===0?"transparent":`${T.bg3}40`}}>

            {/* Metric name */}
            <div style={{padding:"10px 14px",borderRight:`1px solid ${T.border}`,
              fontFamily:"Inter,sans-serif",fontSize:12,color:T.txt3,
              display:"flex",alignItems:"center"}}>
              {key}
            </div>

            {/* Value A */}
            <div style={{padding:"10px 14px",borderRight:`1px solid ${T.border}`,
              fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:600,
              color:T.txt,display:"flex",alignItems:"center"}}>
              {va}
            </div>

            {/* Value B + delta */}
            <div style={{padding:"10px 14px",display:"flex",alignItems:"center",
              justifyContent:"space-between",gap:8}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,
                fontWeight:600,color:T.txt}}>
                {vb}
              </span>
              {d && d.dir !== "eq" && (
                <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:11,
                  fontWeight:700,color:deltaColor,
                  background:`${deltaColor}18`,borderRadius:99,
                  padding:"2px 7px",whiteSpace:"nowrap"}}>
                  {deltaIcon}{Math.abs(Number(d.pct))}%
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RelatedTools({ currentId, onOpen }) {
  const { T } = useTheme();
  const { lang } = useLang();
  const ids = RELATED_TOOLS[currentId] || [];
  if(ids.length === 0) return null;
  const relTools = ids.map(id => TOOLS.find(t => t.id === id)).filter(Boolean);

  return (
    <div style={{marginTop:28,paddingTop:22,borderTop:`1px solid ${T.border}`}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <span style={{fontSize:14}}>🔗</span>
        <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,
          fontSize:13,color:T.txt2,letterSpacing:"0.03em"}}>
          Related Tools
        </span>
      </div>

      {/* Cards row */}
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {relTools.map((rt, i) => (
          <button key={rt.id} onClick={()=>onOpen(rt.id)}
            style={{display:"flex",alignItems:"center",gap:12,
              padding:"11px 14px",borderRadius:10,border:`1px solid ${T.border}`,
              background:T.bg2,cursor:"pointer",textAlign:"left",
              transition:"all .15s",width:"100%"}}
            onMouseEnter={e=>{
              e.currentTarget.style.borderColor = T.amber;
              e.currentTarget.style.background   = `${T.amber}08`;
            }}
            onMouseLeave={e=>{
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.background   = T.bg2;
            }}>
            {/* Arrow chain indicator */}
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,
              color:T.amber,fontWeight:700,flexShrink:0,width:16,textAlign:"center"}}>
              {i===0?"↓":"↓"}
            </span>
            {/* Icon */}
            <span style={{fontSize:18,flexShrink:0}}>{rt.icon}</span>
            {/* Label + hint */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,
                fontSize:13,color:T.txt,lineHeight:1.2}}>
                {getToolLabel(rt, lang)}
              </div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:10,
                color:T.txt3,marginTop:2}}>
                {getToolKeywords(rt, lang).slice(0,2).join(" · ")}
              </div>
            </div>
            {/* Chevron */}
            <span style={{color:T.txt4,fontSize:12,flexShrink:0}}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FaqItem({ q, a, last }) {
  const { T } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <div style={{borderBottom: last ? "none" : `1px solid ${T.border}`}}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{width:"100%",display:"flex",justifyContent:"space-between",
          alignItems:"center",padding:"13px 0",background:"none",border:"none",
          cursor:"pointer",textAlign:"left",gap:12}}>
        <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,
          fontSize:13,color:T.txt,lineHeight:1.4,flex:1}}>
          {q}
        </span>
        <span style={{color:T.amber,fontSize:16,flexShrink:0,
          transform:open?"rotate(180deg)":"rotate(0deg)",
          transition:"transform .2s"}}>
          ▾
        </span>
      </button>
      {open && (
        <p style={{fontFamily:"Inter,sans-serif",fontSize:13,color:T.txt2,
          lineHeight:1.7,paddingBottom:14,margin:0}}>
          {a}
        </p>
      )}
    </div>
  );
}

function AdSlot({ size="728×90", label="Advertisement", slot=ADSENSE_CONFIG.slots.leaderboard.id, minH=90 }) {
  const { T } = useTheme();
  const ref   = useRef(null);

  // Unified push hook — adds IntersectionObserver that was missing here before
  useAdPush(ref);

  if(ADSENSE_CONFIG.placeholderMode) return (
    <div style={{
      border:`1px dashed ${T.border}`,borderRadius:10,
      minHeight:minH, display:"flex", alignItems:"center", justifyContent:"center",
      opacity: 0.35,
    }}>
      <span style={{fontFamily:"Inter,sans-serif",fontSize:10,letterSpacing:"0.12em",
        color:T.txt4,textTransform:"uppercase"}}>{label} · {size}</span>
    </div>
  );

  return (
    <div ref={ref} style={{minHeight:minH,textAlign:"center"}}>
      <ins
        style={{display:"block"}}
        data-ad-client={ADSENSE_CONFIG.publisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"/>
    </div>
  );
}

function AfterResultAd({ toolId, visible }) {
  const { T } = useTheme();
  const ref = useRef(null);

  // Unified push hook:
  //   trigger=visible  → push only after user runs a calculation
  //   resetKey=toolId  → reset pushed gate when user switches tools
  //   IntersectionObserver added (was missing before)
  useAdPush(ref, { trigger: visible, resetKey: toolId });

  if(!visible) return null;

  if(ADSENSE_CONFIG.placeholderMode) return (
    <div style={{marginTop:16,padding:"12px 16px",
      background:`linear-gradient(135deg,${T.bg2},${T.bg3})`,
      border:`1px dashed ${T.border}`,borderRadius:10,
      display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
      <div style={{display:"flex",flexDirection:"column",gap:2}}>
        <span style={{fontFamily:"Inter,sans-serif",fontSize:8,letterSpacing:"0.18em",
          color:T.txt4,textTransform:"uppercase"}}>Sponsored</span>
        <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:12,color:T.txt3,fontStyle:"italic"}}>
          Your most relevant ad appears here after calculation
        </span>
        <span style={{fontFamily:"Inter,sans-serif",fontSize:10,color:T.txt4}}>
          {ADSENSE_CONFIG.slots.afterResult.label} · in-content · highest CTR placement
        </span>
      </div>
      <div style={{flexShrink:0,width:48,height:48,borderRadius:8,
        background:`linear-gradient(135deg,${T.amber}20,${T.amber}05)`,
        border:`1px dashed ${T.amber}40`,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:20}}>💸</div>
    </div>
  );

  // SLOT TOKANA ho an'ny after-result (tsy mitovy amin'ny leaderboard!)
  return (
    <div ref={ref} style={{marginTop:16,textAlign:"center"}}>
      <ins
        style={{display:"block"}}
        data-ad-client={ADSENSE_CONFIG.publisherId}
        data-ad-slot={ADSENSE_CONFIG.slots.afterResult.id}
        data-ad-format={ADSENSE_CONFIG.slots.afterResult.fmt}
        data-full-width-responsive="true"/>
    </div>
  );
}

function NativeAdCard() {
  const { T } = useTheme();
  const ref   = useRef(null);

  // Unified push hook — adds IntersectionObserver that was missing here before
  useAdPush(ref);

  if(ADSENSE_CONFIG.placeholderMode) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",
      gap:4,padding:"12px 8px",borderRadius:10,
      border:`1px dashed ${T.amber}30`,
      background:`linear-gradient(135deg,${T.bg1},${T.bg2})`,
      cursor:"default",position:"relative"}}>
      <span style={{position:"absolute",top:4,right:6,
        fontFamily:"Inter,sans-serif",fontSize:7,letterSpacing:"0.12em",
        color:T.txt4,textTransform:"uppercase"}}>Ad</span>
      <span style={{fontSize:18}}>💡</span>
      <span style={{fontFamily:"Inter,sans-serif",fontSize:10,fontWeight:500,
        color:T.txt3,textAlign:"center",lineHeight:1.3}}>Sponsored</span>
    </div>
  );

  // SLOT TOKANA ho an'ny native card (tsy mitovy amin'ny rectangle banner!)
  return (
    <div ref={ref} style={{borderRadius:10,overflow:"hidden",position:"relative"}}>
      <span style={{position:"absolute",top:4,right:6,zIndex:1,
        fontFamily:"Inter,sans-serif",fontSize:7,letterSpacing:"0.12em",
        color:T.txt4,textTransform:"uppercase"}}>Ad</span>
      <ins
        style={{display:"block"}}
        data-ad-client={ADSENSE_CONFIG.publisherId}
        data-ad-slot={ADSENSE_CONFIG.slots.nativeCard.id}
        data-ad-format={ADSENSE_CONFIG.slots.nativeCard.fmt}
        data-ad-layout-key="-fb+5w+4e-db+86"/>
    </div>
  );
}

function ShareResultBar({ tool, visible }) {
  const { T } = useTheme();
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const [show,   setShow]   = useState(false);

  // Animate in when visible flips true
  useEffect(()=>{
    if(visible) setTimeout(()=>setShow(true), 120);
    else setShow(false);
  },[visible]);

  if(!visible) return null;

  const shareUrl  = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${t("sc.share.usedTool")} ${getToolLabel(tool, lang)}`;

  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(()=>setCopied(false), 1800);
  };

  const shareNative = () => {
    if(navigator.share) {
      navigator.share({ title: `${t("sc.share.titlePrefix")} ${getToolLabel(tool, lang)}`, text: shareText, url: shareUrl })
        .catch(()=>{});
    }
  };

  const shareWhatsApp  = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText+" "+shareUrl)}`, "_blank");
  const shareFacebook  = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  const shareTwitter   = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  const shareTelegram  = () => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, "_blank");

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  const BtnShare = ({ onClick, bg, children }) => {
    const [hov, setHov] = useState(false);
    return (
      <button onClick={onClick}
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{display:"flex",alignItems:"center",gap:6,padding:"8px 13px",
          borderRadius:8,border:`1px solid ${T.border}`,
          background: hov ? bg+"22" : T.bg3,
          color: hov ? bg : T.txt2,
          fontFamily:"Inter,sans-serif",fontSize:12,fontWeight:500,
          cursor:"pointer",transition:"all .15s",whiteSpace:"nowrap"}}>
        {children}
      </button>
    );
  };

  return (
    <div style={{
      marginTop:14,
      padding:"13px 16px",
      background:`linear-gradient(135deg,${T.bg2},${T.bg3})`,
      border:`1px solid ${T.amber}30`,
      borderRadius:11,
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(8px)",
      transition:"opacity .25s,transform .25s"
    }}>
      {/* Label */}
      <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,
        letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:10}}>
        Share this result
      </div>
      {/* Buttons row */}
      <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>

        {/* Native share — mobile only */}
        {hasNativeShare && (
          <BtnShare onClick={shareNative} bg={T.amber}>
            <span>📤</span><span>Share</span>
          </BtnShare>
        )}

        {/* Copy link */}
        <BtnShare onClick={copyLink} bg={T.cyan}>
          <span>{copied ? "✓" : "🔗"}</span>
          <span style={{color: copied ? T.emerald : undefined}}>
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </BtnShare>

        {/* WhatsApp */}
        <BtnShare onClick={shareWhatsApp} bg="#25D366">
          <span>💬</span><span>WhatsApp</span>
        </BtnShare>

        {/* Telegram */}
        <BtnShare onClick={shareTelegram} bg="#229ED9">
          <span>✈️</span><span>Telegram</span>
        </BtnShare>

        {/* Twitter / X */}
        <BtnShare onClick={shareTwitter} bg={T.txt}>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:13}}>𝕏</span>
          <span>Twitter</span>
        </BtnShare>

        {/* Facebook */}
        <BtnShare onClick={shareFacebook} bg="#1877F2">
          <span>📘</span><span>Facebook</span>
        </BtnShare>

      </div>
    </div>
  );
}

export default SmartCalcHub
