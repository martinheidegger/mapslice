var mkdirp = require("mkdirp"),
    outputResolve = require("./util/outputResolve"),
    path = require("path");

function pos(x) {
    return (x >= 0) ? "+"+x : x;
}
module.exports = function processTile(options, level, levelFile, tile) {
    return function processTile_executor(next) {
        var tileFile = outputResolve(options.output, level.level, tile.y, tile.x);
        mkdirp(path.dirname(tileFile), function processTile_mkdipProcessed(err) {
            if(err) return next(err);

            var crop = options.tileSize+"x"+options.tileSize+pos(tile.x*options.tileSize)+pos(tile.y*options.tileSize);
            options.gm(levelFile).out("-crop", crop).write(tileFile, function(err) {
                next(err, tileFile);
            });
        });
    }  
}