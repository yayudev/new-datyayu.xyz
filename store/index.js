// Promise polyfill for ie
if (process.BROWSER_BUILD && !window.Promise) {
  const PromisePolyfill = require("promise-polyfill")
  window.Promise = PromisePolyfill
}
