'use strict'
const test = require('tap').test
const isPowerOfTwo = require('../../lib/util/isPowerOfTwo')

const powers = [1]
let num = 1
for (let i = 1; i < 20; ++i) {
  powers.push(num *= 2)
}

test('isPowerOfTwo should match values that are power of two', t => {
  powers.forEach(function (valid) {
    t.equals(isPowerOfTwo(valid), true)
  })
  t.end()
})
test('isPowerOfTwo should not match values that are not power of two', t => {
  for (let i = 0; i < 10000; ++i) {
    if (powers.indexOf(i) === -1) {
      t.equals(isPowerOfTwo(i), false)
    }
  }
  t.end()
})
