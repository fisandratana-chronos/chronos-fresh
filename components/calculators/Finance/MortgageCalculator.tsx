'use client'
// ── components/calculators/Finance/MortgageCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TMortgage)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn } from '../shared/ui'
import { LoanDeepAnalysis } from '../shared/deepAnalysis'

function MortgageCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [p,setP]=useState(""); const [r,setR]=useState(""); const [n,setN]=useState(""); const [res,setRes]=useState(null);
  useEffect(()=>{
    const pr=+p,ir=+r/100/12,pm=+n*12;
    if(!p||!r||!n||pm===0||ir===0){setRes(null);return;}
    const x=Math.pow(1+ir,pm), mo=(pr*x*ir)/(x-1);
    if(isFinite(mo)){setRes({mo:mo.toFixed(2),total:(mo*pm).toFixed(2),int:((mo*pm)-pr).toFixed(2),principal:pr,monthlyRate:ir,numPayments:pm,monthlyPayment:mo});onResult({label:`$${(+p).toLocaleString()} @ ${r}% / ${n}yr`,rows:[{k:"Monthly",v:`$${mo.toFixed(2)}`},{k:"Interest",v:`$${((mo*pm)-pr).toFixed(2)}`},{k:"Total",v:`$${(mo*pm).toFixed(2)}`}]});}
    else{setRes(null);onResult({label:"",rows:[]});}
  },[p,r,n]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
      <Inp label="Amount" unit="$" value={p} onChange={setP} placeholder="250000"/>
      <Inp label="Rate" unit="%" value={r} onChange={setR} placeholder="3.5"/>
      <Inp label="Term" unit="yrs" value={n} onChange={setN} placeholder="25"/>
    </div>
    {res&&<ResBox accent={T.emerald}>
      <Row label="Monthly payment" value={`$${res.mo}`} accent={T.emerald} large/>
      <Row label="Total interest" value={`$${res.int}`} accent={T.amber}/>
      <Row label="Total payout" value={`$${res.total}`}/>
      <div style={{marginTop:10}}><CopyBtn text={`Monthly: $${res.mo} | Interest: $${res.int} | Total: $${res.total}`}/></div>
    </ResBox>}
    {res&&<LoanDeepAnalysis principal={res.principal} monthlyRate={res.monthlyRate}
      monthlyPayment={res.monthlyPayment} numPayments={res.numPayments} periodLabel="month"/>}
  </div>;
}


export default MortgageCalculator
