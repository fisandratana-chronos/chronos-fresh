// ── lib/seoContent.ts ─────────────────────────────────────
// Content lalindalina (what/how/formula/examples/faq) ho an'ny
// calculator tsirairay — nalaina TSY NIOVA avy amin'ny
// reference/Calculators/i18n-seo/seoContent.calculators.js (.js -> .ts,
// nomena "type" sy "export" ihany, tsy nisy teny novaina).
//
// Ampiasaina ao amin'ny:
//   - ToolSeoContent.tsx (ho an'ny pejy tokana: bmi-calculator,
//     mortgage-calculator, emi-calculator, calories-calculator)
//   - SmartCalcHub.tsx (ho an'ny panel active ao anaty hub "25-in-1")
//
// Ny "key" ao amin'ity dictionnaire ity (bmi, mortgage, emi, vat,
// discount, percentage, tip, age, calories, datediff, compound,
// randompick) dia MITOVY amin'ny "id" ao amin'ny PANEL_MAP an'ny
// SmartCalcHub.tsx -- fa TSY MITOVY amin'ny "slug" registryTools (ohatra
// "bmi-calculator"). Ilaina mapping fohy (jereo ny fampiasana azy).

export interface SeoContentExample {
  label: string
  input: string
  result: string
}

export interface SeoContentFaq {
  q: string
  a: string
}

export interface SeoContentEntry {
  title: string
  frTitle: string
  what: string
  frWhat: string
  how: string
  frHow: string
  formula?: { expr: string; note: string }
  frFormula?: { expr: string; note: string }
  examples: SeoContentExample[]
  frExamples: SeoContentExample[]
  faq: SeoContentFaq[]
  frFaq: SeoContentFaq[]
}

