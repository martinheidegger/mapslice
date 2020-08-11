'use strict'
const mkdirp = require('mkdirp')
const outputResolve = require('./util/outputResolve')
const path = require('path')

function pos (x) {
  return (x >= 0) ? `+${x}` : x
}
module.exports = async function processTile (options, levelFile, tile) {
  const tileFile = outputResolve(options.output, tile.zoomLevel, tile.yIndex, tile.xIndex)
  const parentDir = path.dirname(tileFile)
  try {
    await mkdirp(parentDir)
  } catch (cause) {
    throw Object.assign(new Error('Can not create parent directory'), { code: 'MPARENTTILE', cause, parentDir })
  }
  const crop = `${tile.width}x${tile.height}${pos(tile.x)}${pos(tile.y)}`
  return await new Promise((resolve, reject) => {
    options.gm(levelFile).out('-crop', crop).write(tileFile, cause => {
      if (cause) {
        return reject(Object.assign(new Error('Can not crop tile'), { code: 'MNOCROP', cause, tileFile }))
      }
      resolve(tileFile)
    })
  })
}
