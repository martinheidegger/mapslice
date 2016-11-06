var mkdirp = require('mkdirp')
var path = require('path')

module.exports = function processLevel (options, level, levelFile) {
  return function (next) {
    mkdirp(path.dirname(levelFile), function (err) {
      if (err) return next(err)
      var drawCommand = 'image Over ' + level.x + ',' + level.y + ' ' + level.width + ',' + level.height + ' \'' + options.file + '\''
      options.gm(level.size, level.size, options.background).draw(drawCommand).write(levelFile, function (err, result) {
        next(err, levelFile)
      })
    })
  }
}
