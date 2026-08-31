'use client'
// ── components/calculators/Health/CalorieCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TCalories)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn, ModeToggle } from '../shared/ui'

function CalorieCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [w,setW]=useState(""); const [h,setH]=useState(""); const [age,setAge]=useState(""); const [sex,setSex]=useState("m"); const [act,setAct]=useState("1.375"); const [res,setRes]=useState(null);
  const acts=[{v:"1.2",l:"Sedentary"},{v:"1.375",l:"Light"},{v:"1.55",l:"Moderate"},{v:"1.725",l:"Active"},{v:"1.9",l:"Very Active"}];
  useEffect(()=>{
    if(!w||!h||!age){setRes(null);return;}
    const bmr=sex==="m"?10*+w+6.25*+h-5*+age+5:10*+w+6.25*+h-5*+age-161;
    const tdee=bmr*+act;
    const actLabel=acts.find(a=>a.v===act)?.l||act;
    setRes({bmr:Math.round(bmr),tdee:Math.round(tdee),loss:Math.round(tdee-500),gain:Math.round(tdee+500)});
    onResult({label:`${w}kg/${h}cm/${age}y ${actLabel}`,rows:[{k:"TDEE",v:`${Math.round(tdee)} kcal`},{k:"Loss",v:`${Math.round(tdee-500)} kcal`},{k:"Gain",v:`${Math.round(tdee+500)} kcal`}]});
  },[w,h,age,sex,act]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",gap:8}}>
      {[{v:"m",l:"Male"},{v:"f",l:"Female"}].map(s=><button key={s.v} onClick={()=>setSex(s.v)}
        style={{flex:1,padding:"9px",borderRadius:8,border:`1px solid ${sex===s.v?T.cyan:T.border}`,
          background:sex===s.v?`${T.cyan}15`:T.bg3,color:sex===s.v?T.cyan:T.txt2,
          fontFamily:"Inter,sans-serif",fontSize:13,fontWeight:sex===s.v?600:400,cursor:"pointer"}}>{s.l}</button>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
      <Inp label="Weight" unit="kg" value={w} onChange={setW} placeholder="70"/>
      <Inp label="Height" unit="cm" value={h} onChange={setH} placeholder="175"/>
      <Inp label="Age" value={age} onChange={setAge} placeholder="30"/>
    </div>
    <ModeToggle options={acts} value={act} onChange={setAct}/>
    {res&&<ResBox accent={T.red}>
      <Row label="BMR (base)" value={`${res.bmr} kcal`}/>
      <Row label="TDEE (maintenance)" value={`${res.tdee} kcal`} accent={T.amber} large/>
      <Row label="Weight loss (−500)" value={`${res.loss} kcal`} accent={T.blue}/>
      <Row label="Weight gain (+500)" value={`${res.gain} kcal`} accent={T.emerald}/>
      <div style={{marginTop:10}}><CopyBtn text={`BMR: ${res.bmr} kcal | TDEE: ${res.tdee} kcal | Loss: ${res.loss} | Gain: ${res.gain}`}/></div>
    </ResBox>}
  </div>;
}


export default CalorieCalculator
