'use client'
// ── components/calculators/DateTime/DateDifferenceCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TDateDiff)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, BigNum, Row, CopyBtn } from '../shared/ui'

function DateDifferenceCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const today = new Date().toISOString().slice(0,10);
  const [d1,setD1]=useState(today); const [d2,setD2]=useState(""); const [res,setRes]=useState(null);
  useEffect(()=>{
    if(!d1||!d2){setRes(null);return;}
    const dA=new Date(d1), dB=new Date(d2);
    if(isNaN(dA.getTime())||isNaN(dB.getTime())){setRes(null);return;}
    const diffMs=dB.getTime()-dA.getTime();
    const diffDays=Math.round(diffMs/86400000);
    const isPast=diffDays<0;
    const early=isPast?dB:dA, late=isPast?dA:dB;
    let y=late.getFullYear()-early.getFullYear(), m=late.getMonth()-early.getMonth(), d=late.getDate()-early.getDate();
    if(d<0){m--;d+=new Date(late.getFullYear(),late.getMonth(),0).getDate();}
    if(m<0){y--;m+=12;}
    const absDays=Math.abs(diffDays);
    const weeks=Math.floor(absDays/7), remDays=absDays%7;
    setRes({absDays,weeks,remDays,y,m,d,isPast,isToday:diffDays===0});
    onResult({label:`${d1} → ${d2}`,rows:[{k:"Days",v:`${absDays}`},{k:"Y/M/D",v:`${y}y ${m}m ${d}d`},{k:isPast?"Status":"Status",v:isPast?"Past":diffDays===0?"Today":"Future"}]});
  },[d1,d2]);
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Inp label="Start date" type="date" value={d1} onChange={setD1}/>
      <Inp label="End date" type="date" value={d2} onChange={setD2}/>
    </div>
    {res&&<ResBox accent={res.isPast?T.red:T.emerald}>
      {res.isToday
        ? <BigNum value="Today" label="Result" color={T.amber} animate={false}/>
        : <BigNum value={res.absDays} unit="days" label={res.isPast?"Days ago":"Days from now"} color={res.isPast?T.red:T.emerald}/>
      }
      {!res.isToday&&<>
        <Row label="Breakdown" value={`${res.y}y ${res.m}m ${res.d}d`} accent={T.amber}/>
        <Row label="Weeks" value={`${res.weeks}w ${res.remDays}d`}/>
        <Row label="Status" value={res.isPast?"In the past":"In the future"} accent={res.isPast?T.red:T.emerald}/>
      </>}
      <div style={{marginTop:10}}><CopyBtn text={res.isToday?"Today":`${res.absDays} days (${res.y}y ${res.m}m ${res.d}d) — ${res.isPast?"past":"future"}`}/></div>
    </ResBox>}
  </div>;
}


export default DateDifferenceCalculator
