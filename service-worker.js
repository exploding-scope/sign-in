self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('static-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
        '/manifest.json',
        '/icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        const clonedResponse = response.clone();
        const headers = new Headers(clonedResponse.headers);
        headers.set('Cache-Control', 'max-age=3600');
        return new Response(clonedResponse.body, { headers });
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        const clonedResponse = response.clone();
        const headers = new Headers(clonedResponse.headers);
        headers.set('X-Content-Type-Options', 'nosniff');
        return new Response(clonedResponse.body, { headers });
      });
    })
  );
});
