'use strict'
const test = require('tap').test
const outputResolve = require('../../lib/util/outputResolve')
const path = require('path')

const x = 1
const y = 2
const z = 3
const tests = {
  'in {x} between': `in ${x} between`,
  '{y} at the beginning': `${y} at the beginning`,
  'at the end {z}': `at the end ${z}`,
  'all of them: {x} {y} {z}': `all of them: ${x} ${y} ${z}`
}

for (const key in tests) {
  test(`File resolving should apply templates. For example "${key}" should return "${tests[key]}"`, t => {
    t.equals(outputResolve(key, z, y, x), tests[key])
    t.end()
  })
}

test('Special patterns should include the `google` pattern', function (t) {
  t.equals(outputResolve('{google}', 1, 2, 3), path.join('1', '2', '3'))
  t.end()
})
