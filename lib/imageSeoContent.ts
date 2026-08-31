// ── lib/imageSeoContent.ts ───────────────────────────────────
// Content lalindalina (what/how/examples/faq) ho an'ny tool 16 ao
// anatin'ny IMAGE_HUB (components/image/ImageHub.tsx), mba tsy ho
// "fiche vide" isaky ny tab — mitovy endrika amin'ny
// lib/networkSeoContent.ts ampiasain'ny NET_HUB sy lib/pdfSeoContent.ts
// ampiasain'ny PDF_HUB.
//
// Ny "key" ao amin'ity dictionnaire ity dia MITOVY amin'ny "id" ao
// amin'ny FAMILIES (SubTool.id) an'ny ImageHub.tsx: compress, resize,
// base64, convert, crop, flip, removemetadata, exifviewer,
// screenshotredact, bgremove, watermark, passportphoto, favicon,
// upscale, colorpicker, paletteextractor.

export interface ImageSeoExample {
  label: string
  input: string
  result: string
}

export interface ImageSeoFaq {
  q: string
  a: string
}

export interface ImageSeoEntry {
  title: string
  frTitle: string
  what: string
  frWhat: string
  how: string
  frHow: string
  examples: ImageSeoExample[]
  frExamples: ImageSeoExample[]
  faq: ImageSeoFaq[]
  frFaq: ImageSeoFaq[]
}

