// ── public/sw.js ──────────────────────────────────────────────
// Service Worker tsotra ho an'ny CHRONOS — cache-first ho an'ny
// static assets, network-first ho an'ny pages (mba tsy hisy
// stale content rehefa misy fanavaozana).

const CACHE_NAME = "chronos-v1";
const OFFLINE_URL = "/";

// Assets tokony ho cached mialoha (app shell)
const PRECACHE_URLS = [
  "/",
  "/manifest.json",
];

// ── Install: precache ny app shell ──
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => {}) // tsy manakana ny install raha misy 404 amin'ny assets sasany
  );
  self.skipWaiting();
});

// ── Activate: fafao ny cache taloha ──
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch strategy ──
// - Navigation (HTML pages): network-first, fallback cache, fallback "/"
// - Static assets (JS/CSS/images/fonts): cache-first, fallback network
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Aza mikasika ny requests tsy GET (POST, etc.)
  if (request.method !== "GET") return;

  // Aza mikasika ny cross-origin requests (API ivelany, fonts CDN, sns)
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigation requests (page loads) — network-first
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  // Static assets — cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          // Aza cachena ny responses diso (404, 500, sns)
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => cached);
    })
  );
});
