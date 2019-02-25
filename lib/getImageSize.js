'use strict'
const fs = require('fs')

module.exports = function getImageSize (gm, file, cb) {
  fs.access(file, cause => {
    if (cause) {
      return cb(Object.assign(new Error('File not found'), { code: 'ENOTFOUND', file, cause }))
    }
    gm(file).size((cause, inputSpec) => {
      if (cause) {
        return cb(Object.assign(new Error('Error while fetching size of file'), { code: 'MMAPSIZE', cause, file }))
      }
      cb(null, inputSpec)
    })
  })
}
