/* ======================================================
   WaLink – Service Worker (sw.js)
   Caches index.html, styles.css, app.js, icons for offline
   ====================================================== */

const CACHE = 'walink-v2';
const PRECACHE = ['/', '/index.html', '/assets/css/styles.css', '/assets/js/app.js', '/assets/icons/icon.png', '/assets/icons/icon-192.png', '/assets/icons/icon-512.png', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});
