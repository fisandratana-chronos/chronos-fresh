'use client'

// ── components/network/NetworkHub.tsx ─────────────────────────
// CHRONOS shell (sidebar + hero + trust badges), matching PdfHub.tsx —
// all tab logic (My IP, DNS, Subnet, DNS Propagation, etc.) unchanged.
import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react'
import { useLang } from '../../lib/hooks/useLang'
import { useDark } from '../../lib/hooks/useDark'
import { DARK, LIGHT } from '../../lib/theme'
import { BP } from '../../lib/breakpoints'
import { NETWORK_SEO_CONTENT } from '../../lib/seoContent'
import { Icon, IconAntenna, IconAlertTriangle, IconCheck, IconX } from '../shared/Icons'

// ── useTrans: typed wrapper mba i t() dia manaiky argument 2 ──
type TFn = (key: string, vars?: Record<string, unknown>) => string;
const useTrans = () => {
  const { t, lang } = useLang() as unknown as { t: TFn; lang: string };
  return { t, lang };
};

// ── Utility ──
const cleanDomain = (raw: string): string =>
  raw.replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim().toLowerCase();

// ── Fonts — mitovy amin'ny PdfHub.tsx (Cormorant Garamond ho an'ny
// heading serif, DM Sans ho an'ny body). <link> fa tsy @import, mba
// hisokafan'ny connection any amin'ny fonts.gstatic.com miaraka amin'ny
// sisa amin'ny pejy fa tsy mandry an'ny inline <style> aloha. ──
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap";

function useChronosFonts() {
  React.useEffect(() => {
    if (document.getElementById("chronos-fonts")) return;
    const pre1 = document.createElement("link");
    pre1.rel = "preconnect";
    pre1.href = "https://fonts.googleapis.com";
    const pre2 = document.createElement("link");
    pre2.rel = "preconnect";
    pre2.href = "https://fonts.gstatic.com";
    pre2.crossOrigin = "anonymous";
    const sheet = document.createElement("link");
    sheet.id = "chronos-fonts";
    sheet.rel = "stylesheet";
    sheet.href = FONT_HREF;
    document.head.append(pre1, pre2, sheet);
  }, []);
}

// ── Theme ──
// Loko dia alaina avy amin'ny lib/theme.ts (DARK/LIGHT) — ny site design
// system iombonana amin'ny PdfHub/ImageHub/Calculators — mba tsy hisy
// palette local intsony. Ny "shape" (bg, bgCard, cyan, textPrimary, sns.)
// dia mitovy amin'ilay teo aloha mba tsy hisy tab body (S.card, S.input,
// sns.) tokony hovaina — ny fanovana dia eo amin'ny loisiny ihany.
const buildPalette = (dark: boolean) => {
  const B = dark ? DARK : LIGHT;
  return {
    bg: B.bg0,
    bgCard: B.bg1,
    bgSubtle: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
    border: B.border,
    cyan: B.cyan,
    cyanDim: B.amberD,
    orange: dark ? "#FF6B35" : "#E85A1F",
    green: B.emerald,
    red: B.red,
    yellow: dark ? "#FFD600" : "#C8A000",
    textPrimary: B.txt,
    textSecondary: B.txt2,
    textMono: B.amberL,
    inputBg: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
    logBg: `${B.cyan}0A`,
    isDark: dark,
    // ── Shell-only tokens (sidebar / hero / SEO article) ──
    bgCard2: B.bg2,
    sidebarBg: dark ? "rgba(7,9,15,.72)" : "rgba(255,255,255,.82)",
    cardGradFrom: B.bg2,
    greenBorder: `${B.emerald}40`,
    tipBorder: dark ? "#3b3427" : "#FCD34D66",
    tipText: dark ? "#9f9887" : "#92400E",
    muted2: B.txt3,
  };
};

const NHThemeCtx = createContext(buildPalette(true));
const useNHTheme = () => useContext(NHThemeCtx);

type Theme = ReturnType<typeof buildPalette>;

const mkStyles = (T: Theme): Record<string, any> => ({
  card: {
    background: T.bgCard,
    border: `1px solid ${T.border}`,
    borderRadius: "16px",
    padding: "28px",
    marginBottom: "20px",
    transition: "background 0.25s ease, border-color 0.25s ease",
    boxShadow: T.isDark ? "none" : "0 2px 12px rgba(0,0,0,0.06)",
  },
  cardTitle: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    color: T.textSecondary,
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  monoValue: {
    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
    fontSize: "36px",
    fontWeight: 700,
    color: T.cyan,
    letterSpacing: "-0.02em",
  },
  monoValueSm: {
    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
    fontSize: "14px",
    color: T.textMono,
    letterSpacing: "0.04em",
  },
  btn: (color: string, outline = false) => {
    const c = color || T.cyan;
    return {
      padding: "12px 28px",
      borderRadius: "10px",
      border: outline ? `1.5px solid ${c}` : "none",
      background: outline ? "transparent" : `linear-gradient(135deg, ${c}, ${c}CC)`,
      color: outline ? c : (T.isDark ? T.bg : "#fff"),
      fontWeight: 700,
      fontSize: "14px",
      cursor: "pointer",
      letterSpacing: "0.04em",
      transition: "all 0.15s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    };
  },
  btnSm: (color: string) => {
    const c = color || T.cyan;
    return {
      padding: "8px 16px",
      borderRadius: "8px",
      border: `1.5px solid ${c}22`,
      background: `${c}18`,
      color: c,
      fontWeight: 600,
      fontSize: "12px",
      cursor: "pointer",
      letterSpacing: "0.04em",
      transition: "all 0.15s ease",
    };
  },
  badge: (color: string) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "20px",
    background: `${color}18`,
    border: `1px solid ${color}40`,
    color: color,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.06em",
  }),
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: `1.5px solid ${T.border}`,
    background: T.inputBg,
    color: T.textPrimary,
    fontSize: "14px",
    fontFamily: "'JetBrains Mono', monospace",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s, background 0.25s",
  },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  row: { display: "flex", alignItems: "center", gap: "12px" },
  divider: { height: "1px", background: T.border, margin: "20px 0" },
  label: {
    fontSize: "11px",
    color: T.textSecondary,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "6px",
  },
});

// ── Static data ──

const TABS = [
  // ── 🌐 Network ──
  { id: "ip", icon: "antenna", en: "My IP", fr: "Mon IP", group: "network",
    enDesc: "View your public IP address and connection info", frDesc: "Voir votre adresse IP publique et les infos de connexion" },
  { id: "iplookup", icon: "target", en: "IP Lookup", fr: "Recherche IP", group: "network",
    enDesc: "Look up geolocation and ISP info for any IP address", frDesc: "Consulter la géolocalisation et le FAI de n'importe quelle adresse IP" },
  { id: "subnet", icon: "network", en: "Subnet Calculator", fr: "Calc. Sous-réseau", group: "network",
    enDesc: "Calculate network, broadcast and usable host range from a CIDR", frDesc: "Calculer réseau, diffusion et plage d'hôtes utilisables à partir d'un CIDR" },
  { id: "ping", icon: "wifi", en: "Ping Test", fr: "Test de Ping", group: "network",
    enDesc: "Test response time to a server or domain", frDesc: "Tester le temps de réponse d'un serveur ou domaine" },
  { id: "traceroute", icon: "map", en: "Traceroute", fr: "Traceroute", group: "network",
    enDesc: "Trace the network path to a destination", frDesc: "Tracer le chemin réseau vers une destination" },
  { id: "ipconv", icon: "exchange", en: "IP Converter", fr: "Convertisseur IP", group: "network",
    enDesc: "Convert an IP between decimal, binary and hexadecimal", frDesc: "Convertir une IP entre décimal, binaire et hexadécimal" },
  { id: "contping", icon: "clock", en: "Continuous Ping", fr: "Ping Continu", group: "network",
    enDesc: "Ping a host continuously and track latency over time", frDesc: "Envoyer des pings continus vers un hôte et suivre la latence" },
  // ── 🔎 DNS & Domain ──
  { id: "dns", icon: "globe", en: "DNS Lookup", fr: "Recherche DNS", group: "dns",
    enDesc: "Look up DNS records for a domain", frDesc: "Consulter les enregistrements DNS d'un domaine" },
  { id: "dnsprop", icon: "repeat", en: "DNS Propagation", fr: "Propagation DNS", group: "dns",
    enDesc: "Check if DNS changes have propagated across major resolvers", frDesc: "Vérifier si les changements DNS se sont propagés sur les résolveurs majeurs" },
  { id: "whois", icon: "clipboard", en: "Whois", fr: "Whois", group: "dns",
    enDesc: "Look up domain registration and ownership info", frDesc: "Consulter les infos d'enregistrement et de propriété d'un domaine" },
  { id: "domainAge", icon: "calendar", en: "Domain Age", fr: "Âge du Domaine", group: "dns",
    enDesc: "Find out when a domain was first registered", frDesc: "Découvrir la date de première création d'un domaine" },
  // ── 🔐 Security ──
  { id: "ssl", icon: "lock", en: "SSL Checker", fr: "Vérif. SSL", group: "security",
    enDesc: "Check a website's SSL certificate validity", frDesc: "Vérifier la validité du certificat SSL d'un site" },
  { id: "ports", icon: "plug", en: "Port Scanner", fr: "Scanneur de Ports", group: "security",
    enDesc: "Check which ports are open on a host", frDesc: "Vérifier quels ports sont ouverts sur un hôte" },
  { id: "password", icon: "key", en: "Password", fr: "Mot de Passe", group: "security",
    enDesc: "Generate and check the strength of a password", frDesc: "Générer un mot de passe et vérifier sa robustesse" },
  { id: "emailsec", icon: "mail", en: "Email Security", fr: "Sécurité Email", group: "security",
    enDesc: "Check a domain's SPF, DKIM and DMARC records", frDesc: "Vérifier les enregistrements SPF, DKIM et DMARC d'un domaine" },
  { id: "secheaders", icon: "shield", en: "Security Headers", fr: "En-têtes de Sécurité", group: "security",
    enDesc: "Grade a website's HTTP security headers", frDesc: "Noter les en-têtes de sécurité HTTP d'un site" },
  { id: "blacklist", icon: "x", en: "Blacklist Check", fr: "Vérif. Liste Noire", group: "security",
    enDesc: "Check if an IP is listed on major DNS blacklists", frDesc: "Vérifier si une IP figure sur les listes noires DNS majeures" },
  // ── 🌍 Website ──
  { id: "status", icon: "search", en: "Site Status", fr: "État du Site", group: "website",
    enDesc: "Check if a website is up or down", frDesc: "Vérifier si un site web est en ligne ou hors service" },
  { id: "headers", icon: "file-text", en: "HTTP Headers", fr: "En-têtes HTTP", group: "website",
    enDesc: "Inspect the HTTP response headers of a URL", frDesc: "Inspecter les en-têtes de réponse HTTP d'une URL" },
  { id: "speed", icon: "bolt", en: "Speed Test", fr: "Test de Débit", group: "website",
    enDesc: "Measure your download speed and latency", frDesc: "Mesurer votre vitesse de téléchargement et la latence" },
];

const TAB_GROUPS = [
  { id: "network", icon: "antenna", en: "Network", fr: "Réseau" },
  { id: "dns", icon: "globe", en: "DNS & Domain", fr: "DNS & Domaine" },
  { id: "security", icon: "shield", en: "Security", fr: "Sécurité" },
  { id: "website", icon: "search", en: "Website", fr: "Site Web" },
];

const POPULAR_SITES = [
  { name: "Google", url: "https://google.com", icon: "search" },
  { name: "Facebook", url: "https://facebook.com", icon: "user" },
  { name: "YouTube", url: "https://youtube.com", icon: "send" },
  { name: "WhatsApp", url: "https://web.whatsapp.com", icon: "message" },
  { name: "Instagram", url: "https://instagram.com", icon: "camera" },
  { name: "Twitter/X", url: "https://x.com", icon: "x" },
  { name: "TikTok", url: "https://tiktok.com", icon: "music" },
  { name: "Netflix", url: "https://netflix.com", icon: "movie" },
];

const CHAR_SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const AD_CATALOG = {
  ip:         { icon: "shield", label: "NordVPN",       copy: "Your IP is visible to every site you visit.",                    cta: "Hide My IP →",       color: "#4169E1", url: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=YOUR_AFF_ID&url_id=902" },
  speed:      { icon: "bolt", label: "ExpressVPN",    copy: "Slow connection? A VPN can route around congestion.",           cta: "Boost Speed →",       color: "#DA3B2F", url: "https://www.expressvpn.com/order?a_aid=YOUR_AFF_ID" },
  dns:        { icon: "globe", label: "Namecheap",     copy: "Found the perfect domain? Register it before someone else does.", cta: "Register Domain →",  color: "#DE3723", url: "https://www.namecheap.com/?aff=YOUR_AFF_ID" },
  whois:      { icon: "lock", label: "Namecheap",     copy: "Keep your WHOIS private — enable domain privacy protection.",   cta: "Enable Privacy →",    color: "#DE3723", url: "https://www.namecheap.com/security/whoisguard/?aff=YOUR_AFF_ID" },
  ssl:        { icon: "lock", label: "ZeroSSL",       copy: "SSL expiring soon? Automate renewal and never go dark.",        cta: "Auto-Renew SSL →",    color: "#2ECC71", url: "https://zerossl.com/?via=YOUR_AFF_ID" },
  domainAge:  { icon: "clipboard", label: "GoDaddy",       copy: "Old domain available? Aged domains rank faster in search.",     cta: "Buy Aged Domain →",   color: "#1BDBDB", url: "https://www.godaddy.com/domains/auction?isc=YOUR_AFF_ID" },
  ping:       { icon: "rocket", label: "Cloudflare",    copy: "High latency? Cloudflare's CDN puts your content closer to users.", cta: "Try Cloudflare →", color: "#F48120", url: "https://www.cloudflare.com/plans/?aff=YOUR_AFF_ID" },
  ports:      { icon: "flame", label: "Cloudflare WAF",copy: "Open ports are attack surfaces. A WAF blocks threats at the edge.", cta: "Protect My Server →", color: "#F48120", url: "https://www.cloudflare.com/application-services/products/waf/?aff=YOUR_AFF_ID" },
  headers:    { icon: "shield", label: "Sucuri",        copy: "Missing security headers? Sucuri adds HSTS, CSP and more instantly.", cta: "Fix My Headers →", color: "#1A9C3E", url: "https://sucuri.net/?aff=YOUR_AFF_ID" },
  traceroute: { icon: "antenna", label: "DigitalOcean",  copy: "Too many hops? Deploy closer to your users with global droplets.", cta: "Reduce Latency →", color: "#0080FF", url: "https://www.digitalocean.com/?refcode=YOUR_REF_CODE" },
  status:     { icon: "chart-bar", label: "UptimeRobot",   copy: "Monitor uptime 24/7 — get alerted before your users notice.",   cta: "Monitor Free →",     color: "#3BD671", url: "https://uptimerobot.com/?aff=YOUR_AFF_ID" },
  password:   { icon: "key", label: "1Password",     copy: "Generated a strong password? Store it safely in a password manager.", cta: "Try 1Password →", color: "#1A8CFF", url: "https://1password.com/?ref=YOUR_AFF_ID" },
  subnet:     { icon: "network", label: "DigitalOcean",  copy: "Planning a VPC layout? Deploy the real infrastructure in minutes.", cta: "Deploy Now →",       color: "#0080FF", url: "https://www.digitalocean.com/?refcode=YOUR_REF_CODE" },
  dnsprop:    { icon: "globe", label: "Namecheap",     copy: "Waiting on propagation? Fast-propagating managed DNS cuts the wait.", cta: "Manage My DNS →",    color: "#DE3723", url: "https://www.namecheap.com/?aff=YOUR_AFF_ID" },
  iplookup:   { icon: "shield", label: "NordVPN",       copy: "Anyone can look up an IP like this. Mask yours before they do.",   cta: "Hide My IP →",       color: "#4169E1", url: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=YOUR_AFF_ID&url_id=902" },
  emailsec:   { icon: "mail", label: "Mailgun",         copy: "Sending mail from your own domain? Get SPF/DKIM/DMARC set up right.", cta: "Set Up Email →",    color: "#F06B66", url: "https://www.mailgun.com/?ref=YOUR_AFF_ID" },
  secheaders: { icon: "shield", label: "Cloudflare",    copy: "Missing security headers? A CDN/WAF can add most of them for you.", cta: "Secure My Site →",  color: "#F38020", url: "https://www.cloudflare.com/?ref=YOUR_AFF_ID" },
  blacklist:  { icon: "cloud", label: "SendGrid",       copy: "IP flagged on a blacklist? A reputable mail relay avoids the problem entirely.", cta: "Try SendGrid →", color: "#51A9E3", url: "https://sendgrid.com/?ref=YOUR_AFF_ID" },
  ipconv:     { icon: "exchange", label: "DigitalOcean", copy: "Scripting network config? Deploy real infrastructure to test it on.", cta: "Deploy Now →", color: "#0080FF", url: "https://www.digitalocean.com/?refcode=YOUR_REF_CODE" },
  contping:   { icon: "clock", label: "UptimeRobot",    copy: "Watching latency by hand? Get automated alerts the moment a host drops.", cta: "Monitor Free →", color: "#3BD671", url: "https://uptimerobot.com/?aff=YOUR_AFF_ID" },
};

const AD_DEFAULT = {
  icon: "globe",
  label: "CHRONOS",
  copy: "Explore all network diagnostic tools in one place.",
  cta: "Explore →",
  color: "#00D4FF",
  url: "#",
};

const PING_TARGETS = [
  { label: "Cloudflare", url: "https://cloudflare.com/favicon.ico" },
  { label: "Google", url: "https://google.com/favicon.ico" },
  { label: "Amazon", url: "https://amazon.com/favicon.ico" },
  { label: "Microsoft", url: "https://microsoft.com/favicon.ico" },
];

const COMMON_PORTS = [
  { port: 21, service: "FTP" }, { port: 22, service: "SSH" }, { port: 23, service: "Telnet" },
  { port: 25, service: "SMTP" }, { port: 53, service: "DNS" }, { port: 80, service: "HTTP" },
  { port: 110, service: "POP3" }, { port: 143, service: "IMAP" }, { port: 443, service: "HTTPS" },
  { port: 465, service: "SMTPS" }, { port: 587, service: "SMTP/TLS" }, { port: 993, service: "IMAPS" },
  { port: 3306, service: "MySQL" }, { port: 3389, service: "RDP" }, { port: 5432, service: "PostgreSQL" },
  { port: 6379, service: "Redis" }, { port: 8080, service: "HTTP-Alt" }, { port: 8443, service: "HTTPS-Alt" },
  { port: 27017, service: "MongoDB" },
];

// ── GlobalStyles ──

const GlobalStyles = () => (
  <style>{`
    /* Hide scrollbar on tab nav (mobile) */
    nav::-webkit-scrollbar { display: none; }

    @keyframes pulse-ring {
      0% { opacity: 0.6; transform-origin: center; transform: scale(0.8); }
      100% { opacity: 0; transform: scale(1.3); }
    }
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
    @keyframes slide-in { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
    @keyframes count-up { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }

    /* ── Global focus-visible ring ── */
    *:focus { outline: none; }
    *:focus-visible {
      outline: 2px solid #2563EB;
      outline-offset: 2px;
      border-radius: 6px;
    }

    /* ── Minimum tap target: 44×44 for all interactive elements ── */
    button, [role="button"], [role="option"], [role="tab"] {
      min-height: 44px;
      min-width: 44px;
    }
    /* Exception: inline badges and icon-in-row buttons that have explicit sizing */
    button.ch-inline, [role="button"].ch-inline { min-height: unset; min-width: unset; }

    /* ── Hide scrollbar on horizontal overflow areas ── */
    .ch-scroll-hide::-webkit-scrollbar { display: none; }
    .ch-scroll-hide { scrollbar-width: none; -ms-overflow-style: none; }

    /* ── Safe area for bottom nav on iOS ── */
    .ch-safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
  `}</style>
);

// ============================================================
// PULSE RING
// ============================================================

// ── Shared UI ──

const HISTORY_KEY = (toolKey: string) => `chronos_nh_${toolKey}`;

function useNHHistory(toolKey: string) {
  const [entries, setEntries] = useState<HistoryEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY(toolKey)) || "[]") as HistoryEntry[]; }
    catch { return []; }
  });
  const save = useCallback((data: Record<string, unknown>) => {
    setEntries(prev => {
      const entry = { ...data, _id: Date.now(), _ts: Date.now() };
      const next = [entry, ...prev.filter(e => e._id !== entry._id)].slice(0, 50);
      try { localStorage.setItem(HISTORY_KEY(toolKey), JSON.stringify(next)); } catch {}
      return next;
    });
  }, [toolKey]);
  const clear = useCallback(() => {
    setEntries([]);
    try { localStorage.removeItem(HISTORY_KEY(toolKey)); } catch {}
  }, [toolKey]);
  return { entries, save, clear };
}

