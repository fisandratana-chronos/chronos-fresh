'use client'
// ── components/calculators/Convert/RomanNumeralConverter.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TRoman)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, BigNum, CopyBtn, ErrBox, ModeToggle } from '../shared/ui'

function RomanNumeralConverter() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [val,setVal]=useState(""); const [mode,setMode]=useState("to"); const [res,setRes]=useState(""); const [err,setErr]=useState("");
  const toR=n=>{
    if(n<1||n>3999) throw new Error("1–3999 only");
    const m=[[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
    let r=""; m.forEach(([v,s])=>{while(n>=(+v)){r+=String(s);n-=(+v);}}); return r;
  };
  const fromR=s=>{
    const m={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
    return s.toUpperCase().split("").reduce((acc,c,i,a)=>m[c]<(m[a[i+1]]||0)?acc-m[c]:acc+m[c],0);
  };
  useEffect(()=>{
    setErr(""); if(!val){setRes("");return;}
    try { setRes(mode==="to"?toR(+val):fromR(val).toString()); }
    catch(e){setErr(e.message);setRes("");}
    onResult({label:"",rows:[]});
  },[val,mode]);
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <ModeToggle options={[{v:"to",label:"Number → Roman"},{v:"from",label:"Roman → Number"}]} value={mode} onChange={m=>{setMode(m);setRes("");setErr("");setVal("");}}/>
    <Inp label={mode==="to"?"Number (1–3999)":"Roman numeral"} type={mode==="to"?"number":"text"} value={val} onChange={setVal} placeholder={mode==="to"?"2024":"MMXXIV"}/>
    <ErrBox msg={err}/>
    {res&&<ResBox accent={T.amber}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          {isNaN(+res)
            ? <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:42,fontWeight:700,color:T.amber}}>{res}</div>
            : <BigNum value={+res} label="Result" color={T.amber} animate/>}
        </div>
        <CopyBtn text={res} small/>
      </div>
    </ResBox>}
  </div>;
}

export default RomanNumeralConverter
