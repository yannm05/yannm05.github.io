// Moving Pixels service worker. The build replaces 07fe0d83dd44, so every new version of the game gets a fresh cache.
const CACHE = 'moving-pixels-07fe0d83dd44';
const FILES = ['./', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
const WAIT_MS = 3000; // how long to wait for the network before using the saved copy

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Game files: try the network first so corrections reach players, and fall back to the saved copy on poor signal.
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  const saved = await cache.match(req) || (req.mode === 'navigate' ? await cache.match('./') : undefined);
  const fromNetwork = fetch(req).then(res => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  if (!saved) return fromNetwork; // first visit: nothing saved yet, so just wait for the network
  fromNetwork.catch(() => {});
  const timer = new Promise(resolve => setTimeout(() => resolve(saved), WAIT_MS));
  return Promise.race([fromNetwork.catch(() => saved), timer]);
}

// Fonts rarely change: use the saved copy if there is one.
async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const saved = await cache.match(req);
  if (saved) return saved;
  const res = await fetch(req);
  cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return; // scores and other submissions always go straight to the network
  const url = new URL(e.request.url);
  if (url.origin === self.location.origin) e.respondWith(networkFirst(e.request));
  else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') e.respondWith(cacheFirst(e.request));
});
