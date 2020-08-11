'use strict'
const test = require('tap').test
const hash = require('../../lib/util/hash')
const pairs = [
  ['a', '7b3ce68b6c2f7d67dae4210eeb83be69f978e2a8'],
  [{ a: 1, b: 2 }, '4acc71e0547112eb432f0a36fb1924c4a738cb49'],
  [{ b: 2, a: 1 }, '4acc71e0547112eb432f0a36fb1924c4a738cb49']
]
const path = require('path')

for (const [input, expectedHash] of pairs) {
  test(`hash.object should return ${expectedHash} for ${input}`, t => {
    t.equals(hash.object(input), expectedHash)
    t.end()
  })
}

const file = path.join(__dirname, '..', '..', 'example', 'japan.jpg')
const expectedFileHash = '290db76df023bb4195becd225080a7daf23bb52e'

test(`hash.file should return ${expectedFileHash} for ${file}`, async t => {
  const fileHash = await hash.file(file)
  t.equals(fileHash, expectedFileHash)
})
