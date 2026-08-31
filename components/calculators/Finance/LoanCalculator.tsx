'use client'
// ── components/calculators/Finance/LoanCalculator.tsx ──
import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn, ModeToggle } from '../shared/ui'
import { LoanDeepAnalysis } from '../shared/deepAnalysis'

function LoanCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [amount,setAmount]=useState(""); const [down,setDown]=useState("");
  const [rate,setRate]=useState(""); const [term,setTerm]=useState("");
  const [termUnit,setTermUnit]=useState("years");
  const [res,setRes]=useState(null);
  useEffect(()=>{
    const principal = (+amount||0) - (+down||0);
    const months = termUnit==="years" ? (+term||0)*12 : (+term||0);
    const ir = (+rate||0)/100/12;
    if(!amount||!rate||!term||principal<=0||months===0){setRes(null);return;}
    let emi;
    if(ir===0) emi = principal/months;
    else emi = principal*ir*Math.pow(1+ir,months)/(Math.pow(1+ir,months)-1);
    if(!isFinite(emi)){setRes(null);return;}
    const total = emi*months, interest = total-principal;
    setRes({emi:emi.toFixed(2), total:total.toFixed(2), interest:interest.toFixed(2), principal, monthlyRate:ir, numPayments:months});
    onResult({label:`$${principal.toLocaleString()} @ ${rate}% / ${term}${termUnit==="years"?"y":"mo"}`,
      rows:[{k:"Monthly payment",v:`$${emi.toFixed(2)}`},{k:"Total interest",v:`$${interest.toFixed(2)}`},{k:"Total repaid",v:`$${total.toFixed(2)}`}]});
  },[amount,down,rate,term,termUnit]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Inp label="Loan amount" unit="$" value={amount} onChange={setAmount} placeholder="20000"/>
      <Inp label="Down payment" unit="$" value={down} onChange={setDown} placeholder="0"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Inp label="Interest rate" unit="%/yr" value={rate} onChange={setRate} placeholder="6.5"/>
      <Inp label={`Term (${termUnit})`} value={term} onChange={setTerm} placeholder={termUnit==="years"?"5":"60"}/>
    </div>
    <ModeToggle options={[{v:"years",label:"Years"},{v:"months",label:"Months"}]} value={termUnit}
      onChange={v=>{setTermUnit(v);setRes(null);}}/>
    {res&&<ResBox accent={T.cyan}>
      <Row label="Monthly payment" value={`$${res.emi}`} accent={T.cyan} large/>
      <Row label="Total interest" value={`$${res.interest}`} accent={T.amber}/>
      <Row label="Total repaid" value={`$${res.total}`}/>
      <div style={{marginTop:10}}><CopyBtn text={`Monthly: $${res.emi} | Interest: $${res.interest} | Total: $${res.total}`}/></div>
    </ResBox>}
    {res&&<LoanDeepAnalysis principal={res.principal} monthlyRate={res.monthlyRate}
      monthlyPayment={+res.emi} numPayments={res.numPayments} periodLabel="month"/>}
  </div>;
}


export default LoanCalculator
