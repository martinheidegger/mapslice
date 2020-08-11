/* eslint no-multi-spaces: "off" */
// ↓ Replace the next line with:
// ↓ const MapSlicer = require('mapslice')
import MapSlicer, { IMapSlicerOptions } from '..'
import gm = require('gm')

// The parameters passed here are equal to the command-line parameters
const opts: IMapSlicerOptions = {
  file: `${__dirname}/myImage.jpg`,
  output: `${__dirname}/myImage/{z}/{y}/{x}.png`,
  tileSize: 512,
  imageMagick: true,
  background: '#00000000',
  tmp: './temp',
  parallelLimit: 3,
  minWidth: 200,
  skipEmptyTiles: true,
  bitdepth: 8,
  dither: true,
  colors: 128,
  gm
}
const mapSlicer = new MapSlicer(opts)

mapSlicer.on('progress', (precentage, totalTasks, executedTasks, previousResult) => {
  precentage + 1
})
mapSlicer.on('start', (files, options) => console.info(`Starting to process ${files} files.`))
mapSlicer.on('warning', err => console.warn(err))
mapSlicer.on('progress', progress => console.info(`Progress: ${Math.round(progress * 100)}%`))
mapSlicer.start().catch(err => console.error(err))
