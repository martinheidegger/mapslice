'use strict'
const pow2roundup = require('./pow2roundup')
const getPowerTwo = require('./getPowerTwo')

module.exports = function calculateLevelData (imageWidth, imageHeight, options) {
  var width = options.minWidth
  var height = options.minHeight
  var tileAmount = pow2roundup(
    Math.max(
      Math.ceil(width / options.tileSize),
      Math.ceil(height / options.tileSize)
    )
  )
  var zoomLevels = []
  var zoomLevel = getPowerTwo(tileAmount)

  while (width <= imageWidth && height <= imageHeight) {
    var tiles = []
    var xStart = Math.round(width / 2) - (tileAmount / 2) * options.tileSize
    var yStart = Math.round(height / 2) - (tileAmount / 2) * options.tileSize
    var xIndexMin = 0
    var yIndexMin = 0
    var xIndexMax = tileAmount
    var yIndexMax = tileAmount
    var xOffset = -xStart
    var yOffset = -yStart
    if (options.skipEmptyTiles) {
      xIndexMin = Math.floor(-xStart / options.tileSize)
      yIndexMin = Math.floor(-yStart / options.tileSize)
      xIndexMax -= xIndexMin
      yIndexMax -= yIndexMin
      xStart += xIndexMin * options.tileSize
      yStart += yIndexMin * options.tileSize
    }
    const tile = {
      zoomLevel,
      width: options.tileSize,
      height: options.tileSize
    }
    for (let yIndex = yIndexMin; yIndex < yIndexMax; ++yIndex) {
      const y = yIndex * tile.height
      for (let xIndex = xIndexMin; xIndex < xIndexMax; ++xIndex) {
        tiles.push({ ...tile, xIndex, yIndex, x: xIndex * tile.width, y })
      }
    }
    zoomLevels.push({
      scale: width / imageWidth,
      width: width,
      height: height,
      x: xOffset,
      y: yOffset,
      size: options.tileSize * tileAmount,
      tiles: tiles,
      level: zoomLevel
    })

    width = width << 1
    height = height << 1
    tileAmount = tileAmount << 1
    zoomLevel++
  }

  return zoomLevels
}
