const CACHE_NAME = 'isft244-feria-v1';

// Lista de archivos que se descargarán por completo al cargar el QR por primera vez
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  './1nia1.jpg',
  './2nia1.webp',
  './3nia1.webp',
  './4nr1.jpg',
  './5nr1.jpg',
  './1nr2.jpg',
  './2nr2.jpg',
  './3nr2.jpg',
  './4nia2.png',
  './5nia2.png'
];

// Instalación: Guarda todo en el almacenamiento del celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Descargando recursos para uso Offline...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activación: Limpia cachés antiguos si los hubiera
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepción de peticiones: Prioriza buscar en la caché, si no hay red, funciona igual
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
