/*
** CONFIG
*/
const CACHE_VERSION = '1.4.1'
const CACHE_NAME = `datyayu-xyz-v${CACHE_VERSION}`
const CACHED_ASSETS = [
  /* [PLACEHOLDER_FOR_FILES] */
]


/*
** INSTALL SW
*/
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache
          .addAll(CACHED_ASSETS)
          .then(_ => self.skipWaiting())
      })
  )
})


/*
** ACTIVATE SW
*/
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  )
})
