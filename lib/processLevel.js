var mkdirp = require('mkdirp')
var path = require('path')

module.exports = function processLevel (options, level, levelFile) {
  return function (next) {
    mkdirp(path.dirname(levelFile), function (err) {
      if (err) return next(err)
      var drawCommand = 'image Over ' + level.x + ',' + level.y + ' ' + level.width + ',' + level.height + ' \'' + options.file + '\''
      var image = options.gm(level.size, level.size, options.background).draw(drawCommand)
      if (options.hasOwnProperty('bitdepth') && typeof options.bitdepth === 'number') {
        image.bitdepth(options.bitdepth)
      }
      if (options.hasOwnProperty('dither') && typeof options.dither === 'boolean') {
        image.dither(options.dither)
      }
      if (options.hasOwnProperty('colors') && typeof options.colors === 'number') {
        image.colors(options.colors)
      }
      image.write(levelFile, function (err, result) {
        next(err, levelFile)
      })
    })
  }
}
