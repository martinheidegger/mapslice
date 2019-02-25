'use strict'
const test = require('tap').test
const pow2roundup = require('../../lib/util/pow2roundup')

const tests = {
  0: 1,
  1: 1,
  2: 2,
  3: 4,
  4: 4,
  5: 8,
  8: 8,
  9: 16,
  15: 16,
  16: 16,
  17: 32
}
for (const key in tests) {
  test(`Rounding up to the next power of two should result in ${tests[key]} for ${key}`, t => {
    t.equals(pow2roundup(key), tests[key])
    t.end()
  })
}
