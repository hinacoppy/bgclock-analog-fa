/* serviceWorker.js */
'use strict';

const CACHE_NAME = "bgclock-analog-fa-v1";
const ORIGIN = (location.hostname == 'localhost') ? '' : location.protocol + '//' + location.hostname;

const STATIC_FILES = [
  ORIGIN + '/bgclock-analog-fa/',
  ORIGIN + '/bgclock-analog-fa/index.html',
  ORIGIN + '/bgclock-analog-fa/manifest.json',
  ORIGIN + '/bgclock-analog-fa/icon/favicon.ico',
  ORIGIN + '/bgclock-analog-fa/icon/apple-touch-icon.png',
  ORIGIN + '/bgclock-analog-fa/icon/android-chrome-96x96.png',
  ORIGIN + '/bgclock-analog-fa/icon/android-chrome-192x192.png',
  ORIGIN + '/bgclock-analog-fa/icon/android-chrome-512x512.png',
  ORIGIN + '/bgclock-analog-fa/css/bgclock-analog.css',
  ORIGIN + '/bgclock-analog-fa/css/fontawesome.all.min.css',
  ORIGIN + '/bgclock-analog-fa/css/font-awesome-animation.min.css',
  ORIGIN + '/bgclock-analog-fa/css/theme_cool.css',
  ORIGIN + '/bgclock-analog-fa/css/theme_mono.css',
  ORIGIN + '/bgclock-analog-fa/css/theme_warm.css',
  ORIGIN + '/bgclock-analog-fa/js/bgclock-analog.js',
  ORIGIN + '/bgclock-analog-fa/js/theme_color.js',
  ORIGIN + '/bgclock-analog-fa/js/start_serviceWorker.js',
  ORIGIN + '/bgclock-analog-fa/js/jquery-3.4.1.min.js',
  ORIGIN + '/bgclock-analog-fa/sounds/decision1.mp3',
  ORIGIN + '/bgclock-analog-fa/sounds/decision7.mp3',
  ORIGIN + '/bgclock-analog-fa/sounds/warning2.mp3',
  ORIGIN + '/bgclock-analog-fa/webfonts/fa-solid-900.woff2'
];

const CACHE_KEYS = [
  CACHE_NAME
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_FILES.map(url => {
          return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' })).then(response => {
            return cache.put(url, response);
          });
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return !CACHE_KEYS.includes(key);
        }).map(key => {
          return caches.delete(key);
        })
      );
    })
  );
});

