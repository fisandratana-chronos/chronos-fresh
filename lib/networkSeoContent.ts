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

export interface NetworkSeoEntry {
  title: string
  frTitle: string
  what: string
  frWhat: string
  how: string
  frHow: string
  formula?: { expr: string; note: string }
  frFormula?: { expr: string; note: string }
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

}
