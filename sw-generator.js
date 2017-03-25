const path = require('path')
const fs = require('fs')

/** File Paths */
const swTemplateFile = path.resolve(__dirname, 'sw-template.js')
const nuxtDir = path.resolve(__dirname, '.nuxt', 'dist')
const imagesDir = path.resolve(nuxtDir, 'img')
const swDestinationPath = path.resolve(__dirname, 'static', 'sw.js')

/** Get generated file names */
const bundles = fs.readdirSync(nuxtDir)
  .filter(x => x.match(/.js$/))
  .map(x => x.replace(/^/, `'/_nuxt/`).replace(/$/, `'`))
const images = fs.readdirSync(imagesDir)
  .map(x => x.replace(/^/, `'/_nuxt/img/`).replace(/$/, `'`))

/** List files to cache */
const files = [
  `'/'`,
  ...bundles,
  ...images
]

/** Add files to template */
const template = fs.readFileSync(swTemplateFile, 'utf-8')
const updatedTemplate = template.replace(`/* [PLACEHOLDER_FOR_FILES] */`, files.toString())

fs.writeFileSync(swDestinationPath, updatedTemplate, { encoding: 'utf-8' })

console.log('[SW Generator] SW Created succesfully')
