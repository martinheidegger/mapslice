'use strict'
const mkdirp = require('mkdirp')
const path = require('path')

module.exports = function processLevel (options, level, levelFile, cb) {
  const parentDir = path.dirname(levelFile)
  mkdirp(parentDir, cause => {
    if (cause) {
      return cb(Object.assign(new Error('Can not create parent directory'), { code: 'MPARENTLEVEL', cause, parentDir }))
    }
    const drawCommand = `image Over ${level.x},${level.y} ${level.width},${level.height} '${options.file}'`
    const image = options.gm(level.size, level.size, options.background).draw(drawCommand)
    if (options.hasOwnProperty('bitdepth') && typeof options.bitdepth === 'number') {
      image.bitdepth(options.bitdepth)
    }
    if (options.hasOwnProperty('dither') && typeof options.dither === 'boolean') {
      image.dither(options.dither)
    }
    if (options.hasOwnProperty('colors') && typeof options.colors === 'number') {
      image.colors(options.colors)
    }
    image.write(levelFile, cause => {
      if (cause) {
        return cb(Object.assign('Cant create level file', { code: 'MPROCLEV', cause, levelFile }))
      }
      cb(null, levelFile)
    })
  })
}
