/*
** CONFIG
*/
const CACHE_VERSION = 1.2
const CACHE_NAME = `datyayu-xyz-v${CACHE_VERSION}`
const CACHED_ASSETS = [
  '/',
  '/_nuxt/style.css',
  '/_nuxt/vendor.bundle.js',
  '/_nuxt/nuxt.bundle.js',
  '/_nuxt/0.nuxt.bundle.js',
  '/_nuxt/1.nuxt.bundle.js',
  '/_nuxt/2.nuxt.bundle.js',
  '/_nuxt/3.nuxt.bundle.js',
  '/_nuxt/4.nuxt.bundle.js',
  '/_nuxt/5.nuxt.bundle.js',
  '/_nuxt/6.nuxt.bundle.js',
  '/_nuxt/7.nuxt.bundle.js',
  '/_nuxt/8.nuxt.bundle.js',
  '/_nuxt/9.nuxt.bundle.js',
  '/_nuxt/10.nuxt.bundle.js',
  '/_nuxt/11.nuxt.bundle.js',
  '/_nuxt/12.nuxt.bundle.js',
  '/_nuxt/13.nuxt.bundle.js',
  '/_nuxt/14.nuxt.bundle.js'
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
