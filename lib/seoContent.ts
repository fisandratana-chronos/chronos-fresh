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
};

// ── NETWORK_SEO_CONTENT — content ho an'ny 12 tool ao amin'ny NET_HUB ──
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
