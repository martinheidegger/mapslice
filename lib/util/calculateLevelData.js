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
            yStart = Math.round(height/2) - (tileAmount/2)*options.tileSize,
            xCountStart = 0,
            yCountStart = 0,
            xCountEnd = tileAmount,
            yCountEnd = tileAmount,
            xOffset = -xStart,
            yOffset = -yStart;
        if(options.skipEmptyTiles){
            xCountStart = Math.floor(-xStart/options.tileSize);
            yCountStart = Math.floor(-yStart/options.tileSize);
            xCountEnd -= xCountStart;
            yCountEnd -= yCountStart;
            xStart+=xCountStart*options.tileSize;
            yStart+=yCountStart*options.tileSize;
        }
        for(var yCount=yCountStart, y=yStart; yCount < yCountEnd; ++yCount, y+=options.tileSize) {
            for(var xCount=xCountStart, x=xStart; xCount < xCountEnd; ++xCount, x+=options.tileSize) {
                tiles.push({
                    x: xCount,
                    y: yCount,
                    tile:{
                        x: x,
                        y: y
                    }
                })
            }
        }
        zoomLevels.push({
            scale: width/imageWidth,
            width: width,
            height: height,
            x: xOffset,
            y: yOffset,
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