'use client'
// ── components/calculators/shared/deepAnalysis.tsx ──────────────
import { useState, useMemo } from 'react'
import { useTheme } from './contexts'
import { Inp, Row } from './ui'

function buildAmortization(principal, monthlyRate, monthlyPayment, numPayments, extraPayment=0) {
  let balance = principal;
  const schedule = [];
  let cumPrincipal=0, cumInterest=0;
  for(let period=1; period<=numPayments; period++) {
    if(balance <= 0) break;
    const interestPart = balance * monthlyRate;
    let principalPart = monthlyPayment - interestPart + extraPayment;
    if(principalPart > balance) principalPart = balance;
    if(principalPart < 0) principalPart = 0; // payment too small to cover interest — stop growing
    balance -= principalPart;
    cumPrincipal += principalPart; cumInterest += interestPart;
    schedule.push({ period, payment: principalPart+interestPart, principalPart, interestPart,
      balance: Math.max(0,balance), cumPrincipal, cumInterest });
    if(balance <= 0.01) break;
  }
  return schedule;
}

function sampleSchedule(schedule, maxPoints=60) {
  if(schedule.length <= maxPoints) return schedule;
  const step = Math.ceil(schedule.length / maxPoints);
  const sampled = schedule.filter((_,i)=>i%step===0);
  if(sampled[sampled.length-1] !== schedule[schedule.length-1]) sampled.push(schedule[schedule.length-1]);
  return sampled;
}

