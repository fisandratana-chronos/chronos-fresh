'use client'
// ── components/calculators/Health/AgeCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TAge)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn } from '../shared/ui'

function AgeCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [dob,setDob]=useState(""); const [res,setRes]=useState(null);
  useEffect(()=>{
    if(!dob){setRes(null);return;}
    const b=new Date(dob), now=new Date();
    if(b>now){setRes(null);return;}
    let y=now.getFullYear()-b.getFullYear(), m=now.getMonth()-b.getMonth(), d=now.getDate()-b.getDate();
    if(d<0){m--;d+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
    if(m<0){y--;m+=12;}
    const days=Math.floor((now.getTime()-b.getTime())/86400000);
    setRes({y,m,d,days,next:new Date(now.getFullYear()+(now>new Date(now.getFullYear(),b.getMonth(),b.getDate())?1:0),b.getMonth(),b.getDate()).toDateString()});
    onResult({label:"",rows:[]});
  },[dob]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Inp label="Date of birth" type="date" value={dob} onChange={setDob}/>
    {res&&<ResBox accent={T.purple}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:36,fontWeight:700,color:T.purple}}>
          {res.y}<span style={{fontSize:16,color:T.txt2,marginLeft:4}}>yrs</span>{" "}
          {res.m}<span style={{fontSize:16,color:T.txt2,marginLeft:4}}>mo</span>{" "}
          {res.d}<span style={{fontSize:16,color:T.txt2,marginLeft:4}}>days</span>
        </div>
        <CopyBtn text={`Age: ${res.y}y ${res.m}m ${res.d}d — ${res.days.toLocaleString()} days lived`} small/>
      </div>
      <Row label="Total days lived" value={res.days.toLocaleString()} accent={T.amber}/>
      <Row label="Next birthday" value={res.next}/>
    </ResBox>}
  </div>;
}


export default AgeCalculator
