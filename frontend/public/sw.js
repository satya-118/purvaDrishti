// PurvaDrishti Service Worker - Offline Support
const CACHE_NAME = 'purvadrishti-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Network first, falling back to cache
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && !event.request.url.includes('api')) {
    return;
  }

  // Handle API POST requests (like reports)
  if (event.request.method === 'POST' && event.request.url.includes('/api/reports')) {
    event.respondWith(
      fetch(event.request.clone()).catch(async (error) => {
        // Here we could implement background sync via IndexedDB for real ServiceWorkers,
        // but since we handled localStorage buffering in FieldReportPage directly,
        // we'll just fail gracefully here.
        return new Response(JSON.stringify({ success: false, error: 'Offline', offlineQueued: true }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Handle all other requests
  event.respondWith(
    fetch(event.request).then(response => {
      // Check if we received a valid response
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      // Clone the response
      const responseToCache = response.clone();

      caches.open(CACHE_NAME)
        .then(cache => {
          cache.put(event.request, responseToCache);
        });

      return response;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});

