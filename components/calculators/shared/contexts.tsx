'use client'
// ── components/calculators/shared/contexts.tsx ─────────────────
// Contexts ampiasain'ny hub sy ny calculator tsirairay: tema (T),
// fandefasana valiny ho an'ny history (onResult), ary ny history.
import { createContext, useContext } from 'react'
import { DARK } from '../../../lib/theme'

export const ThemeCtx = createContext({ T: DARK, isDark: true, toggle: ()=>{} });
export const useTheme = () => useContext(ThemeCtx);
export const ResultCtx = createContext<(payload: any) => void>(()=>{});
export const useOnResult = () => useContext(ResultCtx);
export const HistoryCtx = createContext<{ entries:any[]; pinned:any[]; pushHistory:(id:any,payload:any)=>void; togglePin:(entry:any)=>void; clearHistory:()=>void }>({ entries:[], pinned:[], pushHistory:()=>{}, togglePin:()=>{}, clearHistory:()=>{} });
export const useHistory = () => useContext(HistoryCtx);