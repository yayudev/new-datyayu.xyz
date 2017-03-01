if (process.BROWSER_BUILD) {
  const PromisePolyfill = require('promise-polyfill')

  if (!window.Promise) {
    window.Promise = PromisePolyfill
  }
}
