var test = require('tap').test
var isPowerOfTwo = require('../../lib/util/isPowerOfTwo')

var powers = [1]
var num = 1
for (var i = 1; i < 20; ++i) {
  powers.push(num *= 2)
}

test('isPowerOfTwo should match values that are power of two', function (t) {
  powers.forEach(function (valid) {
    t.equals(isPowerOfTwo(valid), true)
  })
  t.end()
})
test('isPowerOfTwo should not match values that are not power of two', function (t) {
  for (var i = 0; i < 10000; ++i) {
    if (powers.indexOf(i) === -1) {
      t.equals(isPowerOfTwo(i), false)
    }
  }
  t.end()
})
