# mapslice - Image crop & slice tool

mapslice is a tool to cut images into slices of various zoom levels for use in interactive maps.

Javascript tools for high-performant viewing of huge images are plenty available, yet cropping and slicing images can be a pain with the given tools.
mapslice automatically detects which tile-sizes your input-material supports and creates all possible tiles to be used by a common javascript map tool
like [polymaps](http://polymaps.org/), [kartograph](http://kartograph.org/) or [PanoJS](http://www.dimin.net/software/panojs/).

## Installation

via npm:

```bash
$ npm install mapslice
```

## Command line

After installing the latest [node](http://nodejs.org/), you can use mapslice as a command-line tool by installing it with:

```console
$ npm install mapslice -g
```

Also make sure that you have [GraphicsMagick](http://www.graphicsmagick.org/README.html) or [ImageMagick](http://www.imagemagick.org/script/binary-releases.php) installed and available in your command-line!

Once the prerequisites are given, run mapslice using:

```console
$ mapslice -f test.jpg
```

For more documentation run mapslice without arguments:

```console
$ mapslice
```


## Script usage

```JavaScript
var mapslice = require("mapslice");

// The parameters passed here are equal to the command-line parameters
var mapSlicer = mapslice({
    file: "myImage.jpg",               // (required) Huge image to slice
    output: "myImage/{z}/{y}/{x}.png", // Output file pattern
    tileSize: 512,                     // (default: 256) Tile-size to be used
    imageMagick: true,                 // (default: false) If (true) then use ImageMagick instead of GraphicsMagick
    background: "#0000000",            // (default: '#FFFFFFFF') Background color to be used for the tiles. More: http://ow.ly/rsluD
    tmp: "./temp",                     // (default: '.tmp') Temporary directory to be used to store helper files
    parallelLimit: 3,                  // (default: 5) Maximum parallel tasks to be run at the same time (warning: processes can consume a lot of memory!)
    minWidth: 200,                     // See explanation about Size detection below
    skipEmptyTiles: true               // Skips all the empty tiles
});

mapSlicer.on("start", function(files, options) {
    console.info("Starting to process "+files+" files.");
});

mapSlicer.on("error", function(err) {
    console.error(err);
});

mapSlicer.on("progress", function(progress, total, current, file) {
    console.info("Progress: "+Math.round(progress*100)+"%");
});

mapSlicer.on("end", function() {
    console.info("Finished processing slices.");
});

mapSlicer.start();
```

## Size detection and scaling

To render the image in its fullest glory, mapslice assumes that you want to preserve the original image-quality and chooses input-size as its starting point from which the quality should be reduced. However: If you have a fixed-size map-user-interface then you might want the smallest image quality to fit this user-interface-design in order to assure that its is beautifully visible. To produce tiles that fit this needs you can use the "minWidth" or "minHeight" property which fits the map to have its lowest size matching exactly your required size:

```console
$ mapslice -f test.jpg -w=1000
```

Will fit the smallest size to be exactly 1000 pixels wide and zoom up from there.

## Image formats

mapslice relies on [gd](https://github.com/mikesmullin/node-gd) for image processing. gd detect the file format for reading **and** writing using the passed-in file extension.

### Note

To speed up performance mapslice stores a prescaled version of the each zoom-level in a temorary folder and then just crops off of that. These temporary files can become quite big as they are stored with low compression and high quality in sgi files.

## License

MIT



