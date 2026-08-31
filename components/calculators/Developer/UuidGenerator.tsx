'use client'
// ── components/calculators/Developer/UuidGenerator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TUUID)

import { useState } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, Btn, CopyBtn } from '../shared/ui'

function UuidGenerator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [list,setList]=useState([]); const [count,setCount]=useState("5");
  const gen=()=>{
    const uuids=Array.from({length:Math.min(+count,50)},()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,c=>{const r=Math.random()*16|0;return(c==="x"?r:r&0x3|0x8).toString(16);}));
    setList(uuids);
    onResult({ label: "UUIDs generated", rows: [] });
  };
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
      <div style={{flex:1}}><Inp label="Count" value={count} onChange={setCount} placeholder="5" min="1" max="50"/></div>
      <Btn label="Generate" onClick={gen} small/>
    </div>
    {list.length>0&&<div style={{display:"flex",flexDirection:"column",gap:1}}>
      {list.map((u,i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"9px 12px",background:i%2===0?T.bg2:T.bg3,
          borderRadius:i===0?"8px 8px 0 0":i===list.length-1?"0 0 8px 8px":0}}>
          <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:T.txt,letterSpacing:"0.02em"}}>{u}</code>
          <CopyBtn text={u} small/>
        </div>
      ))}
      <div style={{marginTop:8}}>
        <CopyBtn text={list.join("\n")}/>
      </div>
    </div>}
  </div>;
}


export default UuidGenerator
