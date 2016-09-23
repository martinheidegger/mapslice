var crypto = require('crypto')

module.exports = function (value) {
  return crypto.createHash('sha1').update(value).digest('hex')
}
