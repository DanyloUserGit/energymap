const CACHE_NAME = "mapbox-tiles-v1";
const TILE_URL_PATTERN = /^https:\/\/api\.mapbox\.com\/.*\/tiles\/.*$/;

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  if (TILE_URL_PATTERN.test(url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return cachedResponse;

        const fetchResponse = await fetch(event.request);
        if (fetchResponse.status === 200) {
          cache.put(event.request, fetchResponse.clone());
        }
        return fetchResponse;
      })
    );
  }
});
