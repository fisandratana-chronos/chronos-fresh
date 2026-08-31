// ── lib/pdfSeoContent.ts ─────────────────────────────────────
// Content lalindalina (what/how/examples/faq) ho an'ny tool 8 ao
// anatin'ny PDF_HUB (components/pdf/PdfHub.tsx), mba tsy ho "fiche
// vide" isaky ny tab — mitovy endrika amin'ny lib/networkSeoContent.ts
// ampiasain'ny NET_HUB.
//
// Ny "key" ao amin'ity dictionnaire ity (merge, split, compress,
// jpg2pdf, pdf2jpg, pdf2word, pdf2excel, rotate) dia MITOVY amin'ny
// "id" ao amin'ny PDF_TABS an'ny PdfHub.tsx.

export interface PdfSeoExample {
  label: string
  input: string
  result: string
}

export interface PdfSeoFaq {
  q: string
  a: string
}

export interface PdfSeoEntry {
  title: string
  frTitle: string
  what: string
  frWhat: string
  how: string
  frHow: string
  examples: PdfSeoExample[]
  frExamples: PdfSeoExample[]
  faq: PdfSeoFaq[]
  frFaq: PdfSeoFaq[]
}

export const PDF_SEO_CONTENT: Record<string, PdfSeoEntry> = {

  merge: {
    title: "Merge PDF Files Online — Combine Multiple PDFs Free",
    frTitle: "Fusionner des PDF en Ligne — Combiner Plusieurs PDF Gratuitement",
    what: "Merging PDFs means combining two or more separate PDF files into a single document, in the order you choose. It's the tool people reach for when they need to send one file instead of five — stitching together invoices, scanned pages, chapters of a report, or signed contracts into one clean document instead of a scattered email attachment list.",
    frWhat: "Fusionner des PDF consiste à combiner deux fichiers PDF ou plus en un seul document, dans l'ordre de votre choix. C'est l'outil qu'on utilise pour envoyer un seul fichier au lieu de cinq — regrouper des factures, des pages scannées, des chapitres de rapport ou des contrats signés en un document propre plutôt qu'une liste éparpillée de pièces jointes.",
    how: "Add two or more PDF files, drag them into the order you want, then merge. The tool reads every page from each file and writes them into one new PDF, entirely inside your browser — no file is ever sent to a server, which also means there's no upload wait, even for large documents.",
    frHow: "Ajoutez deux fichiers PDF ou plus, glissez-les dans l'ordre souhaité, puis fusionnez. L'outil lit chaque page de chaque fichier et les réécrit dans un nouveau PDF, entièrement dans votre navigateur — aucun fichier n'est jamais envoyé à un serveur, donc pas d'attente d'upload, même pour de gros documents.",
    examples: [
      { label: "Combine quarterly reports", input: "Q1.pdf + Q2.pdf + Q3.pdf", result: "→ one quarterly-report.pdf" },
      { label: "Join scanned pages", input: "page1.pdf, page2.pdf, page3.pdf", result: "→ single 3-page document" },
      { label: "Reorder before merging", input: "move cover.pdf to position 1", result: "→ correct reading order kept" },
    ],
    frExamples: [
      { label: "Combiner des rapports trimestriels", input: "T1.pdf + T2.pdf + T3.pdf", result: "→ un seul rapport-trimestriel.pdf" },
      { label: "Réunir des pages scannées", input: "page1.pdf, page2.pdf, page3.pdf", result: "→ un document unique de 3 pages" },
      { label: "Réordonner avant fusion", input: "déplacer couverture.pdf en 1ère position", result: "→ ordre de lecture correct conservé" },
    ],
    faq: [
      { q: "Is there a limit to how many PDFs I can merge?", a: "No hard limit from the tool itself — each file can be up to 100 MB, and you can add as many as you like. Very large batches simply take a moment longer to process since everything runs in your browser." },
      { q: "Does merging reduce the quality of my pages?", a: "No. Merging copies each page's original content exactly as it is — text stays sharp and images keep their original resolution." },
      { q: "Are my files uploaded to a server?", a: "No. All processing happens locally in your browser tab. Your PDFs never leave your device, which also means merging works even without a stable internet connection once the page is loaded." },
      { q: "Can I change the page order after adding files?", a: "Yes — drag any file up or down in the list before merging to control the exact order pages appear in the final PDF." },
    ],
    frFaq: [
      { q: "Y a-t-il une limite au nombre de PDF que je peux fusionner ?", a: "Aucune limite imposée par l'outil — chaque fichier peut aller jusqu'à 100 MB, et vous pouvez en ajouter autant que vous voulez. Les gros lots prennent simplement un peu plus de temps, tout se passant dans votre navigateur." },
      { q: "La fusion réduit-elle la qualité de mes pages ?", a: "Non. La fusion copie le contenu original de chaque page tel quel — le texte reste net et les images gardent leur résolution d'origine." },
      { q: "Mes fichiers sont-ils envoyés sur un serveur ?", a: "Non. Tout le traitement se fait localement dans votre onglet de navigateur. Vos PDF ne quittent jamais votre appareil, ce qui permet même de fusionner sans connexion internet stable une fois la page chargée." },
      { q: "Puis-je changer l'ordre des pages après avoir ajouté les fichiers ?", a: "Oui — faites glisser un fichier vers le haut ou le bas de la liste avant de fusionner pour contrôler l'ordre exact des pages dans le PDF final." },
    ],
  },

  split: {
    title: "Split PDF Online — Extract Pages or Divide by Range",
    frTitle: "Diviser un PDF en Ligne — Extraire des Pages ou Diviser par Plage",
    what: "Splitting a PDF means breaking one document into several smaller PDFs — either every page as its own file, or specific page ranges pulled out as separate documents. It's useful when you only need to share a chapter from a book, pull an invoice out of a bundled statement, or separate a scanned batch into individual records.",
    frWhat: "Diviser un PDF consiste à découper un document en plusieurs PDF plus petits — soit chaque page en fichier séparé, soit des plages de pages précises extraites en documents distincts. Pratique pour partager un seul chapitre d'un livre, extraire une facture d'un relevé groupé, ou séparer un lot scanné en dossiers individuels.",
    how: "Upload one PDF, then choose \"All pages\" to get every page as its own file, or \"Custom ranges\" to define exactly which pages go where (e.g. 1-3, 5, 7-10). Each resulting file downloads automatically, all computed locally in your browser without ever uploading the original document.",
    frHow: "Importez un PDF, puis choisissez « Toutes les pages » pour obtenir chaque page en fichier séparé, ou « Plages personnalisées » pour définir précisément quelles pages vont où (ex. 1-3, 5, 7-10). Chaque fichier résultant se télécharge automatiquement, tout étant calculé localement dans votre navigateur sans jamais envoyer le document original.",
    examples: [
      { label: "One file per page", input: "10-page PDF → \"All pages\"", result: "→ 10 separate single-page PDFs" },
      { label: "Custom ranges", input: "1-3, 5, 7-10", result: "→ 3 separate files, one per range" },
      { label: "Isolate a chapter", input: "pages 12-25 of a 200-page book", result: "→ one 14-page PDF" },
    ],
    frExamples: [
      { label: "Un fichier par page", input: "PDF de 10 pages → « Toutes les pages »", result: "→ 10 PDF séparés d'une page" },
      { label: "Plages personnalisées", input: "1-3, 5, 7-10", result: "→ 3 fichiers séparés, un par plage" },
      { label: "Isoler un chapitre", input: "pages 12-25 d'un livre de 200 pages", result: "→ un PDF de 14 pages" },
    ],
    faq: [
      { q: "What happens if I don't specify a range?", a: "Choosing \"All pages\" splits the document into one file per page automatically — you don't need to type anything." },
      { q: "Can I extract a single page instead of a range?", a: "Yes — type just the page number (e.g. 4) alongside any ranges, separated by commas, like 1-3, 4, 8." },
      { q: "Does splitting affect the original PDF?", a: "No, your original file is never modified — splitting only reads it to produce new files, and the source PDF stays exactly as it was." },
      { q: "Is page numbering based on the printed page or the PDF page order?", a: "It's based on the PDF's internal page order, page 1 being the very first page in the file, regardless of any printed page numbers shown on the pages themselves." },
    ],
    frFaq: [
      { q: "Que se passe-t-il si je ne précise pas de plage ?", a: "Choisir « Toutes les pages » divise automatiquement le document en un fichier par page — pas besoin de taper quoi que ce soit." },
      { q: "Puis-je extraire une seule page plutôt qu'une plage ?", a: "Oui — tapez simplement le numéro de la page (ex. 4) à côté d'éventuelles plages, séparés par des virgules, comme 1-3, 4, 8." },
      { q: "La division modifie-t-elle le PDF original ?", a: "Non, votre fichier original n'est jamais modifié — la division ne fait que le lire pour produire de nouveaux fichiers, le PDF source reste intact." },
      { q: "La numérotation des pages suit-elle la page imprimée ou l'ordre du PDF ?", a: "Elle suit l'ordre interne du PDF — la page 1 est la toute première page du fichier, quels que soient les numéros imprimés visibles sur les pages elles-mêmes." },
    ],
  },

  compress: {
    title: "Compress PDF Online — Reduce File Size Free",
    frTitle: "Compresser un PDF en Ligne — Réduire la Taille de Fichier Gratuitement",
    what: "PDF compression shrinks a document's file size while keeping its content intact, so it's easier to email, upload, or store. This matters most for scanned documents or PDFs full of images, which tend to balloon in size — a compressed version can be a fraction of the original without noticeably affecting readability.",
    frWhat: "La compression PDF réduit la taille d'un document tout en gardant son contenu intact, pour faciliter l'envoi par email, l'upload ou le stockage. C'est surtout utile pour les documents scannés ou les PDF riches en images, qui gonflent facilement en taille — une version compressée peut ne représenter qu'une fraction de l'original sans nuire notablement à la lisibilité.",
    how: "Upload your PDF and pick a compression level — Low, Medium, or High. The tool re-optimizes the internal structure of the file (how objects and streams are stored) to cut down size, then shows you the before/after file size and the percentage saved before you download.",
    frHow: "Importez votre PDF et choisissez un niveau de compression — Léger, Moyen ou Élevé. L'outil réoptimise la structure interne du fichier (le stockage des objets et des flux) pour réduire sa taille, puis affiche la taille avant/après et le pourcentage gagné avant le téléchargement.",
    examples: [
      { label: "Email attachment limit", input: "18 MB scanned report", result: "→ ~6 MB, fits under a 10 MB limit" },
      { label: "Faster cloud upload", input: "45 MB, 120-page manual", result: "→ smaller file, quicker to sync" },
      { label: "Website upload limit", input: "22 MB portfolio PDF", result: "→ compressed to fit a form's cap" },
    ],
    frExamples: [
      { label: "Limite de pièce jointe email", input: "rapport scanné de 18 MB", result: "→ ~6 MB, sous une limite de 10 MB" },
      { label: "Upload cloud plus rapide", input: "manuel de 120 pages, 45 MB", result: "→ fichier plus léger, sync plus rapide" },
      { label: "Limite d'un formulaire web", input: "portfolio PDF de 22 MB", result: "→ compressé pour respecter le plafond" },
    ],
    faq: [
      { q: "Does compression reduce image quality inside the PDF?", a: "Higher compression levels prioritize smaller file size and can slightly soften embedded images, while lower levels keep more of the original detail. For text-heavy documents, quality loss is generally not noticeable at any level." },
      { q: "Why did my file only shrink a little?", a: "PDFs that are mostly text are already compact — there's less redundant data to optimize compared to image-heavy or scanned PDFs, which typically see the biggest size reduction." },
      { q: "Is the compression lossless?", a: "The text and vector content stay exactly as they were. Size reduction mainly comes from optimizing how the file is internally structured, which is why gains vary depending on what's inside your PDF." },
      { q: "Which compression level should I use?", a: "Medium works well for most everyday needs. Use High when file size is the priority (e.g. strict upload limits), and Low when preserving maximum visual quality matters more than size." },
    ],
    frFaq: [
      { q: "La compression réduit-elle la qualité des images du PDF ?", a: "Les niveaux de compression élevés privilégient une taille plus petite et peuvent légèrement adoucir les images intégrées, tandis que les niveaux bas conservent plus de détail d'origine. Pour les documents surtout textuels, la perte de qualité est généralement imperceptible à tout niveau." },
      { q: "Pourquoi mon fichier n'a-t-il que peu diminué ?", a: "Les PDF surtout textuels sont déjà compacts — il y a moins de données redondantes à optimiser comparé aux PDF riches en images ou scannés, qui voient généralement la plus grande réduction." },
      { q: "La compression est-elle sans perte ?", a: "Le texte et le contenu vectoriel restent exactement identiques. La réduction de taille vient surtout de l'optimisation de la structure interne du fichier, d'où des gains variables selon le contenu de votre PDF." },
      { q: "Quel niveau de compression choisir ?", a: "Moyen convient à la plupart des besoins courants. Utilisez Élevé quand la taille prime (ex. limites d'upload strictes), et Léger quand préserver la qualité visuelle maximale compte plus que la taille." },
    ],
  },

  rotate: {
    title: "Rotate PDF Online — Fix Sideways or Upside-Down Pages",
    frTitle: "Pivoter un PDF en Ligne — Corriger des Pages de Travers",
    what: "Rotating a PDF turns one or more pages by 90°, 180°, or 270°, which is exactly what's needed when a scanner feeds a page in sideways or upside down. Rather than rescanning, you can straighten the affected pages directly in the file so the whole document reads correctly, whether on screen or printed.",
    frWhat: "Pivoter un PDF fait tourner une ou plusieurs pages de 90°, 180° ou 270° — exactement ce qu'il faut quand un scanner a inséré une page de travers ou à l'envers. Plutôt que de rescanner, vous pouvez redresser les pages concernées directement dans le fichier pour que tout le document se lise correctement, à l'écran comme à l'impression.",
    how: "Upload your PDF, pick a rotation angle, then choose which pages to apply it to — all, odd, even, or a custom list. The tool rewrites the rotation setting for each targeted page and produces a new PDF ready to download, without touching pages you didn't select.",
    frHow: "Importez votre PDF, choisissez un angle de rotation, puis sélectionnez les pages concernées — toutes, impaires, paires, ou une liste personnalisée. L'outil réécrit le réglage de rotation pour chaque page ciblée et produit un nouveau PDF prêt à télécharger, sans toucher aux pages non sélectionnées.",
    examples: [
      { label: "Fix a sideways scan", input: "page 3 rotated 90°", result: "→ page 3 now reads upright" },
      { label: "Whole document upside down", input: "all pages, 180°", result: "→ every page corrected at once" },
      { label: "Only the even pages", input: "even pages, 90°", result: "→ odd pages left untouched" },
    ],
    frExamples: [
      { label: "Corriger un scan de travers", input: "page 3 pivotée à 90°", result: "→ la page 3 se lit maintenant droite" },
      { label: "Document entier à l'envers", input: "toutes les pages, 180°", result: "→ chaque page corrigée d'un coup" },
      { label: "Seulement les pages paires", input: "pages paires, 90°", result: "→ pages impaires laissées intactes" },
    ],
    faq: [
      { q: "Can I rotate just one specific page?", a: "Yes — choose \"Custom\" and type the page number(s) you want rotated, such as 3 or 3, 7, 12, leaving every other page untouched." },
      { q: "Does rotating affect the page content or just how it displays?", a: "It changes the page's rotation setting, which is how PDF viewers and printers know which way is 'up' — the underlying page content itself isn't altered or re-rendered." },
      { q: "Can I rotate by an angle other than 90°, 180°, or 270°?", a: "Rotation is limited to these three standard angles, which cover every real-world case of a page being scanned sideways or upside down." },
      { q: "Will rotation make my file larger?", a: "No — rotation only changes a page property, not the actual content, so the resulting file size stays essentially the same as the original." },
    ],
    frFaq: [
      { q: "Puis-je pivoter une seule page précise ?", a: "Oui — choisissez « Personnalisé » et tapez le(s) numéro(s) de page à pivoter, comme 3 ou 3, 7, 12, en laissant les autres pages intactes." },
      { q: "La rotation modifie-t-elle le contenu ou juste l'affichage ?", a: "Elle change le réglage de rotation de la page, qui indique aux lecteurs PDF et imprimantes quel côté est « le haut » — le contenu de la page lui-même n'est ni modifié ni redessiné." },
      { q: "Puis-je pivoter selon un angle autre que 90°, 180° ou 270° ?", a: "La rotation se limite à ces trois angles standards, qui couvrent tous les cas réels de page scannée de travers ou à l'envers." },
      { q: "La rotation va-t-elle alourdir mon fichier ?", a: "Non — la rotation ne change qu'une propriété de page, pas le contenu réel, donc la taille du fichier reste essentiellement la même qu'à l'origine." },
    ],
  },

  jpg2pdf: {
    title: "JPG to PDF Converter — Turn Images into a PDF Free",
    frTitle: "Convertisseur JPG en PDF — Transformer des Images en PDF Gratuitement",
    what: "Converting JPG (or PNG) images to PDF places each image onto its own page of a single PDF document, in the order you choose. It's the standard way to turn a stack of photographed or scanned pages — receipts, ID documents, whiteboard notes — into one shareable, printable file instead of separate loose images.",
    frWhat: "Convertir des images JPG (ou PNG) en PDF place chaque image sur sa propre page d'un même document PDF, dans l'ordre choisi. C'est la façon standard de transformer une série de photos ou de pages scannées — reçus, pièces d'identité, notes de tableau blanc — en un seul fichier partageable et imprimable plutôt que des images séparées.",
    how: "Drop in one or more JPG or PNG images, reorder them if needed, then create the PDF. Each image becomes a page sized to match the image's own dimensions, embedded at its original resolution, and the finished PDF downloads immediately — nothing is uploaded to process it.",
    frHow: "Déposez une ou plusieurs images JPG ou PNG, réordonnez-les si besoin, puis créez le PDF. Chaque image devient une page à la taille de ses propres dimensions, intégrée à sa résolution d'origine, et le PDF final se télécharge immédiatement — rien n'est envoyé pour être traité.",
    examples: [
      { label: "Scan multiple receipts", input: "receipt1.jpg, receipt2.jpg, receipt3.jpg", result: "→ one 3-page expenses.pdf" },
      { label: "ID document pair", input: "id-front.png + id-back.png", result: "→ one 2-page PDF for submission" },
      { label: "Photographed notes", input: "5 whiteboard photos", result: "→ single shareable PDF" },
    ],
    frExamples: [
      { label: "Plusieurs reçus scannés", input: "recu1.jpg, recu2.jpg, recu3.jpg", result: "→ un depenses.pdf de 3 pages" },
      { label: "Pièce d'identité recto-verso", input: "cni-recto.png + cni-verso.png", result: "→ un PDF de 2 pages pour envoi" },
      { label: "Notes photographiées", input: "5 photos de tableau blanc", result: "→ un seul PDF partageable" },
    ],
    faq: [
      { q: "Can I mix JPG and PNG images in the same PDF?", a: "Yes — you can add both formats together and they'll all be combined into pages of the same PDF, in the order you arrange them." },
      { q: "Will the image quality be reduced?", a: "No, each image is embedded at its original resolution, so the visual quality in the PDF matches the source image exactly." },
      { q: "Can I change the order of images before converting?", a: "Yes — drag any image up or down in the list to set the exact page order of the final PDF." },
      { q: "Is there a limit on how many images I can add?", a: "No fixed limit from the tool — you can add as many images as you need, each up to 100 MB, though very large batches take a little longer to process." },
    ],
    frFaq: [
      { q: "Puis-je mélanger images JPG et PNG dans le même PDF ?", a: "Oui — vous pouvez ajouter les deux formats ensemble, ils seront tous combinés en pages du même PDF, dans l'ordre que vous définissez." },
      { q: "La qualité des images sera-t-elle réduite ?", a: "Non, chaque image est intégrée à sa résolution d'origine, donc la qualité visuelle dans le PDF correspond exactement à l'image source." },
      { q: "Puis-je changer l'ordre des images avant la conversion ?", a: "Oui — faites glisser une image vers le haut ou le bas de la liste pour définir l'ordre exact des pages du PDF final." },
      { q: "Y a-t-il une limite au nombre d'images ajoutables ?", a: "Aucune limite fixe côté outil — ajoutez autant d'images que nécessaire, chacune jusqu'à 100 MB, les gros lots prenant simplement un peu plus de temps." },
    ],
  },

  pdf2jpg: {
    title: "PDF to JPG Converter — Export PDF Pages as Images",
    frTitle: "Convertisseur PDF en JPG — Exporter les Pages PDF en Images",
    what: "Converting a PDF to JPG turns each page of the document into a standalone image file. This is useful when you need to drop a single page into a slideshow, post it on social media, embed it in a website, or share a page with someone who just wants a quick image rather than opening a PDF viewer.",
    frWhat: "Convertir un PDF en JPG transforme chaque page du document en fichier image autonome. Utile pour insérer une seule page dans un diaporama, la publier sur les réseaux sociaux, l'intégrer à un site web, ou la partager avec quelqu'un qui préfère une image rapide plutôt qu'ouvrir un lecteur PDF.",
    how: "Upload your PDF and choose an image quality — Standard, High, or Print (3×) — which controls the resolution of the exported images. The tool renders each page and downloads it as a separate JPG file, so a 5-page PDF produces 5 individual image files.",
    frHow: "Importez votre PDF et choisissez une qualité d'image — Standard, Haute ou Impression (3×) — qui contrôle la résolution des images exportées. L'outil génère chaque page et la télécharge en fichier JPG séparé, donc un PDF de 5 pages produit 5 fichiers image individuels.",
    examples: [
      { label: "Share one slide", input: "page 4 of a slideshow PDF", result: "→ page-4.jpg ready to post" },
      { label: "Print-quality export", input: "poster.pdf, \"Print (3×)\" quality", result: "→ high-resolution JPGs for printing" },
      { label: "Multi-page export", input: "6-page brochure.pdf", result: "→ 6 separate JPG files" },
    ],
    frExamples: [
      { label: "Partager une diapositive", input: "page 4 d'un PDF de présentation", result: "→ page-4.jpg prête à publier" },
      { label: "Export qualité impression", input: "affiche.pdf, qualité « Impression (3×) »", result: "→ JPG haute résolution pour l'impression" },
      { label: "Export multi-pages", input: "brochure.pdf de 6 pages", result: "→ 6 fichiers JPG séparés" },
    ],
    faq: [
      { q: "Do I get one image per page, or one image for the whole PDF?", a: "One JPG per page — a 10-page PDF exports as 10 separate image files, each downloaded individually." },
      { q: "What does the quality setting change?", a: "It controls the resolution (scale) of the exported images — higher settings produce sharper, larger images better suited for printing, while Standard is enough for screen viewing." },
      { q: "Can I export just one page instead of the whole document?", a: "The tool currently exports every page of the uploaded PDF; if you only need one page, use the Split tool first to pull that page out, then convert it." },
      { q: "Will text in the PDF still be selectable in the JPG?", a: "No — converting to JPG turns each page into a flat image, so any text becomes part of the picture and is no longer selectable or searchable." },
    ],
    frFaq: [
      { q: "Est-ce que j'obtiens une image par page ou une seule pour tout le PDF ?", a: "Une JPG par page — un PDF de 10 pages exporte 10 fichiers image séparés, téléchargés individuellement." },
      { q: "Que change le réglage de qualité ?", a: "Il contrôle la résolution (échelle) des images exportées — les réglages élevés donnent des images plus nettes et plus grandes, adaptées à l'impression, tandis que Standard suffit pour un affichage écran." },
      { q: "Puis-je exporter une seule page plutôt que tout le document ?", a: "L'outil exporte actuellement toutes les pages du PDF importé ; pour une seule page, utilisez d'abord l'outil Diviser pour l'extraire, puis convertissez-la." },
      { q: "Le texte du PDF restera-t-il sélectionnable dans le JPG ?", a: "Non — la conversion en JPG transforme chaque page en image plate, donc tout texte devient partie de l'image et n'est plus sélectionnable ni indexable." },
    ],
  },

  pdf2word: {
    title: "PDF to Word Converter — Extract Text as a .doc File",
    frTitle: "Convertisseur PDF en Word — Extraire le Texte en Fichier .doc",
    what: "PDF to Word extracts the readable text from a PDF and saves it as a .doc file you can open and edit in Microsoft Word or Google Docs. It's a quick way to reuse text from a PDF — pulling a paragraph into a new document, editing a contract clause, or repurposing content — without retyping everything by hand.",
    frWhat: "PDF en Word extrait le texte lisible d'un PDF et l'enregistre en fichier .doc modifiable dans Microsoft Word ou Google Docs. Une façon rapide de réutiliser le texte d'un PDF — reprendre un paragraphe dans un nouveau document, modifier une clause de contrat, ou réutiliser du contenu — sans tout retaper à la main.",
    how: "Upload your PDF and the tool reads the text content page by page, reconstructing paragraph order based on each line's position, then packages it into a .doc file that downloads automatically. Because it works purely from text positions, this extracts words and sentences reliably but not the original page design.",
    frHow: "Importez votre PDF et l'outil lit le contenu textuel page par page, en reconstruisant l'ordre des paragraphes selon la position de chaque ligne, puis l'assemble en fichier .doc téléchargé automatiquement. Comme il se base uniquement sur la position du texte, il extrait fiablement les mots et phrases, mais pas la mise en page d'origine.",
    examples: [
      { label: "Reuse report text", input: "12-page report.pdf", result: "→ report.doc, editable in Word" },
      { label: "Pull a contract clause", input: "single-page agreement.pdf", result: "→ text ready to copy into a new doc" },
      { label: "Multi-page extraction", input: "30-page thesis chapter", result: "→ full text in one .doc file" },
    ],
    frExamples: [
      { label: "Réutiliser le texte d'un rapport", input: "rapport.pdf de 12 pages", result: "→ rapport.doc, modifiable dans Word" },
      { label: "Extraire une clause de contrat", input: "accord.pdf d'une page", result: "→ texte prêt à copier dans un nouveau doc" },
      { label: "Extraction multi-pages", input: "chapitre de thèse de 30 pages", result: "→ texte complet dans un fichier .doc" },
    ],
    faq: [
      { q: "Will the original formatting, images, and fonts be preserved?", a: "No — this tool extracts text only. Layout, images, custom fonts, and tables are not preserved; if you need the exact original design, this isn't the right tool." },
      { q: "Does it work on scanned PDFs (images of text)?", a: "No — it reads actual text data embedded in the PDF. A scanned page that's really just a photo of text has no extractable text layer, so nothing will be pulled from it." },
      { q: "Why is the paragraph order sometimes slightly off?", a: "The tool reconstructs reading order from each line's position on the page. Complex layouts like multi-column text or sidebars can occasionally be reordered differently than the original visual flow." },
      { q: "What format does the downloaded file use?", a: "It downloads as a .doc file, which opens directly in Microsoft Word, Google Docs, LibreOffice, and most other word processors." },
    ],
    frFaq: [
      { q: "La mise en page, les images et les polices d'origine sont-elles conservées ?", a: "Non — cet outil extrait uniquement le texte. La mise en page, les images, les polices personnalisées et les tableaux ne sont pas conservés ; pour le design exact d'origine, ce n'est pas le bon outil." },
      { q: "Fonctionne-t-il sur des PDF scannés (images de texte) ?", a: "Non — il lit les données textuelles réellement intégrées au PDF. Une page scannée qui n'est qu'une photo de texte n'a pas de couche de texte extractible, donc rien n'en sera tiré." },
      { q: "Pourquoi l'ordre des paragraphes est-il parfois légèrement décalé ?", a: "L'outil reconstruit l'ordre de lecture à partir de la position de chaque ligne sur la page. Les mises en page complexes (texte multi-colonnes, encadrés) peuvent occasionnellement être réordonnées différemment du flux visuel d'origine." },
      { q: "Quel format utilise le fichier téléchargé ?", a: "Il se télécharge en fichier .doc, qui s'ouvre directement dans Microsoft Word, Google Docs, LibreOffice et la plupart des autres traitements de texte." },
    ],
  },

  pdf2excel: {
    title: "PDF to Excel Converter — Extract Tables as a CSV File",
    frTitle: "Convertisseur PDF en Excel — Extraire les Tableaux en Fichier CSV",
    what: "PDF to Excel pulls tabular data out of a PDF and saves it as a CSV file, which opens directly in Excel, Google Sheets, or any spreadsheet program. It's built for turning PDF-locked tables — invoices, price lists, exported reports — into rows and columns you can actually sort, filter, and calculate with.",
    frWhat: "PDF en Excel extrait les données tabulaires d'un PDF et les enregistre en fichier CSV, qui s'ouvre directement dans Excel, Google Sheets ou tout tableur. Conçu pour transformer des tableaux enfermés dans un PDF — factures, listes de prix, rapports exportés — en lignes et colonnes que vous pouvez réellement trier, filtrer et calculer.",
    how: "Upload your PDF and the tool scans each page's text, grouping items that share the same vertical position into rows and ordering them left to right into columns, then writes the result as CSV rows — one file for the whole document, with a page marker between sections when the PDF has more than one page.",
    frHow: "Importez votre PDF et l'outil analyse le texte de chaque page, regroupe les éléments partageant la même position verticale en lignes et les ordonne de gauche à droite en colonnes, puis écrit le résultat en lignes CSV — un seul fichier pour tout le document, avec un repère de page entre les sections si le PDF compte plusieurs pages.",
    examples: [
      { label: "Extract an invoice table", input: "invoice.pdf with a line-item table", result: "→ invoice.csv, opens in Excel" },
      { label: "Price list to spreadsheet", input: "3-page pricing.pdf", result: "→ one CSV with all rows" },
      { label: "Exported report data", input: "sales-report.pdf", result: "→ sortable, filterable CSV rows" },
    ],
    frExamples: [
      { label: "Extraire un tableau de facture", input: "facture.pdf avec un tableau de lignes", result: "→ facture.csv, s'ouvre dans Excel" },
      { label: "Liste de prix vers tableur", input: "tarifs.pdf de 3 pages", result: "→ un seul CSV avec toutes les lignes" },
      { label: "Données d'un rapport exporté", input: "rapport-ventes.pdf", result: "→ lignes CSV triables et filtrables" },
    ],
    faq: [
      { q: "Does it work on any table layout?", a: "It works best on tables with clear rows and columns aligned in a grid. Very irregular layouts, merged cells, or tables that span awkwardly across a page break can extract less cleanly." },
      { q: "Why is the output a CSV instead of a .xlsx file?", a: "CSV is a simple, universal format that Excel, Google Sheets, and every spreadsheet tool open natively without any extra conversion step — it keeps the tool fast and dependency-free." },
      { q: "Does it work on scanned PDFs?", a: "No — like the Word converter, it reads text data embedded in the PDF. A scanned image of a table has no extractable text layer, so nothing can be pulled from it." },
      { q: "What happens with multi-page PDFs?", a: "Every page is processed and appended to the same CSV file, with a page marker row inserted between each page's data so you can tell where one page's table ends and the next begins." },
    ],
    frFaq: [
      { q: "Fonctionne-t-il sur n'importe quelle mise en page de tableau ?", a: "Il fonctionne mieux sur des tableaux aux lignes et colonnes clairement alignées en grille. Les mises en page très irrégulières, cellules fusionnées, ou tableaux qui débordent maladroitement sur un saut de page s'extraient moins proprement." },
      { q: "Pourquoi le résultat est-il un CSV plutôt qu'un fichier .xlsx ?", a: "Le CSV est un format simple et universel qu'Excel, Google Sheets et tout tableur ouvrent nativement sans étape de conversion supplémentaire — cela garde l'outil rapide et sans dépendance." },
      { q: "Fonctionne-t-il sur des PDF scannés ?", a: "Non — comme le convertisseur Word, il lit les données textuelles intégrées au PDF. Une image scannée d'un tableau n'a pas de couche de texte extractible, donc rien ne peut en être tiré." },
      { q: "Que se passe-t-il avec les PDF multi-pages ?", a: "Chaque page est traitée et ajoutée au même fichier CSV, avec une ligne de repère de page insérée entre les données de chaque page pour distinguer où finit le tableau d'une page et où commence le suivant." },
    ],
  },

};