export const IMAGE_SEO_CONTENT: Record<string, ImageSeoEntry> = {

  compress: {
    title: "Compress Image Online — Reduce File Size Free",
    frTitle: "Compresser une Image en Ligne — Réduire la Taille Gratuitement",
    what: "Image compression shrinks a photo's file size while keeping it visually close to the original, so it loads faster on a website, attaches easily to an email, or takes up less storage. It matters most for JPG and PNG photos straight out of a camera or phone, which are often far larger than a web page actually needs.",
    frWhat: "La compression d'image réduit la taille d'un fichier tout en gardant une apparence proche de l'original, pour un chargement plus rapide sur un site, un envoi facile par email, ou moins d'espace de stockage. Surtout utile pour les photos JPG et PNG issues d'un appareil ou d'un téléphone, souvent bien plus lourdes que nécessaire pour le web.",
    how: "Drop in one or more images and choose a quality level. The tool re-encodes each image at that quality, optionally strips EXIF metadata, and shows the before/after size for every file before you download — one at a time or all together as a ZIP.",
    frHow: "Déposez une ou plusieurs images et choisissez un niveau de qualité. L'outil ré-encode chaque image à ce niveau, retire en option les métadonnées EXIF, et affiche la taille avant/après pour chaque fichier avant le téléchargement — un par un ou tous ensemble en ZIP.",
    examples: [
      { label: "Website hero image", input: "photo.jpg, 4.2 MB", result: "→ ~800 KB at 80% quality" },
      { label: "Batch of product photos", input: "12 JPGs, 3-6 MB each", result: "→ all compressed, ZIP download" },
      { label: "Email attachment", input: "9 MB scan", result: "→ under 2 MB, quick to send" },
    ],
    frExamples: [
      { label: "Image principale d'un site", input: "photo.jpg, 4.2 MB", result: "→ ~800 KB à 80% de qualité" },
      { label: "Lot de photos produit", input: "12 JPG, 3-6 MB chacune", result: "→ toutes compressées, ZIP" },
      { label: "Pièce jointe email", input: "scan de 9 MB", result: "→ moins de 2 MB, envoi rapide" },
    ],
    faq: [
      { q: "Will compressing reduce visual quality?", a: "At Medium and Low compression the difference is usually invisible to the eye. Higher compression trades more visible detail for a smaller file — the tool shows a live size estimate so you can find the balance you want." },
      { q: "What's the difference between compression and resizing?", a: "Compression keeps the same pixel dimensions but encodes the image more efficiently. Resizing actually reduces the width and height. Use the Resize tool if you need smaller dimensions, not just a smaller file." },
      { q: "Does removing EXIF data affect the image itself?", a: "No — EXIF is metadata (camera model, GPS location, date) stored alongside the pixels. Removing it only strips that hidden information; the visible image is unchanged." },
      { q: "Can I compress many images at once?", a: "Yes — add as many as you like, set one quality level, and compress them all in one pass, then download individually or as a single ZIP." },
    ],
    frFaq: [
      { q: "La compression réduit-elle la qualité visuelle ?", a: "Avec une compression Moyenne ou Légère, la différence est généralement invisible à l'œil. Une compression plus forte échange plus de détail visible contre un fichier plus léger — l'outil affiche une estimation en direct pour trouver le bon équilibre." },
      { q: "Quelle différence entre compression et redimensionnement ?", a: "La compression garde les mêmes dimensions en pixels mais encode l'image plus efficacement. Le redimensionnement réduit réellement la largeur et la hauteur. Utilisez l'outil Redimensionner si vous avez besoin de dimensions plus petites, pas seulement d'un fichier plus léger." },
      { q: "Retirer les données EXIF affecte-t-il l'image elle-même ?", a: "Non — l'EXIF est une métadonnée (modèle d'appareil, position GPS, date) stockée à côté des pixels. La retirer supprime seulement ces informations cachées ; l'image visible reste inchangée." },
      { q: "Puis-je compresser plusieurs images à la fois ?", a: "Oui — ajoutez-en autant que vous voulez, réglez un niveau de qualité, compressez-les toutes en une passe, puis téléchargez individuellement ou en un seul ZIP." },
    ],
  },

  resize: {
    title: "Resize Image Online — Change Dimensions Free",
    frTitle: "Redimensionner une Image en Ligne — Changer les Dimensions Gratuitement",
    what: "Resizing an image changes its actual pixel width and height — shrinking a huge camera photo down for the web, or fitting a picture into an exact size a platform requires, like a social media cover photo or a product listing thumbnail.",
    frWhat: "Redimensionner une image change réellement sa largeur et sa hauteur en pixels — réduire une grande photo d'appareil pour le web, ou ajuster une image à une taille exacte exigée par une plateforme, comme une photo de couverture ou une miniature de fiche produit.",
    how: "Upload an image, then pick a preset size or type custom dimensions. Choose how it should fit — cover (fills the frame, cropping overflow), contain (fits inside with letterboxing), or stretch — and the tool renders the result on a canvas and gives you a download.",
    frHow: "Importez une image, puis choisissez une taille prédéfinie ou tapez des dimensions personnalisées. Choisissez le mode d'ajustement — cover (remplit le cadre, recadre le surplus), contain (s'insère avec des bandes) ou étirer — et l'outil génère le résultat sur un canvas prêt à télécharger.",
    examples: [
      { label: "Social media cover", input: "photo.jpg → 1200×630", result: "→ resized-1200x630.jpg" },
      { label: "Square thumbnail", input: "product.png → 500×500, cover", result: "→ cropped to fill exactly" },
      { label: "Custom dimensions", input: "800×450 custom", result: "→ resized-800x450.jpg" },
    ],
    frExamples: [
      { label: "Couverture réseau social", input: "photo.jpg → 1200×630", result: "→ resized-1200x630.jpg" },
      { label: "Miniature carrée", input: "produit.png → 500×500, cover", result: "→ recadrée pour remplir exactement" },
      { label: "Dimensions personnalisées", input: "800×450 custom", result: "→ resized-800x450.jpg" },
    ],
    faq: [
      { q: "What's the difference between \"cover\" and \"contain\"?", a: "Cover fills the entire target size, cropping whatever doesn't fit — no empty space, but some edges may be trimmed. Contain fits the whole image inside the target size, adding a background color where space is left over — nothing is cropped." },
      { q: "Will resizing to a larger size improve quality?", a: "No — enlarging an image beyond its original pixel dimensions doesn't add real detail, it just stretches existing pixels, which can look soft or blocky. Resizing works best when shrinking down from a larger original." },
      { q: "Can I use my own exact dimensions instead of a preset?", a: "Yes — enter any custom width and height in pixels and the tool applies your chosen fit mode to those exact dimensions." },
      { q: "What file format is the result?", a: "The resized image downloads as a JPG. If you need a different output format, use the Convert tool afterward." },
    ],
    frFaq: [
      { q: "Quelle différence entre « cover » et « contain » ?", a: "Cover remplit toute la taille cible en recadrant ce qui dépasse — pas d'espace vide, mais certains bords peuvent être coupés. Contain insère l'image entière dans la taille cible en ajoutant une couleur de fond dans l'espace restant — rien n'est recadré." },
      { q: "Redimensionner en plus grand améliore-t-il la qualité ?", a: "Non — agrandir une image au-delà de ses dimensions d'origine n'ajoute pas de détail réel, cela étire les pixels existants, ce qui peut paraître flou ou pixelisé. Le redimensionnement fonctionne mieux pour réduire une image plus grande." },
      { q: "Puis-je utiliser mes propres dimensions plutôt qu'un préréglage ?", a: "Oui — entrez une largeur et une hauteur personnalisées en pixels, l'outil applique le mode d'ajustement choisi à ces dimensions exactes." },
      { q: "Quel format de fichier obtient-on ?", a: "L'image redimensionnée se télécharge en JPG. Pour un autre format de sortie, utilisez ensuite l'outil Convertir." },
    ],
  },

  base64: {
    title: "Image to Base64 Converter — Get a Data URI Free",
    frTitle: "Convertisseur Image en Base64 — Obtenir un Data URI Gratuitement",
    what: "Converting an image to Base64 turns its raw bytes into a text string that can be embedded directly inside HTML or CSS, instead of linking to a separate image file. It's handy for small icons, inline email images, or any case where bundling the image into the code itself avoids an extra network request.",
    frWhat: "Convertir une image en Base64 transforme ses octets bruts en une chaîne de texte intégrable directement dans du HTML ou du CSS, au lieu de lier un fichier image séparé. Pratique pour de petites icônes, des images inline dans un email, ou tout cas où intégrer l'image dans le code évite une requête réseau supplémentaire.",
    how: "Upload an image and the tool reads it as a Data URI, then gives you four ready-to-use formats: the full Data URI, the raw Base64 string, an HTML <img> tag, and a CSS background-image rule — each with a one-click copy button.",
    frHow: "Importez une image et l'outil la lit en Data URI, puis fournit quatre formats prêts à l'emploi : le Data URI complet, la chaîne Base64 brute, une balise HTML <img>, et une règle CSS background-image — chacun avec un bouton de copie en un clic.",
    examples: [
      { label: "Small icon for CSS", input: "icon.png, 2 KB", result: "→ background-image: url(\"data:image/png;base64,...\")" },
      { label: "Inline email logo", input: "logo.jpg", result: "→ <img src=\"data:image/jpeg;base64,...\" />" },
      { label: "Raw string for an API", input: "photo.png", result: "→ Base64 string, no data: prefix" },
    ],
    frExamples: [
      { label: "Petite icône pour CSS", input: "icon.png, 2 KB", result: "→ background-image: url(\"data:image/png;base64,...\")" },
      { label: "Logo email inline", input: "logo.jpg", result: "→ <img src=\"data:image/jpeg;base64,...\" />" },
      { label: "Chaîne brute pour une API", input: "photo.png", result: "→ chaîne Base64, sans préfixe data:" },
    ],
    faq: [
      { q: "Does Base64 encoding make the file larger?", a: "Yes, roughly 33% larger than the original binary file, since Base64 represents binary data as text. That trade-off is usually worth it only for small images where avoiding an extra request matters more than the size increase." },
      { q: "When should I use Base64 instead of a regular image link?", a: "It's best for small, frequently-reused assets like icons or logos in CSS/email, not for large photos — a regular image file with proper caching is more efficient for anything sizeable." },
      { q: "What's the difference between the \"Data URI\" and \"Base64 only\" options?", a: "The Data URI includes the `data:image/...;base64,` prefix needed to use it directly in a browser or `src` attribute. \"Base64 only\" is just the raw encoded string, useful when a prefix isn't wanted, like for an API payload." },
      { q: "Is the encoding done on a server?", a: "No — the file is read and encoded entirely in your browser using the FileReader API. The image is never uploaded anywhere." },
    ],
    frFaq: [
      { q: "L'encodage Base64 rend-il le fichier plus lourd ?", a: "Oui, environ 33% plus lourd que le fichier binaire original, car le Base64 représente les données binaires en texte. Ce compromis vaut généralement le coup seulement pour de petites images où éviter une requête compte plus que l'augmentation de taille." },
      { q: "Quand utiliser le Base64 plutôt qu'un lien image classique ?", a: "C'est idéal pour de petits éléments réutilisés souvent, comme des icônes ou logos en CSS/email, pas pour de grandes photos — un fichier image classique avec une bonne mise en cache est plus efficace pour tout ce qui est volumineux." },
      { q: "Quelle différence entre « Data URI » et « Base64 only » ?", a: "Le Data URI inclut le préfixe `data:image/...;base64,` nécessaire pour l'utiliser directement dans un navigateur ou un attribut `src`. « Base64 only » est juste la chaîne encodée brute, utile quand le préfixe n'est pas voulu, comme pour une charge utile d'API." },
      { q: "L'encodage se fait-il sur un serveur ?", a: "Non — le fichier est lu et encodé entièrement dans votre navigateur via l'API FileReader. L'image n'est jamais envoyée nulle part." },
    ],
  },

  convert: {
    title: "Image Format Converter — JPG, PNG, WEBP, AVIF Free",
    frTitle: "Convertisseur de Format d'Image — JPG, PNG, WEBP, AVIF Gratuit",
    what: "Converting an image's format changes how its pixels are encoded — from PNG to the smaller JPG, from an older format to modern WEBP or AVIF for faster websites, or the reverse when a tool or platform only accepts a specific format.",
    frWhat: "Convertir le format d'une image change la façon dont ses pixels sont encodés — de PNG vers le JPG plus léger, d'un format ancien vers le WEBP ou l'AVIF modernes pour des sites plus rapides, ou l'inverse quand un outil ou une plateforme n'accepte qu'un format précis.",
    how: "Add one or more images, pick the target format — JPG, PNG, WEBP, or AVIF — and convert. Each image is re-encoded in your browser and downloads individually or as a ZIP for multiple files.",
    frHow: "Ajoutez une ou plusieurs images, choisissez le format cible — JPG, PNG, WEBP ou AVIF — et convertissez. Chaque image est ré-encodée dans votre navigateur et se télécharge individuellement ou en ZIP pour plusieurs fichiers.",
    examples: [
      { label: "PNG to JPG for smaller size", input: "screenshot.png", result: "→ screenshot.jpg, much smaller" },
      { label: "Modernize for the web", input: "photo.jpg → WEBP", result: "→ photo.webp, faster loading" },
      { label: "Batch conversion", input: "8 mixed images → PNG", result: "→ 8 PNGs, ZIP download" },
    ],
    frExamples: [
      { label: "PNG vers JPG pour alléger", input: "capture.png", result: "→ capture.jpg, bien plus léger" },
      { label: "Moderniser pour le web", input: "photo.jpg → WEBP", result: "→ photo.webp, chargement plus rapide" },
      { label: "Conversion par lot", input: "8 images mixtes → PNG", result: "→ 8 PNG, téléchargement ZIP" },
    ],
    faq: [
      { q: "Which format should I choose for the web?", a: "WEBP typically gives the best balance of quality and file size for most photos and is supported by all modern browsers. AVIF compresses even further but takes slightly longer to encode. Use JPG for maximum compatibility with older systems." },
      { q: "Will converting PNG to JPG lose transparency?", a: "Yes — JPG doesn't support transparency, so any transparent areas in a PNG become a solid color (usually white) when converted to JPG. Convert to WEBP or PNG instead if you need to keep transparency." },
      { q: "Does converting reduce image quality?", a: "Converting between lossy formats (like PNG to JPG) can introduce slight compression artifacts, similar to the Compress tool. Converting to a lossless format keeps quality intact but may not reduce file size much." },
      { q: "Can I convert multiple images to different formats at once?", a: "All images in one batch convert to the same target format. To convert different images to different formats, run separate batches — one per target format." },
    ],
    frFaq: [
      { q: "Quel format choisir pour le web ?", a: "Le WEBP offre généralement le meilleur équilibre qualité/taille pour la plupart des photos et est supporté par tous les navigateurs modernes. L'AVIF compresse encore plus mais prend un peu plus de temps à encoder. Utilisez le JPG pour une compatibilité maximale avec les systèmes plus anciens." },
      { q: "Convertir un PNG en JPG fait-il perdre la transparence ?", a: "Oui — le JPG ne supporte pas la transparence, donc les zones transparentes d'un PNG deviennent une couleur unie (généralement blanche) une fois converties en JPG. Convertissez plutôt en WEBP ou PNG pour garder la transparence." },
      { q: "La conversion réduit-elle la qualité de l'image ?", a: "Convertir entre formats avec perte (comme PNG vers JPG) peut introduire de légers artefacts de compression, similaire à l'outil Compresser. Convertir vers un format sans perte garde la qualité intacte mais réduit peu la taille du fichier." },
      { q: "Puis-je convertir plusieurs images vers des formats différents en une fois ?", a: "Toutes les images d'un même lot convertissent vers le même format cible. Pour convertir des images différentes vers des formats différents, lancez des lots séparés — un par format cible." },
    ],
  },

  crop: {
    title: "Crop Image Online — Cut to Any Area Free",
    frTitle: "Recadrer une Image en Ligne — Découper Toute Zone Gratuitement",
    what: "Cropping an image removes everything outside a selected rectangle, keeping only the part you want. It's the tool for cutting out a subject from a busy background, removing unwanted edges from a photo, or isolating one section of a larger scan or screenshot.",
    frWhat: "Recadrer une image supprime tout ce qui est en dehors d'un rectangle sélectionné, ne gardant que la partie voulue. C'est l'outil pour extraire un sujet d'un arrière-plan chargé, retirer des bords indésirables d'une photo, ou isoler une section d'un grand scan ou d'une capture d'écran.",
    how: "Upload an image, then click and drag directly on it to draw the selection rectangle you want to keep. Adjust the selection as needed, then apply — the tool crops exactly that area at full original resolution and gives you a download.",
    frHow: "Importez une image, puis cliquez-glissez directement dessus pour dessiner le rectangle de sélection à garder. Ajustez la sélection si besoin, puis appliquez — l'outil recadre exactement cette zone à pleine résolution d'origine et propose le téléchargement.",
    examples: [
      { label: "Isolate a subject", input: "group-photo.jpg, select one person", result: "→ cropped.png, just that person" },
      { label: "Remove a border", input: "scan.jpg, select inner area", result: "→ cropped.png, no border" },
      { label: "Crop a screenshot section", input: "screenshot.png, select a widget", result: "→ cropped.png, that section only" },
    ],
    frExamples: [
      { label: "Isoler un sujet", input: "photo-groupe.jpg, sélection d'une personne", result: "→ cropped.png, juste cette personne" },
      { label: "Retirer une bordure", input: "scan.jpg, sélection de la zone intérieure", result: "→ cropped.png, sans bordure" },
      { label: "Recadrer une capture d'écran", input: "capture.png, sélection d'un widget", result: "→ cropped.png, cette section seule" },
    ],
    faq: [
      { q: "Does cropping reduce the resolution of the kept area?", a: "No — the cropped area is extracted at its original pixel resolution, it's simply smaller in overall dimensions because the rest of the image is removed." },
      { q: "Can I adjust my selection before applying the crop?", a: "Yes — draw a new selection at any time before clicking Apply Crop, or clear the current one and start over." },
      { q: "What file format does the cropped image download as?", a: "PNG, which preserves quality losslessly and supports transparency if the source image had any." },
      { q: "Is there a minimum crop size?", a: "The selection needs to be at least a few pixels in both directions — the Apply Crop button stays disabled until you've drawn a large enough selection." },
    ],
    frFaq: [
      { q: "Le recadrage réduit-il la résolution de la zone gardée ?", a: "Non — la zone recadrée est extraite à sa résolution d'origine en pixels, elle est simplement plus petite en dimensions globales puisque le reste de l'image est retiré." },
      { q: "Puis-je ajuster ma sélection avant de recadrer ?", a: "Oui — dessinez une nouvelle sélection à tout moment avant de cliquer sur Appliquer, ou effacez la sélection actuelle pour recommencer." },
      { q: "Quel format de fichier obtient l'image recadrée ?", a: "PNG, qui préserve la qualité sans perte et supporte la transparence si l'image source en avait." },
      { q: "Y a-t-il une taille minimale de recadrage ?", a: "La sélection doit faire au moins quelques pixels dans chaque direction — le bouton Appliquer reste désactivé tant qu'une sélection assez grande n'a pas été dessinée." },
    ],
  },

  flip: {
    title: "Flip or Rotate Image Online — Mirror & Rotate Free",
    frTitle: "Retourner ou Pivoter une Image en Ligne — Miroir et Rotation Gratuit",
    what: "Flipping mirrors an image horizontally or vertically, and rotating turns it by 90°, 180°, or 270°. Together these fix a photo taken sideways, mirror a scanned image that came out backwards, or simply adjust the orientation of any picture before using it elsewhere.",
    frWhat: "Retourner met une image en miroir horizontalement ou verticalement, et pivoter la tourne de 90°, 180° ou 270°. Ensemble, ces outils corrigent une photo prise de travers, mettent en miroir un scan inversé, ou ajustent simplement l'orientation d'une image avant de l'utiliser ailleurs.",
    how: "Upload an image, then toggle horizontal or vertical flip and pick a rotation angle. The tool redraws the image on a canvas with those transforms applied and updates the preview instantly — download once you're happy with the result.",
    frHow: "Importez une image, puis activez le retournement horizontal ou vertical et choisissez un angle de rotation. L'outil redessine l'image sur un canvas avec ces transformations appliquées et met à jour l'aperçu instantanément — téléchargez une fois satisfait du résultat.",
    examples: [
      { label: "Fix a sideways photo", input: "photo.jpg, rotate 90°", result: "→ upright orientation" },
      { label: "Mirror a scanned image", input: "scan.png, flip horizontal", result: "→ correctly mirrored" },
      { label: "Upside-down fix", input: "photo.jpg, rotate 180°", result: "→ right-side up" },
    ],
    frExamples: [
      { label: "Corriger une photo de travers", input: "photo.jpg, rotation 90°", result: "→ orientation droite" },
      { label: "Mettre en miroir un scan", input: "scan.png, miroir horizontal", result: "→ correctement inversé" },
      { label: "Corriger une image à l'envers", input: "photo.jpg, rotation 180°", result: "→ à l'endroit" },
    ],
    faq: [
      { q: "Can I flip and rotate at the same time?", a: "Yes — flip horizontal, flip vertical, and rotation can all be combined, and the preview updates live as you toggle each one." },
      { q: "Does flipping or rotating reduce image quality?", a: "No — these are lossless pixel transforms, not re-compression. The output keeps the same resolution and visual quality as the original." },
      { q: "What's the difference between flip and rotate?", a: "Flip mirrors the image like a reflection (left-right or top-bottom swap). Rotate turns the whole image around its center by a fixed angle without mirroring anything." },
      { q: "What format does the result download as?", a: "PNG, to keep the transformation lossless regardless of the original file format." },
    ],
    frFaq: [
      { q: "Puis-je retourner et pivoter en même temps ?", a: "Oui — le miroir horizontal, le miroir vertical et la rotation peuvent tous se combiner, et l'aperçu se met à jour en direct à chaque changement." },
      { q: "Le retournement ou la rotation réduisent-ils la qualité ?", a: "Non — ce sont des transformations de pixels sans perte, pas une recompression. Le résultat garde la même résolution et qualité visuelle que l'original." },
      { q: "Quelle différence entre retourner et pivoter ?", a: "Retourner met l'image en miroir (inversion gauche-droite ou haut-bas). Pivoter tourne toute l'image autour de son centre selon un angle fixe, sans rien mettre en miroir." },
      { q: "Dans quel format le résultat se télécharge-t-il ?", a: "PNG, pour garder la transformation sans perte quel que soit le format d'origine." },
    ],
  },

  removemetadata: {
    title: "Remove Image Metadata — Strip EXIF, GPS & Camera Data Free",
    frTitle: "Supprimer les Métadonnées d'une Image — Retirer EXIF, GPS et Appareil Gratuitement",
    what: "Photos often carry hidden metadata — GPS coordinates of where they were taken, the camera or phone model, the exact date and time, sometimes even the software used to edit them. Removing this metadata strips that hidden information before you share a photo publicly, protecting your location and device details.",
    frWhat: "Les photos contiennent souvent des métadonnées cachées — coordonnées GPS du lieu de prise de vue, modèle d'appareil ou de téléphone, date et heure exactes, parfois même le logiciel utilisé pour les retoucher. Retirer ces métadonnées supprime ces informations cachées avant de partager une photo publiquement, protégeant votre position et votre appareil.",
    how: "Upload an image and the tool shows a preview of what metadata is typically present, then redraws the image onto a canvas — a process that inherently drops all embedded metadata — and gives you a clean copy to download.",
    frHow: "Importez une image, l'outil affiche un aperçu des métadonnées généralement présentes, puis redessine l'image sur un canvas — un procédé qui supprime intrinsèquement toutes les métadonnées intégrées — et fournit une copie propre à télécharger.",
    examples: [
      { label: "Before sharing a vacation photo", input: "IMG_2024.jpg with GPS data", result: "→ IMG_2024-clean.jpg, no location" },
      { label: "Selling an item online", input: "product-photo.jpg", result: "→ clean copy, no device info" },
      { label: "Publishing to a blog", input: "photo.png", result: "→ metadata-free version" },
    ],
    frExamples: [
      { label: "Avant de partager une photo de vacances", input: "IMG_2024.jpg avec données GPS", result: "→ IMG_2024-clean.jpg, sans localisation" },
      { label: "Vendre un objet en ligne", input: "photo-produit.jpg", result: "→ copie propre, sans info appareil" },
      { label: "Publier sur un blog", input: "photo.png", result: "→ version sans métadonnées" },
    ],
    faq: [
      { q: "Does removing metadata change how the image looks?", a: "No — only the hidden metadata is removed. The visible pixels, colors, and quality of the image stay exactly the same." },
      { q: "What kind of metadata gets removed?", a: "Camera make and model, GPS location, date and time taken, orientation flags, and any other EXIF fields embedded by the camera or editing software." },
      { q: "Why does redrawing on a canvas remove metadata?", a: "A canvas only stores the pixel data of an image, not the original file's metadata fields — so exporting a new image from a canvas produces a clean file by nature, without special metadata-stripping code needed." },
      { q: "Is this safe to use before posting photos publicly?", a: "Yes, it's exactly the kind of situation this tool is built for — stripping location and device metadata before a photo goes somewhere public reduces what strangers can learn from the file itself." },
    ],
    frFaq: [
      { q: "Retirer les métadonnées change-t-il l'apparence de l'image ?", a: "Non — seules les métadonnées cachées sont retirées. Les pixels, couleurs et qualité visibles de l'image restent exactement les mêmes." },
      { q: "Quel type de métadonnées est retiré ?", a: "Marque et modèle d'appareil, position GPS, date et heure de prise de vue, indicateurs d'orientation, et tout autre champ EXIF intégré par l'appareil ou le logiciel de retouche." },
      { q: "Pourquoi redessiner sur un canvas retire-t-il les métadonnées ?", a: "Un canvas ne stocke que les données de pixels d'une image, pas les champs de métadonnées du fichier d'origine — exporter une nouvelle image depuis un canvas produit donc naturellement un fichier propre, sans code spécial de suppression nécessaire." },
      { q: "Est-ce sûr avant de publier des photos publiquement ?", a: "Oui, c'est exactement le genre de situation pour laquelle cet outil est conçu — retirer la localisation et les métadonnées d'appareil avant qu'une photo aille quelque part de public réduit ce que des inconnus peuvent apprendre du fichier lui-même." },
    ],
  },

  exifviewer: {
    title: "EXIF Viewer — Inspect Image Metadata Free",
    frTitle: "Visionneuse EXIF — Inspecter les Métadonnées d'une Image Gratuitement",
    what: "An EXIF viewer reads and displays the metadata embedded in an image file — its dimensions, file size, type, and the date it was last modified — so you can see exactly what information a photo carries before deciding whether to share it or strip it out.",
    frWhat: "Une visionneuse EXIF lit et affiche les métadonnées intégrées dans un fichier image — ses dimensions, sa taille, son type, et la date de dernière modification — pour voir exactement quelles informations une photo contient avant de décider de la partager ou de les retirer.",
    how: "Upload an image and the tool immediately reads its file properties and pixel dimensions, displaying them in a simple readable list — no processing or upload to a server, everything happens by reading the file locally.",
    frHow: "Importez une image et l'outil lit immédiatement ses propriétés de fichier et ses dimensions en pixels, les affichant dans une liste simple et lisible — aucun traitement ni envoi vers un serveur, tout se fait en lisant le fichier localement.",
    examples: [
      { label: "Check dimensions before uploading", input: "photo.jpg", result: "→ 4032 × 3024 px, 3.8 MB" },
      { label: "Verify file type", input: "unknown-file.jpg", result: "→ confirms image/jpeg" },
      { label: "Check last modified date", input: "old-scan.png", result: "→ shows the file's modification date" },
    ],
    frExamples: [
      { label: "Vérifier les dimensions avant upload", input: "photo.jpg", result: "→ 4032 × 3024 px, 3.8 MB" },
      { label: "Vérifier le type de fichier", input: "fichier-inconnu.jpg", result: "→ confirme image/jpeg" },
      { label: "Vérifier la date de modification", input: "vieux-scan.png", result: "→ affiche la date de modification du fichier" },
    ],
    faq: [
      { q: "Does this tool show GPS location and camera model?", a: "It reads the file's core properties — name, size, dimensions, type, and modification date. For removing sensitive fields like GPS and camera info before sharing, use the Remove Metadata tool." },
      { q: "Why would a corrupted file show 0×0 dimensions?", a: "If the file can't be decoded as a valid image, its dimensions can't be read — a 0×0 result usually means the file is corrupted or isn't actually a supported image format." },
      { q: "Is any of this information sent anywhere?", a: "No — the file is read entirely in your browser. Nothing about the image or its metadata is uploaded or transmitted." },
      { q: "Can I view metadata for multiple images at once?", a: "The tool inspects one image at a time — upload a new one to replace the current view." },
    ],
    frFaq: [
      { q: "Cet outil affiche-t-il la position GPS et le modèle d'appareil ?", a: "Il lit les propriétés principales du fichier — nom, taille, dimensions, type et date de modification. Pour retirer des champs sensibles comme le GPS ou l'appareil avant de partager, utilisez l'outil Supprimer les Métadonnées." },
      { q: "Pourquoi un fichier corrompu afficherait-il des dimensions 0×0 ?", a: "Si le fichier ne peut pas être décodé comme une image valide, ses dimensions ne peuvent pas être lues — un résultat 0×0 signifie généralement que le fichier est corrompu ou n'est pas réellement un format d'image supporté." },
      { q: "Ces informations sont-elles envoyées quelque part ?", a: "Non — le fichier est lu entièrement dans votre navigateur. Rien concernant l'image ou ses métadonnées n'est envoyé ni transmis." },
      { q: "Puis-je voir les métadonnées de plusieurs images à la fois ?", a: "L'outil inspecte une image à la fois — importez-en une nouvelle pour remplacer la vue actuelle." },
    ],
  },

  screenshotredact: {
    title: "Screenshot Redact — Blur or Black Out Sensitive Info Free",
    frTitle: "Flouter une Capture d'Écran — Cacher les Infos Sensibles Gratuitement",
    what: "Redacting a screenshot hides sensitive parts of it — an email address, an account number, a name — before you share it publicly, in a bug report, or in documentation, without needing to retake or manually edit the screenshot in another program.",
    frWhat: "Flouter une capture d'écran cache les parties sensibles — une adresse email, un numéro de compte, un nom — avant de la partager publiquement, dans un rapport de bug, ou dans une documentation, sans avoir à reprendre la capture ou la retoucher dans un autre logiciel.",
    how: "Upload a screenshot, choose a redaction mode — blur, pixelate, or solid blackout — then click and drag to draw a box over each area to hide. Add as many boxes as needed, then apply to bake the redaction permanently into the image.",
    frHow: "Importez une capture d'écran, choisissez un mode — flou, pixelisation ou cache opaque — puis cliquez-glissez pour dessiner un cadre sur chaque zone à masquer. Ajoutez autant de cadres que nécessaire, puis appliquez pour intégrer le masquage définitivement dans l'image.",
    examples: [
      { label: "Hide an email address", input: "inbox-screenshot.png, blackout mode", result: "→ email replaced with black box" },
      { label: "Blur a name in a chat", input: "chat.png, blur mode", result: "→ name softly blurred" },
      { label: "Pixelate an account number", input: "dashboard.png, pixelate mode", result: "→ number pixelated, unreadable" },
    ],
    frExamples: [
      { label: "Cacher une adresse email", input: "capture-boite-mail.png, mode cache opaque", result: "→ email remplacé par un rectangle noir" },
      { label: "Flouter un nom dans un chat", input: "chat.png, mode flou", result: "→ nom légèrement flouté" },
      { label: "Pixeliser un numéro de compte", input: "dashboard.png, mode pixelisation", result: "→ numéro pixelisé, illisible" },
    ],
    faq: [
      { q: "Is the redaction permanent, or can it be reversed?", a: "Once applied, the redaction is baked directly into the downloaded image's pixels — there's no way to recover the original content from the redacted file, which is exactly the point for sharing safely." },
      { q: "Which redaction mode is most secure?", a: "Solid blackout is the most secure since it completely replaces the pixels with black. Blur and pixelate can theoretically be partially reversible for very simple content (like large plain text) with specialized tools, so blackout is the safer choice for highly sensitive information." },
      { q: "Can I redact multiple areas on the same screenshot?", a: "Yes — draw as many redaction boxes as needed before clicking Apply; all of them are baked in together." },
      { q: "Can I undo a redaction box after drawing it?", a: "You can start a fresh selection before applying, but once you click Apply Redact, the changes are final in the downloaded file — keep your original screenshot if you might need to redact it differently later." },
    ],
    frFaq: [
      { q: "Le masquage est-il permanent, ou peut-il être annulé ?", a: "Une fois appliqué, le masquage est intégré directement dans les pixels de l'image téléchargée — impossible de récupérer le contenu original depuis le fichier masqué, ce qui est exactement le but pour un partage sûr." },
      { q: "Quel mode de masquage est le plus sécurisé ?", a: "Le cache opaque est le plus sûr puisqu'il remplace complètement les pixels par du noir. Le flou et la pixelisation peuvent théoriquement être partiellement réversibles pour un contenu très simple (comme du grand texte) avec des outils spécialisés, donc le cache opaque est le choix le plus sûr pour des informations très sensibles." },
      { q: "Puis-je masquer plusieurs zones sur la même capture ?", a: "Oui — dessinez autant de cadres de masquage que nécessaire avant de cliquer sur Appliquer ; ils sont tous intégrés ensemble." },
      { q: "Puis-je annuler un cadre après l'avoir dessiné ?", a: "Vous pouvez recommencer une sélection avant d'appliquer, mais une fois sur Appliquer, les changements sont définitifs dans le fichier téléchargé — gardez votre capture d'origine si vous devrez peut-être la masquer différemment plus tard." },
    ],
  },

  bgremove: {
    title: "Remove Image Background — AI Background Removal",
    frTitle: "Supprimer l'Arrière-Plan d'une Image — Suppression par IA",
    what: "Background removal isolates the main subject of a photo — a person, a product, a logo — from everything behind it, leaving a transparent background. It's the standard step for product photos on a white or transparent background, profile pictures, or any image that needs to sit cleanly on top of another design.",
    frWhat: "La suppression d'arrière-plan isole le sujet principal d'une photo — une personne, un produit, un logo — de tout ce qui l'entoure, laissant un fond transparent. C'est l'étape standard pour des photos produit sur fond blanc ou transparent, des photos de profil, ou toute image devant s'intégrer proprement sur un autre design.",
    how: "This tool is coming in a future update — accurate background removal needs an AI model running in the browser, which CHRONOS is still integrating. In the meantime, the Screenshot Redact and Crop tools can help isolate parts of an image manually.",
    frHow: "Cet outil arrive dans une prochaine mise à jour — une suppression d'arrière-plan précise nécessite un modèle d'IA fonctionnant dans le navigateur, que CHRONOS est encore en train d'intégrer. En attendant, les outils Flouter une capture et Recadrer peuvent aider à isoler manuellement une partie d'une image.",
    examples: [],
    frExamples: [],
    faq: [
      { q: "When will background removal be available?", a: "It's planned for a future CHRONOS update once AI-powered background removal can run reliably in the browser without needing to upload images to a server." },
      { q: "Is there a way to remove a background manually in the meantime?", a: "The Crop tool can isolate a rectangular area, and image editing outside CHRONOS is currently needed for precise, irregular background removal until this feature ships." },
    ],
    frFaq: [
      { q: "Quand la suppression d'arrière-plan sera-t-elle disponible ?", a: "Elle est prévue pour une future mise à jour de CHRONOS, une fois que la suppression d'arrière-plan par IA pourra fonctionner de façon fiable dans le navigateur sans avoir besoin d'envoyer les images à un serveur." },
      { q: "Existe-t-il un moyen de le faire manuellement en attendant ?", a: "L'outil Recadrer peut isoler une zone rectangulaire ; une retouche en dehors de CHRONOS est actuellement nécessaire pour une suppression précise et irrégulière de l'arrière-plan tant que cette fonctionnalité n'est pas disponible." },
    ],
  },

  watermark: {
    title: "Add a Watermark to an Image — Text Watermark Free",
    frTitle: "Ajouter un Filigrane à une Image — Filigrane Texte Gratuit",
    what: "A watermark overlays text onto an image — a copyright notice, a website name, a signature — to identify who owns a photo or discourage unauthorized use, commonly seen on stock photos, portfolio work, and social media posts.",
    frWhat: "Un filigrane superpose du texte sur une image — une mention de copyright, un nom de site, une signature — pour identifier le propriétaire d'une photo ou décourager une utilisation non autorisée, courant sur les photos de stock, les portfolios et les publications sur les réseaux sociaux.",
    how: "Upload an image, type your watermark text, then adjust its position, size, color, and opacity. The preview updates live as you change each setting, and once it looks right, download the watermarked image.",
    frHow: "Importez une image, tapez votre texte de filigrane, puis ajustez sa position, sa taille, sa couleur et son opacité. L'aperçu se met à jour en direct à chaque réglage, et une fois satisfait, téléchargez l'image avec le filigrane.",
    examples: [
      { label: "Copyright notice", input: "photo.jpg, \"© 2026 Studio Name\", bottom-right", result: "→ watermarked.png" },
      { label: "Website branding", input: "portfolio-piece.jpg, \"yoursite.com\"", result: "→ subtle branded watermark" },
      { label: "Draft stamp", input: "design.png, \"DRAFT\", center, 40% opacity", result: "→ visible draft overlay" },
    ],
    frExamples: [
      { label: "Mention de copyright", input: "photo.jpg, « © 2026 Studio Name », bas-droite", result: "→ watermarked.png" },
      { label: "Image de marque du site", input: "portfolio.jpg, « votresite.com »", result: "→ filigrane discret" },
      { label: "Tampon brouillon", input: "design.png, « DRAFT », centre, opacité 40%", result: "→ overlay brouillon visible" },
    ],
    faq: [
      { q: "Can I change the watermark's color and opacity?", a: "Yes — pick any color and set opacity from fully transparent to fully solid, so the watermark can be subtle or prominent depending on your needs." },
      { q: "Where can the watermark be positioned?", a: "Choose from common positions like each corner or the center, so the text sits wherever fits best without covering the important part of the image." },
      { q: "Does the watermark reduce the image's original quality?", a: "No — the base image is drawn onto the canvas unchanged, only the text is added on top. The download is a PNG that preserves full quality." },
      { q: "Can I use an image logo instead of text?", a: "This tool currently supports text watermarks only. For a logo overlay, that would need to be composited using image editing software outside CHRONOS." },
    ],
    frFaq: [
      { q: "Puis-je changer la couleur et l'opacité du filigrane ?", a: "Oui — choisissez n'importe quelle couleur et réglez l'opacité de totalement transparent à totalement opaque, pour un filigrane discret ou marqué selon vos besoins." },
      { q: "Où le filigrane peut-il être positionné ?", a: "Choisissez parmi des positions courantes comme chaque coin ou le centre, pour que le texte soit placé là où il gêne le moins la partie importante de l'image." },
      { q: "Le filigrane réduit-il la qualité d'origine de l'image ?", a: "Non — l'image de base est dessinée sur le canvas sans changement, seul le texte est ajouté par-dessus. Le téléchargement est un PNG qui préserve la pleine qualité." },
      { q: "Puis-je utiliser un logo image plutôt que du texte ?", a: "Cet outil supporte actuellement uniquement les filigranes texte. Pour un logo en overlay, il faudrait le composer avec un logiciel de retouche en dehors de CHRONOS." },
    ],
  },

  passportphoto: {
    title: "Passport & ID Photo Maker — Correct Size Free",
    frTitle: "Générateur de Photo d'Identité et Passeport — Taille Correcte Gratuit",
    what: "Passport and ID photos need exact dimensions and a plain background to be accepted by official agencies. This tool crops and positions a photo to standard formats — passport, visa, ID card — and lays out multiple copies on one printable sheet, so it's ready to print at home or at a photo shop.",
    frWhat: "Les photos de passeport et d'identité doivent respecter des dimensions exactes et un fond uni pour être acceptées par les organismes officiels. Cet outil recadre et positionne une photo selon des formats standards — passeport, visa, carte d'identité — et dispose plusieurs copies sur une feuille imprimable, prête à imprimer chez soi ou en photo-shop.",
    how: "Upload a photo, pick the target document format, and choose a background color. The tool crops and centers the photo to the exact required dimensions, then arranges multiple copies on a single sheet, ready to download and print.",
    frHow: "Importez une photo, choisissez le format de document cible, et une couleur de fond. L'outil recadre et centre la photo aux dimensions exactes requises, puis dispose plusieurs copies sur une seule feuille, prête à télécharger et imprimer.",
    examples: [
      { label: "US Passport photo", input: "selfie.jpg, US Passport 2×2in, white bg", result: "→ sheet with multiple copies" },
      { label: "EU ID card photo", input: "photo.jpg, EU ID format, blue bg", result: "→ correctly sized sheet" },
      { label: "Visa application photo", input: "portrait.jpg, visa format", result: "→ ready-to-print sheet" },
    ],
    frExamples: [
      { label: "Photo passeport US", input: "selfie.jpg, US Passport 2×2in, fond blanc", result: "→ feuille avec plusieurs copies" },
      { label: "Photo carte d'identité UE", input: "photo.jpg, format UE, fond bleu", result: "→ feuille aux bonnes dimensions" },
      { label: "Photo pour visa", input: "portrait.jpg, format visa", result: "→ feuille prête à imprimer" },
    ],
    faq: [
      { q: "Will the photo meet official passport requirements?", a: "The tool handles dimensions and background color correctly, but official requirements also cover things like facial expression, lighting, and head positioning, which are the photographer's (or your) responsibility to get right before uploading." },
      { q: "Can I choose a background color other than the presets?", a: "Yes — alongside the common preset colors (white, blue, etc. depending on the format), a custom color picker is available for specific document requirements." },
      { q: "How many copies fit on one sheet?", a: "This depends on the selected format — the tool automatically lays out as many copies as reasonably fit on a standard sheet, arranged in a simple grid." },
      { q: "What if my photo's background isn't already plain?", a: "The tool crops and adds a background-colored canvas, but it doesn't remove an existing background from behind you — a plain-background source photo gives the cleanest result." },
    ],
    frFaq: [
      { q: "La photo respectera-t-elle les exigences officielles de passeport ?", a: "L'outil gère correctement les dimensions et la couleur de fond, mais les exigences officielles couvrent aussi l'expression du visage, l'éclairage et le positionnement de la tête, qui restent à votre charge (ou celle du photographe) avant l'import." },
      { q: "Puis-je choisir une couleur de fond autre que les préréglages ?", a: "Oui — en plus des couleurs prédéfinies courantes (blanc, bleu, etc. selon le format), un sélecteur de couleur personnalisée est disponible pour des exigences spécifiques." },
      { q: "Combien de copies tiennent sur une feuille ?", a: "Cela dépend du format sélectionné — l'outil dispose automatiquement autant de copies que raisonnablement possible sur une feuille standard, en grille simple." },
      { q: "Et si le fond de ma photo n'est pas déjà uni ?", a: "L'outil recadre et ajoute un canvas de la couleur de fond choisie, mais ne retire pas un arrière-plan existant derrière vous — une photo source à fond uni donne le meilleur résultat." },
    ],
  },

  favicon: {
    title: "Favicon Generator — All Sizes from One Logo Free",
    frTitle: "Générateur de Favicon — Toutes les Tailles à Partir d'un Logo Gratuit",
    what: "A favicon is the small icon shown in a browser tab, bookmarks, and home screen shortcuts. Different platforms and contexts need different exact pixel sizes — this tool takes one logo and generates every size a website typically needs in one pass.",
    frWhat: "Un favicon est la petite icône affichée dans un onglet de navigateur, les favoris, et les raccourcis d'écran d'accueil. Différentes plateformes et contextes ont besoin de tailles de pixels exactes différentes — cet outil prend un logo et génère en une fois toutes les tailles habituellement nécessaires pour un site.",
    how: "Upload a logo or square image, and the tool automatically renders it at every standard favicon size — browser tab, Apple touch icon, Android icon, and more — showing a preview of each, with a download-all option and the HTML snippet needed to reference them.",
    frHow: "Importez un logo ou une image carrée, l'outil le génère automatiquement à chaque taille standard de favicon — onglet navigateur, icône Apple touch, icône Android, et plus — avec un aperçu de chacune, une option pour tout télécharger, et le code HTML nécessaire pour les référencer.",
    examples: [
      { label: "Website favicon set", input: "logo.png, 512×512", result: "→ 16px, 32px, 180px, 192px + more" },
      { label: "Apple touch icon", input: "logo.png", result: "→ 180×180 PNG for iOS home screen" },
      { label: "Android home screen icon", input: "logo.png", result: "→ 192×192 and 512×512 PNGs" },
    ],
    frExamples: [
      { label: "Jeu de favicons pour un site", input: "logo.png, 512×512", result: "→ 16px, 32px, 180px, 192px + plus" },
      { label: "Icône Apple touch", input: "logo.png", result: "→ PNG 180×180 pour écran d'accueil iOS" },
      { label: "Icône écran d'accueil Android", input: "logo.png", result: "→ PNG 192×192 et 512×512" },
    ],
    faq: [
      { q: "What source image works best?", a: "A square logo with at least 512×512 pixels gives the sharpest results at every generated size — a low-resolution or non-square source will look blurry or stretched once scaled down." },
      { q: "How do I actually add these to my website?", a: "Download all the generated files, add them to your site's root folder, then paste the provided HTML snippet into your page's <head> section to reference each size correctly." },
      { q: "Do I need every size that's generated?", a: "Most sites only strictly need the standard browser favicon and the Apple touch icon; the rest cover specific platforms (Android home screen, Windows tiles) and are worth including for full compatibility but aren't mandatory." },
      { q: "Can I generate a favicon from a non-square image?", a: "The image will be cropped or stretched to fit each square size — for the cleanest result, start from an already-square source image." },
    ],
    frFaq: [
      { q: "Quelle image source fonctionne le mieux ?", a: "Un logo carré d'au moins 512×512 pixels donne les résultats les plus nets à chaque taille générée — une source basse résolution ou non carrée paraîtra floue ou étirée une fois réduite." },
      { q: "Comment ajouter ces fichiers à mon site ?", a: "Téléchargez tous les fichiers générés, ajoutez-les au dossier racine de votre site, puis collez le code HTML fourni dans la section <head> de votre page pour référencer chaque taille correctement." },
      { q: "Ai-je besoin de toutes les tailles générées ?", a: "La plupart des sites n'ont strictement besoin que du favicon navigateur standard et de l'icône Apple touch ; le reste couvre des plateformes spécifiques (écran d'accueil Android, tuiles Windows) et vaut la peine d'être inclus pour une compatibilité complète, sans être obligatoire." },
      { q: "Puis-je générer un favicon depuis une image non carrée ?", a: "L'image sera recadrée ou étirée pour s'adapter à chaque taille carrée — pour le résultat le plus propre, partez d'une image source déjà carrée." },
    ],
  },

  upscale: {
    title: "AI Image Upscaler — 2× and 4× Resolution",
    frTitle: "Agrandisseur d'Image par IA — Résolution 2× et 4×",
    what: "AI upscaling increases an image's resolution — making it 2× or 4× larger — while using a trained model to reconstruct plausible detail, rather than simply stretching pixels like a basic resize. It's built for enlarging low-resolution photos, old scans, or small web images without the blurriness a simple resize would produce.",
    frWhat: "L'agrandissement par IA augmente la résolution d'une image — la rendant 2× ou 4× plus grande — en utilisant un modèle entraîné pour reconstruire un détail plausible, plutôt que de simplement étirer les pixels comme un redimensionnement basique. Conçu pour agrandir des photos basse résolution, de vieux scans, ou de petites images web sans le flou qu'un redimensionnement simple produirait.",
    how: "This tool is coming in a future update, using the Real-ESRGAN model running directly in the browser. In the meantime, the Resize tool can enlarge an image using standard interpolation, though without AI-reconstructed detail.",
    frHow: "Cet outil arrive dans une prochaine mise à jour, utilisant le modèle Real-ESRGAN fonctionnant directement dans le navigateur. En attendant, l'outil Redimensionner peut agrandir une image par interpolation standard, sans le détail reconstruit par IA.",
    examples: [],
    frExamples: [],
    faq: [
      { q: "When will AI upscaling be available?", a: "It's planned for a future CHRONOS update once the Real-ESRGAN model can run efficiently in the browser without a server round-trip." },
      { q: "How is AI upscaling different from just resizing larger?", a: "A standard resize stretches existing pixels using interpolation, which looks soft at large enlargement factors. AI upscaling uses a model trained on real images to plausibly reconstruct texture and edges, producing a sharper result." },
    ],
    frFaq: [
      { q: "Quand l'agrandissement par IA sera-t-il disponible ?", a: "Il est prévu pour une future mise à jour de CHRONOS, une fois que le modèle Real-ESRGAN pourra fonctionner efficacement dans le navigateur sans aller-retour serveur." },
      { q: "En quoi l'agrandissement IA diffère-t-il d'un simple redimensionnement ?", a: "Un redimensionnement standard étire les pixels existants par interpolation, ce qui paraît flou à fort facteur d'agrandissement. L'agrandissement par IA utilise un modèle entraîné sur des images réelles pour reconstruire textures et contours de façon plausible, donnant un résultat plus net." },
    ],
  },

  colorpicker: {
    title: "Color Picker from Image — Get Any Pixel's Hex Code Free",
    frTitle: "Pipette à Couleur depuis une Image — Obtenir le Code Hex de Tout Pixel Gratuit",
    what: "A color picker reads the exact color of any pixel in an image and gives you its hex and RGB codes — useful for matching a brand color from a logo, sampling a shade from a photo for a design, or figuring out exactly what color something is.",
    frWhat: "Une pipette à couleur lit la couleur exacte de tout pixel d'une image et donne ses codes hex et RGB — utile pour reproduire la couleur d'une marque depuis un logo, échantillonner une teinte d'une photo pour un design, ou déterminer exactement la couleur de quelque chose.",
    how: "Upload an image, then click anywhere on it — the tool reads the pixel's color at that exact point and shows its hex and RGB values, ready to copy. Each pick is added to a history strip so you can compare several colors from the same image.",
    frHow: "Importez une image, puis cliquez n'importe où dessus — l'outil lit la couleur du pixel à ce point exact et affiche ses valeurs hex et RGB, prêtes à copier. Chaque couleur choisie s'ajoute à un historique pour comparer plusieurs couleurs de la même image.",
    examples: [
      { label: "Match a brand color", input: "logo.png, click the main color", result: "→ #f59e0b, rgb(245, 158, 11)" },
      { label: "Sample a photo's sky color", input: "landscape.jpg, click the sky", result: "→ #7ec8e3" },
      { label: "Compare multiple shades", input: "design.png, click 4 different areas", result: "→ 4 colors saved to history" },
    ],
    frExamples: [
      { label: "Reproduire une couleur de marque", input: "logo.png, cliquer la couleur principale", result: "→ #f59e0b, rgb(245, 158, 11)" },
      { label: "Échantillonner la couleur du ciel", input: "paysage.jpg, cliquer le ciel", result: "→ #7ec8e3" },
      { label: "Comparer plusieurs teintes", input: "design.png, cliquer 4 zones différentes", result: "→ 4 couleurs enregistrées dans l'historique" },
    ],
    faq: [
      { q: "How accurate is the color reading?", a: "It reads the exact pixel value at the clicked position, so it's as accurate as the image itself — though a heavily compressed JPG may have slightly shifted colors from the original due to lossy compression artifacts." },
      { q: "What formats are given for the picked color?", a: "Both hex (like #f59e0b) and RGB (like rgb(245, 158, 11)) are shown together, covering the two most common formats used in design tools and CSS." },
      { q: "Does the history save colors between sessions?", a: "No — the color history only lasts for the current image and browsing session; it clears once you load a new image or leave the page." },
      { q: "Can I pick colors from a very small or detailed area?", a: "Yes, since the tool reads individual pixels — for very fine detail, zooming into that part of the image beforehand (e.g. by cropping it first) makes precise picking easier." },
    ],
    frFaq: [
      { q: "Quelle est la précision de la lecture de couleur ?", a: "Elle lit la valeur exacte du pixel à la position cliquée, donc c'est aussi précis que l'image elle-même — bien qu'un JPG fortement compressé puisse avoir des couleurs légèrement décalées de l'original à cause des artefacts de compression avec perte." },
      { q: "Quels formats sont donnés pour la couleur choisie ?", a: "Le hex (comme #f59e0b) et le RGB (comme rgb(245, 158, 11)) sont affichés ensemble, couvrant les deux formats les plus courants utilisés en design et en CSS." },
      { q: "L'historique sauvegarde-t-il les couleurs entre les sessions ?", a: "Non — l'historique de couleurs ne dure que pour l'image et la session de navigation en cours ; il se réinitialise en chargeant une nouvelle image ou en quittant la page." },
      { q: "Puis-je choisir des couleurs dans une zone très petite ou détaillée ?", a: "Oui, puisque l'outil lit des pixels individuels — pour un détail très fin, zoomer sur cette partie de l'image au préalable (par exemple en la recadrant d'abord) facilite un choix précis." },
    ],
  },

  paletteextractor: {
    title: "Color Palette Extractor — Dominant Colors from an Image Free",
    frTitle: "Extracteur de Palette de Couleurs — Couleurs Dominantes d'une Image Gratuit",
    what: "A palette extractor analyzes an entire image and picks out its most dominant colors, giving a quick color palette that summarizes the image's overall look — useful for building a design around a photo, checking brand color consistency, or getting inspiration from an image's color scheme.",
    frWhat: "Un extracteur de palette analyse une image entière et en tire les couleurs les plus dominantes, donnant une palette rapide qui résume l'apparence globale de l'image — utile pour construire un design autour d'une photo, vérifier la cohérence de couleurs de marque, ou s'inspirer du schéma de couleurs d'une image.",
    how: "Upload an image and choose how many colors to extract — the tool analyzes pixel colors across the whole image, groups similar shades together, and returns the most common distinct colors as swatches with their hex codes, ready to copy.",
    frHow: "Importez une image et choisissez combien de couleurs extraire — l'outil analyse les couleurs des pixels sur toute l'image, regroupe les teintes similaires, et renvoie les couleurs distinctes les plus fréquentes en nuanciers avec leurs codes hex, prêts à copier.",
    examples: [
      { label: "Extract a photo's palette", input: "sunset.jpg, 6 colors", result: "→ 6 hex swatches, warm tones" },
      { label: "Brand palette check", input: "logo-sheet.png, 8 colors", result: "→ dominant brand colors listed" },
      { label: "Design inspiration", input: "artwork.jpg, 10 colors", result: "→ 10-color palette to build from" },
    ],
    frExamples: [
      { label: "Extraire la palette d'une photo", input: "coucher-soleil.jpg, 6 couleurs", result: "→ 6 nuanciers hex, tons chauds" },
      { label: "Vérification palette de marque", input: "feuille-logo.png, 8 couleurs", result: "→ couleurs de marque dominantes listées" },
      { label: "Inspiration design", input: "illustration.jpg, 10 couleurs", result: "→ palette de 10 couleurs comme base" },
    ],
    faq: [
      { q: "How many colors can I extract?", a: "Choose between 4, 6, 8, or 10 colors — fewer colors gives a broader summary of the image's overall tone, more colors captures finer variation." },
      { q: "Are the extracted colors exact pixel values or averaged?", a: "The tool groups similar colors together into buckets and picks the most frequent ones, so extracted swatches represent common color regions rather than one single exact pixel — for an exact single pixel's color, use the Color Picker tool instead." },
      { q: "Can I copy the palette colors directly?", a: "Yes — click any swatch to copy its hex code to your clipboard, ready to paste into a design tool or CSS." },
      { q: "Why might two similar-looking colors both appear in the palette?", a: "The tool de-duplicates colors that are very close to each other, but genuinely distinct shades that a person might perceive as similar can still both qualify as separate dominant colors in the image." },
    ],
    frFaq: [
      { q: "Combien de couleurs puis-je extraire ?", a: "Choisissez entre 4, 6, 8 ou 10 couleurs — moins de couleurs donne un résumé plus large du ton général de l'image, plus de couleurs capture des variations plus fines." },
      { q: "Les couleurs extraites sont-elles des pixels exacts ou des moyennes ?", a: "L'outil regroupe les couleurs similaires en groupes et choisit les plus fréquentes, donc les nuanciers extraits représentent des zones de couleur communes plutôt qu'un seul pixel exact — pour la couleur exacte d'un seul pixel, utilisez plutôt l'outil Pipette à Couleur." },
      { q: "Puis-je copier directement les couleurs de la palette ?", a: "Oui — cliquez sur un nuancier pour copier son code hex dans le presse-papiers, prêt à coller dans un outil de design ou en CSS." },
      { q: "Pourquoi deux couleurs qui se ressemblent apparaissent-elles toutes les deux ?", a: "L'outil dédoublonne les couleurs très proches entre elles, mais des teintes réellement distinctes qu'une personne pourrait percevoir comme similaires peuvent quand même compter comme deux couleurs dominantes séparées dans l'image." },
    ],
  },

};
