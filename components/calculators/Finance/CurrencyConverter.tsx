'use client'
// ── components/calculators/Finance/CurrencyConverter.tsx ──
import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, BigNum, CopyBtn } from '../shared/ui'

const CURRENCY_RATES_USD = {
  USD:1, EUR:0.92, GBP:0.79, MGA:4450, JPY:149, CNY:7.24,
  ZAR:18.2, AED:3.67, CAD:1.36, AUD:1.52, INR:83.1,
};

const CURRENCY_LABELS = {
  USD:"US Dollar", EUR:"Euro", GBP:"British Pound", MGA:"Malagasy Ariary",
  JPY:"Japanese Yen", CNY:"Chinese Yuan", ZAR:"South African Rand",
  AED:"UAE Dirham", CAD:"Canadian Dollar", AUD:"Australian Dollar", INR:"Indian Rupee",
};

const CURRENCY_RATES_DATE = "June 2026";

function CurrencyConverter() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [amt,setAmt]=useState("100"); const [from,setFrom]=useState("USD"); const [to,setTo]=useState("MGA"); const [res,setRes]=useState(null);
  const codes = Object.keys(CURRENCY_RATES_USD);
  useEffect(()=>{
    const a=+amt;
    if(!amt||a===0||!from||!to){setRes(null);return;}
    const usd = a/CURRENCY_RATES_USD[from];
    const out = usd*CURRENCY_RATES_USD[to];
    const rate = CURRENCY_RATES_USD[to]/CURRENCY_RATES_USD[from];
    setRes({out,rate});
    onResult({label:`${amt} ${from} → ${to}`,rows:[{k:`${to}`,v:out.toLocaleString(undefined,{maximumFractionDigits:2})},{k:"Rate",v:`1 ${from} = ${rate.toFixed(4)} ${to}`}]});
  },[amt,from,to]);
  const swap=()=>{setFrom(to);setTo(from);};
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <Inp label="Amount" value={amt} onChange={setAmt} placeholder="100"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:10,alignItems:"end"}}>
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        <label style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,textTransform:"uppercase",letterSpacing:"0.07em"}}>From</label>
        <select value={from} onChange={e=>setFrom(e.target.value)}
          style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:T.txt,background:T.bg4,border:`1px solid ${T.border}`,borderRadius:8,padding:"11px 13px",outline:"none",cursor:"pointer"}}>
          {codes.map(c=><option key={c} value={c}>{c} — {CURRENCY_LABELS[c]}</option>)}
        </select>
      </div>
      <button onClick={swap} title="Swap currencies"
        style={{padding:"11px 12px",borderRadius:8,border:`1px solid ${T.border}`,
          background:T.bg3,color:T.amber,cursor:"pointer",fontSize:15,marginBottom:1}}>⇄</button>
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        <label style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,textTransform:"uppercase",letterSpacing:"0.07em"}}>To</label>
        <select value={to} onChange={e=>setTo(e.target.value)}
          style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:T.txt,background:T.bg4,border:`1px solid ${T.border}`,borderRadius:8,padding:"11px 13px",outline:"none",cursor:"pointer"}}>
          {codes.map(c=><option key={c} value={c}>{c} — {CURRENCY_LABELS[c]}</option>)}
        </select>
      </div>
    </div>
    {res&&<ResBox accent={T.emerald}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <BigNum value={res.out.toFixed(2)} label={`${amt} ${from} =`} color={T.emerald} animate={false}/>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:T.txt2,marginTop:4}}>{to}</div>
        </div>
        <CopyBtn text={`${amt} ${from} = ${res.out.toFixed(2)} ${to}`} small/>
      </div>
      <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${T.border}`,
        fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:T.txt3}}>
        1 {from} = {res.rate.toFixed(4)} {to}
      </div>
    </ResBox>}
    <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt4,fontStyle:"italic"}}>
      Exchange rates as of {CURRENCY_RATES_DATE} — for estimates only, not live market rates.
    </div>
  </div>;
}
// ── Extra panels extracted from v12 monolith ──────────────────


export default CurrencyConverter
