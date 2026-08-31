'use client'
// ── components/calculators/Developer/PasswordGenerator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TPassword)

import { useState, useEffect, useCallback } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Btn, ResBox, CopyBtn } from '../shared/ui'

function PasswordGenerator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [len,setLen]=useState("16"); const [opts,setOpts]=useState({upper:true,lower:true,num:true,sym:true});
  const [pw,setPw]=useState("");
  const gen=useCallback(()=>{
    const sets={upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",lower:"abcdefghijklmnopqrstuvwxyz",num:"0123456789",sym:"!@#$%^&*()_+-=[]{}|;:,.<>?"};
    let pool=""; Object.keys(opts).forEach(k=>{if(opts[k])pool+=sets[k];});
    if(!pool) return;
    const arr = new Uint32Array(+len);
    crypto.getRandomValues(arr);
    setPw(Array.from(arr, n => pool[n % pool.length]).join(""));
  },[len,opts]);
  useEffect(()=>gen(),[]);
  const sets_re=[/[A-Z]/,/[a-z]/,/[0-9]/,/[^A-Za-z0-9]/];
  const variety=sets_re.filter(re=>re.test(pw)).length;
  const strength=pw.length<8||variety<2?"Weak":pw.length<12||variety<3?"Fair":pw.length<16||variety<4?"Good":"Strong";
  const sColor={"Weak":T.red,"Fair":T.amber,"Good":T.cyan,"Strong":T.emerald}[strength];
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {Object.entries({upper:"A–Z",lower:"a–z",num:"0–9",sym:"!@#"}).map(([k,l])=>(
        <button key={k} onClick={()=>setOpts(o=>({...o,[k]:!o[k]}))}
          style={{padding:"7px 12px",borderRadius:7,border:`1px solid ${opts[k]?T.amber:T.border}`,
            background:opts[k]?`${T.amber}15`:T.bg3,color:opts[k]?T.amber:T.txt2,
            fontFamily:"'JetBrains Mono',monospace",fontSize:12,cursor:"pointer"}}>{l}</button>
      ))}
    </div>
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <span style={{fontFamily:"Inter,sans-serif",fontSize:12,color:T.txt3,whiteSpace:"nowrap"}}>Length: <b style={{color:T.txt}}>{len}</b></span>
      <input type="range" min="6" max="64" value={len} onChange={e=>setLen(e.target.value)} style={{flex:1,accentColor:T.amber,cursor:"pointer"}}/>
    </div>
    <ResBox accent={sColor}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:10}}>
        <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:T.txt,wordBreak:"break-all",flex:1,lineHeight:1.6}}>{pw}</code>
        <CopyBtn text={pw} small/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{height:4,flex:1,background:T.bg4,borderRadius:99,marginRight:10,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${{"Weak":25,"Fair":50,"Good":75,"Strong":100}[strength]}%`,background:sColor,borderRadius:99,transition:"width .3s"}}/>
        </div>
        <span style={{fontFamily:"Inter,sans-serif",fontSize:12,fontWeight:600,color:sColor}}>{strength}</span>
      </div>
    </ResBox>
    <Btn label="↻ Generate New" onClick={gen} color={T.blue}/>
  </div>;
}


export default PasswordGenerator
