'use client'
// ── components/calculators/Developer/TextDiffChecker.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TTextDiff)

import { useState } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Btn, Textarea } from '../shared/ui'

function TextDiffChecker() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [a,setA]=useState(""); const [b,setB]=useState(""); const [diff,setDiff]=useState(null);
  const lcsWords=(wa,wb)=>{
    const m=wa.length,n=wb.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
      dp[i][j]=wa[i-1]===wb[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
    const tokens=[];
    let i=m,j=n;
    while(i>0||j>0){
      if(i>0&&j>0&&wa[i-1]===wb[j-1]){tokens.unshift({type:"same",word:wa[i-1]});i--;j--;}
      else if(j>0&&(i===0||dp[i][j-1]>=dp[i-1][j])){tokens.unshift({type:"add",word:wb[j-1]});j--;}
      else{tokens.unshift({type:"rem",word:wa[i-1]});i--;}
    }
    return tokens;
  };
  const compare=()=>{
    const la=a.split("\n"),lb=b.split("\n");
    const result=[];
    const maxLen=Math.max(la.length,lb.length);
    for(let i=0;i<maxLen;i++){
      const lineA=la[i],lineB=lb[i];
      if(lineA===undefined){result.push({type:"add",tokens:[{type:"add",word:lineB}],line:i+1});}
      else if(lineB===undefined){result.push({type:"rem",tokens:[{type:"rem",word:lineA}],line:i+1});}
      else if(lineA===lineB){result.push({type:"same",tokens:[{type:"same",word:lineA}],line:i+1});}
      else{
        const wa=lineA.split(/(\s+)/),wb=lineB.split(/(\s+)/);
        result.push({type:"changed",tokens:lcsWords(wa,wb),line:i+1});
      }
    }
    setDiff(result);
    onResult({ label: "Text diff computed", rows: [] });
  };
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <div><div style={{fontSize:11,color:T.red,fontFamily:"Inter,sans-serif",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em"}}>Original</div><Textarea value={a} onChange={setA} placeholder="Original text…" rows={4}/></div>
      <div><div style={{fontSize:11,color:T.emerald,fontFamily:"Inter,sans-serif",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em"}}>Modified</div><Textarea value={b} onChange={setB} placeholder="Modified text…" rows={4}/></div>
    </div>
    <Btn label="Compare" onClick={compare} color={T.cyan}/>
    {diff&&<div style={{background:T.bg0,borderRadius:10,overflow:"hidden",border:`1px solid ${T.border}`}}>
      {diff.map((d,i)=>(
        <div key={i} style={{display:"flex",gap:12,padding:"5px 14px",
          background:d.type==="add"?`${T.emerald}12`:d.type==="rem"?`${T.red}12`:d.type==="changed"?`${T.amber}08`:"transparent",
          borderBottom:`1px solid ${T.border}20`}}>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:T.txt4,width:24,flexShrink:0}}>{d.line}</span>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:T.txt4,width:12,flexShrink:0}}>
            {d.type==="add"?"+":d.type==="rem"?"-":d.type==="changed"?"~":" "}
          </span>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,wordBreak:"break-all",flex:1}}>
            {d.tokens.map((tok,j)=>(
              <span key={j} style={{
                color:tok.type==="add"?T.emerald:tok.type==="rem"?T.red:T.txt2,
                background:tok.type==="add"?`${T.emerald}25`:tok.type==="rem"?`${T.red}25`:"transparent",
                borderRadius:tok.type!=="same"?3:0,
                padding:tok.type!=="same"?"0 2px":0,
                textDecoration:tok.type==="rem"?"line-through":"none",
              }}>{tok.word}</span>
            ))}
          </span>
        </div>
      ))}
    </div>}
  </div>;
}


export default TextDiffChecker
