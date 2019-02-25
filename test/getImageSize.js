'use strict'
const test = require('tap').test
const getImageSize = require('../lib/getImageSize')
const path = require('path')

test('retreiving image size', t => {
  getImageSize(require('gm'), path.join(__dirname, '..', 'example', 'japan.jpg'), (err, imageSize) => {
    t.equals(err, null)
    t.deepEquals(imageSize, {
      width: 1035,
      height: 777
    })
    t.end()
  })
})

test('retreiving svg size', t => {
  getImageSize(require('gm'), path.join(__dirname, '..', 'example', 'tibet.svg'), (err, imageSize) => {
    t.equals(err, null)
    t.deepEquals(imageSize, {
      width: 2304,
      height: 1440
    })
    t.end()
  })
})

test('fs error pass through', t => {
  getImageSize(require('gm'), path.join(__dirname, '..', 'example', 'japan.jpg_'), (err) => {
    t.equals(err.code, 'ENOTFOUND')
    t.end()
  })
})

test('gm error pass through', t => {
  getImageSize(require('gm'), __filename, err => {
    t.equals(err.code, 'MMAPIDENT')
    t.end()
  })
})