function LoanDeepAnalysis({ principal, monthlyRate, monthlyPayment, numPayments, periodLabel="month" }) {
  const { T } = useTheme();
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(0); // 0-indexed period block
  const [extra, setExtra] = useState("");

  const schedule = useMemo(()=>
    buildAmortization(principal, monthlyRate, monthlyPayment, numPayments)
  ,[principal, monthlyRate, monthlyPayment, numPayments]);

  const extraNum = +extra || 0;
  const scheduleWithExtra = useMemo(()=>{
    if(extraNum <= 0) return null;
    return buildAmortization(principal, monthlyRate, monthlyPayment, numPayments, extraNum);
  },[principal, monthlyRate, monthlyPayment, numPayments, extraNum]);

  if(schedule.length === 0) return null;

  const totalInterest = schedule[schedule.length-1].cumInterest;
  const totalPaid = principal + totalInterest;

  // ── Graph: SVG stacked area, principal vs interest cumulative
  const sampled = sampleSchedule(schedule, 60);
  const W = 600, H = 180;
  const maxVal = totalPaid;
  const principalPath = sampled.map((d,i)=>{
    const x = (i/(sampled.length-1))*W;
    const y = H - (d.cumPrincipal/maxVal)*H;
    return `${i===0?"M":"L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const totalPath = sampled.map((d,i)=>{
    const x = (i/(sampled.length-1))*W;
    const y = H - ((d.cumPrincipal+d.cumInterest)/maxVal)*H;
    return `${i===0?"M":"L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const principalAreaPath = `${principalPath} L${W},${H} L0,${H} Z`;
  const totalAreaPath = `${totalPath} L${W},${H} L0,${H} Z`;

  // ── Amortization table — paginated by year (12 periods per page, or 12 entries if periodLabel=month for EMI)
  const pageSize = 12;
  const totalPages = Math.ceil(schedule.length / pageSize);
  const pageRows = schedule.slice(year*pageSize, (year+1)*pageSize);

  // ── Prepayment summary
  let prepaySummary = null;
  if(scheduleWithExtra) {
    const monthsSaved = schedule.length - scheduleWithExtra.length;
    const interestSaved = totalInterest - scheduleWithExtra[scheduleWithExtra.length-1].cumInterest;
    const yrs = Math.floor(monthsSaved/12), mos = monthsSaved%12;
    prepaySummary = { monthsSaved, interestSaved, yrs, mos,
      newTotalInterest: scheduleWithExtra[scheduleWithExtra.length-1].cumInterest,
      newPayoffMonths: scheduleWithExtra.length };
  }

  return (
    <div style={{marginTop:16}}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{width:"100%",padding:"12px 16px",borderRadius:10,
          border:`1px solid ${T.purple}40`,background:`${T.purple}10`,
          color:T.purple,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,
          fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",
          justifyContent:"center",gap:8,transition:"background .15s"}}>
        📊 {open ? "Hide" : "Show"} Full Analysis & Prepayment Simulator
        <span style={{transform:open?"rotate(180deg)":"rotate(0deg)",transition:"transform .2s"}}>▾</span>
      </button>

      {open && (
        <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:18}}>

          {/* ── Principal vs Interest Graph ── */}
          <div style={{background:T.bg2,borderRadius:12,padding:"16px 18px",border:`1px solid ${T.border}`}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
              color:T.txt2,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>
              Principal vs Interest Over Time
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto",display:"block"}} preserveAspectRatio="none">
              <path d={totalAreaPath} fill={T.amber} fillOpacity="0.18"/>
              <path d={principalAreaPath} fill={T.emerald} fillOpacity="0.30"/>
              <path d={totalPath} fill="none" stroke={T.amber} strokeWidth="2"/>
              <path d={principalPath} fill="none" stroke={T.emerald} strokeWidth="2"/>
            </svg>
            <div style={{display:"flex",gap:18,marginTop:10,flexWrap:"wrap"}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:10,height:10,borderRadius:3,background:T.emerald,display:"inline-block"}}/>
                <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3}}>Principal paid: {fmtMoney(principal)}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:10,height:10,borderRadius:3,background:T.amber,display:"inline-block"}}/>
                <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3}}>Total incl. interest: {fmtMoney(totalPaid)}</span>
              </div>
            </div>
          </div>

          {/* ── Prepayment Simulator ── */}
          <div style={{background:T.bg2,borderRadius:12,padding:"16px 18px",border:`1px solid ${T.border}`}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
              color:T.txt2,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>
              Prepayment Simulator
            </div>
            <Inp label={`Extra ${periodLabel}ly payment`} unit="$" value={extra} onChange={setExtra} placeholder="200"/>
            {prepaySummary && (
              <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
                <Row label={`${periodLabel.charAt(0).toUpperCase()+periodLabel.slice(1)}s saved`}
                  value={prepaySummary.monthsSaved>0
                    ? `${prepaySummary.yrs>0?prepaySummary.yrs+"y ":""}${prepaySummary.mos}${periodLabel==="month"?"mo":""}`
                    : "0"}
                  accent={T.emerald} large/>
                <Row label="Interest saved" value={fmtMoney(prepaySummary.interestSaved)} accent={T.emerald}/>
                <Row label="New total interest" value={fmtMoney(prepaySummary.newTotalInterest)}/>
                <Row label="New payoff time" value={`${prepaySummary.newPayoffMonths} ${periodLabel}s`}/>
              </div>
            )}
          </div>

          {/* ── Amortization Schedule (paginated) ── */}
          <div style={{background:T.bg2,borderRadius:12,padding:"16px 18px",border:`1px solid ${T.border}`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
                color:T.txt2,textTransform:"uppercase",letterSpacing:"0.05em"}}>
                Amortization Schedule
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button onClick={()=>setYear(y=>Math.max(0,y-1))} disabled={year===0}
                  style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${T.border}`,
                    background:"none",color:year===0?T.txt4:T.txt2,
                    cursor:year===0?"default":"pointer",fontSize:12}}>◀</button>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:T.txt3,
                  minWidth:90,textAlign:"center"}}>
                  {periodLabel==="month"&&numPayments>=12 ? `Year ${year+1} of ${totalPages}` : `Page ${year+1} of ${totalPages}`}
                </span>
                <button onClick={()=>setYear(y=>Math.min(totalPages-1,y+1))} disabled={year>=totalPages-1}
                  style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${T.border}`,
                    background:"none",color:year>=totalPages-1?T.txt4:T.txt2,
                    cursor:year>=totalPages-1?"default":"pointer",fontSize:12}}>▶</button>
              </div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${T.border}`}}>
                    {["#","Payment","Principal","Interest","Balance"].map(h=>(
                      <th key={h} style={{textAlign:h==="#"?"left":"right",padding:"6px 8px",
                        color:T.txt3,fontFamily:"Inter,sans-serif",fontWeight:600,
                        textTransform:"uppercase",fontSize:10,letterSpacing:"0.05em"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((r,i)=>(
                    <tr key={r.period} style={{background:i%2===0?"transparent":T.bg3+"60"}}>
                      <td style={{padding:"5px 8px",color:T.txt3}}>{r.period}</td>
                      <td style={{padding:"5px 8px",textAlign:"right",color:T.txt}}>{fmtMoney(r.payment)}</td>
                      <td style={{padding:"5px 8px",textAlign:"right",color:T.emerald}}>{fmtMoney(r.principalPart)}</td>
                      <td style={{padding:"5px 8px",textAlign:"right",color:T.amber}}>{fmtMoney(r.interestPart)}</td>
                      <td style={{padding:"5px 8px",textAlign:"right",color:T.txt2}}>{fmtMoney(r.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

function buildGrowthSchedule(principal, monthlyRate, monthlyContrib, totalMonths) {
  let bal = principal;
  const schedule = [];
  let cumContrib=0, cumInterest=0;
  for(let m=1;m<=totalMonths;m++){
    const interest = bal*monthlyRate;
    bal += interest + monthlyContrib;
    cumContrib += monthlyContrib; cumInterest += interest;
    schedule.push({ period:m, interest, contrib:monthlyContrib, balance:bal, cumContrib, cumInterest });
  }
  return schedule;
}

export function GrowthDeepAnalysis({ principal, monthlyRate, monthlyContrib, totalMonths, periodLabel="month" }) {
  const { T } = useTheme();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [extra, setExtra] = useState("");

  const schedule = useMemo(()=>
    buildGrowthSchedule(principal, monthlyRate, monthlyContrib, totalMonths)
  ,[principal, monthlyRate, monthlyContrib, totalMonths]);

  const extraNum = +extra || 0;
  const scheduleWithExtra = useMemo(()=>{
    if(extraNum <= 0) return null;
    return buildGrowthSchedule(principal, monthlyRate, monthlyContrib+extraNum, totalMonths);
  },[principal, monthlyRate, monthlyContrib, totalMonths, extraNum]);

  if(schedule.length === 0) return null;

  const last = schedule[schedule.length-1];
  const totalDeposited = principal + last.cumContrib;

  // ── Graph: SVG, deposited vs total balance (interest grows the gap)
  const sampled = sampleSchedule(schedule, 60);
  const W = 600, H = 180;
  const maxVal = last.balance;
  const depositedPath = sampled.map((d,i)=>{
    const x = (i/(sampled.length-1))*W;
    const deposited = principal + d.cumContrib;
    const y = H - (deposited/maxVal)*H;
    return `${i===0?"M":"L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const balancePath = sampled.map((d,i)=>{
    const x = (i/(sampled.length-1))*W;
    const y = H - (d.balance/maxVal)*H;
    return `${i===0?"M":"L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const balanceAreaPath = `${balancePath} L${W},${H} L0,${H} Z`;
  const depositedAreaPath = `${depositedPath} L${W},${H} L0,${H} Z`;

  // ── Schedule table — paginated by year (12 rows per page)
  const pageSize = 12;
  const totalPages = Math.ceil(schedule.length / pageSize);
  const pageRows = schedule.slice(page*pageSize, (page+1)*pageSize);

  // ── Extra contribution comparison
  let extraSummary = null;
  if(scheduleWithExtra) {
    const lastExtra = scheduleWithExtra[scheduleWithExtra.length-1];
    extraSummary = {
      extraFinalBalance: lastExtra.balance,
      gain: lastExtra.balance - last.balance,
      extraTotalInterest: lastExtra.cumInterest,
    };
  }

  return (
    <div style={{marginTop:16}}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{width:"100%",padding:"12px 16px",borderRadius:10,
          border:`1px solid ${T.purple}40`,background:`${T.purple}10`,
          color:T.purple,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,
          fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",
          justifyContent:"center",gap:8,transition:"background .15s"}}>
        📈 {open ? "Hide" : "Show"} Full Analysis & Growth Simulator
        <span style={{transform:open?"rotate(180deg)":"rotate(0deg)",transition:"transform .2s"}}>▾</span>
      </button>

      {open && (
        <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:18}}>

          {/* ── Deposited vs Total Balance Graph ── */}
          <div style={{background:T.bg2,borderRadius:12,padding:"16px 18px",border:`1px solid ${T.border}`}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
              color:T.txt2,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>
              Balance Growth Over Time
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto",display:"block"}} preserveAspectRatio="none">
              <path d={balanceAreaPath} fill={T.amber} fillOpacity="0.18"/>
              <path d={depositedAreaPath} fill={T.emerald} fillOpacity="0.30"/>
              <path d={balancePath} fill="none" stroke={T.amber} strokeWidth="2"/>
              <path d={depositedPath} fill="none" stroke={T.emerald} strokeWidth="2"/>
            </svg>
            <div style={{display:"flex",gap:18,marginTop:10,flexWrap:"wrap"}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:10,height:10,borderRadius:3,background:T.emerald,display:"inline-block"}}/>
                <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3}}>Deposited: {fmtMoney(totalDeposited)}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:10,height:10,borderRadius:3,background:T.amber,display:"inline-block"}}/>
                <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3}}>Total balance: {fmtMoney(last.balance)}</span>
              </div>
            </div>
          </div>

          {/* ── Growth Simulator (extra monthly contribution) ── */}
          <div style={{background:T.bg2,borderRadius:12,padding:"16px 18px",border:`1px solid ${T.border}`}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
              color:T.txt2,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>
              Growth Simulator — Extra Contribution
            </div>
            <Inp label={`Extra ${periodLabel}ly contribution`} unit="$" value={extra} onChange={setExtra} placeholder="100"/>
            {extraSummary && (
              <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
                <Row label="New final balance" value={fmtMoney(extraSummary.extraFinalBalance)} accent={T.emerald} large/>
                <Row label="Extra growth" value={`+${fmtMoney(extraSummary.gain)}`} accent={T.emerald}/>
                <Row label="New total interest" value={fmtMoney(extraSummary.extraTotalInterest)}/>
              </div>
            )}
          </div>

          {/* ── Growth Schedule (paginated) ── */}
          <div style={{background:T.bg2,borderRadius:12,padding:"16px 18px",border:`1px solid ${T.border}`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
                color:T.txt2,textTransform:"uppercase",letterSpacing:"0.05em"}}>
                Growth Schedule
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button onClick={()=>setPage(y=>Math.max(0,y-1))} disabled={page===0}
                  style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${T.border}`,
                    background:"none",color:page===0?T.txt4:T.txt2,
                    cursor:page===0?"default":"pointer",fontSize:12}}>◀</button>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:T.txt3,
                  minWidth:90,textAlign:"center"}}>
                  Year {page+1} of {totalPages}
                </span>
                <button onClick={()=>setPage(y=>Math.min(totalPages-1,y+1))} disabled={page>=totalPages-1}
                  style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${T.border}`,
                    background:"none",color:page>=totalPages-1?T.txt4:T.txt2,
                    cursor:page>=totalPages-1?"default":"pointer",fontSize:12}}>▶</button>
              </div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${T.border}`}}>
                    {["#","Contribution","Interest","Balance"].map(h=>(
                      <th key={h} style={{textAlign:h==="#"?"left":"right",padding:"6px 8px",
                        color:T.txt3,fontFamily:"Inter,sans-serif",fontWeight:600,
                        textTransform:"uppercase",fontSize:10,letterSpacing:"0.05em"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((r,i)=>(
                    <tr key={r.period} style={{background:i%2===0?"transparent":T.bg3+"60"}}>
                      <td style={{padding:"5px 8px",color:T.txt3}}>{r.period}</td>
                      <td style={{padding:"5px 8px",textAlign:"right",color:T.emerald}}>{fmtMoney(r.contrib)}</td>
                      <td style={{padding:"5px 8px",textAlign:"right",color:T.amber}}>{fmtMoney(r.interest)}</td>
                      <td style={{padding:"5px 8px",textAlign:"right",color:T.txt}}>{fmtMoney(r.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

const fmtMoney = (n) => "$"+n.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:0});
