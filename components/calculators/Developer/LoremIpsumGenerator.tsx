'use client'
// ── components/calculators/Developer/LoremIpsumGenerator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TLorem)

import { useState } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, Btn, CopyBtn, Textarea, ModeToggle } from '../shared/ui'

function LoremIpsumGenerator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [count,setCount]=useState("3"); const [type,setType]=useState("p"); const [out,setOut]=useState("");
  const words=["Lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","est","laborum"];
  const genP=()=>Array.from({length:6+Math.floor(Math.random()*5)},()=>words[Math.floor(Math.random()*words.length)]).join(" ")+".";
  const gen=()=>{
    const n=Math.min(+count,20);
    if(type==="p") setOut(Array.from({length:n},()=>[genP(),genP(),genP()].join(" ")).join("\n\n"));
    else if(type==="s") setOut(Array.from({length:n},()=>genP()).join("\n"));
    else setOut(Array.from({length:n},()=>words[Math.floor(Math.random()*words.length)]).join(" "));
  };
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <ModeToggle options={[{v:"p",label:"Paragraphs"},{v:"s",label:"Sentences"},{v:"w",label:"Words"}]} value={type} onChange={t=>{setType(t);setOut("");}}/>
    <Inp label="Count" value={count} onChange={setCount} placeholder="3" min="1" max="20"/>
    <Btn label="Generate" onClick={gen} color={T.purple}/>
    {out&&<div style={{display:"flex",flexDirection:"column",gap:6}}>
      <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:T.txt3,fontFamily:"Inter,sans-serif"}}>Output</span><CopyBtn text={out} small/></div>
      <Textarea value={out} readOnly color={T.txt2} rows={6}/>
    </div>}
  </div>;
}


export default LoremIpsumGenerator
