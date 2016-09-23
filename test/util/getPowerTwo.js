var test = require('tap').test
var getPowerTwo = require('../../lib/util/getPowerTwo')

var num = 1
for (var i = 0; i < 12; i++) {
  (function (i, num) {
    test('getPowerTwo should return ' + i + ' for ' + num, function (t) {
      t.equals(getPowerTwo(num), i)
      t.end()
    })
  })(i, num)
  num *= 2
}
