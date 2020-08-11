const test = require('tap').test
const MapSlicer = require('../lib/MapSlicer')

test('any instantiation should work', function (t) {
  const n = new MapSlicer({
    outputFolder: '.',
    file: '.'
  })
  t.notEquals(n, null)
  t.end()
})

test('function instantiation minWidth/minHeight', function (t) {
  const n = new MapSlicer({
    output: '.',
    file: '.',
    minWidth: 1000,
    minHeight: 1000
  })
  t.notEquals(n, null)
  t.end()
})

test('missing options will result in error', async t => {
  const n = new MapSlicer({
  })
  await t.rejects(n.start(), {
    code: 'MVALSCHEMA',
    message: '"file" is required'
  })
})

test('run mapslicer while already running will fail', async t => {
  const n = new MapSlicer({
    file: './non-existent'
  })
  const p = n.start()
  await t.rejects(n.start(), { code: 'ERUNNING' })
  await t.rejects(p, { code: 'ENOTFOUND' })
})

test('Adding test that options are combined from both the constructor and on start', async t => {
  const n = new MapSlicer({
    file: './non-existent'
  })
  await t.rejects(n.start({
    output: 1234
  }), { code: 'MVALSCHEMA' })
})
