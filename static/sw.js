/*
** CONFIG
*/
const CACHE_VERSION = '1.4.1'
const CACHE_NAME = `datyayu-xyz-v${CACHE_VERSION}`
const CACHED_ASSETS = [
  '/','/_nuxt/0.nuxt.bundle.47ae2049474f05e792cc.js','/_nuxt/1.nuxt.bundle.1230364774c68a125e07.js','/_nuxt/10.nuxt.bundle.b572407bc6f388a9c782.js','/_nuxt/11.nuxt.bundle.6564d30a1ffd0352936f.js','/_nuxt/12.nuxt.bundle.45ad1c8a2227e0c1c7fe.js','/_nuxt/13.nuxt.bundle.5aaebb376161d4045dc7.js','/_nuxt/14.nuxt.bundle.b73b7bdcfb9b05b47c2a.js','/_nuxt/2.nuxt.bundle.651cba1760eba2bb201b.js','/_nuxt/3.nuxt.bundle.b16d61de7cdbc7cebeee.js','/_nuxt/4.nuxt.bundle.7f6c3a62eec4da04d0d6.js','/_nuxt/5.nuxt.bundle.ab646ed27105cd5e1722.js','/_nuxt/6.nuxt.bundle.0146d079b6cbce7f8c94.js','/_nuxt/7.nuxt.bundle.20ef16f72a59c6748932.js','/_nuxt/8.nuxt.bundle.90df7b5dc33e114fcac4.js','/_nuxt/9.nuxt.bundle.44afb74def5c9654935d.js','/_nuxt/nuxt.bundle.d8d5c17e468e34be53bf.js','/_nuxt/vendor.bundle.01045e72fbd40cce6704.js','/_nuxt/img/avatar.min.92a14a2.jpg','/_nuxt/img/logo.eec4ada.svg'
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
