'use client'
// ── components/calculators/Finance/EmiCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TEMI)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn } from '../shared/ui'
import { LoanDeepAnalysis } from '../shared/deepAnalysis'

function EmiCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [p,setP]=useState(""); const [r,setR]=useState(""); const [n,setN]=useState(""); const [res,setRes]=useState(null);
  useEffect(()=>{
    const pr=+p,ir=+r/100/12,pm=+n;
    if(!p||!r||!n||pm===0||ir===0){setRes(null);return;}
    const emi=pr*ir*Math.pow(1+ir,pm)/(Math.pow(1+ir,pm)-1);
    if(isFinite(emi)){setRes({emi:emi.toFixed(2),total:(emi*pm).toFixed(2),int:((emi*pm)-pr).toFixed(2),principal:pr,monthlyRate:ir,numPayments:pm,monthlyPayment:emi});onResult({label:`$${(+p).toLocaleString()} @ ${r}% / ${n}mo`,rows:[{k:"EMI/mo",v:`$${emi.toFixed(2)}`},{k:"Interest",v:`$${((emi*pm)-pr).toFixed(2)}`},{k:"Total",v:`$${(emi*pm).toFixed(2)}`}]});}
    else setRes(null);
  },[p,r,n]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
      <Inp label="Principal" unit="$" value={p} onChange={setP} placeholder="10000"/>
      <Inp label="Rate" unit="%" value={r} onChange={setR} placeholder="8.5"/>
      <Inp label="Months" value={n} onChange={setN} placeholder="24"/>
    </div>
    {res&&<ResBox accent={T.cyan}>
      <Row label="EMI / month" value={`$${res.emi}`} accent={T.cyan} large/>
      <Row label="Total interest" value={`$${res.int}`} accent={T.amber}/>
      <Row label="Total amount" value={`$${res.total}`}/>
      <div style={{marginTop:10}}><CopyBtn text={`EMI: $${res.emi} | Interest: $${res.int} | Total: $${res.total}`}/></div>
    </ResBox>}
    {res&&<LoanDeepAnalysis principal={res.principal} monthlyRate={res.monthlyRate}
      monthlyPayment={res.monthlyPayment} numPayments={res.numPayments} periodLabel="month"/>}
  </div>;
}


export default EmiCalculator