export const SEO_CONTENT: Record<string, SeoContentEntry> = {
  bmi: {
    title: "BMI Calculator — Body Mass Index",
    frTitle: "Calculateur d'IMC — Indice de Masse Corporelle",
    what: "Body Mass Index (BMI) is a numerical value calculated from a person's weight and height. It is widely used by doctors and health organizations as a screening tool to categorize whether a person is underweight, normal weight, overweight, or obese. While BMI does not directly measure body fat, research has shown it correlates well with more direct measures of body fat and is a practical tool for population-level health assessment. The World Health Organization (WHO) uses BMI as a standard metric in global health studies.",
    frWhat: "L'Indice de Masse Corporelle (IMC) est une valeur numérique calculée à partir du poids et de la taille d'une personne. Il est largement utilisé par les médecins et les organisations de santé comme outil de dépistage pour catégoriser si une personne est en sous-poids, poids normal, surpoids ou obèse. Bien que l'IMC ne mesure pas directement la graisse corporelle, les recherches montrent qu'il corrèle bien avec des mesures plus directes de la graisse corporelle et constitue un outil pratique pour l'évaluation de santé au niveau de la population. L'Organisation Mondiale de la Santé (OMS) utilise l'IMC comme indicateur standard dans les études de santé mondiales.",
    how: "BMI is calculated by dividing your weight in kilograms by the square of your height in meters. The result is a dimensionless number that falls into one of four standard categories: Underweight (below 18.5), Normal weight (18.5–24.9), Overweight (25–29.9), and Obese (30 and above). Note that BMI thresholds may vary slightly for different ethnic populations — for example, Asian health guidelines often use lower thresholds.",
    frHow: "L'IMC est calculé en divisant votre poids en kilogrammes par le carré de votre taille en mètres. Le résultat est un nombre sans dimension qui se situe dans l'une des quatre catégories standards : Sous-poids (en dessous de 18,5), Poids normal (18,5–24,9), Surpoids (25–29,9), et Obèse (30 et plus). Notez que les seuils d'IMC peuvent varier légèrement selon les populations ethniques — par exemple, les directives de santé asiatiques utilisent souvent des seuils plus bas.",
    formula: { expr: "BMI = weight (kg) ÷ height² (m)", note: "Example: 70 kg ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = 22.9" },
    frFormula: { expr: "IMC = poids (kg) ÷ taille² (m)", note: "Exemple : 70 kg ÷ (1,75 × 1,75) = 70 ÷ 3,0625 = 22,9" },
    examples: [
      { label: "Underweight", input: "50 kg, 175 cm", result: "BMI 16.3 — below 18.5" },
      { label: "Normal", input: "70 kg, 175 cm", result: "BMI 22.9 — healthy range" },
      { label: "Overweight", input: "90 kg, 175 cm", result: "BMI 29.4 — above 25" },
      { label: "Obese", input: "110 kg, 175 cm", result: "BMI 35.9 — above 30" },
    ],
    frExamples: [
      { label: "Sous-poids", input: "50 kg, 175 cm", result: "IMC 16,3 — en dessous de 18,5" },
      { label: "Normal", input: "70 kg, 175 cm", result: "IMC 22,9 — fourchette saine" },
      { label: "Surpoids", input: "90 kg, 175 cm", result: "IMC 29,4 — au-dessus de 25" },
      { label: "Obèse", input: "110 kg, 175 cm", result: "IMC 35,9 — au-dessus de 30" },
    ],
    faq: [
      { q: "Is BMI accurate for athletes?", a: "BMI can overestimate body fat in athletes who have high muscle mass. A bodybuilder may have a BMI in the 'overweight' range despite having very low body fat. For athletes, consider using body fat percentage measurements instead." },
      { q: "Should children use the same BMI scale?", a: "No. Children and teenagers use age- and sex-specific BMI percentiles (BMI-for-age). The standard adult BMI scale does not apply to people under 18." },
      { q: "What is a healthy BMI range?", a: "For most adults, a BMI between 18.5 and 24.9 is considered healthy. However, this is a general guideline — your doctor can provide a more nuanced assessment based on your overall health profile." },
      { q: "Can BMI predict health risks?", a: "High BMI is associated with increased risk of type 2 diabetes, cardiovascular disease, hypertension, and certain cancers. However, BMI is a screening tool, not a diagnostic one. Other factors like waist circumference, diet, and physical activity matter too." },
    ],
    frFaq: [
      { q: "L'IMC est-il précis pour les athlètes ?", a: "L'IMC peut surestimer la graisse corporelle chez les athlètes ayant une masse musculaire élevée. Un culturiste peut avoir un IMC dans la fourchette « surpoids » malgré un taux de graisse corporelle très bas. Pour les athlètes, il est préférable d'utiliser des mesures du pourcentage de graisse corporelle." },
      { q: "Les enfants doivent-ils utiliser la même échelle d'IMC ?", a: "Non. Les enfants et adolescents utilisent des percentiles d'IMC spécifiques à l'âge et au sexe (IMC-pour-âge). L'échelle d'IMC standard pour adultes ne s'applique pas aux personnes de moins de 18 ans." },
      { q: "Quelle est une fourchette d'IMC saine ?", a: "Pour la plupart des adultes, un IMC entre 18,5 et 24,9 est considéré comme sain. Cependant, ceci est une directive générale — votre médecin peut fournir une évaluation plus nuancée basée sur votre profil de santé global." },
      { q: "L'IMC peut-il prédire les risques pour la santé ?", a: "Un IMC élevé est associé à un risque accru de diabète de type 2, de maladies cardiovasculaires, d'hypertension et de certains cancers. Cependant, l'IMC est un outil de dépistage, pas un outil diagnostique. D'autres facteurs comme le tour de taille, l'alimentation et l'activité physique comptent aussi." },
    ],
  },

  mortgage: {
    title: "Mortgage Calculator — Monthly Payment & Interest",
    frTitle: "Calculateur d'Hypothèque — Paiement Mensuel et Intérêts",
    what: "A mortgage is a long-term loan used to purchase real estate, where the property itself serves as collateral. Understanding your monthly mortgage payment before signing is essential for financial planning. This calculator uses the standard amortization formula to compute your exact monthly payment, total interest paid over the life of the loan, and total amount repaid. Whether you are buying a home for the first time or refinancing, knowing these numbers helps you compare loan offers and budget accurately.",
    frWhat: "Une hypothèque est un prêt à long terme utilisé pour acheter un bien immobilier, le bien lui-même servant de garantie. Comprendre votre paiement hypothécaire mensuel avant de signer est essentiel pour bien planifier vos finances. Ce calculateur utilise la formule d'amortissement standard pour calculer votre paiement mensuel exact, le total des intérêts payés sur la durée du prêt, et le montant total remboursé. Que vous achetiez votre première maison ou que vous refinanciez, connaître ces chiffres vous aide à comparer les offres de prêt et à établir un budget précis.",
    how: "The calculator requires three inputs: the loan principal (amount borrowed), the annual interest rate, and the loan term in years. It divides the annual rate by 12 to get the monthly rate, converts the term to months, then applies the amortization formula. The result is a fixed monthly payment that covers both interest and principal repayment, structured so the loan is fully paid off at the end of the term.",
    frHow: "Le calculateur nécessite trois entrées : le capital emprunté (montant du prêt), le taux d'intérêt annuel et la durée du prêt en années. Il divise le taux annuel par 12 pour obtenir le taux mensuel, convertit la durée en mois, puis applique la formule d'amortissement. Le résultat est un paiement mensuel fixe qui couvre à la fois les intérêts et le remboursement du capital, structuré de sorte que le prêt soit entièrement remboursé à la fin de la durée.",
    formula: { expr: "M = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1]", note: "M = monthly payment, P = principal, r = monthly rate, n = total months" },
    frFormula: { expr: "M = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1]", note: "M = paiement mensuel, P = capital, r = taux mensuel, n = nombre total de mois" },
    examples: [
      { label: "Starter home", input: "$200,000 at 4% for 30 years", result: "$955/month — $143,739 total interest" },
      { label: "City apartment", input: "$350,000 at 3.5% for 25 years", result: "$1,752/month — $175,637 total interest" },
      { label: "Short term loan", input: "$150,000 at 5% for 15 years", result: "$1,186/month — $63,443 total interest" },
      { label: "Investment property", input: "$500,000 at 6% for 30 years", result: "$2,998/month — $579,191 total interest" },
    ],
    frExamples: [
      { label: "Première maison", input: "200 000 $ à 4 % sur 30 ans", result: "955 $/mois — 143 739 $ d'intérêts totaux" },
      { label: "Appartement en ville", input: "350 000 $ à 3,5 % sur 25 ans", result: "1 752 $/mois — 175 637 $ d'intérêts totaux" },
      { label: "Prêt à court terme", input: "150 000 $ à 5 % sur 15 ans", result: "1 186 $/mois — 63 443 $ d'intérêts totaux" },
      { label: "Bien locatif", input: "500 000 $ à 6 % sur 30 ans", result: "2 998 $/mois — 579 191 $ d'intérêts totaux" },
    ],
    faq: [
      { q: "What is included in a mortgage payment?", a: "Our calculator computes principal and interest only. In practice, your full monthly housing payment may also include property taxes, homeowner's insurance, and private mortgage insurance (PMI) if your down payment was under 20%." },
      { q: "What is the difference between fixed and variable rates?", a: "A fixed-rate mortgage keeps the same interest rate for the entire loan term, making payments predictable. A variable (adjustable) rate mortgage starts lower but can change periodically based on market indices, which affects your monthly payment." },
      { q: "How does a larger down payment affect my mortgage?", a: "A larger down payment reduces the loan principal, which lowers both your monthly payment and the total interest paid. It can also eliminate the need for PMI, further reducing costs." },
      { q: "Should I choose a 15-year or 30-year mortgage?", a: "A 15-year mortgage has higher monthly payments but you pay significantly less interest overall and build equity faster. A 30-year mortgage has lower monthly payments, giving you more cash flow flexibility, but you pay more interest over time." },
    ],
    frFaq: [
      { q: "Qu'est-ce qui est inclus dans un paiement hypothécaire ?", a: "Notre calculateur ne calcule que le capital et les intérêts. En pratique, votre paiement mensuel total peut aussi inclure les taxes foncières, l'assurance habitation, et l'assurance hypothécaire privée (PMI) si votre acompte était inférieur à 20 %." },
      { q: "Quelle est la différence entre taux fixe et variable ?", a: "Une hypothèque à taux fixe conserve le même taux d'intérêt pendant toute la durée du prêt, rendant les paiements prévisibles. Une hypothèque à taux variable commence plus bas mais peut changer périodiquement selon les indices du marché, ce qui affecte votre paiement mensuel." },
      { q: "Comment un acompte plus élevé affecte-t-il mon hypothèque ?", a: "Un acompte plus élevé réduit le capital emprunté, ce qui diminue à la fois votre paiement mensuel et le total des intérêts payés. Cela peut aussi éliminer le besoin de PMI, réduisant encore les coûts." },
      { q: "Dois-je choisir une hypothèque de 15 ou 30 ans ?", a: "Une hypothèque de 15 ans a des paiements mensuels plus élevés mais vous payez nettement moins d'intérêts au total et construisez votre capital plus vite. Une hypothèque de 30 ans a des paiements mensuels plus bas, offrant plus de flexibilité de trésorerie, mais vous payez plus d'intérêts au fil du temps." },
    ],
  },

  emi: {
    title: "EMI Calculator — Equated Monthly Installment",
    frTitle: "Calculateur EMI — Mensualité Constante",
    what: "An Equated Monthly Installment (EMI) is the fixed amount a borrower pays to a lender each month until the loan is fully repaid. EMIs are common for personal loans, car loans, home loans, and consumer financing. Each EMI comprises two components: the interest charged on the outstanding principal, and the portion that reduces the principal itself. Early in the loan, a larger share goes toward interest; over time, more goes toward principal — this is called loan amortization.",
    frWhat: "La mensualité constante (EMI) est le montant fixe qu'un emprunteur paie à un prêteur chaque mois jusqu'au remboursement complet du prêt. Les EMI sont courantes pour les prêts personnels, les prêts auto, les prêts immobiliers et le financement à la consommation. Chaque EMI comprend deux composantes : les intérêts facturés sur le capital restant dû, et la portion qui réduit le capital lui-même. En début de prêt, une plus grande part va aux intérêts ; avec le temps, une plus grande part va au capital — c'est ce qu'on appelle l'amortissement du prêt.",
    how: "Enter the loan principal, annual interest rate, and loan tenure in months. The calculator applies the standard EMI formula to give you the monthly installment, total amount payable, and total interest charged. This helps you compare loan offers from different banks and decide the optimal tenure for your budget.",
    frHow: "Saisissez le capital du prêt, le taux d'intérêt annuel et la durée du prêt en mois. Le calculateur applique la formule standard de l'EMI pour vous donner la mensualité, le montant total à payer et le total des intérêts facturés. Cela vous aide à comparer les offres de prêt de différentes banques et à choisir la durée optimale pour votre budget.",
    formula: { expr: "EMI = P × r × (1+r)ⁿ ÷ [(1+r)ⁿ − 1]", note: "r = monthly interest rate (annual rate ÷ 12 ÷ 100), n = tenure in months" },
    frFormula: { expr: "EMI = P × r × (1+r)ⁿ ÷ [(1+r)ⁿ − 1]", note: "r = taux d'intérêt mensuel (taux annuel ÷ 12 ÷ 100), n = durée en mois" },
    examples: [
      { label: "Personal loan", input: "$10,000 at 12% for 24 months", result: "$470/month — $1,279 total interest" },
      { label: "Car loan", input: "$25,000 at 8% for 60 months", result: "$507/month — $5,405 total interest" },
      { label: "Education loan", input: "$40,000 at 9% for 84 months", result: "$622/month — $12,270 total interest" },
    ],
    frExamples: [
      { label: "Prêt personnel", input: "10 000 $ à 12 % sur 24 mois", result: "470 $/mois — 1 279 $ d'intérêts totaux" },
      { label: "Prêt auto", input: "25 000 $ à 8 % sur 60 mois", result: "507 $/mois — 5 405 $ d'intérêts totaux" },
      { label: "Prêt étudiant", input: "40 000 $ à 9 % sur 84 mois", result: "622 $/mois — 12 270 $ d'intérêts totaux" },
    ],
    faq: [
      { q: "Can I reduce my EMI?", a: "Yes — you can make part-prepayments to reduce the outstanding principal, which lowers future EMIs or shortens the tenure. Some lenders charge a prepayment penalty, so check your loan terms." },
      { q: "What happens if I miss an EMI?", a: "Missing an EMI typically incurs a late fee and negatively impacts your credit score. Repeated defaults can lead to loan recovery action by the lender." },
      { q: "Is EMI the same as a mortgage payment?", a: "They work on the same amortization principle, but 'EMI' is the term commonly used in India and South Asia, while 'mortgage payment' is used in Western countries. The underlying math is identical." },
    ],
    frFaq: [
      { q: "Puis-je réduire mon EMI ?", a: "Oui — vous pouvez effectuer des remboursements anticipés partiels pour réduire le capital restant dû, ce qui diminue les EMI futurs ou raccourcit la durée. Certains prêteurs facturent une pénalité de remboursement anticipé, vérifiez donc les conditions de votre prêt." },
      { q: "Que se passe-t-il si je manque une EMI ?", a: "Manquer une EMI entraîne généralement des frais de retard et impacte négativement votre score de crédit. Des défauts répétés peuvent conduire à une action de recouvrement de la part du prêteur." },
      { q: "L'EMI est-elle la même chose qu'un paiement hypothécaire ?", a: "Ils fonctionnent selon le même principe d'amortissement, mais « EMI » est le terme couramment utilisé en Inde et en Asie du Sud, tandis que « paiement hypothécaire » est utilisé dans les pays occidentaux. Les mathématiques sous-jacentes sont identiques." },
    ],
  },

  vat: {
    title: "VAT Calculator — Add or Remove Value Added Tax",
    frTitle: "Calculateur de TVA — Ajouter ou Retirer la Taxe sur la Valeur Ajoutée",
    what: "Value Added Tax (VAT) is a consumption tax levied on goods and services at each stage of production or distribution. It is the most common form of indirect tax globally, used in over 160 countries. Standard rates vary widely: 20% in the UK and France, 19% in Germany, 15% in South Africa, and 5% in Canada (GST). Businesses collect VAT from customers and remit it to the government, while also reclaiming VAT paid on their own purchases.",
    frWhat: "La taxe sur la valeur ajoutée (TVA) est une taxe à la consommation prélevée sur les biens et services à chaque étape de la production ou de la distribution. C'est la forme la plus courante de taxe indirecte dans le monde, utilisée dans plus de 160 pays. Les taux standards varient largement : 20 % au Royaume-Uni et en France, 19 % en Allemagne, 15 % en Afrique du Sud, et 5 % au Canada (TPS). Les entreprises collectent la TVA auprès des clients et la reversent à l'État, tout en récupérant la TVA payée sur leurs propres achats.",
    how: "Use this calculator in two modes. 'Add VAT' takes a net (pre-tax) price and computes the tax amount and gross (final) price. 'Remove VAT' takes a gross (VAT-inclusive) price and back-calculates the net price and VAT component. Both directions are essential — sellers need to add VAT to quotes, while buyers may need to extract the net cost for accounting purposes.",
    frHow: "Utilisez ce calculateur selon deux modes. « Ajouter la TVA » prend un prix net (hors taxe) et calcule le montant de la taxe et le prix brut (final). « Retirer la TVA » prend un prix brut (TVA incluse) et recalcule le prix net et la composante TVA. Les deux directions sont essentielles — les vendeurs doivent ajouter la TVA aux devis, tandis que les acheteurs peuvent avoir besoin d'extraire le coût net à des fins comptables.",
    formula: { expr: "Gross = Net × (1 + rate)   |   Net = Gross ÷ (1 + rate)", note: "Rate is expressed as a decimal: 20% = 0.20" },
    frFormula: { expr: "Brut = Net × (1 + taux)   |   Net = Brut ÷ (1 + taux)", note: "Le taux est exprimé en décimal : 20 % = 0,20" },
    examples: [
      { label: "UK standard rate", input: "£100 net + 20% VAT", result: "£20 VAT → £120 gross" },
      { label: "Reverse calculation", input: "£120 gross, remove 20% VAT", result: "£100 net + £20 VAT" },
      { label: "EU reduced rate", input: "€50 net + 5% VAT", result: "€2.50 VAT → €52.50 gross" },
    ],
    frExamples: [
      { label: "Taux standard UK", input: "100 £ net + 20 % de TVA", result: "20 £ de TVA → 120 £ brut" },
      { label: "Calcul inverse", input: "120 £ brut, retirer 20 % de TVA", result: "100 £ net + 20 £ de TVA" },
      { label: "Taux réduit UE", input: "50 € net + 5 % de TVA", result: "2,50 € de TVA → 52,50 € brut" },
    ],
    faq: [
      { q: "What is the difference between VAT and sales tax?", a: "VAT is collected at every stage of the supply chain, with each business reclaiming the VAT it paid. Sales tax is collected only at the final point of sale to the consumer. The end consumer pays the same amount, but the collection mechanism differs." },
      { q: "Which countries use VAT?", a: "Most of the world uses VAT or a close equivalent (GST in Canada, Australia, India). The major exception is the United States, which uses a state-level sales tax system instead." },
      { q: "Is VAT the same as GST?", a: "Goods and Services Tax (GST) and VAT operate on the same principle — multi-stage taxation with credits for tax paid at each level. The difference is mainly the name used in different countries." },
    ],
    frFaq: [
      { q: "Quelle est la différence entre TVA et taxe de vente ?", a: "La TVA est collectée à chaque étape de la chaîne d'approvisionnement, chaque entreprise récupérant la TVA qu'elle a payée. La taxe de vente n'est collectée qu'au point de vente final au consommateur. Le consommateur final paie le même montant, mais le mécanisme de collecte diffère." },
      { q: "Quels pays utilisent la TVA ?", a: "La majeure partie du monde utilise la TVA ou un équivalent proche (TPS au Canada, en Australie, en Inde). L'exception majeure est les États-Unis, qui utilisent à la place un système de taxe de vente au niveau des États." },
      { q: "La TVA est-elle la même chose que la TPS ?", a: "La Taxe sur les Produits et Services (TPS) et la TVA fonctionnent selon le même principe — une taxation à étapes multiples avec des crédits pour la taxe payée à chaque niveau. La différence est principalement le nom utilisé selon les pays." },
    ],
  },

  discount: {
    title: "Discount Calculator — Sale Price & Savings",
    frTitle: "Calculateur de Remise — Prix Soldé et Économies",
    what: "A discount calculator helps shoppers and businesses quickly determine the final price after a percentage reduction, and the total amount saved. Discounts are ubiquitous in retail — seasonal sales, coupon codes, bulk purchase reductions, and promotional offers all involve percentage-based price cuts. Knowing how to calculate the exact savings helps consumers make informed buying decisions and helps businesses set competitive pricing strategies.",
    frWhat: "Un calculateur de remise aide les acheteurs et les entreprises à déterminer rapidement le prix final après une réduction en pourcentage, et le montant total économisé. Les remises sont omniprésentes dans le commerce — soldes saisonniers, codes promo, réductions sur achats groupés et offres promotionnelles impliquent toutes des baisses de prix en pourcentage. Savoir calculer l'économie exacte aide les consommateurs à prendre des décisions d'achat éclairées et aide les entreprises à fixer des stratégies de prix compétitives.",
    how: "Enter the original price and the discount percentage. The calculator instantly shows you the discount amount in currency and the final price you will pay. This is useful when comparing sales across different stores, evaluating bulk purchase discounts, or verifying promotional claims at checkout.",
    frHow: "Saisissez le prix d'origine et le pourcentage de remise. Le calculateur affiche instantanément le montant de la remise en devise et le prix final que vous paierez. Ceci est utile pour comparer les soldes entre différents magasins, évaluer les remises sur achats groupés, ou vérifier les annonces promotionnelles en caisse.",
    formula: { expr: "Savings = Original × (Discount% ÷ 100)   |   Final = Original − Savings", note: "Example: $120 with 25% off → Save $30 → Pay $90" },
    frFormula: { expr: "Économie = Original × (Remise% ÷ 100)   |   Final = Original − Économie", note: "Exemple : 120 $ avec 25 % de remise → Économisez 30 $ → Payez 90 $" },
    examples: [
      { label: "Clothing sale", input: "$80 jacket, 30% off", result: "Save $24 → Pay $56" },
      { label: "Electronics", input: "$1,200 laptop, 15% off", result: "Save $180 → Pay $1,020" },
      { label: "Black Friday", input: "$250 shoes, 40% off", result: "Save $100 → Pay $150" },
    ],
    frExamples: [
      { label: "Soldes vêtements", input: "Veste à 80 $, 30 % de remise", result: "Économisez 24 $ → Payez 56 $" },
      { label: "Électronique", input: "Ordinateur à 1 200 $, 15 % de remise", result: "Économisez 180 $ → Payez 1 020 $" },
      { label: "Black Friday", input: "Chaussures à 250 $, 40 % de remise", result: "Économisez 100 $ → Payez 150 $" },
    ],
    faq: [
      { q: "How do I calculate a discount mentally?", a: "For 10% off, move the decimal one place left (10% of $80 = $8). For 25% off, divide by 4. For 20% off, multiply by 0.8. For unusual percentages, use this calculator." },
      { q: "What is a double discount?", a: "A double (or stacked) discount applies two successive discounts. 20% off then 10% off is NOT 30% off — it is 20% off the original, then 10% off the already-reduced price, giving a total reduction of 28%." },
    ],
    frFaq: [
      { q: "Comment calculer une remise mentalement ?", a: "Pour 10 % de remise, déplacez la décimale d'un cran vers la gauche (10 % de 80 $ = 8 $). Pour 25 % de remise, divisez par 4. Pour 20 % de remise, multipliez par 0,8. Pour des pourcentages inhabituels, utilisez ce calculateur." },
      { q: "Qu'est-ce qu'une remise double ?", a: "Une remise double (ou cumulée) applique deux remises successives. 20 % puis 10 % de remise N'EST PAS 30 % de remise — c'est 20 % sur l'original, puis 10 % sur le prix déjà réduit, donnant une réduction totale de 28 %." },
    ],
  },

  percentage: {
    title: "Percentage Calculator — Ratios, Changes & Parts",
    frTitle: "Calculateur de Pourcentage — Ratios, Variations et Parts",
    what: "Percentage calculations are among the most frequently needed math operations in daily life — from understanding tax rates and interest, to tracking fitness progress, reading survey results, and analyzing financial data. This calculator covers three essential percentage operations: finding a percentage of a number (X% of Y), finding what percentage one number is of another (X is what % of Y), and calculating percentage change between two values.",
    frWhat: "Les calculs de pourcentage font partie des opérations mathématiques les plus fréquemment nécessaires au quotidien — pour comprendre les taux de taxe et d'intérêt, suivre une progression sportive, lire des résultats de sondage ou analyser des données financières. Ce calculateur couvre trois opérations essentielles : trouver un pourcentage d'un nombre (X% de Y), trouver quel pourcentage un nombre représente d'un autre (X est quel % de Y), et calculer la variation en pourcentage entre deux valeurs.",
    how: "Select the mode that matches your question. Use 'X% of Y' to find a portion (e.g., 15% of 200). Use 'X is ?% of Y' to find a ratio (e.g., 30 is what % of 200?). Use '% Change' to measure growth or decline (e.g., from 80 to 100 is a 25% increase). The result updates instantly as you type.",
    frHow: "Sélectionnez le mode correspondant à votre question. Utilisez « X% de Y » pour trouver une portion (ex. 15 % de 200). Utilisez « X est ?% de Y » pour trouver un ratio (ex. 30 est quel % de 200 ?). Utilisez « % de Variation » pour mesurer une croissance ou une baisse (ex. de 80 à 100 est une augmentation de 25 %). Le résultat se met à jour instantanément pendant que vous tapez.",
    formula: { expr: "Part = (X/100) × Y   |   Ratio = (X/Y) × 100   |   Change = ((New−Old)/|Old|) × 100", note: "Percentage change can be positive (increase) or negative (decrease)" },
    frFormula: { expr: "Partie = (X/100) × Y   |   Ratio = (X/Y) × 100   |   Variation = ((Nouveau−Ancien)/|Ancien|) × 100", note: "La variation en pourcentage peut être positive (augmentation) ou négative (diminution)" },
    examples: [
      { label: "Tax calculation", input: "15% of 340", result: "51" },
      { label: "Exam score", input: "72 is ?% of 90", result: "80%" },
      { label: "Price increase", input: "From $40 to $52", result: "+30% change" },
      { label: "Weight loss", input: "From 90 kg to 81 kg", result: "−10% change" },
    ],
    frExamples: [
      { label: "Calcul de taxe", input: "15 % de 340", result: "51" },
      { label: "Note d'examen", input: "72 est quel % de 90", result: "80 %" },
      { label: "Hausse de prix", input: "De 40 $ à 52 $", result: "+30 % de variation" },
      { label: "Perte de poids", input: "De 90 kg à 81 kg", result: "−10 % de variation" },
    ],
    faq: [
      { q: "What is percentage vs percentage points?", a: "Percentage points measure the arithmetic difference between two percentages. If inflation rises from 2% to 4%, that is a 2 percentage point increase, but a 100% relative increase. The distinction matters in economics and statistics." },
      { q: "How do I reverse a percentage?", a: "If a price after a 20% increase is $120, the original price was $120 ÷ 1.20 = $100. Do not subtract 20% from $120 — that gives the wrong answer. Use the VAT calculator's 'remove' mode for this pattern." },
    ],
    frFaq: [
      { q: "Quelle est la différence entre pourcentage et points de pourcentage ?", a: "Les points de pourcentage mesurent la différence arithmétique entre deux pourcentages. Si l'inflation passe de 2 % à 4 %, c'est une augmentation de 2 points de pourcentage, mais une augmentation relative de 100 %. Cette distinction est importante en économie et en statistiques." },
      { q: "Comment inverser un pourcentage ?", a: "Si un prix après une augmentation de 20 % est de 120 $, le prix d'origine était de 120 $ ÷ 1,20 = 100 $. Ne soustrayez pas 20 % de 120 $ — cela donne une mauvaise réponse. Utilisez le mode « retirer » du calculateur de TVA pour ce type de calcul." },
    ],
  },

  tip: {
    title: "Tip Calculator — Restaurant Gratuity & Bill Splitting",
    frTitle: "Calculateur de Pourboire — Partage d'Addition au Restaurant",
    what: "Tipping customs vary significantly by country and service type. In the United States, a tip of 15–20% of the pre-tax bill is standard at sit-down restaurants. In the UK, 10–15% is typical. Many countries in Asia and Eastern Europe do not have a tipping culture at all. This calculator helps you quickly compute the tip amount for any percentage and split the total fairly among any number of diners, eliminating awkward math at the table.",
    frWhat: "Les coutumes de pourboire varient considérablement selon le pays et le type de service. Aux États-Unis, un pourboire de 15 à 20 % de l'addition hors taxe est standard dans les restaurants. Au Royaume-Uni, 10 à 15 % est typique. De nombreux pays d'Asie et d'Europe de l'Est n'ont pas du tout de culture du pourboire. Ce calculateur vous aide à calculer rapidement le montant du pourboire pour tout pourcentage et à partager équitablement le total entre n'importe quel nombre de convives, évitant les calculs gênants à table.",
    how: "Enter your bill total, select or type a tip percentage, and specify how many people are sharing the bill. The calculator instantly shows the tip amount, the total bill including tip, and the amount each person owes. Tap the preset buttons (10%, 15%, 18%, 20%, 25%) for the most common tip rates.",
    frHow: "Saisissez le total de votre addition, sélectionnez ou tapez un pourcentage de pourboire, et précisez combien de personnes partagent l'addition. Le calculateur affiche instantanément le montant du pourboire, l'addition totale pourboire inclus, et le montant que chaque personne doit. Appuyez sur les boutons prédéfinis (10 %, 15 %, 18 %, 20 %, 25 %) pour les taux de pourboire les plus courants.",
    formula: { expr: "Tip = Bill × (Tip% ÷ 100)   |   Per Person = (Bill + Tip) ÷ People", note: "Calculate before tax when the tip is based on the pre-tax subtotal" },
    frFormula: { expr: "Pourboire = Addition × (Pourboire% ÷ 100)   |   Par Personne = (Addition + Pourboire) ÷ Personnes", note: "Calculez avant taxe lorsque le pourboire est basé sur le sous-total hors taxe" },
    examples: [
      { label: "Casual dining, 2 people", input: "$85 bill, 18%, 2 people", result: "$15.30 tip → $50.15/person" },
      { label: "Fine dining, 4 people", input: "$240 bill, 20%, 4 people", result: "$48 tip → $72/person" },
      { label: "Coffee shop", input: "$12 bill, 15%, 1 person", result: "$1.80 tip → $13.80 total" },
    ],
    frExamples: [
      { label: "Restaurant décontracté, 2 personnes", input: "Addition 85 $, 18 %, 2 personnes", result: "15,30 $ de pourboire → 50,15 $/personne" },
      { label: "Restaurant gastronomique, 4 personnes", input: "Addition 240 $, 20 %, 4 personnes", result: "48 $ de pourboire → 72 $/personne" },
      { label: "Café", input: "Addition 12 $, 15 %, 1 personne", result: "1,80 $ de pourboire → 13,80 $ total" },
    ],
    faq: [
      { q: "Should I tip on the pre-tax or post-tax amount?", a: "Etiquette guides vary, but tipping on the pre-tax subtotal is the more traditional approach. In practice, the difference is small enough that either is acceptable." },
      { q: "When is it appropriate not to tip?", a: "In countries where tipping is not culturally expected (Japan, South Korea, Switzerland), leaving a tip can even be considered rude. When traveling, always research local customs beforehand." },
    ],
    frFaq: [
      { q: "Dois-je calculer le pourboire avant ou après taxe ?", a: "Les guides d'étiquette varient, mais calculer le pourboire sur le sous-total hors taxe est l'approche la plus traditionnelle. En pratique, la différence est assez faible pour que les deux soient acceptables." },
      { q: "Quand est-il approprié de ne pas laisser de pourboire ?", a: "Dans les pays où le pourboire n'est culturellement pas attendu (Japon, Corée du Sud, Suisse), laisser un pourboire peut même être considéré impoli. En voyage, renseignez-vous toujours sur les coutumes locales au préalable." },
    ],
  },

  age: {
    title: "Age Calculator — Exact Age in Years, Months & Days",
    frTitle: "Calculateur d'Âge — Âge Exact en Années, Mois et Jours",
    what: "This age calculator computes your precise age from your date of birth to today, breaking it down into years, months, and days. It also shows the total number of days you have lived and your next birthday date. Knowing your exact age in detail is useful for medical forms, legal documents, milestone planning, and satisfying curiosity. The calculation correctly handles leap years, varying month lengths, and timezone-aware date comparisons.",
    frWhat: "Ce calculateur d'âge calcule votre âge précis depuis votre date de naissance jusqu'à aujourd'hui, en le décomposant en années, mois et jours. Il affiche également le nombre total de jours que vous avez vécus et la date de votre prochain anniversaire. Connaître votre âge exact en détail est utile pour les formulaires médicaux, les documents légaux, la planification d'événements marquants, et pour satisfaire la curiosité. Le calcul gère correctement les années bissextiles, les durées variables des mois, et les comparaisons de dates tenant compte du fuseau horaire.",
    how: "Enter your date of birth using the date picker and the calculator instantly shows your exact age. The calculation counts complete years first, then remaining complete months, then remaining days — the same method used on official documents worldwide.",
    frHow: "Saisissez votre date de naissance à l'aide du sélecteur de date et le calculateur affiche instantanément votre âge exact. Le calcul compte d'abord les années complètes, puis les mois complets restants, puis les jours restants — la même méthode utilisée sur les documents officiels dans le monde entier.",
    formula: { expr: "Years → Months → Days (cascading subtraction)", note: "Accounts for leap years and varying month lengths automatically" },
    frFormula: { expr: "Années → Mois → Jours (soustraction en cascade)", note: "Prend en compte automatiquement les années bissextiles et les durées variables des mois" },
    examples: [
      { label: "Milestone birthday", input: "Born Jan 15, 1990 → today (June 2026)", result: "36 years, 4 months, 25 days — 13,310 days lived" },
      { label: "Child's age", input: "Born March 3, 2018", result: "8 years, 3 months, 7 days" },
      { label: "Leap year check", input: "Born Feb 29, 2000", result: "Handles correctly — 26 years old in 2026" },
    ],
    frExamples: [
      { label: "Anniversaire marquant", input: "Né le 15 jan. 1990 → aujourd'hui (juin 2026)", result: "36 ans, 4 mois, 25 jours — 13 310 jours vécus" },
      { label: "Âge d'un enfant", input: "Né le 3 mars 2018", result: "8 ans, 3 mois, 7 jours" },
      { label: "Vérification année bissextile", input: "Né le 29 fév. 2000", result: "Géré correctement — 26 ans en 2026" },
    ],
    faq: [
      { q: "Why do different countries calculate age differently?", a: "Western countries count age from the birthday — you become a new age on your birthday. Some East Asian cultures (especially traditional Korean age-counting) add 1 year at birth and another on January 1st each year, making a person 1–2 years older by that system than by Western counting." },
      { q: "How many days old am I?", a: "The calculator shows your total days lived. An average 30-year-old has lived approximately 10,950 days. The exact number depends on how many leap years fall in your lifespan." },
    ],
    frFaq: [
      { q: "Pourquoi différents pays calculent-ils l'âge différemment ?", a: "Les pays occidentaux comptent l'âge à partir de l'anniversaire — vous changez d'âge le jour de votre anniversaire. Certaines cultures d'Asie de l'Est (notamment le comptage traditionnel coréen) ajoutent 1 an à la naissance et un autre chaque 1er janvier, rendant une personne 1 à 2 ans plus âgée selon ce système que selon le comptage occidental." },
      { q: "Combien de jours ai-je vécu ?", a: "Le calculateur affiche votre total de jours vécus. Une personne moyenne de 30 ans a vécu environ 10 950 jours. Le nombre exact dépend du nombre d'années bissextiles incluses dans votre durée de vie." },
    ],
  },

  calories: {
    title: "Calorie Calculator — TDEE & Daily Energy Needs",
    frTitle: "Calculateur de Calories — TDEE et Besoins Énergétiques Quotidiens",
    what: "This calculator estimates your Total Daily Energy Expenditure (TDEE) — the total number of calories your body burns in a day, accounting for both your basal metabolism and physical activity. TDEE is the foundation of any nutrition plan: eat less than your TDEE to lose weight, eat more to gain weight, and eat at your TDEE to maintain. It uses the Mifflin-St Jeor equation, which is the most accurate formula recommended by the American Dietetic Association for estimating Basal Metabolic Rate (BMR).",
    frWhat: "Ce calculateur estime votre Dépense Énergétique Totale Quotidienne (TDEE) — le nombre total de calories que votre corps brûle en une journée, en tenant compte à la fois de votre métabolisme basal et de votre activité physique. Le TDEE est la base de tout plan nutritionnel : mangez moins que votre TDEE pour perdre du poids, mangez plus pour en gagner, et mangez à votre TDEE pour maintenir votre poids. Il utilise l'équation de Mifflin-St Jeor, la formule la plus précise recommandée par l'Association Américaine de Diététique pour estimer le Métabolisme de Base (BMR).",
    how: "Enter your weight, height, age, and biological sex. Select your average activity level from Sedentary (desk job, no exercise) to Very Active (hard daily training or physical labor). The calculator first computes your BMR, then multiplies it by an activity factor to get your TDEE. It also shows adjusted targets for weight loss (TDEE − 500 kcal/day) and weight gain (TDEE + 500 kcal/day).",
    frHow: "Saisissez votre poids, taille, âge et sexe biologique. Sélectionnez votre niveau d'activité moyen, de Sédentaire (travail de bureau, pas d'exercice) à Très Actif (entraînement intense quotidien ou travail physique). Le calculateur calcule d'abord votre BMR, puis le multiplie par un facteur d'activité pour obtenir votre TDEE. Il affiche également des objectifs ajustés pour la perte de poids (TDEE − 500 kcal/jour) et la prise de poids (TDEE + 500 kcal/jour).",
    formula: { expr: "BMR (male) = 10W + 6.25H − 5A + 5   |   BMR (female) = 10W + 6.25H − 5A − 161   |   TDEE = BMR × Activity Factor", note: "W = weight(kg), H = height(cm), A = age(years). Activity factors: 1.2 (sedentary) to 1.9 (very active)" },
    frFormula: { expr: "BMR (homme) = 10P + 6,25T − 5A + 5   |   BMR (femme) = 10P + 6,25T − 5A − 161   |   TDEE = BMR × Facteur d'Activité", note: "P = poids(kg), T = taille(cm), A = âge(ans). Facteurs d'activité : 1,2 (sédentaire) à 1,9 (très actif)" },
    examples: [
      { label: "Sedentary male", input: "Male, 75kg, 175cm, age 30, sedentary", result: "BMR 1,724 kcal | TDEE 2,069 kcal" },
      { label: "Active female", input: "Female, 60kg, 165cm, age 25, active", result: "BMR 1,399 kcal | TDEE 2,413 kcal" },
      { label: "Weight loss target", input: "TDEE 2,200 kcal", result: "Loss target: 1,700 kcal/day (−500 deficit)" },
    ],
    frExamples: [
      { label: "Homme sédentaire", input: "Homme, 75kg, 175cm, 30 ans, sédentaire", result: "BMR 1 724 kcal | TDEE 2 069 kcal" },
      { label: "Femme active", input: "Femme, 60kg, 165cm, 25 ans, active", result: "BMR 1 399 kcal | TDEE 2 413 kcal" },
      { label: "Objectif perte de poids", input: "TDEE 2 200 kcal", result: "Objectif perte : 1 700 kcal/jour (déficit −500)" },
    ],
    faq: [
      { q: "How accurate is the TDEE calculation?", a: "The Mifflin-St Jeor formula is accurate within ±10% for most people. Actual TDEE can vary based on genetics, hormones, gut microbiome, and muscle mass. Treat the result as a starting estimate and adjust based on real-world results over 2–4 weeks." },
      { q: "What is the difference between BMR and TDEE?", a: "BMR (Basal Metabolic Rate) is the calories you burn at complete rest — just to keep your organs functioning. TDEE adds the calories burned through all daily activities and exercise on top of BMR." },
      { q: "How fast should I lose weight?", a: "A deficit of 500 kcal/day typically produces about 0.5 kg (1 lb) of fat loss per week, which is considered a safe, sustainable rate. Larger deficits can cause muscle loss and metabolic adaptation." },
    ],
    frFaq: [
      { q: "Quelle est la précision du calcul du TDEE ?", a: "La formule de Mifflin-St Jeor est précise à environ ±10 % pour la plupart des gens. Le TDEE réel peut varier selon la génétique, les hormones, le microbiome intestinal et la masse musculaire. Considérez le résultat comme une estimation de départ et ajustez selon les résultats réels sur 2 à 4 semaines." },
      { q: "Quelle est la différence entre BMR et TDEE ?", a: "Le BMR (Métabolisme de Base) représente les calories brûlées au repos complet — juste pour maintenir vos organes en fonctionnement. Le TDEE ajoute les calories brûlées par toutes les activités quotidiennes et l'exercice en plus du BMR." },
      { q: "À quelle vitesse devrais-je perdre du poids ?", a: "Un déficit de 500 kcal/jour produit généralement environ 0,5 kg de perte de graisse par semaine, ce qui est considéré comme un rythme sûr et durable. Des déficits plus importants peuvent causer une perte musculaire et une adaptation métabolique." },
    ],
  },

  datediff: {
    title: "Date Difference & Deadline Calculator — Days Between Dates",
    frTitle: "Calculateur de Différence de Dates et Délais — Jours Entre Dates",
    what: "This calculator finds the exact number of days, weeks, months, and years between two dates. It's useful for tracking project deadlines, counting down to an event, calculating delivery windows, figuring out how long a booking lasts, or simply finding out how many days have passed since a given date.",
    frWhat: "Ce calculateur trouve le nombre exact de jours, semaines, mois et années entre deux dates. Il est utile pour suivre les délais de projet, faire un compte à rebours vers un événement, calculer des fenêtres de livraison, déterminer la durée d'une réservation, ou simplement savoir combien de jours se sont écoulés depuis une date donnée.",
    how: "Enter a start date and an end date. The calculator shows the total number of days between them, broken down into years, months, and days, as well as the equivalent in weeks. If the end date is before the start date, the result indicates the difference is in the past.",
    frHow: "Saisissez une date de début et une date de fin. Le calculateur affiche le nombre total de jours entre elles, décomposé en années, mois et jours, ainsi que l'équivalent en semaines. Si la date de fin est antérieure à la date de début, le résultat indique que la différence est dans le passé.",
    examples: [
      { label: "Project deadline", input: "Today → Dec 25", result: "≈ 197 days (6m 14d)" },
      { label: "Time since an event", input: "Jan 1 → Today", result: "Shown as days/weeks in the past" },
      { label: "Leap year span", input: "Feb 29, 2020 → Feb 29, 2024", result: "1,461 days (4 years)" },
    ],
    frExamples: [
      { label: "Délai de projet", input: "Aujourd'hui → 25 déc.", result: "≈ 197 jours (6m 14j)" },
      { label: "Temps depuis un événement", input: "1er jan. → Aujourd'hui", result: "Affiché en jours/semaines passés" },
      { label: "Durée incluant année bissextile", input: "29 fév. 2020 → 29 fév. 2024", result: "1 461 jours (4 ans)" },
    ],
    faq: [
      { q: "Does this account for leap years?", a: "Yes. The calculation uses actual calendar dates via standard date arithmetic, so leap years (366-day years) are automatically handled correctly." },
      { q: "Can I calculate days until a future deadline?", a: "Yes — set the start date to today (the default) and the end date to your deadline. The result will show how many days remain." },
    ],
    frFaq: [
      { q: "Cela prend-il en compte les années bissextiles ?", a: "Oui. Le calcul utilise des dates de calendrier réelles via l'arithmétique de date standard, donc les années bissextiles (années de 366 jours) sont automatiquement gérées correctement." },
      { q: "Puis-je calculer les jours restants avant un futur délai ?", a: "Oui — définissez la date de début sur aujourd'hui (par défaut) et la date de fin sur votre délai. Le résultat affichera combien de jours il reste." },
    ],
  },

  compound: {
    title: "Compound Interest Calculator — Savings & Investment Growth",
    frTitle: "Calculateur d'Intérêts Composés — Croissance de l'Épargne",
    what: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods — often described as 'interest on interest'. This calculator projects how a savings or investment balance grows over time, optionally including regular monthly contributions, and is useful for retirement planning, savings goals, and comparing investment scenarios.",
    frWhat: "L'intérêt composé est l'intérêt calculé à la fois sur le capital initial et sur les intérêts accumulés des périodes précédentes — souvent décrit comme « des intérêts sur les intérêts ». Ce calculateur projette comment un solde d'épargne ou d'investissement croît dans le temps, en incluant éventuellement des contributions mensuelles régulières, et est utile pour la planification de la retraite, les objectifs d'épargne et la comparaison de scénarios d'investissement.",
    how: "Enter your initial deposit, the annual interest rate, the number of years, and how often interest compounds (annually, quarterly, monthly, or daily). Optionally add a monthly contribution to model regular savings. The result shows your final balance, total interest earned, and total amount deposited over the period.",
    frHow: "Saisissez votre dépôt initial, le taux d'intérêt annuel, le nombre d'années, et la fréquence de capitalisation des intérêts (annuelle, trimestrielle, mensuelle ou quotidienne). Ajoutez éventuellement une contribution mensuelle pour modéliser une épargne régulière. Le résultat affiche votre solde final, le total des intérêts gagnés, et le montant total déposé sur la période.",
    formula: { expr: "A = P(1 + r/n)ⁿᵗ", note: "P = principal, r = annual rate, n = compounding frequency per year, t = years. Monthly contributions are added period by period." },
    frFormula: { expr: "A = P(1 + r/n)ⁿᵗ", note: "P = capital, r = taux annuel, n = fréquence de capitalisation par an, t = années. Les contributions mensuelles sont ajoutées période par période." },
    examples: [
      { label: "Lump sum, 10 years", input: "$10,000 @ 7% / 10yr, monthly", result: "≈ $20,096.61" },
      { label: "With monthly savings", input: "$10,000 @ 7% / 10yr + $200/mo", result: "≈ $54,713.58" },
    ],
    frExamples: [
      { label: "Somme forfaitaire, 10 ans", input: "10 000 $ à 7 % / 10 ans, mensuel", result: "≈ 20 096,61 $" },
      { label: "Avec épargne mensuelle", input: "10 000 $ à 7 % / 10 ans + 200 $/mois", result: "≈ 54 713,58 $" },
    ],
    faq: [
      { q: "How does compounding frequency affect growth?", a: "More frequent compounding (daily vs. annually) results in slightly higher returns for the same nominal interest rate, because interest is calculated and added to the balance more often, allowing it to start earning its own interest sooner." },
      { q: "Is this guaranteed return?", a: "No. This calculator assumes a constant interest rate for illustration purposes. Real investments fluctuate in value, and past performance does not guarantee future results. Always consult a financial advisor for investment decisions." },
    ],
    frFaq: [
      { q: "Comment la fréquence de capitalisation affecte-t-elle la croissance ?", a: "Une capitalisation plus fréquente (quotidienne vs annuelle) donne des rendements légèrement supérieurs pour le même taux d'intérêt nominal, car les intérêts sont calculés et ajoutés au solde plus souvent, leur permettant de commencer à générer leurs propres intérêts plus tôt." },
      { q: "Ce rendement est-il garanti ?", a: "Non. Ce calculateur suppose un taux d'intérêt constant à des fins d'illustration. Les investissements réels fluctuent en valeur, et les performances passées ne garantissent pas les résultats futurs. Consultez toujours un conseiller financier pour vos décisions d'investissement." },
    ],
  },

  randompick: {
    title: "Random Picker — Decision Maker & Random Selector",
    frTitle: "Choix Aléatoire — Aide à la Décision et Sélecteur Aléatoire",
    what: "A random picker helps you make quick, unbiased choices when you can't decide between multiple options — what to eat, which movie to watch, who goes first, which team member gets an assignment, or picking a random winner for a giveaway. Each option has an equal chance of being selected.",
    frWhat: "Un outil de choix aléatoire vous aide à faire des choix rapides et impartiaux lorsque vous ne pouvez pas décider entre plusieurs options — quoi manger, quel film regarder, qui commence, quel membre de l'équipe reçoit une tâche, ou tirer au sort un gagnant pour un concours. Chaque option a une chance égale d'être sélectionnée.",
    how: "Type your options into the text box, one per line — for example, a list of restaurant names, team members, or prize entries. Click 'Pick Random' and the tool will animate through the options before landing on a final selection.",
    frHow: "Tapez vos options dans la zone de texte, une par ligne — par exemple, une liste de noms de restaurants, de membres d'équipe ou de participants à un tirage. Cliquez sur « Choix Aléatoire » et l'outil défilera à travers les options avant de s'arrêter sur une sélection finale.",
    examples: [
      { label: "What to eat", input: "Pizza, Sushi, Tacos, Burger (one per line)", result: "Randomly picks one option" },
      { label: "Pick a winner", input: "List of entry names", result: "Randomly selects one name" },
      { label: "Team assignment", input: "List of team members", result: "Randomly picks who goes first" },
    ],
    frExamples: [
      { label: "Quoi manger", input: "Pizza, Sushi, Tacos, Burger (un par ligne)", result: "Choisit une option au hasard" },
      { label: "Tirer un gagnant", input: "Liste de noms de participants", result: "Sélectionne un nom au hasard" },
      { label: "Attribution d'équipe", input: "Liste des membres de l'équipe", result: "Détermine qui commence au hasard" },
    ],
    faq: [
      { q: "Is the selection truly random?", a: "The picker uses your browser's random number generator, which is suitable for everyday decisions, games, and informal selections. For high-stakes drawings (e.g. legal raffles), consider a certified random number generator." },
      { q: "Can each option be weighted differently?", a: "No — every line you enter has an equal probability of being chosen. If you want an option to have a higher chance, list it multiple times." },
    ],
    frFaq: [
      { q: "La sélection est-elle vraiment aléatoire ?", a: "Le sélecteur utilise le générateur de nombres aléatoires de votre navigateur, adapté aux décisions quotidiennes, jeux et sélections informelles. Pour des tirages à enjeux élevés (ex. tombolas légales), envisagez un générateur de nombres aléatoires certifié." },
      { q: "Chaque option peut-elle avoir un poids différent ?", a: "Non — chaque ligne saisie a une probabilité égale d'être choisie. Si vous voulez qu'une option ait plus de chances, listez-la plusieurs fois." },
    ],
  },

  units: {
    title: "Unit Converter — Length, Weight, Volume, Speed, Area & Temperature",
    frTitle: "Convertisseur d'Unités — Longueur, Poids, Volume, Vitesse, Surface et Température",
    what: "This unit converter handles seven everyday measurement categories in one tool: length, weight, temperature, volume, speed, area, and digital data. Instead of opening a separate converter for each type of measurement, you can switch categories with a single click and instantly convert between metric units (meters, kilograms, liters) and imperial units (feet, pounds, gallons), or between data sizes like megabytes and gigabytes. It is built for quick everyday conversions — cooking, travel, DIY projects, fitness, and international shopping all involve mixing unit systems.",
    frWhat: "Ce convertisseur d'unités gère sept catégories de mesures courantes dans un seul outil : longueur, poids, température, volume, vitesse, surface et données numériques. Plutôt que d'ouvrir un convertisseur différent pour chaque type de mesure, vous pouvez changer de catégorie en un clic et convertir instantanément entre unités métriques (mètres, kilogrammes, litres) et unités impériales (pieds, livres, gallons), ou entre tailles de données comme mégaoctets et gigaoctets. Il est conçu pour des conversions rapides du quotidien — cuisine, voyage, bricolage, sport et achats internationaux impliquent souvent de mélanger des systèmes d'unités.",
    how: "For most categories, every unit is stored as a multiple of a base unit (meters for length, kilograms for weight, liters for volume). Converting is a simple two-step multiplication: your value is converted to the base unit, then from the base unit to your target unit. Temperature is the one exception, since Celsius, Fahrenheit, and Kelvin scales don't share a common zero point, so it uses direct conversion formulas instead of a multiplication factor.",
    frHow: "Pour la plupart des catégories, chaque unité est stockée comme un multiple d'une unité de base (mètres pour la longueur, kilogrammes pour le poids, litres pour le volume). Convertir est une simple multiplication en deux étapes : votre valeur est convertie vers l'unité de base, puis de l'unité de base vers votre unité cible. La température fait exception, car les échelles Celsius, Fahrenheit et Kelvin ne partagent pas le même point zéro, donc elle utilise des formules de conversion directes plutôt qu'un facteur multiplicatif.",
    formula: { expr: "Target = Value × (Factor_source ÷ Factor_target)", note: "Temperature uses direct formulas instead, e.g. °F = °C × 9/5 + 32" },
    frFormula: { expr: "Cible = Valeur × (Facteur_source ÷ Facteur_cible)", note: "La température utilise des formules directes, ex. °F = °C × 9/5 + 32" },
    examples: [
      { label: "Distance", input: "5 km to miles", result: "3.107 mi" },
      { label: "Weight", input: "1 kg to pounds", result: "2.205 lb" },
      { label: "Temperature", input: "100°C to °F", result: "212°F" },
    ],
    frExamples: [
      { label: "Distance", input: "5 km en miles", result: "3,107 mi" },
      { label: "Poids", input: "1 kg en livres", result: "2,205 lb" },
      { label: "Température", input: "100°C en °F", result: "212°F" },
    ],
    faq: [
      { q: "Why is temperature converted differently from other units?", a: "Length, weight, and volume conversions are pure ratios (multiply by a factor), but temperature scales start at different zero points — 0°C is not the same physical temperature as 0°F. So temperature needs an offset-and-scale formula rather than a simple multiplication." },
      { q: "How accurate are these conversions?", a: "The conversion factors used (e.g. 1 inch = 2.54 cm exactly) are the official internationally defined values, so results are accurate to the number of decimal places shown." },
      { q: "Can I convert currency here too?", a: "No — currency exchange rates change constantly and require live data, so currency has its own dedicated Currency Converter tool instead." },
    ],
    frFaq: [
      { q: "Pourquoi la température est-elle convertie différemment des autres unités ?", a: "Les conversions de longueur, poids et volume sont de purs ratios (multiplier par un facteur), mais les échelles de température commencent à des points zéro différents — 0°C n'est pas la même température physique que 0°F. Elle nécessite donc une formule de décalage et d'échelle plutôt qu'une simple multiplication." },
      { q: "Ces conversions sont-elles précises ?", a: "Les facteurs de conversion utilisés (ex. 1 pouce = 2,54 cm exactement) sont les valeurs officielles définies internationalement, donc les résultats sont précis au nombre de décimales affiché." },
      { q: "Puis-je aussi convertir des devises ici ?", a: "Non — les taux de change des devises changent constamment et nécessitent des données en temps réel, donc les devises ont leur propre outil dédié, le Convertisseur de Devises." },
    ],
  },

  fuel: {
    title: "Fuel Cost Calculator — Trip Fuel Cost & Consumption",
    frTitle: "Calculateur de Coût de Carburant — Coût et Consommation de Trajet",
    what: "This calculator estimates how much fuel a trip will use and what it will cost, based on the distance, your vehicle's fuel consumption rate, and the current fuel price. It's useful for budgeting road trips, comparing costs between vehicles, splitting fuel costs with passengers, or deciding whether it's cheaper to drive or fly. A one-way/round-trip toggle lets you calculate a full round trip without re-entering the distance.",
    frWhat: "Ce calculateur estime la quantité de carburant qu'un trajet consommera et son coût, en fonction de la distance, du taux de consommation de votre véhicule et du prix actuel du carburant. Il est utile pour budgétiser des road trips, comparer les coûts entre véhicules, partager les frais de carburant avec des passagers, ou décider s'il est plus économique de conduire ou de prendre l'avion. Un bouton aller simple/aller-retour permet de calculer un trajet complet sans ressaisir la distance.",
    how: "Fuel consumption is typically expressed as liters per 100 kilometers (L/100km). The calculator multiplies your distance by this rate and divides by 100 to get the liters needed, then multiplies by the price per liter for the total cost. Choosing round trip simply doubles the one-way distance before running the same calculation.",
    frHow: "La consommation de carburant est généralement exprimée en litres aux 100 kilomètres (L/100km). Le calculateur multiplie votre distance par ce taux et divise par 100 pour obtenir les litres nécessaires, puis multiplie par le prix au litre pour le coût total. Choisir aller-retour double simplement la distance aller simple avant d'effectuer le même calcul.",
    formula: { expr: "Fuel (L) = (Distance × Consumption) ÷ 100", note: "Cost = Fuel (L) × Price per liter" },
    frFormula: { expr: "Carburant (L) = (Distance × Consommation) ÷ 100", note: "Coût = Carburant (L) × Prix au litre" },
    examples: [
      { label: "City commute", input: "100 km, 7 L/100km, $1.90/L", result: "7 L needed — $13.30" },
      { label: "Round trip", input: "50 km round trip, 6 L/100km, $2.00/L", result: "12 L needed — $24.00" },
      { label: "Long highway drive", input: "500 km, 5.5 L/100km, $1.80/L", result: "27.5 L needed — $49.50" },
    ],
    frExamples: [
      { label: "Trajet urbain", input: "100 km, 7 L/100km, 1,90$/L", result: "7 L nécessaires — 13,30$" },
      { label: "Aller-retour", input: "50 km aller-retour, 6 L/100km, 2,00$/L", result: "12 L nécessaires — 24,00$" },
      { label: "Long trajet autoroutier", input: "500 km, 5,5 L/100km, 1,80$/L", result: "27,5 L nécessaires — 49,50$" },
    ],
    faq: [
      { q: "Where do I find my car's fuel consumption rate?", a: "It's usually in your vehicle's manual or spec sheet, listed as L/100km or mpg. You can also calculate your own real-world rate by dividing liters used by (distance ÷ 100) on your next fill-up." },
      { q: "Does this account for traffic or driving style?", a: "No — it uses the consumption rate you enter, which is an average. Heavy traffic, aggressive driving, or highway speeds can all shift real consumption higher or lower than the rate you provide." },
      { q: "Can I use miles and gallons instead?", a: "This calculator works in the units you enter — just be consistent (e.g. use gallons per 100 miles for consumption if working in imperial units)." },
    ],
    frFaq: [
      { q: "Où trouver le taux de consommation de ma voiture ?", a: "C'est généralement dans le manuel ou la fiche technique de votre véhicule, indiqué en L/100km. Vous pouvez aussi calculer votre propre taux réel en divisant les litres utilisés par (distance ÷ 100) lors de votre prochain plein." },
      { q: "Cela tient-il compte du trafic ou du style de conduite ?", a: "Non — il utilise le taux de consommation que vous saisissez, qui est une moyenne. Un trafic dense, une conduite sportive ou des vitesses autoroutières peuvent tous faire varier la consommation réelle par rapport au taux fourni." },
      { q: "Puis-je utiliser des miles et des gallons à la place ?", a: "Ce calculateur fonctionne avec les unités que vous saisissez — soyez simplement cohérent (ex. utilisez gallons aux 100 miles pour la consommation si vous travaillez en unités impériales)." },
    ],
  },

  salary: {
    title: "Salary Calculator — Hourly, Daily, Weekly, Monthly & Yearly Pay",
    frTitle: "Calculateur de Salaire — Paie Horaire, Journalière, Hebdomadaire, Mensuelle et Annuelle",
    what: "This calculator converts a pay amount between five common pay periods — hourly, daily, weekly, monthly, and yearly — so you can compare a job offer stated as an annual salary against one stated as an hourly rate, or figure out your effective hourly earnings from a monthly paycheck. It's built for job comparisons, freelance rate-setting, and everyday budgeting.",
    frWhat: "Ce calculateur convertit un montant de paie entre cinq périodes de paie courantes — horaire, journalière, hebdomadaire, mensuelle et annuelle — afin de pouvoir comparer une offre d'emploi exprimée en salaire annuel à une autre exprimée en taux horaire, ou de connaître vos gains horaires effectifs à partir d'un salaire mensuel. Il est conçu pour comparer des emplois, fixer des tarifs en freelance et budgétiser au quotidien.",
    how: "The calculator first converts whatever amount and period you enter into an hourly rate, using your hours-per-day, days-per-week, and weeks-per-year assumptions (defaulting to a standard 8-hour, 5-day, 52-week schedule). From that hourly rate, it derives all the other periods by multiplying back up. Adjusting the schedule assumptions — for part-time work or unpaid time off — changes every converted figure accordingly.",
    frHow: "Le calculateur convertit d'abord le montant et la période saisis en taux horaire, en utilisant vos hypothèses d'heures/jour, jours/semaine et semaines/année (par défaut un horaire standard de 8h, 5 jours, 52 semaines). À partir de ce taux horaire, il déduit toutes les autres périodes en remultipliant. Ajuster les hypothèses d'horaire — pour un travail à temps partiel ou des congés non payés — modifie chaque chiffre converti en conséquence.",
    formula: { expr: "Yearly = Hourly × Hours/day × Days/week × Weeks/year", note: "Default assumption: 8 hours/day, 5 days/week, 52 weeks/year" },
    frFormula: { expr: "Annuel = Horaire × Heures/jour × Jours/semaine × Semaines/année", note: "Hypothèse par défaut : 8h/jour, 5 jours/semaine, 52 semaines/année" },
    examples: [
      { label: "Standard full-time", input: "$20/hour, 8h/day, 5d/week, 52w/year", result: "$41,600/year" },
      { label: "Monthly to hourly", input: "$5,000/month", result: "$28.85/hour" },
      { label: "Part-time (30 weeks/year)", input: "$25/hour, 30 weeks/year", result: "$30,000/year" },
    ],
    frExamples: [
      { label: "Temps plein standard", input: "20$/heure, 8h/jour, 5j/semaine, 52sem/an", result: "41 600$/an" },
      { label: "Mensuel vers horaire", input: "5 000$/mois", result: "28,85$/heure" },
      { label: "Temps partiel (30 semaines/an)", input: "25$/heure, 30 semaines/an", result: "30 000$/an" },
    ],
    faq: [
      { q: "Does this account for taxes?", a: "No — all figures are gross (pre-tax) pay. Your actual take-home pay will be lower after income tax and other deductions, which vary by country and personal situation." },
      { q: "How do I account for unpaid vacation?", a: "Lower the weeks/year field — e.g. 50 instead of 52 if you take two unpaid weeks off — and the yearly and monthly figures will adjust automatically." },
      { q: "Why does my monthly figure look slightly different from salary÷12?", a: "Monthly pay here is derived from the yearly total divided by 12, which accounts for the exact number of working days across the year rather than assuming every month is identical." },
    ],
    frFaq: [
      { q: "Cela tient-il compte des impôts ?", a: "Non — tous les chiffres sont bruts (avant impôt). Votre salaire net réel sera plus bas après l'impôt sur le revenu et autres déductions, qui varient selon le pays et la situation personnelle." },
      { q: "Comment tenir compte des congés non payés ?", a: "Réduisez le champ semaines/année — par exemple 50 au lieu de 52 si vous prenez deux semaines non payées — et les chiffres annuel et mensuel s'ajusteront automatiquement." },
      { q: "Pourquoi mon chiffre mensuel diffère-t-il légèrement de salaire÷12 ?", a: "Le salaire mensuel ici est dérivé du total annuel divisé par 12, ce qui tient compte du nombre exact de jours travaillés sur l'année plutôt que de supposer que chaque mois est identique." },
    ],
  },

  margin: {
    title: "Profit Margin Calculator — Margin, Markup & Profit",
    frTitle: "Calculateur de Marge Bénéficiaire — Marge, Majoration et Profit",
    what: "Profit margin and markup are two different ways of expressing the same profit, and mixing them up is one of the most common pricing mistakes small businesses make. This calculator computes both from your cost and selling price, so you always know exactly how much profit you're making and how it's expressed in each convention. A second mode lets you work backwards: enter your cost and a target margin, and it tells you what to charge.",
    frWhat: "La marge bénéficiaire et la majoration sont deux façons différentes d'exprimer le même profit, et les confondre est l'une des erreurs de tarification les plus courantes chez les petites entreprises. Ce calculateur calcule les deux à partir de votre coût et prix de vente, afin de toujours savoir exactement combien de profit vous réalisez et comment il s'exprime dans chaque convention. Un second mode permet de travailler à l'envers : entrez votre coût et une marge cible, et il vous indique le prix à facturer.",
    how: "Profit is simply selling price minus cost. Margin expresses that profit as a percentage of the selling price (what fraction of what the customer pays is profit), while markup expresses it as a percentage of the cost (how much you added on top of what you paid). Because they use different denominators, a 50% markup is not the same as a 50% margin — margin is always the smaller number of the two.",
    frHow: "Le profit est simplement le prix de vente moins le coût. La marge exprime ce profit en pourcentage du prix de vente (quelle fraction de ce que paie le client est du profit), tandis que la majoration l'exprime en pourcentage du coût (combien vous avez ajouté par rapport à ce que vous avez payé). Comme ils utilisent des dénominateurs différents, une majoration de 50% n'est pas la même chose qu'une marge de 50% — la marge est toujours le plus petit des deux nombres.",
    formula: { expr: "Margin % = (Selling Price − Cost) ÷ Selling Price × 100", note: "Markup % = (Selling Price − Cost) ÷ Cost × 100" },
    frFormula: { expr: "Marge % = (Prix de vente − Coût) ÷ Prix de vente × 100", note: "Majoration % = (Prix de vente − Coût) ÷ Coût × 100" },
    examples: [
      { label: "Retail item", input: "Cost $50, sell at $80", result: "Profit $30 — Margin 37.5%, Markup 60%" },
      { label: "Target margin", input: "Cost $50, target 30% margin", result: "Sell at $71.43" },
      { label: "Thin-margin business", input: "Cost $90, sell at $100", result: "Profit $10 — Margin 10%, Markup 11.1%" },
    ],
    frExamples: [
      { label: "Article de détail", input: "Coût 50$, vendu à 80$", result: "Profit 30$ — Marge 37,5%, Majoration 60%" },
      { label: "Marge cible", input: "Coût 50$, marge cible 30%", result: "Vendre à 71,43$" },
      { label: "Commerce à faible marge", input: "Coût 90$, vendu à 100$", result: "Profit 10$ — Marge 10%, Majoration 11,1%" },
    ],
    faq: [
      { q: "Which one should I use for pricing, margin or markup?", a: "Most retailers think in margin, since it directly tells you what percentage of revenue is profit — useful for comparing against overhead costs. Markup is more common when pricing is based on cost-plus contracts." },
      { q: "Why is markup always higher than margin for the same sale?", a: "Because markup divides profit by the smaller number (cost), while margin divides it by the larger number (selling price). The gap between them widens as the profit percentage increases." },
      { q: "What does a negative margin mean?", a: "A negative margin means you're selling below cost — you're losing money on every sale, which only makes sense as a temporary strategy (e.g. clearing inventory)." },
    ],
    frFaq: [
      { q: "Lequel utiliser pour la tarification, marge ou majoration ?", a: "La plupart des détaillants pensent en marge, car elle indique directement quel pourcentage du revenu est du profit — utile pour comparer aux coûts fixes. La majoration est plus courante pour la tarification basée sur des contrats coût-plus." },
      { q: "Pourquoi la majoration est-elle toujours plus élevée que la marge pour la même vente ?", a: "Parce que la majoration divise le profit par le nombre le plus petit (le coût), tandis que la marge le divise par le nombre le plus grand (le prix de vente). L'écart s'agrandit à mesure que le pourcentage de profit augmente." },
      { q: "Que signifie une marge négative ?", a: "Une marge négative signifie que vous vendez en dessous du coût — vous perdez de l'argent à chaque vente, ce qui n'a de sens que comme stratégie temporaire (ex. écouler un inventaire)." },
    ],
  },

  roi: {
    title: "ROI Calculator — Return on Investment & Annualized Return",
    frTitle: "Calculateur de ROI — Retour sur Investissement et Rendement Annualisé",
    what: "Return on Investment (ROI) measures how much profit an investment generated relative to what you put in, expressed as a percentage. It's one of the most widely used metrics for comparing the performance of very different investments — stocks, real estate, a business venture, or even a marketing campaign — on the same scale. This calculator also computes an annualized ROI when you provide a holding period, which lets you fairly compare investments held for different lengths of time.",
    frWhat: "Le retour sur investissement (ROI) mesure combien de profit un investissement a généré par rapport à ce que vous y avez mis, exprimé en pourcentage. C'est l'une des mesures les plus utilisées pour comparer la performance d'investissements très différents — actions, immobilier, une entreprise, ou même une campagne marketing — sur la même échelle. Ce calculateur calcule aussi un ROI annualisé lorsque vous fournissez une durée de détention, ce qui permet de comparer équitablement des investissements détenus sur des durées différentes.",
    how: "Basic ROI simply divides your profit (final value minus initial investment) by the initial investment. This works fine for a single comparison, but a 30% ROI over 1 year is very different from a 30% ROI over 10 years — so when a time period is given, the calculator also computes the annualized (compound) rate that would produce the same total return, letting you compare investments on an apples-to-apples yearly basis.",
    frHow: "Le ROI de base divise simplement votre profit (valeur finale moins investissement initial) par l'investissement initial. Cela fonctionne bien pour une seule comparaison, mais un ROI de 30% sur 1 an est très différent d'un ROI de 30% sur 10 ans — donc lorsqu'une période est fournie, le calculateur calcule aussi le taux annualisé (composé) qui produirait le même rendement total, permettant de comparer les investissements sur une base annuelle équivalente.",
    formula: { expr: "ROI % = (Return − Investment) ÷ Investment × 100", note: "Annualized ROI % = ((Return ÷ Investment)^(1/years) − 1) × 100" },
    frFormula: { expr: "ROI % = (Retour − Investissement) ÷ Investissement × 100", note: "ROI annualisé % = ((Retour ÷ Investissement)^(1/années) − 1) × 100" },
    examples: [
      { label: "Stock investment", input: "Invest $1,000, return $1,300", result: "Profit $300 — ROI 30%" },
      { label: "Over 3 years", input: "Invest $1,000, return $1,300, 3 years", result: "Annualized ROI ≈ 9.14%/year" },
      { label: "Loss", input: "Invest $2,000, return $1,700", result: "Profit −$300 — ROI −15%" },
    ],
    frExamples: [
      { label: "Investissement en actions", input: "Investir 1 000$, retour 1 300$", result: "Profit 300$ — ROI 30%" },
      { label: "Sur 3 ans", input: "Investir 1 000$, retour 1 300$, 3 ans", result: "ROI annualisé ≈ 9,14%/an" },
      { label: "Perte", input: "Investir 2 000$, retour 1 700$", result: "Profit −300$ — ROI −15%" },
    ],
    faq: [
      { q: "What's a 'good' ROI?", a: "It depends heavily on the investment type and time frame. Stock market index funds have historically averaged around 7-10% annualized, so any comparison should be made against similar-risk, similar-timeframe benchmarks." },
      { q: "Why does the annualized ROI look much smaller than the total ROI?", a: "Total ROI is the cumulative return over the entire period, while annualized ROI spreads that same return evenly (compounded) across each year — the longer the period, the bigger the gap between the two figures." },
      { q: "Does this account for risk or fees?", a: "No — ROI is a pure profit-ratio calculation. It doesn't factor in the risk taken to earn that return, taxes, inflation, or any fees paid, all of which affect your real-world outcome." },
    ],
    frFaq: [
      { q: "Qu'est-ce qu'un 'bon' ROI ?", a: "Cela dépend fortement du type d'investissement et de la durée. Les fonds indiciels boursiers ont historiquement une moyenne d'environ 7-10% annualisé, donc toute comparaison devrait se faire avec des références de risque et de durée similaires." },
      { q: "Pourquoi le ROI annualisé semble-t-il bien plus petit que le ROI total ?", a: "Le ROI total est le rendement cumulé sur toute la période, tandis que le ROI annualisé répartit ce même rendement uniformément (composé) sur chaque année — plus la période est longue, plus l'écart entre les deux chiffres est grand." },
      { q: "Cela tient-il compte du risque ou des frais ?", a: "Non — le ROI est un calcul de ratio de profit pur. Il ne prend pas en compte le risque pris pour obtenir ce rendement, les impôts, l'inflation, ni les frais payés, qui affectent tous votre résultat réel." },
    ],
  },

  stats: {
    title: "Statistics Calculator — Average, Median, Sum & Range",
    frTitle: "Calculateur de Statistiques — Moyenne, Médiane, Somme et Étendue",
    what: "This calculator computes the basic descriptive statistics of any list of numbers you paste in — sum, average (mean), median, minimum, maximum, and range. It's a fast way to summarize test scores, survey results, expense lists, or any dataset without opening a spreadsheet, and it accepts numbers separated by commas, spaces, or line breaks so you can paste data from almost any source.",
    frWhat: "Ce calculateur calcule les statistiques descriptives de base de toute liste de nombres que vous collez — somme, moyenne, médiane, minimum, maximum et étendue. C'est un moyen rapide de résumer des notes d'examen, des résultats de sondage, des listes de dépenses, ou tout ensemble de données sans ouvrir un tableur, et il accepte des nombres séparés par des virgules, espaces ou sauts de ligne pour coller des données depuis presque n'importe quelle source.",
    how: "The average is the sum of all numbers divided by how many there are. The median is found by sorting the list and taking the middle value (or the average of the two middle values if the count is even) — it's often a better 'typical value' than the average when a few extreme numbers would otherwise skew the mean. Min, max, and range (max minus min) show the spread of the data.",
    frHow: "La moyenne est la somme de tous les nombres divisée par leur nombre. La médiane est trouvée en triant la liste et en prenant la valeur du milieu (ou la moyenne des deux valeurs du milieu si le nombre est pair) — c'est souvent une meilleure « valeur typique » que la moyenne lorsque quelques nombres extrêmes fausseraient sinon la moyenne. Min, max et étendue (max moins min) montrent la dispersion des données.",
    formula: { expr: "Average = Sum ÷ Count", note: "Median = middle value of the sorted list (or average of the two middle values)" },
    frFormula: { expr: "Moyenne = Somme ÷ Nombre", note: "Médiane = valeur du milieu de la liste triée (ou moyenne des deux valeurs du milieu)" },
    examples: [
      { label: "Six numbers", input: "4, 8, 15, 16, 23, 42", result: "Average 18, Median 15.5" },
      { label: "Test scores", input: "72, 85, 90, 65, 78", result: "Average 78, Median 78" },
      { label: "With an outlier", input: "10, 12, 11, 9, 200", result: "Average 48.4, Median 11" },
    ],
    frExamples: [
      { label: "Six nombres", input: "4, 8, 15, 16, 23, 42", result: "Moyenne 18, Médiane 15,5" },
      { label: "Notes d'examen", input: "72, 85, 90, 65, 78", result: "Moyenne 78, Médiane 78" },
      { label: "Avec une valeur aberrante", input: "10, 12, 11, 9, 200", result: "Moyenne 48,4, Médiane 11" },
    ],
    faq: [
      { q: "Why is my median so different from my average?", a: "This usually happens when your data has one or more extreme outliers. The average is pulled toward outliers, while the median stays close to where most of the data actually sits — the third example above shows this clearly." },
      { q: "Is there a limit to how many numbers I can enter?", a: "No hard limit — the calculator processes the list entirely in your browser, so very large lists (thousands of numbers) will still work, though extremely long pastes may take a moment to parse." },
      { q: "What happens if I include text or invalid entries?", a: "Non-numeric entries are simply skipped — only values that parse as valid numbers are included in the calculation." },
    ],
    frFaq: [
      { q: "Pourquoi ma médiane est-elle si différente de ma moyenne ?", a: "Cela arrive généralement quand vos données ont une ou plusieurs valeurs aberrantes extrêmes. La moyenne est tirée vers les valeurs aberrantes, tandis que la médiane reste proche de là où se situe la majorité des données — le troisième exemple ci-dessus le montre clairement." },
      { q: "Y a-t-il une limite au nombre de nombres que je peux saisir ?", a: "Aucune limite stricte — le calculateur traite la liste entièrement dans votre navigateur, donc de très grandes listes (milliers de nombres) fonctionneront quand même, bien que des collages extrêmement longs puissent prendre un moment à analyser." },
      { q: "Que se passe-t-il si j'inclus du texte ou des entrées invalides ?", a: "Les entrées non numériques sont simplement ignorées — seules les valeurs qui s'interprètent comme des nombres valides sont incluses dans le calcul." },
    ],
  },

  area: {
    title: "Area Calculator — Rectangle, Square, Triangle, Circle & Trapezoid",
    frTitle: "Calculateur de Surface — Rectangle, Carré, Triangle, Cercle et Trapèze",
    what: "This calculator finds the area (and, for rectangles, squares, and circles, the perimeter or circumference too) of five common shapes: rectangle, square, triangle, circle, and trapezoid. It's useful for home improvement projects like flooring or paint estimates, gardening and landscaping, school geometry homework, or any situation where you need to know how much surface a shape covers.",
    frWhat: "Ce calculateur trouve l'aire (et, pour les rectangles, carrés et cercles, le périmètre ou la circonférence aussi) de cinq formes courantes : rectangle, carré, triangle, cercle et trapèze. Il est utile pour des projets de rénovation comme l'estimation de revêtement de sol ou de peinture, le jardinage et l'aménagement paysager, les devoirs de géométrie scolaire, ou toute situation où vous devez connaître la surface couverte par une forme.",
    how: "Each shape uses its own standard geometry formula: a rectangle's area is width times height, a square's is its side squared, a triangle's is half of base times height, a circle's is pi times the radius squared, and a trapezoid's is the average of its two parallel sides times its height. Enter the measurements requested for your chosen shape — using the same unit for every field — and the calculator applies the matching formula instantly.",
    frHow: "Chaque forme utilise sa propre formule géométrique standard : l'aire d'un rectangle est largeur fois hauteur, celle d'un carré est son côté au carré, celle d'un triangle est la moitié de base fois hauteur, celle d'un cercle est pi fois le rayon au carré, et celle d'un trapèze est la moyenne de ses deux côtés parallèles fois sa hauteur. Entrez les mesures demandées pour la forme choisie — en utilisant la même unité pour chaque champ — et le calculateur applique instantanément la formule correspondante.",
    formula: { expr: "Rectangle: W×H · Square: S² · Triangle: ½×B×H · Circle: π×R² · Trapezoid: ½×(A+B)×H", note: "Perimeter is shown for Rectangle, Square, and Circle (circumference)" },
    frFormula: { expr: "Rectangle : L×H · Carré : C² · Triangle : ½×B×H · Cercle : π×R² · Trapèze : ½×(A+B)×H", note: "Le périmètre est affiché pour Rectangle, Carré et Cercle (circonférence)" },
    examples: [
      { label: "Rectangle room", input: "Width 5m, Height 3m", result: "Area 15 m² — Perimeter 16 m" },
      { label: "Circular garden", input: "Radius 4m", result: "Area 50.27 m² — Circumference 25.13 m" },
      { label: "Triangle plot", input: "Base 6m, Height 4m", result: "Area 12 m²" },
    ],
    frExamples: [
      { label: "Pièce rectangulaire", input: "Largeur 5m, Hauteur 3m", result: "Aire 15 m² — Périmètre 16 m" },
      { label: "Jardin circulaire", input: "Rayon 4m", result: "Aire 50,27 m² — Circonférence 25,13 m" },
      { label: "Terrain triangulaire", input: "Base 6m, Hauteur 4m", result: "Aire 12 m²" },
    ],
    faq: [
      { q: "What units should I use?", a: "Any unit works, as long as you use the same one for every input — the result will be in that unit squared (e.g. meters in, square meters out)." },
      { q: "Why is there no perimeter for triangle and trapezoid?", a: "Their perimeter needs the length of every side, but their area formulas here only need base and height (triangle) or the two parallel sides and height (trapezoid) — so a full perimeter isn't calculable from those same inputs alone." },
      { q: "How do I calculate an irregular shape?", a: "Break it into simpler shapes (rectangles, triangles) that this calculator supports, find each area separately, then add them together." },
    ],
    frFaq: [
      { q: "Quelles unités dois-je utiliser ?", a: "N'importe quelle unité fonctionne, tant que vous utilisez la même pour chaque entrée — le résultat sera dans cette unité au carré (ex. mètres en entrée, mètres carrés en sortie)." },
      { q: "Pourquoi n'y a-t-il pas de périmètre pour le triangle et le trapèze ?", a: "Leur périmètre nécessite la longueur de chaque côté, mais leurs formules d'aire ici n'ont besoin que de la base et hauteur (triangle) ou des deux côtés parallèles et de la hauteur (trapèze) — un périmètre complet n'est donc pas calculable à partir de ces mêmes entrées seules." },
      { q: "Comment calculer une forme irrégulière ?", a: "Décomposez-la en formes plus simples (rectangles, triangles) prises en charge par ce calculateur, trouvez chaque aire séparément, puis additionnez-les." },
    ],
  },

  bmrtdee: {
    title: "BMR/TDEE Calculator — Daily Calorie Needs",
    frTitle: "Calculateur de BMR/TDEE — Besoins Caloriques Quotidiens",
    what: "Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest just to keep basic functions running — breathing, circulation, cell repair. Total Daily Energy Expenditure (TDEE) adds your activity level on top of that, giving a realistic estimate of how many calories you burn in a typical day. TDEE is the number most people actually need for setting calorie goals, whether the aim is weight loss, maintenance, or muscle gain.",
    frWhat: "Le métabolisme de base (BMR) est le nombre de calories que votre corps brûle au repos complet juste pour maintenir les fonctions de base — respiration, circulation, réparation cellulaire. La dépense énergétique quotidienne totale (TDEE) ajoute votre niveau d'activité à cela, donnant une estimation réaliste du nombre de calories que vous brûlez en une journée typique. Le TDEE est le chiffre dont la plupart des gens ont réellement besoin pour fixer des objectifs caloriques, que le but soit la perte de poids, le maintien ou la prise de muscle.",
    how: "This calculator uses the Mifflin-St Jeor equation, considered one of the most accurate BMR formulas for the general population. It takes your weight, height, age, and biological sex to compute BMR, then multiplies that by an activity multiplier — ranging from 1.2 for a sedentary lifestyle to 1.9 for very intense daily activity — to get your TDEE.",
    frHow: "Ce calculateur utilise l'équation de Mifflin-St Jeor, considérée comme l'une des formules de BMR les plus précises pour la population générale. Elle prend votre poids, taille, âge et sexe biologique pour calculer le BMR, puis le multiplie par un facteur d'activité — allant de 1,2 pour un mode de vie sédentaire à 1,9 pour une activité quotidienne très intense — pour obtenir votre TDEE.",
    formula: { expr: "BMR (men) = 10×kg + 6.25×cm − 5×age + 5", note: "BMR (women) = 10×kg + 6.25×cm − 5×age − 161; TDEE = BMR × activity factor" },
    frFormula: { expr: "BMR (hommes) = 10×kg + 6,25×cm − 5×âge + 5", note: "BMR (femmes) = 10×kg + 6,25×cm − 5×âge − 161 ; TDEE = BMR × facteur d'activité" },
    examples: [
      { label: "Male, moderate activity", input: "70kg, 175cm, 30yo, moderate", result: "BMR 1,665 kcal — TDEE 2,581 kcal/day" },
      { label: "Female, sedentary", input: "60kg, 165cm, 28yo, sedentary", result: "BMR 1,345 kcal — TDEE 1,614 kcal/day" },
      { label: "Male, very active", input: "85kg, 180cm, 25yo, very active", result: "BMR 1,842 kcal — TDEE 3,500 kcal/day" },
    ],
    frExamples: [
      { label: "Homme, activité modérée", input: "70kg, 175cm, 30ans, modérée", result: "BMR 1 665 kcal — TDEE 2 581 kcal/jour" },
      { label: "Femme, sédentaire", input: "60kg, 165cm, 28ans, sédentaire", result: "BMR 1 345 kcal — TDEE 1 614 kcal/jour" },
      { label: "Homme, très actif", input: "85kg, 180cm, 25ans, très actif", result: "BMR 1 842 kcal — TDEE 3 500 kcal/jour" },
    ],
    faq: [
      { q: "How accurate is the Mifflin-St Jeor equation?", a: "It's generally considered more accurate than the older Harris-Benedict equation, with studies showing it predicts resting metabolic rate within about 10% for most people. Individual metabolism can still vary due to genetics, muscle mass, and health conditions." },
      { q: "Should I eat exactly at my TDEE?", a: "Eating at TDEE maintains your current weight. Eating below it (a calorie deficit) leads to weight loss, and eating above it (a surplus) leads to weight gain — a moderate deficit or surplus of 300-500 calories/day is a common, sustainable target." },
      { q: "Which activity level should I choose?", a: "Be honest rather than aspirational — most people overestimate their activity level. If you're unsure, sedentary or light is a safer starting point, and you can adjust based on how your actual weight trend compares to your goal." },
    ],
    frFaq: [
      { q: "Quelle est la précision de l'équation Mifflin-St Jeor ?", a: "Elle est généralement considérée comme plus précise que l'ancienne équation Harris-Benedict, des études montrant qu'elle prédit le métabolisme de repos à environ 10% près pour la plupart des gens. Le métabolisme individuel peut toujours varier selon la génétique, la masse musculaire et l'état de santé." },
      { q: "Dois-je manger exactement à mon TDEE ?", a: "Manger à son TDEE maintient le poids actuel. Manger en dessous (déficit calorique) mène à une perte de poids, et manger au-dessus (surplus) mène à une prise de poids — un déficit ou surplus modéré de 300-500 calories/jour est un objectif courant et durable." },
      { q: "Quel niveau d'activité choisir ?", a: "Soyez honnête plutôt qu'aspirationnel — la plupart des gens surestiment leur niveau d'activité. En cas de doute, sédentaire ou léger est un point de départ plus sûr, ajustable selon l'évolution réelle de votre poids par rapport à votre objectif." },
    ],
  },

  ratio: {
    title: "Ratio Calculator — Simplify Ratios & Solve Proportions",
    frTitle: "Calculateur de Ratio — Simplifier des Ratios et Résoudre des Proportions",
    what: "A ratio compares two quantities (like 4:5), and a proportion is a statement that two ratios are equal (like 4:5 = 20:25). This calculator has two modes: simplifying a ratio down to its smallest whole-number form, and solving a proportion when one of the four numbers is missing. It's commonly needed for recipe scaling, map scales, mixing ratios, and school math homework.",
    frWhat: "Un ratio compare deux quantités (comme 4:5), et une proportion est une affirmation que deux ratios sont égaux (comme 4:5 = 20:25). Ce calculateur a deux modes : simplifier un ratio à sa forme entière la plus petite, et résoudre une proportion quand l'un des quatre nombres est manquant. Il est couramment nécessaire pour l'ajustement de recettes, les échelles de carte, les ratios de mélange et les devoirs de mathématiques scolaires.",
    how: "To simplify a ratio, both numbers are divided by their greatest common divisor (GCD) — the largest number that divides evenly into both. To solve a proportion, the calculator uses cross-multiplication: in a:b = c:d, the product of the outer terms equals the product of the inner terms (a×d = b×c), which can be rearranged to solve for whichever term is unknown.",
    frHow: "Pour simplifier un ratio, les deux nombres sont divisés par leur plus grand diviseur commun (PGCD) — le plus grand nombre qui divise exactement les deux. Pour résoudre une proportion, le calculateur utilise la multiplication en croix : dans a:b = c:d, le produit des termes extrêmes égale le produit des termes moyens (a×d = b×c), ce qui peut être réarrangé pour résoudre le terme inconnu.",
    formula: { expr: "Simplify: a÷GCD(a,b) : b÷GCD(a,b)", note: "Solve: a×d = b×c (cross multiplication)" },
    frFormula: { expr: "Simplifier : a÷PGCD(a,b) : b÷PGCD(a,b)", note: "Résoudre : a×d = b×c (multiplication en croix)" },
    examples: [
      { label: "Simplify", input: "8:12", result: "2:3" },
      { label: "Solve for missing term", input: "4:5 = x:25", result: "x = 20" },
      { label: "Recipe scaling", input: "Simplify 250:500 (grams)", result: "1:2" },
    ],
    frExamples: [
      { label: "Simplifier", input: "8:12", result: "2:3" },
      { label: "Résoudre le terme manquant", input: "4:5 = x:25", result: "x = 20" },
      { label: "Ajustement de recette", input: "Simplifier 250:500 (grammes)", result: "1:2" },
    ],
    faq: [
      { q: "What's the difference between a ratio and a fraction?", a: "A ratio compares two separate quantities (4 apples : 5 oranges), while a fraction represents a part of a whole (4/9 of all the fruit). They use the same math, but mean different things in context." },
      { q: "Can I use negative or zero values?", a: "No — ratios and proportions are only meaningful for positive quantities, since a ratio describes a relative size or rate, which doesn't make sense as zero or negative." },
      { q: "Why does simplifying use the greatest common divisor?", a: "Dividing by any common divisor keeps the ratio equivalent, but only dividing by the greatest one guarantees you reach the smallest possible whole-number form in a single step." },
    ],
    frFaq: [
      { q: "Quelle est la différence entre un ratio et une fraction ?", a: "Un ratio compare deux quantités distinctes (4 pommes : 5 oranges), tandis qu'une fraction représente une partie d'un tout (4/9 de tous les fruits). Ils utilisent les mêmes mathématiques, mais signifient des choses différentes selon le contexte." },
      { q: "Puis-je utiliser des valeurs négatives ou nulles ?", a: "Non — les ratios et proportions n'ont de sens que pour des quantités positives, car un ratio décrit une taille ou un taux relatif, ce qui n'a pas de sens à zéro ou en négatif." },
      { q: "Pourquoi la simplification utilise-t-elle le plus grand diviseur commun ?", a: "Diviser par n'importe quel diviseur commun garde le ratio équivalent, mais seul diviser par le plus grand garantit d'atteindre la plus petite forme entière possible en une seule étape." },
    ],
  },

  loan: {
    title: "Loan Calculator — Monthly Payment & Total Interest",
    frTitle: "Calculateur de Prêt — Paiement Mensuel et Intérêts Totaux",
    what: "This calculator computes the fixed monthly payment for any amortizing loan — personal loans, auto loans, or any fixed-rate borrowing — along with the total interest you'll pay over the life of the loan. Knowing these numbers upfront helps you compare loan offers from different lenders and understand the true cost of borrowing beyond just the sticker interest rate.",
    frWhat: "Ce calculateur calcule le paiement mensuel fixe pour tout prêt amortissable — prêts personnels, prêts auto, ou tout emprunt à taux fixe — ainsi que le total des intérêts que vous paierez sur la durée du prêt. Connaître ces chiffres à l'avance aide à comparer les offres de prêt de différents prêteurs et à comprendre le vrai coût de l'emprunt au-delà du simple taux d'intérêt affiché.",
    how: "The calculator takes the loan amount, annual interest rate, and term in years, then applies the standard amortization formula used by banks. Each monthly payment is the same fixed amount, but the split between interest and principal shifts over time — early payments are mostly interest, later payments are mostly principal.",
    frHow: "Le calculateur prend le montant du prêt, le taux d'intérêt annuel et la durée en années, puis applique la formule d'amortissement standard utilisée par les banques. Chaque paiement mensuel est le même montant fixe, mais la répartition entre intérêts et capital évolue avec le temps — les premiers paiements sont surtout des intérêts, les derniers surtout du capital.",
    formula: { expr: "M = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1]", note: "M = monthly payment, P = principal, r = monthly rate, n = total months" },
    frFormula: { expr: "M = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1]", note: "M = paiement mensuel, P = capital, r = taux mensuel, n = nombre total de mois" },
    examples: [
      { label: "Car loan", input: "$25,000 at 6% for 5 years", result: "$483/month — $4,999 total interest" },
      { label: "Personal loan", input: "$10,000 at 9% for 3 years", result: "$318/month — $1,439 total interest" },
      { label: "Short-term loan", input: "$5,000 at 12% for 1 year", result: "$444/month — $328 total interest" },
    ],
    frExamples: [
      { label: "Prêt auto", input: "25 000$ à 6% sur 5 ans", result: "483$/mois — 4 999$ d'intérêts totaux" },
      { label: "Prêt personnel", input: "10 000$ à 9% sur 3 ans", result: "318$/mois — 1 439$ d'intérêts totaux" },
      { label: "Prêt court terme", input: "5 000$ à 12% sur 1 an", result: "444$/mois — 328$ d'intérêts totaux" },
    ],
    faq: [
      { q: "What's the difference between this and the Mortgage Calculator?", a: "They use the same amortization math — this one is framed for general-purpose loans (personal, auto), while Mortgage is framed specifically for home loans, which often involve larger amounts and longer terms." },
      { q: "Does this include fees or insurance?", a: "No — it calculates pure principal-and-interest payments based on the rate and term you enter. Origination fees, insurance, or other loan costs aren't included and should be added separately." },
      { q: "Why does interest make up more of my early payments?", a: "Interest is charged on the remaining balance, which is highest at the start of the loan. As you pay down principal, the balance shrinks, so less interest accrues each month even though the total payment stays the same." },
    ],
    frFaq: [
      { q: "Quelle est la différence avec le Calculateur d'Hypothèque ?", a: "Ils utilisent les mêmes mathématiques d'amortissement — celui-ci est destiné aux prêts généraux (personnel, auto), tandis que l'Hypothèque est spécifique aux prêts immobiliers, souvent avec des montants et durées plus importants." },
      { q: "Cela inclut-il les frais ou l'assurance ?", a: "Non — il calcule les paiements purs de capital et intérêts selon le taux et la durée saisis. Les frais de dossier, assurance ou autres coûts du prêt ne sont pas inclus et doivent être ajoutés séparément." },
      { q: "Pourquoi les intérêts représentent-ils plus de mes premiers paiements ?", a: "Les intérêts sont calculés sur le solde restant, qui est le plus élevé en début de prêt. À mesure que vous remboursez le capital, le solde diminue, donc moins d'intérêts s'accumulent chaque mois même si le paiement total reste identique." },
    ],
  },

  currency: {
    title: "Currency Converter — Exchange Rates Between World Currencies",
    frTitle: "Convertisseur de Devises — Taux de Change entre Devises Mondiales",
    what: "This tool converts an amount from one currency to another using exchange rates, useful for travel budgeting, online shopping from foreign stores, freelance invoicing in a different currency, or simply understanding how much something costs in your home currency. It covers the world's major currencies.",
    frWhat: "Cet outil convertit un montant d'une devise à une autre à l'aide de taux de change, utile pour le budget de voyage, les achats en ligne depuis des boutiques étrangères, la facturation en freelance dans une autre devise, ou simplement pour comprendre combien coûte quelque chose dans votre devise locale. Il couvre les principales devises mondiales.",
    how: "The amount you enter is multiplied by the current exchange rate between your source and target currency to produce the converted amount. Because exchange rates move constantly based on global markets, the rate used reflects the most recent available data at the time of conversion.",
    frHow: "Le montant saisi est multiplié par le taux de change actuel entre votre devise source et cible pour produire le montant converti. Comme les taux de change évoluent constamment selon les marchés mondiaux, le taux utilisé reflète les données les plus récentes disponibles au moment de la conversion.",
    formula: { expr: "Converted amount = Amount × Exchange rate", note: "Exchange rates change continuously with global markets" },
    frFormula: { expr: "Montant converti = Montant × Taux de change", note: "Les taux de change évoluent continuellement selon les marchés mondiaux" },
    examples: [
      { label: "Travel budget", input: "$500 USD to EUR", result: "≈ €460 (rate-dependent)" },
      { label: "Online purchase", input: "£75 GBP to USD", result: "≈ $95 (rate-dependent)" },
      { label: "Freelance invoice", input: "€1,200 EUR to JPY", result: "≈ ¥195,000 (rate-dependent)" },
    ],
    frExamples: [
      { label: "Budget voyage", input: "500$ USD en EUR", result: "≈ 460€ (selon le taux)" },
      { label: "Achat en ligne", input: "75£ GBP en USD", result: "≈ 95$ (selon le taux)" },
      { label: "Facture freelance", input: "1 200€ EUR en JPY", result: "≈ 195 000¥ (selon le taux)" },
    ],
    faq: [
      { q: "How often do exchange rates update?", a: "Currency markets trade nearly 24 hours a day on weekdays, so rates can shift by the minute. For large transactions, always check the live rate at the time you actually need it." },
      { q: "Why is the rate I see different from my bank's rate?", a: "Banks and payment providers typically add a margin on top of the market ('mid-market') exchange rate, so the rate you're offered when actually exchanging money is usually less favorable than the reference rate shown here." },
      { q: "Which currencies are supported?", a: "All major world currencies are supported, covering the currencies most commonly needed for travel, shopping, and international business." },
    ],
    frFaq: [
      { q: "À quelle fréquence les taux de change sont-ils mis à jour ?", a: "Les marchés des devises se négocient presque 24h/24 en semaine, donc les taux peuvent changer à la minute près. Pour de grosses transactions, vérifiez toujours le taux en direct au moment où vous en avez réellement besoin." },
      { q: "Pourquoi le taux que je vois diffère-t-il de celui de ma banque ?", a: "Les banques et prestataires de paiement ajoutent généralement une marge par rapport au taux de change du marché (« mid-market »), donc le taux qui vous est proposé lors d'un échange réel est habituellement moins favorable que le taux de référence affiché ici." },
      { q: "Quelles devises sont prises en charge ?", a: "Toutes les principales devises mondiales sont prises en charge, couvrant les devises les plus couramment nécessaires pour le voyage, les achats et le commerce international." },
    ],
  },

  gpa: {
    title: "GPA Calculator — Weighted Grade Point Average",
    frTitle: "Calculateur de Moyenne (GPA) — Moyenne Pondérée",
    what: "Grade Point Average (GPA) summarizes your academic performance across multiple courses into a single number, typically on a 4.0 scale. Because courses often carry different credit weights, a simple average of grades isn't accurate — this calculator weights each grade by its credit hours to produce a true GPA, the same way most schools and universities calculate it.",
    frWhat: "La moyenne pondérée (GPA) résume votre performance académique sur plusieurs cours en un seul chiffre, généralement sur une échelle de 4,0. Comme les cours ont souvent des poids de crédits différents, une simple moyenne des notes n'est pas précise — ce calculateur pondère chaque note par ses heures de crédit pour produire un GPA véritable, de la même façon que la plupart des écoles et universités le calculent.",
    how: "Each letter grade is converted to grade points (A=4.0, B=3.0, etc.), multiplied by the number of credit hours for that course, then all of these are summed and divided by the total credit hours across all courses. This weighting means a 4-credit course affects your GPA twice as much as a 2-credit course.",
    frHow: "Chaque note en lettre est convertie en points (A=4,0, B=3,0, etc.), multipliée par le nombre d'heures de crédit de ce cours, puis le tout est additionné et divisé par le total des heures de crédit de tous les cours. Cette pondération signifie qu'un cours de 4 crédits affecte votre GPA deux fois plus qu'un cours de 2 crédits.",
    formula: { expr: "GPA = Σ(Grade Points × Credit Hours) ÷ Σ(Credit Hours)", note: "Standard scale: A=4.0, B=3.0, C=2.0, D=1.0, F=0.0" },
    frFormula: { expr: "GPA = Σ(Points × Heures de Crédit) ÷ Σ(Heures de Crédit)", note: "Échelle standard : A=4,0, B=3,0, C=2,0, D=1,0, F=0,0" },
    examples: [
      { label: "Three courses", input: "A (3cr), B (4cr), A (3cr)", result: "GPA 3.60" },
      { label: "Mixed performance", input: "B (3cr), C (3cr), A (4cr)", result: "GPA 3.10" },
      { label: "Single heavy course", input: "A (5cr), B (2cr)", result: "GPA 3.71" },
    ],
    frExamples: [
      { label: "Trois cours", input: "A (3cr), B (4cr), A (3cr)", result: "GPA 3,60" },
      { label: "Performance mixte", input: "B (3cr), C (3cr), A (4cr)", result: "GPA 3,10" },
      { label: "Cours lourd unique", input: "A (5cr), B (2cr)", result: "GPA 3,71" },
    ],
    faq: [
      { q: "Does this work for weighted (honors/AP) grading scales?", a: "This calculator uses the standard unweighted 4.0 scale. Schools using a 5.0 weighted scale for honors or AP courses would need to adjust the grade point values before entering them." },
      { q: "What if my school uses a different scale (like 10.0 or percentages)?", a: "You'll need to convert your grades to the standard 4.0 scale first, or adjust the grade point values to match your institution's specific conversion table." },
      { q: "How is a semester GPA different from a cumulative GPA?", a: "A semester GPA only includes that term's courses, while a cumulative GPA includes every course and credit hour from every term you've completed — enter all your courses together to get a cumulative figure." },
    ],
    frFaq: [
      { q: "Cela fonctionne-t-il pour les échelles pondérées (honors/AP) ?", a: "Ce calculateur utilise l'échelle standard non pondérée de 4,0. Les écoles utilisant une échelle pondérée de 5,0 pour les cours honors ou AP devraient ajuster les valeurs de points avant de les saisir." },
      { q: "Et si mon école utilise une échelle différente (comme 10,0 ou des pourcentages) ?", a: "Vous devrez d'abord convertir vos notes à l'échelle standard de 4,0, ou ajuster les valeurs de points pour correspondre au tableau de conversion spécifique de votre établissement." },
      { q: "Quelle est la différence entre un GPA de semestre et un GPA cumulatif ?", a: "Un GPA de semestre n'inclut que les cours de ce trimestre, tandis qu'un GPA cumulatif inclut chaque cours et heure de crédit de tous les trimestres complétés — saisissez tous vos cours ensemble pour obtenir un chiffre cumulatif." },
    ],
  },

  scientific: {
    title: "Scientific Calculator — Trigonometry, Logarithms & More",
    frTitle: "Calculatrice Scientifique — Trigonométrie, Logarithmes et Plus",
    what: "This calculator goes beyond basic arithmetic to support the functions needed for algebra, trigonometry, and higher math: trigonometric functions (sin, cos, tan), logarithms, exponents, roots, and constants like π and e. It's built for students, engineers, and anyone who needs more than a phone's basic calculator app.",
    frWhat: "Cette calculatrice va au-delà de l'arithmétique de base pour prendre en charge les fonctions nécessaires à l'algèbre, la trigonométrie et les mathématiques avancées : fonctions trigonométriques (sin, cos, tan), logarithmes, exposants, racines et constantes comme π et e. Elle est conçue pour les étudiants, ingénieurs et toute personne ayant besoin de plus qu'une calculatrice de téléphone basique.",
    how: "Expressions are evaluated following standard mathematical order of operations (parentheses, exponents, multiplication/division, addition/subtraction). Trigonometric functions can typically be switched between degree and radian mode, which is worth double-checking before an angle calculation to avoid a common source of wrong answers.",
    frHow: "Les expressions sont évaluées selon l'ordre standard des opérations mathématiques (parenthèses, exposants, multiplication/division, addition/soustraction). Les fonctions trigonométriques peuvent généralement basculer entre le mode degrés et radians, ce qu'il vaut la peine de vérifier avant un calcul d'angle pour éviter une source d'erreur courante.",
    examples: [
      { label: "Trigonometry", input: "sin(30°)", result: "0.5" },
      { label: "Logarithm", input: "log(1000)", result: "3" },
      { label: "Exponent & root", input: "2^10, √144", result: "1024, 12" },
    ],
    frExamples: [
      { label: "Trigonométrie", input: "sin(30°)", result: "0,5" },
      { label: "Logarithme", input: "log(1000)", result: "3" },
      { label: "Exposant et racine", input: "2^10, √144", result: "1024, 12" },
    ],
    faq: [
      { q: "Degrees or radians — which should I use?", a: "Use degrees for everyday geometry and most school problems; use radians for calculus and most higher-level physics/engineering work. Check which mode is active before trusting a trig result." },
      { q: "What's the difference between log and ln?", a: "log (without a subscript) usually means log base 10, while ln means the natural logarithm, base e (≈2.71828). They're related but give different results for the same input." },
      { q: "Can it handle very large or very small numbers?", a: "Yes, results are typically shown in scientific notation once they exceed a certain size, keeping the display readable regardless of magnitude." },
    ],
    frFaq: [
      { q: "Degrés ou radians — lequel utiliser ?", a: "Utilisez les degrés pour la géométrie quotidienne et la plupart des problèmes scolaires ; utilisez les radians pour le calcul différentiel et la plupart des travaux avancés en physique/ingénierie. Vérifiez quel mode est actif avant de faire confiance à un résultat trigonométrique." },
      { q: "Quelle est la différence entre log et ln ?", a: "log (sans indice) signifie généralement logarithme en base 10, tandis que ln signifie le logarithme naturel, en base e (≈2,71828). Ils sont liés mais donnent des résultats différents pour la même entrée." },
      { q: "Peut-elle gérer de très grands ou très petits nombres ?", a: "Oui, les résultats sont généralement affichés en notation scientifique une fois qu'ils dépassent une certaine taille, gardant l'affichage lisible quelle que soit l'ampleur." },
    ],
  },

  timezone: {
    title: "Time Zone Converter — Compare Times Across the World",
    frTitle: "Convertisseur de Fuseau Horaire — Comparer les Heures dans le Monde",
    what: "This tool converts a time from one time zone to another, essential for scheduling calls with remote colleagues, planning international travel, or coordinating with friends and family abroad. Time zones are defined as offsets from UTC (Coordinated Universal Time), and this calculator handles the arithmetic for you.",
    frWhat: "Cet outil convertit une heure d'un fuseau horaire à un autre, essentiel pour planifier des appels avec des collègues distants, organiser des voyages internationaux, ou coordonner avec des amis et la famille à l'étranger. Les fuseaux horaires sont définis comme des décalages par rapport à UTC (Temps Universel Coordonné), et ce calculateur gère l'arithmétique pour vous.",
    how: "Every time zone has a defined offset from UTC (e.g. UTC-5, UTC+9). Converting between two zones means finding the difference between their offsets and adding or subtracting that many hours from your source time. The calculator also accounts for Daylight Saving Time in regions that observe it, since the offset itself changes twice a year in those places.",
    frHow: "Chaque fuseau horaire a un décalage défini par rapport à UTC (ex. UTC-5, UTC+9). Convertir entre deux fuseaux signifie trouver la différence entre leurs décalages et ajouter ou soustraire ce nombre d'heures à votre heure source. Le calculateur tient aussi compte de l'heure d'été dans les régions qui l'observent, car le décalage lui-même change deux fois par an dans ces endroits.",
    formula: { expr: "Target time = Source time + (Target UTC offset − Source UTC offset)", note: "Adjust for Daylight Saving Time where applicable" },
    frFormula: { expr: "Heure cible = Heure source + (Décalage UTC cible − Décalage UTC source)", note: "Ajuster pour l'heure d'été le cas échéant" },
    examples: [
      { label: "NY to London", input: "9:00 AM EST → London", result: "2:00 PM GMT" },
      { label: "Tokyo to LA", input: "6:00 PM JST → Los Angeles", result: "1:00 AM PST (same day)" },
      { label: "Paris to Sydney", input: "10:00 AM CET → Sydney", result: "7:00 PM AEDT" },
    ],
    frExamples: [
      { label: "NY vers Londres", input: "9h00 EST → Londres", result: "14h00 GMT" },
      { label: "Tokyo vers LA", input: "18h00 JST → Los Angeles", result: "1h00 PST (même jour)" },
      { label: "Paris vers Sydney", input: "10h00 CET → Sydney", result: "19h00 AEDT" },
    ],
    faq: [
      { q: "Why did my converted time seem off by an hour?", a: "This is almost always a Daylight Saving Time mismatch — one of the two locations observes DST and the other doesn't, or they're not in their DST period at the same time of year. Double-check the current DST status for both locations." },
      { q: "Does every country use Daylight Saving Time?", a: "No — most of Asia, Africa, and many other regions don't observe DST at all, while countries that do observe it don't all switch on the same dates, making cross-region conversions trickier around the transition periods." },
      { q: "What is UTC and why does it matter?", a: "UTC is the global time standard that doesn't change with seasons, used as the reference point every time zone is defined against. It's the safest time to communicate in writing (e.g. in a meeting invite) to avoid ambiguity." },
    ],
    frFaq: [
      { q: "Pourquoi mon heure convertie semble-t-elle décalée d'une heure ?", a: "C'est presque toujours un décalage lié à l'heure d'été — l'un des deux lieux l'observe et pas l'autre, ou ils ne sont pas dans leur période d'heure d'été au même moment de l'année. Vérifiez le statut actuel de l'heure d'été pour les deux lieux." },
      { q: "Tous les pays utilisent-ils l'heure d'été ?", a: "Non — la plupart de l'Asie, de l'Afrique et de nombreuses autres régions n'observent pas du tout l'heure d'été, tandis que les pays qui l'observent ne changent pas tous aux mêmes dates, compliquant les conversions autour des périodes de transition." },
      { q: "Qu'est-ce que UTC et pourquoi est-ce important ?", a: "UTC est la référence horaire mondiale qui ne change pas avec les saisons, utilisée comme point de référence pour définir chaque fuseau horaire. C'est l'heure la plus sûre à utiliser à l'écrit (ex. une invitation de réunion) pour éviter toute ambiguïté." },
    ],
  },

  password: {
    title: "Password Generator — Strong, Random Passwords",
    frTitle: "Générateur de Mot de Passe — Mots de Passe Forts et Aléatoires",
    what: "This tool generates strong, random passwords using a mix of uppercase and lowercase letters, numbers, and symbols. Random passwords are far more resistant to brute-force and dictionary attacks than human-created ones, since people tend to reuse predictable patterns (names, dates, common substitutions) that attackers already know to try first.",
    frWhat: "Cet outil génère des mots de passe forts et aléatoires en mélangeant lettres majuscules et minuscules, chiffres et symboles. Les mots de passe aléatoires résistent bien mieux aux attaques par force brute et par dictionnaire que ceux créés par des humains, car les gens ont tendance à réutiliser des motifs prévisibles (noms, dates, substitutions courantes) que les attaquants savent déjà essayer en premier.",
    how: "Each character of the password is chosen at random from the character sets you enable (uppercase, lowercase, numbers, symbols), using your browser's random number generator. Length matters more than most people realize — each additional character multiplies the number of possible combinations, making the password exponentially harder to guess.",
    frHow: "Chaque caractère du mot de passe est choisi au hasard parmi les ensembles de caractères activés (majuscules, minuscules, chiffres, symboles), en utilisant le générateur de nombres aléatoires de votre navigateur. La longueur compte plus qu'on ne le pense — chaque caractère supplémentaire multiplie le nombre de combinaisons possibles, rendant le mot de passe exponentiellement plus difficile à deviner.",
    examples: [
      { label: "12 characters, all sets", input: "Length 12, upper+lower+numbers+symbols", result: "e.g. K7#mQ2!vXz9$" },
      { label: "16 characters, no symbols", input: "Length 16, upper+lower+numbers", result: "e.g. Tf82RqLm5vNpXk3D" },
      { label: "Simple, letters only", input: "Length 10, lowercase only", result: "e.g. qmzxvkrtpb" },
    ],
    frExamples: [
      { label: "12 caractères, tous les jeux", input: "Longueur 12, maj+min+chiffres+symboles", result: "ex. K7#mQ2!vXz9$" },
      { label: "16 caractères, sans symboles", input: "Longueur 16, maj+min+chiffres", result: "ex. Tf82RqLm5vNpXk3D" },
      { label: "Simple, lettres uniquement", input: "Longueur 10, minuscules uniquement", result: "ex. qmzxvkrtpb" },
    ],
    faq: [
      { q: "How long should my password be?", a: "At least 12 characters is a common modern baseline; 16+ is better for important accounts. Length contributes more to security than complexity — a long passphrase can be both strong and easier to remember." },
      { q: "Should I include symbols?", a: "Yes, if the site allows them — symbols expand the character set the password is drawn from, increasing the total possible combinations an attacker would need to try." },
      { q: "Is it safe to generate passwords in a browser?", a: "This tool generates passwords entirely in your browser using its built-in random number generator — the password is never sent anywhere, but you should still avoid reusing the same password across multiple sites." },
    ],
    frFaq: [
      { q: "Quelle longueur devrait avoir mon mot de passe ?", a: "Au moins 12 caractères est une base moderne courante ; 16+ est préférable pour les comptes importants. La longueur contribue plus à la sécurité que la complexité — une longue phrase de passe peut être à la fois forte et plus facile à retenir." },
      { q: "Dois-je inclure des symboles ?", a: "Oui, si le site les autorise — les symboles élargissent l'ensemble de caractères dont est tiré le mot de passe, augmentant le nombre total de combinaisons qu'un attaquant devrait essayer." },
      { q: "Est-il sûr de générer des mots de passe dans un navigateur ?", a: "Cet outil génère les mots de passe entièrement dans votre navigateur avec son générateur de nombres aléatoires intégré — le mot de passe n'est jamais envoyé où que ce soit, mais évitez tout de même de réutiliser le même mot de passe sur plusieurs sites." },
    ],
  },

  uuid: {
    title: "UUID Generator — Random Unique Identifiers",
    frTitle: "Générateur UUID — Identifiants Uniques Aléatoires",
    what: "A UUID (Universally Unique Identifier) is a 128-bit random value used across software systems to identify records, sessions, or objects without needing a central authority to hand out sequential IDs. This generator creates standard version-4 (random) UUIDs, commonly used in databases, APIs, and distributed systems.",
    frWhat: "Un UUID (Identifiant Unique Universel) est une valeur aléatoire de 128 bits utilisée dans les systèmes logiciels pour identifier des enregistrements, sessions ou objets sans avoir besoin d'une autorité centrale distribuant des ID séquentiels. Ce générateur crée des UUID version 4 (aléatoires) standards, couramment utilisés dans les bases de données, API et systèmes distribués.",
    how: "A version-4 UUID is built from 122 random bits (the remaining 6 bits are fixed to mark the version and variant), formatted as 32 hexadecimal characters split into five groups by hyphens. With that much randomness, the odds of two independently generated UUIDs ever colliding are astronomically small.",
    frHow: "Un UUID version 4 est construit à partir de 122 bits aléatoires (les 6 bits restants sont fixes pour marquer la version et la variante), formaté en 32 caractères hexadécimaux répartis en cinq groupes séparés par des tirets. Avec autant d'aléatoire, la probabilité que deux UUID générés indépendamment entrent en collision est astronomiquement faible.",
    formula: { expr: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", note: "x = random hex digit, 4 marks the version, y is one of 8/9/a/b (the variant)" },
    frFormula: { expr: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", note: "x = chiffre hexadécimal aléatoire, 4 marque la version, y est 8/9/a/b (la variante)" },
    examples: [
      { label: "Single UUID", input: "Generate 1", result: "e.g. 3f29a8c2-7e41-4b6d-9a13-f0d8c4e7b921" },
      { label: "Batch", input: "Generate 5", result: "5 unique UUIDs, one per line" },
    ],
    frExamples: [
      { label: "UUID unique", input: "Générer 1", result: "ex. 3f29a8c2-7e41-4b6d-9a13-f0d8c4e7b921" },
      { label: "Lot", input: "Générer 5", result: "5 UUID uniques, un par ligne" },
    ],
    faq: [
      { q: "Can two generated UUIDs ever be the same?", a: "In theory yes, but the probability is so low (roughly 1 in 2.7×10³⁸) that it's considered practically impossible — you'd need to generate billions of UUIDs per second for billions of years before a collision became likely." },
      { q: "What's the difference between UUID versions?", a: "Version 4 (used here) is purely random. Other versions derive the UUID from timestamps, MAC addresses, or namespaces instead — version 4 is the most common choice when you just need a unique, unpredictable ID." },
      { q: "Where are UUIDs commonly used?", a: "Database primary keys, API request IDs, session tokens, and distributed system object identifiers are all common uses, since UUIDs can be generated independently on different machines without any coordination." },
    ],
    frFaq: [
      { q: "Deux UUID générés peuvent-ils être identiques ?", a: "En théorie oui, mais la probabilité est si faible (environ 1 sur 2,7×10³⁸) qu'elle est considérée comme pratiquement impossible — il faudrait générer des milliards d'UUID par seconde pendant des milliards d'années avant qu'une collision devienne probable." },
      { q: "Quelle est la différence entre les versions d'UUID ?", a: "La version 4 (utilisée ici) est purement aléatoire. D'autres versions dérivent l'UUID d'horodatages, d'adresses MAC ou d'espaces de noms — la version 4 est le choix le plus courant quand on a simplement besoin d'un ID unique et imprévisible." },
      { q: "Où les UUID sont-ils couramment utilisés ?", a: "Les clés primaires de base de données, ID de requêtes API, jetons de session et identifiants d'objets de systèmes distribués sont des usages courants, car les UUID peuvent être générés indépendamment sur différentes machines sans coordination." },
    ],
  },

  json: {
    title: "JSON Formatter — Validate & Beautify JSON",
    frTitle: "Formateur JSON — Valider et Embellir le JSON",
    what: "This tool formats messy or minified JSON into a readable, properly indented structure, and validates that the JSON is syntactically correct along the way. It's a daily tool for developers working with APIs, config files, or debugging data that arrives as a single unreadable line of text.",
    frWhat: "Cet outil formate du JSON désordonné ou minifié en une structure lisible et correctement indentée, tout en validant que le JSON est syntaxiquement correct. C'est un outil quotidien pour les développeurs travaillant avec des API, des fichiers de configuration, ou déboguant des données arrivant en une seule ligne de texte illisible.",
    how: "The tool parses your input as JSON — checking that brackets, quotes, and commas are all correctly placed — then re-serializes it with consistent indentation. If the input has a syntax error, the parser reports where it failed, which is usually the fastest way to locate a typo in a large JSON payload.",
    frHow: "L'outil analyse votre saisie en tant que JSON — vérifiant que les crochets, guillemets et virgules sont correctement placés — puis le re-sérialise avec une indentation cohérente. Si l'entrée a une erreur de syntaxe, l'analyseur indique où il a échoué, ce qui est généralement le moyen le plus rapide de localiser une faute de frappe dans un gros payload JSON.",
    examples: [
      { label: "Minified input", input: '{"name":"Alex","age":30}', result: "Formatted with 2-space indent, one field per line" },
      { label: "Invalid JSON", input: '{"name":"Alex",}', result: "Error: trailing comma not allowed" },
    ],
    frExamples: [
      { label: "Entrée minifiée", input: '{"name":"Alex","age":30}', result: "Formaté avec indentation de 2 espaces, un champ par ligne" },
      { label: "JSON invalide", input: '{"name":"Alex",}', result: "Erreur : virgule finale non autorisée" },
    ],
    faq: [
      { q: "Why does my JSON fail to format?", a: "The most common causes are trailing commas (not allowed in standard JSON), unquoted keys, single quotes instead of double quotes, or a missing closing bracket — the error message points to roughly where the parser got stuck." },
      { q: "Is my data sent anywhere when I format it?", a: "No — parsing and formatting happens entirely in your browser using standard JSON parsing, so your data never leaves your device." },
      { q: "Can this minify JSON too, not just beautify it?", a: "Formatting and minifying are the same operation with different indentation settings — most JSON formatters offer both a readable (indented) and compact (single-line) output option." },
    ],
    frFaq: [
      { q: "Pourquoi mon JSON échoue-t-il au formatage ?", a: "Les causes les plus courantes sont les virgules finales (non autorisées en JSON standard), les clés sans guillemets, des guillemets simples au lieu de doubles, ou un crochet fermant manquant — le message d'erreur indique approximativement où l'analyseur s'est bloqué." },
      { q: "Mes données sont-elles envoyées quelque part lors du formatage ?", a: "Non — l'analyse et le formatage se font entièrement dans votre navigateur avec l'analyse JSON standard, donc vos données ne quittent jamais votre appareil." },
      { q: "Cela peut-il aussi minifier le JSON, pas seulement l'embellir ?", a: "Formater et minifier sont la même opération avec des réglages d'indentation différents — la plupart des formateurs JSON offrent une sortie lisible (indentée) et compacte (une ligne)." },
    ],
  },

  qr: {
    title: "QR Code Generator — Create Free QR Codes",
    frTitle: "Générateur de QR Code — Créer des QR Codes Gratuits",
    what: "This tool turns any text, URL, Wi-Fi credentials, or contact info into a scannable QR code image you can download and use on flyers, business cards, product packaging, or digital menus. QR codes let someone open a link or capture information instantly with their phone's camera, without typing anything.",
    frWhat: "Cet outil transforme tout texte, URL, identifiants Wi-Fi ou informations de contact en une image de QR code scannable que vous pouvez télécharger et utiliser sur des flyers, cartes de visite, emballages produits ou menus numériques. Les QR codes permettent d'ouvrir un lien ou capturer une information instantanément avec l'appareil photo d'un téléphone, sans rien taper.",
    how: "The QR code encodes your input data into a grid of black and white squares following the QR standard, which includes built-in error correction — meaning the code can still be scanned successfully even if part of it is smudged, scratched, or partially covered by a logo.",
    frHow: "Le QR code encode vos données d'entrée dans une grille de carrés noirs et blancs selon le standard QR, qui inclut une correction d'erreur intégrée — ce qui signifie que le code peut toujours être scanné avec succès même si une partie est tachée, rayée, ou partiellement couverte par un logo.",
    examples: [
      { label: "Website link", input: "https://example.com", result: "Scannable QR code opening that URL" },
      { label: "Wi-Fi credentials", input: "Network name + password", result: "QR code that connects a phone to Wi-Fi when scanned" },
      { label: "Plain text", input: "Any short message", result: "QR code displaying that text when scanned" },
    ],
    frExamples: [
      { label: "Lien de site web", input: "https://example.com", result: "QR code scannable ouvrant cette URL" },
      { label: "Identifiants Wi-Fi", input: "Nom du réseau + mot de passe", result: "QR code qui connecte un téléphone au Wi-Fi une fois scanné" },
      { label: "Texte simple", input: "Tout message court", result: "QR code affichant ce texte une fois scanné" },
    ],
    faq: [
      { q: "Do QR codes expire?", a: "No — a QR code generated this way encodes the data directly and permanently. It will keep working as long as the underlying content (like a linked webpage) still exists; the code image itself never expires." },
      { q: "Can I put a logo in the middle of my QR code?", a: "Many QR generators support this because of built-in error correction, which tolerates a portion of the code being obscured — though covering too much can still make it unreadable, so keep any logo small relative to the whole code." },
      { q: "What can I encode besides a URL?", a: "Plain text, Wi-Fi network credentials, contact cards (vCard), email addresses, and phone numbers are all commonly supported — anything the QR standard can represent as text." },
    ],
    frFaq: [
      { q: "Les QR codes expirent-ils ?", a: "Non — un QR code généré ainsi encode les données directement et de façon permanente. Il continuera de fonctionner tant que le contenu sous-jacent (comme une page web liée) existe encore ; l'image du code elle-même n'expire jamais." },
      { q: "Puis-je mettre un logo au centre de mon QR code ?", a: "De nombreux générateurs de QR code le permettent grâce à la correction d'erreur intégrée, qui tolère qu'une partie du code soit masquée — mais en couvrir trop peut quand même le rendre illisible, donc gardez tout logo petit par rapport à l'ensemble du code." },
      { q: "Que puis-je encoder à part une URL ?", a: "Texte simple, identifiants de réseau Wi-Fi, cartes de contact (vCard), adresses email et numéros de téléphone sont tous couramment pris en charge — tout ce que le standard QR peut représenter en texte." },
    ],
  },

  wordcount: {
    title: "Word Counter — Words, Characters & Reading Time",
    frTitle: "Compteur de Mots — Mots, Caractères et Temps de Lecture",
    what: "This tool counts the words, characters, sentences, and paragraphs in any text you paste in, and estimates reading time. It's commonly used for meeting essay word limits, staying within social media character limits, checking article length for SEO, or estimating how long a speech or presentation will take.",
    frWhat: "Cet outil compte les mots, caractères, phrases et paragraphes de tout texte collé, et estime le temps de lecture. Il est couramment utilisé pour respecter des limites de mots d'essais, rester dans les limites de caractères des réseaux sociaux, vérifier la longueur d'un article pour le SEO, ou estimer la durée d'un discours ou d'une présentation.",
    how: "Words are counted by splitting the text on whitespace, characters are counted with and without spaces, sentences are detected by terminal punctuation (. ! ?), and paragraphs by line breaks. Reading time is estimated using an average adult reading speed, typically around 200-250 words per minute.",
    frHow: "Les mots sont comptés en divisant le texte sur les espaces, les caractères sont comptés avec et sans espaces, les phrases sont détectées par la ponctuation finale (. ! ?), et les paragraphes par les sauts de ligne. Le temps de lecture est estimé en utilisant une vitesse de lecture moyenne adulte, généralement autour de 200-250 mots par minute.",
    examples: [
      { label: "Short paragraph", input: "A 3-sentence paragraph", result: "~45 words, ~260 characters, <1 min read" },
      { label: "Tweet-length text", input: "280-character post", result: "~50 words, 280 characters" },
      { label: "Full essay", input: "1,500-word essay", result: "1,500 words, ~6 min read" },
    ],
    frExamples: [
      { label: "Paragraphe court", input: "Un paragraphe de 3 phrases", result: "~45 mots, ~260 caractères, <1 min de lecture" },
      { label: "Texte format tweet", input: "Publication de 280 caractères", result: "~50 mots, 280 caractères" },
      { label: "Essai complet", input: "Essai de 1 500 mots", result: "1 500 mots, ~6 min de lecture" },
    ],
    faq: [
      { q: "Why does my word count differ slightly from my word processor?", a: "Different tools handle edge cases like hyphenated words, numbers, or multiple consecutive spaces slightly differently — small discrepancies of a few words are normal and rarely matter for practical purposes." },
      { q: "Does this count characters with or without spaces?", a: "Both figures are typically shown, since some limits (like certain form fields) count spaces while others (like some social platforms) may count differently — check which figure applies to your specific limit." },
      { q: "How accurate is the reading time estimate?", a: "It's a rough average based on typical adult reading speed — actual reading time varies with text complexity, the reader's familiarity with the subject, and whether they're skimming or reading closely." },
    ],
    frFaq: [
      { q: "Pourquoi mon nombre de mots diffère-t-il légèrement de mon traitement de texte ?", a: "Différents outils gèrent les cas particuliers comme les mots avec trait d'union, les nombres ou les espaces multiples consécutifs un peu différemment — de petits écarts de quelques mots sont normaux et rarement significatifs en pratique." },
      { q: "Cela compte-t-il les caractères avec ou sans espaces ?", a: "Les deux chiffres sont généralement affichés, car certaines limites (comme certains champs de formulaire) comptent les espaces tandis que d'autres (comme certaines plateformes sociales) comptent différemment — vérifiez quel chiffre s'applique à votre limite spécifique." },
      { q: "Quelle est la précision de l'estimation du temps de lecture ?", a: "C'est une moyenne approximative basée sur la vitesse de lecture typique d'un adulte — le temps de lecture réel varie selon la complexité du texte, la familiarité du lecteur avec le sujet, et s'il survole ou lit attentivement." },
    ],
  },

  textdiff: {
    title: "Text Diff Checker — Compare Two Texts",
    frTitle: "Comparateur de Texte — Comparer Deux Textes",
    what: "This tool compares two blocks of text and highlights exactly what changed between them — additions, deletions, and modifications — line by line. It's used to review edits between document versions, compare contract revisions, spot changes in code snippets, or verify that two pieces of text are truly identical.",
    frWhat: "Cet outil compare deux blocs de texte et met en évidence exactement ce qui a changé entre eux — ajouts, suppressions et modifications — ligne par ligne. Il est utilisé pour vérifier des modifications entre versions de documents, comparer des révisions de contrats, repérer des changements dans des extraits de code, ou vérifier que deux textes sont véritablement identiques.",
    how: "The tool aligns both texts line by line and applies a diff algorithm to identify which lines match, which were added, and which were removed. Matching lines are shown normally, while added and removed lines are color-coded, making changes easy to scan even in long documents.",
    frHow: "L'outil aligne les deux textes ligne par ligne et applique un algorithme de diff pour identifier quelles lignes correspondent, lesquelles ont été ajoutées et lesquelles ont été supprimées. Les lignes correspondantes sont affichées normalement, tandis que les lignes ajoutées et supprimées sont colorées, rendant les changements faciles à repérer même dans de longs documents.",
    examples: [
      { label: "Single word change", input: "\"the quick fox\" vs \"the slow fox\"", result: "'quick' removed, 'slow' added" },
      { label: "Added line", input: "2 lines vs same 2 lines + 1 new line", result: "Third line highlighted as added" },
    ],
    frExamples: [
      { label: "Changement d'un mot", input: "\"le renard rapide\" vs \"le renard lent\"", result: "'rapide' supprimé, 'lent' ajouté" },
      { label: "Ligne ajoutée", input: "2 lignes vs mêmes 2 lignes + 1 nouvelle", result: "Troisième ligne mise en évidence comme ajoutée" },
    ],
    faq: [
      { q: "Does this compare word-by-word or line-by-line?", a: "The comparison works line by line to identify structural changes; within a changed line, the specific difference is usually still visually clear from the highlighted portion." },
      { q: "Does whitespace affect the comparison?", a: "Extra spaces or different line endings can register as differences even when the visible text looks the same — if you're getting unexpected results, check for trailing whitespace or inconsistent formatting." },
      { q: "Is my text uploaded anywhere?", a: "No — the comparison runs entirely in your browser, so neither text is sent to a server." },
    ],
    frFaq: [
      { q: "Cela compare-t-il mot par mot ou ligne par ligne ?", a: "La comparaison fonctionne ligne par ligne pour identifier les changements structurels ; au sein d'une ligne modifiée, la différence spécifique reste généralement visuellement claire grâce à la partie mise en évidence." },
      { q: "Les espaces affectent-ils la comparaison ?", a: "Des espaces supplémentaires ou des fins de ligne différentes peuvent être enregistrés comme des différences même quand le texte visible semble identique — en cas de résultat inattendu, vérifiez les espaces en fin de ligne ou un formatage incohérent." },
      { q: "Mon texte est-il envoyé quelque part ?", a: "Non — la comparaison s'exécute entièrement dans votre navigateur, donc aucun des deux textes n'est envoyé à un serveur." },
    ],
  },

  lorem: {
    title: "Lorem Ipsum Generator — Placeholder Text",
    frTitle: "Générateur de Lorem Ipsum — Texte de Remplissage",
    what: "Lorem Ipsum is scrambled, meaningless Latin-derived text used as filler in designs, mockups, and templates, so viewers focus on layout and typography instead of being distracted by actual (and often not-yet-written) content. It's an industry standard that's been used by designers and publishers since long before digital design existed.",
    frWhat: "Le Lorem Ipsum est un texte pseudo-latin brouillé et dénué de sens, utilisé comme texte de remplissage dans les designs, maquettes et modèles, afin que les observateurs se concentrent sur la mise en page et la typographie plutôt que d'être distraits par le contenu réel (souvent pas encore rédigé). C'est une norme du secteur utilisée par les designers et éditeurs bien avant l'existence du design numérique.",
    how: "You choose how much text you need — a number of words, sentences, or paragraphs — and the generator assembles that amount from the classic Lorem Ipsum passage (derived from a 1st-century BC Latin text by Cicero), repeating and reshuffling it as needed to fill the requested length.",
    frHow: "Vous choisissez la quantité de texte nécessaire — un nombre de mots, phrases ou paragraphes — et le générateur assemble cette quantité à partir du passage classique du Lorem Ipsum (dérivé d'un texte latin du 1er siècle av. J.-C. de Cicéron), en le répétant et le réorganisant selon les besoins pour atteindre la longueur demandée.",
    examples: [
      { label: "One paragraph", input: "1 paragraph", result: "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit...\"" },
      { label: "Short heading filler", input: "5 words", result: "\"Lorem ipsum dolor sit amet\"" },
    ],
    frExamples: [
      { label: "Un paragraphe", input: "1 paragraphe", result: "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit...\"" },
      { label: "Remplissage de titre court", input: "5 mots", result: "\"Lorem ipsum dolor sit amet\"" },
    ],
    faq: [
      { q: "Why is Lorem Ipsum used instead of real text?", a: "Because it looks like natural language (with realistic word lengths and letter distribution) without being readable, viewers don't get distracted reading the content and instead evaluate the actual layout and typography objectively." },
      { q: "What does Lorem Ipsum actually mean?", a: "It's scrambled and altered Latin from a passage by Cicero, and in its jumbled form it doesn't translate to anything coherent — its content has never mattered, only its visual texture as a stand-in for real text." },
      { q: "Can I generate it in a different language?", a: "This generator produces the classic Latin-derived Lorem Ipsum; if you need placeholder text that reads naturally in a specific language, you'd want a language-specific filler text generator instead." },
    ],
    frFaq: [
      { q: "Pourquoi utilise-t-on le Lorem Ipsum au lieu d'un vrai texte ?", a: "Comme il ressemble à un langage naturel (avec des longueurs de mots et une distribution de lettres réalistes) sans être lisible, les observateurs ne sont pas distraits par la lecture du contenu et évaluent objectivement la mise en page et la typographie réelles." },
      { q: "Que signifie réellement le Lorem Ipsum ?", a: "C'est du latin brouillé et modifié issu d'un passage de Cicéron, et sous sa forme mélangée il ne se traduit en rien de cohérent — son contenu n'a jamais eu d'importance, seule sa texture visuelle en tant que substitut de texte réel compte." },
      { q: "Puis-je le générer dans une autre langue ?", a: "Ce générateur produit le Lorem Ipsum classique dérivé du latin ; si vous avez besoin d'un texte de remplissage qui se lit naturellement dans une langue spécifique, il vous faudrait plutôt un générateur de texte de remplissage propre à cette langue." },
    ],
  },

  casegen: {
    title: "Case Converter — UPPERCASE, lowercase, Title Case & More",
    frTitle: "Convertisseur de Casse — MAJUSCULES, minuscules, Casse de Titre et Plus",
    what: "This tool converts text between different capitalization styles: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case. It's handy for cleaning up pasted text, preparing variable names for code, formatting headings consistently, or fixing text that was accidentally typed with Caps Lock on.",
    frWhat: "Cet outil convertit du texte entre différents styles de casse : MAJUSCULES, minuscules, Casse De Titre, Casse de phrase, camelCase, snake_case et kebab-case. Il est pratique pour nettoyer du texte collé, préparer des noms de variables pour du code, formater des titres de manière cohérente, ou corriger du texte tapé accidentellement avec le verrouillage majuscule activé.",
    how: "Each case style follows its own rule: UPPERCASE and lowercase transform every letter; Title Case capitalizes the first letter of each word; Sentence case capitalizes only the first letter of the text; and the programming-oriented styles (camelCase, snake_case, kebab-case) remove spaces and join words using capitalization, underscores, or hyphens respectively.",
    frHow: "Chaque style de casse suit sa propre règle : MAJUSCULES et minuscules transforment chaque lettre ; Casse de Titre met en majuscule la première lettre de chaque mot ; Casse de phrase met en majuscule seulement la première lettre du texte ; et les styles orientés programmation (camelCase, snake_case, kebab-case) suppriment les espaces et joignent les mots en utilisant la casse, les tirets bas ou les tirets respectivement.",
    examples: [
      { label: "Title Case", input: "\"hello world example\"", result: "\"Hello World Example\"" },
      { label: "camelCase", input: "\"hello world example\"", result: "\"helloWorldExample\"" },
      { label: "snake_case", input: "\"Hello World Example\"", result: "\"hello_world_example\"" },
    ],
    frExamples: [
      { label: "Casse de Titre", input: "\"bonjour le monde\"", result: "\"Bonjour Le Monde\"" },
      { label: "camelCase", input: "\"bonjour le monde\"", result: "\"bonjourLeMonde\"" },
      { label: "snake_case", input: "\"Bonjour Le Monde\"", result: "\"bonjour_le_monde\"" },
    ],
    faq: [
      { q: "What's the difference between camelCase and PascalCase?", a: "camelCase starts with a lowercase letter (helloWorld), while PascalCase starts with an uppercase letter (HelloWorld) — camelCase is typically used for variables and functions, PascalCase for class or type names in most programming languages." },
      { q: "Why does Title Case sometimes capitalize small words like 'the' or 'of'?", a: "Simple Title Case converters capitalize every word for consistency; proper editorial title-case rules actually keep short articles, conjunctions, and prepositions lowercase unless they're the first or last word — check which convention your style guide requires." },
      { q: "Does this handle accented characters correctly?", a: "Standard case conversion works with accented letters (é, à, ü, etc.) the same way it does with unaccented ones, converting them to their corresponding upper or lower case form." },
    ],
    frFaq: [
      { q: "Quelle est la différence entre camelCase et PascalCase ?", a: "camelCase commence par une minuscule (helloWorld), tandis que PascalCase commence par une majuscule (HelloWorld) — camelCase est typiquement utilisé pour les variables et fonctions, PascalCase pour les noms de classes ou de types dans la plupart des langages de programmation." },
      { q: "Pourquoi la Casse de Titre met-elle parfois en majuscule des petits mots comme 'le' ou 'de' ?", a: "Les convertisseurs simples de Casse de Titre mettent chaque mot en majuscule par cohérence ; les vraies règles éditoriales de casse de titre gardent en réalité les articles courts, conjonctions et prépositions en minuscule sauf s'ils sont le premier ou dernier mot — vérifiez quelle convention exige votre guide de style." },
      { q: "Cela gère-t-il correctement les caractères accentués ?", a: "La conversion de casse standard fonctionne avec les lettres accentuées (é, à, ü, etc.) de la même façon qu'avec les lettres non accentuées, les convertissant vers leur forme majuscule ou minuscule correspondante." },
    ],
  },

  sha256: {
    title: "SHA-256 Generator — Cryptographic Hash Calculator",
    frTitle: "Générateur SHA-256 — Calculateur de Hachage Cryptographique",
    what: "SHA-256 is a one-way cryptographic hash function that turns any input — text, a file, a password — into a fixed 256-bit (64 hexadecimal character) fingerprint. It's used to verify that a file hasn't been tampered with, to store passwords without keeping the actual password, and as a building block in blockchain and digital signature systems.",
    frWhat: "SHA-256 est une fonction de hachage cryptographique à sens unique qui transforme toute entrée — texte, fichier, mot de passe — en une empreinte fixe de 256 bits (64 caractères hexadécimaux). Elle est utilisée pour vérifier qu'un fichier n'a pas été altéré, pour stocker des mots de passe sans conserver le mot de passe réel, et comme composant de base dans les systèmes de blockchain et de signature numérique.",
    how: "The input is processed through the SHA-256 algorithm, which mixes and compresses the data through many rounds of mathematical operations to produce a fixed-length output. Critically, this process is one-way — you cannot reverse a hash back into its original input — and even a single-character change to the input produces a completely different hash.",
    frHow: "L'entrée est traitée par l'algorithme SHA-256, qui mélange et compresse les données à travers de nombreux cycles d'opérations mathématiques pour produire une sortie de longueur fixe. Ce processus est essentiellement à sens unique — on ne peut pas inverser un hachage pour retrouver son entrée d'origine — et même un changement d'un seul caractère dans l'entrée produit un hachage complètement différent.",
    examples: [
      { label: "Simple text", input: "\"hello\"", result: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824" },
      { label: "Empty string", input: "\"\"", result: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    ],
    frExamples: [
      { label: "Texte simple", input: "\"hello\"", result: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824" },
      { label: "Chaîne vide", input: "\"\"", result: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    ],
    faq: [
      { q: "Can I reverse a SHA-256 hash back to the original text?", a: "No — SHA-256 is a one-way function by design. The only practical way to 'reverse' it is to guess inputs and hash them until one matches, which is why short, guessable inputs (like weak passwords) are still vulnerable even when hashed." },
      { q: "Why do two identical inputs always produce the same hash?", a: "SHA-256 is deterministic — the same input always produces the same output, which is exactly what makes it useful for verifying that a file or piece of text hasn't changed: hash it again and compare." },
      { q: "Is SHA-256 still considered secure?", a: "Yes, SHA-256 has no known practical vulnerabilities and remains widely used in security-critical systems, including Bitcoin's blockchain. For password storage specifically, though, dedicated password-hashing algorithms (like bcrypt or Argon2) are recommended over plain SHA-256." },
    ],
    frFaq: [
      { q: "Puis-je inverser un hachage SHA-256 pour retrouver le texte original ?", a: "Non — SHA-256 est une fonction à sens unique par conception. La seule façon pratique de « l'inverser » est de deviner des entrées et de les hacher jusqu'à ce qu'une corresponde, ce qui explique pourquoi des entrées courtes et devinables (comme des mots de passe faibles) restent vulnérables même hachées." },
      { q: "Pourquoi deux entrées identiques produisent-elles toujours le même hachage ?", a: "SHA-256 est déterministe — la même entrée produit toujours la même sortie, ce qui est exactement ce qui le rend utile pour vérifier qu'un fichier ou un texte n'a pas changé : le hacher à nouveau et comparer." },
      { q: "SHA-256 est-il toujours considéré comme sûr ?", a: "Oui, SHA-256 n'a aucune vulnérabilité pratique connue et reste largement utilisé dans les systèmes critiques de sécurité, y compris la blockchain de Bitcoin. Pour le stockage de mots de passe spécifiquement, des algorithmes dédiés (comme bcrypt ou Argon2) sont toutefois recommandés plutôt que SHA-256 seul." },
    ],
  },

  base64: {
    title: "Base64 Encoder/Decoder — Convert Text & Data to Base64",
    frTitle: "Encodeur/Décodeur Base64 — Convertir Texte et Données en Base64",
    what: "Base64 is a way of encoding binary data (like images or files) as plain text, using only 64 safe characters (A-Z, a-z, 0-9, + and /). It's used to embed images directly in HTML/CSS, attach binary data to text-based formats like JSON or email, and safely transmit data through systems that only handle plain text.",
    frWhat: "Base64 est une façon d'encoder des données binaires (comme des images ou fichiers) en texte brut, en utilisant seulement 64 caractères sûrs (A-Z, a-z, 0-9, + et /). Il est utilisé pour intégrer des images directement dans du HTML/CSS, attacher des données binaires à des formats textuels comme JSON ou email, et transmettre en toute sécurité des données via des systèmes qui ne gèrent que du texte brut.",
    how: "Encoding takes the raw bytes of your input and regroups them into 6-bit chunks (since 2⁶ = 64), mapping each chunk to one of the 64 allowed characters. This means Base64 output is always about 33% larger than the original data — a necessary trade-off for making binary data safely representable as text.",
    frHow: "L'encodage prend les octets bruts de votre entrée et les regroupe en blocs de 6 bits (puisque 2⁶ = 64), associant chaque bloc à l'un des 64 caractères autorisés. Cela signifie que la sortie Base64 est toujours environ 33% plus grande que les données d'origine — un compromis nécessaire pour rendre les données binaires représentables en toute sécurité sous forme de texte.",
    examples: [
      { label: "Encode text", input: "\"Hello, World!\"", result: "\"SGVsbG8sIFdvcmxkIQ==\"" },
      { label: "Decode text", input: "\"SGVsbG8sIFdvcmxkIQ==\"", result: "\"Hello, World!\"" },
    ],
    frExamples: [
      { label: "Encoder du texte", input: "\"Bonjour le monde !\"", result: "\"Qm9uam91ciBsZSBtb25kZSAh\"" },
      { label: "Décoder du texte", input: "\"Qm9uam91ciBsZSBtb25kZSAh\"", result: "\"Bonjour le monde !\"" },
    ],
    faq: [
      { q: "Is Base64 encryption?", a: "No — Base64 is encoding, not encryption. It has no secret key and anyone can decode it instantly, so it provides zero security or confidentiality. It only changes the data's format, not its accessibility." },
      { q: "Why does Base64 output sometimes end with = signs?", a: "The = characters are padding, added when the input length isn't a clean multiple of 3 bytes, ensuring the encoded output always comes out in complete 4-character groups." },
      { q: "Why does encoded text look longer than the original?", a: "Base64 converts every 3 bytes of input into 4 characters of output, so encoded data is always roughly 33% larger than the original — this is expected and unavoidable given how the encoding works." },
    ],
    frFaq: [
      { q: "Le Base64 est-il du chiffrement ?", a: "Non — le Base64 est de l'encodage, pas du chiffrement. Il n'a pas de clé secrète et n'importe qui peut le décoder instantanément, donc il n'offre aucune sécurité ni confidentialité. Il ne fait que changer le format des données, pas leur accessibilité." },
      { q: "Pourquoi la sortie Base64 se termine-t-elle parfois par des signes = ?", a: "Les caractères = sont du remplissage (padding), ajoutés quand la longueur de l'entrée n'est pas un multiple exact de 3 octets, garantissant que la sortie encodée sort toujours en groupes complets de 4 caractères." },
      { q: "Pourquoi le texte encodé semble-t-il plus long que l'original ?", a: "Le Base64 convertit chaque groupe de 3 octets d'entrée en 4 caractères de sortie, donc les données encodées sont toujours environ 33% plus grandes que l'original — c'est attendu et inévitable étant donné le fonctionnement de l'encodage." },
    ],
  },

  temp: {
    title: "Temperature Converter — Celsius, Fahrenheit & Kelvin",
    frTitle: "Convertisseur de Température — Celsius, Fahrenheit et Kelvin",
    what: "This tool converts temperatures between the three most commonly used scales: Celsius (used by most of the world), Fahrenheit (used mainly in the US), and Kelvin (used in science, since it starts at absolute zero). It's handy for cooking with foreign recipes, understanding weather reports while traveling, or scientific calculations.",
    frWhat: "Cet outil convertit les températures entre les trois échelles les plus couramment utilisées : Celsius (utilisée par la majorité du monde), Fahrenheit (utilisée principalement aux États-Unis) et Kelvin (utilisée en science, car elle commence au zéro absolu). Il est pratique pour cuisiner avec des recettes étrangères, comprendre les bulletins météo en voyage, ou pour des calculs scientifiques.",
    how: "Celsius and Fahrenheit use different zero points and different-sized degrees, so converting between them requires both a multiplication and an addition/subtraction, not just a simple ratio. Kelvin uses the same size degree as Celsius but starts at absolute zero (−273.15°C), so converting to/from Kelvin is just an offset.",
    frHow: "Celsius et Fahrenheit utilisent des points zéro différents et des degrés de tailles différentes, donc convertir entre eux nécessite à la fois une multiplication et une addition/soustraction, pas juste un simple ratio. Kelvin utilise la même taille de degré que Celsius mais commence au zéro absolu (−273,15°C), donc convertir vers/depuis Kelvin n'est qu'un décalage.",
    formula: { expr: "°F = °C × 9/5 + 32", note: "K = °C + 273.15" },
    frFormula: { expr: "°F = °C × 9/5 + 32", note: "K = °C + 273,15" },
    examples: [
      { label: "Water boiling point", input: "100°C", result: "212°F — 373.15 K" },
      { label: "Room temperature", input: "20°C", result: "68°F — 293.15 K" },
      { label: "Absolute zero", input: "0 K", result: "−273.15°C — −459.67°F" },
    ],
    frExamples: [
      { label: "Point d'ébullition de l'eau", input: "100°C", result: "212°F — 373,15 K" },
      { label: "Température ambiante", input: "20°C", result: "68°F — 293,15 K" },
      { label: "Zéro absolu", input: "0 K", result: "−273,15°C — −459,67°F" },
    ],
    faq: [
      { q: "Why does the US use Fahrenheit while most of the world uses Celsius?", a: "Fahrenheit was the standard across the British Empire until most countries switched to Celsius (part of the metric system) during the 20th century — the US never made that switch for everyday use." },
      { q: "What is Kelvin used for if not everyday temperature?", a: "Kelvin is the scientific standard because it starts at absolute zero (the coldest physically possible temperature), making it the natural unit for physics, chemistry, and engineering calculations where negative temperatures would be awkward." },
      { q: "Is there a quick mental shortcut for Celsius to Fahrenheit?", a: "A rough approximation is to double the Celsius value and add 30 — it's not exact, but close enough for a quick everyday estimate before checking the precise conversion." },
    ],
    frFaq: [
      { q: "Pourquoi les États-Unis utilisent-ils Fahrenheit alors que la majorité du monde utilise Celsius ?", a: "Fahrenheit était le standard dans tout l'Empire britannique jusqu'à ce que la plupart des pays passent au Celsius (partie du système métrique) au 20e siècle — les États-Unis n'ont jamais fait ce changement pour un usage quotidien." },
      { q: "À quoi sert Kelvin si ce n'est pour la température quotidienne ?", a: "Kelvin est le standard scientifique car il commence au zéro absolu (la température la plus froide physiquement possible), en faisant l'unité naturelle pour les calculs de physique, chimie et ingénierie où des températures négatives seraient gênantes." },
      { q: "Existe-t-il un raccourci mental rapide de Celsius vers Fahrenheit ?", a: "Une approximation rapide consiste à doubler la valeur Celsius et ajouter 30 — ce n'est pas exact, mais assez proche pour une estimation rapide du quotidien avant de vérifier la conversion précise." },
    ],
  },

  binary: {
    title: "Binary Converter — Decimal ↔ Binary Conversion",
    frTitle: "Convertisseur Binaire — Conversion Décimal ↔ Binaire",
    what: "This tool converts numbers between decimal (base 10, the everyday number system) and binary (base 2, using only 0s and 1s), which is the fundamental language computers use internally to represent all data. It's commonly used by programming students, computer science coursework, and anyone working with low-level data representation.",
    frWhat: "Cet outil convertit les nombres entre décimal (base 10, le système numérique quotidien) et binaire (base 2, utilisant uniquement des 0 et des 1), qui est le langage fondamental que les ordinateurs utilisent en interne pour représenter toutes les données. Il est couramment utilisé par les étudiants en programmation, les cours d'informatique, et toute personne travaillant avec la représentation de données de bas niveau.",
    how: "Binary represents numbers using powers of 2 instead of powers of 10. Converting decimal to binary repeatedly divides the number by 2 and records the remainders; converting binary to decimal multiplies each binary digit by its corresponding power of 2 (1, 2, 4, 8, 16...) and sums the results.",
    frHow: "Le binaire représente les nombres en utilisant des puissances de 2 au lieu de puissances de 10. Convertir du décimal vers le binaire divise répétitivement le nombre par 2 et enregistre les restes ; convertir du binaire vers le décimal multiplie chaque chiffre binaire par sa puissance de 2 correspondante (1, 2, 4, 8, 16...) et additionne les résultats.",
    formula: { expr: "Decimal = Σ(bit × 2^position)", note: "e.g. 1011₂ = 1×8 + 0×4 + 1×2 + 1×1 = 11₁₀" },
    frFormula: { expr: "Décimal = Σ(bit × 2^position)", note: "ex. 1011₂ = 1×8 + 0×4 + 1×2 + 1×1 = 11₁₀" },
    examples: [
      { label: "Decimal to binary", input: "11", result: "1011" },
      { label: "Binary to decimal", input: "11111111", result: "255" },
      { label: "Small number", input: "5", result: "101" },
    ],
    frExamples: [
      { label: "Décimal vers binaire", input: "11", result: "1011" },
      { label: "Binaire vers décimal", input: "11111111", result: "255" },
      { label: "Petit nombre", input: "5", result: "101" },
    ],
    faq: [
      { q: "Why do computers use binary instead of decimal?", a: "Computer hardware is built from transistors that are most reliably built as two-state switches (on/off), which naturally maps to binary's two digits (0 and 1) — building reliable 10-state hardware for decimal would be far more complex and error-prone." },
      { q: "What does 11111111 in binary represent?", a: "Eight 1s in binary equals 255 in decimal — this is why byte values (8 bits) range from 0 to 255, a number that shows up constantly in computing (RGB color channels, for example)." },
      { q: "Can this convert to hexadecimal too?", a: "This tool focuses on decimal-binary conversion; hexadecimal (base 16) is a separate, related system also commonly used in computing, often as a more compact way to write binary values." },
    ],
    frFaq: [
      { q: "Pourquoi les ordinateurs utilisent-ils le binaire plutôt que le décimal ?", a: "Le matériel informatique est construit à partir de transistors qui sont plus fiables en tant qu'interrupteurs à deux états (allumé/éteint), ce qui correspond naturellement aux deux chiffres du binaire (0 et 1) — construire du matériel fiable à 10 états pour le décimal serait bien plus complexe et sujet aux erreurs." },
      { q: "Que représente 11111111 en binaire ?", a: "Huit 1 en binaire égalent 255 en décimal — c'est pourquoi les valeurs d'octet (8 bits) vont de 0 à 255, un nombre qui apparaît constamment en informatique (canaux de couleur RVB, par exemple)." },
      { q: "Cela peut-il aussi convertir en hexadécimal ?", a: "Cet outil se concentre sur la conversion décimal-binaire ; l'hexadécimal (base 16) est un système séparé et lié, également couramment utilisé en informatique, souvent comme façon plus compacte d'écrire des valeurs binaires." },
    ],
  },

  rgb: {
    title: "RGB ↔ HEX Converter — Color Code Conversion",
    frTitle: "Convertisseur RGB ↔ HEX — Conversion de Codes Couleur",
    what: "This tool converts colors between RGB format (three numbers 0-255 for red, green, and blue) and HEX format (a 6-digit code like #FF5733), the two most common ways colors are specified in web design, CSS, and graphic design software. Designers and developers switch between them constantly depending on which tool or codebase they're working in.",
    frWhat: "Cet outil convertit les couleurs entre le format RGB (trois nombres 0-255 pour rouge, vert et bleu) et le format HEX (un code à 6 chiffres comme #FF5733), les deux façons les plus courantes de spécifier des couleurs en design web, CSS et logiciels de design graphique. Designers et développeurs basculent constamment entre les deux selon l'outil ou la base de code sur laquelle ils travaillent.",
    how: "Each RGB value (0-255) is converted to a 2-digit hexadecimal number (00-FF) and the three pairs are concatenated with a # prefix to form the HEX code. Converting the other way splits the HEX code into its three 2-digit pairs and converts each back to a 0-255 decimal value.",
    frHow: "Chaque valeur RGB (0-255) est convertie en un nombre hexadécimal à 2 chiffres (00-FF) et les trois paires sont concaténées avec un préfixe # pour former le code HEX. Convertir dans l'autre sens divise le code HEX en ses trois paires de 2 chiffres et reconvertit chacune en une valeur décimale 0-255.",
    formula: { expr: "HEX = # + hex(R) + hex(G) + hex(B)", note: "Each channel: 0-255 decimal ↔ 00-FF hexadecimal" },
    frFormula: { expr: "HEX = # + hex(R) + hex(V) + hex(B)", note: "Chaque canal : 0-255 décimal ↔ 00-FF hexadécimal" },
    examples: [
      { label: "Pure red", input: "RGB(255, 0, 0)", result: "#FF0000" },
      { label: "Sky blue", input: "#87CEEB", result: "RGB(135, 206, 235)" },
      { label: "Black", input: "RGB(0, 0, 0)", result: "#000000" },
    ],
    frExamples: [
      { label: "Rouge pur", input: "RGB(255, 0, 0)", result: "#FF0000" },
      { label: "Bleu ciel", input: "#87CEEB", result: "RGB(135, 206, 235)" },
      { label: "Noir", input: "RGB(0, 0, 0)", result: "#000000" },
    ],
    faq: [
      { q: "Why do web designers use HEX instead of RGB?", a: "HEX is more compact (one 6-character code instead of three separate numbers) and is the traditional CSS color format, though modern CSS accepts both — the choice is often just a matter of tooling or personal preference." },
      { q: "What does each pair of HEX digits represent?", a: "The 6-digit HEX code splits into three 2-digit pairs, in order: the first pair is red, the second is green, and the third is blue — each pair ranges from 00 (none of that color) to FF (maximum, 255 in decimal)." },
      { q: "Can this handle transparency (alpha)?", a: "Standard 6-digit HEX and 3-value RGB don't include transparency — that requires the 8-digit HEX (#RRGGBBAA) or RGBA format, which adds a fourth alpha channel value." },
    ],
    frFaq: [
      { q: "Pourquoi les designers web utilisent-ils HEX plutôt que RGB ?", a: "HEX est plus compact (un seul code à 6 caractères au lieu de trois nombres séparés) et est le format de couleur CSS traditionnel, bien que le CSS moderne accepte les deux — le choix est souvent une question d'outils ou de préférence personnelle." },
      { q: "Que représente chaque paire de chiffres HEX ?", a: "Le code HEX à 6 chiffres se divise en trois paires de 2 chiffres, dans l'ordre : la première paire est le rouge, la deuxième le vert, et la troisième le bleu — chaque paire va de 00 (aucune de cette couleur) à FF (maximum, 255 en décimal)." },
      { q: "Cela gère-t-il la transparence (alpha) ?", a: "Le HEX standard à 6 chiffres et le RGB à 3 valeurs n'incluent pas la transparence — cela nécessite le format HEX à 8 chiffres (#RRVVBBAA) ou RGBA, qui ajoute une quatrième valeur de canal alpha." },
    ],
  },

  roman: {
    title: "Roman Numeral Converter — Arabic Numbers ↔ Roman Numerals",
    frTitle: "Convertisseur de Chiffres Romains — Nombres Arabes ↔ Chiffres Romains",
    what: "This tool converts between standard Arabic numbers (1, 2, 3...) and Roman numerals (I, II, III...), the numbering system used in ancient Rome that still appears today on clock faces, in movie copyright years, book chapter numbers, and monarch or Super Bowl naming (Elizabeth II, Super Bowl LVIII).",
    frWhat: "Cet outil convertit entre les nombres arabes standards (1, 2, 3...) et les chiffres romains (I, II, III...), le système de numération utilisé dans la Rome antique qui apparaît encore aujourd'hui sur les cadrans d'horloge, les années de copyright de films, les numéros de chapitres de livres, et les noms de monarques ou de Super Bowl (Elizabeth II, Super Bowl LVIII).",
    how: "Roman numerals use combinations of seven letters (I=1, V=5, X=10, L=50, C=100, D=500, M=1000), where letters are normally added together, but a smaller value placed before a larger one is subtracted instead (e.g. IV = 5−1 = 4). The converter works through these subtraction and addition rules to translate in either direction.",
    frHow: "Les chiffres romains utilisent des combinaisons de sept lettres (I=1, V=5, X=10, L=50, C=100, D=500, M=1000), où les lettres s'additionnent normalement, mais une valeur plus petite placée avant une plus grande est soustraite à la place (ex. IV = 5−1 = 4). Le convertisseur applique ces règles de soustraction et d'addition pour traduire dans les deux sens.",
    formula: { expr: "I=1, V=5, X=10, L=50, C=100, D=500, M=1000", note: "Smaller value before larger = subtract (IV=4); otherwise add (VI=6)" },
    frFormula: { expr: "I=1, V=5, X=10, L=50, C=100, D=500, M=1000", note: "Valeur plus petite avant plus grande = soustraire (IV=4) ; sinon additionner (VI=6)" },
    examples: [
      { label: "Number to Roman", input: "1994", result: "MCMXCIV" },
      { label: "Roman to number", input: "LVIII", result: "58" },
      { label: "Current year style", input: "2024", result: "MMXXIV" },
    ],
    frExamples: [
      { label: "Nombre vers Romain", input: "1994", result: "MCMXCIV" },
      { label: "Romain vers nombre", input: "LVIII", result: "58" },
      { label: "Style année actuelle", input: "2024", result: "MMXXIV" },
    ],
    faq: [
      { q: "What's the largest number Roman numerals can represent?", a: "Using the standard letters alone, 3,999 (MMMCMXCIX) is the practical maximum, since Romans had no single symbol for 5,000 or beyond — larger numbers historically used a bar over a numeral to multiply it by 1,000." },
      { q: "Why is 4 written as IV instead of IIII?", a: "IIII (four I's) was actually used historically and still appears on some clock faces for symmetry, but the subtractive rule (IV = 5−1) became the standard convention for compactness in most other contexts." },
      { q: "Is there a Roman numeral for zero?", a: "No — the Romans didn't have a symbol for zero in their numeral system; the concept of zero as a number came from Indian and later Arabic mathematics, entering Europe long after Roman numerals were already established." },
    ],
    frFaq: [
      { q: "Quel est le plus grand nombre que les chiffres romains peuvent représenter ?", a: "En utilisant les lettres standards seules, 3 999 (MMMCMXCIX) est le maximum pratique, car les Romains n'avaient pas de symbole unique pour 5 000 ou plus — les nombres plus grands utilisaient historiquement une barre au-dessus d'un chiffre pour le multiplier par 1 000." },
      { q: "Pourquoi 4 s'écrit-il IV au lieu de IIII ?", a: "IIII (quatre I) était en fait utilisé historiquement et apparaît encore sur certains cadrans d'horloge pour la symétrie, mais la règle soustractive (IV = 5−1) est devenue la convention standard pour la compacité dans la plupart des autres contextes." },
      { q: "Existe-t-il un chiffre romain pour zéro ?", a: "Non — les Romains n'avaient pas de symbole pour zéro dans leur système de numération ; le concept de zéro en tant que nombre vient des mathématiques indiennes puis arabes, arrivant en Europe bien après que les chiffres romains étaient déjà établis." },
    ],
  },
};


// Mitovy endrika amin'ny SEO_CONTENT etsy ambony (what/how/formula/
// examples/faq, EN + FR). Ny "key" dia MITOVY amin'ny "id" ao amin'ny
// TABS array an'ny NetworkHub.tsx (ip, speed, status, password, dns,
// whois, ssl, domainAge, ping, ports, headers, traceroute).
export const NETWORK_SEO_CONTENT: Record<string, SeoContentEntry> = {
  ip: {
    title: "What Is My IP Address? — Free IP Lookup Tool",
    frTitle: "Quelle Est Mon Adresse IP ? — Outil de Recherche IP Gratuit",
    what: "Your public IP (Internet Protocol) address is the unique identifier your internet provider assigns to your connection so that websites and servers know where to send data back to you. It reveals your approximate location (city/region level, not your street address) and which internet service provider (ISP) you use. This is the same address every website you visit can see, unless you use a VPN or proxy.",
    frWhat: "Votre adresse IP (Internet Protocol) publique est l'identifiant unique attribué par votre fournisseur d'accès pour que les sites web et serveurs sachent où renvoyer les données. Elle révèle votre localisation approximative (ville/région, pas votre adresse exacte) ainsi que votre fournisseur d'accès à internet (FAI). C'est la même adresse que chaque site que vous visitez peut voir, sauf si vous utilisez un VPN ou un proxy.",
    how: "This tool automatically detects and displays your current public IPv4 address the moment the page loads, along with connection details such as your ISP/organization, approximate city and region, and timezone — all pulled from IP geolocation databases. Click 'Copy' to copy the address, or 'Refresh' to re-check it (useful if your ISP rotates addresses dynamically).",
    frHow: "Cet outil détecte et affiche automatiquement votre adresse IPv4 publique actuelle dès le chargement de la page, ainsi que des détails de connexion comme votre FAI/organisation, votre ville et région approximatives, et votre fuseau horaire — extraits de bases de données de géolocalisation IP. Cliquez sur « Copier » pour copier l'adresse, ou « Actualiser » pour la revérifier (utile si votre FAI change vos adresses dynamiquement).",
    examples: [
      { label: "Home broadband", input: "Residential ISP connection", result: "e.g. 197.149.x.x — city-level location, ISP name shown" },
      { label: "Mobile data", input: "4G/5G carrier network", result: "Often a different IP than WiFi — carriers use shared address pools" },
      { label: "Behind a VPN", input: "VPN active", result: "Shows the VPN server's location and IP, not your real one" },
    ],
    frExamples: [
      { label: "Connexion domestique", input: "Connexion FAI résidentielle", result: "ex. 197.149.x.x — localisation ville, nom du FAI affiché" },
      { label: "Données mobiles", input: "Réseau opérateur 4G/5G", result: "Souvent une IP différente du WiFi — les opérateurs partagent des pools d'adresses" },
      { label: "Derrière un VPN", input: "VPN actif", result: "Affiche l'emplacement et l'IP du serveur VPN, pas les vôtres" },
    ],
    faq: [
      { q: "Can someone find my exact home address from my IP?", a: "No. An IP address typically only reveals your city or region and your ISP — not your street address. Only your ISP, and law enforcement with a legal request, can map an IP to a specific subscriber." },
      { q: "Why is my IP location showing the wrong city?", a: "IP geolocation databases are based on where your ISP has registered its address blocks, which isn't always where you physically are. Mobile networks and some ISPs route traffic through regional hubs, so the detected city can be off by dozens or hundreds of kilometers." },
      { q: "What's the difference between my public and private IP?", a: "Your private IP (like 192.168.1.5) identifies your device only within your home network and is invisible to the internet. Your public IP is what the wider internet sees, shared by every device on your network via your router." },
      { q: "Does a VPN actually hide my IP?", a: "Yes — a VPN routes your traffic through its own server, so websites see the VPN server's IP address instead of yours. Your real IP is still known to your ISP and to the VPN provider, though." },
    ],
    frFaq: [
      { q: "Peut-on trouver mon adresse exacte à partir de mon IP ?", a: "Non. Une adresse IP révèle généralement seulement votre ville ou région et votre FAI — pas votre adresse précise. Seul votre FAI, et les forces de l'ordre avec une demande légale, peuvent relier une IP à un abonné spécifique." },
      { q: "Pourquoi ma localisation IP affiche-t-elle la mauvaise ville ?", a: "Les bases de géolocalisation IP se basent sur l'endroit où votre FAI a enregistré ses blocs d'adresses, ce qui ne correspond pas toujours à votre position réelle. Les réseaux mobiles et certains FAI acheminent le trafic via des hubs régionaux, d'où un écart parfois de dizaines voire centaines de kilomètres." },
      { q: "Quelle différence entre mon IP publique et privée ?", a: "Votre IP privée (comme 192.168.1.5) identifie votre appareil seulement au sein de votre réseau local et est invisible depuis internet. Votre IP publique est celle vue par internet, partagée par tous les appareils de votre réseau via votre routeur." },
      { q: "Un VPN cache-t-il vraiment mon IP ?", a: "Oui — un VPN fait transiter votre trafic par son propre serveur, donc les sites voient l'IP du serveur VPN plutôt que la vôtre. Votre FAI et le fournisseur VPN connaissent quand même votre IP réelle." },
    ],
  },

  speed: {
    title: "Free Internet Speed Test — Check Download & Upload Speed",
    frTitle: "Test de Vitesse Internet Gratuit — Débit et Latence",
    what: "An internet speed test measures three things: download speed (how fast data comes to your device, in Mbps), upload speed (how fast data leaves your device), and latency or ping (the round-trip delay for a small packet, in milliseconds). Download speed matters most for streaming and browsing; upload speed matters for video calls and cloud backups; low latency matters for gaming and video calls.",
    frWhat: "Un test de vitesse mesure trois choses : le débit descendant (vitesse à laquelle les données arrivent sur votre appareil, en Mbps), le débit montant (vitesse à laquelle les données partent de votre appareil), et la latence ou ping (délai aller-retour d'un petit paquet, en millisecondes). Le débit descendant compte surtout pour le streaming et la navigation ; le débit montant pour les appels vidéo et les sauvegardes cloud ; une faible latence pour le jeu en ligne et les appels vidéo.",
    how: "Click 'Start Test' and the tool downloads and uploads sample data chunks to measure your throughput in real time, while also pinging a nearby server to measure latency. For the most accurate result, close other apps and devices using your connection, and connect via Ethernet if possible since WiFi introduces additional variability.",
    frHow: "Cliquez sur « Démarrer le Test » et l'outil télécharge/envoie des blocs de données de test pour mesurer votre débit en temps réel, tout en envoyant un ping vers un serveur proche pour mesurer la latence. Pour un résultat plus précis, fermez les autres applications et appareils utilisant votre connexion, et privilégiez une connexion Ethernet plutôt que le WiFi.",
    examples: [
      { label: "Basic browsing/email", input: "≈ 5-10 Mbps down", result: "Sufficient for web browsing and email" },
      { label: "HD video streaming", input: "≈ 25 Mbps down", result: "Recommended minimum for one 4K stream" },
      { label: "Video conferencing", input: "≈ 3-5 Mbps up/down, <150ms ping", result: "Needed for smooth video calls" },
    ],
    frExamples: [
      { label: "Navigation/e-mail basique", input: "≈ 5-10 Mbps descendant", result: "Suffisant pour la navigation web et l'e-mail" },
      { label: "Streaming vidéo HD", input: "≈ 25 Mbps descendant", result: "Minimum recommandé pour un flux 4K" },
      { label: "Visioconférence", input: "≈ 3-5 Mbps montant/descendant, ping <150ms", result: "Nécessaire pour des appels vidéo fluides" },
    ],
    faq: [
      { q: "Why is my speed test result lower than what I pay for?", a: "ISPs advertise 'up to' speeds under ideal conditions. WiFi signal strength, the number of connected devices, router quality, and network congestion during peak hours can all reduce real-world speed well below the advertised maximum." },
      { q: "Should I test on WiFi or wired Ethernet?", a: "For the most accurate picture of what your ISP delivers, test with an Ethernet cable directly into your router or modem. WiFi results reflect both your internet speed and your local wireless network's limitations." },
      { q: "What is a 'good' ping for gaming?", a: "Under 20ms is excellent, 20-50ms is good for most competitive games, 50-100ms is playable for casual games, and above 150ms can cause noticeable lag in fast-paced online games." },
    ],
    frFaq: [
      { q: "Pourquoi mon résultat est-il inférieur à ce que je paie ?", a: "Les FAI annoncent des débits « jusqu'à » dans des conditions idéales. La force du signal WiFi, le nombre d'appareils connectés, la qualité du routeur et la congestion réseau aux heures de pointe peuvent tous réduire le débit réel bien en dessous du maximum annoncé." },
      { q: "Faut-il tester en WiFi ou en Ethernet filaire ?", a: "Pour l'image la plus fidèle de ce que fournit votre FAI, testez avec un câble Ethernet branché directement sur votre routeur ou modem. Les résultats WiFi reflètent à la fois votre débit internet et les limites de votre réseau sans fil local." },
      { q: "Quel est un bon ping pour jouer en ligne ?", a: "Moins de 20ms est excellent, 20-50ms est bon pour la plupart des jeux compétitifs, 50-100ms reste jouable pour du casual, et au-delà de 150ms des ralentissements deviennent perceptibles dans les jeux rapides." },
    ],
  },

  status: {
    title: "Website Status Checker — Is a Site Down or Up?",
    frTitle: "Vérificateur d'État de Site — Le Site Est-il en Panne ?",
    what: "A website status checker tells you whether a website is currently reachable from the internet, or whether it's experiencing downtime. This is useful when a site won't load and you want to know whether the problem is on your end (your connection, browser, or device) or on the website's server side — including outages affecting everyone, not just you.",
    frWhat: "Un vérificateur d'état de site indique si un site web est actuellement accessible depuis internet, ou s'il subit une panne. Utile lorsqu'un site ne se charge pas et que vous voulez savoir si le problème vient de vous (connexion, navigateur, appareil) ou du serveur du site — y compris les pannes touchant tout le monde, pas seulement vous.",
    how: "Enter the domain or URL you want to check. The tool sends an HTTP request to the server and reports the response status (online, offline, or slow), along with the response time and HTTP status code returned (such as 200 for OK, or 503 for service unavailable).",
    frHow: "Saisissez le domaine ou l'URL à vérifier. L'outil envoie une requête HTTP au serveur et indique l'état de la réponse (en ligne, hors ligne, ou lent), ainsi que le temps de réponse et le code de statut HTTP renvoyé (comme 200 pour OK, ou 503 pour service indisponible).",
    examples: [
      { label: "Site is fully up", input: "example.com", result: "Status 200 OK, fast response" },
      { label: "Site is down", input: "example.com", result: "Connection timeout or 5xx server error" },
      { label: "Site is slow", input: "example.com", result: "Responds, but with high latency" },
    ],
    frExamples: [
      { label: "Site totalement fonctionnel", input: "example.com", result: "Statut 200 OK, réponse rapide" },
      { label: "Site en panne", input: "example.com", result: "Délai d'attente dépassé ou erreur serveur 5xx" },
      { label: "Site lent", input: "example.com", result: "Répond, mais avec une latence élevée" },
    ],
    faq: [
      { q: "The tool says the site is up, but it won't load for me. Why?", a: "This usually points to a local issue: your ISP, DNS resolver, browser cache, a firewall, or a regional outage affecting only your area. Try a different network (like mobile data) or clearing your browser cache." },
      { q: "What does a 503 status code mean?", a: "503 Service Unavailable means the server is temporarily unable to handle the request — often due to maintenance, overload, or a backend crash. It's usually temporary and resolves once the server recovers." },
      { q: "How often should I monitor a site's status?", a: "For a personal check, an occasional manual check is enough. For business-critical sites, use a dedicated uptime monitoring service that checks every few minutes and alerts you immediately on downtime." },
    ],
    frFaq: [
      { q: "L'outil dit que le site est en ligne, mais il ne se charge pas chez moi. Pourquoi ?", a: "Cela pointe généralement vers un problème local : votre FAI, votre résolveur DNS, le cache de votre navigateur, un pare-feu, ou une panne régionale limitée à votre zone. Essayez un autre réseau (données mobiles) ou videz le cache de votre navigateur." },
      { q: "Que signifie un code de statut 503 ?", a: "503 Service Unavailable signifie que le serveur est temporairement incapable de traiter la requête — souvent à cause d'une maintenance, d'une surcharge, ou d'un plantage backend. C'est généralement temporaire." },
      { q: "À quelle fréquence surveiller l'état d'un site ?", a: "Pour une vérification personnelle, un contrôle occasionnel suffit. Pour des sites critiques, utilisez un service de monitoring dédié qui vérifie toutes les quelques minutes et vous alerte immédiatement en cas de panne." },
    ],
  },

  password: {
    title: "Password Generator & Strength Checker",
    frTitle: "Générateur de Mot de Passe et Vérificateur de Robustesse",
    what: "A strong password is your first line of defense against account takeover. This tool generates random, high-entropy passwords using a mix of uppercase, lowercase, numbers, and symbols, and also estimates the strength of any password you type by calculating its entropy — a measure of how many attempts a computer would need to guess it through brute force.",
    frWhat: "Un mot de passe fort est votre première ligne de défense contre le piratage de compte. Cet outil génère des mots de passe aléatoires à haute entropie combinant majuscules, minuscules, chiffres et symboles, et estime aussi la robustesse de tout mot de passe saisi en calculant son entropie — une mesure du nombre de tentatives nécessaires pour le deviner par force brute.",
    how: "Choose your desired password length and which character types to include (uppercase, lowercase, numbers, symbols), then click generate. To check an existing password instead, type it into the strength checker — the tool never sends it anywhere; the calculation happens entirely in your browser.",
    frHow: "Choisissez la longueur souhaitée et les types de caractères à inclure (majuscules, minuscules, chiffres, symboles), puis cliquez sur générer. Pour vérifier un mot de passe existant, saisissez-le dans le vérificateur de robustesse — l'outil ne l'envoie nulle part ; le calcul se fait entièrement dans votre navigateur.",
    formula: { expr: "Entropy (bits) = length × log₂(character set size)", note: "Example: a 12-character password using upper+lower+numbers+symbols (94 possible characters) ≈ 12 × log₂(94) ≈ 78.7 bits" },
    frFormula: { expr: "Entropie (bits) = longueur × log₂(taille du jeu de caractères)", note: "Exemple : un mot de passe de 12 caractères avec majuscules+minuscules+chiffres+symboles (94 caractères possibles) ≈ 12 × log₂(94) ≈ 78,7 bits" },
    examples: [
      { label: "Weak", input: "password123 (11 chars, lowercase+digits)", result: "≈ 36 bits — crackable in hours" },
      { label: "Moderate", input: "Tr0ub4dor (9 chars, mixed case+digits)", result: "≈ 47 bits — crackable in weeks" },
      { label: "Strong", input: "xK9#mP2$vL7q (12 chars, full character set)", result: "≈ 79 bits — impractical to brute-force" },
    ],
    frExamples: [
      { label: "Faible", input: "password123 (11 car., minuscules+chiffres)", result: "≈ 36 bits — cassable en quelques heures" },
      { label: "Moyen", input: "Tr0ub4dor (9 car., casse mixte+chiffres)", result: "≈ 47 bits — cassable en quelques semaines" },
      { label: "Fort", input: "xK9#mP2$vL7q (12 car., jeu complet)", result: "≈ 79 bits — brute force impraticable" },
    ],
    faq: [
      { q: "Is it safe to generate my password on a website?", a: "This generator runs entirely in your browser using JavaScript's cryptographic random functions — the password is never transmitted to any server. Still, for maximum trust, a dedicated password manager's built-in generator is a good alternative." },
      { q: "How long should a password be?", a: "At minimum 12 characters; 16+ is recommended for important accounts. Length matters more than complexity — a long passphrase of random words can be both stronger and easier to remember than a short complex string." },
      { q: "Should I reuse a strong password across sites?", a: "No. Even a very strong password becomes a liability if it's reused, because a single data breach at one site exposes it everywhere else. Use a unique password per site, managed with a password manager." },
    ],
    frFaq: [
      { q: "Est-il sûr de générer mon mot de passe sur un site web ?", a: "Ce générateur fonctionne entièrement dans votre navigateur via les fonctions cryptographiques aléatoires de JavaScript — le mot de passe n'est jamais transmis à un serveur. Pour une confiance maximale, le générateur intégré d'un gestionnaire de mots de passe dédié reste une bonne alternative." },
      { q: "Quelle longueur de mot de passe choisir ?", a: "Au minimum 12 caractères ; 16+ est recommandé pour les comptes importants. La longueur compte plus que la complexité — une longue phrase de passe composée de mots aléatoires peut être à la fois plus forte et plus facile à retenir qu'une chaîne courte et complexe." },
      { q: "Puis-je réutiliser un mot de passe fort sur plusieurs sites ?", a: "Non. Même un mot de passe très fort devient un risque s'il est réutilisé, car une seule fuite de données sur un site l'expose partout ailleurs. Utilisez un mot de passe unique par site, géré via un gestionnaire de mots de passe." },
    ],
  },

  dns: {
    title: "Free DNS Lookup Tool — Check DNS Records",
    frTitle: "Outil de Recherche DNS Gratuit — Vérifier les Enregistrements",
    what: "DNS (Domain Name System) is the internet's phonebook: it translates human-readable domain names like example.com into the numeric IP addresses computers use to find each other. DNS records also control email routing (MX records), domain verification (TXT records), and subdomain pointers (CNAME records). This tool looks up the DNS records currently published for any domain.",
    frWhat: "Le DNS (Domain Name System) est l'annuaire téléphonique d'internet : il traduit les noms de domaine lisibles comme example.com en adresses IP numériques que les ordinateurs utilisent pour se localiser. Les enregistrements DNS contrôlent aussi le routage des e-mails (enregistrements MX), la vérification de domaine (TXT), et les pointeurs de sous-domaine (CNAME). Cet outil consulte les enregistrements DNS actuellement publiés pour un domaine.",
    how: "Enter a domain name and the tool queries public DNS resolvers for its A records (IPv4 addresses), AAAA records (IPv6), MX records (mail servers), TXT records (verification/SPF/DKIM), NS records (nameservers), and CNAME records (aliases), then displays them all in one place.",
    frHow: "Saisissez un nom de domaine et l'outil interroge des résolveurs DNS publics pour ses enregistrements A (adresses IPv4), AAAA (IPv6), MX (serveurs de messagerie), TXT (vérification/SPF/DKIM), NS (serveurs de noms), et CNAME (alias), puis les affiche tous en un seul endroit.",
    examples: [
      { label: "Website hosting", input: "example.com → A record", result: "Points to the web server's IP address" },
      { label: "Email routing", input: "example.com → MX record", result: "Lists which mail servers handle @example.com" },
      { label: "Domain verification", input: "example.com → TXT record", result: "Shows SPF, DKIM, or Google/Microsoft verification strings" },
    ],
    frExamples: [
      { label: "Hébergement du site", input: "example.com → enregistrement A", result: "Pointe vers l'IP du serveur web" },
      { label: "Routage e-mail", input: "example.com → enregistrement MX", result: "Liste les serveurs mail gérant @example.com" },
      { label: "Vérification de domaine", input: "example.com → enregistrement TXT", result: "Affiche les chaînes SPF, DKIM, ou de vérification Google/Microsoft" },
    ],
    faq: [
      { q: "Why did my DNS change not show up yet?", a: "DNS changes take time to spread across the internet's resolvers due to caching — a process called propagation. It typically takes anywhere from a few minutes to 48 hours, depending on the record's TTL (time-to-live) setting." },
      { q: "What's the difference between A and CNAME records?", a: "An A record points a domain directly to an IP address. A CNAME record points a domain to another domain name instead, which is useful for subdomains that should always follow a main domain's address without needing updates." },
      { q: "Why does a domain have multiple MX records?", a: "Multiple MX records provide redundancy for email delivery — each has a priority number, and mail servers try the lowest-priority (most preferred) server first, falling back to others if it's unavailable." },
    ],
    frFaq: [
      { q: "Pourquoi mon changement DNS n'apparaît-il pas encore ?", a: "Les changements DNS mettent du temps à se propager sur les résolveurs d'internet à cause de la mise en cache — un processus appelé propagation. Cela prend généralement de quelques minutes à 48 heures, selon le TTL (durée de vie) de l'enregistrement." },
      { q: "Quelle différence entre un enregistrement A et CNAME ?", a: "Un enregistrement A pointe un domaine directement vers une adresse IP. Un CNAME pointe un domaine vers un autre nom de domaine, utile pour les sous-domaines qui doivent toujours suivre l'adresse d'un domaine principal sans mise à jour." },
      { q: "Pourquoi un domaine a-t-il plusieurs enregistrements MX ?", a: "Plusieurs enregistrements MX assurent une redondance pour la livraison d'e-mails — chacun a un numéro de priorité, et les serveurs mail essaient d'abord le serveur de priorité la plus basse (préféré), puis les autres s'il est indisponible." },
    ],
  },

  whois: {
    title: "Whois Lookup — Domain Registration & Ownership Info",
    frTitle: "Recherche Whois — Infos d'Enregistrement de Domaine",
    what: "Whois is a public database that stores registration details for every domain name: who registered it (unless privacy protection is enabled), which registrar it was bought through, when it was created, and when it expires. It's used to verify domain ownership, research a domain before buying it, or track down who is responsible for a website.",
    frWhat: "Whois est une base de données publique qui stocke les détails d'enregistrement de chaque nom de domaine : qui l'a enregistré (sauf si la protection de confidentialité est activée), via quel registrar il a été acheté, quand il a été créé, et quand il expire. Utilisé pour vérifier la propriété d'un domaine, l'étudier avant achat, ou identifier le responsable d'un site.",
    how: "Enter a domain name and the tool queries the relevant domain registry's Whois database, returning the registrar name, creation and expiration dates, nameservers, and registrant contact information if it isn't hidden behind privacy protection.",
    frHow: "Saisissez un nom de domaine et l'outil interroge la base Whois du registre concerné, renvoyant le nom du registrar, les dates de création et d'expiration, les serveurs de noms, et les coordonnées du titulaire si elles ne sont pas masquées par une protection de confidentialité.",
    examples: [
      { label: "Buying a used domain", input: "olddomain.com", result: "Shows registrar, expiration date, and whether it's about to lapse" },
      { label: "Checking ownership", input: "company.com", result: "Shows registrant org (if public) and registration date" },
      { label: "Privacy-protected domain", input: "example.com", result: "Shows registrar's privacy proxy instead of the real owner" },
    ],
    frExamples: [
      { label: "Achat d'un domaine d'occasion", input: "olddomain.com", result: "Affiche le registrar, la date d'expiration, et si le domaine va bientôt expirer" },
      { label: "Vérifier la propriété", input: "company.com", result: "Affiche l'organisation titulaire (si publique) et la date d'enregistrement" },
      { label: "Domaine protégé", input: "example.com", result: "Affiche le proxy de confidentialité du registrar au lieu du vrai propriétaire" },
    ],
    faq: [
      { q: "Why don't I see the owner's name and email?", a: "Most registrars now offer free WHOIS privacy protection (or it's mandatory under GDPR for EU registrants), which replaces the real contact details with the registrar's proxy information to prevent spam and harassment." },
      { q: "Can I use Whois to find out who is behind a scam website?", a: "Whois can help, but privacy-protected or fraudulently-registered domains often hide the real operator. For serious cases, involve your hosting provider's abuse team or local law enforcement." },
      { q: "What happens when a domain expires?", a: "It typically enters a grace period where the original owner can still renew it, followed by a redemption period with a higher renewal fee, and finally becomes available for anyone to register." },
    ],
    frFaq: [
      { q: "Pourquoi ne vois-je pas le nom et l'email du propriétaire ?", a: "La plupart des registrars offrent désormais une protection de confidentialité WHOIS gratuite (obligatoire sous le RGPD pour les titulaires européens), qui remplace les vraies coordonnées par celles du proxy du registrar pour éviter le spam et le harcèlement." },
      { q: "Puis-je utiliser Whois pour identifier un site frauduleux ?", a: "Whois peut aider, mais les domaines protégés ou enregistrés frauduleusement cachent souvent le vrai opérateur. Pour les cas sérieux, contactez l'équipe abus de l'hébergeur ou les autorités locales." },
      { q: "Que se passe-t-il quand un domaine expire ?", a: "Il entre généralement dans une période de grâce où le propriétaire initial peut encore le renouveler, suivie d'une période de rachat à frais plus élevés, puis devient disponible pour un nouvel enregistrement." },
    ],
  },

  ssl: {
    title: "SSL Certificate Checker — Verify HTTPS Security",
    frTitle: "Vérificateur de Certificat SSL — Sécurité HTTPS",
    what: "An SSL/TLS certificate encrypts the connection between a visitor's browser and a website's server, protecting data like passwords and payment details from being intercepted, and enabling the padlock icon in the address bar. This checker verifies whether a site's certificate is valid, who issued it, and how many days remain before it expires.",
    frWhat: "Un certificat SSL/TLS chiffre la connexion entre le navigateur d'un visiteur et le serveur d'un site, protégeant des données comme les mots de passe et informations de paiement contre l'interception, et permettant l'affichage du cadenas dans la barre d'adresse. Ce vérificateur confirme si le certificat d'un site est valide, qui l'a émis, et combien de jours restent avant son expiration.",
    how: "Enter a domain and the tool connects to it over HTTPS, retrieves the SSL certificate, and reports its issuer (Certificate Authority), validity dates, days remaining, and whether the certificate chain is trusted by browsers.",
    frHow: "Saisissez un domaine et l'outil s'y connecte en HTTPS, récupère le certificat SSL, et indique son émetteur (autorité de certification), ses dates de validité, les jours restants, et si la chaîne de certificats est reconnue par les navigateurs.",
    examples: [
      { label: "Valid certificate", input: "example.com", result: "Issued by a trusted CA, 60 days remaining" },
      { label: "Expiring soon", input: "example.com", result: "Valid but expires in less than 14 days — renew soon" },
      { label: "Expired/invalid", input: "example.com", result: "Browsers will show a security warning to visitors" },
    ],
    frExamples: [
      { label: "Certificat valide", input: "example.com", result: "Émis par une AC de confiance, 60 jours restants" },
      { label: "Expiration proche", input: "example.com", result: "Valide mais expire dans moins de 14 jours — à renouveler" },
      { label: "Expiré/invalide", input: "example.com", result: "Les navigateurs afficheront un avertissement de sécurité aux visiteurs" },
    ],
    faq: [
      { q: "What happens when an SSL certificate expires?", a: "Browsers will show visitors a prominent 'Your connection is not private' warning, which drives most people away immediately. It also removes the padlock icon and can hurt search engine trust signals." },
      { q: "Is a free SSL certificate as secure as a paid one?", a: "Yes, for encryption strength — free certificates (like Let's Encrypt) use the same TLS standards as paid ones. Paid certificates mainly add extended validation branding, warranty coverage, and dedicated support, not stronger encryption." },
      { q: "How often should SSL certificates be renewed?", a: "Most modern certificates are valid for 90 days (Let's Encrypt) to 1 year (commercial CAs). Setting up auto-renewal avoids the risk of forgetting and having your site show a security warning." },
    ],
    frFaq: [
      { q: "Que se passe-t-il quand un certificat SSL expire ?", a: "Les navigateurs afficheront un avertissement visible « Votre connexion n'est pas privée » aux visiteurs, ce qui fait fuir la plupart des gens immédiatement. Le cadenas disparaît aussi et cela peut nuire aux signaux de confiance pour les moteurs de recherche." },
      { q: "Un certificat SSL gratuit est-il aussi sûr qu'un payant ?", a: "Oui, en termes de chiffrement — les certificats gratuits (comme Let's Encrypt) utilisent les mêmes standards TLS que les payants. Les certificats payants ajoutent surtout une image de marque, une garantie, et un support dédié, pas un chiffrement plus fort." },
      { q: "À quelle fréquence renouveler un certificat SSL ?", a: "La plupart des certificats modernes sont valides de 90 jours (Let's Encrypt) à 1 an (AC commerciales). Mettre en place le renouvellement automatique évite le risque d'oubli et d'avertissement de sécurité sur votre site." },
    ],
  },

  domainAge: {
    title: "Domain Age Checker — Find When a Domain Was Registered",
    frTitle: "Vérificateur d'Âge de Domaine — Date de Première Création",
    what: "Domain age is the number of years since a domain name was first registered. It's used by SEO researchers as one (minor) trust signal, by buyers evaluating an aged domain's history, and by security researchers assessing whether a suspicious website is a newly-created scam domain or an established, long-running site.",
    frWhat: "L'âge d'un domaine est le nombre d'années écoulées depuis son premier enregistrement. Utilisé par les chercheurs SEO comme signal de confiance (mineur), par les acheteurs évaluant l'historique d'un domaine ancien, et par les chercheurs en sécurité pour distinguer un site frauduleux nouvellement créé d'un site établi de longue date.",
    how: "Enter a domain and the tool queries the domain registry's Whois creation date, then calculates exactly how many years, months, and days have passed since that registration date.",
    frHow: "Saisissez un domaine et l'outil interroge la date de création Whois du registre, puis calcule précisément le nombre d'années, mois et jours écoulés depuis cet enregistrement.",
    examples: [
      { label: "Long-established site", input: "example.com, registered 2001", result: "≈ 24 years old — indicates an established web presence" },
      { label: "Newly registered domain", input: "example.com, registered last month", result: "< 1 month old — common trait of newly-launched sites or fresh phishing domains" },
    ],
    frExamples: [
      { label: "Site établi de longue date", input: "example.com, enregistré en 2001", result: "≈ 24 ans — indique une présence web établie" },
      { label: "Domaine récemment enregistré", input: "example.com, enregistré le mois dernier", result: "< 1 mois — trait commun aux sites nouvellement lancés ou aux domaines de phishing récents" },
    ],
    faq: [
      { q: "Does an older domain rank better in Google?", a: "Domain age itself is not a major ranking factor according to Google's own statements. What correlates with rankings is the accumulated content, backlinks, and trust an older domain has typically had time to build — age alone doesn't help." },
      { q: "Why do scammers often use brand-new domains?", a: "Domains registered within the last few days or weeks are a common red flag in phishing and scam detection, since fraudulent sites are frequently taken down and re-registered under new names to evade blocklists." },
      { q: "Can domain age change if the domain is transferred to a new owner?", a: "No — the original registration date stays the same even after a domain changes hands, since it reflects when the domain name itself first entered the registry, not who currently owns it." },
    ],
    frFaq: [
      { q: "Un domaine plus ancien est-il mieux classé sur Google ?", a: "L'âge du domaine n'est pas en soi un facteur de classement majeur selon Google. Ce qui corrèle avec le classement, c'est le contenu accumulé, les backlinks et la confiance qu'un domaine ancien a généralement eu le temps de construire — l'âge seul n'aide pas." },
      { q: "Pourquoi les arnaqueurs utilisent-ils souvent des domaines tout neufs ?", a: "Les domaines enregistrés il y a quelques jours ou semaines sont un signal d'alerte courant en détection de phishing, car les sites frauduleux sont fréquemment fermés puis réenregistrés sous de nouveaux noms pour échapper aux listes noires." },
      { q: "L'âge change-t-il si le domaine change de propriétaire ?", a: "Non — la date d'enregistrement d'origine reste la même même après un changement de propriétaire, car elle reflète la première entrée du nom de domaine dans le registre, pas qui le possède actuellement." },
    ],
  },

  ping: {
    title: "Ping Test — Check Server Response Time & Latency",
    frTitle: "Test de Ping — Temps de Réponse et Latence",
    what: "Ping measures the round-trip time (RTT) it takes for a small data packet to travel from your device to a target server and back, expressed in milliseconds. Low ping means a snappy, responsive connection — critical for online gaming, video calls, and real-time applications. High ping causes noticeable lag even on a fast download connection.",
    frWhat: "Le ping mesure le temps aller-retour (RTT) que met un petit paquet de données pour voyager de votre appareil vers un serveur cible et revenir, exprimé en millisecondes. Un ping bas signifie une connexion réactive — essentiel pour le jeu en ligne, les appels vidéo et les applications temps réel. Un ping élevé cause des ralentissements perceptibles même avec un débit rapide.",
    how: "Select or enter a target server, and the tool sends multiple test requests, measuring the time for each round trip. The result shows the average, minimum, and maximum response times, plus packet loss if any requests failed to return.",
    frHow: "Sélectionnez ou saisissez un serveur cible, et l'outil envoie plusieurs requêtes de test, mesurant le temps de chaque aller-retour. Le résultat affiche le temps moyen, minimum et maximum, ainsi que la perte de paquets si des requêtes n'ont pas abouti.",
    examples: [
      { label: "Same-country server", input: "Local CDN edge server", result: "≈ 5-20ms — excellent for gaming and calls" },
      { label: "Cross-continent server", input: "Server on another continent", result: "≈ 150-300ms — noticeable delay in real-time apps" },
      { label: "Congested connection", input: "Overloaded network/WiFi", result: "High and inconsistent ping, some packet loss" },
    ],
    frExamples: [
      { label: "Serveur dans le même pays", input: "Serveur CDN local", result: "≈ 5-20ms — excellent pour le jeu et les appels" },
      { label: "Serveur sur un autre continent", input: "Serveur sur un autre continent", result: "≈ 150-300ms — délai perceptible dans les applications temps réel" },
      { label: "Connexion congestionnée", input: "Réseau/WiFi surchargé", result: "Ping élevé et instable, perte de paquets possible" },
    ],
    faq: [
      { q: "Why is my ping higher to some sites than others?", a: "Ping increases with physical distance to the server (data can only travel so fast) and with the number of network hops in between. A server on another continent will almost always show higher ping than one hosted nearby." },
      { q: "What causes packet loss?", a: "Packet loss usually comes from network congestion, faulty hardware (routers, cables), WiFi interference, or an overloaded server. Even a small amount of packet loss can cause stuttering in video calls and rubber-banding in games." },
      { q: "Can I lower my ping?", a: "Using a wired Ethernet connection instead of WiFi, closing bandwidth-heavy background apps, and choosing game/call servers geographically closer to you are the most effective ways to reduce ping." },
    ],
    frFaq: [
      { q: "Pourquoi mon ping est-il plus élevé vers certains sites ?", a: "Le ping augmente avec la distance physique au serveur (les données ne peuvent voyager que si vite) et avec le nombre de sauts réseau intermédiaires. Un serveur sur un autre continent affichera presque toujours un ping plus élevé qu'un serveur proche." },
      { q: "Qu'est-ce qui cause la perte de paquets ?", a: "La perte de paquets vient généralement d'une congestion réseau, d'un matériel défectueux (routeurs, câbles), d'interférences WiFi, ou d'un serveur surchargé. Même une faible perte peut causer des saccades en appel vidéo et du lag dans les jeux." },
      { q: "Puis-je réduire mon ping ?", a: "Utiliser une connexion Ethernet filaire plutôt que le WiFi, fermer les applications d'arrière-plan gourmandes en bande passante, et choisir des serveurs de jeu/appel géographiquement plus proches sont les moyens les plus efficaces de réduire le ping." },
    ],
  },

  ports: {
    title: "Port Scanner — Check Which Ports Are Open on a Host",
    frTitle: "Scanneur de Ports — Vérifier les Ports Ouverts sur un Hôte",
    what: "A network port is a numbered communication channel a server uses for a specific service — for example, port 80 for unencrypted web traffic, port 443 for HTTPS, and port 22 for SSH remote access. A port scanner checks which of these ports are open (accepting connections), closed, or filtered on a given host, which is useful for troubleshooting server configuration or checking your own exposure to unnecessary open services.",
    frWhat: "Un port réseau est un canal de communication numéroté qu'un serveur utilise pour un service spécifique — par exemple, le port 80 pour le trafic web non chiffré, le port 443 pour HTTPS, et le port 22 pour l'accès distant SSH. Un scanneur de ports vérifie lesquels de ces ports sont ouverts (acceptent des connexions), fermés, ou filtrés sur un hôte donné — utile pour dépanner une configuration serveur ou vérifier son exposition à des services inutilement ouverts.",
    how: "Enter a hostname or IP address and select which ports to check (from a list of common service ports, or a custom range). The tool attempts a connection to each port and reports whether it's open, closed, or not responding (filtered by a firewall).",
    frHow: "Saisissez un nom d'hôte ou une adresse IP et sélectionnez les ports à vérifier (parmi une liste de ports de services courants, ou une plage personnalisée). L'outil tente une connexion à chaque port et indique s'il est ouvert, fermé, ou sans réponse (filtré par un pare-feu).",
    examples: [
      { label: "Web server", input: "Port 80, 443", result: "Open — serving HTTP/HTTPS traffic" },
      { label: "Unsecured remote access", input: "Port 22 (SSH), 3389 (RDP)", result: "Open to the public internet — a common attack target if not restricted" },
      { label: "Database exposed accidentally", input: "Port 3306 (MySQL), 5432 (PostgreSQL)", result: "Should normally be closed to the public internet, not open" },
    ],
    frExamples: [
      { label: "Serveur web", input: "Port 80, 443", result: "Ouvert — sert le trafic HTTP/HTTPS" },
      { label: "Accès distant non sécurisé", input: "Port 22 (SSH), 3389 (RDP)", result: "Ouvert à internet public — cible d'attaque fréquente si non restreint" },
      { label: "Base de données exposée par erreur", input: "Port 3306 (MySQL), 5432 (PostgreSQL)", result: "Devrait normalement être fermé au public, pas ouvert" },
    ],
    faq: [
      { q: "Is it legal to scan ports on any server?", a: "Scanning your own servers or domains is always fine. Scanning third-party systems you don't own or have explicit permission to test can violate computer-misuse laws in many countries, even without malicious intent — only scan hosts you're authorized to test." },
      { q: "Why would a database port be open to the internet be a problem?", a: "Databases are designed to be accessed by your application server, not the public internet. An openly exposed database port is a common cause of major data breaches, since attackers can attempt to connect directly and brute-force credentials." },
      { q: "What does 'filtered' mean in a port scan result?", a: "Filtered means the scan received no response at all — usually because a firewall is silently dropping connection attempts rather than actively refusing them. This is generally the safest and most common state for a properly secured server." },
    ],
    frFaq: [
      { q: "Est-il légal de scanner les ports de n'importe quel serveur ?", a: "Scanner ses propres serveurs ou domaines est toujours acceptable. Scanner des systèmes tiers sans en être propriétaire ou sans autorisation explicite peut enfreindre les lois sur l'usage abusif informatique dans de nombreux pays, même sans intention malveillante — ne scannez que les hôtes que vous êtes autorisé à tester." },
      { q: "Pourquoi un port de base de données ouvert sur internet est-il un problème ?", a: "Les bases de données sont conçues pour être accédées par votre serveur applicatif, pas par internet public. Un port de base de données exposé est une cause fréquente de fuites de données majeures, les attaquants pouvant tenter de s'y connecter directement et forcer les identifiants." },
      { q: "Que signifie 'filtré' dans un résultat de scan de ports ?", a: "Filtré signifie que le scan n'a reçu aucune réponse — généralement parce qu'un pare-feu ignore silencieusement les tentatives de connexion plutôt que de les refuser activement. C'est généralement l'état le plus sûr pour un serveur bien sécurisé." },
    ],
  },

  headers: {
    title: "HTTP Headers Checker — Inspect Response Headers",
    frTitle: "Vérificateur d'En-têtes HTTP — Inspecter les Réponses",
    what: "HTTP response headers are metadata a web server sends along with every page, invisible to regular visitors but essential to how browsers and search engines handle the page — including caching rules, content type, security policies (like HSTS and Content-Security-Policy), and server software information. Inspecting them helps diagnose caching issues, missing security headers, and SEO-relevant settings.",
    frWhat: "Les en-têtes de réponse HTTP sont des métadonnées qu'un serveur web envoie avec chaque page, invisibles pour les visiteurs classiques mais essentielles au traitement de la page par les navigateurs et moteurs de recherche — règles de cache, type de contenu, politiques de sécurité (comme HSTS et Content-Security-Policy), et infos sur le logiciel serveur. Les inspecter aide à diagnostiquer des problèmes de cache, des en-têtes de sécurité manquants, et des réglages pertinents pour le SEO.",
    how: "Enter a URL and the tool sends an HTTP request, then displays every response header returned by the server — status code, content type, cache-control, security headers, server identification, and more — in an easy-to-read list.",
    frHow: "Saisissez une URL et l'outil envoie une requête HTTP, puis affiche chaque en-tête de réponse renvoyé par le serveur — code de statut, type de contenu, cache-control, en-têtes de sécurité, identification du serveur, etc. — dans une liste facile à lire.",
    examples: [
      { label: "Well-secured site", input: "example.com", result: "Includes Strict-Transport-Security, X-Content-Type-Options, Content-Security-Policy" },
      { label: "Cacheable static asset", input: "example.com/style.css", result: "Cache-Control: max-age=31536000 — cached long-term by browsers" },
      { label: "Server fingerprinting", input: "example.com", result: "Server: nginx/1.24 — reveals server software (a minor info-leak if too detailed)" },
    ],
    frExamples: [
      { label: "Site bien sécurisé", input: "example.com", result: "Inclut Strict-Transport-Security, X-Content-Type-Options, Content-Security-Policy" },
      { label: "Ressource statique cacheable", input: "example.com/style.css", result: "Cache-Control: max-age=31536000 — mis en cache longtemps par les navigateurs" },
      { label: "Identification du serveur", input: "example.com", result: "Server: nginx/1.24 — révèle le logiciel serveur (une fuite d'info mineure si trop détaillé)" },
    ],
    faq: [
      { q: "Which security headers should every website have?", a: "Common recommended headers include Strict-Transport-Security (forces HTTPS), X-Content-Type-Options: nosniff, X-Frame-Options (prevents clickjacking), and a Content-Security-Policy tailored to the site's scripts and resources." },
      { q: "Why does Cache-Control matter for SEO and performance?", a: "Proper cache headers let browsers reuse previously downloaded files instead of re-downloading them, which speeds up repeat visits and reduces server load — both of which contribute to better Core Web Vitals scores that Google factors into rankings." },
      { q: "Should I hide my server's software version in headers?", a: "It's a mild security-hardening practice. Advertising an exact software version (like 'Apache/2.4.41') can help attackers target known vulnerabilities for that specific version, though it's a minor factor compared to keeping software patched and up to date." },
    ],
    frFaq: [
      { q: "Quels en-têtes de sécurité chaque site devrait-il avoir ?", a: "Les en-têtes recommandés courants incluent Strict-Transport-Security (force HTTPS), X-Content-Type-Options: nosniff, X-Frame-Options (empêche le clickjacking), et une Content-Security-Policy adaptée aux scripts et ressources du site." },
      { q: "Pourquoi Cache-Control compte-t-il pour le SEO et la performance ?", a: "Des en-têtes de cache bien configurés permettent aux navigateurs de réutiliser les fichiers déjà téléchargés au lieu de les retélécharger, ce qui accélère les visites répétées et réduit la charge serveur — deux facteurs contribuant à de meilleurs scores Core Web Vitals pris en compte par Google." },
      { q: "Faut-il masquer la version du logiciel serveur dans les en-têtes ?", a: "C'est une bonne pratique de durcissement léger. Annoncer une version exacte (comme 'Apache/2.4.41') peut aider des attaquants à cibler des vulnérabilités connues de cette version précise, bien que ce soit un facteur mineur comparé au fait de garder ses logiciels à jour." },
    ],
  },

  traceroute: {
    title: "Traceroute Tool — Trace the Network Path to a Server",
    frTitle: "Outil Traceroute — Tracer le Chemin Réseau vers un Serveur",
    what: "Traceroute maps the full path your data takes across the internet to reach a destination server, listing every intermediate router (or 'hop') along the way and the time it takes to reach each one. It's the go-to tool for diagnosing exactly where a connection is slowing down or failing — at your own network, your ISP, an intermediate network, or the destination server itself.",
    frWhat: "Traceroute cartographie le chemin complet emprunté par vos données à travers internet pour atteindre un serveur de destination, listant chaque routeur intermédiaire (ou « saut ») en chemin et le temps pour l'atteindre. C'est l'outil de référence pour diagnostiquer précisément où une connexion ralentit ou échoue — sur votre propre réseau, votre FAI, un réseau intermédiaire, ou le serveur de destination lui-même.",
    how: "Enter a destination hostname or IP, and the tool sends a series of packets with increasing time-to-live (TTL) values, causing each router along the path to respond in turn. The result lists every hop in order, along with the response time at each one, so you can spot exactly where delays or failures occur.",
    frHow: "Saisissez un nom d'hôte ou une IP de destination, et l'outil envoie une série de paquets avec des valeurs TTL (durée de vie) croissantes, ce qui fait répondre chaque routeur en chemin, tour à tour. Le résultat liste chaque saut dans l'ordre, avec le temps de réponse à chacun, pour repérer exactement où surviennent les ralentissements ou échecs.",
    examples: [
      { label: "Healthy route", input: "example.com", result: "Steadily low latency increasing slightly with each hop, reaching destination" },
      { label: "Problem at a specific hop", input: "example.com", result: "A sudden latency spike or timeout at one hop points to that network segment as the bottleneck" },
      { label: "ISP-level congestion", input: "example.com", result: "High latency appears starting at your ISP's first few hops, before traffic even leaves their network" },
    ],
    frExamples: [
      { label: "Route saine", input: "example.com", result: "Latence faible augmentant légèrement à chaque saut, jusqu'à la destination" },
      { label: "Problème à un saut précis", input: "example.com", result: "Un pic de latence soudain ou un timeout à un saut précis pointe ce segment réseau comme goulot d'étranglement" },
      { label: "Congestion au niveau du FAI", input: "example.com", result: "Une latence élevée apparaît dès les premiers sauts chez votre FAI, avant même que le trafic ne quitte leur réseau" },
    ],
    faq: [
      { q: "Why do some hops show timeouts ('* * *') in the results?", a: "Some routers are configured not to respond to traceroute probes for security reasons, even though they're forwarding traffic normally. A timeout at an intermediate hop doesn't necessarily mean a problem — what matters most is whether the final destination is reached." },
      { q: "How is traceroute different from a ping test?", a: "Ping only tells you the total round-trip time to a single destination. Traceroute breaks that journey down hop by hop, revealing which specific network segment along the way is responsible for delays." },
      { q: "Can I use traceroute to find out who is hosting a website?", a: "It can give clues — the final hops often reveal the hosting provider's network — but for definitive ownership information, a Whois lookup or IP lookup is more direct and reliable." },
    ],
    frFaq: [
      { q: "Pourquoi certains sauts affichent-ils des timeouts ('* * *') ?", a: "Certains routeurs sont configurés pour ne pas répondre aux sondes traceroute pour des raisons de sécurité, même s'ils acheminent le trafic normalement. Un timeout à un saut intermédiaire ne signifie pas forcément un problème — ce qui compte le plus, c'est si la destination finale est atteinte." },
      { q: "En quoi traceroute diffère-t-il d'un test de ping ?", a: "Le ping donne seulement le temps aller-retour total vers une seule destination. Traceroute décompose ce trajet saut par saut, révélant quel segment réseau précis en chemin est responsable des délais." },
      { q: "Puis-je utiliser traceroute pour savoir qui héberge un site ?", a: "Cela peut donner des indices — les derniers sauts révèlent souvent le réseau de l'hébergeur — mais pour une information de propriété définitive, une recherche Whois ou IP est plus directe et fiable." },
    ],
  },
};