type HistoryEntry = { _id: number; _ts: number; [key: string]: any };

function HistoryPanel({ entries, onSelect, onClear, renderLabel }: {
  entries: HistoryEntry[];
  onSelect?: (entry: HistoryEntry) => void;
  onClear: () => void;
  renderLabel: (entry: HistoryEntry) => string;
}) {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [open, setOpen] = useState(false);
  if (entries.length === 0) return null;

  const exportCSV = () => {
    const keys = Object.keys(entries[0]).filter(k => !k.startsWith("_"));
    const rows = [keys.join(","), ...entries.map(e => keys.map(k => JSON.stringify(e[k] ?? "")).join(","))];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "nethub_history.csv"; a.click();
  };

  return (
    <div style={{ ...S.card, marginTop: "4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", padding: 0 }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: T.textSecondary, textTransform: "uppercase" }}>
            {open ? "▾" : "▸"} {t("nh.history.title", { n: entries.length })}
          </span>
        </button>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={{ ...S.btnSm(T.cyan), fontSize: "10px" }} onClick={exportCSV}>{t("nh.history.exportCsv")}</button>
          <button style={{ ...S.btnSm(T.red), fontSize: "10px" }} onClick={onClear}>{t("nh.history.clear")}</button>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {entries.map((entry) => (
            <div key={entry._id} onClick={() => onSelect && onSelect(entry)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: "8px", background: T.bgSubtle, border: `1px solid ${T.border}`, cursor: onSelect ? "pointer" : "default" }}>
              <span style={{ fontFamily: "monospace", fontSize: "12px", color: T.textPrimary }}>{renderLabel(entry)}</span>
              <span style={{ fontSize: "10px", color: T.textSecondary, flexShrink: 0, marginLeft: "12px" }}>
                {new Date(entry._ts).toLocaleDateString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PulseRing({ active }: { active: boolean }) {
  const T = useNHTheme();
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: "absolute" }}>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx="60" cy="60" r={30 + i * 14} fill="none"
            stroke={T.cyan} strokeWidth="1"
            opacity={active ? 0.6 - i * 0.18 : 0}
            style={{
              animationName: active ? "pulse-ring" : "none",
              animationDuration: active ? `${1.4 + i * 0.4}s` : "0s",
              animationTimingFunction: "ease-out",
              animationIterationCount: "infinite",
              animationDelay: `${i * 0.3}s`,
            }} />
        ))}
      </svg>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${T.cyan}30, ${T.cyan}08)`,
        border: `2px solid ${T.cyan}60`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px",
      }}><IconAntenna size={20} /></div>
    </div>
  );
}

function SpeedGauge({ value, max = 100, color, label, unit = "Mbps" }: { value: number; max?: number; color: string; label: string; unit?: string }) {
  const T = useNHTheme();
  const pct = Math.min(value / max, 1);
  const r = 52, cx = 60, cy = 60;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ * 0.75;
  const gap = circ - dash;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="120" height="100" viewBox="0 0 120 100">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.border} strokeWidth="8"
          strokeDasharray={`${circ * 0.75} ${circ}`} strokeLinecap="round"
          transform={`rotate(-135, ${cx}, ${cy})`} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${gap + circ * 0.25}`} strokeLinecap="round"
          transform={`rotate(-135, ${cx}, ${cy})`}
          style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }} />
        <text x={cx} y={cy - 4} textAnchor="middle" fill={color}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "18px", fontWeight: 700 }}>
          {value > 0 ? value.toFixed(1) : "—"}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill={T.textSecondary}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px" }}>
          {unit}
        </text>
      </svg>
      <div style={{ fontSize: "11px", color: T.textSecondary, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  if (status === "checking") return <span style={{ color: T.cyan, fontSize: "11px", animation: "blink 1s infinite" }}>{t("nh.status.checking")}</span>;
  if (status === "up") return <span style={{ ...S.badge(T.green), fontSize: "10px" }}>{t("nh.status.online")}</span>;
  if (status === "down") return <span style={{ ...S.badge(T.red), fontSize: "10px" }}>{t("nh.status.down")}</span>;
  return <span style={{ color: T.textSecondary, fontSize: "11px" }}>{t("nh.status.idle")}</span>;
}

function StrengthBar({ bits }: { bits: number }) {
  const T = useNHTheme();
  const { t } = useTrans();
  const levels = [
    { min: 0, label: t("nh.password.strengthWeak"), color: T.red },
    { min: 40, label: t("nh.password.strengthFair"), color: T.yellow },
    { min: 60, label: t("nh.password.strengthStrong"), color: T.cyan },
    { min: 80, label: t("nh.password.strengthVeryStrong"), color: T.green },
  ];
  const lvl = [...levels].reverse().find(l => bits >= l.min) || levels[0];
  const pct = Math.min((bits / 128) * 100, 100);
  const S = mkStyles(T);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "11px", color: T.textSecondary }}>{t("nh.password.entropy", { bits })}</span>
        <span style={{ ...S.badge(lvl.color), fontSize: "10px" }}>{lvl.label}</span>
      </div>
      <div style={{ height: "6px", background: T.border, borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ height: "100%", background: `linear-gradient(90deg, ${lvl.color}99, ${lvl.color})`, borderRadius: "4px", width: `${pct}%`, transition: "all 0.4s ease" }} />
      </div>
    </div>
  );
}

function NHAdBanner({ tab }: { tab: string }) {
  const T = useNHTheme();
  const S = mkStyles(T);
  const ad = AD_CATALOG[tab] || AD_DEFAULT;
  const accentColor = ad.color;

  return (
    <div style={{
      margin: "0",
      padding: "11px 16px",
      background: T.isDark ? `${accentColor}0D` : `${accentColor}08`,
      border: `1px solid ${accentColor}30`,
      borderRadius: "10px",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
      transition: "all 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
        <span style={{ flexShrink: 0, display: "flex" }}><Icon name={ad.icon} size={15} /></span>
        <div style={{ minWidth: 0 }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: accentColor, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Ad · {ad.label}
          </span>
          <span style={{ fontSize: "11px", color: T.textSecondary, marginLeft: "8px" }}>{ad.copy}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={() => window.open(ad.url, "_blank", "noopener,noreferrer")}
          style={{
            padding: "6px 12px", borderRadius: "7px", border: `1.5px solid ${accentColor}60`,
            background: `${accentColor}18`, color: accentColor,
            fontWeight: 700, fontSize: "11px", cursor: "pointer", whiteSpace: "nowrap",
            transition: "all 0.15s",
          }}>{ad.cta}</button>
      </div>
    </div>
  );
}

// ── Tab panels 1-6 ──

function IPTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { entries, save, clear } = useNHHistory("ip");

  const fetchIP = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (!res.ok) throw new Error();
      const d = await res.json();
      setData(d);
      save({ ip: d.ip, city: d.city, country: d.country_name, org: d.org });
    } catch {
      try {
        const r2 = await fetch("https://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query");
        const j2 = await r2.json();
        if (j2.status === "success") {
          const d = { ip: j2.query, city: j2.city, country_name: j2.country, country_code: j2.countryCode, region: j2.regionName, timezone: j2.timezone, org: j2.org || j2.isp, latitude: j2.lat, longitude: j2.lon };
          setData(d);
          save({ ip: d.ip, city: d.city, country: d.country_name, org: d.org });
        } else throw new Error();
      } catch {
        setError(t("nh.ip.error"));
      }
    }
    setLoading(false);
  }, [save, t]);

  useEffect(() => { fetchIP(); }, [fetchIP]);

  const copy = () => {
    if (data?.ip) navigator.clipboard.writeText(data.ip).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };

  const flagUrl = data?.country_code ? `https://flagcdn.com/w40/${data.country_code.toLowerCase()}.png` : null;

  return (
    <div>
      <div style={{ ...S.card, textAlign: "center" }}>
        <div style={S.cardTitle}>{t("nh.ip.title")}</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <PulseRing active={!loading && !!data} />
          {loading && (
            <div style={{ color: T.textSecondary, fontSize: "14px", fontFamily: "monospace" }}>
              <span style={{ animation: "blink 1s infinite" }}>●</span> {t("nh.ip.detecting")}
            </div>
          )}
          {data && !loading && (
            <div style={{ animation: "slide-in 0.4s ease" }}>
              <div style={{ ...S.monoValue, fontSize: "32px", marginBottom: "8px" }}>{data.ip}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
                {flagUrl && <img src={flagUrl} alt="" style={{ height: "18px", borderRadius: "2px" }} />}
                <span style={{ color: T.textSecondary, fontSize: "14px" }}>
                  {[data.city, data.region, data.country_name].filter(Boolean).join(", ")}
                </span>
              </div>
              <button style={S.btnSm(copied ? T.green : T.cyan)} onClick={copy}>
                {copied ? t("nh.ip.copied") : t("nh.ip.copy")}
              </button>
            </div>
          )}
          {error && <div style={{ color: T.red, fontSize: "13px" }}>{error}</div>}
        </div>
      </div>
      {data && !loading && (
        <div style={{ ...S.card, animation: "slide-in 0.5s ease 0.1s both" }}>
          <div style={S.cardTitle}>{t("nh.ip.connectionDetails")}</div>
          <div style={S.grid2}>
            {[[t("nh.ip.isp"), data.org], [t("nh.ip.timezone"), data.timezone], [t("nh.ip.latitude"), data.latitude], [t("nh.ip.longitude"), data.longitude], [t("nh.ip.region"), data.region], [t("nh.ip.country"), data.country_name]]
              .map(([k, v]) => v ? (
                <div key={k}>
                  <div style={S.label}>{k}</div>
                  <div style={S.monoValueSm}>{v}</div>
                </div>
              ) : null)}
          </div>
          <div style={S.divider} />
          <button style={S.btn(T.cyan, true)} onClick={fetchIP}>{t("nh.ip.refresh")}</button>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => `${e.ip} — ${e.city || ""} ${e.country || ""}`} />
    </div>
  );
}

// ── IP Lookup / Geo-IP ──
// Ohatra amin'ny IPTab (ipapi.co + ip-api.com fallback), fa ho an'ny
// IP arbitrary nampidirin'ny mpampiasa, tsy ny IP-n'ny mpampiasa ihany.

const IPV4_RE = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

function IpLookupTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [ip, setIp] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("iplookup");

  const lookup = async () => {
    const q = ip.trim();
    if (!IPV4_RE.test(q)) { setError(t("nh.iplookup.error")); setData(null); return; }
    setLoading(true); setError(null); setData(null);
    try {
      const res = await fetch(`https://ipapi.co/${q}/json/`);
      const d = await res.json();
      if (d.error) throw new Error();
      setData(d);
      save({ ip: d.ip || q, city: d.city, country: d.country_name });
    } catch {
      try {
        const r2 = await fetch(`https://ip-api.com/json/${q}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
        const j2 = await r2.json();
        if (j2.status !== "success") throw new Error();
        const d = { ip: j2.query, city: j2.city, country_name: j2.country, region: j2.regionName, timezone: j2.timezone, org: j2.isp, asn: j2.as, latitude: j2.lat, longitude: j2.lon };
        setData(d);
        save({ ip: d.ip, city: d.city, country: d.country_name });
      } catch {
        setError(t("nh.iplookup.notFound"));
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.iplookup.title")}</div>
        <div style={{ ...S.row, marginBottom: "4px" }}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.iplookup.placeholder")}
            value={ip} onChange={e => setIp(e.target.value)}
            onKeyDown={e => e.key === "Enter" && lookup()} />
          <button style={S.btn(T.cyan)} onClick={lookup} disabled={loading || !ip.trim()}>
            {loading ? <><span style={{ animation: "spin-slow 1s linear infinite", display: "inline-block" }}>↻</span> {t("nh.iplookup.lookingUp")}</> : t("nh.iplookup.lookupBtn")}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
          <div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div>
        </div>
      )}

      {data && !loading && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={S.cardTitle}>{t("nh.iplookup.resultsFor", { ip: data.ip })}</div>
          <div style={{ ...S.monoValue, fontSize: "26px", marginBottom: "18px" }}>{data.ip}</div>
          <div style={S.grid2}>
            {[
              [t("nh.iplookup.country"), data.country_name],
              [t("nh.iplookup.region"), data.region],
              [t("nh.iplookup.city"), data.city],
              [t("nh.iplookup.isp"), data.org],
              [t("nh.iplookup.organization"), data.org],
              [t("nh.iplookup.asn"), data.asn],
              [t("nh.iplookup.timezone"), data.timezone],
              [t("nh.iplookup.coordinates"), (data.latitude && data.longitude) ? `${data.latitude}, ${data.longitude}` : null],
            ].map(([k, v]) => v ? (
              <div key={k as string}>
                <div style={S.label}>{k}</div>
                <div style={S.monoValueSm}>{v}</div>
              </div>
            ) : null)}
          </div>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.iplookup.historyLabel", { ip: e.ip, city: e.city || "—", country: e.country || "—" })} />
    </div>
  );
}

function SpeedTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [phase, setPhase] = useState("idle");
  const [download, setDownload] = useState(0);
  const [ping, setPing] = useState(0);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState([]);
  const { entries, save, clear } = useNHHistory("speed");

  const addLog = (msg: string) => setLog(prev => [...prev.slice(-5), msg]);

  const measurePing = async () => {
    const samples = [];
    for (let i = 0; i < 3; i++) {
      try {
        const t0 = performance.now();
        await fetch("https://cloudflare.com/favicon.ico?r=" + Math.random(), { mode: "no-cors", cache: "no-store" });
        samples.push(Math.round(performance.now() - t0));
      } catch { }
      await new Promise(r => setTimeout(r, 100));
    }
    return samples.length ? Math.min(...samples) : null;
  };

  const measureDownload = async (onProgress: (live: number, frac: number) => void): Promise<number> => {
    const URLS = ["https://speed.cloudflare.com/__down?bytes=5000000", "https://httpbin.org/bytes/2000000"];
    for (const url of URLS) {
      try {
        const t0 = performance.now();
        const res = await fetch(url + "&r=" + Math.random(), { cache: "no-store" });
        if (!res.body) throw new Error();
        const reader = res.body.getReader();
        let received = 0;
        const target = url.includes("5000000") ? 5_000_000 : 2_000_000;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          received += value.byteLength;
          const elapsed = (performance.now() - t0) / 1000;
          onProgress(+((received * 8) / (elapsed * 1_000_000)).toFixed(2), Math.min(received / target, 0.95));
        }
        const elapsed = (performance.now() - t0) / 1000;
        return +((received * 8) / (elapsed * 1_000_000)).toFixed(2);
      } catch { }
    }
    addLog(t("nh.speed.logImageFallback"));
    return new Promise<number>((resolve) => {
      const img = new Image();
      const t0 = performance.now();
      img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/560px-PNG_transparency_demonstration_1.png?r=" + Math.random();
      img.onload = () => {
        const elapsed = (performance.now() - t0) / 1000;
        resolve(+Math.max((170_000 * 8) / (elapsed * 1_000_000), 0.1).toFixed(2));
      };
      img.onerror = () => resolve(0);
      setTimeout(() => resolve(0), 12000);
    });
  };

  const runTest = async () => {
    setPhase("testing"); setDownload(0); setPing(0); setProgress(5); setLog([]);
    addLog(t("nh.speed.logMeasuringLatency"));
    const pingMs = await measurePing();
    if (pingMs !== null) { setPing(pingMs); addLog(t("nh.speed.logPingResult", { ms: pingMs })); }
    else { setPing(99); addLog(t("nh.speed.logPingUnavailable")); }
    setProgress(20);
    addLog(t("nh.speed.logMeasuringDownload"));
    const mbps = await measureDownload((live, frac) => { setDownload(live); setProgress(20 + Math.round(frac * 75)); });
    if (mbps > 0) { setDownload(mbps); addLog(t("nh.speed.logDownloadResult", { mbps })); save({ download: mbps, ping: pingMs ?? 99, ratingKey: mbps >= 50 ? "nh.speed.ratingExcellent" : mbps >= 10 ? "nh.speed.ratingGood" : mbps >= 2 ? "nh.speed.ratingAverage" : "nh.speed.ratingSlow" }); }
    else addLog(t("nh.speed.logDownloadFailed"));
    setProgress(100); setPhase("done");
  };

  const ratingColor = (m: number) => m >= 50 ? T.green : m >= 10 ? T.cyan : m >= 2 ? T.yellow : T.red;
  const ratingLabel = (m: number): [string, string] => {
    if (m >= 50) return [t("nh.speed.ratingExcellent"), T.green];
    if (m >= 10) return [t("nh.speed.ratingGood"), T.cyan];
    if (m >= 2) return [t("nh.speed.ratingAverage"), T.yellow];
    if (m > 0) return [t("nh.speed.ratingSlow"), T.red];
    return ["—", T.textSecondary];
  };
  const [rLabel, rColor] = ratingLabel(download);

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.speed.title")}</div>
        <div style={{ ...S.grid2, marginBottom: "24px", gap: "32px", justifyItems: "center" }}>
          <SpeedGauge value={download} max={200} color={ratingColor(download)} label={t("nh.speed.download")} />
          <SpeedGauge value={ping} max={200} color={ping > 0 && ping < 50 ? T.green : ping < 150 ? T.yellow : T.red} label={t("nh.speed.ping")} unit="ms" />
        </div>
        {phase === "testing" && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: T.textSecondary }}>{t("nh.speed.runningTest")}</span>
              <span style={{ fontSize: "12px", color: T.cyan, fontFamily: "monospace" }}>{progress}%</span>
            </div>
            <div style={{ height: "6px", background: T.border, borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", background: `linear-gradient(90deg, ${T.cyan}, ${T.cyanDim})`, borderRadius: "4px", width: `${progress}%`, transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}
        {phase === "done" && download > 0 && (
          <div style={{ ...S.badge(rColor), marginBottom: "16px", fontSize: "13px", padding: "6px 14px", animation: "count-up 0.4s ease" }}>
            ● {rLabel}
          </div>
        )}
        <div style={S.row}>
          <button style={S.btn(phase === "testing" ? T.textSecondary : T.cyan)} onClick={runTest} disabled={phase === "testing"}>
            {phase === "testing"
              ? <><span style={{ animation: "spin-slow 1s linear infinite", display: "inline-block" }}>↻</span> {t("nh.speed.running")}</>
              : phase === "done" ? t("nh.speed.runAgain") : t("nh.speed.startTest")}
          </button>
        </div>
        {log.length > 0 && (
          <div style={{ marginTop: "16px", padding: "12px", background: T.logBg, borderRadius: "8px", border: `1px solid ${T.border}` }}>
            {log.map((l, i) => <div key={i} style={{ fontFamily: "monospace", fontSize: "12px", color: T.textSecondary, lineHeight: "1.8" }}>{l}</div>)}
          </div>
        )}
      </div>
      <div style={{ ...S.card, background: T.isDark ? "rgba(0,212,255,0.03)" : "rgba(0,153,204,0.04)" }}>
        <div style={{ fontSize: "12px", color: T.textSecondary, lineHeight: "1.7" }}>
          <strong style={{ color: T.cyan }}>{t("nh.speed.noteTitle")}</strong> {t("nh.speed.noteBody")}
        </div>
      </div>
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.speed.historyLabel", { download: e.download, ping: e.ping, rating: e.ratingKey ? t(e.ratingKey) : (e.rating || "") })} />
    </div>
  );
}

function StatusTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [custom, setCustom] = useState("");
  const [customStatus, setCustomStatus] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const checkSite = useCallback(async (url: string) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const apiUrl = typeof window !== "undefined" && window.location.hostname !== "localhost"
        ? `https://corsproxy.io/?${encodeURIComponent(url)}`
        : `/api/check-site?url=${encodeURIComponent(url)}`;
      const res = await fetch(apiUrl, { signal: controller.signal, cache: "no-store" });
      clearTimeout(timeout);
      return res.ok || res.status === 0 ? "up" : "down";
    } catch (e) {
      clearTimeout(timeout);
      return e.name === "AbortError" ? "down" : "up";
    }
  }, []);

  const checkAll = useCallback(async () => {
    const initial = {};
    POPULAR_SITES.forEach(s => { initial[s.name] = "checking"; });
    setStatuses(initial);
    await Promise.all(POPULAR_SITES.map(async (site) => {
      const result = await checkSite(site.url);
      setStatuses(prev => ({ ...prev, [site.name]: result }));
    }));
  }, [checkSite]);

  const checkCustom = async () => {
    if (!custom.trim()) return;
    setChecking(true); setCustomStatus("checking");
    let url = custom.trim();
    if (!url.startsWith("http")) url = "https://" + url;
    setCustomStatus(await checkSite(url));
    setChecking(false);
  };

  return (
    <div>
      <div style={S.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={S.cardTitle}>{t("nh.status.popularSites")}</div>
          <button style={S.btnSm(T.cyan)} onClick={checkAll}>{t("nh.status.checkAll")}</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {POPULAR_SITES.map((site) => (
            <div key={site.name} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 14px", borderRadius: "10px",
              background: T.bgSubtle, border: `1px solid ${T.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon name={site.icon} size={16} />
                <span style={{ fontSize: "13px", fontWeight: 600 }}>{site.name}</span>
              </div>
              <StatusBadge status={statuses[site.name]} />
            </div>
          ))}
        </div>
      </div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.status.checkAny")}</div>
        <div style={{ ...S.row, marginBottom: "12px" }}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.status.placeholder")}
            value={custom} onChange={e => setCustom(e.target.value)}
            onKeyDown={e => e.key === "Enter" && checkCustom()} />
          <button style={S.btn(T.orange)} onClick={checkCustom} disabled={checking}>
            {checking ? "..." : t("nh.status.checkButton")}
          </button>
        </div>
        {customStatus && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: T.bgSubtle, borderRadius: "8px", animation: "slide-in 0.3s ease" }}>
            <span style={{ fontFamily: "monospace", fontSize: "13px", color: T.textSecondary }}>{custom}</span>
            <StatusBadge status={customStatus} />
          </div>
        )}
        <div style={{ fontSize: "11px", color: T.textSecondary, marginTop: "10px" }}>
          {t("nh.status.prodNote")}
        </div>
      </div>
    </div>
  );
}

// ── Password entropy calculator ──
const calcEntropy = (length: number, charsetSize: number): number =>
  Math.round(length * Math.log2(Math.max(charsetSize, 1)));

function PasswordTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [pwd, setPwd] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const generate = useCallback(() => {
    const charset = Object.entries(opts).filter(([, v]) => v).map(([k]) => CHAR_SETS[k]).join("");
    if (!charset) return;
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    const p = Array.from(arr).map(n => charset[n % charset.length]).join("");
    setPwd(p); setHistory(prev => [p, ...prev.slice(0, 4)]); setCopied(false);
  }, [length, opts]);

  useEffect(() => { generate(); }, []);

  const copy = () => navigator.clipboard.writeText(pwd).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  const toggle = (key: string) => setOpts(prev => {
    const next = { ...prev, [key]: !prev[key] };
    return Object.values(next).every(v => !v) ? prev : next;
  });

  const charsetSize = Object.entries(opts).filter(([, v]) => v).reduce((acc, [k]) => acc + CHAR_SETS[k].length, 0);
  const bits = calcEntropy(length, charsetSize || 1);

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.password.generatedTitle")}</div>
        <div style={{ padding: "16px", borderRadius: "10px", marginBottom: "20px", background: T.isDark ? "rgba(0,212,255,0.04)" : "rgba(0,153,204,0.05)", border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "18px", color: T.textPrimary, letterSpacing: "0.06em", wordBreak: "break-all", flex: 1 }}>
            {pwd || "—"}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button style={S.btnSm(T.cyan)} onClick={generate} aria-label={t("nh.password.generateAria")}>↻</button>
            <button style={S.btnSm(copied ? T.green : T.cyan)} onClick={copy}>{copied ? <IconCheck size={14} /> : t("nh.password.copy")}</button>
          </div>
        </div>
        <StrengthBar bits={bits} />
        <div style={S.divider} />
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <div style={S.label}>{t("nh.password.passwordLength")}</div>
            <span style={{ fontFamily: "monospace", color: T.cyan, fontSize: "14px", fontWeight: 700 }}>{length}</span>
          </div>
          <input type="range" min={8} max={64} value={length}
            onChange={e => setLength(+e.target.value)}
            style={{ width: "100%", accentColor: T.cyan, cursor: "pointer" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: T.textSecondary }}>
            <span>8</span><span>64</span>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div style={S.label}>{t("nh.password.characterTypes")}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[["upper", "ABC", t("nh.password.uppercase")], ["lower", "abc", t("nh.password.lowercase")], ["numbers", "123", t("nh.password.numbers")], ["symbols", "!@#", t("nh.password.symbols")]]
              .map(([key, ex, label]) => (
                <button key={key} onClick={() => { toggle(key); setTimeout(generate, 50); }} style={{
                  padding: "10px 14px", borderRadius: "8px", cursor: "pointer",
                  border: `1.5px solid ${opts[key] ? T.cyan : T.border}`,
                  background: opts[key] ? `${T.cyan}12` : T.bgSubtle,
                  color: opts[key] ? T.cyan : T.textSecondary,
                  display: "flex", alignItems: "center", gap: "10px", textAlign: "left", transition: "all 0.15s",
                }}>
                  <span style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: 700 }}>{ex}</span>
                  <span style={{ fontSize: "12px" }}>{label}</span>
                </button>
              ))}
          </div>
        </div>
        <button style={S.btn(T.cyan)} onClick={generate}>{t("nh.password.generateNewBtn")}</button>
      </div>
      {history.length > 1 && (
        <div style={S.card}>
          <div style={S.cardTitle}>{t("nh.password.recentPasswords")}</div>
          {history.slice(1).map((p, i) => (
            <div key={i} style={{ padding: "8px 12px", marginBottom: "6px", borderRadius: "8px", background: T.bgSubtle, border: `1px solid ${T.border}`, fontFamily: "monospace", fontSize: "12px", color: T.textSecondary, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ wordBreak: "break-all" }}>{p}</span>
              <button style={{ ...S.btnSm(T.textSecondary), marginLeft: "8px", flexShrink: 0 }} onClick={() => navigator.clipboard.writeText(p)}>{t("nh.password.copy")}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Subnet / CIDR Calculator ──
// Kajy local tanteraka (tsy misy API) — 32-bit unsigned bitwise math.

function ipStrToInt(ip: string): number {
  const parts = ip.split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}
function intToIpStr(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}
function parseCidr(input: string) {
  const m = input.trim().match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/(\d{1,2})$/);
  if (!m) return null;
  const [, ipStr, prefixStr] = m;
  const octets = ipStr.split(".").map(Number);
  if (octets.some(o => o < 0 || o > 255)) return null;
  const prefix = parseInt(prefixStr, 10);
  if (prefix < 0 || prefix > 32) return null;
  return { ipStr, prefix, ipInt: ipStrToInt(ipStr) };
}
function calcSubnet(ipStr: string, prefix: number) {
  const ipInt = ipStrToInt(ipStr);
  const mask = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
  const wildcard = (~mask) >>> 0;
  const network = (ipInt & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const total = Math.pow(2, 32 - prefix);
  let firstUsable, lastUsable, usableHosts;
  if (prefix >= 31) {
    firstUsable = network; lastUsable = broadcast;
    usableHosts = prefix === 32 ? 1 : 2;
  } else {
    firstUsable = network + 1; lastUsable = broadcast - 1;
    usableHosts = total - 2;
  }
  return {
    network: intToIpStr(network),
    broadcast: intToIpStr(broadcast),
    mask: intToIpStr(mask),
    wildcard: intToIpStr(wildcard),
    firstUsable: intToIpStr(firstUsable),
    lastUsable: intToIpStr(lastUsable),
    usableHosts,
    totalAddresses: total,
    cidr: `${ipStr}/${prefix}`,
  };
}

function SubnetTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("subnet");

  const calculate = () => {
    const parsed = parseCidr(input);
    if (!parsed) { setError(t("nh.subnet.error")); setResult(null); return; }
    setError(null);
    const r = calcSubnet(parsed.ipStr, parsed.prefix);
    setResult(r);
    save({ cidr: r.cidr, hosts: r.usableHosts });
  };

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.subnet.title")}</div>
        <div style={S.row}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.subnet.placeholder")}
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && calculate()} />
          <button style={S.btn(T.cyan)} onClick={calculate} disabled={!input.trim()}>{t("nh.subnet.calculateBtn")}</button>
        </div>
      </div>

      {error && (
        <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
          <div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div>
        </div>
      )}

      {result && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={S.cardTitle}>{result.cidr}</div>
          <div style={{ marginBottom: "20px" }}>
            <div style={S.label}>{t("nh.subnet.usableHosts")}</div>
            <div style={S.monoValue}>{result.usableHosts.toLocaleString()}</div>
          </div>
          <div style={S.grid2}>
            {[
              [t("nh.subnet.networkAddress"), result.network],
              [t("nh.subnet.broadcastAddress"), result.broadcast],
              [t("nh.subnet.subnetMask"), result.mask],
              [t("nh.subnet.wildcardMask"), result.wildcard],
              [t("nh.subnet.firstUsable"), result.firstUsable],
              [t("nh.subnet.lastUsable"), result.lastUsable],
              [t("nh.subnet.totalAddresses"), result.totalAddresses.toLocaleString()],
              [t("nh.subnet.cidr"), result.cidr],
            ].map(([k, v]) => (
              <div key={k as string}>
                <div style={S.label}>{k}</div>
                <div style={S.monoValueSm}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.subnet.historyLabel", { cidr: e.cidr, hosts: e.hosts })} />
    </div>
  );
}

function DnsTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("A");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("dns");

  const lookup = async () => {
    const d = cleanDomain(domain);
    if (!d) return;
    setLoading(true); setError(null); setResults(null);
    try {
      const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(d)}&type=${type}`);
      const data = await res.json();
      if (data.Status !== 0) throw new Error(data.Status === 3 ? t("nh.dns.nxdomain") : t("nh.dns.errorCode", { code: data.Status }));
      const r = { domain: d, type, answers: data.Answer || [], authority: data.Authority || [] };
      setResults(r);
      save({ domain: d, type, count: (data.Answer || []).length });
    } catch (e) {
      setError(e.message || t("nh.dns.error"));
    }
    setLoading(false);
  };

  const DNS_RTYPE = { 1: "A", 28: "AAAA", 5: "CNAME", 15: "MX", 2: "NS", 16: "TXT", 6: "SOA", 257: "CAA" };
  const DNS_TYPES = ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "SOA", "CAA"];

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.dns.title")}</div>
        
        <div style={{ marginBottom: "16px" }}>
          <div style={S.label}>{t("nh.dns.domainLabel")}</div>
          <div style={{ ...S.row, marginBottom: "12px" }}>
            <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.dns.placeholder")}
              value={domain} onChange={e => setDomain(e.target.value)}
              onKeyDown={e => e.key === "Enter" && lookup()} />
          </div>
          <div style={S.label}>{t("nh.dns.recordType")}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {DNS_TYPES.map(rt => (
              <button key={rt} onClick={() => setType(rt)} style={{
                ...S.btnSm(type === rt ? T.cyan : T.textSecondary),
                background: type === rt ? `${T.cyan}18` : T.bgSubtle,
                border: `1.5px solid ${type === rt ? T.cyan : T.border}`,
              }}>{rt}</button>
            ))}
          </div>
          <button style={S.btn(T.cyan)} onClick={lookup} disabled={loading || !domain.trim()}>
            {loading ? <><span style={{ animation: "spin-slow 1s linear infinite", display: "inline-block" }}>↻</span> {t("nh.dns.lookingUp")}</> : t("nh.dns.lookupBtn")}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
          <div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div>
        </div>
      )}

      {results && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={S.cardTitle}>{t("nh.dns.recordsFor", { type: results.type, domain: results.domain })}</div>
          {results.answers.length === 0 && results.authority.length === 0 && (
            <div style={{ color: T.textSecondary, fontSize: "13px" }}>{t("nh.dns.noRecords")}</div>
          )}
          {results.answers.map((r, i) => (
            <div key={i} style={{ padding: "12px 14px", marginBottom: "8px", borderRadius: "10px", background: T.bgSubtle, border: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "monospace", fontSize: "13px", color: T.textPrimary, wordBreak: "break-all", flex: 1 }}>{r.data}</span>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <span style={{ ...S.badge(T.cyan), fontSize: "10px" }}>{DNS_RTYPE[r.type] || `TYPE${r.type}`}</span>
                  <span style={{ ...S.badge(T.textSecondary), fontSize: "10px" }}>{t("nh.dns.ttl")} {r.TTL}s</span>
                </div>
              </div>
            </div>
          ))}
          {results.authority.length > 0 && results.answers.length === 0 && (
            <div>
              <div style={{ fontSize: "11px", color: T.textSecondary, marginBottom: "8px", fontWeight: 600 }}>{t("nh.dns.authorityRecords")}</div>
              {results.authority.map((r, i) => (
                <div key={i} style={{ padding: "10px 14px", marginBottom: "6px", borderRadius: "8px", background: T.bgSubtle, border: `1px solid ${T.border}`, fontFamily: "monospace", fontSize: "12px", color: T.textSecondary }}>{r.data}</div>
              ))}
            </div>
          )}
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.dns.historyLabel", { domain: e.domain, type: e.type, count: e.count, plural: e.count !== 1 ? "s" : "" })} />
    </div>
  );
}

