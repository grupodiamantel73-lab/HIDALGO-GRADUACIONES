// public/sw.js — Nailea Omni Push Service Worker

const CACHE_NAME = 'nailea-v4';
const urlsToCache = [
  '/',
  '/index.html',
  // Note: /index.tsx is usually not cached directly by SW if it's part of a build output like /assets/index-XXXX.js
  // For a Vite-like setup, you'd cache the built JS/CSS files.
  // For simplicity and to match user's explicit request, including it as is.
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/notification-sound.mp3' // Add notification sound to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Nailea] ServiceWorker: Almacenando en caché los recursos estáticos.');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('[Nailea] ServiceWorker: Falló la caché durante la instalación:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No match in cache - fetch from network
        return fetch(event.request);
      })
      .catch(error => {
        console.error('[Nailea] ServiceWorker: Falló la solicitud de red o caché:', error);
        // Fallback for offline usage if request fails
        return new Response('<h1>Offline</h1>', {
          headers: { 'Content-Type': 'text/html' }
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Nailea] ServiceWorker: Limpiando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
          return null; // Keep current cache
        })
      );
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Nailea Omni', body: 'Tienes un mensaje.', icon: '/icon-192.png', url: self.location.origin };

  const options = {
    body: data.body,
    icon: data.icon,
    badge: '/icon-192.png', // Small icon for notification bar on some OS
    vibrate: [200, 100, 200],
    sound: '/notification-sound.mp3', // Custom notification sound
    data: {
      url: data.url || self.location.origin // URL to open when notification is clicked
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

// Listener to handle messages from the client (e.g., for test notifications)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'DISPLAY_NOTIFICATION') {
    const { title, body, icon, url } = event.data.payload;
    const options = {
      body: body,
      icon: icon,
      badge: icon,
      vibrate: [200, 100, 200],
      sound: '/notification-sound.mp3',
      data: {
        url: url
      }
    };
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  }
});