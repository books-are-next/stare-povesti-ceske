/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-fe0531c';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./stare_povesti_ceske_002.html","./stare_povesti_ceske_005.html","./stare_povesti_ceske_006.html","./stare_povesti_ceske_007.html","./stare_povesti_ceske_008.html","./stare_povesti_ceske_009.html","./stare_povesti_ceske_010.html","./stare_povesti_ceske_011.html","./stare_povesti_ceske_012.html","./stare_povesti_ceske_013.html","./stare_povesti_ceske_014.html","./stare_povesti_ceske_015.html","./stare_povesti_ceske_016.html","./stare_povesti_ceske_017.html","./stare_povesti_ceske_018.html","./stare_povesti_ceske_019.html","./stare_povesti_ceske_020.html","./stare_povesti_ceske_021.html","./stare_povesti_ceske_022.html","./stare_povesti_ceske_023.html","./stare_povesti_ceske_024.html","./stare_povesti_ceske_025.html","./stare_povesti_ceske_026.html","./stare_povesti_ceske_027.html","./stare_povesti_ceske_028.html","./stare_povesti_ceske_029.html","./stare_povesti_ceske_030.html","./stare_povesti_ceske_031.html","./stare_povesti_ceske_032.html","./stare_povesti_ceske_033.html","./stare_povesti_ceske_034.html","./stare_povesti_ceske_035.html","./stare_povesti_ceske_036.html","./stare_povesti_ceske_037.html","./stare_povesti_ceske_038.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/obalka_stare_povesti_ceske2.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./template-images/circles.png","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
