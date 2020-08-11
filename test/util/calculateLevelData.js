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
        xIndex: 0,
        yIndex: 0,
        x: 0,
        y: 0,
        width: 500,
        height: 500,
        zoomLevel: 0
      }
    ]
  }])
  t.end()
})

test('image 1000x1000, scaled to min-width of 400 with 250 tiles', t => {
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
      { x: 0, y: 0, xIndex: 0, yIndex: 0, width: 250, height: 250, zoomLevel: 1 },
      { x: 250, y: 0, xIndex: 1, yIndex: 0, width: 250, height: 250, zoomLevel: 1 },
      { x: 0, y: 250, xIndex: 0, yIndex: 1, width: 250, height: 250, zoomLevel: 1 },
      { x: 250, y: 250, xIndex: 1, yIndex: 1, width: 250, height: 250, zoomLevel: 1 }
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
      { x: 0, y: 0, xIndex: 0, yIndex: 0, width: 250, height: 250, zoomLevel: 2 },
      { x: 250, y: 0, xIndex: 1, yIndex: 0, width: 250, height: 250, zoomLevel: 2 },
      { x: 500, y: 0, xIndex: 2, yIndex: 0, width: 250, height: 250, zoomLevel: 2 },
      { x: 750, y: 0, xIndex: 3, yIndex: 0, width: 250, height: 250, zoomLevel: 2 },
      { x: 0, y: 250, xIndex: 0, yIndex: 1, width: 250, height: 250, zoomLevel: 2 },
      { x: 250, y: 250, xIndex: 1, yIndex: 1, width: 250, height: 250, zoomLevel: 2 },
      { x: 500, y: 250, xIndex: 2, yIndex: 1, width: 250, height: 250, zoomLevel: 2 },
      { x: 750, y: 250, xIndex: 3, yIndex: 1, width: 250, height: 250, zoomLevel: 2 },
      { x: 0, y: 500, xIndex: 0, yIndex: 2, width: 250, height: 250, zoomLevel: 2 },
      { x: 250, y: 500, xIndex: 1, yIndex: 2, width: 250, height: 250, zoomLevel: 2 },
      { x: 500, y: 500, xIndex: 2, yIndex: 2, width: 250, height: 250, zoomLevel: 2 },
      { x: 750, y: 500, xIndex: 3, yIndex: 2, width: 250, height: 250, zoomLevel: 2 },
      { x: 0, y: 750, xIndex: 0, yIndex: 3, width: 250, height: 250, zoomLevel: 2 },
      { x: 250, y: 750, xIndex: 1, yIndex: 3, width: 250, height: 250, zoomLevel: 2 },
      { x: 500, y: 750, xIndex: 2, yIndex: 3, width: 250, height: 250, zoomLevel: 2 },
      { x: 750, y: 750, xIndex: 3, yIndex: 3, width: 250, height: 250, zoomLevel: 2 }
    ]
  }])
  t.end()
})

test('800x3000 on 500 tile-size with min width 400, skipping empty tiles, left and right and top and bottom', t => {
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
      { x: 500, y: 0, xIndex: 1, yIndex: 0, width: 500, height: 500, zoomLevel: 2 },
      { x: 1000, y: 0, xIndex: 2, yIndex: 0, width: 500, height: 500, zoomLevel: 2 },
      { x: 500, y: 500, xIndex: 1, yIndex: 1, width: 500, height: 500, zoomLevel: 2 },
      { x: 1000, y: 500, xIndex: 2, yIndex: 1, width: 500, height: 500, zoomLevel: 2 },
      { x: 500, y: 1000, xIndex: 1, yIndex: 2, width: 500, height: 500, zoomLevel: 2 },
      { x: 1000, y: 1000, xIndex: 2, yIndex: 2, width: 500, height: 500, zoomLevel: 2 },
      { x: 500, y: 1500, xIndex: 1, yIndex: 3, width: 500, height: 500, zoomLevel: 2 },
      { x: 1000, y: 1500, xIndex: 2, yIndex: 3, width: 500, height: 500, zoomLevel: 2 }
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
      { x: 1500, y: 500, xIndex: 3, yIndex: 1, width: 500, height: 500, zoomLevel: 3 },
      { x: 2000, y: 500, xIndex: 4, yIndex: 1, width: 500, height: 500, zoomLevel: 3 },
      { x: 1500, y: 1000, xIndex: 3, yIndex: 2, width: 500, height: 500, zoomLevel: 3 },
      { x: 2000, y: 1000, xIndex: 4, yIndex: 2, width: 500, height: 500, zoomLevel: 3 },
      { x: 1500, y: 1500, xIndex: 3, yIndex: 3, width: 500, height: 500, zoomLevel: 3 },
      { x: 2000, y: 1500, xIndex: 4, yIndex: 3, width: 500, height: 500, zoomLevel: 3 },
      { x: 1500, y: 2000, xIndex: 3, yIndex: 4, width: 500, height: 500, zoomLevel: 3 },
      { x: 2000, y: 2000, xIndex: 4, yIndex: 4, width: 500, height: 500, zoomLevel: 3 },
      { x: 1500, y: 2500, xIndex: 3, yIndex: 5, width: 500, height: 500, zoomLevel: 3 },
      { x: 2000, y: 2500, xIndex: 4, yIndex: 5, width: 500, height: 500, zoomLevel: 3 },
      { x: 1500, y: 3000, xIndex: 3, yIndex: 6, width: 500, height: 500, zoomLevel: 3 },
      { x: 2000, y: 3000, xIndex: 4, yIndex: 6, width: 500, height: 500, zoomLevel: 3 }
    ]
  }])
  t.end()
})

test('500x500 on 250 tiles ', t => {
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
      { x: 0, y: 0, xIndex: 0, yIndex: 0, width: 250, height: 250, zoomLevel: 1 },
      { x: 250, y: 0, xIndex: 1, yIndex: 0, width: 250, height: 250, zoomLevel: 1 },
      { x: 0, y: 250, xIndex: 0, yIndex: 1, width: 250, height: 250, zoomLevel: 1 },
      { x: 250, y: 250, xIndex: 1, yIndex: 1, width: 250, height: 250, zoomLevel: 1 }
    ]
  }])
  t.end()
})
