'use strict'
const fs = require('fs')

module.exports = function getImageSize (gm, file, cb) {
  fs.access(file, cause => {
    if (cause) {
      return cb(Object.assign(new Error('File not found'), { code: 'ENOTFOUND', file, cause }))
    }
    gm(file).identify((cause, spec) => {
      if (cause) {
        let hint
        if (/.svg$/.test(file)) {
          hint = 'SVG files are poorly supported by graphicsMagics. Maybe convert them to another format first.'
        }
        return cb(Object.assign(new Error('Error while fetching size of file'), { code: 'MMAPIDENT', cause, file, hint }))
      }
      if (!spec.size) {
        return cb(Object.assign(new Error('The size couldnt properly be gathered'), { code: 'MMAPSIZE', cause, file, spec }))
      }
      cb(null, spec.size)
    })
  })
}
