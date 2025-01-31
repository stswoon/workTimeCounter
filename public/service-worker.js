const SERVICE_WORKER_VERSION = "v1"; //TODO: replace by build number

//TODO: fill by vite
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/static/js/bundle.js',
    '/static/js/webpack.bundle.js',
    '/favicon.ico',
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(SERVICE_WORKER_VERSION)
            .then(cache => {
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .catch(reason => console.error(reason))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(reason => console.error(reason))
    );
});