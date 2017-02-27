const NUMBER_OF_PAGES_TO_RENDER = 10
const NUMBER_OF_POSTS_TO_RENDER = 50


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | Arturo Coronel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:image', content: 'https://s3-us-west-1.amazonaws.com/datyayu-xyz/bg.jpg' },
      { property: 'og:site_name', content: 'datyayu.xyz' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image:alt', content: 'datyayu.xyz logo' },
      { name: 'twitter:site', content: '@datyayu' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=3' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Abel|Open+Sans' }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: `{
          "@context": "http://schema.org/",
          "@type": "Person",
          "name": "Arturo Coronel",
          "additionalName": "Yayu",
          "jobTitle": "Frontend developer",
          "telephone": "(664) 3476016 ",
          "url": "https//datyayu.xyz/"
        }`
      }
    ],
    __dangerouslyDisableSanitizers: [ 'script' ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#20c0b1' },
  /*
  ** Vue Plugins
  */
  plugins: [
    '~plugins/google-analytics',
    '~plugins/vue-i18n'
  ],
  /*
  ** Vue Router
  */
  router: {
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }

      const $header = document.querySelector('.header')
      if ($header) {
        $header.scrollIntoView()
      }

      return { x: 0, y: 0 }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, { isClient }) {
      if (isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KO
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(webm|mp4)$/,
        loader: 'file-loader'
      }
    ]
  },
  /*
  ** Server rendering cache config
  */
  cache: {
    max: 100,
    maxAge: 900000
  },
  /*
  ** Static build config
  */
  generate: {
    routeParams: {
      '/blog/page/:id': Array.from(Array(NUMBER_OF_PAGES_TO_RENDER))
        .map((e, i) => i + 1),

      '/blog/posts/:id': Array.from(Array(NUMBER_OF_POSTS_TO_RENDER))
        .map((e, i) => i + 1),
    }
  }
}
