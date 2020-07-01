'use strict'
const mkdirp = require('mkdirp')
const path = require('path')

module.exports = function processLevel (options, level, levelFile, cb) {
  const parentDir = path.dirname(levelFile)
  mkdirp(parentDir).then(
    () => {
      const drawCommand = `image Over ${level.x},${level.y} ${level.width},${level.height} '${options.file}'`
      const image = options.gm(level.size, level.size, options.background).draw(drawCommand)
      if (typeof options.bitdepth === 'number') {
        image.bitdepth(options.bitdepth)
      }
      if (typeof options.dither === 'boolean') {
        image.dither(options.dither)
      }
      if (typeof options.colors === 'number') {
        image.colors(options.colors)
      }
      image.write(levelFile, cause => {
        if (cause) {
          return cb(Object.assign('Cant create level file', { code: 'MPROCLEV', cause, levelFile }))
        }
        cb(null, levelFile)
      })
    },
    (cause) => cb(Object.assign(new Error('Can not create parent directory'), { code: 'MPARENTLEVEL', cause, parentDir }))
  )
}
