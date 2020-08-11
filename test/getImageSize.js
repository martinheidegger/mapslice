'use strict'
const test = require('tap').test
const getImageSize = require('../lib/getImageSize')
const path = require('path')

test('retreiving image size', async t => {
  const imageSize = await getImageSize(require('gm'), path.join(__dirname, '..', 'example', 'japan.jpg'))
  t.deepEquals(imageSize, {
    width: 1035,
    height: 777
  })
})

test('retreiving svg size', async t => {
  const imageSize = await getImageSize(require('gm'), path.join(__dirname, '..', 'example', 'tibet.svg'))
  t.deepEquals(imageSize, {
    width: 2304,
    height: 1440
  })
})

test('fs error pass through', async t => {
  await t.rejects(
    getImageSize(require('gm'), path.join(__dirname, '..', 'example', 'japan.jpg_')),
    { code: 'ENOTFOUND' }
  )
})

test('gm error pass through', async t => {
  await t.rejects(
    getImageSize(require('gm'), __filename),
    { code: 'MMAPIDENT' }
  )
})
