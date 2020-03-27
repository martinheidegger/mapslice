'use strict'
const crypto = require('crypto')
const fs = require('fs')
const stringify = require('stable-stringify')

module.exports = {
  file (file, cb) {
    const hash = crypto.createHash('sha1')
    let error = null
    fs.createReadStream(file)
      .on('data', data => hash.update(data))
      .on('error', cause => (error = Object.assign('Couldnt hash file', { code: 'MHASHERR', cause })))
      .on('close', () => cb(error, hash.digest('hex')))
  },
  object (obj) {
    const hash = crypto.createHash('sha1')
    hash.update(stringify(obj))
    return hash.digest('hex')
  }
}
