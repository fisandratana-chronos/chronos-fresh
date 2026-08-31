// ── lib/categorySeo.ts ──────────────────────────────────────────
// Metadata SEO ho an'ny pejy "hub" (ohatra /tools/pdf-hub) — tsy
// mitovy amin'ny registryTools (izay ho an'ny tool tsirairay ao
// anaty hub, ohatra "merge-pdf"), fa ho an'ilay pejy fidirana
// (landing page) mampiseho ny tool rehetra ao anaty hub iray.
//
// Alaina avy amin'ny reference/*/i18n-seo/categorySeo.*.js
// (nalaina tao amin'ny legacy monolith), fa nohavaozina:
//   - nesorina ilay teny "PDF Master Pro" ao amin'ny pdf-hub, satria
//     efa tsy iframe/service ivelany intsony ny PDF Tools (efa
//     ao anaty browser mihitsy amin'ny pdf-lib) — jereo
//     reference/PdfHub/README.md fanamarihana #15 Aogositra
//   - nampiana keywords, mba ho mitovy lanja amin'ireo tool
//     tsirairay ao amin'ny registryTools

export interface CategorySeoEntry {
  title: string
  frTitle: string
  description: string
  frDescription: string
  keywords: string[]
  frKeywords: string[]
}

export const CATEGORY_SEO: Record<string, CategorySeoEntry> = {
  'pdf-hub': {
    title: 'Free PDF Tools Online — Merge, Split, Compress & Convert PDFs | CHRONOS',
    frTitle: 'Outils PDF Gratuits en Ligne — Fusionner, Diviser, Compresser | CHRONOS',
    description:
      'Merge, split, compress, rotate, and convert PDF files online for free — 100% in-browser, nothing uploaded to a server. Fast, secure, no software or sign-up required.',
    frDescription:
      'Fusionnez, divisez, compressez, pivotez et convertissez vos fichiers PDF en ligne gratuitement — 100% dans le navigateur, rien n\'est envoyé sur un serveur. Rapide, sécurisé, sans logiciel ni inscription.',
    keywords: ['pdf tools online', 'merge pdf free', 'split pdf online', 'compress pdf free', 'convert pdf online'],
    frKeywords: ['outils pdf en ligne', 'fusionner pdf gratuit', 'diviser pdf en ligne', 'compresser pdf gratuit', 'convertir pdf en ligne'],
  },
  'smart-calculator': {
    title: 'SmartCalc Hub — 25 Free Online Calculators & Converters | CHRONOS',
    frTitle: 'SmartCalc Hub — 25 Calculatrices et Convertisseurs Gratuits | CHRONOS',
    description:
      'Free online calculators and converters: BMI, loan, mortgage, percentage, currency, unit conversions, and more. Fast and accurate, no sign-up required.',
    frDescription:
      "Calculatrices et convertisseurs en ligne gratuits : IMC, prêt, hypothèque, pourcentage, devises, conversions d'unités, et plus. Rapide et précis, sans inscription.",
    keywords: ['online calculator', 'free calculators', 'bmi calculator', 'loan calculator', 'unit converter'],
    frKeywords: ['calculatrice en ligne', 'calculatrices gratuites', 'calculateur imc', 'calculateur de prêt', 'convertisseur d\'unités'],
  },
  'network-hub': {
    title: 'Free Internet & Network Tools Online — Speed Test, IP Lookup, DNS | CHRONOS',
    frTitle: 'Outils Internet et Réseau Gratuits — Test de Débit, IP, DNS | CHRONOS',
    description:
      'Check your internet speed, look up IP addresses, run DNS and Whois lookups, and test website status — all free, no sign-up required.',
    frDescription:
      "Testez votre débit internet, recherchez des adresses IP, effectuez des requêtes DNS et Whois, et vérifiez l'état d'un site — tout gratuitement, sans inscription.",
    keywords: ['internet speed test', 'ip lookup', 'dns lookup free', 'network tools online', 'whois lookup'],
    frKeywords: ['test de débit internet', 'recherche ip', 'recherche dns gratuit', 'outils réseau en ligne', 'recherche whois'],
  },
  // ── converters-hub — nalaina avy amin'ny tab tena ao anaty
  // TConvertersHub.tsx: length, weight, area, volume, speed,
  // temperature, currency, RGB↔HEX, text case
  'converters-hub': {
    title: 'Free Unit Converter Online — Length, Weight, Currency & More | CHRONOS',
    frTitle: "Convertisseur d'Unités Gratuit en Ligne — Longueur, Poids, Devises | CHRONOS",
    description:
      'Convert length, weight, area, volume, speed, and temperature units instantly. Also includes currency conversion, RGB↔HEX color conversion, and text case converter. Free, no sign-up required.',
    frDescription:
      "Convertissez les unités de longueur, poids, superficie, volume, vitesse et température instantanément. Comprend aussi la conversion de devises, RGB↔HEX pour les couleurs, et un convertisseur de casse de texte. Gratuit, sans inscription.",
    keywords: ['unit converter online', 'length converter', 'weight converter', 'currency converter free', 'temperature converter'],
    frKeywords: ["convertisseur d'unités en ligne", 'convertisseur de longueur', 'convertisseur de poids', 'convertisseur de devises gratuit', 'convertisseur de température'],
  },
  // ── developer-hub — nalaina avy amin'ny DEV_TABS tao amin'ny
  // TDeveloperHub.tsx: JSON format/validate, Base64, URL encode/decode,
  // regex tester, HTML formatter, CSS/JS minifier, word counter
  'developer-hub': {
    title: 'Free Developer Tools Online — JSON, Base64, Regex, Minifier | CHRONOS',
    frTitle: 'Outils Développeur Gratuits en Ligne — JSON, Base64, Regex, Minifieur | CHRONOS',
    description:
      'Free online developer tools: JSON formatter & validator, Base64 encoder/decoder, URL encoder/decoder, regex tester, HTML formatter, CSS/JS minifier, and word counter. No sign-up required.',
    frDescription:
      "Outils développeur gratuits en ligne : formateur et validateur JSON, encodeur/décodeur Base64, encodeur/décodeur URL, testeur regex, formateur HTML, minifieur CSS/JS, et compteur de mots. Sans inscription.",
    keywords: ['developer tools online', 'json formatter free', 'base64 encoder decoder', 'regex tester online', 'css js minifier'],
    frKeywords: ['outils développeur en ligne', 'formateur json gratuit', 'encodeur décodeur base64', 'testeur regex en ligne', 'minifieur css js'],
  },
  // ── image-hub — nalaina avy amin'ny IMAGE_TABS tao amin'ny
  // ImageHub.tsx: compress, convert format, resize, AI upscale,
  // remove background
  'image-hub': {
    title: 'Free Online Image Tools — Compress, Resize, Convert & Remove Background | CHRONOS',
    frTitle: "Outils Image Gratuits en Ligne — Compresser, Redimensionner, Convertir | CHRONOS",
    description:
      'Compress, resize, and convert images (JPG, PNG, WebP, AVIF) online for free. Also includes AI upscaling and background removal. Fast, secure, no sign-up required.',
    frDescription:
      "Compressez, redimensionnez et convertissez vos images (JPG, PNG, WebP, AVIF) en ligne gratuitement. Comprend aussi l'agrandissement par IA et la suppression d'arrière-plan. Rapide, sécurisé, sans inscription.",
    keywords: ['compress image online free', 'resize image online', 'image converter free', 'remove background online', 'ai image upscale'],
    frKeywords: ['compresser image en ligne gratuit', 'redimensionner image en ligne', 'convertisseur image gratuit', "supprimer arrière-plan en ligne", 'agrandissement image ia'],
  },
}
