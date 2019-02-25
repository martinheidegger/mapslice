'use strict'
module.exports = function isPowerOfTwo (x) {
  if (x < 1) {
    return false
  }
  return (x & (x - 1)) === 0
}
