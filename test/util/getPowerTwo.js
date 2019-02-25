'use strict'
const test = require('tap').test
const getPowerTwo = require('../../lib/util/getPowerTwo')

let num = 1
for (var i = 0; i < 12; i++) {
  (function (i, num) {
    test(`getPowerTwo should return ${i} for ${num}`, t => {
      t.equals(getPowerTwo(num), i)
      t.end()
    })
  })(i, num)
  num *= 2
}
