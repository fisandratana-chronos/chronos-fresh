'use client'
// ── components/calculators/Finance/CompoundInterestCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TCompound)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn } from '../shared/ui'
import { GrowthDeepAnalysis } from '../shared/deepAnalysis'

function CompoundInterestCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [p,setP]=useState(""); const [r,setR]=useState(""); const [yrs,setYrs]=useState("");
  const [freq,setFreq]=useState("12"); const [contrib,setContrib]=useState(""); const [res,setRes]=useState(null);
  const freqOpts=[{v:"1",label:"Annually"},{v:"4",label:"Quarterly"},{v:"12",label:"Monthly"},{v:"365",label:"Daily"}];
  useEffect(()=>{
    const P=+p, ratePct=+r, years=+yrs, n=+freq, mc=+contrib||0;
    if(!p||!r||!yrs||P<=0||years<=0){setRes(null);return;}
    const ratePerPeriod=(ratePct/100)/n;
    const totalMonths=Math.round(years*12);
    const monthlyRate=Math.pow(1+ratePerPeriod,n/12)-1;
    let bal=P, cumInterest=0, cumContrib=0;
    if(!isFinite(monthlyRate)){setRes(null);return;}
    for(let m=1;m<=totalMonths;m++){
      const interest=bal*monthlyRate;
      bal+=interest+mc;
      cumInterest+=interest; cumContrib+=mc;
    }
    if(!isFinite(bal)){setRes(null);return;}
    setRes({finalBalance:bal,totalContrib:cumContrib,totalInterest:cumInterest,totalDeposited:P+cumContrib,
      principal:P, monthlyRate, totalMonths, monthlyContrib:mc});
    onResult({label:`$${P.toLocaleString()} @ ${r}% / ${yrs}yr`,rows:[{k:"Final",v:`$${bal.toFixed(2)}`},{k:"Interest",v:`$${cumInterest.toFixed(2)}`},{k:"Deposited",v:`$${(P+cumContrib).toFixed(2)}`}]});
  },[p,r,yrs,freq,contrib]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Inp label="Initial amount" unit="$" value={p} onChange={setP} placeholder="10000"/>
      <Inp label="Annual rate" unit="%" value={r} onChange={setR} placeholder="7"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Inp label="Years" value={yrs} onChange={setYrs} placeholder="10"/>
      <Inp label="Monthly contribution" unit="$" value={contrib} onChange={setContrib} placeholder="0"/>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      <label style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,textTransform:"uppercase",letterSpacing:"0.07em"}}>Compounding</label>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {freqOpts.map(o=><button key={o.v} onClick={()=>setFreq(o.v)}
          style={{padding:"7px 12px",borderRadius:7,border:`1px solid ${freq===o.v?T.amber:T.border}`,
            background:freq===o.v?`${T.amber}15`:T.bg3,color:freq===o.v?T.amber:T.txt2,
            fontFamily:"Inter,sans-serif",fontSize:12,cursor:"pointer"}}>{o.label}</button>)}
      </div>
    </div>
    {res&&<ResBox accent={T.emerald}>
      <Row label="Final balance" value={`$${res.finalBalance.toFixed(2)}`} accent={T.emerald} large/>
      <Row label="Total interest earned" value={`$${res.totalInterest.toFixed(2)}`} accent={T.amber}/>
      <Row label="Total deposited" value={`$${res.totalDeposited.toFixed(2)}`}/>
      <div style={{marginTop:10}}><CopyBtn text={`Final: $${res.finalBalance.toFixed(2)} | Interest: $${res.totalInterest.toFixed(2)} | Deposited: $${res.totalDeposited.toFixed(2)}`}/></div>
    </ResBox>}
    {res&&<GrowthDeepAnalysis principal={res.principal} monthlyRate={res.monthlyRate}
      monthlyContrib={res.monthlyContrib} totalMonths={res.totalMonths} periodLabel="month"/>}
  </div>;
}


export default CompoundInterestCalculator
