'use client'
// ── components/calculators/shared/ui.tsx ────────────────────────
import { useState, useRef, useEffect } from 'react'
import { useTheme } from './contexts'
import { useLang } from '../../../lib/hooks/useLang'

export function Inp({ label, unit, value, onChange, placeholder, type="number", min, max, step }: { label?: string; unit?: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; min?: number | string; max?: number | string; step?: number; }) {
  const { T } = useTheme();
  const [foc, setFoc] = useState(false);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      {label && <label style={{fontFamily:"Inter,sans-serif",fontSize:11,fontWeight:500,
        letterSpacing:"0.07em",textTransform:"uppercase",
        color: foc ? T.amber : T.txt3, transition:"color .15s"}}>
        {label}{unit&&<span style={{color:T.txt4,marginLeft:3}}>({unit})</span>}
      </label>}
      <input type={type} value={value} onChange={e=>onChange(e.target.value)}
        placeholder={placeholder} min={min} max={max} step={step}
        onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
        style={{fontFamily:"'JetBrains Mono',monospace",fontSize:16,fontWeight:600,
          color:T.txt, background:T.bg4, outline:"none", width:"100%", boxSizing:"border-box",
          border:`1px solid ${foc?T.amber:T.border}`, borderRadius:8,
          padding:"11px 13px", transition:"border-color .15s"}} />
    </div>
  );
}

export function Btn({ label, onClick, color, small }: { label: string; onClick?: () => void; color?: string; small?: boolean; }) {
  const { T } = useTheme();
  const [hov, setHov] = useState(false);
  const bg = color||T.amber;
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{padding: small?"8px 14px":"13px 18px", borderRadius:9, border:"none",
        background: hov ? (color ? color+"CC" : T.amberD) : bg,
        color: bg===T.amber||bg===T.amberD?"#000":"#fff",
        fontFamily:"'Space Grotesk',sans-serif", fontWeight:700,
        fontSize: small?12:14, cursor:"pointer", width: small?"auto":"100%",
        transform:hov?"translateY(-1px)":"none",
        boxShadow:hov?`0 4px 16px ${bg}50`:"none",
        transition:"all .15s"}}>
      {label}
    </button>
  );
}

export function ResBox({ children, accent }) {
  const { T } = useTheme();
  return (
    <div style={{background:T.bg2,borderRadius:12,padding:"18px 20px",
      border:`1px solid ${accent||T.amber}25`, marginTop:4}}>
      {children}
    </div>
  );
}
export function BigNum({ value, unit, label, color, animate=true }: { value: any; unit?: string; label?: string; color?: string; animate?: boolean }) {
  const { T } = useTheme();
  const [disp, setDisp] = useState(0);
  const raf = useRef(null);
  useEffect(()=>{
    if(!animate||value===null||value===undefined){setDisp(value);return;}
    const n=parseFloat(value); if(isNaN(n)){setDisp(value);return;}
    const start=performance.now(), dur=550;
    const tick=(now)=>{
      const p=Math.min((now-start)/dur,1), e=1-Math.pow(1-p,3);
      const cur=n*e;
      setDisp(Number.isInteger(n)?Math.round(cur):parseFloat(cur.toFixed(2)));
      if(p<1) raf.current=requestAnimationFrame(tick);
    };
    raf.current=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(raf.current);
  },[value]);
  return (
    <div>
      {label&&<div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,
        textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>{label}</div>}
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:38,fontWeight:700,
        color:color||T.amber,lineHeight:1}}>
        {disp}{unit&&<span style={{fontSize:18,marginLeft:4,color:T.txt2}}>{unit}</span>}
      </div>
    </div>
  );
}

export function Row({ label, value, accent, large }: { label: string; value: string | number; accent?: string; large?: boolean; }) {
  const { T } = useTheme();
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:large?"12px 0":"8px 0",borderBottom:`1px solid ${T.border}`}}>
      <span style={{fontFamily:"Inter,sans-serif",fontSize:large?13:12,color:T.txt2}}>{label}</span>
      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:large?20:15,
        fontWeight:large?700:600,color:accent||T.txt}}>{value}</span>
    </div>
  );
}

export function CopyBtn({ text, small }: { text: string; small?: boolean; }) {
  const { T } = useTheme();
  const { t } = useLang();
  const [ok,setOk]=useState(false);
  return (
    <button onClick={()=>{navigator.clipboard?.writeText(text);setOk(true);setTimeout(()=>setOk(false),1400);}}
      aria-label={ok ? t("sc.shared.copyAriaCopied") : t("sc.shared.copyAria")}
      style={{background:ok?T.emerald:T.bg4,border:`1px solid ${T.border}`,borderRadius:7,
        padding:small?"4px 10px":"7px 14px",fontFamily:"'Space Grotesk',sans-serif",
        fontSize:12,fontWeight:600,color:ok?"#000":T.txt2,cursor:"pointer",transition:"all .2s"}}>
      {ok?t("sc.shared.copied"):t("sc.shared.copy")}
    </button>
  );
}

export function Textarea({ value, onChange, placeholder, readOnly, color, rows=4 }: {
  value: string; onChange?: (v: string) => void; placeholder?: string;
  readOnly?: boolean; color?: string; rows?: number;
}) {
  const { T } = useTheme();
  const [foc,setFoc]=useState(false);
  return (
    <textarea value={value} onChange={onChange?e=>onChange(e.target.value):undefined}
      placeholder={placeholder} readOnly={readOnly} rows={rows}
      onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
      style={{width:"100%",padding:"12px 14px",borderRadius:9,resize:"vertical",outline:"none",
        background: readOnly?T.bg0:T.bg4,
        border:`1px solid ${readOnly?(color?color+"50":T.border):foc?T.amber:T.border}`,
        color:color||T.txt, fontFamily:"'JetBrains Mono',monospace",
        fontSize:13, lineHeight:1.6, boxSizing:"border-box",
        transition:"border-color .15s"}} />
  );
}

export function ErrBox({ msg }) {
  const { T } = useTheme();
  if(!msg) return null;
  return <div style={{padding:"10px 14px",background:`${T.red}15`,border:`1px solid ${T.red}50`,
    color:T.red,borderRadius:8,fontFamily:"Inter,sans-serif",fontSize:13}}>⚠️ {msg}</div>;
}

export function ModeToggle({ options, value, onChange }) {
  const { T } = useTheme();
  return (
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {options.map(o=>(
        <button key={o.v} onClick={()=>onChange(o.v)}
          style={{padding:"8px 14px",borderRadius:8,
            border:`1px solid ${value===o.v?T.amber:T.border}`,
            background:value===o.v?`${T.amber}15`:T.bg3,
            color:value===o.v?T.amber:T.txt2,
            fontFamily:"Inter,sans-serif",fontSize:12,fontWeight:value===o.v?600:400,
            cursor:"pointer",transition:"all .15s"}}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
