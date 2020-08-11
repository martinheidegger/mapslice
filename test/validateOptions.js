'use strict'
const test = require('tap').test
const validateOptions = require('../lib/validateOptions')

test('no options', t => {
  const res = validateOptions()
  t.deepEquals(res.error.code, 'MVALNOOPT')
  t.end()
})
test('empty options', t => {
  const res = validateOptions({})
  t.deepEquals(res.error.code, 'MVALSCHEMA')
  t.end()
})
test('tileSize power', t => {
  const res = validateOptions({ file: 'a', tileSize: 3 })
  t.deepEquals(res.error.code, 'MVALTILE')
  t.end()
})
test('default output', t => {
  const res = validateOptions({ file: 'a', tileSize: 8 })
  t.deepEquals(res.value, {
    file: 'a',
    tileSize: 8,
    tmp: '.tmp',
    parallelLimit: 5,
    background: '#FFFFFFFF',
    imageMagick: false,
    skipEmptyTiles: false,
    output: 'a/{google}.jpg',
    gm: require('gm')
  })
  t.end()
})

test('overriding outputFolder', t => {
  const res = validateOptions({ file: './tmp/a', tileSize: 8, outputFolder: 'x' })
  t.deepEquals(res.value.output, 'tmp/x/{google}.jpg')
  t.end()
})

test('overriding output', t => {
  const res = validateOptions({ file: './tmp/a', tileSize: 8, output: '{google}.xxx' })
  t.deepEquals(res.value.output, '{google}.xxx')
  t.end()
})

test('overriding gm', t => {
  const gm = () => {}
  const res = validateOptions({ file: './tmp/a', tileSize: 8, gm })
  t.deepEquals(res.value.gm, gm)
  t.end()
})
