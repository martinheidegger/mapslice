'use strict'
const mkdirp = require('mkdirp')
const outputResolve = require('./util/outputResolve')
const path = require('path')

function pos (x) {
  return (x >= 0) ? `+${x}` : x
}
module.exports = function processTile (options, level, levelFile, tile, cb) {
  const tileFile = outputResolve(options.output, level.level, tile.y, tile.x)
  const parentDir = path.dirname(tileFile)
  mkdirp(parentDir, function (cause) {
    if (cause) {
      return cb(Object.assign(new Error('Can not create parent directory'), { code: 'MPARENTTILE', cause, parentDir }))
    }

    const crop = `${options.tileSize}x${options.tileSize}${pos(tile.x * options.tileSize)}${pos(tile.y * options.tileSize)}`
    options.gm(levelFile).out('-crop', crop).write(tileFile, cause => {
      if (cause) {
        return cb(Object.assign(new Error('Can not crop tile'), { code: 'MNOCROP', cause, tileFile }))
      }
      cb(null, tileFile)
    })
  })
}
