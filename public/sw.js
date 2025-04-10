const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/app.js",
    "/assets/icons/logo.webp"                    
]

// Aqui hacemos el precaching para que al momento de instalar el SW, se almacenen en cache los archivos de urlsToCache
self.addEventListener("install", (e) => {
    console.log('service worker installed successfully');
    e.waitUntil(
        // en el cache esta guardando todos los archivos del array de urls.
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    console.log('service worker activated successfully');
});

// Implementamos estrategia cache first.
self.addEventListener("fetch", (e) => {
    console.log('Interceptano la solicitud:',e.request.url)
    e.respondWith(
        fetch(e.request)
        //si encuentra red entra en el then
        .then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
                cache.put(e.request, networkResponse.clone());
                return networkResponse
            })
        })
        //si no encuentra red entra en el catch y devuelve lo que esta en el cache
        .catch(() => caches.match(e.request))    
    );
});

