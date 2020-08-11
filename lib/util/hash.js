'use strict'
const crypto = require('crypto')
const fs = require('fs')
const stringify = require('stable-stringify')

module.exports = {
  file (file) {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha1')
      fs.createReadStream(file)
        .on('data', data => hash.update(data))
        .on('error', cause => reject(Object.assign(`Couldnt hash file: ${file}`, { file, code: 'MHASHERR', cause })))
        .on('close', () => resolve(hash.digest('hex')))
    })
  },
  object (obj) {
    const hash = crypto.createHash('sha1')
    hash.update(stringify(obj))
    return hash.digest('hex')
  }
}
