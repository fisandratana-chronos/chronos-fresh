'use client'
// ── components/calculators/Convert/UnitConverter.tsx ──
// Combo "all units" converter for the Calculator hub — 7 categories
// (Length / Weight / Temperature / Volume / Speed / Area / Data),
// each with its own unit list. This is NOT the standalone per-unit
// converters already wired in the Converters Hub (length-converter,
// weight-converter, etc.) — this is the single combined "Unit
// Converter" card requested for SmartCalcHub itself (docx spec,
// priority #1). Registered as `units` in Convert/ConvertHome.tsx's
// CONVERT_PANEL_MAP (already wired there).

import { useState, useMemo, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn, ModeToggle } from '../shared/ui'
import { Icon } from '../../shared/Icons'

// ── Conversion tables — multiplicative, relative to each group's
// base unit (factor = how many base-units one of this unit equals).
type UnitDef = { factor: number; label: string };
type UnitGroup = Record<string, UnitDef>;

const GROUPS: Record<string, UnitGroup> = {
  length: {
    mm: { factor: 0.001,    label: 'Millimeter (mm)' },
    cm: { factor: 0.01,     label: 'Centimeter (cm)' },
    m:  { factor: 1,        label: 'Meter (m)' },
    km: { factor: 1000,     label: 'Kilometer (km)' },
    in: { factor: 0.0254,   label: 'Inch (in)' },
    ft: { factor: 0.3048,   label: 'Foot (ft)' },
    yd: { factor: 0.9144,   label: 'Yard (yd)' },
    mi: { factor: 1609.344, label: 'Mile (mi)' },
  },
  weight: {
    mg: { factor: 0.000001, label: 'Milligram (mg)' },
    g:  { factor: 0.001,    label: 'Gram (g)' },
    kg: { factor: 1,        label: 'Kilogram (kg)' },
    t:  { factor: 1000,     label: 'Metric ton (t)' },
    oz: { factor: 0.0283495,label: 'Ounce (oz)' },
    lb: { factor: 0.453592, label: 'Pound (lb)' },
    st: { factor: 6.35029,  label: 'Stone (st)' },
  },
  volume: {
    ml:   { factor: 0.001,      label: 'Milliliter (ml)' },
    l:    { factor: 1,          label: 'Liter (l)' },
    m3:   { factor: 1000,       label: 'Cubic meter (m³)' },
    tsp:  { factor: 0.00492892, label: 'Teaspoon (tsp)' },
    tbsp: { factor: 0.0147868,  label: 'Tablespoon (tbsp)' },
    cup:  { factor: 0.24,       label: 'Cup' },
    pt:   { factor: 0.473176,   label: 'Pint (pt)' },
    qt:   { factor: 0.946353,   label: 'Quart (qt)' },
    gal:  { factor: 3.78541,    label: 'Gallon (gal)' },
  },
  speed: {
    ms:   { factor: 1,        label: 'Meters/sec (m/s)' },
    kmh:  { factor: 0.277778, label: 'Km/hour (km/h)' },
    mph:  { factor: 0.44704,  label: 'Miles/hour (mph)' },
    knot: { factor: 0.514444, label: 'Knot (kn)' },
    fts:  { factor: 0.3048,   label: 'Feet/sec (ft/s)' },
  },
  area: {
    mm2: { factor: 0.000001,   label: 'Sq. millimeter (mm²)' },
    cm2: { factor: 0.0001,     label: 'Sq. centimeter (cm²)' },
    m2:  { factor: 1,          label: 'Sq. meter (m²)' },
    ha:  { factor: 10000,      label: 'Hectare (ha)' },
    km2: { factor: 1000000,    label: 'Sq. kilometer (km²)' },
    ft2: { factor: 0.092903,   label: 'Sq. foot (ft²)' },
    ac:  { factor: 4046.86,    label: 'Acre' },
    mi2: { factor: 2589988.11, label: 'Sq. mile (mi²)' },
  },
  data: {
    bit: { factor: 0.125,   label: 'Bit' },
    B:   { factor: 1,       label: 'Byte (B)' },
    KB:  { factor: 1024,    label: 'Kilobyte (KB)' },
    MB:  { factor: 1024**2, label: 'Megabyte (MB)' },
    GB:  { factor: 1024**3, label: 'Gigabyte (GB)' },
    TB:  { factor: 1024**4, label: 'Terabyte (TB)' },
  },
};

const TEMP_UNITS: Record<string,string> = { c:'Celsius (°C)', f:'Fahrenheit (°F)', k:'Kelvin (K)' };

const CATS = [
  { v:'length', label:'Length' },
  { v:'weight', label:'Weight' },
  { v:'temp',   label:'Temperature' },
  { v:'volume', label:'Volume' },
  { v:'speed',  label:'Speed' },
  { v:'area',   label:'Area' },
  { v:'data',   label:'Data' },
];

