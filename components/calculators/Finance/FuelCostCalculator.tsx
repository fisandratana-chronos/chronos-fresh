'use client'
// ── components/calculators/Finance/FuelCostCalculator.tsx ──
// Fuel Cost Calculator — distance + consumption (L/100km) + fuel
// price → fuel needed and total trip cost, with a One way / Round
// trip toggle (docx spec, priority #2).

import { useState, useMemo, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn, ModeToggle } from '../shared/ui'

const TRIP_MODES = [
  { v:'one',   label:'One way' },
  { v:'round', label:'Round trip' },
];

function formatNum(v: number, decimals=2) {
  if (!isFinite(v)) return '—';
  return v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function FuelCostCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [distance, setDistance] = useState('100');
  const [consumption, setConsumption] = useState('7');
  const [price, setPrice] = useState('1.9');
  const [trip, setTrip] = useState('one');

  const result = useMemo(()=>{
    const d = parseFloat(distance), c = parseFloat(consumption), p = parseFloat(price);
    if (isNaN(d) || isNaN(c) || isNaN(p) || d<0 || c<0 || p<0) return null;
    const totalDistance = trip==='round' ? d*2 : d;
    const fuelNeeded = (totalDistance * c) / 100;
    const cost = fuelNeeded * p;
    return { totalDistance, fuelNeeded, cost };
  }, [distance, consumption, price, trip]);

  useEffect(()=>{
    if (!result) return;
    onResult({
      label: `${formatNum(result.totalDistance,0)} km → ${formatNum(result.fuelNeeded)} L (${formatNum(result.cost)})`,
      rows: [
        { label: 'Distance', value: `${formatNum(result.totalDistance,0)} km` },
        { label: 'Fuel needed', value: `${formatNum(result.fuelNeeded)} L` },
        { label: 'Trip cost', value: formatNum(result.cost) },
      ],
    });
  }, [result]);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <ModeToggle options={TRIP_MODES} value={trip} onChange={setTrip} />

      <Inp label="Distance (one way)" unit="km" value={distance} onChange={setDistance} placeholder="100" min={0} />
      <Inp label="Fuel consumption" unit="L/100km" value={consumption} onChange={setConsumption} placeholder="7" min={0} step={0.1} />
      <Inp label="Fuel price" unit="per liter" value={price} onChange={setPrice} placeholder="1.9" min={0} step={0.01} />

      {result && (
        <ResBox accent={T.amber}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:700,color:T.amber}}>
              {formatNum(result.cost)}
            </div>
            <CopyBtn text={`${formatNum(result.totalDistance,0)} km = ${formatNum(result.fuelNeeded)} L = ${formatNum(result.cost)}`} small/>
          </div>
          <Row label={`Distance (${trip==='round'?'round trip':'one way'})`} value={`${formatNum(result.totalDistance,0)} km`}/>
          <Row label="Fuel needed" value={`${formatNum(result.fuelNeeded)} L`} large/>
        </ResBox>
      )}
    </div>
  );
}

export default FuelCostCalculator
