Hotfixes:

- Update dependencies
- Update domain to .dev

# [1.7.0 - Service Worker Improvement](https://github.com/datyayu/new-datyayu.xyz/tree/1.7.0)

# Improvements

- Added cache invalidation on service worker ([06f7f44](https://github.com/datyayu/new-datyayu.xyz/commit/06f7f44))
- Added on-every-request caching to service worker ([06f7f44](https://github.com/datyayu/new-datyayu.xyz/commit/06f7f44))

# Bug fixes

- Fixed text on no-posts page not being i18n'd ([a932f3f](https://github.com/datyayu/new-datyayu.xyz/commit/a932f3f))
- Fixed blog-api requests errors not being handled properly (was pretty broken when offline) ([fb591f9](https://github.com/datyayu/new-datyayu.xyz/commit/fb591f9))

# [1.6.0 - Mobile Fixes](https://github.com/datyayu/new-datyayu.xyz/tree/1.6.0)

### New features

- Home random message now is rewritten dinamically ([8c3ba10](https://github.com/datyayu/new-datyayu.xyz/commit/8c3ba10))

### Improvements

- Sidenav now can be closed when clicking on overlay ([49b794c](https://github.com/datyayu/new-datyayu.xyz/commit/49b794c))
- Project previews now only show iframe on desktop+ and defaults to image gallery on mobile ([5326586](https://github.com/datyayu/new-datyayu.xyz/commit/5326586))
- Added close button to projects preview ([5326586](https://github.com/datyayu/new-datyayu.xyz/commit/5326586))
- Added close button to experiments preview ([a5a5522](https://github.com/datyayu/new-datyayu.xyz/commit/a5a5522))

### Bugfixes

- Fixed error on page transition with script tag / json+ld content ([fe9d7c5](https://github.com/datyayu/new-datyayu.xyz/commit/fe9d7c5))
- Error page now has `Error | Arturo Coronel` as title instead of `undefined | Arturo Coronel` ([627e80f](https://github.com/datyayu/new-datyayu.xyz/commit/627e80f))
- Fixed home layout on mobile devices ([a131713](https://github.com/datyayu/new-datyayu.xyz/commit/a131713))
- Fixed color on experiments nav link (was red, changed to purple) ([2e97694](https://github.com/datyayu/new-datyayu.xyz/commit/2e97694))
- Fixed home bg video not playing on mobile browsers ([ad13045](https://github.com/datyayu/new-datyayu.xyz/commit/ad13045))
- Fixed links on about page ([4f7e76d](https://github.com/datyayu/new-datyayu.xyz/commit/4f7e76d))

### Content updates

- Updated about page. ([4f7e76d](https://github.com/datyayu/new-datyayu.xyz/commit/4f7e76d))
- Updated home messages. ([372a696](https://github.com/datyayu/new-datyayu.xyz/commit/372a696))
- Added site's github link to the footer ([1956049](https://github.com/datyayu/new-datyayu.xyz/commit/1956049))

# [1.5.0 - Quickfixes and updates](https://github.com/datyayu/new-datyayu.xyz/tree/1.5.0)

### New features

- Service worker is now generated dinamically on the build process ([05b9674](https://github.com/datyayu/new-datyayu.xyz/commit/05b9674))

### Improvements

- Updated proyects info layout ([5b4e337](https://github.com/datyayu/new-datyayu.xyz/commit/5b4e337))
- Update to nuxt 0.10 (which includes support for gzip) ([05b9674](https://github.com/datyayu/new-datyayu.xyz/commit/05b9674))

### Bugfixes

- Fixed error on sw at generated files ([b4e45c5](https://github.com/datyayu/new-datyayu.xyz/commit/b4e45c5))
- Fixed http iframes not displaying due to security issues ([e630048](https://github.com/datyayu/new-datyayu.xyz/commit/e630048))
- Fixed build warnings ([05b9674](https://github.com/datyayu/new-datyayu.xyz/commit/05b9674))
- Removed `console.log` on experiments page ([7fb2fe6](https://github.com/datyayu/new-datyayu.xyz/commit/7fb2fe6))

### Content updates

- Added music visualizer experiment ([05b9674](https://github.com/datyayu/new-datyayu.xyz/commit/05b9674))

# [1.4.0 - In-page improvements](https://github.com/datyayu/new-datyayu.xyz/tree/1.4.0)

### New features

- Added experiments preview modal ([098045e](https://github.com/datyayu/new-datyayu.xyz/commit/098045e))
- Added projects preview modal (
  [51132e6](https://github.com/datyayu/new-datyayu.xyz/commit/51132e6),
  [c255535](https://github.com/datyayu/new-datyayu.xyz/commit/c255535),
  [05da614](https://github.com/datyayu/new-datyayu.xyz/commit/05da614),
  [7eaac64](https://github.com/datyayu/new-datyayu.xyz/commit/7eaac64),
  [0d15bc0](https://github.com/datyayu/new-datyayu.xyz/commit/0d15bc0)
  )
- Added projects image gallery ([7d62cfc](https://github.com/datyayu/new-datyayu.xyz/commit/7d62cfc))

### Improvements

- Added image to about page. ([9f7d7fe](https://github.com/datyayu/new-datyayu.xyz/commit/9f7d7fe))

### Bugfixes

- Fixed home navigation being rendered outside the triangle on desktop 4:3 resolutions ([7de4c7e](https://github.com/datyayu/new-datyayu.xyz/commit/7de4c7e))

# [1.3.0 - Cross-browser support](https://github.com/datyayu/new-datyayu.xyz/tree/1.3.0)

### Improvements

- Added Promise polyfill for IE. ([78a4560](https://github.com/datyayu/new-datyayu.xyz/commit/78a4560))
- Reduced highlight.js bundle size ([78a4560](https://github.com/datyayu/new-datyayu.xyz/commit/78a4560))
- Added mp4 source bg for home ([9fc1f93](https://github.com/datyayu/new-datyayu.xyz/commit/9fc1f93))

### Bugfixes

- Fixed home layout issues on safari ([09833a7](https://github.com/datyayu/new-datyayu.xyz/commit/09833a7))
- Fixed home layout issues on ie ([8cac1b3](https://github.com/datyayu/new-datyayu.xyz/commit/8cac1b3))
- Fixed overflow-x being available on Firefox ([9f3b329](https://github.com/datyayu/new-datyayu.xyz/commit/9f3b329))

# [1.2.0 - PWA](https://github.com/datyayu/new-datyayu.xyz/tree/1.2.0)

### New Features

- Added this changelog to keep track of the changes. ([8dd6eb6](https://github.com/datyayu/new-datyayu.xyz/commit/8dd6eb6))
- Added manifest.json. ([538fe4e](https://github.com/datyayu/new-datyayu.xyz/commit/538fe4e))
- Added service worker for offline support. ([d8a6599](https://github.com/datyayu/new-datyayu.xyz/commit/d8a6599))

### Bugfixes

- Fixed post styles like big images and videos overflowing the content. ([c79de46](https://github.com/datyayu/new-datyayu.xyz/commit/c79de46))

# [1.1.0 - SEO Optimization](https://github.com/datyayu/new-datyayu.xyz/tree/1.1.0)

### New Features

- Added Open Graph and Twitter meta tags. ([6aef1bc](https://github.com/datyayu/new-datyayu.xyz/commit/6aef1bc))
- Added title per page. ([7bed93c](https://github.com/datyayu/new-datyayu.xyz/commit/7bed93c))
- Added json+ld schema notation. ([98dd70e](https://github.com/datyayu/new-datyayu.xyz/commit/98dd70e))

### Improvements

- Optimized blog images. (changes stored on S3)

### Content updates

- Added more experiments. ([14695b5](https://github.com/datyayu/new-datyayu.xyz/commit/14695b5))
- Updated about page text. ([3579282](https://github.com/datyayu/new-datyayu.xyz/commit/3579282))
- Updated repo README. ([161d4a6](https://github.com/datyayu/new-datyayu.xyz/commit/161d4a6))

# [1.0.0 - Release](https://github.com/datyayu/new-datyayu.xyz/tree/1.0.0)

First production-ready version
