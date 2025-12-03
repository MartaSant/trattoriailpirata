// Service Worker per IL PIRATA
// Versione cache: pirata-v1

const CACHE_NAME = 'pirata-v1';

// Determina il percorso base dal scope del service worker
const BASE_PATH = '/Trattoriailpirata';

// File essenziali da mettere in cache all'installazione
// Solo file critici per evitare errori durante l'installazione
const PRECACHE_FILES = [
    BASE_PATH + '/',
    BASE_PATH + '/home.html',
    BASE_PATH + '/style.css',
    BASE_PATH + '/manifest.json',
    BASE_PATH + '/piratadef.png'
];

// Install Event - Precaching
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installazione...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('[Service Worker] Precaching file...');
            // Precaching con gestione errori individuale per ogni file
            return Promise.allSettled(
                PRECACHE_FILES.map(function(url) {
                    return fetch(new Request(url, { cache: 'reload' }))
                        .then(function(response) {
                            if (response.ok) {
                                return cache.put(url, response);
                            } else {
                                console.warn('[Service Worker] File non trovato:', url);
                                return Promise.resolve();
                            }
                        })
                        .catch(function(error) {
                            console.warn('[Service Worker] Errore precaching file:', url, error);
                            return Promise.resolve(); // Continua anche se un file fallisce
                        });
                })
            ).then(function() {
                console.log('[Service Worker] Precaching completato');
                return self.skipWaiting();
            });
        }).catch(function(error) {
            console.error('[Service Worker] Errore durante il precaching:', error);
            // Anche se il precaching fallisce, attiva comunque il service worker
            return self.skipWaiting();
        })
    );
});

// Activate Event - Pulizia cache vecchie
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Attivazione...');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Rimozione cache vecchia:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            console.log('[Service Worker] Attivazione completata');
            return self.clients.claim();
        })
    );
});

// Fetch Event - Strategia Network First
self.addEventListener('fetch', function(event) {
    // Ignora richieste non GET
    if (event.request.method !== 'GET') {
        return;
    }
    
    const url = new URL(event.request.url);
    
    // Ignora richieste a domini esterni (tranne CDN necessari)
    if (url.origin !== location.origin && 
        !url.href.includes('fonts.googleapis.com') &&
        !url.href.includes('fonts.gstatic.com') &&
        !url.href.includes('cdnjs.cloudflare.com')) {
        return;
    }
    
    // Strategia Network First per HTML
    const acceptHeader = event.request.headers.get('accept');
    if (acceptHeader && acceptHeader.includes('text/html')) {
        event.respondWith(
            fetch(event.request, { cache: 'no-store' })
                .then(function(response) {
                    // Clona la risposta per poterla usare e cachare
                    if (response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return response;
                })
                .catch(function() {
                    // Se la rete fallisce, prova a servire dalla cache
                    return caches.match(event.request);
                })
        );
    }
    // Strategia Network First per altri asset (immagini, CSS, JS, font)
    else {
        event.respondWith(
            fetch(event.request)
                .then(function(response) {
                    // Se la risposta è valida, cachala e servila
                    if (response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return response;
                })
                .catch(function() {
                    // Se la rete fallisce, prova a servire dalla cache
                    return caches.match(event.request);
                })
        );
    }
});

// Messaggio per notificare aggiornamenti
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

