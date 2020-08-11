'use strict'
const mkdirp = require('mkdirp')
const path = require('path')
const maybeAbort = require('./util/maybeAbort')
const abortDisposers = require('./util/abortDisposers')

module.exports = async function processLevel (options, level, levelFile) {
  const parentDir = path.dirname(levelFile)
  try {
    await mkdirp(parentDir)
  } catch (cause) {
    throw Object.assign(new Error('Can not create parent directory'), { code: 'MPARENTLEVEL', cause, parentDir })
  }
  maybeAbort(options.signal)
  const drawCommand = `image Over ${level.x},${level.y} ${level.width},${level.height} '${options.file}'`
  const image = options.gm(level.size, level.size, options.background).options({ disposers: abortDisposers(options.signal) }).draw(drawCommand)
  if (typeof options.bitdepth === 'number') {
    image.bitdepth(options.bitdepth)
  }
  if (typeof options.dither === 'boolean') {
    image.dither(options.dither)
  }
  if (typeof options.colors === 'number') {
    image.colors(options.colors)
  }
  return await new Promise((resolve, reject) => {
    image.write(levelFile, cause => {
      if (cause) {
        return reject(Object.assign('Cant create level file', { code: 'MPROCLEV', cause, levelFile }))
      }
      resolve(levelFile)
    })
  })
}
