'use strict'
const settingsSchema = require('./settingsSchema')
const isPowerOfTwo = require('./util/isPowerOfTwo')
const path = require('path')

module.exports = function validateOptions (options) {
  if (typeof options !== 'object') {
    return {
      error: Object.assign(new Error('Options not an object.'), { code: 'MVALNOOPT' })
    }
  }
  const valid = settingsSchema.validate(options)
  if (valid.error) {
    return {
      error: Object.assign(new Error(`Configuration error: ${valid.error.message}`), { code: 'MVALSCHEMA', cause: valid.error })
    }
  }
  options = valid.value

  if (!isPowerOfTwo(options.tileSize)) {
    return {
      error: Object.assign(new Error('TileSize is not power of 2 like: 128, 256, etc.'), { code: 'MVALTILE' })
    }
  }

  if (options.outputFolder) {
    if (options.output) {
      return {
        error: Object.assign(new Error('Both outputFolder and output are defined. Please define only one.'), { code: 'MVALOUTMIS' })
      }
    }
    options.output = path.join(path.dirname(options.file), options.outputFolder, '{google}.jpg')
  } else if (!options.output) {
    options.output = path.join(path.dirname(options.file), path.basename(options.file, path.extname(options.file)), '{google}.jpg')
  }

  if (!options.gm) {
    if (options.imageMagick) {
      options.gm = require('gm').subClass({ imageMagick: true })
    } else {
      options.gm = require('gm') // gm might be replaced to use imagemagick or graphicsMagick
    }
  }
  return {
    value: options
  }
}
