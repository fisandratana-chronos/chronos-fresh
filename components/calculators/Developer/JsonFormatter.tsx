'use client'
// ── components/calculators/Developer/JsonFormatter.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TJson)

import { useState } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { CopyBtn, Textarea, ErrBox, ModeToggle } from '../shared/ui'

function JsonFormatter() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [inp,setInp]=useState(""); const [out,setOut]=useState(""); const [err,setErr]=useState(""); const [mode,setMode]=useState("pretty");
  const run=(text,m)=>{
    setInp(text); setErr(""); if(!text){setOut("");return;}
    try {
      const parsed=JSON.parse(text);
      setOut(m==="pretty"?JSON.stringify(parsed,null,2):JSON.stringify(parsed));
    } catch(e){ setErr(e.message); setOut(""); }
  };
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <ModeToggle options={[{v:"pretty",label:"Beautify"},{v:"minify",label:"Minify"},{v:"validate",label:"Validate"}]} value={mode} onChange={m=>{setMode(m);run(inp,m);}}/>
    <Textarea value={inp} onChange={t=>run(t,mode)} placeholder={'{\n  "key": "value"\n}'} rows={5}/>
    <ErrBox msg={err}/>
    {!err&&out&&<div style={{display:"flex",flexDirection:"column",gap:6}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        {mode!=="validate"&&<span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.emerald}}>✓ Valid JSON</span>}
        <CopyBtn text={out} small/>
      </div>
      <Textarea value={out} readOnly color={T.emerald} rows={6}/>
    </div>}
    {mode==="validate"&&!err&&out&&<div style={{padding:"10px 14px",background:`${T.emerald}15`,border:`1px solid ${T.emerald}50`,color:T.emerald,borderRadius:8,fontFamily:"Inter,sans-serif",fontSize:13}}>✓ Valid JSON</div>}
  </div>;
}


export default JsonFormatter
