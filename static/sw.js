/*
** CONFIG
*/
const CACHE_VERSION = 1.3
const CACHE_NAME = `datyayu-xyz-v${CACHE_VERSION}`
const NUMBER_OF_BUNDLES = 15
const CACHED_ASSETS = [
  '/',
  '/_nuxt/style.css',
  '/_nuxt/vendor.bundle.js',
  '/_nuxt/nuxt.bundle.js'
]

/*
** Generate partial bundle names.
*/
const emptyArray = new Array(NUMBER_OF_BUNDLES)
const generatedBundles = emptyArray.map((_, index) => `/_nuxt/${index}.nuxt.bundle.js`)


/*
** INSTALL SW
*/
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache
          .addAll([
            ...CACHED_ASSETS,
            ...generatedBundles
          ])
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