// ── DNS Propagation Checker ──
// Mampitaha ny valiny avy amin'ny operateur DoH publika lehibe telo
// (Cloudflare, Google, Quad9) — tsy afaka mifantina "vantage point"
// ara-jeografika marina avy amin'ny browser (izany dia sanda amin'ny
// serivisy manokana any am-pizarantany), ka "resolver" tsirairay no
// asongadina fa tsy "faritra".

const PROPAGATION_RESOLVERS = [
  { id: "cloudflare", label: "Cloudflare (1.1.1.1)", url: (d: string, ty: string) => `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(d)}&type=${ty}`, headers: { Accept: "application/dns-json" } },
  { id: "google", label: "Google (8.8.8.8)", url: (d: string, ty: string) => `https://dns.google/resolve?name=${encodeURIComponent(d)}&type=${ty}` },
  { id: "quad9", label: "Quad9 (9.9.9.9)", url: (d: string, ty: string) => `https://dns.quad9.net:5053/dns-query?name=${encodeURIComponent(d)}&type=${ty}`, headers: { Accept: "application/dns-json" } },
];
const DNSPROP_TYPES = ["A", "AAAA", "CNAME", "MX", "TXT", "NS"];

function DnsPropagationTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("A");
  const [rows, setRows] = useState<any[] | null>(null);
  const [status, setStatus] = useState<"complete" | "partial" | "failed" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("dnsprop");

  const check = async () => {
    const d = cleanDomain(domain);
    if (!d) return;
    setLoading(true); setError(null); setRows(null); setStatus(null);
    const results = await Promise.allSettled(PROPAGATION_RESOLVERS.map(async r => {
      const res = await fetch(r.url(d, type), r.headers ? { headers: r.headers } : undefined);
      const j = await res.json();
      if (j.Status !== 0) throw new Error("nxdomain");
      const answers = (j.Answer || []).map((a: any) => a.data);
      return { id: r.id, label: r.label, answers };
    }));

    const rowsOut = PROPAGATION_RESOLVERS.map((r, i) => {
      const res = results[i];
      if (res.status === "fulfilled") return { ...res.value, ok: true };
      return { id: r.id, label: r.label, answers: [], ok: false };
    });

    const okRows = rowsOut.filter(r => r.ok);
    if (okRows.length === 0) {
      setError(t("nh.dnsprop.error"));
      setLoading(false);
      return;
    }
    const signatures = new Set(okRows.map(r => [...r.answers].sort().join(",")));
    let overall: "complete" | "partial" | "failed";
    if (okRows.length < rowsOut.length) overall = "partial";
    else if (signatures.size === 1 && okRows[0].answers.length > 0) overall = "complete";
    else if (signatures.size === 1 && okRows[0].answers.length === 0) overall = "failed";
    else overall = "partial";

    setRows(rowsOut);
    setStatus(overall);
    save({ domain: d, type, status: overall });
    setLoading(false);
  };

  const statusColor = status === "complete" ? T.green : status === "partial" ? T.yellow : T.red;
  const statusLabel = status === "complete" ? t("nh.dnsprop.statusComplete") : status === "partial" ? t("nh.dnsprop.statusPartial") : t("nh.dnsprop.statusFailed");

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.dnsprop.title")}</div>
        <div style={{ marginBottom: "16px" }}>
          <div style={S.label}>{t("nh.dns.domainLabel")}</div>
          <div style={{ ...S.row, marginBottom: "12px" }}>
            <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.dnsprop.placeholder")}
              value={domain} onChange={e => setDomain(e.target.value)}
              onKeyDown={e => e.key === "Enter" && check()} />
          </div>
          <div style={S.label}>{t("nh.dns.recordType")}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {DNSPROP_TYPES.map(rt => (
              <button key={rt} onClick={() => setType(rt)} style={{
                ...S.btnSm(type === rt ? T.cyan : T.textSecondary),
                background: type === rt ? `${T.cyan}18` : T.bgSubtle,
                border: `1.5px solid ${type === rt ? T.cyan : T.border}`,
              }}>{rt}</button>
            ))}
          </div>
          <button style={S.btn(T.cyan)} onClick={check} disabled={loading || !domain.trim()}>
            {loading ? <><span style={{ animation: "spin-slow 1s linear infinite", display: "inline-block" }}>↻</span> {t("nh.dnsprop.checking")}</> : t("nh.dnsprop.checkBtn")}
          </button>
        </div>
        <div style={{ fontSize: "11px", color: T.textSecondary, lineHeight: 1.6 }}>{t("nh.dnsprop.note")}</div>
      </div>

      {error && (
        <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
          <div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div>
        </div>
      )}

      {rows && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={S.cardTitle}>{t("nh.dnsprop.resultsFor", { domain: cleanDomain(domain) })}</div>
            {status && <span style={S.badge(statusColor)}>{statusLabel}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {rows.map(r => (
              <div key={r.id} style={{ padding: "12px 14px", borderRadius: "10px", background: T.bgSubtle, border: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: r.answers.length ? "6px" : 0 }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: T.textPrimary }}>{r.label}</span>
                  {r.ok
                    ? <IconCheck size={14} color={T.green} />
                    : <IconX size={14} color={T.red} />}
                </div>
                {r.answers.length > 0
                  ? r.answers.map((a: string, i: number) => (
                    <div key={i} style={{ fontFamily: "monospace", fontSize: "12px", color: T.textMono, wordBreak: "break-all" }}>{a}</div>
                  ))
                  : <div style={{ fontSize: "12px", color: T.textSecondary }}>{t("nh.dnsprop.noRecords")}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.dnsprop.historyLabel", { domain: e.domain, type: e.type, status: e.status })} />
    </div>
  );
}

function WhoisTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [domain, setDomain] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("whois");

  const lookup = async () => {
    const d = cleanDomain(domain);
    if (!d) return;
    setLoading(true); setError(null); setData(null);
    try {
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://rdap.org/domain/${d}`)}`);
      const raw = await res.json();
      const json = JSON.parse(raw.contents);
      const getVal = (arr, key) => arr?.find(e => Array.isArray(e) ? e[0] === key : false)?.[1];
      const vcard = json.entities?.[0]?.vcardArray?.[1] || [];
      const events = json.events || [];
      const getDate = (type) => events.find(e => e.eventAction === type)?.eventDate;

      setData({
        domain: json.ldhName || d,
        status: json.status || [],
        registrar: json.entities?.find(e => e.roles?.includes("registrar"))?.vcardArray?.[1]?.find(v => v[0] === "fn")?.[3] || "—",
        created: getDate("registration"),
        updated: getDate("last changed"),
        expires: getDate("expiration"),
        nameservers: json.nameservers?.map(n => n.ldhName) || [],
        dnssec: json.secureDNS?.delegationSigned ? t("nh.whois.signed") : t("nh.whois.unsigned"),
      });
      save({ domain: json.ldhName || d, registrar: json.entities?.find(e => e.roles?.includes("registrar"))?.vcardArray?.[1]?.find(v => v[0] === "fn")?.[3] || "—", expires: getDate("expiration") });
    } catch {
      setError(t("nh.whois.error"));
    }
    setLoading(false);
  };

  const fmt = (d: string | null | undefined) => d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.whois.title")}</div>
        
        <div style={{ ...S.row, marginBottom: "16px" }}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.whois.placeholder")}
            value={domain} onChange={e => setDomain(e.target.value)}
            onKeyDown={e => e.key === "Enter" && lookup()} />
          <button style={S.btn(T.cyan)} onClick={lookup} disabled={loading || !domain.trim()}>
            {loading ? <span style={{ animation: "spin-slow 1s linear infinite", display: "inline-flex" }}><Icon name="repeat" size={14} /></span> : <Icon name="search" size={14} />}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
          <div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div>
        </div>
      )}

      {data && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={S.cardTitle}>{data.domain}</div>
          <div style={S.grid2}>
            {[[t("nh.whois.registrar"), data.registrar], [t("nh.whois.dnssec"), data.dnssec], [t("nh.whois.created"), fmt(data.created)], [t("nh.whois.updated"), fmt(data.updated)], [t("nh.whois.expires"), fmt(data.expires)]].map(([k, v]) => (
              <div key={k}>
                <div style={S.label}>{k}</div>
                <div style={S.monoValueSm}>{v}</div>
              </div>
            ))}
          </div>
          {data.status.length > 0 && (
            <div style={{ marginTop: "16px" }}>
              <div style={S.label}>{t("nh.whois.status")}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                {data.status.map(s => <span key={s} style={{ ...S.badge(T.green), fontSize: "10px" }}>{s}</span>)}
              </div>
            </div>
          )}
          {data.nameservers.length > 0 && (
            <div style={{ marginTop: "16px" }}>
              <div style={S.label}>{t("nh.whois.nameservers")}</div>
              {data.nameservers.map(ns => (
                <div key={ns} style={{ fontFamily: "monospace", fontSize: "12px", color: T.textMono, padding: "4px 0" }}>→ {ns}</div>
              ))}
            </div>
          )}
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => `${e.domain} — ${e.registrar}`} />
    </div>
  );
}

// ── Tab panels 7-12 ──

function SslTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [domain, setDomain] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("ssl");

  const check = async () => {
    const d = cleanDomain(domain);
    if (!d) return;
    setLoading(true); setError(null); setData(null);
    try {
      // Use crt.sh for certificate transparency logs
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://crt.sh/?q=${d}&output=json`)}`);
      const raw = await res.json();
      const certs = JSON.parse(raw.contents);
      if (!certs || certs.length === 0) throw new Error(t("nh.ssl.noCerts"));

      // Most recent cert
      const sorted = certs.sort((a, b) => new Date(b.not_before).getTime() - new Date(a.not_before).getTime());
      const latest = sorted[0];
      const notAfter = new Date(latest.not_after);
      const notBefore = new Date(latest.not_before);
      const now = new Date();
      const daysLeft = Math.floor((notAfter.getTime() - now.getTime()) / 86400000);
      const isValid = notAfter > now && notBefore <= now;

      setData({
        domain: d,
        issuer: latest.issuer_name?.replace(/^.*CN=/, "").split(",")[0] || "Unknown",
        subject: latest.common_name || d,
        notBefore: notBefore.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        notAfter: notAfter.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        daysLeft,
        isValid,
        totalCerts: certs.length,
      });
      save({ domain: d, daysLeft, issuer: latest.issuer_name?.replace(/^.*CN=/, "").split(",")[0] || "Unknown", valid: isValid });
    } catch (e) {
      setError(e.message || t("nh.ssl.error"));
    }
    setLoading(false);
  };

  const statusColor = data ? (data.daysLeft > 30 ? T.green : data.daysLeft > 7 ? T.yellow : T.red) : T.textSecondary;
  const statusLabel = data ? (data.isValid ? (data.daysLeft > 30 ? t("nh.ssl.statusValid") : data.daysLeft > 0 ? t("nh.ssl.statusExpiringSoon") : t("nh.ssl.statusExpired")) : t("nh.ssl.statusInvalid")) : "";

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.ssl.title")}</div>
        
        <div style={{ ...S.row, marginBottom: "16px" }}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.ssl.placeholder")}
            value={domain} onChange={e => setDomain(e.target.value)}
            onKeyDown={e => e.key === "Enter" && check()} />
          <button style={S.btn(T.cyan)} onClick={check} disabled={loading || !domain.trim()}>
            {loading ? <span style={{ animation: "spin-slow 1s linear infinite", display: "inline-flex" }}><Icon name="repeat" size={14} /></span> : <Icon name="lock" size={14} />}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
          <div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div>
        </div>
      )}

      {data && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={S.cardTitle}>{data.domain}</div>
            <span style={{ ...S.badge(statusColor), fontSize: "11px" }}>● {statusLabel}</span>
          </div>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "48px", fontWeight: 700, fontFamily: "monospace", color: statusColor, lineHeight: 1 }}>{data.daysLeft}</div>
            <div style={{ color: T.textSecondary, fontSize: "12px", marginTop: "4px" }}>{t("nh.ssl.daysRemaining")}</div>
          </div>
          <div style={S.grid2}>
            {[[t("nh.ssl.issuer"), data.issuer], [t("nh.ssl.subject"), data.subject], [t("nh.ssl.validFrom"), data.notBefore], [t("nh.ssl.expires"), data.notAfter], [t("nh.ssl.totalCerts"), data.totalCerts]].map(([k, v]) => (
              <div key={k}>
                <div style={S.label}>{k}</div>
                <div style={{ ...S.monoValueSm, wordBreak: "break-all" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "16px", height: "6px", background: T.border, borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ height: "100%", background: `linear-gradient(90deg, ${statusColor}99, ${statusColor})`, borderRadius: "4px", width: `${Math.min(Math.max(data.daysLeft / 365 * 100, 2), 100)}%`, transition: "width 0.6s ease" }} />
          </div>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => `${e.domain} — ${e.daysLeft}d left · ${e.valid ? t("nh.ssl.historyValid") : t("nh.ssl.historyInvalid")}`} />
    </div>
  );
}

function DomainAgeTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [domain, setDomain] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("domainAge");

  const check = async () => {
    const d = cleanDomain(domain);
    if (!d) return;
    setLoading(true); setError(null); setData(null);
    try {
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://rdap.org/domain/${d}`)}`);
      const raw = await res.json();
      const json = JSON.parse(raw.contents);
      const getDate = (type) => json.events?.find(e => e.eventAction === type)?.eventDate;
      const created = getDate("registration");
      if (!created) throw new Error(t("nh.domainAge.errorNoDate"));

      const createdDate = new Date(created);
      const now = new Date();
      const totalDays = Math.floor((now.getTime() - createdDate.getTime()) / 86400000);
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const days = totalDays % 30;

      // Age score 0-100
      const ageScore = Math.min(Math.floor(totalDays / 36.5), 100);
      const trustLabel = ageScore >= 80 ? [t("nh.domainAge.trustHigh"), T.green] : ageScore >= 50 ? [t("nh.domainAge.trustEstablished"), T.cyan] : ageScore >= 20 ? [t("nh.domainAge.trustModerate"), T.yellow] : [t("nh.domainAge.trustNew"), T.red];

      setData({
        domain: json.ldhName || d,
        created: createdDate.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
        years, months, days, totalDays, ageScore,
        trustLabel: trustLabel[0], trustColor: trustLabel[1],
        expires: getDate("expiration"),
        updated: getDate("last changed"),
      });
      save({ domain: json.ldhName || d, years, months, totalDays, trust: trustLabel[0] });
    } catch (e) {
      setError(e.message || t("nh.domainAge.error"));
    }
    setLoading(false);
  };

  const fmt = (d: string | null | undefined) => d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.domainAge.title")}</div>
        <div style={{ ...S.row, marginBottom: "16px" }}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.domainAge.placeholder")}
            value={domain} onChange={e => setDomain(e.target.value)}
            onKeyDown={e => e.key === "Enter" && check()} />
          <button style={S.btn(T.cyan)} onClick={check} disabled={loading || !domain.trim()}>
            {loading ? <span style={{ animation: "spin-slow 1s linear infinite", display: "inline-flex" }}><Icon name="repeat" size={14} /></span> : <Icon name="calendar" size={14} />}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
          <div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div>
        </div>
      )}

      {data && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={S.cardTitle}>{data.domain}</div>
            <span style={{ ...S.badge(data.trustColor), fontSize: "11px" }}>{data.trustLabel}</span>
          </div>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
              {[[t("nh.domainAge.years"), data.years], [t("nh.domainAge.months"), data.months], [t("nh.domainAge.days"), data.days]].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontSize: "36px", fontWeight: 700, fontFamily: "monospace", color: data.trustColor, lineHeight: 1 }}>{val}</div>
                  <div style={{ color: T.textSecondary, fontSize: "11px", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "11px", color: T.textSecondary }}>{t("nh.domainAge.trustScore")}</span>
              <span style={{ fontSize: "11px", color: data.trustColor, fontFamily: "monospace", fontWeight: 700 }}>{data.ageScore}/100</span>
            </div>
            <div style={{ height: "8px", background: T.border, borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", background: `linear-gradient(90deg, ${data.trustColor}80, ${data.trustColor})`, borderRadius: "4px", width: `${data.ageScore}%`, transition: "width 0.6s ease" }} />
            </div>
          </div>
          <div style={S.divider} />
          <div style={S.grid2}>
            {[[t("nh.domainAge.registered"), data.created], [t("nh.domainAge.expires"), fmt(data.expires)], [t("nh.domainAge.lastUpdated"), fmt(data.updated)], [t("nh.domainAge.totalDays"), data.totalDays.toLocaleString()]].map(([k, v]) => (
              <div key={k}>
                <div style={S.label}>{k}</div>
                <div style={S.monoValueSm}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => `${e.domain} — ${e.years}y ${e.months}m · ${e.trust}`} />
    </div>
  );
}

function PingTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [custom, setCustom] = useState("");
  const [results, setResults] = useState<any>({});
  const [running, setRunning] = useState(false);
  const [customResult, setCustomResult] = useState<any>(null);
  const [customRunning, setCustomRunning] = useState(false);
  const { entries, save, clear } = useNHHistory("ping");

  const pingOne = async (url: string) => {
    const samples = [];
    for (let i = 0; i < 5; i++) {
      try {
        const t0 = performance.now();
        await fetch(url + "?r=" + Math.random(), { mode: "no-cors", cache: "no-store" });
        samples.push(Math.round(performance.now() - t0));
      } catch { samples.push(null); }
      await new Promise(r => setTimeout(r, 120));
    }
    const valid = samples.filter(s => s !== null);
    if (!valid.length) return { status: "unreachable", min: null, max: null, avg: null };
    return { status: "ok", min: Math.min(...valid), max: Math.max(...valid), avg: Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) };
  };

  const pingQuality = (avg: number | null): [string, string] => {
    if (avg === null) return [T.textSecondary, "—"];
    if (avg < 50) return [T.green, t("nh.ping.qualityExcellent")];
    if (avg < 100) return [T.cyan, t("nh.ping.qualityGood")];
    if (avg < 200) return [T.yellow, t("nh.ping.qualityFair")];
    return [T.red, t("nh.ping.qualityPoor")];
  };

  const runAll = async () => {
    setRunning(true);
    setResults(Object.fromEntries(PING_TARGETS.map(pt => [pt.label, { status: "running" }])));
    await Promise.all(PING_TARGETS.map(async (target) => {
      const r = await pingOne(target.url);
      setResults(prev => ({ ...prev, [target.label]: r }));
    }));
    setRunning(false);
  };

  const runCustom = async () => {
    let url = custom.trim();
    if (!url) return;
    if (!url.startsWith("http")) url = "https://" + url;
    setCustomRunning(true); setCustomResult({ status: "running" });
    const r = await pingOne(url + "/favicon.ico");
    const result = { ...r, domain: cleanDomain(custom) };
    setCustomResult(result);
    if (result.status === "ok") save({ host: result.domain, avg: result.avg, min: result.min, max: result.max });
    setCustomRunning(false);
  };

  return (
    <div>
      <div style={S.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={S.cardTitle}>{t("nh.ping.pingPopular")}</div>
          <button style={S.btnSm(T.cyan)} onClick={runAll} disabled={running}>
            {running ? <span style={{ animation: "spin-slow 1s linear infinite", display: "inline-block" }}>↻</span> : t("nh.ping.pingAll")}
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {PING_TARGETS.map(({ label }) => {
            const r = results[label];
            const [qColor, qLabel] = pingQuality(r?.avg ?? null);
            return (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: "10px", background: T.bgSubtle, border: `1px solid ${T.border}` }}>
                <span style={{ fontWeight: 600, fontSize: "14px" }}>{label}</span>
                {!r && <span style={{ color: T.textSecondary, fontSize: "12px" }}>{t("nh.ping.notTested")}</span>}
                {r?.status === "running" && <span style={{ color: T.cyan, fontSize: "12px", animation: "blink 1s infinite" }}>{t("nh.ping.pinging")}</span>}
                {r?.status === "unreachable" && <span style={{ color: T.red, fontSize: "12px" }}>{t("nh.ping.unreachable")}</span>}
                {r?.status === "ok" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: 700, color: qColor }}>{r.avg}<span style={{ fontSize: "11px", color: T.textSecondary }}> ms</span></div>
                      <div style={{ fontSize: "10px", color: T.textSecondary }}>{t("nh.ping.minMax", { min: r.min, max: r.max })}</div>
                    </div>
                    <span style={{ background: qColor + "18", border: `1px solid ${qColor}40`, color: qColor, fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px" }}>{qLabel}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.ping.pingCustomHost")}</div>
        <div style={{ ...S.row, marginBottom: "12px" }}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.ping.placeholder")} value={custom} onChange={e => setCustom(e.target.value)} onKeyDown={e => e.key === "Enter" && runCustom()} />
          <button style={S.btn(T.orange)} onClick={runCustom} disabled={customRunning || !custom.trim()}>{customRunning ? "..." : t("nh.ping.pingBtn")}</button>
        </div>
        {customResult && customResult.status !== "running" && (
          <div style={{ padding: "14px", borderRadius: "10px", background: T.bgSubtle, border: `1px solid ${T.border}`, animation: "slide-in 0.3s ease" }}>
            {customResult.status === "unreachable"
              ? <span style={{ color: T.red, fontSize: "13px" }}>{t("nh.ping.hostUnreachable")}</span>
              : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "13px", color: T.textSecondary }}>{customResult.domain}</span>
                  <div style={{ display: "flex", gap: "16px" }}>
                    {[[t("nh.ping.avg"), customResult.avg], [t("nh.ping.min"), customResult.min], [t("nh.ping.max"), customResult.max]].map(([k, v]) => (
                      <div key={k} style={{ textAlign: "center" }}>
                        <div style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: 700, color: T.cyan }}>{v}<span style={{ fontSize: "10px" }}> ms</span></div>
                        <div style={{ fontSize: "10px", color: T.textSecondary }}>{k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
        <div style={{ marginTop: "12px", fontSize: "11px", color: T.textSecondary }}>{t("nh.ping.note")}</div>
      </div>
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.ping.historyLabel", { host: e.host, avg: e.avg, min: e.min, max: e.max })} />
    </div>
  );
}

function PortScannerTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [domain, setDomain] = useState("");
  const [scanning, setScanning] = useState(false);
  const [portResults, setPortResults] = useState<any>({});
  const [progress, setProgress] = useState(0);
  const [customPort, setCustomPort] = useState("");
  const [customResult, setCustomResult] = useState<any>(null);
  const { entries, save, clear } = useNHHistory("ports");

  const statusLabel = (s: string) => {
    if (s === "open") return t("nh.ports.statusOpen");
    if (s === "closed") return t("nh.ports.statusClosed");
    if (s === "filtered") return t("nh.ports.statusFiltered");
    return t("nh.ports.statusScanning");
  };

  const probePort = async (host: string, port: number) => {
    const schemes = port === 443 || port === 8443 ? ["https"] : port === 80 || port === 8080 ? ["http"] : ["https", "http"];
    for (const scheme of schemes) {
      const t0 = performance.now();
      try {
        await fetch(`${scheme}://${host}:${port}/`, { mode: "no-cors", cache: "no-store", signal: AbortSignal.timeout(2500) });
        return { status: "open", latency: Math.round(performance.now() - t0) };
      } catch (e) {
        if (e.name === "AbortError") return { status: "filtered" };
        return { status: "open", latency: Math.round(performance.now() - t0) };
      }
    }
    return { status: "closed" };
  };

  const scan = async () => {
    const host = cleanDomain(domain);
    if (!host) return;
    setScanning(true); setPortResults({}); setProgress(0);
    const total = COMMON_PORTS.length;
    let done = 0;
    const results: Record<number, { status: string; latency?: number; service?: string }> = {};
    for (let i = 0; i < total; i += 5) {
      const batch = COMMON_PORTS.slice(i, i + 5);
      await Promise.all(batch.map(async ({ port, service }) => {
        const r = await probePort(host, port);
        results[port] = { ...r, service };
        setPortResults(prev => ({ ...prev, [port]: { ...r, service } }));
        done++;
        setProgress(Math.round((done / total) * 100));
      }));
    }
    const openPorts = Object.entries(results).filter(([,r]) => r.status === "open").map(([p,r]) => `${p}/${r.service}`);
    save({ host: cleanDomain(domain), open: openPorts.length, ports: openPorts.join(", ") || t("nh.ports.none") });
    setScanning(false);
  };

  const scanCustom = async () => {
    const port = parseInt(customPort);
    if (!port || !domain.trim()) return;
    const host = cleanDomain(domain);
    setCustomResult({ status: "scanning", port });
    const r = await probePort(host, port);
    setCustomResult({ ...r, port });
  };

  const statusColor = (s) => s === "open" ? T.green : s === "filtered" ? T.yellow : T.textSecondary;
  const openCount = (Object.values(portResults) as { status: string }[]).filter(r => r.status === "open").length;

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.ports.title")}</div>
        <div style={{ ...S.row, marginBottom: "16px" }}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.ports.placeholder")} value={domain} onChange={e => setDomain(e.target.value)} onKeyDown={e => e.key === "Enter" && scan()} />
          <button style={S.btn(T.cyan)} onClick={scan} disabled={scanning || !domain.trim()}>
            {scanning ? <><span style={{ animation: "spin-slow 1s linear infinite", display: "inline-block" }}>↻</span> {t("nh.ports.scanning")}</> : t("nh.ports.scanBtn")}
          </button>
        </div>
        {scanning && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: T.textSecondary }}>{t("nh.ports.scanningPorts", { n: COMMON_PORTS.length })}</span>
              <span style={{ fontSize: "12px", color: T.cyan, fontFamily: "monospace" }}>{progress}%</span>
            </div>
            <div style={{ height: "6px", background: T.border, borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", background: `linear-gradient(90deg, ${T.cyan}, ${T.cyanDim})`, borderRadius: "4px", width: `${progress}%`, transition: "width 0.2s ease" }} />
            </div>
          </div>
        )}
        {Object.keys(portResults).length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", color: T.textSecondary }}>{t("nh.ports.portsScanned", { n: COMMON_PORTS.length })}</span>
              <span style={{ background: (openCount > 0 ? T.green : T.textSecondary) + "18", border: `1px solid ${(openCount > 0 ? T.green : T.textSecondary)}40`, color: openCount > 0 ? T.green : T.textSecondary, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>{t("nh.ports.openCount", { n: openCount })}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "8px" }}>
              {COMMON_PORTS.map(({ port }) => {
                const r = portResults[port];
                if (!r) return null;
                const color = statusColor(r.status);
                return (
                  <div key={port} style={{ padding: "10px 12px", borderRadius: "8px", background: r.status === "open" ? `${T.green}0C` : T.bgSubtle, border: `1px solid ${r.status === "open" ? T.green + "40" : T.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "13px", color }}>{port}</span>
                      <span style={{ fontSize: "10px", color: T.textSecondary }}>{r.service}</span>
                    </div>
                    <div style={{ fontSize: "10px", color, marginTop: "4px", textTransform: "uppercase", fontWeight: 600 }}>
                      {statusLabel(r.status)}{r.latency ? ` · ${r.latency}ms` : ""}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.ports.checkSpecific")}</div>
        <div style={{ ...S.row, marginBottom: "12px" }}>
          <input style={{ ...S.input, flex: 2 }} placeholder={t("nh.ports.hostPlaceholder")} value={domain} onChange={e => setDomain(e.target.value)} />
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.ports.portPlaceholder")} type="number" value={customPort} onChange={e => setCustomPort(e.target.value)} onKeyDown={e => e.key === "Enter" && scanCustom()} />
          <button style={S.btn(T.orange)} onClick={scanCustom} disabled={!domain.trim() || !customPort}>{t("nh.ports.goBtn")}</button>
        </div>
        {customResult && customResult.status !== "scanning" && (
          <div style={{ padding: "12px", borderRadius: "8px", background: T.bgSubtle, border: `1px solid ${T.border}`, animation: "slide-in 0.3s ease" }}>
            <span style={{ fontFamily: "monospace", fontSize: "13px", color: statusColor(customResult.status) }}>
              {t("nh.ports.portResult", { port: customResult.port, status: statusLabel(customResult.status).toUpperCase() })}{customResult.latency ? ` (${customResult.latency}ms)` : ""}
            </span>
          </div>
        )}
        <div style={{ marginTop: "12px", fontSize: "11px", color: T.textSecondary }}>{t("nh.ports.note")}</div>
      </div>
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.ports.historyLabel", { host: e.host, open: e.open, plural: e.open !== 1 ? "s" : "", ports: e.ports })} />
    </div>
  );
}

function HttpHeadersTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("headers");

  const check = async () => {
    let target = url.trim();
    if (!target.startsWith("http")) target = "https://" + target;
    setLoading(true); setError(null); setData(null);
    try {
      const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`, { cache: "no-store" });
      const headers = {};
      res.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });
      const d = { domain: cleanDomain(url), status: res.status, headers };
      setData(d);
      const score = ["strict-transport-security","content-security-policy","x-frame-options","x-content-type-options","referrer-policy","permissions-policy"].filter(h => headers[h]).length;
      save({ url: cleanDomain(url), status: res.status, secScore: score });
    } catch {
      setError(t("nh.headers.error"));
    }
    setLoading(false);
  };

  const SECURITY_HEADERS = ["strict-transport-security", "content-security-policy", "x-frame-options", "x-content-type-options", "referrer-policy", "permissions-policy"];
  const secScore = data ? SECURITY_HEADERS.filter(h => data.headers[h]).length : 0;
  const scoreColor = secScore >= 5 ? T.green : secScore >= 3 ? T.cyan : secScore >= 1 ? T.yellow : T.red;

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.headers.title")}</div>
        <div style={{ ...S.row, marginBottom: "16px" }}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.headers.placeholder")} value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && check()} />
          <button style={S.btn(T.cyan)} onClick={check} disabled={loading || !url.trim()}>
            {loading ? <span style={{ animation: "spin-slow 1s linear infinite", display: "inline-flex" }}><Icon name="repeat" size={14} /></span> : <Icon name="mail" size={14} />}
          </button>
        </div>
      </div>
      {error && <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}><div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div></div>}
      {data && (
        <>
          <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={S.cardTitle}>{t("nh.headers.securityHeadersFor", { domain: data.domain })}</div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "monospace", fontSize: "20px", fontWeight: 700, color: scoreColor }}>{secScore}/{SECURITY_HEADERS.length}</div>
                <div style={{ fontSize: "10px", color: T.textSecondary }}>{t("nh.headers.present")}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {SECURITY_HEADERS.map(h => {
                const present = !!data.headers[h];
                return (
                  <div key={h} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 14px", borderRadius: "8px", background: present ? `${T.green}08` : `${T.red}06`, border: `1px solid ${present ? T.green + "30" : T.red + "20"}` }}>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: "12px", color: present ? T.green : T.textSecondary }}>{h}</div>
                      {present && <div style={{ fontSize: "11px", color: T.textSecondary, marginTop: "2px", wordBreak: "break-all" }}>{data.headers[h]}</div>}
                    </div>
                    <span style={{ background: (present ? T.green : T.red) + "18", border: `1px solid ${(present ? T.green : T.red)}40`, color: present ? T.green : T.red, fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px", marginLeft: "12px", flexShrink: 0 }}>{present ? <IconCheck size={11} /> : <IconX size={11} />}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {Object.keys(data.headers).length > 0 && (
            <div style={{ ...S.card, animation: "slide-in 0.4s ease" }}>
              <div style={S.cardTitle}>{t("nh.headers.allHeaders")}</div>
              {Object.entries(data.headers as Record<string, string>).map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: "12px", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: T.cyan, minWidth: "200px", flexShrink: 0 }}>{k}</span>
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: T.textSecondary, wordBreak: "break-all" }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.headers.historyLabel", { url: e.url, score: e.secScore, status: e.status })} />
    </div>
  );
}

// ── Email Security (SPF / DKIM / DMARC) ──

const DKIM_SELECTORS = ["google", "selector1", "selector2", "default", "k1", "dkim", "mail", "smtp", "s1", "s2", "zoho", "mandrill"];
const cleanTxt = (raw: string) => raw.replace(/^"+|"+$/g, "");

async function dohTxt(name: string): Promise<string[]> {
  const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=TXT`);
  const j = await res.json();
  return (j.Answer || []).map((a: any) => cleanTxt(a.data));
}

function EmailSecurityTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t, lang } = useTrans();
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("emailsec");

  const check = async () => {
    const d = cleanDomain(domain);
    if (!d) return;
    setLoading(true); setError(null); setResult(null);
    try {
      setProgress(t("nh.emailsec.checkingSpf"));
      const [spfTxt, dmarcTxt] = await Promise.all([dohTxt(d), dohTxt(`_dmarc.${d}`)]);
      const spf = spfTxt.find(r => r.toLowerCase().startsWith("v=spf1")) || null;
      const dmarc = dmarcTxt.find(r => r.toLowerCase().startsWith("v=dmarc1")) || null;
      const dmarcPolicy = dmarc ? (dmarc.match(/p=([a-zA-Z]+)/i)?.[1]?.toLowerCase() || null) : null;

      setProgress(t("nh.emailsec.checkingDkim"));
      let dkim: { selector: string; record: string } | null = null;
      for (const sel of DKIM_SELECTORS) {
        const rows = await dohTxt(`${sel}._domainkey.${d}`);
        const hit = rows.find(r => /v=dkim1|p=/i.test(r));
        if (hit) { dkim = { selector: sel, record: hit }; break; }
      }

      const score = (spf ? 1 : 0) + (dmarc ? 1 : 0) + (dkim ? 1 : 0);
      const r = { domain: d, spf, dmarc, dmarcPolicy, dkim, score };
      setResult(r);
      save({ domain: d, score });
    } catch {
      setError(t("nh.emailsec.error"));
    }
    setLoading(false); setProgress("");
  };

  const policyColor = dmarcPolicy => dmarcPolicy === "reject" ? T.green : dmarcPolicy === "quarantine" ? T.yellow : T.orange;

  const ROWS = result ? [
    { label: "SPF", found: !!result.spf, record: result.spf, extra: null,
      why: t("nh.emailsec.spfWhy") },
    { label: "DKIM", found: !!result.dkim, record: result.dkim?.record, extra: result.dkim ? `selector: ${result.dkim.selector}` : null,
      why: t("nh.emailsec.dkimWhy") },
    { label: "DMARC", found: !!result.dmarc, record: result.dmarc,
      extra: result.dmarcPolicy ? <span style={{ ...S.badge(policyColor(result.dmarcPolicy)), marginLeft: 8 }}>p={result.dmarcPolicy}</span> : null,
      why: t("nh.emailsec.dmarcWhy") },
  ] : [];

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.emailsec.title")}</div>
        <div style={S.row}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.emailsec.placeholder")}
            value={domain} onChange={e => setDomain(e.target.value)}
            onKeyDown={e => e.key === "Enter" && check()} />
          <button style={S.btn(T.cyan)} onClick={check} disabled={loading || !domain.trim()}>
            {loading ? <><span style={{ animation: "spin-slow 1s linear infinite", display: "inline-block" }}>↻</span> {progress || t("nh.emailsec.checking")}</> : t("nh.emailsec.checkBtn")}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
          <div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div>
        </div>
      )}

      {result && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={S.cardTitle}>{t("nh.emailsec.resultsFor", { domain: result.domain })}</div>
            <div style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: 700, color: result.score === 3 ? T.green : result.score >= 1 ? T.yellow : T.red }}>{result.score}/3</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {ROWS.map(row => (
              <div key={row.label} style={{ padding: "12px 14px", borderRadius: "10px", background: row.found ? `${T.green}08` : `${T.red}06`, border: `1px solid ${row.found ? T.green + "30" : T.red + "20"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, fontSize: "12px", color: row.found ? T.green : T.textPrimary, display: "flex", alignItems: "center" }}>
                    {row.label} {row.extra}
                  </span>
                  {row.found ? <IconCheck size={14} color={T.green} /> : <IconX size={14} color={T.red} />}
                </div>
                {row.record
                  ? <div style={{ fontFamily: "monospace", fontSize: "11px", color: T.textSecondary, wordBreak: "break-all" }}>{row.record}</div>
                  : <div style={{ fontSize: "11px", color: T.textSecondary }}>{row.why}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.emailsec.historyLabel", { domain: e.domain, score: e.score })} />
    </div>
  );
}

// ── Security Headers (letter-graded) ──

const SEC_HEADERS_INFO = [
  { key: "strict-transport-security", weight: 15, why: { en: "Forces browsers to only connect over HTTPS, blocking downgrade attacks.", fr: "Force les navigateurs à se connecter uniquement en HTTPS, bloquant les attaques de rétrogradation." } },
  { key: "content-security-policy", weight: 20, why: { en: "Restricts which scripts and resources can run — the strongest defense against XSS.", fr: "Restreint les scripts et ressources autorisés — la meilleure défense contre le XSS." } },
  { key: "x-frame-options", weight: 10, why: { en: "Prevents the page from being embedded in a hidden iframe (clickjacking).", fr: "Empêche la page d'être intégrée dans un iframe caché (clickjacking)." } },
  { key: "x-content-type-options", weight: 10, why: { en: "Stops the browser from guessing file types, blocking MIME-sniffing attacks.", fr: "Empêche le navigateur de deviner les types de fichiers, bloquant le MIME-sniffing." } },
  { key: "referrer-policy", weight: 10, why: { en: "Controls how much of your URL leaks to other sites via the Referer header.", fr: "Contrôle la fuite de votre URL vers d'autres sites via l'en-tête Referer." } },
  { key: "permissions-policy", weight: 10, why: { en: "Restricts which browser features (camera, mic, geolocation) the page can use.", fr: "Restreint les fonctionnalités du navigateur (caméra, micro, géoloc) que la page peut utiliser." } },
  { key: "x-xss-protection", weight: 5, why: { en: "Legacy XSS filter — superseded by CSP but still checked by many scanners.", fr: "Filtre XSS historique — remplacé par CSP mais encore vérifié par de nombreux scanners." } },
  { key: "cross-origin-opener-policy", weight: 7, why: { en: "Isolates your page's browsing context from cross-origin windows (Spectre defense).", fr: "Isole le contexte de navigation de votre page des fenêtres cross-origin (défense Spectre)." } },
  { key: "cross-origin-resource-policy", weight: 7, why: { en: "Blocks other sites from embedding your resources without permission.", fr: "Empêche d'autres sites d'intégrer vos ressources sans permission." } },
  { key: "cross-origin-embedder-policy", weight: 6, why: { en: "Required alongside COOP for full cross-origin isolation.", fr: "Requis avec COOP pour une isolation cross-origin complète." } },
];

function gradeFromScore(pct: number) {
  if (pct >= 90) return "A+"; if (pct >= 80) return "A"; if (pct >= 65) return "B";
  if (pct >= 50) return "C"; if (pct >= 30) return "D"; return "F";
}
function gradeColor(grade: string, T: Theme) {
  if (grade === "A+" || grade === "A") return T.green;
  if (grade === "B") return T.cyan;
  if (grade === "C") return T.yellow;
  if (grade === "D") return T.orange;
  return T.red;
}

function SecurityHeadersTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t, lang } = useTrans();
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("secheaders");

  const check = async () => {
    let target = url.trim();
    if (!target.startsWith("http")) target = "https://" + target;
    setLoading(true); setError(null); setData(null);
    try {
      const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`, { cache: "no-store" });
      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });
      const pct = SEC_HEADERS_INFO.reduce((sum, h) => sum + (headers[h.key] ? h.weight : 0), 0);
      const grade = gradeFromScore(pct);
      const d = { domain: cleanDomain(url), headers, pct, grade };
      setData(d);
      save({ url: d.domain, grade, pct });
    } catch {
      setError(t("nh.secheaders.error"));
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.secheaders.title")}</div>
        <div style={S.row}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.secheaders.placeholder")}
            value={url} onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === "Enter" && check()} />
          <button style={S.btn(T.cyan)} onClick={check} disabled={loading || !url.trim()}>
            {loading ? <><span style={{ animation: "spin-slow 1s linear infinite", display: "inline-block" }}>↻</span> {t("nh.secheaders.checking")}</> : t("nh.secheaders.checkBtn")}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
          <div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div>
        </div>
      )}

      {data && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <div style={S.cardTitle}>{data.domain}</div>
              <div style={{ fontSize: "11px", color: T.textSecondary, marginTop: "2px" }}>{t("nh.secheaders.scoreLabel", { pct: data.pct })}</div>
            </div>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              border: `2px solid ${gradeColor(data.grade, T)}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "monospace", fontSize: "22px", fontWeight: 700, color: gradeColor(data.grade, T), flexShrink: 0,
            }}>{data.grade}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {SEC_HEADERS_INFO.map(h => {
              const present = !!data.headers[h.key];
              return (
                <div key={h.key} style={{ padding: "10px 14px", borderRadius: "8px", background: present ? `${T.green}08` : `${T.red}06`, border: `1px solid ${present ? T.green + "30" : T.red + "20"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "12px", color: present ? T.green : T.textPrimary }}>{h.key}</span>
                    {present ? <IconCheck size={13} color={T.green} /> : <IconX size={13} color={T.red} />}
                  </div>
                  {present
                    ? <div style={{ fontSize: "11px", color: T.textSecondary, marginTop: "3px", wordBreak: "break-all" }}>{data.headers[h.key]}</div>
                    : <div style={{ fontSize: "11px", color: T.textSecondary, marginTop: "3px" }}>{lang === "fr" ? h.why.fr : h.why.en}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.secheaders.historyLabel", { url: e.url, grade: e.grade })} />
    </div>
  );
}

// ── Blacklist Check (DNSBL) ──

const DNSBL_ZONES = [
  { zone: "zen.spamhaus.org", label: "Spamhaus ZEN" },
  { zone: "b.barracudacentral.org", label: "Barracuda" },
  { zone: "bl.spamcop.net", label: "SpamCop" },
  { zone: "dnsbl.sorbs.net", label: "SORBS" },
  { zone: "psbl.surriel.com", label: "PSBL" },
];
const reverseIp = (ip: string) => ip.split(".").reverse().join(".");

async function dohA(name: string): Promise<any[]> {
  const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=A`);
  const j = await res.json();
  return j.Answer || [];
}

function BlacklistTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("blacklist");

  const check = async () => {
    const raw = input.trim();
    if (!raw) return;
    setLoading(true); setError(null); setResult(null);
    try {
      let ip = raw;
      if (!IPV4_RE.test(raw)) {
        const ans = await dohA(cleanDomain(raw));
        if (!ans.length) throw new Error();
        ip = ans[0].data;
      }
      const rev = reverseIp(ip);
      const zoneResults = await Promise.all(DNSBL_ZONES.map(async z => {
        try {
          const ans = await dohA(`${rev}.${z.zone}`);
          return { ...z, listed: ans.length > 0 };
        } catch {
          return { ...z, listed: false };
        }
      }));
      const listedCount = zoneResults.filter(z => z.listed).length;
      setResult({ ip, zoneResults, listedCount });
      save({ ip, listedCount });
    } catch {
      setError(t("nh.blacklist.error"));
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.blacklist.title")}</div>
        <div style={S.row}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.blacklist.placeholder")}
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && check()} />
          <button style={S.btn(T.cyan)} onClick={check} disabled={loading || !input.trim()}>
            {loading ? <><span style={{ animation: "spin-slow 1s linear infinite", display: "inline-block" }}>↻</span> {t("nh.blacklist.checking")}</> : t("nh.blacklist.checkBtn")}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
          <div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div>
        </div>
      )}

      {result && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={S.cardTitle}>{t("nh.blacklist.resultsFor", { ip: result.ip })}</div>
            <span style={S.badge(result.listedCount === 0 ? T.green : T.red)}>
              {result.listedCount === 0 ? t("nh.blacklist.clean") : t("nh.blacklist.listedOn", { n: result.listedCount })}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {result.zoneResults.map(z => (
              <div key={z.zone} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: "8px", background: z.listed ? `${T.red}08` : `${T.green}06`, border: `1px solid ${z.listed ? T.red + "30" : T.green + "20"}` }}>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: T.textPrimary }}>{z.label}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "10px", color: T.textSecondary }}>{z.zone}</div>
                </div>
                {z.listed ? <IconX size={14} color={T.red} /> : <IconCheck size={14} color={T.green} />}
              </div>
            ))}
          </div>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.blacklist.historyLabel", { ip: e.ip, n: e.listedCount })} />
    </div>
  );
}

// ── IP Converter (dotted / hex / decimal / binary) ──
// Kajy local tanteraka (tsy misy API), mampiasa ny ipStrToInt/intToIpStr
// efa nomanina ho an'ny Subnet Calculator.

function parseIpInput(raw: string): number | null {
  const s = raw.trim();
  if (!s) return null;
  if (IPV4_RE.test(s)) return ipStrToInt(s);
  if (/^0x[0-9a-fA-F]{1,8}$/.test(s)) return parseInt(s, 16) >>> 0;
  const cleanBin = s.replace(/\s+/g, "");
  if (/^[01]{8,32}$/.test(cleanBin)) return parseInt(cleanBin.padStart(32, "0"), 2) >>> 0;
  if (/^\d{1,10}$/.test(s)) {
    const v = Number(s);
    if (v >= 0 && v <= 4294967295) return v >>> 0;
  }
  if (/^[0-9a-fA-F]{1,8}$/.test(s) && /[a-fA-F]/.test(s)) return parseInt(s, 16) >>> 0;
  return null;
}

function IpConverterTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { entries, save, clear } = useNHHistory("ipconv");

  const convert = () => {
    const n = parseIpInput(input);
    if (n === null) { setError(t("nh.ipconv.error")); setResult(null); return; }
    setError(null);
    const dotted = intToIpStr(n);
    const hex = "0x" + n.toString(16).toUpperCase().padStart(8, "0");
    const decimal = String(n >>> 0);
    const binaryFlat = n.toString(2).padStart(32, "0");
    const binaryOctets = binaryFlat.match(/.{8}/g)!.join(".");
    const r = { dotted, hex, decimal, binaryOctets };
    setResult(r);
    save({ input: input.trim(), dotted });
  };

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.ipconv.title")}</div>
        <div style={S.row}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.ipconv.placeholder")}
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && convert()} />
          <button style={S.btn(T.cyan)} onClick={convert} disabled={!input.trim()}>{t("nh.ipconv.convertBtn")}</button>
        </div>
      </div>

      {error && (
        <div style={{ ...S.card, border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
          <div style={{ color: T.red, fontSize: "13px", display: "flex", alignItems: "center", gap: 6 }}><IconAlertTriangle size={13} /> {error}</div>
        </div>
      )}

      {result && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={S.cardTitle}>{result.dotted}</div>
          <div style={S.grid2}>
            {[
              [t("nh.ipconv.decimal"), result.dotted],
              [t("nh.ipconv.hex"), result.hex],
              [t("nh.ipconv.decInt"), result.decimal],
              [t("nh.ipconv.binary"), result.binaryOctets],
            ].map(([k, v]) => (
              <div key={k as string}>
                <div style={S.label}>{k}</div>
                <div style={S.monoValueSm}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.ipconv.historyLabel", { input: e.input, dotted: e.dotted })} />
    </div>
  );
}

// ── Continuous Ping ──
// Fanamarihana: tsy misy raw ICMP azo antsika avy amin'ny browser, ka
// ity dia mampiasa ilay teknika fetch-timing efa ampiasain'ny Ping Test
// (favicon.ico, mode "no-cors") fa averina isaky ny segondra iray, ary
// mitahiry ny valiny 60 farany ho tahiry mivelona (sparkline + stats).
// Tsy MTR marina (tsy misy fizarana isaky ny "hop") satria tsy azo
// atao avy amin'ny browser ny traceroute ICMP marina.

const CONTPING_MAX_SAMPLES = 60;

async function pingSample(url: string): Promise<number | null> {
  try {
    const t0 = performance.now();
    await fetch(url + "?r=" + Math.random(), { mode: "no-cors", cache: "no-store" });
    return Math.round(performance.now() - t0);
  } catch {
    return null;
  }
}

function ContinuousPingTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [host, setHost] = useState("");
  const [running, setRunning] = useState(false);
  const [samples, setSamples] = useState<(number | null)[]>([]);
  const intervalRef = useRef<any>(null);
  const urlRef = useRef("");
  const samplesRef = useRef<(number | null)[]>([]);
  const { entries, save, clear } = useNHHistory("contping");

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const tick = async () => {
    const s = await pingSample(urlRef.current);
    setSamples(prev => {
      const next = [...prev, s].slice(-CONTPING_MAX_SAMPLES);
      samplesRef.current = next;
      return next;
    });
  };

  const start = () => {
    let url = host.trim();
    if (!url) return;
    if (!url.startsWith("http")) url = "https://" + url;
    urlRef.current = url + "/favicon.ico";
    setSamples([]);
    samplesRef.current = [];
    setRunning(true);
    tick();
    intervalRef.current = setInterval(tick, 1000);
  };

  const stop = () => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setRunning(false);
    const finalSamples = samplesRef.current;
    const valid = finalSamples.filter(s => s !== null) as number[];
    if (valid.length) {
      const avg = Math.round(valid.reduce((a, b) => a + b, 0) / valid.length);
      const loss = Math.round(((finalSamples.length - valid.length) / finalSamples.length) * 100);
      save({ host: cleanDomain(host), avg, loss, count: finalSamples.length });
    }
  };

  const valid = samples.filter(s => s !== null) as number[];
  const min = valid.length ? Math.min(...valid) : null;
  const max = valid.length ? Math.max(...valid) : null;
  const avg = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : null;
  const current = samples.length ? samples[samples.length - 1] : null;
  const loss = samples.length ? Math.round(((samples.length - valid.length) / samples.length) * 100) : 0;

  const quality = (v: number | null): [string, string] => {
    if (v === null) return [T.textSecondary, "—"];
    if (v < 50) return [T.green, t("nh.ping.qualityExcellent")];
    if (v < 100) return [T.cyan, t("nh.ping.qualityGood")];
    if (v < 200) return [T.yellow, t("nh.ping.qualityFair")];
    return [T.red, t("nh.ping.qualityPoor")];
  };
  const [qColor, qLabel] = quality(avg);

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.contping.title")}</div>
        <div style={S.row}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.contping.placeholder")}
            value={host} onChange={e => setHost(e.target.value)} disabled={running}
            onKeyDown={e => e.key === "Enter" && !running && start()} />
          {!running
            ? <button style={S.btn(T.green)} onClick={start} disabled={!host.trim()}>▶ {t("nh.contping.startBtn")}</button>
            : <button style={S.btn(T.red)} onClick={stop}>■ {t("nh.contping.stopBtn")}</button>}
        </div>
      </div>

      {samples.length > 0 && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={{ display: "flex", gap: "18px", marginBottom: "18px", flexWrap: "wrap", alignItems: "center" }}>
            {[
              [t("nh.contping.current"), current],
              [t("nh.contping.min"), min],
              [t("nh.contping.avg"), avg],
              [t("nh.contping.max"), max],
            ].map(([label, val]) => (
              <div key={label as string}>
                <div style={S.label}>{label}</div>
                <div style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: 700, color: val === null ? T.textSecondary : qColor }}>
                  {val === null ? "—" : `${val} ms`}
                </div>
              </div>
            ))}
            <div>
              <div style={S.label}>{t("nh.contping.packetLoss")}</div>
              <div style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: 700, color: loss === 0 ? T.green : loss < 20 ? T.yellow : T.red }}>{loss}%</div>
            </div>
            {avg !== null && <span style={S.badge(qColor)}>{qLabel}</span>}
            {running && <span style={{ color: T.cyan, fontSize: "11px", animation: "blink 1s infinite" }}>● {t("nh.contping.running")}</span>}
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "48px" }}>
            {samples.map((s, i) => {
              const h = s === null ? 4 : Math.min(48, Math.max(4, (s / 300) * 48));
              const c = s === null ? T.red : s < 50 ? T.green : s < 100 ? T.cyan : s < 200 ? T.yellow : T.red;
              return <div key={i} style={{ width: "6px", height: `${h}px`, background: c, borderRadius: "2px", flexShrink: 0 }} title={s === null ? t("nh.contping.timeout") : `${s} ms`} />;
            })}
          </div>
          <div style={{ fontSize: "10px", color: T.textSecondary, marginTop: "8px" }}>{t("nh.contping.samplesCount", { n: samples.length })}</div>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.contping.historyLabel", { host: e.host, avg: e.avg, loss: e.loss })} />
    </div>
  );
}

