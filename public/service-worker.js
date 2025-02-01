const SERVICE_WORKER_VERSION = "{GIT_VERSION}";
const STATIC_CACHE_URLS = ["{STATIC_CACHE_URLS}"];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(SERVICE_WORKER_VERSION)
            .then(cache => {
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .catch(reason => console.error("ServiceWorker error:", reason))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(reason => console.error("ServiceWorker error:", reason))
    );
});