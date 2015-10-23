var fs = require("fs"),
    path = require("path"),
    events = require("events"),
    async = require("async"),
    mkdirp = require("mkdirp"),
    util = require("util"),
    createHash = require('./util/createHash'),
    calculateLevelData = require("./util/calculateLevelData"),
    calculateZoomLevel = require("./util/calculateZoomLevel"),
    isPowerOfTwo = require("./util/isPowerOfTwo"),
    flattenTiles = require("./util/flattenTiles"),
    processLevel = require("./processLevel"),
    processTile = require("./processTile"),
    settingsSchema = require("./settingsSchema");

/**
 *
 */
function MapSlicer(options) {

    if (!(this instanceof MapSlicer)) {
        return new MapSlicer(options);
    }

    var opts = settingsSchema.validate(options);

    if (opts.error) {
        this.emit("error", opts.error);
        return;
    }

    this.options = opts.value;

    if (options.autoStart) {
        process.nextTick(this.start.bind(this));   
    }
}

util.inherits(MapSlicer, events.EventEmitter);

MapSlicer.prototype.start = function start() {
    var options = this.options;

    if (!options.file) {
        this.emit("error", new Error("Error#5: Target file required."));
        return;
    }

    if (!isPowerOfTwo(options.tileSize)) {
        this.emit("error", new Error("Error#6: TileSize is not power of 2 like: 128, 256, etc."));
        return;
    }

    if (options.outputFolder) {
        if (options.output) {
            this.emit("error", new Error("Error#7: Both outputFolder and output are defined. Please define only one."));
            return;
        }
        options.output = path.join(path.dirname(options.file), options.outputFolder, "{google}.jpg");
    } else if (!options.output) {
        options.output = path.join(path.dirname(options.file), path.basename(options.file, path.extname(options.file)), "{google}.jpg");
    }

    if (!options.gm) {
        if (options.imageMagick) {
            options.gm = require("gm").subClass({ imageMagick: true });
        } else {
            options.gm = require("gm") // gm might be replaced to use imagemagick or graphicsMagick 
        }
    }

    this.setup();
};

MapSlicer.prototype.setup = function MapSlicer_setup() {
    fs.exists(this.options.file, function(exists) {
        if (exists) {
            this.options.gm(this.options.file).size(function(err, inputSpec) {
                if (err) {
                    this.emit("error", new Error("Error#2: Error while fetching size of File: " + this.options.file + "; Error: " + err));
                } else {
                    this.emit("inputSize", inputSpec.width, inputSpec.height);
                    this.startProcess(inputSpec.width, inputSpec.height);
                }
            }.bind(this));
        } else {
            this.emit("error", new Error("Error#1: File not found: "+this.options.file));
        }
    }.bind(this));
};

MapSlicer.prototype.startProcess = function MapSlicer_startProcess(inputWidth, inputHeight) {

    this.options = calculateZoomLevel(inputWidth, inputHeight, this.options);

    var tasks = this.collectTasks(inputWidth, inputHeight);

    this.emit("start", this.totalTasks, this.options);
    this.emit("progress", 0, this.totalTasks, this.executedTasks);
    async.series(tasks, function(err) {
        this.emit("end");
    }.bind(this));
};

MapSlicer.prototype.wrapProgressTask = function MapSlicer_wrapProgressTask(task) {
    this.totalTasks++;
    return function(next) {
        task(function(error, result) {
            this.executedTasks++;
            this.emit("progress", this.executedTasks/this.totalTasks, this.totalTasks, this.executedTasks, result);
            if(error)
                this.emit("error", error);
            next(error, result);
        }.bind(this));
    }.bind(this);
};

MapSlicer.prototype.collectTasks = function MapSlicer_collectTasks(imageWidth, imageHeight) {
    var levels = calculateLevelData(imageWidth, imageHeight, this.options),
        tasks = [],
        patternMd5 = createHash(this.options.output);

    this.emit("levels", levels);

    this.totalTasks = 0;
    this.executedTasks = 0;
    for (var i=0; i<levels.length; ++i) {
        var level = levels[i],
            levelTasks = [],
            tiles = flattenTiles(level),
            levelFile = path.join(this.options.tmp, patternMd5+"_"+level.level+".sgi");

        tasks.push(this.wrapProgressTask(processLevel(this.options, level, levelFile)));
        for(var j=0; j<tiles.length; ++j) {
            var tile = tiles[j];
            levelTasks.push(this.wrapProgressTask(processTile(this.options, level, levelFile, tile)));
        }
        tasks.push(this.makeParallel(levelTasks));
    }
    return tasks;
};

MapSlicer.prototype.makeParallel = function MapSlicer_makeParallel(tasks) {
    return function(next) {
        if(this.options.parallelLimit == 0) {
            async.parallel(tasks, next); 
        } else {
            async.parallelLimit(tasks, this.options.parallelLimit, next);
        }
    }.bind(this);
};

module.exports = MapSlicer;
