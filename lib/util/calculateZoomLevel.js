'use strict'
module.exports = function calculateZoomLevel (inputWidth, inputHeight, options) {
  if (options.minWidth || options.minHeight) {
    if (!options.minWidth) {
      options.minWidth = Math.ceil(inputWidth / inputHeight * options.minHeight)
    } else if (!options.minHeight) {
      options.minHeight = Math.ceil(inputHeight / inputWidth * options.minWidth)
    }
  } else {
    const minSize = ((options.zoomMin || 0) + 1) * options.tileSize
    let width = inputWidth
    let height = inputHeight

    while (width > minSize || height > minSize) {
      width = width >> 1
      height = height >> 1
    }
    options.minWidth = width
    options.minHeight = height
  }
  return options
}
