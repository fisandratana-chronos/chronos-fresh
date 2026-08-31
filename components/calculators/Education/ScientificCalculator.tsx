'use client'
// ── components/calculators/Education/ScientificCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TScientific)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'

function ScientificCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [display,setDisplay]=useState("0");
  const [stored,setStored]=useState<number|null>(null);
  const [pendingOp,setPendingOp]=useState<string|null>(null);
  const [justEvaluated,setJustEvaluated]=useState(false);
  const [memory,setMemory]=useState(0);
  const [degMode,setDegMode]=useState(true); // true=degrees, false=radians

  const inputDigit = (d:string)=>{
    if(justEvaluated){ setDisplay(d==="."?"0.":d); setJustEvaluated(false); return; }
    if(display==="0" && d!==".") { setDisplay(d); return; }
    if(d==="." && display.includes(".")) return;
    setDisplay(display+d);
  };
  const clearAll = ()=>{ setDisplay("0"); setStored(null); setPendingOp(null); setJustEvaluated(false); };
  const toggleSign = ()=> setDisplay(d=>(parseFloat(d)*-1).toString());

  const applyOp = (a:number,b:number,op:string):number=>{
    switch(op){
      case "+": return a+b;
      case "−": return a-b;
      case "×": return a*b;
      case "÷": return b===0?NaN:a/b;
      case "^": return Math.pow(a,b);
      default: return b;
    }
  };
  const chooseOp = (op:string)=>{
    const cur = parseFloat(display);
    if(stored!==null && pendingOp && !justEvaluated){
      const result = applyOp(stored,cur,pendingOp);
      setStored(result); setDisplay(String(result));
    } else {
      setStored(cur);
    }
    setPendingOp(op); setJustEvaluated(false);
  };
  const evaluate = ()=>{
    if(stored===null||!pendingOp) return;
    const cur = parseFloat(display);
    const result = applyOp(stored,cur,pendingOp);
    setDisplay(String(result)); setStored(null); setPendingOp(null); setJustEvaluated(true);
    onResult({label:`${stored} ${pendingOp} ${cur}`,rows:[{k:"Result",v:String(result)}]});
  };
  const applyUnary = (fn:(n:number)=>number)=>{
    const cur = parseFloat(display);
    const result = fn(cur);
    setDisplay(String(result)); setJustEvaluated(true);
    onResult({label:display,rows:[{k:"Result",v:String(result)}]});
  };
  const toRad = (n:number)=> degMode ? n*Math.PI/180 : n;

  useEffect(()=>{
    const onKey = (e:KeyboardEvent)=>{
      if(/[0-9.]/.test(e.key)) inputDigit(e.key);
      else if(e.key==="+") chooseOp("+");
      else if(e.key==="-") chooseOp("−");
      else if(e.key==="*") chooseOp("×");
      else if(e.key==="/") { e.preventDefault(); chooseOp("÷"); }
      else if(e.key==="Enter"||e.key==="=") evaluate();
      else if(e.key==="Escape") clearAll();
      else if(e.key==="Backspace") setDisplay(d=>d.length>1?d.slice(0,-1):"0");
    };
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  });

  const keys: { label: string; onClick: () => void; kind?: "op"|"fn"|"eq"|"num" }[] = [
    {label:degMode?"DEG":"RAD", onClick:()=>setDegMode(m=>!m), kind:"fn"},
    {label:"MC", onClick:()=>setMemory(0), kind:"fn"},
    {label:"M+", onClick:()=>setMemory(m=>m+parseFloat(display)), kind:"fn"},
    {label:"MR", onClick:()=>{setDisplay(String(memory));setJustEvaluated(true);}, kind:"fn"},
    {label:"sin", onClick:()=>applyUnary(n=>Math.sin(toRad(n))), kind:"fn"},
    {label:"cos", onClick:()=>applyUnary(n=>Math.cos(toRad(n))), kind:"fn"},
    {label:"tan", onClick:()=>applyUnary(n=>Math.tan(toRad(n))), kind:"fn"},
    {label:"√", onClick:()=>applyUnary(n=>Math.sqrt(n)), kind:"fn"},
    {label:"log", onClick:()=>applyUnary(n=>Math.log10(n)), kind:"fn"},
    {label:"ln", onClick:()=>applyUnary(n=>Math.log(n)), kind:"fn"},
    {label:"x²", onClick:()=>applyUnary(n=>n*n), kind:"fn"},
    {label:"1/x", onClick:()=>applyUnary(n=>1/n), kind:"fn"},
    {label:"C", onClick:clearAll, kind:"fn"},
    {label:"±", onClick:toggleSign, kind:"fn"},
    {label:"%", onClick:()=>applyUnary(n=>n/100), kind:"fn"},
    {label:"÷", onClick:()=>chooseOp("÷"), kind:"op"},
    {label:"7", onClick:()=>inputDigit("7")}, {label:"8", onClick:()=>inputDigit("8")},
    {label:"9", onClick:()=>inputDigit("9")}, {label:"×", onClick:()=>chooseOp("×"), kind:"op"},
    {label:"4", onClick:()=>inputDigit("4")}, {label:"5", onClick:()=>inputDigit("5")},
    {label:"6", onClick:()=>inputDigit("6")}, {label:"−", onClick:()=>chooseOp("−"), kind:"op"},
    {label:"1", onClick:()=>inputDigit("1")}, {label:"2", onClick:()=>inputDigit("2")},
    {label:"3", onClick:()=>inputDigit("3")}, {label:"+", onClick:()=>chooseOp("+"), kind:"op"},
    {label:"π", onClick:()=>{setDisplay(String(Math.PI));setJustEvaluated(true);}},
    {label:"0", onClick:()=>inputDigit("0")},
    {label:".", onClick:()=>inputDigit(".")},
    {label:"=", onClick:evaluate, kind:"eq"},
  ];

  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <div style={{background:T.bg2,borderRadius:12,padding:"18px 20px",border:`1px solid ${T.border}`,
      textAlign:"right",overflow:"hidden"}}>
      {memory!==0&&<div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt4}}>M = {memory}</div>}
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:34,fontWeight:700,color:T.txt,
        wordBreak:"break-all",lineHeight:1.2}}>{display}</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
      {keys.map((k,i)=>(
        <button key={i} onClick={k.onClick}
          style={{padding:"14px 0",borderRadius:9,border:"none",cursor:"pointer",
            fontFamily: k.kind==="fn" ? "Inter,sans-serif" : "'JetBrains Mono',monospace",
            fontSize: k.kind==="fn" ? 12 : 16, fontWeight:700,
            background: k.kind==="eq" ? T.amber : k.kind==="op" ? T.bg3 : k.kind==="fn" ? T.bg4 : T.bg3,
            color: k.kind==="eq" ? "#000" : k.kind==="op" ? T.amber : T.txt,
            transition:"all .12s"}}>
          {k.label}
        </button>
      ))}
    </div>
  </div>;
}


export default ScientificCalculator
