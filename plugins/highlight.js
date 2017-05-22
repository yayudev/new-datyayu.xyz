import hljs from 'highlight.js/lib/highlight'
import SUPPORTED_HIGHLIGHT_LANGUAGES from '../config/highlight-languages.js'

// Register the supported languages.
SUPPORTED_HIGHLIGHT_LANGUAGES.forEach((langName) => {
  const langModule = require(`highlight.js/lib/languages/${langName}`)
  hljs.registerLanguage(langName, langModule)
})

export default hljs
