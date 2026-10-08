const CACHE_NAME = 'applink-shell-v3';
const SHELL_URL = new URL('./', self.registration.scope).href;
const APP_SHELL = [
  './manifest.webmanifest',
  './app-icon.svg',
  './app-icon-192.png',
  './app-icon-512.png',
  './favicon.svg',
  './town-grid.webp',
  './business-desk.webp',
  './sports-motion.webp',
  './dev-terminal.webp',
];

// Precache the built scripts and styles on the first visit, not just the HTML.
// Otherwise a first offline reload could display HTML with no app code.
async function cachePage(response) {
  if (!response.ok) throw new Error('AppLink shell could not be downloaded.');
  const html = await response.clone().text();
  if (!/<html\b[^>]*\bdata-applink-shell(?:\s|[=>])/i.test(html)) {
    throw new Error('This page is not the AppLink dashboard shell.');
  }
  const assetURLs = [...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => new URL(match[1], SHELL_URL))
    .filter((url) => url.origin === self.location.origin && /\.(?:js|css)$/.test(url.pathname))
    .map((url) => url.href);
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll([...new Set(assetURLs)]);
  await cache.put(SHELL_URL, response);
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(APP_SHELL.map((path) => new URL(path, SHELL_URL).href));
      await cachePage(await fetch(SHELL_URL, { cache: 'reload' }));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key.startsWith('applink-shell-') && key !== CACHE_NAME).map((key) => caches.delete(key))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Never treat future API responses as static offline assets.
  if (!url.pathname.startsWith(new URL(self.registration.scope).pathname) || url.pathname.includes('/api/')) return;

  if (request.mode === 'navigate') {
    const scopePath = new URL(SHELL_URL).pathname;
    if (url.pathname !== scopePath && url.pathname !== `${scopePath}index.html`) return;
    const network = fetch(request);
    event.waitUntil(network.then((response) => cachePage(response.clone())).catch(() => undefined));
    event.respondWith(
      network
        .then(async (response) => response.ok ? response : (await caches.match(SHELL_URL)) ?? response)
        .catch(async () => (await caches.match(SHELL_URL)) ?? Response.error()),
    );
    return;
  }

  if (!['script', 'style', 'image', 'font'].includes(request.destination)) return;
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then(async (response) => {
        if (response.ok) {
          const copy = response.clone();
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, copy);
        }
        return response;
      });
    }),
  );
});