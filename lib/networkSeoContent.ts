// ── lib/networkSeoContent.ts ─────────────────────────────────
// Content lalindalina (what/how/faq) ho an'ny tool 12 ao anatin'ny
// NET_HUB (components/network/NetworkHub.tsx), mba tsy ho "fiche
// vide" isaky ny tab — mitovy endrika amin'ny lib/seoContent.ts
// ampiasain'ny SmartCalcHub.
//
// Ny "key" ao amin'ity dictionnaire ity (ip, speed, status,
// password, dns, whois, ssl, domainAge, ping, ports, headers,
// traceroute) dia MITOVY amin'ny "id" ao amin'ny TABS an'ny
// NetworkHub.tsx.

export interface NetworkSeoFaq {
  q: string
  a: string
}

export interface NetworkSeoExample {
  label: string
  input: string
  result: string
}

export interface NetworkSeoEntry {
  title: string
  frTitle: string
  what: string
  frWhat: string
  how: string
  frHow: string
  formula?: { expr: string; note: string }
  frFormula?: { expr: string; note: string }
  examples?: NetworkSeoExample[]
  frExamples?: NetworkSeoExample[]
  faq: NetworkSeoFaq[]
  frFaq: NetworkSeoFaq[]
}

export const NETWORK_SEO_CONTENT: Record<string, NetworkSeoEntry> = {

  ip: {
    title: "What Is My IP Address? — Free IP Lookup",
    frTitle: "Quelle Est Mon Adresse IP ? — Recherche IP Gratuite",
    what: "Your IP (Internet Protocol) address is a unique numerical label assigned to your device by your internet service provider whenever you connect to the internet. It works like a postal address for your connection, allowing websites and servers to know where to send the data you request. Every device on a network — a phone, laptop, router — has one, and your public IP is the one visible to every website you visit unless you use a VPN or proxy to mask it.",
    frWhat: "Votre adresse IP (Internet Protocol) est un identifiant numérique unique attribué à votre appareil par votre fournisseur d'accès internet à chaque connexion. Elle fonctionne comme une adresse postale pour votre connexion, permettant aux sites web et serveurs de savoir où envoyer les données que vous demandez. Chaque appareil connecté à un réseau — téléphone, ordinateur, routeur — en possède une, et votre IP publique est celle visible par tous les sites que vous visitez, sauf si vous utilisez un VPN ou un proxy pour la masquer.",
    how: "This tool detects the public IP address your device is currently using to reach the internet, along with the approximate geographic location (city, region, country) associated with that IP, based on public IP-to-location databases. This location is derived from your internet provider's network infrastructure, not GPS, so it can be off by a city or region — it does not reveal your exact street address.",
    frHow: "Cet outil détecte l'adresse IP publique que votre appareil utilise actuellement pour accéder à internet, ainsi que la localisation géographique approximative (ville, région, pays) associée à cette IP, à partir de bases de données publiques IP-vers-localisation. Cette localisation est déduite de l'infrastructure réseau de votre fournisseur internet, pas du GPS — elle peut donc être décalée d'une ville ou d'une région et ne révèle pas votre adresse exacte.",
    faq: [
      { q: "Why does my IP address change over time?", a: "Most home internet connections use a 'dynamic' IP, which your provider reassigns periodically or each time you reconnect your router. Businesses and servers often pay for a 'static' IP that never changes." },
      { q: "Is it dangerous if someone knows my IP address?", a: "Knowing your IP alone is not typically dangerous — it cannot reveal your name, exact address, or browsing history. However, it can be used for approximate location, ad targeting, or, in rare cases, denial-of-service attacks, which is why some people choose to mask it with a VPN." },
      { q: "What is the difference between public and private IP?", a: "Your public IP is what the internet sees — assigned by your ISP. Your private (local) IP, like 192.168.1.5, is only used inside your home network to identify each device connected to your router." },
      { q: "Why is the location shown not exactly where I am?", a: "IP geolocation is based on the ISP's registered network block, which is often centered on a regional hub rather than your exact home, so accuracy is usually city- or region-level, not street-level." },
    ],
    frFaq: [
      { q: "Pourquoi mon adresse IP change-t-elle avec le temps ?", a: "La plupart des connexions internet domestiques utilisent une IP « dynamique », que votre fournisseur réattribue périodiquement ou à chaque reconnexion de votre routeur. Les entreprises et serveurs paient souvent pour une IP « statique » qui ne change jamais." },
      { q: "Est-ce dangereux si quelqu'un connaît mon adresse IP ?", a: "Connaître seule votre IP n'est généralement pas dangereux — cela ne révèle ni votre nom, ni votre adresse exacte, ni votre historique de navigation. Cela peut toutefois servir à une localisation approximative, au ciblage publicitaire, ou plus rarement à des attaques par déni de service, ce qui pousse certains à la masquer avec un VPN." },
      { q: "Quelle est la différence entre IP publique et privée ?", a: "Votre IP publique est celle que voit internet — attribuée par votre FAI. Votre IP privée (locale), comme 192.168.1.5, sert uniquement à l'intérieur de votre réseau domestique pour identifier chaque appareil connecté à votre routeur." },
      { q: "Pourquoi la localisation affichée n'est-elle pas exacte ?", a: "La géolocalisation IP se base sur le bloc réseau enregistré par le FAI, souvent centré sur un pôle régional plutôt que sur votre domicile exact — la précision est donc généralement au niveau de la ville ou de la région, pas de la rue." },
    ],
  },

  speed: {
    title: "Internet Speed Test — Download, Upload & Ping",
    frTitle: "Test de Débit Internet — Téléchargement, Envoi et Ping",
    what: "An internet speed test measures how fast data travels between your device and a test server, giving you three key numbers: download speed (how fast you receive data, in Mbps), upload speed (how fast you send data), and ping/latency (the round-trip delay, in milliseconds). These numbers determine how well your connection handles everyday tasks like streaming video, video calls, online gaming, and large file transfers.",
    frWhat: "Un test de débit internet mesure la vitesse à laquelle les données circulent entre votre appareil et un serveur de test, et fournit trois indicateurs clés : la vitesse de téléchargement (réception, en Mbps), la vitesse d'envoi (upload), et la latence/ping (le délai aller-retour, en millisecondes). Ces chiffres déterminent la fluidité de votre connexion pour le streaming vidéo, les appels vidéo, le jeu en ligne et le transfert de gros fichiers.",
    how: "The test downloads and uploads small chunks of data to a nearby server and times how long the transfer takes, then converts that into megabits per second. Ping is measured separately by sending a tiny signal to the server and timing the reply. Results can vary depending on network congestion, time of day, Wi-Fi signal strength, and how many devices are sharing your connection at the same time — so running the test a few times at different moments gives a more reliable picture.",
    frHow: "Le test télécharge et envoie de petits blocs de données vers un serveur proche et chronomètre la durée du transfert, puis convertit ce résultat en mégabits par seconde. Le ping est mesuré séparément en envoyant un petit signal au serveur et en chronométrant la réponse. Les résultats peuvent varier selon la congestion du réseau, l'heure de la journée, la force du signal Wi-Fi et le nombre d'appareils partageant votre connexion — répéter le test à différents moments donne donc une image plus fiable.",
    faq: [
      { q: "What is a good internet speed?", a: "For most households, 25–100 Mbps download supports HD streaming and video calls comfortably. 4K streaming and multiple simultaneous users benefit from 100+ Mbps, while online gaming cares more about low ping (under 30ms) than raw speed." },
      { q: "Why is my speed test result lower than what I pay for?", a: "ISPs advertise maximum theoretical speeds. Actual speed is affected by Wi-Fi vs wired connection, distance from your router, network congestion, and how many devices are online at once. Testing over a wired Ethernet connection usually gives the most accurate reading." },
      { q: "What is the difference between Mbps and MBps?", a: "Mbps (megabits per second) is the standard unit for internet speed. MBps (megabytes per second) is 8 times smaller — a 100 Mbps connection downloads at roughly 12.5 MBps, which matters when estimating file download times." },
      { q: "Why does ping matter for gaming?", a: "Ping measures the delay before your action reaches the game server. A high ping causes noticeable lag in fast-paced or competitive games, even if your download speed is very high — that's why gamers prioritize low latency over raw bandwidth." },
    ],
    frFaq: [
      { q: "Qu'est-ce qu'une bonne vitesse internet ?", a: "Pour la plupart des foyers, 25–100 Mbps en téléchargement suffit largement pour le streaming HD et les appels vidéo. Le streaming 4K et plusieurs utilisateurs simultanés bénéficient de 100+ Mbps, tandis que le jeu en ligne dépend surtout d'un ping bas (moins de 30ms) plus que du débit brut." },
      { q: "Pourquoi mon résultat est-il plus bas que ce que je paie ?", a: "Les FAI annoncent des débits maximaux théoriques. Le débit réel dépend du Wi-Fi vs câble Ethernet, de la distance au routeur, de la congestion du réseau et du nombre d'appareils connectés en même temps. Tester en Ethernet donne généralement la mesure la plus fiable." },
      { q: "Quelle est la différence entre Mbps et Mo/s ?", a: "Le Mbps (mégabit par seconde) est l'unité standard pour la vitesse internet. Le Mo/s (mégaoctet par seconde) est 8 fois plus petit — une connexion à 100 Mbps télécharge à environ 12,5 Mo/s, ce qui compte pour estimer le temps de téléchargement d'un fichier." },
      { q: "Pourquoi le ping compte-t-il pour le jeu en ligne ?", a: "Le ping mesure le délai avant que votre action n'atteigne le serveur du jeu. Un ping élevé provoque un décalage perceptible dans les jeux rapides ou compétitifs, même avec un débit de téléchargement très élevé — les joueurs privilégient donc une faible latence plutôt qu'une bande passante brute." },
    ],
  },

  status: {
    title: "Website Status Checker — Is a Site Down or Up?",
    frTitle: "Vérificateur d'État de Site — Un Site Est-il En Panne ?",
    what: "A website status check tells you whether a site is reachable and responding normally, or whether it's experiencing downtime. This is useful when a page won't load and you want to know if the problem is on your end (your internet, browser, or device) or on the website's server side — a distinction that saves time troubleshooting the wrong thing.",
    frWhat: "Une vérification d'état de site indique si un site est accessible et répond normalement, ou s'il subit une panne. C'est utile lorsqu'une page ne se charge pas et que vous voulez savoir si le problème vient de votre côté (internet, navigateur, appareil) ou du serveur du site — une distinction qui évite de perdre du temps à résoudre le mauvais problème.",
    how: "The checker sends a request directly to the website's server from an independent location and reads the HTTP status code returned — for example 200 (OK, the site is up), 404 (page not found), 500 (server error), or no response at all (server unreachable). Because the request comes from our server rather than your device, it can confirm whether the outage is global or specific to your own connection.",
    frHow: "Le vérificateur envoie une requête directement au serveur du site depuis un emplacement indépendant et lit le code de statut HTTP renvoyé — par exemple 200 (OK, le site fonctionne), 404 (page introuvable), 500 (erreur serveur), ou aucune réponse (serveur injoignable). Comme la requête provient de notre serveur et non de votre appareil, elle permet de confirmer si la panne est globale ou propre à votre connexion.",
    faq: [
      { q: "The tool says the site is up, but it won't load for me — why?", a: "This usually means the problem is local to you: a DNS issue, a firewall or ad-blocker, a cached bad connection, or an ISP-level block. Try clearing your browser cache, switching networks, or restarting your router." },
      { q: "What does a 502 or 503 error mean?", a: "502 (Bad Gateway) and 503 (Service Unavailable) usually indicate a temporary server-side problem — often overload or maintenance — rather than the site being permanently down. Retrying after a few minutes often resolves it." },
      { q: "Can this tool check any website?", a: "Yes, it works for any publicly accessible website with a valid domain. It cannot check sites that are only reachable on a private network (like an internal company intranet)." },
    ],
    frFaq: [
      { q: "L'outil dit que le site fonctionne mais il ne se charge pas chez moi, pourquoi ?", a: "Cela signifie généralement que le problème est local : un souci DNS, un pare-feu ou bloqueur de publicité, une connexion en cache défaillante, ou un blocage au niveau du FAI. Essayez de vider le cache du navigateur, de changer de réseau, ou de redémarrer votre routeur." },
      { q: "Que signifie une erreur 502 ou 503 ?", a: "502 (Bad Gateway) et 503 (Service Unavailable) indiquent généralement un problème temporaire côté serveur — souvent une surcharge ou une maintenance — plutôt qu'une panne définitive. Réessayer après quelques minutes résout souvent le problème." },
      { q: "Cet outil peut-il vérifier n'importe quel site ?", a: "Oui, il fonctionne pour tout site accessible publiquement avec un nom de domaine valide. Il ne peut pas vérifier des sites accessibles uniquement sur un réseau privé (comme un intranet d'entreprise)." },
    ],
  },

  password: {
    title: "Password Generator & Strength Checker",
    frTitle: "Générateur de Mot de Passe et Vérificateur de Robustesse",
    what: "A strong password is your first line of defense against account takeover. This tool generates random, high-entropy passwords and also estimates how long a password would realistically take to crack, based on its length and the variety of characters it uses (lowercase, uppercase, numbers, symbols). Weak or reused passwords are one of the leading causes of account breaches.",
    frWhat: "Un mot de passe robuste est votre première ligne de défense contre le piratage de compte. Cet outil génère des mots de passe aléatoires à haute entropie et estime aussi le temps qu'il faudrait réellement pour deviner un mot de passe, en fonction de sa longueur et de la diversité de ses caractères (minuscules, majuscules, chiffres, symboles). Les mots de passe faibles ou réutilisés sont l'une des principales causes de piratage de comptes.",
    how: "Password strength is measured in 'bits of entropy': the number of possible character combinations, expressed as a power of two. It's calculated as length × log₂(character set size). A longer password with a larger character set has exponentially more possible combinations, making brute-force guessing dramatically slower — often the difference between minutes and centuries.",
    frHow: "La robustesse d'un mot de passe se mesure en « bits d'entropie » : le nombre de combinaisons de caractères possibles, exprimé en puissance de deux. Il se calcule par longueur × log₂(taille du jeu de caractères). Un mot de passe plus long avec un jeu de caractères plus large a exponentiellement plus de combinaisons possibles, rendant une attaque par force brute bien plus lente — parfois la différence entre quelques minutes et plusieurs siècles.",
    formula: { expr: "Entropy (bits) = length × log₂(charset size)", note: "Example: a 12-character password using upper+lower+digits+symbols (94 chars) ≈ 12 × 6.55 ≈ 79 bits" },
    frFormula: { expr: "Entropie (bits) = longueur × log₂(taille du jeu de caractères)", note: "Exemple : un mot de passe de 12 caractères avec majuscules+minuscules+chiffres+symboles (94 caractères) ≈ 12 × 6,55 ≈ 79 bits" },
    faq: [
      { q: "How long should a password be?", a: "Security experts generally recommend at least 12–16 characters. Length matters more than complexity — a longer passphrase of random words is often both stronger and easier to remember than a short, complex string." },
      { q: "Is it safe to use this generator for banking passwords?", a: "The generator creates the password locally in your browser and does not transmit or store it anywhere, so it is safe to use. Still, always use a unique password for every account, ideally saved in a password manager rather than memorized or reused." },
      { q: "What makes a password weak?", a: "Common weaknesses include short length, dictionary words, predictable patterns (like '123' or keyboard sequences), personal information (birthdays, names), and reusing the same password across multiple sites." },
      { q: "Should I include symbols in my password?", a: "Yes — adding symbols (like !@#$%) alongside letters and numbers significantly increases the character set size, which increases entropy and makes brute-force attacks exponentially harder." },
    ],
    frFaq: [
      { q: "Quelle longueur doit avoir un mot de passe ?", a: "Les experts en sécurité recommandent généralement au moins 12 à 16 caractères. La longueur compte plus que la complexité — une phrase de passe plus longue composée de mots aléatoires est souvent à la fois plus robuste et plus facile à retenir qu'une chaîne courte et complexe." },
      { q: "Est-ce sûr d'utiliser ce générateur pour un mot de passe bancaire ?", a: "Le générateur crée le mot de passe localement dans votre navigateur et ne le transmet ni ne le stocke nulle part, donc c'est sûr. Utilisez toutefois toujours un mot de passe unique par compte, idéalement enregistré dans un gestionnaire de mots de passe plutôt que mémorisé ou réutilisé." },
      { q: "Qu'est-ce qui rend un mot de passe faible ?", a: "Les faiblesses courantes incluent une longueur trop courte, des mots du dictionnaire, des motifs prévisibles (comme « 123 » ou des séquences de clavier), des informations personnelles (dates de naissance, noms), et la réutilisation du même mot de passe sur plusieurs sites." },
      { q: "Faut-il inclure des symboles dans son mot de passe ?", a: "Oui — ajouter des symboles (comme !@#$%) en plus des lettres et chiffres augmente significativement la taille du jeu de caractères, ce qui augmente l'entropie et rend les attaques par force brute exponentiellement plus difficiles." },
    ],
  },

  dns: {
    title: "DNS Lookup — Check A, MX, TXT & CNAME Records",
    frTitle: "Recherche DNS — Vérifier les Enregistrements A, MX, TXT et CNAME",
    what: "DNS (Domain Name System) is the internet's address book — it translates human-readable domain names like example.com into the numerical IP addresses that computers use to find each other. A DNS lookup reveals the records a domain has published: where its website is hosted (A record), which servers handle its email (MX record), verification and security settings (TXT record), and aliases pointing to other domains (CNAME record).",
    frWhat: "Le DNS (Domain Name System) est l'annuaire d'internet — il traduit les noms de domaine lisibles comme exemple.com en adresses IP numériques que les ordinateurs utilisent pour se trouver. Une recherche DNS révèle les enregistrements publiés par un domaine : où son site est hébergé (enregistrement A), quels serveurs gèrent ses emails (enregistrement MX), les paramètres de vérification et de sécurité (enregistrement TXT), et les alias pointant vers d'autres domaines (enregistrement CNAME).",
    how: "The lookup queries public DNS resolvers for each record type associated with the domain and displays the results in a structured list. This is especially useful when setting up a new domain, migrating hosting providers, configuring email (SPF/DKIM records), or diagnosing why a site or email isn't reaching its destination — DNS changes can take from minutes to 48 hours to propagate fully worldwide.",
    frHow: "La recherche interroge des résolveurs DNS publics pour chaque type d'enregistrement associé au domaine et affiche les résultats sous forme de liste structurée. C'est particulièrement utile lors de la configuration d'un nouveau domaine, d'une migration d'hébergeur, de la configuration des emails (enregistrements SPF/DKIM), ou du diagnostic d'un site ou d'un email qui n'atteint pas sa destination — les changements DNS peuvent prendre de quelques minutes à 48 heures pour se propager entièrement dans le monde.",
    faq: [
      { q: "Why do my DNS changes not show up yet?", a: "DNS records are cached by resolvers around the world for a duration set by the record's TTL (time to live). Changes are not instant — they typically propagate within a few hours, but can take up to 48 hours in some cases." },
      { q: "What is an MX record used for?", a: "An MX (Mail Exchange) record tells the internet which mail servers are responsible for receiving email for a domain, and in what priority order. Without a correct MX record, email sent to that domain will not be delivered." },
      { q: "What's the difference between an A record and a CNAME?", a: "An A record points a domain directly to an IP address. A CNAME record points a domain to another domain name instead, which then resolves to an IP — useful for pointing subdomains to services like a hosting platform." },
    ],
    frFaq: [
      { q: "Pourquoi mes changements DNS ne sont-ils pas encore visibles ?", a: "Les enregistrements DNS sont mis en cache par les résolveurs du monde entier pendant une durée définie par le TTL (time to live) de l'enregistrement. Les changements ne sont pas instantanés — ils se propagent généralement en quelques heures, mais peuvent prendre jusqu'à 48 heures dans certains cas." },
      { q: "À quoi sert un enregistrement MX ?", a: "Un enregistrement MX (Mail Exchange) indique à internet quels serveurs de messagerie sont responsables de la réception des emails pour un domaine, et dans quel ordre de priorité. Sans enregistrement MX correct, les emails envoyés à ce domaine ne seront pas délivrés." },
      { q: "Quelle est la différence entre un enregistrement A et un CNAME ?", a: "Un enregistrement A pointe directement un domaine vers une adresse IP. Un enregistrement CNAME pointe un domaine vers un autre nom de domaine, qui se résout ensuite en IP — utile pour faire pointer des sous-domaines vers des services comme une plateforme d'hébergement." },
    ],
  },

  whois: {
    title: "Whois Lookup — Domain Registration & Ownership Info",
    frTitle: "Recherche Whois — Informations d'Enregistrement et de Propriété d'un Domaine",
    what: "A Whois lookup reveals the public registration details of a domain name: who registered it, which registrar it's registered through, when it was created, and when it expires. This information is stored in a global database maintained by domain registries and is a standard tool for verifying domain legitimacy, checking expiration dates, or investigating a suspicious website.",
    frWhat: "Une recherche Whois révèle les informations publiques d'enregistrement d'un nom de domaine : qui l'a enregistré, via quel registrar, quand il a été créé, et quand il expire. Ces informations sont stockées dans une base de données mondiale maintenue par les registres de domaines, et constituent un outil standard pour vérifier la légitimité d'un domaine, contrôler sa date d'expiration, ou enquêter sur un site suspect.",
    how: "The lookup queries the Whois database of the domain's registry directly and parses the raw response into a readable format — registrar name, creation date, expiration date, and name servers. Many domain owners use 'Whois privacy protection' (offered by most registrars), which replaces personal contact details with the registrar's own information to prevent spam and harassment, so not all fields will always be visible.",
    frHow: "La recherche interroge directement la base de données Whois du registre du domaine et transforme la réponse brute en un format lisible — nom du registrar, date de création, date d'expiration, et serveurs de noms. De nombreux propriétaires de domaines utilisent une « protection de confidentialité Whois » (proposée par la plupart des registrars), qui remplace les coordonnées personnelles par celles du registrar afin d'éviter le spam et le harcèlement — certains champs ne seront donc pas toujours visibles.",
    faq: [
      { q: "Why can't I see the owner's name and email?", a: "Most registrars now offer free Whois privacy protection by default, which masks the registrant's personal information behind the registrar's own proxy contact details, in compliance with privacy regulations like GDPR." },
      { q: "How can I tell if a domain is about to expire?", a: "The Whois record shows an expiration date. If a domain is not renewed by that date, it typically enters a grace period, then becomes available for anyone to register once that period ends." },
      { q: "Is Whois data always accurate?", a: "Whois data is self-reported at registration time and not always kept up to date by the owner, so details like contact address can sometimes be outdated. Core facts like registrar and expiration date are generally reliable since registries maintain them directly." },
    ],
    frFaq: [
      { q: "Pourquoi ne puis-je pas voir le nom et l'email du propriétaire ?", a: "La plupart des registrars proposent désormais gratuitement une protection de confidentialité Whois, qui masque les informations personnelles du titulaire derrière les coordonnées proxy du registrar, conformément aux réglementations comme le RGPD." },
      { q: "Comment savoir si un domaine est sur le point d'expirer ?", a: "L'enregistrement Whois indique une date d'expiration. Si un domaine n'est pas renouvelé avant cette date, il entre généralement dans une période de grâce, puis redevient disponible pour tout le monde une fois cette période terminée." },
      { q: "Les données Whois sont-elles toujours exactes ?", a: "Les données Whois sont déclarées par le titulaire au moment de l'enregistrement et pas toujours mises à jour, donc des détails comme l'adresse de contact peuvent être obsolètes. Les faits essentiels comme le registrar et la date d'expiration sont généralement fiables car maintenus directement par les registres." },
    ],
  },

  ssl: {
    title: "SSL Certificate Checker — Validity & Expiration",
    frTitle: "Vérificateur de Certificat SSL — Validité et Expiration",
    what: "An SSL/TLS certificate is what enables the padlock icon and 'https://' in your browser — it encrypts data traveling between a visitor and a website, and proves the site's identity. This checker inspects a domain's certificate to confirm it is valid, correctly configured, and shows exactly when it expires, which matters because an expired certificate causes browsers to show visitors a scary security warning.",
    frWhat: "Un certificat SSL/TLS est ce qui permet l'icône de cadenas et le « https:// » dans votre navigateur — il chiffre les données circulant entre un visiteur et un site web, et prouve l'identité du site. Ce vérificateur inspecte le certificat d'un domaine pour confirmer qu'il est valide, correctement configuré, et indique précisément sa date d'expiration — ce qui compte car un certificat expiré déclenche un avertissement de sécurité effrayant pour les visiteurs.",
    how: "The checker connects to the domain over HTTPS, retrieves the certificate presented by the server, and reads its details: the issuing certificate authority, the validity period (issued and expiry dates), and which domain(s) it covers. It also flags common issues such as an expired certificate, a domain mismatch, or a self-signed certificate that browsers won't trust.",
    frHow: "Le vérificateur se connecte au domaine en HTTPS, récupère le certificat présenté par le serveur, et en lit les détails : l'autorité de certification émettrice, la période de validité (dates d'émission et d'expiration), et le ou les domaines couverts. Il signale aussi les problèmes courants comme un certificat expiré, une incohérence de domaine, ou un certificat auto-signé que les navigateurs ne feront pas confiance.",
    faq: [
      { q: "What happens when an SSL certificate expires?", a: "Browsers will show visitors a full-page 'Your connection is not private' warning, which scares most users away and can also hurt search engine rankings. Most certificates need renewal every 90 days to 1 year depending on the issuer." },
      { q: "Is a free SSL certificate as secure as a paid one?", a: "Yes, in terms of encryption strength, a free certificate (like those from Let's Encrypt) provides the same encryption as a paid one. Paid certificates mainly add extra identity verification (like organization validation) and vendor support." },
      { q: "Why does my site show 'not secure' even with a certificate installed?", a: "This can happen if the certificate has expired, doesn't match the domain being accessed (e.g. missing www or subdomain coverage), is not properly chained to a trusted authority, or if some page resources are still loaded over plain HTTP ('mixed content')." },
    ],
    frFaq: [
      { q: "Que se passe-t-il quand un certificat SSL expire ?", a: "Les navigateurs affichent aux visiteurs un avertissement plein écran « Votre connexion n'est pas privée », ce qui fait fuir la plupart des utilisateurs et peut aussi nuire au référencement. La plupart des certificats doivent être renouvelés tous les 90 jours à 1 an selon l'émetteur." },
      { q: "Un certificat SSL gratuit est-il aussi sûr qu'un payant ?", a: "Oui, en termes de force de chiffrement, un certificat gratuit (comme ceux de Let's Encrypt) offre le même chiffrement qu'un payant. Les certificats payants ajoutent surtout une vérification d'identité supplémentaire (validation d'organisation) et un support fournisseur." },
      { q: "Pourquoi mon site affiche « non sécurisé » malgré un certificat installé ?", a: "Cela peut arriver si le certificat a expiré, ne correspond pas au domaine consulté (www ou sous-domaine manquant), n'est pas correctement chaîné à une autorité de confiance, ou si certaines ressources de la page se chargent encore en HTTP simple (« contenu mixte »)." },
    ],
  },

  domainAge: {
    title: "Domain Age Checker — When Was a Domain First Registered?",
    frTitle: "Vérificateur d'Âge de Domaine — Quand un Domaine a-t-il Été Créé ?",
    what: "Domain age is the length of time since a domain name was first registered, calculated from its original creation date in the Whois record. It's a commonly referenced signal in SEO discussions and is also used as a quick trust check — a domain registered decades ago has a very different history than one registered last week, which is relevant when evaluating an unfamiliar website.",
    frWhat: "L'âge d'un domaine est la durée écoulée depuis son premier enregistrement, calculée à partir de sa date de création d'origine dans l'enregistrement Whois. C'est un signal souvent cité dans les discussions SEO, et aussi un moyen rapide de vérification de confiance — un domaine enregistré il y a plusieurs décennies a un historique très différent d'un domaine créé la semaine dernière, ce qui est pertinent pour évaluer un site inconnu.",
    how: "This tool retrieves the domain's original creation date from its Whois registration record and calculates the elapsed time down to years, months, and days. Because this data comes directly from the domain registry, it reflects the actual first registration date, even if the domain has changed owners or been redesigned many times since.",
    frHow: "Cet outil récupère la date de création d'origine du domaine à partir de son enregistrement Whois, et calcule le temps écoulé en années, mois et jours. Comme cette donnée provient directement du registre du domaine, elle reflète la date réelle du premier enregistrement, même si le domaine a changé de propriétaire ou été refondu plusieurs fois depuis.",
    faq: [
      { q: "Does an older domain rank better in Google?", a: "Google has stated that domain age itself is not a significant ranking factor. What correlates with better rankings is usually a longer history of quality content and backlinks, which naturally takes time to build — age is a side effect, not the direct cause." },
      { q: "Can domain age indicate if a site is a scam?", a: "It's one signal among many, not proof by itself. A very new domain combined with other red flags (poor design, urgent pressure tactics, no contact info) is worth extra caution, but plenty of new, legitimate businesses also register brand-new domains." },
      { q: "Why does the domain age differ from when the current website was launched?", a: "A domain can sit unused, be resold, or have its content completely rebuilt while keeping the same original registration date. Domain age tracks the name's registration history, not the age of the current website design or content." },
    ],
    frFaq: [
      { q: "Un domaine plus ancien est-il mieux classé sur Google ?", a: "Google a indiqué que l'âge du domaine en lui-même n'est pas un facteur de classement significatif. Ce qui corrèle avec un meilleur classement, c'est généralement un historique plus long de contenu de qualité et de liens entrants, qui prend naturellement du temps à construire — l'âge en est un effet secondaire, pas la cause directe." },
      { q: "L'âge du domaine peut-il indiquer une arnaque ?", a: "C'est un signal parmi d'autres, pas une preuve en soi. Un domaine très récent combiné à d'autres signaux d'alerte (design bâclé, pression urgente, absence de coordonnées) mérite une prudence supplémentaire, mais de nombreuses entreprises légitimes créent aussi des domaines tout neufs." },
      { q: "Pourquoi l'âge du domaine diffère-t-il du lancement du site actuel ?", a: "Un domaine peut rester inutilisé, être revendu, ou voir son contenu entièrement reconstruit tout en gardant sa date d'enregistrement d'origine. L'âge du domaine suit l'historique d'enregistrement du nom, pas l'âge du design ou du contenu actuel du site." },
    ],
  },

  ping: {
    title: "Ping Test — Server Response Time Checker",
    frTitle: "Test de Ping — Vérificateur de Temps de Réponse Serveur",
    what: "Ping measures the round-trip time it takes for a small data packet to travel from your connection to a server and back, expressed in milliseconds (ms). It's the most direct way to measure network latency — how quickly a server responds — which matters far more than raw download speed for real-time activities like video calls, online gaming, and remote desktop access.",
    frWhat: "Le ping mesure le temps aller-retour nécessaire à un petit paquet de données pour voyager de votre connexion jusqu'à un serveur et revenir, exprimé en millisecondes (ms). C'est le moyen le plus direct de mesurer la latence réseau — la rapidité de réponse d'un serveur — ce qui compte bien plus que la vitesse de téléchargement brute pour les activités en temps réel comme les appels vidéo, le jeu en ligne et l'accès à distance.",
    how: "The test sends a series of small signal packets to the target server or domain and measures the time for each to return, then reports the average, minimum, and maximum response time along with packet loss (the percentage of signals that never came back, which indicates connection instability). Lower and more consistent numbers mean a healthier, more responsive connection.",
    frHow: "Le test envoie une série de petits paquets de signal vers le serveur ou domaine cible et mesure le temps de retour de chacun, puis rapporte le temps de réponse moyen, minimum et maximum, ainsi que la perte de paquets (le pourcentage de signaux jamais revenus, révélateur d'une instabilité de connexion). Des chiffres plus bas et plus réguliers indiquent une connexion plus saine et plus réactive.",
    faq: [
      { q: "What is considered a good ping?", a: "Under 20ms is excellent (ideal for competitive gaming), 20–50ms is good for most uses including gaming, 50–100ms is acceptable for browsing and streaming but noticeable in fast games, and above 150ms typically causes visible lag in real-time applications." },
      { q: "Why does my ping spike randomly?", a: "Sudden spikes are often caused by network congestion (other devices using bandwidth), Wi-Fi interference, your ISP's routing at that moment, or the target server itself being under heavy load — it's not always something wrong on your end." },
      { q: "What does packet loss mean?", a: "Packet loss occurs when some of the data packets sent never arrive at their destination. Even small amounts (1–2%) can cause noticeable stuttering in video calls or games, while higher percentages often indicate a failing connection, faulty cable, or Wi-Fi interference." },
    ],
    frFaq: [
      { q: "Qu'est-ce qu'un bon ping ?", a: "Moins de 20ms est excellent (idéal pour le jeu compétitif), 20–50ms est bon pour la plupart des usages y compris le jeu, 50–100ms est acceptable pour la navigation et le streaming mais perceptible dans les jeux rapides, et au-delà de 150ms cela provoque généralement un décalage visible dans les applications temps réel." },
      { q: "Pourquoi mon ping fait-il des pics aléatoires ?", a: "Les pics soudains sont souvent causés par une congestion du réseau (d'autres appareils utilisant la bande passante), des interférences Wi-Fi, le routage de votre FAI à ce moment précis, ou le serveur cible lui-même étant surchargé — ce n'est pas toujours un problème de votre côté." },
      { q: "Que signifie la perte de paquets ?", a: "La perte de paquets se produit quand certains paquets de données envoyés n'arrivent jamais à destination. Même de petites quantités (1–2%) peuvent causer des saccades perceptibles en appel vidéo ou en jeu, tandis que des pourcentages plus élevés indiquent souvent une connexion défaillante, un câble défectueux, ou des interférences Wi-Fi." },
    ],
  },

  ports: {
    title: "Port Scanner — Check Which Ports Are Open",
    frTitle: "Scanneur de Ports — Vérifier Quels Ports Sont Ouverts",
    what: "A network port is a numbered communication channel that lets a specific type of traffic reach a server — for example, port 80 for regular web traffic, port 443 for secure HTTPS, and port 22 for SSH remote access. A port scanner checks whether these channels are open (accepting connections), closed, or filtered (blocked by a firewall) on a given host, which is essential for diagnosing connectivity issues and reviewing basic security exposure.",
    frWhat: "Un port réseau est un canal de communication numéroté qui permet à un type de trafic spécifique d'atteindre un serveur — par exemple le port 80 pour le trafic web standard, le port 443 pour le HTTPS sécurisé, et le port 22 pour l'accès distant SSH. Un scanneur de ports vérifie si ces canaux sont ouverts (acceptent les connexions), fermés, ou filtrés (bloqués par un pare-feu) sur un hôte donné — essentiel pour diagnostiquer des problèmes de connectivité et vérifier une exposition de sécurité de base.",
    how: "The scanner attempts a connection to each specified port on the target host and classifies the result: 'open' means a service actively responded, 'closed' means the host responded but nothing is listening on that port, and 'filtered' means no response was received at all, usually because a firewall is silently dropping the request. Scanning is only appropriate for hosts you own or have permission to test.",
    frHow: "Le scanneur tente une connexion à chaque port spécifié sur l'hôte cible et classe le résultat : « ouvert » signifie qu'un service a répondu activement, « fermé » signifie que l'hôte a répondu mais que rien n'écoute sur ce port, et « filtré » signifie qu'aucune réponse n'a été reçue, généralement parce qu'un pare-feu bloque silencieusement la requête. Le scan n'est approprié que pour des hôtes que vous possédez ou que vous avez l'autorisation de tester.",
    faq: [
      { q: "Is it legal to scan any website's ports?", a: "Port scanning a system you do not own or have explicit permission to test can violate computer misuse laws in many countries, even without malicious intent. Only scan your own servers or ones you have written authorization to test." },
      { q: "Why is a port shown as 'filtered' instead of 'closed'?", a: "A filtered result means a firewall is intercepting the connection attempt and not responding at all, as opposed to a closed port where the host itself replies that nothing is listening. Filtering is a common, intentional security measure." },
      { q: "Which ports are considered risky to leave open?", a: "Ports for services not meant to be public — like 3389 (Remote Desktop), 23 (Telnet, unencrypted), or database ports like 3306 (MySQL) or 5432 (PostgreSQL) — are common attack targets if left exposed to the internet without strict access controls." },
    ],
    frFaq: [
      { q: "Est-il légal de scanner les ports de n'importe quel site ?", a: "Scanner les ports d'un système que vous ne possédez pas ou n'avez pas explicitement l'autorisation de tester peut enfreindre les lois sur l'usage abusif informatique dans de nombreux pays, même sans intention malveillante. Ne scannez que vos propres serveurs ou ceux pour lesquels vous avez une autorisation écrite." },
      { q: "Pourquoi un port est-il « filtré » plutôt que « fermé » ?", a: "Un résultat filtré signifie qu'un pare-feu intercepte la tentative de connexion et ne répond pas du tout, contrairement à un port fermé où l'hôte lui-même répond que rien n'écoute. Le filtrage est une mesure de sécurité courante et intentionnelle." },
      { q: "Quels ports sont considérés comme risqués à laisser ouverts ?", a: "Les ports de services non destinés à être publics — comme le 3389 (Bureau à distance), le 23 (Telnet, non chiffré), ou les ports de base de données comme 3306 (MySQL) ou 5432 (PostgreSQL) — sont des cibles d'attaque courantes s'ils sont exposés à internet sans contrôles d'accès stricts." },
    ],
  },

  headers: {
    title: "HTTP Headers Checker — Inspect Response Headers",
    frTitle: "Vérificateur d'En-têtes HTTP — Inspecter les En-têtes de Réponse",
    what: "HTTP headers are metadata sent alongside every web page response, invisible to regular visitors but essential to how browsers, search engines, and caches behave. They include information like the server software in use, caching rules, security policies, content type, and redirect instructions. Inspecting them helps developers debug caching issues, verify security configurations, and confirm SEO-related settings.",
    frWhat: "Les en-têtes HTTP sont des métadonnées envoyées avec chaque réponse de page web, invisibles pour les visiteurs classiques mais essentielles au comportement des navigateurs, moteurs de recherche et caches. Elles incluent des informations comme le logiciel serveur utilisé, les règles de cache, les politiques de sécurité, le type de contenu, et les instructions de redirection. Les inspecter aide les développeurs à déboguer des problèmes de cache, vérifier des configurations de sécurité, et confirmer des réglages liés au SEO.",
    how: "This tool sends a request to the given URL and displays every header returned by the server in the raw HTTP response, without any browser interpretation. Key headers to look for include Content-Type (what kind of content is returned), Cache-Control (how long browsers should store the page), Strict-Transport-Security (forces HTTPS), and X-Frame-Options (prevents clickjacking).",
    frHow: "Cet outil envoie une requête vers l'URL donnée et affiche chaque en-tête renvoyé par le serveur dans la réponse HTTP brute, sans aucune interprétation du navigateur. Les en-têtes clés à surveiller incluent Content-Type (le type de contenu renvoyé), Cache-Control (durée de stockage de la page par les navigateurs), Strict-Transport-Security (force le HTTPS), et X-Frame-Options (empêche le clickjacking).",
    faq: [
      { q: "Why should I care about security headers?", a: "Headers like Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security protect visitors against common attacks like clickjacking and man-in-the-middle downgrades. Missing these is a common finding in basic security audits, and adding them is usually a quick server-config change." },
      { q: "What does the Server header reveal?", a: "It often shows the web server software and sometimes its version (like nginx or Apache). Some site operators intentionally hide or mask this header, since revealing exact software versions can help attackers target known vulnerabilities." },
      { q: "Why do I see a redirect header instead of the page content?", a: "A 301 or 302 status with a Location header means the URL is redirecting to a different address. This is normal for shortened URLs, HTTP-to-HTTPS upgrades, or pages that have moved — the tool shows you exactly where the redirect points." },
    ],
    frFaq: [
      { q: "Pourquoi devrais-je me soucier des en-têtes de sécurité ?", a: "Des en-têtes comme Content-Security-Policy, X-Frame-Options, et Strict-Transport-Security protègent les visiteurs contre des attaques courantes comme le clickjacking et les attaques de l'intercepteur. Leur absence est un constat fréquent lors d'audits de sécurité basiques, et les ajouter est généralement un changement rapide de configuration serveur." },
      { q: "Que révèle l'en-tête Server ?", a: "Il indique souvent le logiciel serveur web et parfois sa version (comme nginx ou Apache). Certains opérateurs de site masquent volontairement cet en-tête, car révéler les versions exactes du logiciel peut aider des attaquants à cibler des vulnérabilités connues." },
      { q: "Pourquoi je vois un en-tête de redirection au lieu du contenu de la page ?", a: "Un statut 301 ou 302 avec un en-tête Location signifie que l'URL redirige vers une autre adresse. C'est normal pour des URL raccourcies, des mises à niveau HTTP vers HTTPS, ou des pages déplacées — l'outil vous montre exactement vers où pointe la redirection." },
    ],
  },

  traceroute: {
    title: "Traceroute — Trace the Network Path to a Destination",
    frTitle: "Traceroute — Tracer le Chemin Réseau vers une Destination",
    what: "Traceroute maps every network 'hop' — router or server — that your connection passes through on its way to a destination, along with the time it takes to reach each one. Instead of just telling you whether a connection is slow, it shows you exactly where along the path the delay is happening, which is invaluable for diagnosing whether a problem is with your ISP, an intermediate network, or the destination server itself.",
    frWhat: "Le traceroute cartographie chaque « saut » réseau — routeur ou serveur — que traverse votre connexion pour atteindre une destination, avec le temps nécessaire pour atteindre chacun. Plutôt que de simplement indiquer si une connexion est lente, il montre exactement à quel endroit du trajet se situe le ralentissement — précieux pour diagnostiquer si un problème vient de votre FAI, d'un réseau intermédiaire, ou du serveur de destination lui-même.",
    how: "The tool sends a sequence of packets toward the destination with gradually increasing 'hop limits', causing each router along the path to respond in turn and reveal itself. The result is an ordered list of every hop with its IP address and response time — a sudden jump in response time or a hop that stops responding altogether usually points to where a network problem is occurring.",
    frHow: "L'outil envoie une séquence de paquets vers la destination avec des « limites de sauts » progressivement croissantes, ce qui fait répondre chaque routeur du trajet à son tour et se révéler. Le résultat est une liste ordonnée de chaque saut avec son adresse IP et son temps de réponse — un saut brutal du temps de réponse ou un saut qui cesse totalement de répondre indique généralement l'endroit où survient un problème réseau.",
    faq: [
      { q: "Why does one hop show a much higher response time than the others?", a: "This is common and not always a problem — some routers deprioritize responding to traceroute-style requests for security reasons, causing an artificially high or missing reading at that specific hop, even though traffic continues to flow normally beyond it." },
      { q: "What does '* * *' or a timeout at a hop mean?", a: "It means that particular router did not respond within the time limit, often because it's configured to ignore or deprioritize these diagnostic requests. This alone doesn't mean the connection is broken — traceroute usually continues successfully to the following hops." },
      { q: "How is traceroute different from a ping test?", a: "Ping only tells you the total round-trip time to the final destination. Traceroute breaks that same journey down hop by hop, showing you every intermediate point along the way — useful for pinpointing exactly where in the network a slowdown is occurring." },
    ],
    frFaq: [
      { q: "Pourquoi un saut affiche-t-il un temps de réponse bien plus élevé que les autres ?", a: "C'est courant et pas toujours un problème — certains routeurs dépriorisent volontairement les réponses aux requêtes de type traceroute pour des raisons de sécurité, causant une lecture artificiellement élevée ou absente à ce saut précis, même si le trafic continue normalement au-delà." },
      { q: "Que signifie « * * * » ou un délai dépassé à un saut ?", a: "Cela signifie que ce routeur particulier n'a pas répondu dans le délai imparti, souvent parce qu'il est configuré pour ignorer ou dépriorisier ces requêtes de diagnostic. Cela seul ne signifie pas que la connexion est rompue — le traceroute continue généralement avec succès vers les sauts suivants." },
      { q: "En quoi le traceroute diffère-t-il d'un test de ping ?", a: "Le ping indique seulement le temps aller-retour total vers la destination finale. Le traceroute découpe ce même trajet saut par saut, montrant chaque point intermédiaire — utile pour localiser précisément où dans le réseau un ralentissement se produit." },
    ],
  },

  subnet: {
    title: "Subnet / CIDR Calculator — Network, Broadcast & Usable Hosts",
    frTitle: "Calculateur de Sous-réseau / CIDR — Réseau, Diffusion et Hôtes Utilisables",
    what: "A subnet calculator breaks down an IP address written in CIDR notation (like 192.168.1.0/24) into every value a network engineer needs: the network address, the broadcast address, the subnet mask, the range of usable host addresses, and how many devices that range can hold. CIDR notation packs the subnet mask into a single number after the slash — a /24 means the first 24 bits identify the network, leaving the remaining 8 bits for host addresses.",
    frWhat: "Un calculateur de sous-réseau décompose une adresse IP écrite en notation CIDR (comme 192.168.1.0/24) en toutes les valeurs dont un ingénieur réseau a besoin : l'adresse réseau, l'adresse de diffusion, le masque de sous-réseau, la plage d'adresses d'hôtes utilisables, et le nombre d'appareils que cette plage peut contenir. La notation CIDR condense le masque de sous-réseau en un seul nombre après la barre oblique — un /24 signifie que les 24 premiers bits identifient le réseau, laissant les 8 bits restants pour les adresses d'hôtes.",
    how: "Enter an address and prefix length together, like 10.0.0.0/16. The tool applies the subnet mask to the address using binary math to find the network's lower boundary (network address) and upper boundary (broadcast address). Everything in between, minus those two reserved addresses, is usable by devices on that subnet — except for /31 and /32 blocks, which follow special point-to-point and single-host rules.",
    frHow: "Saisissez une adresse et une longueur de préfixe ensemble, comme 10.0.0.0/16. L'outil applique le masque de sous-réseau à l'adresse via des calculs binaires pour trouver la borne inférieure du réseau (adresse réseau) et la borne supérieure (adresse de diffusion). Tout ce qui se trouve entre les deux, moins ces deux adresses réservées, est utilisable par les appareils de ce sous-réseau — sauf pour les blocs /31 et /32, qui suivent des règles spéciales point-à-point et hôte unique.",
    formula: { expr: "usable hosts = 2^(32 − prefix) − 2", note: "Except for /31 (2 usable, point-to-point) and /32 (1 usable, single host)." },
    frFormula: { expr: "hôtes utilisables = 2^(32 − préfixe) − 2", note: "Sauf pour /31 (2 utilisables, point-à-point) et /32 (1 utilisable, hôte unique)." },
    examples: [
      { label: "Small office LAN", input: "192.168.1.0/24", result: "254 usable hosts" },
      { label: "Point-to-point link", input: "10.10.10.0/31", result: "2 usable hosts" },
      { label: "Large internal range", input: "172.16.0.0/16", result: "65,534 usable hosts" },
    ],
    frExamples: [
      { label: "Petit réseau de bureau", input: "192.168.1.0/24", result: "254 hôtes utilisables" },
      { label: "Liaison point-à-point", input: "10.10.10.0/31", result: "2 hôtes utilisables" },
      { label: "Grande plage interne", input: "172.16.0.0/16", result: "65 534 hôtes utilisables" },
    ],
    faq: [
      { q: "Why does a /24 give 254 usable hosts instead of 256?", a: "A /24 has 256 total addresses, but the first (network address) and last (broadcast address) are reserved for the network itself and can't be assigned to a device, leaving 254 for actual hosts." },
      { q: "What's different about /31 subnets?", a: "A /31 has only two addresses total, and neither is 'wasted' on a broadcast address — both are usable, which is why /31 is the standard choice for point-to-point links between two routers." },
      { q: "What is a wildcard mask used for?", a: "It's the inverse of the subnet mask, and it's the format older networking equipment (like Cisco ACLs) expects when you specify which addresses a rule should match, instead of the more common subnet mask notation." },
      { q: "Can I use this for IPv6?", a: "No — this calculator is IPv4-only. IPv6 subnetting follows the same CIDR concept but works with a much larger 128-bit address space and different conventions." },
    ],
    frFaq: [
      { q: "Pourquoi un /24 donne-t-il 254 hôtes utilisables au lieu de 256 ?", a: "Un /24 compte 256 adresses au total, mais la première (adresse réseau) et la dernière (adresse de diffusion) sont réservées au réseau lui-même et ne peuvent pas être assignées à un appareil, laissant 254 adresses pour les hôtes réels." },
      { q: "Qu'est-ce qui est différent avec les sous-réseaux /31 ?", a: "Un /31 ne compte que deux adresses au total, et aucune n'est « gaspillée » sur une adresse de diffusion — les deux sont utilisables, ce qui en fait le choix standard pour les liaisons point-à-point entre deux routeurs." },
      { q: "À quoi sert un masque générique (wildcard) ?", a: "C'est l'inverse du masque de sous-réseau, et c'est le format attendu par les équipements réseau plus anciens (comme les ACL Cisco) pour spécifier quelles adresses une règle doit cibler, plutôt que la notation plus courante du masque de sous-réseau." },
      { q: "Puis-je l'utiliser pour l'IPv6 ?", a: "Non — ce calculateur est réservé à l'IPv4. Le sous-réseautage IPv6 suit le même concept de CIDR mais fonctionne avec un espace d'adressage bien plus vaste (128 bits) et des conventions différentes." },
    ],
  },

  dnsprop: {
    title: "DNS Propagation Checker — Has Your DNS Change Gone Live?",
    frTitle: "Vérificateur de Propagation DNS — Votre Changement DNS Est-il en Ligne ?",
    what: "When you update a domain's DNS records — pointing it to a new server, adding a subdomain — that change doesn't reach every resolver on the internet instantly. Each DNS record has a TTL (time-to-live) that controls how long resolvers are allowed to cache the old answer before checking again, so different resolvers can show old and new results at the same time until every cache expires.",
    frWhat: "Lorsque vous mettez à jour les enregistrements DNS d'un domaine — pointer vers un nouveau serveur, ajouter un sous-domaine — ce changement n'atteint pas instantanément tous les résolveurs d'internet. Chaque enregistrement DNS a un TTL (durée de vie) qui contrôle combien de temps les résolveurs sont autorisés à mettre en cache l'ancienne réponse avant de revérifier, si bien que différents résolveurs peuvent afficher simultanément d'anciens et de nouveaux résultats jusqu'à expiration de tous les caches.",
    how: "This tool queries several major independent DNS resolver operators — Cloudflare, Google, and Quad9 — for the record type you choose, and compares what each one currently returns. If all resolvers agree, propagation is complete. If they disagree, or some fail to answer, propagation is still in progress. Note that a browser-based tool can only reach global resolver operators, not simulate a specific country or ISP's local resolver.",
    frHow: "Cet outil interroge plusieurs opérateurs de résolveurs DNS indépendants majeurs — Cloudflare, Google et Quad9 — pour le type d'enregistrement choisi, et compare ce que chacun renvoie actuellement. Si tous les résolveurs sont d'accord, la propagation est complète. S'ils sont en désaccord, ou si certains ne répondent pas, la propagation est encore en cours. Notez qu'un outil basé navigateur ne peut interroger que des opérateurs de résolveurs globaux, sans simuler le résolveur local d'un pays ou d'un FAI précis.",
    faq: [
      { q: "Why do different resolvers show different results for my domain?", a: "Each resolver may have cached your old record at a different time, so it will keep serving that cached answer until its own TTL countdown finishes — this is normal and resolves itself as caches expire." },
      { q: "How long does DNS propagation usually take?", a: "It depends entirely on the TTL you (or the previous record) had set — anywhere from a few minutes for a short TTL to 24-48 hours for a long one. Lowering the TTL a day before a planned change speeds up future propagation." },
      { q: "Why does it say 'Failed' even though my DNS looks correct?", a: "This usually means none of the checked resolvers could find any record of that type for the domain — double-check the domain spelling and that the record type actually exists (e.g. don't check MX if you never set up a mail record)." },
      { q: "Can I force propagation to happen faster?", a: "Not directly — you can't override other people's resolver caches. The most reliable way to speed up future changes is lowering the TTL in advance, so the next change propagates faster." },
    ],
    frFaq: [
      { q: "Pourquoi différents résolveurs affichent-ils des résultats différents pour mon domaine ?", a: "Chaque résolveur a peut-être mis en cache votre ancien enregistrement à un moment différent, et continuera à servir cette réponse mise en cache jusqu'à la fin de son propre compte à rebours TTL — c'est normal et cela se résout de soi-même à l'expiration des caches." },
      { q: "Combien de temps prend généralement la propagation DNS ?", a: "Cela dépend entièrement du TTL que vous (ou l'enregistrement précédent) aviez défini — de quelques minutes pour un TTL court à 24-48 heures pour un TTL long. Réduire le TTL la veille d'un changement planifié accélère la propagation future." },
      { q: "Pourquoi le résultat indique-t-il « Échouée » alors que mon DNS semble correct ?", a: "Cela signifie généralement qu'aucun des résolveurs vérifiés n'a trouvé d'enregistrement de ce type pour le domaine — vérifiez l'orthographe du domaine et que le type d'enregistrement existe réellement (par exemple, ne vérifiez pas MX si vous n'avez jamais configuré d'enregistrement mail)." },
      { q: "Puis-je forcer la propagation à se faire plus vite ?", a: "Pas directement — vous ne pouvez pas outrepasser les caches des résolveurs d'autrui. Le moyen le plus fiable d'accélérer de futurs changements est de réduire le TTL à l'avance, pour que le prochain changement se propage plus vite." },
    ],
  },

  iplookup: {
    title: "IP Address Lookup — Geolocation, ISP & Organization Info",
    frTitle: "Recherche d'Adresse IP — Géolocalisation, FAI et Organisation",
    what: "An IP lookup tool takes any public IPv4 address and returns what's publicly known about it: the approximate geographic location, the internet service provider or hosting company it belongs to, and the organization it's registered to. This is the same kind of information websites, ad networks, and security tools use to make decisions about a visitor before they even load a page.",
    frWhat: "Un outil de recherche IP prend n'importe quelle adresse IPv4 publique et renvoie ce qui est publiquement connu à son sujet : la localisation géographique approximative, le fournisseur d'accès internet ou l'hébergeur auquel elle appartient, et l'organisation à laquelle elle est enregistrée. C'est le même type d'information que les sites web, régies publicitaires et outils de sécurité utilisent pour prendre des décisions sur un visiteur avant même le chargement d'une page.",
    how: "Enter any public IPv4 address and the tool queries public IP-to-location and IP-to-organization databases to return the country, region, city, ISP, hosting organization, and (when available) the autonomous system number (ASN) that IP block belongs to. Unlike the My IP tool, which always detects your own address, this tool looks up any address you provide — useful for investigating traffic in server logs or verifying where a service is hosted.",
    frHow: "Saisissez n'importe quelle adresse IPv4 publique et l'outil interroge des bases de données publiques IP-vers-localisation et IP-vers-organisation pour renvoyer le pays, la région, la ville, le FAI, l'organisation d'hébergement, et (si disponible) le numéro de système autonome (ASN) auquel appartient ce bloc d'IP. Contrairement à l'outil Mon IP, qui détecte toujours votre propre adresse, cet outil recherche n'importe quelle adresse que vous fournissez — utile pour examiner du trafic dans des journaux serveur ou vérifier où un service est hébergé.",
    faq: [
      { q: "Why is the location shown not exact?", a: "IP geolocation is based on the registered location of the ISP's network block, which is often centered on a regional hub — it typically narrows down to a city or region, not a precise street address." },
      { q: "What is an ASN and why does it matter?", a: "An Autonomous System Number identifies a specific network operator on the internet — every ISP, cloud provider, and large company that manages its own routing has one. It's useful for identifying which organization actually controls an IP block, beyond just the ISP name." },
      { q: "Why does the ISP field show a hosting company instead of a residential provider?", a: "If the IP belongs to a server rather than a home connection, the ISP/organization field will show the hosting or cloud provider (like a data center operator) rather than a consumer internet provider." },
      { q: "Can I look up a private IP address like 192.168.1.1?", a: "No — private IP ranges (like 192.168.x.x, 10.x.x.x) are only meaningful inside a local network and have no public geolocation data, since they aren't routed on the public internet." },
    ],
    frFaq: [
      { q: "Pourquoi la localisation affichée n'est-elle pas exacte ?", a: "La géolocalisation IP se base sur la localisation enregistrée du bloc réseau du FAI, souvent centrée sur un pôle régional — elle se limite généralement à une ville ou une région, pas une adresse précise." },
      { q: "Qu'est-ce qu'un ASN et pourquoi est-ce important ?", a: "Un numéro de système autonome identifie un opérateur réseau spécifique sur internet — chaque FAI, fournisseur cloud et grande entreprise gérant son propre routage en possède un. Utile pour identifier quelle organisation contrôle réellement un bloc d'IP, au-delà du simple nom du FAI." },
      { q: "Pourquoi le champ FAI affiche-t-il une société d'hébergement plutôt qu'un fournisseur résidentiel ?", a: "Si l'IP appartient à un serveur plutôt qu'à une connexion domestique, le champ FAI/organisation affichera l'hébergeur ou le fournisseur cloud (comme un opérateur de centre de données) plutôt qu'un fournisseur internet grand public." },
      { q: "Puis-je rechercher une adresse IP privée comme 192.168.1.1 ?", a: "Non — les plages IP privées (comme 192.168.x.x, 10.x.x.x) n'ont de sens qu'à l'intérieur d'un réseau local et n'ont aucune donnée de géolocalisation publique, car elles ne sont pas routées sur l'internet public." },
    ],
  },

  emailsec: {
    title: "Email Security Checker — SPF, DKIM & DMARC",
    frTitle: "Vérificateur de Sécurité Email — SPF, DKIM et DMARC",
    what: "SPF, DKIM and DMARC are three DNS records that together prove an email actually came from your domain instead of being spoofed by a scammer. SPF lists which servers are allowed to send mail for your domain, DKIM cryptographically signs each message so it can't be tampered with in transit, and DMARC tells receiving mail servers what to do when a message fails those checks — and where to send reports about it.",
    frWhat: "SPF, DKIM et DMARC sont trois enregistrements DNS qui, ensemble, prouvent qu'un email provient réellement de votre domaine plutôt que d'être usurpé par un escroc. SPF liste les serveurs autorisés à envoyer du courrier pour votre domaine, DKIM signe cryptographiquement chaque message pour qu'il ne puisse pas être altéré en transit, et DMARC indique aux serveurs receveurs quoi faire quand un message échoue ces contrôles — et où envoyer des rapports à ce sujet.",
    how: "Enter a domain and the tool queries its DNS TXT records directly: the domain's own TXT records for an SPF entry starting with 'v=spf1', the '_dmarc' subdomain for a DMARC policy starting with 'v=DMARC1', and a list of common selector names (google, default, selector1...) under '_domainkey' to find a DKIM key. DKIM selectors aren't discoverable by design, so a domain can have DKIM configured under a selector this tool doesn't try — a 'not found' result there is not definitive.",
    frHow: "Saisissez un domaine et l'outil interroge directement ses enregistrements DNS TXT : les enregistrements TXT du domaine lui-même pour une entrée SPF commençant par 'v=spf1', le sous-domaine '_dmarc' pour une politique DMARC commençant par 'v=DMARC1', et une liste de noms de sélecteurs courants (google, default, selector1...) sous '_domainkey' pour trouver une clé DKIM. Les sélecteurs DKIM ne sont pas découvrables par conception, donc un domaine peut avoir DKIM configuré sous un sélecteur que cet outil n'essaie pas — un résultat « introuvable » n'est donc pas définitif.",
    faq: [
      { q: "Why does DMARC matter if I already have SPF and DKIM?", a: "SPF and DKIM alone don't tell receiving servers what to actually do when a message fails — DMARC adds the enforcement policy (none, quarantine, or reject) plus reporting, so you find out about spoofing attempts instead of just hoping SPF/DKIM catch them." },
      { q: "What's the difference between p=none, p=quarantine and p=reject?", a: "'none' only monitors and reports failures without blocking anything, 'quarantine' sends failing mail to spam, and 'reject' blocks it outright — most domains start at 'none' to gather data safely before tightening the policy." },
      { q: "The tool says DKIM wasn't found, but I know I configured it — why?", a: "DKIM selectors are arbitrary strings chosen by your mail provider and aren't published anywhere discoverable — this tool only tries the dozen or so most common ones, so a real DKIM setup under an unusual selector name will show as 'not found' here." },
      { q: "Do I need all three records?", a: "SPF alone offers weak protection since it doesn't survive email forwarding, DKIM alone doesn't stop spoofing without alignment checks, and DMARC needs at least one of the other two to function — using all three together is the standard recommended setup." },
    ],
    frFaq: [
      { q: "Pourquoi DMARC est-il important si j'ai déjà SPF et DKIM ?", a: "SPF et DKIM seuls n'indiquent pas aux serveurs receveurs quoi faire réellement en cas d'échec — DMARC ajoute la politique d'application (none, quarantine ou reject) plus le reporting, pour que vous soyez informé des tentatives d'usurpation au lieu d'espérer que SPF/DKIM les bloquent seuls." },
      { q: "Quelle est la différence entre p=none, p=quarantine et p=reject ?", a: "« none » ne fait que surveiller et rapporter les échecs sans rien bloquer, « quarantine » envoie les mails en échec vers les spams, et « reject » les bloque purement et simplement — la plupart des domaines commencent par « none » pour collecter des données en toute sécurité avant de durcir la politique." },
      { q: "L'outil indique que DKIM est introuvable, mais je sais l'avoir configuré — pourquoi ?", a: "Les sélecteurs DKIM sont des chaînes arbitraires choisies par votre fournisseur de messagerie et ne sont publiées nulle part de façon découvrable — cet outil n'essaie qu'une douzaine des plus courants, donc une vraie configuration DKIM sous un nom de sélecteur inhabituel apparaîtra comme « introuvable » ici." },
      { q: "Ai-je besoin des trois enregistrements ?", a: "SPF seul offre une protection faible car il ne survit pas au transfert d'email, DKIM seul n'empêche pas l'usurpation sans contrôles d'alignement, et DMARC a besoin d'au moins l'un des deux autres pour fonctionner — utiliser les trois ensemble est la configuration standard recommandée." },
    ],
  },

  secheaders: {
    title: "Security Headers Grader — Score Your Site's HTTP Defenses",
    frTitle: "Notation des En-têtes de Sécurité — Notez les Défenses HTTP de Votre Site",
    what: "HTTP security headers are instructions a server sends back to the browser, telling it to enforce extra protections — like refusing to load scripts from untrusted sources, or blocking the page from being embedded in someone else's iframe. A site can be perfectly secure at the application level and still be missing these headers, leaving otherwise-preventable attack surface open.",
    frWhat: "Les en-têtes de sécurité HTTP sont des instructions qu'un serveur renvoie au navigateur, lui demandant d'appliquer des protections supplémentaires — comme refuser de charger des scripts depuis des sources non fiables, ou empêcher la page d'être intégrée dans l'iframe d'un autre site. Un site peut être parfaitement sécurisé au niveau applicatif et pourtant manquer ces en-têtes, laissant ouverte une surface d'attaque évitable.",
    how: "Enter a URL and the tool fetches the page's actual HTTP response headers, then checks for ten headers a modern browser can enforce (CSP, HSTS, X-Frame-Options, and others), each weighted by how much protection it typically adds. The weighted total becomes a percentage, and that percentage maps to a letter grade from F to A+ — the same approach used by public security-header scanners.",
    frHow: "Saisissez une URL et l'outil récupère les en-têtes de réponse HTTP réels de la page, puis vérifie dix en-têtes qu'un navigateur moderne peut appliquer (CSP, HSTS, X-Frame-Options, et d'autres), chacun pondéré selon la protection qu'il apporte généralement. Le total pondéré devient un pourcentage, qui correspond à une note de F à A+ — la même approche utilisée par les scanners d'en-têtes de sécurité publics.",
    faq: [
      { q: "Why is Content-Security-Policy weighted so much higher than the others?", a: "CSP is the single most effective defense against cross-site scripting (XSS), one of the most common and damaging web vulnerabilities — the other headers each close one specific gap, while CSP can prevent an entire category of attacks at once." },
      { q: "My site got a low grade but I've never been hacked — should I still fix this?", a: "Missing headers are unused protection, not proof of a working defense — they matter most in the exact scenario where something else on your site has a bug (an XSS flaw, a rogue third-party script), which is precisely when you can't predict it in advance." },
      { q: "Can I just add all ten headers and get an A+?", a: "Mostly yes, though Content-Security-Policy needs to be tailored to your actual site (which scripts, styles, and domains it legitimately uses) — copying someone else's CSP verbatim can break your site's functionality, so that one takes more care than the others." },
      { q: "Why did the check fail for a site I know is online?", a: "Some servers block requests that don't come directly from a real browser, or the proxy this tool uses to read cross-origin headers may be rate-limited — try again in a moment, or check the headers directly via your browser's developer tools." },
    ],
    frFaq: [
      { q: "Pourquoi Content-Security-Policy est-il tellement plus pondéré que les autres ?", a: "CSP est la défense la plus efficace contre le cross-site scripting (XSS), l'une des vulnérabilités web les plus courantes et dommageables — chaque autre en-tête comble une lacune spécifique, tandis que CSP peut prévenir toute une catégorie d'attaques à la fois." },
      { q: "Mon site a une note faible mais je n'ai jamais été piraté — dois-je quand même corriger cela ?", a: "Les en-têtes manquants sont une protection inutilisée, pas une preuve de défense fonctionnelle — ils comptent le plus dans le scénario exact où autre chose sur votre site a un bug (une faille XSS, un script tiers compromis), précisément quand vous ne pouvez pas le prévoir à l'avance." },
      { q: "Puis-je simplement ajouter les dix en-têtes et obtenir un A+ ?", a: "Globalement oui, mais Content-Security-Policy doit être adapté à votre site réel (quels scripts, styles et domaines il utilise légitimement) — copier le CSP de quelqu'un d'autre tel quel peut casser les fonctionnalités de votre site, donc celui-ci demande plus de soin que les autres." },
      { q: "Pourquoi la vérification a-t-elle échoué pour un site que je sais en ligne ?", a: "Certains serveurs bloquent les requêtes qui ne proviennent pas directement d'un vrai navigateur, ou le proxy utilisé par cet outil pour lire les en-têtes cross-origin peut être limité en débit — réessayez dans un instant, ou vérifiez les en-têtes directement via les outils de développement de votre navigateur." },
    ],
  },

  blacklist: {
    title: "DNS Blacklist Check — Is Your IP Flagged as a Spam Source?",
    frTitle: "Vérification Liste Noire DNS — Votre IP Est-elle Signalée comme Source de Spam ?",
    what: "A DNS blacklist (DNSBL) is a list of IP addresses that mail servers around the world consult before accepting an email — if your sending IP is on one, your messages can silently land in spam folders or get rejected outright, even though nothing looks wrong on your end. IPs get listed for sending spam, being part of a botnet, or simply being handed to you by a hosting provider after a previous tenant misused it.",
    frWhat: "Une liste noire DNS (DNSBL) est une liste d'adresses IP que les serveurs de messagerie du monde entier consultent avant d'accepter un email — si votre IP d'envoi y figure, vos messages peuvent atterrir silencieusement dans les spams ou être rejetés purement et simplement, même si rien ne semble anormal de votre côté. Les IP sont listées pour avoir envoyé du spam, avoir fait partie d'un botnet, ou simplement vous avoir été attribuées par un hébergeur après qu'un précédent locataire les ait mal utilisées.",
    how: "Enter an IP address (or a domain, which gets resolved to its IP first) and the tool queries five major independent blacklist operators — Spamhaus, Barracuda, SpamCop, SORBS and PSBL — using the standard DNSBL lookup method: reversing the IP's octets and querying that string as a subdomain of each blacklist's zone. A response means the IP is currently listed there; no response means it's clean on that particular list.",
    frHow: "Saisissez une adresse IP (ou un domaine, qui sera d'abord résolu en IP) et l'outil interroge cinq opérateurs de listes noires indépendants majeurs — Spamhaus, Barracuda, SpamCop, SORBS et PSBL — selon la méthode standard de consultation DNSBL : inverser les octets de l'IP et interroger cette chaîne comme sous-domaine de la zone de chaque liste noire. Une réponse signifie que l'IP y est actuellement listée ; aucune réponse signifie qu'elle est propre sur cette liste précise.",
    faq: [
      { q: "My IP is listed — how do I get it removed?", a: "Each blacklist operator runs its own delisting process, usually a free web form on that operator's own site — first fix whatever caused the listing (secure a compromised server, stop a spam campaign), then submit the removal request; most lists also expire entries automatically after a period of good behavior." },
      { q: "Why would a brand-new server already be blacklisted?", a: "Many blacklists list IP ranges rather than individual addresses, and cloud/hosting providers frequently reuse IPs — you may have inherited an address that a previous customer got listed, which is common enough that it's worth checking before you even start sending mail from a new IP." },
      { q: "Does being listed mean I've been hacked?", a: "Not necessarily — it's the most common cause, but shared hosting IPs, misconfigured mail servers, and even overly aggressive marketing email volume can trigger a listing without any compromise at all." },
      { q: "Are these the only blacklists that matter?", a: "There are dozens of DNSBLs in use, but the ones checked here are the small handful most major receiving mail servers actually consult — being clean across these covers the great majority of real-world deliverability impact." },
    ],
    frFaq: [
      { q: "Mon IP est listée — comment la faire retirer ?", a: "Chaque opérateur de liste noire gère son propre processus de retrait, généralement un formulaire web gratuit sur son propre site — corrigez d'abord ce qui a causé le listage (sécuriser un serveur compromis, arrêter une campagne de spam), puis soumettez la demande de retrait ; la plupart des listes expirent aussi automatiquement les entrées après une période de bon comportement." },
      { q: "Pourquoi un serveur tout neuf serait-il déjà sur liste noire ?", a: "De nombreuses listes noires listent des plages d'IP plutôt que des adresses individuelles, et les hébergeurs cloud réutilisent fréquemment les IP — vous avez peut-être hérité d'une adresse qu'un précédent client a fait lister, ce qui est assez courant pour valoir la peine d'être vérifié avant même de commencer à envoyer du courrier depuis une nouvelle IP." },
      { q: "Être listé signifie-t-il que j'ai été piraté ?", a: "Pas nécessairement — c'est la cause la plus courante, mais un hébergement mutualisé, un serveur mail mal configuré, ou même un volume d'emails marketing trop agressif peuvent déclencher un listage sans aucune compromission." },
      { q: "Sont-ce les seules listes noires qui comptent ?", a: "Il existe des dizaines de DNSBL en usage, mais celles vérifiées ici sont la poignée que la plupart des grands serveurs de messagerie receveurs consultent réellement — être propre sur celles-ci couvre la grande majorité de l'impact réel sur la délivrabilité." },
    ],
  },

  ipconv: {
    title: "IP Address Converter — Decimal, Binary & Hexadecimal",
    frTitle: "Convertisseur d'Adresse IP — Décimal, Binaire et Hexadécimal",
    what: "An IPv4 address like 192.168.1.1 is really just a 32-bit number, dressed up in dotted-decimal notation for humans to read. That same number can be written just as validly as a plain decimal integer, a hexadecimal string, or raw binary — formats that show up in firewall rules, low-level networking code, subnet masks, and older system logs.",
    frWhat: "Une adresse IPv4 comme 192.168.1.1 n'est en réalité qu'un nombre de 32 bits, habillé en notation décimale pointée pour que les humains puissent la lire. Ce même nombre peut tout aussi valablement s'écrire en entier décimal simple, en chaîne hexadécimale, ou en binaire brut — des formats que l'on retrouve dans les règles de pare-feu, le code réseau bas niveau, les masques de sous-réseau, et les anciens journaux système.",
    how: "Paste an address in any of the four formats — dotted (192.168.1.1), plain decimal (3232235777), hex (0xC0A80101), or binary (11000000.10101000...) — and the tool auto-detects which one you used, converts it to a single 32-bit number internally, then renders all four representations side by side.",
    frHow: "Collez une adresse dans l'un des quatre formats — pointé (192.168.1.1), décimal simple (3232235777), hexadécimal (0xC0A80101), ou binaire (11000000.10101000...) — et l'outil détecte automatiquement le format utilisé, le convertit en un seul nombre de 32 bits en interne, puis affiche les quatre représentations côte à côte.",
    examples: [
      { label: "Common private IP", input: "192.168.1.1", result: "0xC0A80101 / 3232235777" },
      { label: "From a decimal integer", input: "134744072", result: "8.8.8.8" },
      { label: "From hexadecimal", input: "0x08080808", result: "8.8.8.8" },
    ],
    frExamples: [
      { label: "IP privée courante", input: "192.168.1.1", result: "0xC0A80101 / 3232235777" },
      { label: "Depuis un entier décimal", input: "134744072", result: "8.8.8.8" },
      { label: "Depuis l'hexadécimal", input: "0x08080808", result: "8.8.8.8" },
    ],
    faq: [
      { q: "Why would an IP ever be written as a plain integer?", a: "Some databases, older APIs and legacy systems store IP addresses as a single 32-bit integer column instead of a string, since it's more compact and sorts/compares correctly — you'll run into this format when reading raw logs or database exports." },
      { q: "Where do I actually see IPs in hexadecimal?", a: "Hex shows up in low-level networking contexts — packet captures, firewall and router configuration on some platforms, and IPv6 addresses themselves are written in hex groups, so getting comfortable with hex-to-decimal conversion carries over." },
      { q: "Why is the binary shown in 4 groups of 8?", a: "Each group of 8 bits (an octet) corresponds exactly to one of the four dotted-decimal numbers — grouping it this way makes it easy to see, bit by bit, how a subnet mask actually carves up an address, which is much harder to read as one unbroken 32-character string." },
      { q: "Can this tool convert IPv6 addresses?", a: "No — IPv6 uses a 128-bit address space with its own notation rules and is significantly more involved to convert; this tool is IPv4-only." },
    ],
    frFaq: [
      { q: "Pourquoi une IP serait-elle écrite en simple entier ?", a: "Certaines bases de données, anciennes API et systèmes hérités stockent les adresses IP comme une seule colonne entière de 32 bits plutôt qu'une chaîne, car c'est plus compact et cela se trie/compare correctement — vous rencontrerez ce format en lisant des journaux bruts ou des exports de base de données." },
      { q: "Où voit-on réellement des IP en hexadécimal ?", a: "L'hexadécimal apparaît dans des contextes réseau bas niveau — captures de paquets, configuration de pare-feu et routeur sur certaines plateformes, et les adresses IPv6 elles-mêmes s'écrivent en groupes hexadécimaux, donc être à l'aise avec la conversion hex-décimal est transférable." },
      { q: "Pourquoi le binaire est-il affiché en 4 groupes de 8 ?", a: "Chaque groupe de 8 bits (un octet) correspond exactement à l'un des quatre nombres décimaux pointés — ce regroupement permet de voir facilement, bit par bit, comment un masque de sous-réseau découpe réellement une adresse, ce qui est bien plus difficile à lire en une chaîne continue de 32 caractères." },
      { q: "Cet outil peut-il convertir des adresses IPv6 ?", a: "Non — l'IPv6 utilise un espace d'adressage de 128 bits avec ses propres règles de notation et est nettement plus complexe à convertir ; cet outil est réservé à l'IPv4." },
    ],
  },

  contping: {
    title: "Continuous Ping — Track Latency to a Host Over Time",
    frTitle: "Ping Continu — Suivre la Latence vers un Hôte dans le Temps",
    what: "A single ping only tells you how a connection is doing at one instant — continuous ping keeps sampling a host once per second so you can see whether latency is stable, gradually rising, or spiking intermittently, and how much packet loss builds up over a longer window. This is what you reach for to catch an intermittent problem a one-off ping would miss entirely.",
    frWhat: "Un simple ping ne dit comment se comporte une connexion qu'à un instant donné — le ping continu échantillonne un hôte une fois par seconde, pour voir si la latence est stable, augmente progressivement, ou fait des pics intermittents, et quelle perte de paquets s'accumule sur une fenêtre plus longue. C'est l'outil à utiliser pour repérer un problème intermittent qu'un ping unique manquerait complètement.",
    how: "Enter a host and start the test — the tool times a lightweight request to that host once every second, the same browser-based timing technique the regular Ping Test uses, and keeps a rolling window of the last 60 samples. Note that this measures round-trip time over HTTPS, not raw ICMP ping — a browser has no access to ICMP — so the numbers reflect real reachability and connection latency, just via a slightly different transport than a terminal 'ping' command uses.",
    frHow: "Saisissez un hôte et démarrez le test — l'outil chronomètre une requête légère vers cet hôte une fois par seconde, la même technique de mesure basée navigateur que le Test de Ping classique, et conserve une fenêtre glissante des 60 derniers échantillons. Notez que ceci mesure le temps aller-retour via HTTPS, pas un ping ICMP brut — un navigateur n'a pas accès à l'ICMP — donc les chiffres reflètent l'accessibilité et la latence réelles, via un transport légèrement différent de celui qu'utilise une commande 'ping' de terminal.",
    faq: [
      { q: "Why isn't this a real MTR (My Traceroute)?", a: "A true MTR combines traceroute and ping to show loss and latency at every hop along the path, which requires sending raw ICMP packets — something browsers are sandboxed from doing entirely. This tool gives you the ping half (continuous latency + loss to the final destination) using what a browser can actually access." },
      { q: "Why does packet loss show up even for sites that are clearly online?", a: "A 'timeout' here just means the timed request didn't complete quickly — this can happen from browser tab throttling in the background, temporary network hiccups on your own connection, or the target blocking rapid repeated requests, not only from the destination being down." },
      { q: "Does stopping the test lose my data?", a: "No — when you stop, a summary (average latency and loss percentage) is saved to your local history, so you can compare runs over time even though the live sample window itself resets on the next start." },
      { q: "Why does latency sometimes spike right when I start?", a: "The very first sample includes the time to establish a fresh HTTPS connection (DNS lookup, TLS handshake), which is naturally slower than the repeat requests that follow and reuse that connection — this is normal and not a sign of a problem." },
    ],
    frFaq: [
      { q: "Pourquoi ce n'est pas un vrai MTR (My Traceroute) ?", a: "Un vrai MTR combine traceroute et ping pour montrer la perte et la latence à chaque saut du trajet, ce qui nécessite d'envoyer des paquets ICMP bruts — chose dont les navigateurs sont entièrement sandboxés. Cet outil vous donne la moitié « ping » (latence et perte continues vers la destination finale) avec ce à quoi un navigateur peut réellement accéder." },
      { q: "Pourquoi de la perte de paquets apparaît-elle même pour des sites clairement en ligne ?", a: "Un « délai dépassé » ici signifie simplement que la requête chronométrée ne s'est pas terminée rapidement — cela peut venir du ralentissement d'un onglet en arrière-plan, de petits accrocs temporaires sur votre propre connexion, ou du blocage par la cible de requêtes répétées rapides, pas uniquement d'une destination hors service." },
      { q: "Arrêter le test fait-il perdre mes données ?", a: "Non — en vous arrêtant, un résumé (latence moyenne et pourcentage de perte) est enregistré dans votre historique local, ce qui permet de comparer les sessions dans le temps même si la fenêtre d'échantillons en direct se réinitialise au prochain démarrage." },
      { q: "Pourquoi la latence fait-elle parfois un pic juste au démarrage ?", a: "Le tout premier échantillon inclut le temps d'établir une nouvelle connexion HTTPS (résolution DNS, poignée de main TLS), naturellement plus lent que les requêtes suivantes qui réutilisent cette connexion — c'est normal et ne signale pas un problème." },
    ],
  },

}
