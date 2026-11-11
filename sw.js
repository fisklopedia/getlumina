/* ============================================================
 * Lumina PWA — Service Worker v1.0
 * Host di GitHub Pages: https://{user}.github.io/{repo}/sw.js
 * ============================================================
 *
 * Strategi caching:
 * 1. App shell (index.html, manifest, icons) → cache-first
 * 2. Apps Script iframe content → network-first, fallback cache
 * 3. CDN libraries (Chart.js, jsPDF, dll) → stale-while-revalidate
 * ============================================================ */

const CACHE_NAME = 'lumina-pwa-v3';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-32.png',
  './icon-120.png',
  './icon-152.png',
  './icon-167.png',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './maskable-192.png',
  './maskable-512.png',
  './icon.svg',
  './favicon.ico',
  './og-image.png',
  // Google Fonts
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  // CDN libraries yang dipakai Apps Script iframe
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://unpkg.com/html5-qrcode'
];

// ===========================================================================
// INSTALL — cache app shell
// ===========================================================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        APP_SHELL.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[Lumina SW] Failed to cache:', url, err.message);
          })
        )
      );
    }).then(() => {
      console.log('[Lumina SW] App shell cached');
      return self.skipWaiting();
    })
  );
});

// ===========================================================================
// ACTIVATE — cleanup cache lama
// ===========================================================================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[Lumina SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => {
      console.log('[Lumina SW] Activated');
      return self.clients.claim();
    })
  );
});

// ===========================================================================
// FETCH — strategi per jenis request
// ===========================================================================
self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Strategi 1: App shell (same-origin GitHub Pages) → cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // Strategi 2: Apps Script iframe → network-first, fallback cache
  if (url.hostname === 'script.google.com' && url.pathname.indexOf('/macros/') !== -1) {
    event.respondWith(networkFirstWithCache(req));
    return;
  }

  // Strategi 3: CDN libraries → stale-while-revalidate
  if (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com' ||
    url.hostname === 'cdn.jsdelivr.net' ||
    url.hostname === 'cdnjs.cloudflare.com' ||
    url.hostname === 'unpkg.com'
  ) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }
});

// ===========================================================================
// STRATEGY: cache-first (untuk app shell)
// ===========================================================================
async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (err) {
    if (req.mode === 'navigate') {
      return caches.match('./index.html');
    }
    throw err;
  }
}

// ===========================================================================
// STRATEGY: network-first (untuk Apps Script iframe)
// ===========================================================================
async function networkFirstWithCache(req) {
  try {
    const fresh = await fetch(req);
    if (fresh && (fresh.status === 200 || fresh.type === 'opaque')) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (err) {
    const cached = await caches.match(req);
    if (cached) {
      console.log('[Lumina SW] Offline — serving cached Apps Script response');
      return cached;
    }
    if (req.mode === 'navigate') {
      return caches.match('./index.html');
    }
    throw err;
  }
}

// ===========================================================================
// STRATEGY: stale-while-revalidate (untuk CDN)
// ===========================================================================
async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req)
    .then((fresh) => {
      if (fresh && fresh.status === 200) {
        cache.put(req, fresh.clone());
      }
      return fresh;
    })
    .catch(() => cached);
  return cached || fetchPromise;
}

// ===========================================================================
// MESSAGE — handle update dari client
// ===========================================================================
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ===========================================================================
// PERIODIC SYNC (optional — refresh cache tiap 24 jam)
// ===========================================================================
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'refresh-content') {
    event.waitUntil(refreshCache());
  }
});

async function refreshCache() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.all(
    APP_SHELL.map(async (url) => {
      try {
        const fresh = await fetch(url);
        if (fresh && fresh.status === 200) {
          await cache.put(url, fresh.clone());
        }
      } catch (err) {
        // Skip kalau gagal
      }
    })
  );
  console.log('[Lumina SW] Cache refreshed');
}