const DEFAULT_UNITS: Record<string,[string,string]> = {
  length:['m','ft'], weight:['kg','lb'], volume:['l','gal'],
  speed:['kmh','mph'], area:['m2','ft2'], data:['MB','GB'], temp:['c','f'],
};

function toCelsius(v: number, unit: string) {
  if (unit==='c') return v;
  if (unit==='f') return (v-32)*5/9;
  return v-273.15; // k
}
function fromCelsius(c: number, unit: string) {
  if (unit==='c') return c;
  if (unit==='f') return c*9/5+32;
  return c+273.15; // k
}

function formatResult(v: number) {
  if (!isFinite(v)) return '—';
  const abs = Math.abs(v);
  const decimals = abs>=100 ? 2 : abs>=1 ? 4 : 6;
  const rounded = parseFloat(v.toFixed(decimals));
  return rounded.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

// Small local <select>, styled to match Inp's visual language.
// (shared/ui.tsx has no Select yet — kept local here rather than
// touching that shared file for one component; worth promoting to
// shared/ui.tsx once a second tool needs a dropdown too.)
function UnitSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange:(v:string)=>void; options:[string,string][];
}) {
  const { T } = useTheme();
  return (
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      <label style={{fontFamily:"Inter,sans-serif",fontSize:11,fontWeight:500,
        letterSpacing:"0.07em",textTransform:"uppercase",color:T.txt3}}>{label}</label>
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:600,
          color:T.txt, background:T.bg4, outline:"none", width:"100%", boxSizing:"border-box",
          border:`1px solid ${T.border}`, borderRadius:8, padding:"11px 12px", cursor:"pointer"}}>
        {options.map(([id,lbl])=>
          <option key={id} value={id} style={{background:T.selectOption}}>{lbl}</option>
        )}
      </select>
    </div>
  );
}

function UnitConverter() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [cat, setCat] = useState('length');
  const [from, setFrom] = useState(DEFAULT_UNITS.length[0]);
  const [to, setTo] = useState(DEFAULT_UNITS.length[1]);
  const [input, setInput] = useState('1');

  // Reset from/to to sensible defaults whenever the category changes
  useEffect(()=>{
    setFrom(DEFAULT_UNITS[cat][0]);
    setTo(DEFAULT_UNITS[cat][1]);
  }, [cat]);

  const options: [string,string][] = useMemo(()=>{
    if (cat==='temp') return Object.entries(TEMP_UNITS) as [string,string][];
    return Object.entries(GROUPS[cat]).map(([id,u])=>[id,u.label]) as [string,string][];
  }, [cat]);

  const result = useMemo(()=>{
    const n = parseFloat(input);
    if (isNaN(n)) return null;
    if (cat==='temp') return fromCelsius(toCelsius(n, from), to);
    const g = GROUPS[cat];
    if (!g[from] || !g[to]) return null;
    return (n * g[from].factor) / g[to].factor;
  }, [input, from, to, cat]);

  const oneUnitRate = useMemo(()=>{
    if (cat==='temp') return fromCelsius(toCelsius(1, from), to);
    const g = GROUPS[cat];
    if (!g[from] || !g[to]) return null;
    return g[from].factor / g[to].factor;
  }, [from, to, cat]);

  useEffect(()=>{
    if (result===null) return;
    onResult({
      label: `${input} ${from} → ${formatResult(result)} ${to}`,
      rows: [
        { label: `Input (${from})`, value: input },
        { label: `Result (${to})`, value: formatResult(result) },
      ],
    });
  }, [result]);

  function swap() { setFrom(to); setTo(from); }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <ModeToggle options={CATS} value={cat} onChange={setCat} />

      <Inp label="Value" value={input} onChange={setInput} placeholder="1" />

      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:10,alignItems:"end"}}>
        <UnitSelect label="From" value={from} onChange={setFrom} options={options} />
        <button onClick={swap} aria-label="Swap units"
          style={{width:38,height:38,borderRadius:9,border:`1px solid ${T.border}`,
            background:T.bg3,color:T.amber,cursor:"pointer",display:"grid",placeItems:"center"}}>
          <Icon name="repeat" size={16} />
        </button>
        <UnitSelect label="To" value={to} onChange={setTo} options={options} />
      </div>

      {result!==null && (
        <ResBox accent={T.amber}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:700,color:T.amber}}>
              {formatResult(result)}<span style={{fontSize:15,color:T.txt2,marginLeft:6}}>{to}</span>
            </div>
            <CopyBtn text={`${input} ${from} = ${formatResult(result)} ${to}`} small/>
          </div>
          {oneUnitRate!==null &&
            <Row label={`1 ${from}`} value={`${formatResult(oneUnitRate)} ${to}`}/>}
        </ResBox>
      )}
    </div>
  );
}

export default UnitConverter
