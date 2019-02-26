'use strict'
const test = require('tap').test
const calculateLevelData = require('../../lib/util/calculateLevelData')

test('single tile', t => {
  const levels = calculateLevelData(500, 500, {
    minWidth: 500,
    minHeight: 500,
    tileSize: 500
  })
  t.deepEquals(levels, [{
    height: 500,
    width: 500,
    level: 0,
    scale: 1,
    x: 0,
    y: 0,
    size: 500,
    tiles: [
      {
        tile: { x: 0, y: 0 },
        x: 0,
        y: 0
      }
    ]
  }])
  t.end()
})

test('non-full-image', t => {
  const levels = calculateLevelData(1000, 1000, {
    minWidth: 400,
    minHeight: 400,
    tileSize: 250
  })
  t.deepEquals(levels, [{
    width: 400,
    height: 400,
    level: 1,
    size: 500,
    scale: 0.4,
    x: 50,
    y: 50,
    tiles: [
      { tile: { x: -50, y: -50 }, x: 0, y: 0 },
      { tile: { x: 200, y: -50 }, x: 1, y: 0 },
      { tile: { x: -50, y: 200 }, x: 0, y: 1 },
      { tile: { x: 200, y: 200 }, x: 1, y: 1 }
    ]
  }, {
    width: 800,
    height: 800,
    level: 2,
    scale: 0.8,
    x: 100,
    y: 100,
    size: 1000,
    tiles: [
      { tile: { x: -100, y: -100 }, x: 0, y: 0 },
      { tile: { x: 150, y: -100 }, x: 1, y: 0 },
      { tile: { x: 400, y: -100 }, x: 2, y: 0 },
      { tile: { x: 650, y: -100 }, x: 3, y: 0 },
      { tile: { x: -100, y: 150 }, x: 0, y: 1 },
      { tile: { x: 150, y: 150 }, x: 1, y: 1 },
      { tile: { x: 400, y: 150 }, x: 2, y: 1 },
      { tile: { x: 650, y: 150 }, x: 3, y: 1 },
      { tile: { x: -100, y: 400 }, x: 0, y: 2 },
      { tile: { x: 150, y: 400 }, x: 1, y: 2 },
      { tile: { x: 400, y: 400 }, x: 2, y: 2 },
      { tile: { x: 650, y: 400 }, x: 3, y: 2 },
      { tile: { x: -100, y: 650 }, x: 0, y: 3 },
      { tile: { x: 150, y: 650 }, x: 1, y: 3 },
      { tile: { x: 400, y: 650 }, x: 2, y: 3 },
      { tile: { x: 650, y: 650 }, x: 3, y: 3 }
    ]
  }])
  t.end()
})

test('non-full-image', t => {
  const levels = calculateLevelData(800, 3000, {
    minWidth: 400,
    minHeight: 1500,
    tileSize: 500,
    skipEmptyTiles: true
  })
  t.deepEquals(levels, [{
    width: 400,
    height: 1500,
    level: 2,
    size: 2000,
    scale: 0.5,
    x: 800,
    y: 250,
    tiles: [
      { tile: { x: -300, y: -250 }, x: 1, y: 0 },
      { tile: { x: 200, y: -250 }, x: 2, y: 0 },
      { tile: { x: -300, y: 250 }, x: 1, y: 1 },
      { tile: { x: 200, y: 250 }, x: 2, y: 1 },
      { tile: { x: -300, y: 750 }, x: 1, y: 2 },
      { tile: { x: 200, y: 750 }, x: 2, y: 2 },
      { tile: { x: -300, y: 1250 }, x: 1, y: 3 },
      { tile: { x: 200, y: 1250 }, x: 2, y: 3 }
    ]
  }, {
    width: 800,
    height: 3000,
    level: 3,
    scale: 1,
    x: 1600,
    y: 500,
    size: 4000,
    tiles: [
      { tile: { x: -100, y: 0 }, x: 3, y: 1 },
      { tile: { x: 400, y: 0 }, x: 4, y: 1 },
      { tile: { x: -100, y: 500 }, x: 3, y: 2 },
      { tile: { x: 400, y: 500 }, x: 4, y: 2 },
      { tile: { x: -100, y: 1000 }, x: 3, y: 3 },
      { tile: { x: 400, y: 1000 }, x: 4, y: 3 },
      { tile: { x: -100, y: 1500 }, x: 3, y: 4 },
      { tile: { x: 400, y: 1500 }, x: 4, y: 4 },
      { tile: { x: -100, y: 2000 }, x: 3, y: 5 },
      { tile: { x: 400, y: 2000 }, x: 4, y: 5 },
      { tile: { x: -100, y: 2500 }, x: 3, y: 6 },
      { tile: { x: 400, y: 2500 }, x: 4, y: 6 }
    ]
  }])
  t.end()
})

test('non-full-image', t => {
  const levels = calculateLevelData(500, 500, {
    minWidth: 400,
    minHeight: 400,
    tileSize: 250
  })
  t.deepEquals(levels, [{
    height: 400,
    width: 400,
    level: 1,
    scale: 0.8,
    x: 50,
    y: 50,
    size: 500,
    tiles: [
      { tile: { x: -50, y: -50 }, x: 0, y: 0 },
      { tile: { x: 200, y: -50 }, x: 1, y: 0 },
      { tile: { x: -50, y: 200 }, x: 0, y: 1 },
      { tile: { x: 200, y: 200 }, x: 1, y: 1 }
    ]
  }])
  t.end()
})
