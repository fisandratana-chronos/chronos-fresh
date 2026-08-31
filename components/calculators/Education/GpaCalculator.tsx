'use client'
// ── components/calculators/Education/GpaCalculator.tsx ──
import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn } from '../shared/ui'

// ── TGpa — GPA scale 4.0 mahazatra any Etazonia, mahazo andiana taranja
// tsirairay (anarana + naoty (A/A-/B+.../F) + credit hours) ──
const GPA_SCALE: Record<string, number> = {
  "A":4.0, "A-":3.7, "B+":3.3, "B":3.0, "B-":2.7,
  "C+":2.3, "C":2.0, "C-":1.7, "D+":1.3, "D":1.0, "F":0.0,
};

function GpaCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [courses,setCourses]=useState([{name:"",grade:"A",credits:"3"}]);
  const addCourse = ()=>setCourses(c=>[...c,{name:"",grade:"A",credits:"3"}]);
  const removeCourse = (i:number)=>setCourses(c=>c.filter((_,idx)=>idx!==i));
  const updateCourse = (i:number,field:string,val:string)=>
    setCourses(c=>c.map((row,idx)=>idx===i?{...row,[field]:val}:row));

  const totalCredits = courses.reduce((s,c)=>s+(+c.credits||0),0);
  const totalPoints = courses.reduce((s,c)=>s+(GPA_SCALE[c.grade]||0)*(+c.credits||0),0);
  const gpa = totalCredits>0 ? (totalPoints/totalCredits) : null;

  useEffect(()=>{
    if(gpa===null) return;
    onResult({label:`${courses.length} course${courses.length!==1?"s":""}, ${totalCredits} credits`,
      rows:[{k:"GPA",v:gpa.toFixed(2)},{k:"Total credits",v:String(totalCredits)}]});
  },[gpa,totalCredits,courses.length]);

  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {courses.map((c,i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr auto",gap:8,alignItems:"end"}}>
          <Inp label={i===0?"Course":undefined} type="text" value={c.name}
            onChange={v=>updateCourse(i,"name",v)} placeholder={`Course ${i+1}`}/>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {i===0&&<label style={{fontFamily:"Inter,sans-serif",fontSize:11,fontWeight:500,
              letterSpacing:"0.07em",textTransform:"uppercase",color:T.txt3}}>Grade</label>}
            <select value={c.grade} onChange={e=>updateCourse(i,"grade",e.target.value)}
              style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:600,color:T.txt,
                background:T.bg4,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 8px",outline:"none"}}>
              {Object.keys(GPA_SCALE).map(g=><option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <Inp label={i===0?"Credits":undefined} value={c.credits}
            onChange={v=>updateCourse(i,"credits",v)} placeholder="3"/>
          <button onClick={()=>removeCourse(i)} disabled={courses.length===1}
            style={{padding:"10px 12px",borderRadius:8,border:`1px solid ${T.border}`,
              background:T.bg3,color:courses.length===1?T.txt4:T.red,
              cursor:courses.length===1?"default":"pointer",fontSize:13}}>✕</button>
        </div>
      ))}
    </div>
    <button onClick={addCourse}
      style={{padding:"10px 14px",borderRadius:8,border:`1px dashed ${T.border}`,
        background:"transparent",color:T.txt2,fontFamily:"Inter,sans-serif",fontSize:13,
        cursor:"pointer",textAlign:"left"}}>
      + Add course
    </button>
    {gpa!==null&&<ResBox accent={T.emerald}>
      <Row label="GPA (4.0 scale)" value={gpa.toFixed(2)} accent={T.emerald} large/>
      <Row label="Total credits" value={totalCredits}/>
      <div style={{marginTop:10}}><CopyBtn text={`GPA: ${gpa.toFixed(2)} (${totalCredits} credits)`}/></div>
    </ResBox>}
  </div>;
}

export default GpaCalculator
