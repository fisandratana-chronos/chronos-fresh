'use client'
// ── components/calculators/Convert/UnitConverter.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TUnits)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, BigNum, CopyBtn } from '../shared/ui'

function UnitConverter() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [cat,setCat]=useState("length"); const [fUnit,setFUnit]=useState(""); const [tUnit,setTUnit]=useState(""); const [val,setVal]=useState(""); const [res,setRes]=useState(null);
  const defs={
    length:{label:"Length",units:{m:1,km:0.001,cm:100,mm:1000,inch:39.3701,ft:3.28084,yd:1.09361,mile:0.000621371}},
    weight:{label:"Weight",units:{kg:1,g:1000,mg:1e6,lb:2.20462,oz:35.274,stone:0.157473}},
    area:{label:"Area",units:{"m²":1,"km²":1e-6,"cm²":10000,"ft²":10.7639,"in²":1550,"acre":0.000247105,"ha":0.0001}},
    volume:{label:"Volume",units:{l:1,ml:1000,"m³":0.001,"gal(US)":0.264172,"qt(US)":1.05669,cup:4.16667,tbsp:67.628,tsp:202.884,"fl oz":33.814}},
    speed:{label:"Speed",units:{"m/s":1,"km/h":3.6,"mph":2.23694,"knot":1.94384}},
    pressure:{label:"Pressure",units:{pa:1,kpa:0.001,bar:0.00001,atm:9.8692e-6,psi:0.000145038,mmhg:0.00750062}},
    time:{label:"Time",units:{sec:1,ms:1000,min:1/60,hr:1/3600,day:1/86400,week:1/604800}},
  };
  const cats=Object.entries(defs);
  useEffect(()=>{const units=Object.keys(defs[cat].units);setFUnit(units[0]);setTUnit(units[1]);setVal("");setRes(null);},[cat]);
  useEffect(()=>{
    if(!val||!fUnit||!tUnit){setRes(null);return;}
    const v=+val, u=defs[cat].units;
    setRes((v/u[fUnit]*u[tUnit]).toFixed(6).replace(/\.?0+$/,""));
    onResult({label:"",rows:[]});
  },[val,fUnit,tUnit,cat]);
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
      {cats.map(([k,d])=><button key={k} onClick={()=>setCat(k)}
        style={{padding:"7px 12px",borderRadius:7,border:`1px solid ${cat===k?T.cyan:T.border}`,
          background:cat===k?`${T.cyan}15`:T.bg3,color:cat===k?T.cyan:T.txt2,
          fontFamily:"Inter,sans-serif",fontSize:12,cursor:"pointer"}}>{d.label}</button>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      {([[fUnit,setFUnit,"From"],[tUnit,setTUnit,"To"]] as [string,(v:string)=>void,string][]).map(([cur,fn,lbl])=>(
        <div key={lbl} style={{display:"flex",flexDirection:"column",gap:5}}>
          <label style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,textTransform:"uppercase",letterSpacing:"0.07em"}}>{lbl}</label>
          <select value={cur} onChange={e=>fn(e.target.value)}
            style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:T.txt,background:T.bg4,border:`1px solid ${T.border}`,borderRadius:8,padding:"11px 13px",outline:"none",cursor:"pointer"}}>
            {Object.keys(defs[cat].units).map(u=><option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      ))}
    </div>
    <Inp label="Value" value={val} onChange={setVal} placeholder="Enter value"/>
    {res!==null&&<ResBox accent={T.cyan}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <BigNum value={+res} label={`${val} ${fUnit} =`} color={T.cyan}/>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:T.txt2,marginTop:4}}>{tUnit}</div>
        </div>
        <CopyBtn text={`${val} ${fUnit} = ${res} ${tUnit}`} small/>
      </div>
    </ResBox>}
  </div>;
}


export default UnitConverter
