var MapSlicer = require("./MapSlicer"),
    path = require("path");

module.exports = function client(options) {
    var mapSlicer = new MapSlicer(options);

    mapSlicer.on("start", function(files, options) {
        console.info("Starting to process "+files+" files.");
        console.info("Single Tile Size: "+options.tileSize+"x"+options.tileSize+"px");
    });

    mapSlicer.on("levels", function(levels) {
        var maxLevel = levels[levels.length-1],
            minLevel = levels[0];

        for(var i=0; i<levels.length; ++i) {
            var level = levels[i];
            console.info("Level #"+level.level+": "+level.size+"x"+level.size+", "+level.width+"x"+level.height);
        }
    });

    mapSlicer.on("inputSize", function(width, height) {
        console.info("Input Size: "+width+"x"+height);
    });

    mapSlicer.on("error", function(err) {
        process.stdout.write("\n");
        console.error(err);
    });

    mapSlicer.on("progress", function(progress, total, current, file) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        var parts = 20,
            result = "Progress: [";
            step = 1/parts;
        for(var i=1/parts; i<1;i+=step) {
            result += (i < progress) ? "#" : " ";
        }
        process.stdout.write(result +"] "+Math.round(progress*100)+"%  - Image "+current+" of "+total+" "+(file?path.relative(".",file):""));
    });

    mapSlicer.on("end", function() {
        process.stdout.write("\n");
        console.info("Finished processing slices.");
    });
};