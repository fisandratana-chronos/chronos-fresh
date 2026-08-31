'use client'
// ── components/calculators/Finance/VatCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TVAT)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn, ModeToggle } from '../shared/ui'

function VatCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [amt,setAmt]=useState(""); const [rate,setRate]=useState("20"); const [mode,setMode]=useState("add");
  const [res,setRes]=useState(null);
  useEffect(()=>{
    const a=+amt,r=+rate/100;
    if(!amt||!rate||a===0){setRes(null);return;}
    if(mode==="add"){const vat=(a*r).toFixed(2),gross=(a*(1+r)).toFixed(2);setRes({net:a.toFixed(2),vat,gross});onResult({label:`$${amt} +${rate}% VAT`,rows:[{k:"VAT",v:`$${vat}`},{k:"Gross",v:`$${gross}`}]});}
    else{const net=a/(1+r);const vatAmt=(a-net).toFixed(2);setRes({net:net.toFixed(2),vat:vatAmt,gross:a.toFixed(2)});onResult({label:`$${amt} incl. ${rate}% VAT`,rows:[{k:"Net",v:`$${net.toFixed(2)}`},{k:"VAT",v:`$${vatAmt}`}]});}
  },[amt,rate,mode]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <ModeToggle options={[{v:"add",label:"Add VAT"},{v:"remove",label:"Remove VAT"}]} value={mode} onChange={v=>{setMode(v);setRes(null);}}/>
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:12}}>
      <Inp label="Amount" unit="$" value={amt} onChange={setAmt} placeholder="100"/>
      <Inp label="VAT rate" unit="%" value={rate} onChange={setRate} placeholder="20"/>
    </div>
    {res&&<ResBox accent={T.purple}>
      <Row label="Net (excl. VAT)" value={`$${res.net}`}/>
      <Row label="VAT amount" value={`$${res.vat}`} accent={T.amber}/>
      <Row label="Gross (incl. VAT)" value={`$${res.gross}`} accent={T.purple} large/>
      <div style={{marginTop:10}}><CopyBtn text={`Net: $${res.net} | VAT: $${res.vat} | Gross: $${res.gross}`}/></div>
    </ResBox>}
  </div>;
}


export default VatCalculator
