/*
** CONFIG
*/
const CACHE_VERSION = '1.7.2'
const CACHE_NAME = `datyayu-xyz-v${CACHE_VERSION}`
const CACHED_ASSETS = [
  /* [PLACEHOLDER_FOR_FILES] */
]

function clearPreviousCaches (keys) {
  const deletedCachesPromises = keys.map(key => {
    if (key !== CACHE_NAME) {
      return caches.delete(key)
    }
  })

  return Promise.all(deletedCachesPromises)
}

/*
** INSTALL SW
*/
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => clearPreviousCaches(keys))
      .then(_ => caches.open(CACHE_NAME))
      .then(cache => cache.addAll(CACHED_ASSETS))
      .then(_ => self.skipWaiting())
  )
})

/*
** ACTIVATE SW
*/
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

/*
** INTERCEPT REQUESTS
*/
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp ||
        // If not in cache, request it over the network and add it to current cache
        fetch(event.request).then(response => {
          const isChromeExtension = event.request.url.startsWith('chrome-extension')

          if (!isChromeExtension) {
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, response.clone()))
          }

          return response.clone()
        })
      )
  )
})
