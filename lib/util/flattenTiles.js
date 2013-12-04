module.exports = function flattenTiles(level) {
    var tiles = [];
    var yTiles = level.tiles;
    for(var yCount=0; yCount<yTiles.length; ++yCount) {
        var xTiles = yTiles[yCount];
        for(var xCount=0; xCount<xTiles.length; ++xCount) {
            tiles.push({
                x: xCount,
                y: yCount,
                tile: xTiles[xCount]
            });
        }
    }
    return tiles;
};