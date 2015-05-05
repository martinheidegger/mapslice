var pow2roundup = require("./pow2roundup"),
    getPowerTwo = require("./getPowerTwo");

module.exports = function calculateLevelData(imageWidth, imageHeight, options) {


    var width = options.minWidth,
        height = options.minHeight,
        tileAmount = pow2roundup(
            Math.max(
                Math.ceil(width/options.tileSize),
                Math.ceil(height/options.tileSize)
            )
        ),
        zoomLevels = [],
        extImageWidth = imageWidth << 1,
        extImageHeight = imageHeight << 1,
        zoomLevel = getPowerTwo(tileAmount);

    while(width <= imageWidth && height <= imageHeight) {
        var tiles = [],
            xStart = Math.round(width/2) - (tileAmount/2)*options.tileSize,
            yStart = Math.round(height/2) - (tileAmount/2)*options.tileSize;

        for(var yCount=0, y=yStart; yCount < tileAmount; ++yCount, y+=options.tileSize) {
            var xTiles = [];
            tiles[yCount] = xTiles;
            for(var xCount=0, x=xStart; xCount < tileAmount; ++xCount, x+=options.tileSize) {
                xTiles.push({
                    x: x,
                    y: y
                })
            }
        }

        zoomLevels.push({
            scale: width/imageWidth,
            width: width,
            height: height,
            x: -xStart,
            y: -yStart,
            size: options.tileSize*tileAmount,
            tiles: tiles,
            level: zoomLevel
        });

        width = width << 1;
        height = height << 1;
        tileAmount = tileAmount << 1;
        zoomLevel++;
    }

    return zoomLevels;
};