'use strict'
const format = require('string-template')
const path = require('path')

module.exports = function outputResolve (template, z, y, x) {
  return format(template, {
    z: z,
    y: y,
    x: x,
    google: path.join(String(z), String(y), String(x))
  })
}
