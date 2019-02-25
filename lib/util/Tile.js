'use strict'
class Tile {
  constructor (x, y, tileX, tileY) {
    this.x = x
    this.y = y
    this.tile = {
      x: tileX,
      y: tileY
    }
  }
}
module.exports = Tile
