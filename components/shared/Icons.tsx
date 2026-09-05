'use client'
// ── components/shared/Icons.tsx ──────────────────────────────
// Solosin'ny SVG icon professionnel ireo emoji nampiasaina teto
// amin'ny CHRONOS. Stroke-based, currentColor, mora ovaina habe
// sy loko (mandova ny color token amin'ny style ambaniny).
//
// Fampiasana:
//   import { Icon } from '../shared/Icons'
//   <Icon name="flame" size={16} />
//
// Na azo alaina mivantana koa ny component tsirairay:
//   import { IconFlame } from '../shared/Icons'
//   <IconFlame size={16} color="#F59E0B" />

import React from 'react'

export type IconProps = {
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
  style?: React.CSSProperties
}

function base(children: React.ReactNode, props: IconProps = {}) {
  const { size = 18, color = 'currentColor', strokeWidth = 2, className, style } = props
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', ...style }}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const IconBolt = (p: IconProps) => base(<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />, p)
export const IconFlame = (p: IconProps) => base(<path d="M12 2c1.5 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.2.5-2 1-2.7.3 1 1 1.7 2 1.7-1-2.3-1-4-.2-6 1 1 2 1.7 3.2 3-1-2.2-2-3-2-4Z" />, p)
export const IconHeart = (p: IconProps) => base(<path d="M19.5 4.9a5 5 0 0 0-7.1 0L12 5.3l-.4-.4a5 5 0 1 0-7.1 7.1L12 20l7.5-8a5 5 0 0 0 0-7.1Z" />, p)
export const IconCash = (p: IconProps) => base(<><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 10v.01M18 14v.01" /></>, p)
export const IconCreditCard = (p: IconProps) => base(<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>, p)
export const IconSettings = (p: IconProps) => base(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></>, p)
export const IconFileText = (p: IconProps) => base(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" /></>, p)
export const IconRefreshCircle = (p: IconProps) => base(<><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v6h-6" /></>, p)
export const IconLockClosed = (p: IconProps) => base(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>, p)
export const IconLockOpen = (p: IconProps) => base(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 7.4-2" /></>, p)
export const IconClipboard = (p: IconProps) => base(<><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" /></>, p)
export const IconSearch = (p: IconProps) => base(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>, p)
export const IconLink = (p: IconProps) => base(<><path d="M9 15 15 9" /><path d="M11 6.5 12.5 5a3.5 3.5 0 1 1 5 5L16 11.5" /><path d="M13 17.5 11.5 19a3.5 3.5 0 1 1-5-5L8 12.5" /></>, p)
export const IconPalette = (p: IconProps) => base(<><path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.4 0-1.1.9-2 2-2H17a4 4 0 0 0 4-4c0-5-4.5-9.2-9-9.2Z" /><circle cx="7" cy="10" r="1" /><circle cx="7.5" cy="14.5" r="1" /><circle cx="12" cy="6.5" r="1" /><circle cx="16.5" cy="9" r="1" /></>, p)
export const IconCheckCircle = (p: IconProps) => base(<><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 5-5.5" /></>, p)
export const IconCheck = (p: IconProps) => base(<path d="M20 6 9 17l-5-5" />, p)
export const IconGlobe = (p: IconProps) => base(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>, p)
export const IconFolder = (p: IconProps) => base(<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />, p)
export const IconStar = (p: IconProps) => base(<path d="m12 3 2.7 5.9 6.3.6-4.8 4.3 1.4 6.2L12 16.9 6.4 20l1.4-6.2-4.8-4.3 6.3-.6Z" />, p)
export const IconBanknote = (p: IconProps) => base(<><rect x="2" y="7" width="20" height="10" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 9v.01M18 15v.01" /></>, p)
export const IconUpload = (p: IconProps) => base(<><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>, p)
export const IconCrown = (p: IconProps) => base(<path d="m3 8 4 3 5-6 5 6 4-3-1.5 10h-15Z" />, p)
export const IconClock = (p: IconProps) => base(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>, p)
export const IconPin = (p: IconProps) => base(<><path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></>, p)
export const IconSend = (p: IconProps) => base(<path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" />, p)
export const IconDevices = (p: IconProps) => base(<><rect x="7" y="2" width="10" height="16" rx="2" /><path d="M11 15h2" /></>, p)
export const IconShield = (p: IconProps) => base(<><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5Z" /><path d="m9 12 2 2 4-4" /></>, p)
export const IconMessage = (p: IconProps) => base(<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Z" />, p)
export const IconBulb = (p: IconProps) => base(<><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2h5A2.6 2.6 0 0 1 15.6 14 6 6 0 0 0 12 3Z" /></>, p)
export const IconBook = (p: IconProps) => base(<><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 1 4 17.5Z" /><path d="M20 17H6.5a2.5 2.5 0 0 0 0 5H20" /></>, p)
export const IconX = (p: IconProps) => base(<path d="M18 6 6 18M6 6l12 12" />, p)
export const IconAlertTriangle = (p: IconProps) => base(<><path d="M10.3 3.9 2.6 18a1.7 1.7 0 0 0 1.5 2.5h15.8A1.7 1.7 0 0 0 21.4 18L13.7 3.9a1.7 1.7 0 0 0-3 0Z" /><path d="M12 9v4M12 17h.01" /></>, p)
export const IconTrendingUp = (p: IconProps) => base(<><path d="m3 16 6-6 4 4 8-9" /><path d="M17 5h4v4" /></>, p)
export const IconTrendingDown = (p: IconProps) => base(<><path d="m3 8 6 6 4-4 8 9" /><path d="M17 19h4v-4" /></>, p)
export const IconChartBar = (p: IconProps) => base(<><path d="M4 20V10M12 20V4M20 20v-7" /><path d="M2 20h20" /></>, p)
export const IconCalendar = (p: IconProps) => base(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>, p)
export const IconCalculator = (p: IconProps) => base(<><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" /></>, p)
export const IconGraduationCap = (p: IconProps) => base(<><path d="m2 9 10-5 10 5-10 5Z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6" /></>, p)
export const IconTag = (p: IconProps) => base(<><path d="M12 2h6a2 2 0 0 1 2 2v6l-9.5 9.5a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8Z" /><circle cx="16.5" cy="7.5" r="1.5" /></>, p)
export const IconBank = (p: IconProps) => base(<><path d="M3 10 12 4l9 6" /><path d="M4 10h16v9H4ZM2 21h20" /></>, p)
export const IconExchange = (p: IconProps) => base(<><path d="M4 8h13l-3-3M20 16H7l3 3" /></>, p)
export const IconHome = (p: IconProps) => base(<><path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1Z" /></>, p)
export const IconReceipt = (p: IconProps) => base(<><path d="M6 2h12v20l-3-2-3 2-3-2-3 2Z" /><path d="M9 8h6M9 12h6" /></>, p)
export const IconKey = (p: IconProps) => base(<><circle cx="8" cy="15" r="4" /><path d="m10.8 12.2 8.5-8.5M16 8l2 2M19 5l2 2" /></>, p)
export const IconTypography = (p: IconProps) => base(<path d="M6 4h12M9 4v16M15 4v6M12 20h-6M17 20h4M18 14v6" />, p)
export const IconAbc = (p: IconProps) => base(<><path d="M3 16V8a3 3 0 0 1 6 0v8M3 12h6" /><path d="M11 16V8h3a2.5 2.5 0 0 1 0 5h-3M14 13h.5a2.5 2.5 0 0 1 0 3H11" /><path d="M18 10.5c1.5-1 3.5-.3 3.5 1.5s-2 2.5-3.5 1.5" /></>, p)
export const IconHash = (p: IconProps) => base(<path d="M5 9h14M5 15h14M10 3 8 21M16 3l-2 18" />, p)
export const IconRocket = (p: IconProps) => base(<><path d="M14.5 2.5c3 0 5.5 2 6.5 5-3 1-5-1-6.5-2.5C13 6.5 9 10 8 15c-1.5.5-3 3-4 5 2-1 4.5-2.5 5-4 5-1 8.5-5 9.5-8 1.5-1.5-.5-5.5-3.5-6.5 2 1-.5 3-1 1.5Z" /><circle cx="15" cy="9" r="1.5" /></>, p)
export const IconDice = (p: IconProps) => base(<><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8" cy="8" r="1" /><circle cx="16" cy="8" r="1" /><circle cx="8" cy="16" r="1" /><circle cx="16" cy="16" r="1" /><circle cx="12" cy="12" r="1" /></>, p)
export const IconCake = (p: IconProps) => base(<><path d="M4 21v-7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7" /><path d="M2 21h20M7 11V8M12 11V8M17 11V8M12 3v2" /><path d="M6 21c0-1.5 1-1.5 1-3s-1-1.5-1-3M12 21c0-1.5 1-1.5 1-3s-1-1.5-1-3M18 21c0-1.5 1-1.5 1-3s-1-1.5-1-3" /></>, p)
export const IconScale = (p: IconProps) => base(<><path d="M12 3v18M8 21h8M6 7h12" /><path d="m6 7-3 6a3 3 0 0 0 6 0ZM18 7l-3 6a3 3 0 0 0 6 0Z" /></>, p)
export const IconThermometer = (p: IconProps) => base(<><path d="M10 14.8V5a2 2 0 1 1 4 0v9.8a4 4 0 1 1-4 0Z" /><path d="M12 9v4" /></>, p)
export const IconRuler = (p: IconProps) => base(<><path d="m3 17 14-14 4 4L7 21Z" /><path d="m14 6 2 2M11 9l2 2M8 12l2 2" /></>, p)
export const IconMap = (p: IconProps) => base(<><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></>, p)
export const IconMovie = (p: IconProps) => base(<><path d="M3 8h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M3 8l3-5h3l-3 5Zm6 0 3-5h3l-3 5Zm6 0 3-5h1a1 1 0 0 1 1 1v4Z" /></>, p)
export const IconMusic = (p: IconProps) => base(<><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>, p)
export const IconMail = (p: IconProps) => base(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>, p)
export const IconUser = (p: IconProps) => base(<><circle cx="12" cy="8" r="4" /><path d="M4 20a8 8 0 0 1 16 0" /></>, p)
export const IconWifi = (p: IconProps) => base(<><path d="M5 12.5a11 11 0 0 1 14 0M8 15.8a6.5 6.5 0 0 1 8 0" /><circle cx="12" cy="19" r="1" /></>, p)
export const IconAntenna = (p: IconProps) => base(<><path d="M12 22V10M8 6a5.6 5.6 0 0 1 8 0M5.5 3.5a9 9 0 0 1 13 0" /><circle cx="12" cy="10" r="2" /></>, p)
export const IconPlug = (p: IconProps) => base(<><path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0Z" /><path d="M12 17v5" /></>, p)
export const IconCamera = (p: IconProps) => base(<><path d="M4 8h3l2-2h6l2 2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="4" /></>, p)
export const IconScissors = (p: IconProps) => base(<><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M8.5 8.5 20 20M20 4 8.5 15.5" /></>, p)
export const IconIdBadge = (p: IconProps) => base(<><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="10" r="2.5" /><path d="M8 17c0-2 1.8-3 4-3s4 1 4 3M9 7h6" /></>, p)
export const IconSparkles = (p: IconProps) => base(<><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6 6 2 2m8-2-2 2m2 8-2-2m-8 2 2-2" /></>, p)
export const IconCloud = (p: IconProps) => base(<path d="M7 18a4.5 4.5 0 0 1-.5-9A5.5 5.5 0 0 1 17 8a4 4 0 0 1-1 8Z" />, p)
export const IconRepeat = (p: IconProps) => base(<><path d="M17 2 21 6l-4 4" /><path d="M3 12V9a3 3 0 0 1 3-3h15M7 22 3 18l4-4" /><path d="M21 12v3a3 3 0 0 1-3 3H3" /></>, p)
export const IconMicroscope = (p: IconProps) => base(<><path d="M6 21h10M9 21v-4a3 3 0 0 1 3-3 4 4 0 1 0-3-6.7" /><circle cx="12" cy="7" r="2" /><path d="M15 17h3a2 2 0 0 0 2-2v-1" /></>, p)
export const IconUsers = (p: IconProps) => base(<><circle cx="9" cy="8" r="3.5" /><path d="M2 20a7 7 0 0 1 14 0" /><path d="M16 5.5a3.5 3.5 0 0 1 0 6.8M18.5 20a6.5 6.5 0 0 0-3-5.4" /></>, p)
export const IconDroplet = (p: IconProps) => base(<path d="M12 3s7 7.5 7 12a7 7 0 1 1-14 0c0-4.5 7-12 7-12Z" />, p)
export const IconImage = (p: IconProps) => base(<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5-11 11" /></>, p)
export const IconWand = (p: IconProps) => base(<><path d="m4 20 10-10" /><path d="M14 4v3M19 9h3M14 10v3M17.5 6.5h3" /></>, p)
export const IconShare = (p: IconProps) => base(<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-3.9M8.6 13.5l6.8 3.9" /></>, p)
export const IconBriefcase = (p: IconProps) => base(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>, p)
export const IconGenderFemale = (p: IconProps) => base(<><circle cx="12" cy="9" r="6" /><path d="M12 15v6M9 19h6" /></>, p)
export const IconGenderMale = (p: IconProps) => base(<><circle cx="10" cy="14" r="6" /><path d="M14.5 9.5 20 4M14 4h6v6" /></>, p)
export const IconPointerClick = (p: IconProps) => base(<><path d="M9 3v2M4.2 5.2l1.4 1.4M3 11h2M18.8 5.2l-1.4 1.4" /><path d="M12.5 9 20 12l-3.5 1.5L15 17Z" /></>, p)
export const IconCoffee = (p: IconProps) => base(<><path d="M4 9h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" /><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3c-.5 1 .5 1.5 0 3M12 3c-.5 1 .5 1.5 0 3" /></>, p)
export const IconSun = (p: IconProps) => base(<><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></>, p)
export const IconMoon = (p: IconProps) => base(<path d="M20 14.5a8.5 8.5 0 1 1-9.5-11 7 7 0 0 0 9.5 11Z" />, p)
export const IconFlag = (p: IconProps) => base(<><path d="M5 21V4" /><path d="M5 4h13l-2.5 4L18 12H5" /></>, p)
export const IconMenu = (p: IconProps) => base(<path d="M4 6h16M4 12h16M4 18h16" />, p)
export const IconFlask = (p: IconProps) => base(<><path d="M9 2h6M10 2v6.5L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 8.5V2" /><path d="M7.5 15h9" /></>, p)
export const IconBrush = (p: IconProps) => base(<><path d="M18.4 3.6a2 2 0 0 1 2.8 2.8l-7.4 7.4-3.2-3.2Z" /><path d="M11.2 10.6 8 14c-1 1-1 2.5-2 3.5-1 1-2.5 1-3.5 1 0-1 0-2.5 1-3.5 1-1 2.5-1 3.5-2Z" /></>, p)
export const IconDeviceMobile = (p: IconProps) => base(<><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></>, p)
export const IconCompress = (p: IconProps) => base(<><path d="M4 9V5a1 1 0 0 1 1-1h4M4 15v4a1 1 0 0 0 1 1h4M20 9V5a1 1 0 0 0-1-1h-4M20 15v4a1 1 0 0 1-1 1h-4" /><path d="M9 9v6h6V9Z" /></>, p)
export const IconEdit = (p: IconProps) => base(<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>, p)
export const IconMasks = (p: IconProps) => base(<><circle cx="9" cy="10" r="6" /><path d="M13.5 5.5A6 6 0 1 1 9 16" /><circle cx="7" cy="9" r="0.5" /><circle cx="11" cy="9" r="0.5" /></>, p)
export const IconDot = (p: IconProps) => base(<circle cx="12" cy="12" r="5" fill={p.color || 'currentColor'} stroke="none" />, p)
export const IconNetwork = (p: IconProps) => base(<><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M12 7.5v3M10 13l-3 3M14 13l3 3" /></>, p)
export const IconTarget = (p: IconProps) => base(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.7" fill={p.color || 'currentColor'} stroke="none" /></>, p)
export const IconSpeakerphone = (p: IconProps) => base(<><path d="M3 11v2a2 2 0 0 0 2 2h1l3 5V4L6 9H5a2 2 0 0 0-2 2Z" /><path d="M14 8a4 4 0 0 1 0 8M17 5a8 8 0 0 1 0 14" /></>, p)
export const IconTrash = (p: IconProps) => base(<><path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" /><path d="M10 11v6M14 11v6" /></>, p)
export const IconPercent = (p: IconProps) => base(<><path d="M19 5 5 19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></>, p)

const REGISTRY: Record<string, (p: IconProps) => React.ReactElement> = {
  bolt: IconBolt, flame: IconFlame, heart: IconHeart, cash: IconCash, 'credit-card': IconCreditCard,
  settings: IconSettings, 'file-text': IconFileText, refresh: IconRefreshCircle, lock: IconLockClosed,
  'lock-open': IconLockOpen, clipboard: IconClipboard, search: IconSearch, link: IconLink, palette: IconPalette,
  'check-circle': IconCheckCircle, check: IconCheck, globe: IconGlobe, folder: IconFolder, star: IconStar,
  banknote: IconBanknote, upload: IconUpload, crown: IconCrown, clock: IconClock, pin: IconPin, send: IconSend,
  devices: IconDevices, shield: IconShield, message: IconMessage, bulb: IconBulb, book: IconBook, x: IconX,
  'alert-triangle': IconAlertTriangle, 'trending-up': IconTrendingUp, 'trending-down': IconTrendingDown,
  'chart-bar': IconChartBar, calendar: IconCalendar, calculator: IconCalculator, 'graduation-cap': IconGraduationCap,
  tag: IconTag, bank: IconBank, exchange: IconExchange, home: IconHome, receipt: IconReceipt, key: IconKey,
  typography: IconTypography, abc: IconAbc, hash: IconHash, rocket: IconRocket, dice: IconDice, cake: IconCake,
  scale: IconScale, thermometer: IconThermometer, ruler: IconRuler, map: IconMap, movie: IconMovie, music: IconMusic,
  mail: IconMail, user: IconUser, wifi: IconWifi, antenna: IconAntenna, plug: IconPlug, camera: IconCamera,
  scissors: IconScissors, 'id-badge': IconIdBadge, sparkles: IconSparkles, cloud: IconCloud, repeat: IconRepeat,
  microscope: IconMicroscope, users: IconUsers, droplet: IconDroplet, image: IconImage, wand: IconWand,
  share: IconShare, briefcase: IconBriefcase, 'gender-female': IconGenderFemale, 'gender-male': IconGenderMale,
  'pointer-click': IconPointerClick, coffee: IconCoffee, sun: IconSun, moon: IconMoon, flag: IconFlag,
  menu: IconMenu, flask: IconFlask, brush: IconBrush, 'device-mobile': IconDeviceMobile,
  compress: IconCompress, edit: IconEdit, masks: IconMasks, dot: IconDot, network: IconNetwork, target: IconTarget,
  speakerphone: IconSpeakerphone, trash: IconTrash, percent: IconPercent,
}

export function Icon({ name, ...rest }: { name: string } & IconProps) {
  const Cmp = REGISTRY[name]
  if (!Cmp) return null
  return Cmp(rest)
}
