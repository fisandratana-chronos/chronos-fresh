'use client'
// ── components/calculators/DateTime/TimeZoneConverter.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TTimeZone)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'

function TimeZoneConverter() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const zones=["UTC","America/New_York","America/Los_Angeles","America/Chicago","America/Sao_Paulo","Europe/London","Europe/Paris","Europe/Berlin","Europe/Moscow","Africa/Cairo","Asia/Dubai","Asia/Kolkata","Asia/Bangkok","Asia/Singapore","Asia/Tokyo","Asia/Shanghai","Australia/Sydney"];
  const [sel,setSel]=useState("UTC");
  const [now,setNow]=useState(new Date());
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t);},[]);
  const fmt=tz=>{try{return now.toLocaleString("en-US",{timeZone:tz,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false,weekday:"short",month:"short",day:"numeric"});}catch{return"—";}};
  const off=tz=>{try{const s=now.toLocaleString("en-US",{timeZone:tz,timeZoneName:"short"});return s.split(" ").pop();}catch{return"";}}
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:700,color:T.amber,textAlign:"center",letterSpacing:"0.04em"}}>
      {fmt(sel)}
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:1,maxHeight:320,overflowY:"auto",borderRadius:10,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      {zones.map((z,i)=>(
        <div key={z} onClick={()=>setSel(z)}
          style={{display:"flex",justifyContent:"space-between",alignItems:"center",
            padding:"10px 14px",cursor:"pointer",
            background:sel===z?`${T.amber}12`:i%2===0?T.bg2:T.bg3,
            borderLeft:sel===z?`3px solid ${T.amber}`:"3px solid transparent",
            transition:"background .1s"}}>
          <span style={{fontFamily:"Inter,sans-serif",fontSize:12,color:sel===z?T.amber:T.txt2}}>{z.replace("_"," ")}</span>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:T.txt3}}>{off(z)}</span>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:sel===z?T.amber:T.txt}}>{fmt(z).split(",")[1]?.trim()}</span>
          </div>
        </div>
      ))}
    </div>
  </div>;
}


export default TimeZoneConverter
