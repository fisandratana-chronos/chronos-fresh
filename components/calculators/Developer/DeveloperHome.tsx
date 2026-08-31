'use client'
// ── components/calculators/Developer/DeveloperHome.tsx ──
// "Barrel" ho an'ny kategoria Developer: mamory ny component rehetra ao
// anatiny + ny PANEL_MAP ampiasain'ny SmartCalcHub shell.

import PasswordGenerator from './PasswordGenerator'
import UuidGenerator from './UuidGenerator'
import JsonFormatter from './JsonFormatter'
import QrCodeGenerator from './QrCodeGenerator'
import WordCounter from './WordCounter'
import TextDiffChecker from './TextDiffChecker'
import LoremIpsumGenerator from './LoremIpsumGenerator'
import CaseConverter from './CaseConverter'
import Sha256Generator from './Sha256Generator'
import Base64Tool from './Base64Tool'

export const DEVELOPER_PANEL_MAP = {
  password: PasswordGenerator,
  uuid: UuidGenerator,
  json: JsonFormatter,
  qr: QrCodeGenerator,
  wordcount: WordCounter,
  textdiff: TextDiffChecker,
  lorem: LoremIpsumGenerator,
  casegen: CaseConverter,
  sha256: Sha256Generator,
  base64: Base64Tool
}

export const DEVELOPER_TOOLS = [
  { key: "password", label: "Password Generator", icon: "🔑", Component: PasswordGenerator },
  { key: "uuid", label: "UUID Generator", icon: "🆔", Component: UuidGenerator },
  { key: "json", label: "JSON Formatter", icon: "🧩", Component: JsonFormatter },
  { key: "qr", label: "QR Code Generator", icon: "📱", Component: QrCodeGenerator },
  { key: "wordcount", label: "Word Counter", icon: "🔢", Component: WordCounter },
  { key: "textdiff", label: "Text Diff Checker", icon: "🔍", Component: TextDiffChecker },
  { key: "lorem", label: "Lorem Ipsum Generator", icon: "📝", Component: LoremIpsumGenerator },
  { key: "casegen", label: "Case Converter", icon: "🔤", Component: CaseConverter },
  { key: "sha256", label: "SHA-256 Generator", icon: "🔐", Component: Sha256Generator },
  { key: "base64", label: "Base64 Encoder/Decoder", icon: "🔡", Component: Base64Tool }
]