function TracerouteTab() {
  const T = useNHTheme();
  const S = mkStyles(T);
  const { t } = useTrans();
  const [domain, setDomain] = useState("");
  const [hops, setHops] = useState([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const { entries, save, clear } = useNHHistory("traceroute");

  const trace = async () => {
    const d = cleanDomain(domain);
    if (!d) return;
    setRunning(true); setDone(false); setHops([]);
    const tld = d.split(".").pop();
    const steps = [
      { label: t("nh.traceroute.localDns"),                              url: `https://dns.google/resolve?name=localhost&type=A` },
      { label: t("nh.traceroute.rootDns"),                               url: `https://dns.google/resolve?name=com&type=NS` },
      { label: t("nh.traceroute.tldNameservers", { tld }),               url: `https://dns.google/resolve?name=${tld}&type=NS` },
      { label: t("nh.traceroute.authoritativeNs", { domain: d }),        url: `https://dns.google/resolve?name=${d}&type=NS` },
      { label: t("nh.traceroute.aRecordResolution"),                     url: `https://dns.google/resolve?name=${d}&type=A` },
      { label: t("nh.traceroute.finalHost", { domain: d }),              url: `https://${d}/favicon.ico` },
    ];
    for (let i = 0; i < steps.length; i++) {
      const { label, url } = steps[i];
      const t0 = performance.now();
      let ip = "—", latency = 0, status = "ok", extra = "";
      try {
        const isFinal = !url.includes("dns.google");
        const res = await fetch(url + (url.includes("?") ? "&r=" : "?r=") + Math.random(), {
          mode: isFinal ? "no-cors" : "cors", cache: "no-store", signal: AbortSignal.timeout(4000)
        });
        latency = Math.round(performance.now() - t0);
        if (!isFinal) {
          const json = await res.json().catch(() => ({}));
          const ans = json.Answer || json.Authority || [];
          ip = ans[0]?.data?.split(" ").pop() || ans[0]?.data || "—";
          extra = ans.length > 1 ? t("nh.traceroute.moreRecords", { n: ans.length - 1 }) : "";
        }
      } catch (e) {
        latency = Math.round(performance.now() - t0);
        status = latency > 3800 ? "timeout" : "ok";
      }
      setHops(prev => [...prev, { hop: i + 1, label, ip, latency, status, extra }]);
      await new Promise(r => setTimeout(r, 200));
    }
    setRunning(false); setDone(true);
    save({ domain: cleanDomain(domain), hops: steps.length, completed: true });
  };

  const hopColor = (ms: number) => ms < 80 ? T.green : ms < 200 ? T.cyan : ms < 400 ? T.yellow : T.red;

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>{t("nh.traceroute.title")}</div>
        <div style={{ ...S.row, marginBottom: "16px" }}>
          <input style={{ ...S.input, flex: 1 }} placeholder={t("nh.traceroute.placeholder")} value={domain} onChange={e => setDomain(e.target.value)} onKeyDown={e => e.key === "Enter" && !running && trace()} />
          <button style={S.btn(T.cyan)} onClick={trace} disabled={running || !domain.trim()}>
            {running
              ? <><span style={{ animation: "spin-slow 1s linear infinite", display: "inline-block" }}>↻</span> {t("nh.traceroute.tracing")}</>
              : t("nh.traceroute.traceBtn")}
          </button>
        </div>
        <div style={{ fontSize: "11px", color: T.textSecondary }}>{t("nh.traceroute.note")}</div>
      </div>
      {hops.length > 0 && (
        <div style={{ ...S.card, animation: "slide-in 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={S.cardTitle}>{t("nh.traceroute.hopAnalysisFor", { domain: cleanDomain(domain) })}</div>
            {done && (
              <span style={{ background: T.green + "18", border: `1px solid ${T.green}40`, color: T.green, fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>
                {t("nh.traceroute.complete")}
              </span>
            )}
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "19px", top: "20px", bottom: "20px", width: "2px", background: `linear-gradient(${T.cyan}60, ${T.cyan}10)`, borderRadius: "2px" }} />
            {hops.map((hop, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px", position: "relative", animation: `slide-in 0.3s ease ${i * 0.08}s both` }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: hop.status === "timeout" ? `${T.red}20` : `${T.cyan}18`, border: `2px solid ${hop.status === "timeout" ? T.red + "60" : T.cyan + "60"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                  <span style={{ fontFamily: "monospace", fontSize: "12px", fontWeight: 700, color: hop.status === "timeout" ? T.red : T.cyan }}>{hop.hop}</span>
                </div>
                <div style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", background: T.bgSubtle, border: `1px solid ${T.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600 }}>{hop.label}</div>
                      {hop.ip !== "—" && (
                        <div style={{ fontFamily: "monospace", fontSize: "11px", color: T.textMono, marginTop: "2px" }}>
                          {hop.ip} {hop.extra && <span style={{ color: T.textSecondary }}>({hop.extra})</span>}
                        </div>
                      )}
                    </div>
                    <div>
                      {hop.status === "timeout"
                        ? <span style={{ background: T.red + "18", border: `1px solid ${T.red}40`, color: T.red, fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px" }}>{t("nh.traceroute.timeout")}</span>
                        : <div style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: 700, color: hopColor(hop.latency) }}>{hop.latency}<span style={{ fontSize: "10px", color: T.textSecondary }}> ms</span></div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <HistoryPanel entries={entries} onClear={clear}
        renderLabel={e => t("nh.traceroute.historyLabel", { domain: e.domain, hops: e.hops })} />
    </div>
  );
}

// ── Hub shell ──

// ── NetworkSeoContent — content lalindalina isaky ny tab (what/how/
// examples/faq), mitovy endrika amin'ny ToolSeoPage ao amin'ny
// SmartCalcHub.tsx, fa mampiasa ny NHTheme sy ny style local ──

function NHFaqItem({ q, a, T, last }: { q: string; a: string; T: Theme; last?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: last ? "none" : `1px solid ${T.border}` }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 12, padding: "14px 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: T.textPrimary }}>{q}</span>
        <span style={{ color: T.textSecondary, fontSize: 14, flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}>▾</span>
      </button>
      {open && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: T.textSecondary, lineHeight: 1.7, margin: "0 0 16px" }}>{a}</p>
      )}
    </div>
  );
}

function NetworkSeoContent({ toolId }: { toolId: string }) {
  const T = useNHTheme();
  const { t, lang } = useTrans();
  const content = NETWORK_SEO_CONTENT[toolId];
  if (!content) return null;

  const getText = (field: string) => (lang === "fr" && (content as any)[`fr${field.charAt(0).toUpperCase()}${field.slice(1)}`]) || (content as any)[field];
  const getFormula = () => (lang === "fr" && content.frFormula) ? content.frFormula : content.formula;
  const getExamples = () => (lang === "fr" && content.frExamples) ? content.frExamples : content.examples;
  const getFaq = () => (lang === "fr" && content.frFaq) ? content.frFaq : content.faq;

  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 22, color: T.textPrimary, marginBottom: 10, marginTop: 26, lineHeight: 1.3 }}>
      {children}
    </h2>
  );
  const P = ({ children }: { children: React.ReactNode }) => (
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: T.textSecondary, lineHeight: 1.75, margin: 0 }}>
      {children}
    </p>
  );

  return (
    <article style={{ marginTop: 26, padding: "26px 24px", background: `linear-gradient(${T.cardGradFrom}, ${T.bgCard})`, border: `1px solid ${T.border}`, borderRadius: 16 }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 27, color: T.textPrimary, marginBottom: 12, lineHeight: 1.2 }}>
        {getText("title")}
      </h1>

      <H2>{lang === "fr" ? "Qu'est-ce que c'est ?" : "What is it?"}</H2>
      <P>{getText("what")}</P>

      <H2>{lang === "fr" ? "Comment ça marche" : "How it works"}</H2>
      <P>{getText("how")}</P>

      {content.formula && (
        <>
          <H2>{lang === "fr" ? "Formule" : "Formula"}</H2>
          <div style={{ background: T.bgSubtle, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 18px", marginBottom: 8 }}>
            <code style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: T.cyan, display: "block", marginBottom: 6 }}>
              {getFormula()!.expr}
            </code>
            {getFormula()!.note && (
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: T.textSecondary }}>
                {getFormula()!.note}
              </span>
            )}
          </div>
        </>
      )}

      {getExamples()?.length > 0 && (
        <>
          <H2>{lang === "fr" ? "Exemples" : "Examples"}</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {getExamples().map((ex, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", background: T.bgSubtle, borderRadius: 9, border: `1px solid ${T.border}` }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: T.cyan, fontWeight: 700, flexShrink: 0, paddingTop: 2 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 12, color: T.textPrimary, display: "block", marginBottom: 2 }}>
                    {ex.label}
                  </span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: T.textSecondary }}>
                    <code style={{ fontFamily: "'JetBrains Mono',monospace", color: T.textSecondary, fontSize: 11 }}>{ex.input}</code>
                    <span style={{ margin: "0 6px", color: T.textSecondary }}>→</span>
                    <span style={{ color: T.green, fontWeight: 500 }}>{ex.result}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {getFaq()?.length > 0 && (
        <>
          <H2>{lang === "fr" ? "Questions fréquentes" : "Frequently asked questions"}</H2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {getFaq().map((item, i) => (
              <NHFaqItem key={i} q={item.q} a={item.a} T={T} last={i === getFaq().length - 1} />
            ))}
          </div>
        </>
      )}
    </article>
  );
}

// ── Responsive shell CSS — mitovy classname amin'ny PdfHub.tsx
// (chronos-shell / chronos-sidebar / chronos-main / ...) satria
// tsy miara-miorina ireo hub roa ireo (routing-based, iray ihany
// no miorina amin'ny pejy iray), ka tsy misy fifandonana CSS. ──
function buildResponsiveStyle(T: Theme) { return `
  .chronos-sidebar, .chronos-main, html, body {
    scrollbar-width: thin;
    scrollbar-color: ${T.border} transparent;
  }
  .chronos-sidebar::-webkit-scrollbar, .chronos-main::-webkit-scrollbar,
  html::-webkit-scrollbar, body::-webkit-scrollbar {
    width: 8px;
  }
  .chronos-sidebar::-webkit-scrollbar-track, .chronos-main::-webkit-scrollbar-track,
  html::-webkit-scrollbar-track, body::-webkit-scrollbar-track {
    background: transparent;
  }
  .chronos-sidebar::-webkit-scrollbar-thumb, .chronos-main::-webkit-scrollbar-thumb,
  html::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb {
    background: ${T.border};
    border-radius: 8px;
  }
  .chronos-sidebar::-webkit-scrollbar-thumb:hover, .chronos-main::-webkit-scrollbar-thumb:hover,
  html::-webkit-scrollbar-thumb:hover, body::-webkit-scrollbar-thumb:hover {
    background: ${T.muted2};
  }
  .nh-sidelink.rail-collapsed .nh-sidelink-label { display: none; }
  .chronos-sidebar-pin { opacity: 0; transition: opacity .15s; }
  .chronos-sidebar:hover .chronos-sidebar-pin, .chronos-sidebar-pin.pinned { opacity: 1; }
  .chronos-mobile-trigger { display: none; }

  @media (max-width: ${BP.tablet}px) {
    .chronos-shell {
      grid-template-columns: 1fr !important;
      height: auto !important;
      overflow: visible !important;
    }
    .chronos-sidebar-spacer { display: none !important; }
    .chronos-sidebar { display: none !important; }
    .chronos-mobile-trigger { display: flex !important; }
    .chronos-privacy-badge { display: none !important; }
    .chronos-main { width: 100% !important; padding: 16px 16px 40px !important; height: auto !important; overflow-y: visible !important; }
    .chronos-hero-title { font-size: 34px !important; }
    .chronos-hero-row { flex-wrap: wrap; gap: 10px; }
    .chronos-trust-badges { flex-wrap: wrap !important; gap: 16px !important; }
    .chronos-howitworks-row { grid-template-columns: 1fr !important; }
    .chronos-related-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: ${BP.mobile}px) {
    .chronos-related-grid { grid-template-columns: 1fr !important; }
    .chronos-hero-title { font-size: 28px !important; }
  }
` }

// ── Sidebar ──

function SideLink({ t: tabItem, active, lang, onSelect, collapsed }: {
  t: typeof TABS[0], active: boolean, lang: string, onSelect: (id: string) => void, collapsed?: boolean,
}) {
  const T = useNHTheme();
  return (
    <button
      onClick={() => onSelect(tabItem.id)}
      className={`nh-sidelink${collapsed ? " rail-collapsed" : ""}`}
      title={collapsed ? (lang === "fr" ? tabItem.fr : tabItem.en) : (lang === "fr" ? tabItem.frDesc : tabItem.enDesc)}
      style={{
        height: 42, width: "100%",
        display: "flex", alignItems: "center", gap: collapsed ? 0 : 10,
        justifyContent: collapsed ? "center" : "flex-start",
        padding: collapsed ? 0 : "0 12px",
        color: active ? T.cyan : T.textPrimary,
        textDecoration: "none",
        borderRadius: 8, fontSize: 13,
        background: active ? `${T.cyan}18` : "transparent",
        border: "none",
        borderLeft: active ? `2px solid ${T.cyan}` : "2px solid transparent",
        cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
        textAlign: "left",
        transition: "all .15s",
      }}>
      <Icon name={tabItem.icon} size={15} />
      <span className="nh-sidelink-label">{lang === "fr" ? tabItem.fr : tabItem.en}</span>
    </button>
  );
}

function SideGroup({ label, tabs, activeTab, lang, onSelect, collapsed }: {
  label: string, tabs: typeof TABS, activeTab: string, lang: string, onSelect: (id: string) => void, collapsed?: boolean,
}) {
  const T = useNHTheme();
  return (
    <div style={{ marginTop: 24 }}>
      {!collapsed && (
        <div style={{ fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase", color: T.muted2, padding: "0 12px 8px" }}>
          {label}
        </div>
      )}
      {tabs.map(tb => (
        <SideLink key={tb.id} t={tb} active={activeTab === tb.id} lang={lang} onSelect={onSelect} collapsed={collapsed} />
      ))}
    </div>
  );
}

// ── How it works card — ho an'ny tools misy dingana maromaro
// (Subnet Calculator, DNS Propagation) ihany, tsy ny 15 rehetra ──

const HOW_IT_WORKS: Record<string, { steps: { en: string; fr: string; descEn: string; descFr: string }[]; tip: { en: string; fr: string } }> = {
  subnet: {
    steps: [
      { en: "Enter a CIDR address", fr: "Saisissez une adresse CIDR", descEn: "An IP + prefix, like 192.168.1.0/24", descFr: "Une IP + préfixe, comme 192.168.1.0/24" },
      { en: "Calculate", fr: "Calculez", descEn: "Get every subnet value instantly", descFr: "Obtenez toutes les valeurs instantanément" },
      { en: "Read the breakdown", fr: "Lisez le résultat", descEn: "Network, broadcast, usable range, and more", descFr: "Réseau, diffusion, plage utilisable, et plus" },
    ],
    tip: { en: "The number after the slash controls how many hosts fit — smaller number, bigger subnet.", fr: "Le chiffre après la barre contrôle le nombre d'hôtes — plus petit, plus grand est le sous-réseau." },
  },
  dnsprop: {
    steps: [
      { en: "Enter your domain", fr: "Saisissez votre domaine", descEn: "The domain whose DNS you just changed", descFr: "Le domaine dont vous venez de changer le DNS" },
      { en: "Pick a record type", fr: "Choisissez un type", descEn: "A, AAAA, CNAME, MX, TXT or NS", descFr: "A, AAAA, CNAME, MX, TXT ou NS" },
      { en: "Compare resolvers", fr: "Comparez les résolveurs", descEn: "See if Cloudflare, Google and Quad9 agree", descFr: "Voyez si Cloudflare, Google et Quad9 sont d'accord" },
    ],
    tip: { en: "If resolvers disagree, just wait — each cache expires on its own TTL countdown.", fr: "Si les résolveurs ne sont pas d'accord, patientez — chaque cache expire selon son propre TTL." },
  },
};

function HowItWorksCard({ toolId, lang }: { toolId: string; lang: string }) {
  const T = useNHTheme();
  const cfg = HOW_IT_WORKS[toolId];
  if (!cfg) return null;
  return (
    <div style={{
      border: `1px solid ${T.border}`, borderRadius: 14,
      background: `linear-gradient(${T.cardGradFrom}, ${T.bgCard})`, overflow: "hidden",
      height: "fit-content",
    }}>
      <div style={{
        padding: "12px 16px", borderBottom: `1px solid ${T.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: T.textPrimary }}>
          {lang === "fr" ? "Comment ça marche" : "How it works"}
        </span>
        <span style={{ fontSize: 10, color: T.textSecondary }}>{cfg.steps.length} {lang === "fr" ? "étapes" : "steps"}</span>
      </div>
      <div style={{ padding: "4px 16px 14px" }}>
        {cfg.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "11px 0" }}>
            <span style={{
              width: 23, height: 23, flexShrink: 0,
              border: `1px solid ${T.border}`, borderRadius: "50%",
              display: "grid", placeItems: "center",
              color: T.cyan, fontSize: 10,
            }}>{i + 1}</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.textPrimary }}>
                {lang === "fr" ? step.fr : step.en}
              </div>
              <div style={{ fontSize: 9, color: T.muted2, marginTop: 3 }}>
                {lang === "fr" ? step.descFr : step.descEn}
              </div>
            </div>
          </div>
        ))}
        {cfg.tip && (
          <div style={{
            padding: "10px 11px", border: `1px solid ${T.tipBorder}`,
            background: `${T.cyan}06`, borderRadius: 9,
            color: T.tipText, fontSize: 9,
          }}>
            <span style={{ color: T.cyan, fontWeight: 700, display: "block", marginBottom: 3 }}>
              💡 {lang === "fr" ? "Conseil" : "Tip"}
            </span>
            {lang === "fr" ? cfg.tip.fr : cfg.tip.en}
          </div>
        )}
      </div>
    </div>
  );
}

// ── CHRONOS Hub shell ──

function NetworkHub({ onBack, initialTab }: { onBack?: () => void; initialTab?: string }) {
  const { lang, t } = useTrans();
  const { dark } = useDark();
  useChronosFonts();
  const T = React.useMemo(() => buildPalette(dark), [dark]);
  const S = React.useMemo(() => mkStyles(T), [T]);
  const responsiveStyle = React.useMemo(() => buildResponsiveStyle(T), [T]);
  const [tab, setTab] = useState(initialTab || "ip");
  const [openBadgeInfo, setOpenBadgeInfo] = useState<number | null>(null);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const sidebarExpanded = sidebarPinned || sidebarHovered;
  const cur = TABS.find(tb => tb.id === tab)!;
  const hasHowItWorks = !!HOW_IT_WORKS[tab];

  const tabContent = {
    ip: <IPTab />,
    iplookup: <IpLookupTab />,
    subnet: <SubnetTab />,
    speed: <SpeedTab />,
    status: <StatusTab />,
    password: <PasswordTab />,
    dns: <DnsTab />,
    dnsprop: <DnsPropagationTab />,
    whois: <WhoisTab />,
    ssl: <SslTab />,
    domainAge: <DomainAgeTab />,
    ping: <PingTab />,
    ports: <PortScannerTab />,
    headers: <HttpHeadersTab />,
    traceroute: <TracerouteTab />,
    emailsec: <EmailSecurityTab />,
    secheaders: <SecurityHeadersTab />,
    blacklist: <BlacklistTab />,
    ipconv: <IpConverterTab />,
    contping: <ContinuousPingTab />,
  };

  return (
    <NHThemeCtx.Provider value={T}>
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(circle at 65% 10%, ${T.cyan}0a, transparent 30%), ${T.bg}`,
      fontFamily: "'DM Sans', sans-serif",
      color: T.textPrimary,
    }}>
      <GlobalStyles />
      <style>{responsiveStyle}</style>

      {/* Mobile-only tool switcher */}
      <button
        type="button"
        className="chronos-mobile-trigger"
        onClick={() => setMobileDrawerOpen(true)}
        style={{
          alignItems: "center", gap: 10, width: "100%",
          padding: "12px 16px", background: T.bgCard, border: "none",
          borderBottom: `1px solid ${T.border}`, cursor: "pointer", textAlign: "left",
        }}
      >
        <Icon name={cur.icon} size={16} />
        <span style={{ fontSize: 14, fontWeight: 700, color: T.textPrimary }}>
          {lang === "fr" ? "Choisir un outil" : "Choose a tool"}
        </span>
        <span style={{ marginLeft: "auto", color: T.muted2, fontSize: 12 }}>▾</span>
      </button>

      {mobileDrawerOpen && (
        <>
          <div onClick={() => setMobileDrawerOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.5)" }} />
          <div role="dialog" style={{
            position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 201,
            maxHeight: "75vh", overflowY: "auto", background: T.bgCard,
            borderTopLeftRadius: 20, borderTopRightRadius: 20,
            padding: "16px 16px 24px", boxShadow: "0 -12px 32px rgba(0,0,0,0.4)",
          }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: T.border, margin: "0 auto 16px" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <b style={{ fontSize: 15, color: T.textPrimary }}>{lang === "fr" ? "Choisir un outil" : "Choose a tool"}</b>
              <button onClick={() => setMobileDrawerOpen(false)} style={{ background: "transparent", border: "none", color: T.muted2, fontSize: 22, cursor: "pointer", lineHeight: 1, padding: 4 }}>×</button>
            </div>
            {TAB_GROUPS.map(group => (
              <div key={group.id} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10.5, color: T.muted2, textTransform: "uppercase", fontWeight: 800, letterSpacing: ".06em", padding: "0 4px 8px" }}>
                  {lang === "fr" ? group.fr : group.en}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                  {TABS.filter(tb => tb.group === group.id).map(tb => {
                    const active = tab === tb.id
                    return (
                      <button
                        key={tb.id}
                        onClick={() => { setTab(tb.id); setMobileDrawerOpen(false) }}
                        style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 10,
                          border: `1px solid ${active ? T.cyan : T.border}`,
                          background: active ? `${T.cyan}18` : "transparent",
                          color: active ? T.cyan : T.textPrimary,
                          fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer", textAlign: "left",
                        }}>
                        <Icon name={tb.icon} size={15} />
                        {lang === "fr" ? tb.fr : tb.en}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}


      {/* ── Layout: sidebar + content ── */}
      <div className="chronos-shell" style={{ display: "grid", gridTemplateColumns: `${sidebarPinned ? 240 : 64}px 1fr`, height: "calc(100vh - 64px)", overflow: "hidden", position: "relative", transition: "grid-template-columns .16s ease" }}>

        {/* Spacer reserves the collapsed-rail width so main content doesn't jump when the sidebar overlays open on hover */}
        <div className="chronos-sidebar-spacer" />

        {/* Sidebar */}
        <aside
          className="chronos-sidebar"
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          style={{
          position: "absolute", top: 0, left: 0, bottom: 0, zIndex: 50,
          width: sidebarExpanded ? 240 : 64,
          borderRight: `1px solid ${T.border}`,
          padding: sidebarExpanded ? "20px 16px" : "20px 8px",
          background: T.sidebarBg,
          height: "100%",
          overflowY: sidebarExpanded ? "auto" : "hidden",
          overflowX: "hidden",
          transition: "width .16s ease, padding .16s ease",
          boxShadow: sidebarHovered && !sidebarPinned ? "8px 0 24px rgba(0,0,0,0.35)" : "none",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 4 }}>
            <div style={{ minWidth: 0 }}>
              {onBack && sidebarExpanded && (
                <button onClick={onBack} style={{
                  background: T.green, color: "#fff",
                  border: "none", borderRadius: 10,
                  padding: "8px 16px", cursor: "pointer",
                  fontSize: 12, fontWeight: 700,
                  display: "flex", alignItems: "center", gap: 6,
                  marginBottom: 18,
                }}>← CHRONOS</button>
              )}
              {sidebarExpanded ? (
                <>
                  <div style={{ color: T.cyan, fontWeight: 700, fontSize: 13, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em" }}>NET_HUB</div>
                  <div style={{ color: T.textSecondary, fontSize: 11, marginTop: 4 }}>{TABS.length} {lang === "fr" ? "outils" : "tools"}</div>
                </>
              ) : (
                <div style={{ color: T.cyan, fontWeight: 700, fontSize: 13, fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>N</div>
              )}
            </div>
            {sidebarExpanded && (
              <button
                type="button"
                className={`chronos-sidebar-pin${sidebarPinned ? " pinned" : ""}`}
                onClick={() => setSidebarPinned(p => !p)}
                title={sidebarPinned
                  ? (lang === "fr" ? "Détacher la barre latérale" : "Unpin sidebar")
                  : (lang === "fr" ? "Épingler la barre latérale" : "Pin sidebar")}
                aria-pressed={sidebarPinned}
                style={{
                  flexShrink: 0, width: 26, height: 26, borderRadius: 7,
                  border: `1px solid ${T.border}`, cursor: "pointer",
                  background: sidebarPinned ? `${T.cyan}18` : "transparent",
                  color: sidebarPinned ? T.cyan : T.muted2,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
                }}
              >
                📌
              </button>
            )}
          </div>

          <div className="chronos-sidebar-groups">
            {TAB_GROUPS.map(group => (
              <SideGroup key={group.id} label={lang === "fr" ? group.fr : group.en}
                tabs={TABS.filter(tb => tb.group === group.id)} activeTab={tab} lang={lang} onSelect={setTab} collapsed={!sidebarExpanded} />
            ))}
          </div>

          {/* Live-diagnostics badge */}
          {sidebarExpanded && (
            <div className="chronos-privacy-badge" style={{
              marginTop: 30, padding: 15,
              border: `1px solid ${T.border}`, borderRadius: 12,
              background: T.bgCard,
            }}>
              <b style={{ fontSize: 11, display: "block" }}>
                ● &nbsp; {t("nh.sidebar.liveTitle")}
              </b>
              <p style={{ color: T.muted2, fontSize: 10, lineHeight: 1.5, margin: "6px 0 0" }}>
                {t("nh.sidebar.liveDesc")}
            </p>
          </div>
          )}
        </aside>

        {/* Main content */}
        <main className="chronos-main" style={{ width: "100%", padding: "20px 40px 65px", height: "100%", overflowY: "auto" }}>

          {/* Breadcrumb */}
          <div style={{ fontSize: 11, color: T.muted2, marginBottom: 18 }}>
            CHRONOS / {lang === "fr" ? "RÉSEAU" : "NETWORK"} / <b style={{ color: T.textSecondary }}>{lang === "fr" ? cur.fr : cur.en}</b>
          </div>

          {/* Hero */}
          <div className="chronos-hero-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
            <div>
              <div style={{ color: T.cyan, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", marginBottom: 7 }}>
                {lang === "fr" ? "RÉSEAU" : "NETWORK"} / {(lang === "fr" ? cur.fr : cur.en).toUpperCase()}
              </div>
              <h1 className="chronos-hero-title" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600, fontSize: 54, lineHeight: 0.92,
                letterSpacing: "-0.02em", margin: 0,
              }}>
                {lang === "fr" ? cur.fr : cur.en}
              </h1>
              <p style={{ color: T.textSecondary, fontSize: 14, margin: "9px 0 0" }}>
                {lang === "fr" ? cur.frDesc : cur.enDesc}
              </p>
            </div>
            <div style={{
              border: `1px solid ${T.greenBorder}`, color: T.green,
              background: `${T.green}0a`, borderRadius: 999,
              padding: "8px 12px", fontSize: 10, whiteSpace: "nowrap",
            }}>
              ● &nbsp; {t("nh.hero.liveBadge")}
            </div>
          </div>

          {/* Trust badges */}
          <div className="chronos-trust-badges" style={{ display: "flex", gap: 32, marginBottom: 24, flexWrap: "wrap" }}>
            {[
              { icon: "🚀", title: t("nh.badges.noSignupTitle"), sub: t("nh.badges.noSignupSub"),
                enInfo: "No account, no email, no credit card. Every network tool is free to use right away — nothing to sign up for.",
                frInfo: "Pas de compte, pas d'email, pas de carte bancaire. Chaque outil réseau est utilisable gratuitement tout de suite, sans inscription." },
              { icon: "⚡", title: t("nh.badges.realtimeTitle"), sub: t("nh.badges.realtimeSub"),
                enInfo: "Each lookup queries live data at the moment you run it — results are never served from a stale cache, so what you see reflects the current state.",
                frInfo: "Chaque recherche interroge des données en direct au moment où vous l'exécutez — les résultats ne proviennent jamais d'un cache périmé, ils reflètent l'état actuel." },
              { icon: "✓", title: t("nh.badges.easyTitle"), sub: t("nh.badges.easySub"),
                enInfo: "No settings to configure or manuals to read — just type what you want to look up (an IP, a domain, a port…) and get your result.",
                frInfo: "Aucun réglage à configurer, aucun manuel à lire — il suffit de taper ce que vous voulez vérifier (une IP, un domaine, un port…) pour obtenir le résultat." },
            ].map((item, i) => {
              const open = openBadgeInfo === i;
              return (
                <div key={i} style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setOpenBadgeInfo(o => o === i ? null : i)}
                    aria-expanded={open}
                    style={{
                      display: "flex", gap: 8, alignItems: "center", textAlign: "left",
                      background: "transparent", border: "none", padding: 0, margin: 0,
                      cursor: "pointer", font: "inherit", color: "inherit", appearance: "none",
                      WebkitAppearance: "none", borderRadius: 0,
                    }}
                  >
                    <div style={{
                      width: 30, height: 30, border: `1px solid ${T.border}`,
                      borderRadius: 9, display: "grid", placeItems: "center", color: T.cyan, flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <strong style={{ fontSize: 11, display: "block", color: T.textPrimary }}>{item.title}</strong>
                      <small style={{ fontSize: 9, color: T.muted2 }}>{item.sub}</small>
                    </div>
                  </button>
                  {open && (
                    <>
                      <div onClick={() => setOpenBadgeInfo(null)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
                      <div role="dialog" style={{
                        position: "absolute", top: "calc(100% + 8px)", left: 0, width: 260, zIndex: 41,
                        border: `1px solid ${T.border}`, borderRadius: 14, background: T.bgCard,
                        boxShadow: "0 12px 32px rgba(0,0,0,0.35)", padding: 16,
                      }}>
                        <b style={{ fontSize: 12, color: T.textPrimary, display: "block", marginBottom: 6 }}>
                          {item.title} — {item.sub}
                        </b>
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: T.muted2, margin: 0 }}>
                          {lang === "fr" ? item.frInfo : item.enInfo}
                        </p>
                        <button type="button" onClick={() => setOpenBadgeInfo(null)}
                          style={{ marginTop: 12, fontSize: 10, color: T.muted2, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
                          {lang === "fr" ? "Fermer" : "Close"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ad banner */}
          <div style={{ marginBottom: "20px" }}>
            <NHAdBanner tab={tab} />
          </div>

          {/* Tool panel (+ How it works, for the tools that have real multi-step flows) */}
          {hasHowItWorks ? (
            <div className="chronos-howitworks-row" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>
              <div>{tabContent[tab]}</div>
              <HowItWorksCard toolId={tab} lang={lang} />
            </div>
          ) : (
            <div>{tabContent[tab]}</div>
          )}

          {/* Deep SEO content — What is it / How it works / Formula / Examples / FAQ */}
          <NetworkSeoContent toolId={tab} />

          {/* Related tools */}
          <section style={{ marginTop: 26 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 25, margin: "0 0 10px", color: T.textPrimary }}>
              {lang === "fr" ? "Autres outils réseau dont vous pourriez avoir besoin" : "Other network tools you might need"}
            </h3>
            <div className="chronos-related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 9 }}>
              {TABS.filter(tb => tb.id !== tab).slice(0, 4).map(tb => (
                <button
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  style={{
                    border: `1px solid ${T.border}`, borderRadius: 10,
                    padding: 13, background: T.bgCard,
                    textAlign: "left", cursor: "pointer",
                    transition: "border-color .15s",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = T.cyan)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
                >
                  <b style={{ fontSize: 11, color: T.textPrimary, display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name={tb.icon} size={13} /> {lang === "fr" ? tb.fr : tb.en}
                  </b>
                  <p style={{ fontSize: 9, lineHeight: 1.45, color: T.muted2, margin: "4px 0 0" }}>
                    {lang === "fr" ? tb.frDesc : tb.enDesc}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 22, paddingTop: 14, textAlign: "center", color: T.muted2, fontSize: 9 }}>
            ● &nbsp; {t("nh.footer.note")}
          </div>
        </main>
      </div>
    </div>
    </NHThemeCtx.Provider>
  );
}

export default NetworkHub