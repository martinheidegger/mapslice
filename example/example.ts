/* eslint no-multi-spaces: "off" */
// ↓ Replace the next line with:
// ↓ const MapSlicer = require('mapslice')
import MapSlicer, { IMapSlicerOptions, IZoomLevel, IImageMagickCompatible } from '..'
import gm = require('gm')
import AbortController from 'abort-controller'

const controller = new AbortController()

// The parameters passed here are equal to the command-line parameters
const opts: IMapSlicerOptions = {
  file: `myImage.jpg`,
  output: `/myImage/{z}/{y}/{x}.png`,
  tileSize: 512,
  imageMagick: true,
  background: '#00000000',
  tmp: './temp',
  parallelLimit: 3,
  minWidth: 200,
  skipEmptyTiles: true,
  bitdepth: 15,
  dither: true,
  colors: 3423,
  gm: gm as undefined as IImageMagickCompatible,
  signal: controller.signal
}
const mapSlicer = new MapSlicer(opts)
mapSlicer.on('progress', (precentage: number, totalTasks: number, executedTasks: number, previousResult?: string) => {})
mapSlicer.on('start', (files: number, options: IMapSlicerOptions) => {})
mapSlicer.on('warning', (err: Error) => {})
mapSlicer.on('levels', (levels: IZoomLevel[]) => {})
mapSlicer.on('inputSize', (width: number, height: number) => {})
const a: (opts?: IMapSlicerOptions) => Promise<void> = mapSlicer.start
