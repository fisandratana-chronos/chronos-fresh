'use client'
// ── components/calculators/Developer/QrCodeGenerator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TQR)

import { useState } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, Btn } from '../shared/ui'

function QrCodeGenerator() {
  const { T, isDark } = useTheme();
  const onResult = useOnResult();
  const [url,setUrl]=useState(""); const [qr,setQr]=useState("");
  const gen=()=>{
    if(!url) return;
    const bg = isDark ? "07090F" : "FFFFFF";
    const fg = isDark ? "F59E0B" : "1C2438";
    setQr(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&bgcolor=${bg}&color=${fg}`);
  };
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <Inp label="URL or text" type="text" value={url} onChange={setUrl} placeholder="https://example.com"/>
    <Btn label="Generate QR Code" onClick={gen} color={T.amber}/>
    {qr&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,padding:20,background:T.bg2,borderRadius:12,border:`1px solid ${T.amber}25`}}>
      <img src={qr} alt="QR Code" style={{width:"100%",maxWidth:200,height:"auto",aspectRatio:"1 / 1",borderRadius:8,imageRendering:"pixelated"}}/>
      <a href={qr} download="qrcode.png" style={{fontFamily:"Inter,sans-serif",fontSize:12,color:T.amber,textDecoration:"none",padding:"7px 14px",border:`1px solid ${T.amber}50`,borderRadius:7}}>↓ Download PNG</a>
    </div>}
  </div>;
}


export default QrCodeGenerator
