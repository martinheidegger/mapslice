'use strict'
const path = require('path')
const { EventEmitter } = require('events')
const pMap = require('p-map')
const hash = require('./util/hash')
const calculateLevelData = require('./util/calculateLevelData')
const calculateZoomLevel = require('./util/calculateZoomLevel')
const processLevel = require('./processLevel')
const processTile = require('./processTile')
const validateOptions = require('./validateOptions')
const getImageSize = require('./getImageSize')
const maybeAbort = require('./util/maybeAbort')

function collectTasks (levels, fileHash, options) {
  const serialTasks = []
  const optionsHash = hash.object({
    fileHash,
    // Only relevant options for the image process
    minWidth: options.minWidth,
    minHeight: options.minHeight,
    background: options.background,
    tileSize: options.tileSize
  })
  for (const level of levels) {
    const levelFile = path.join(options.tmp, `${optionsHash}_${level.level}.sgi`)
    serialTasks.push([() => processLevel(options, level, levelFile)])
    serialTasks.push(level.tiles.map(tile => () => processTile(options, levelFile, tile)))
  }
  return serialTasks
}

class MapSlicer extends EventEmitter {
  constructor (options) {
    super()
    this._running = false

    this.options = options
  }

  async start (options) {
    const res = validateOptions({ ...this.options, ...options })
    if (res.error) {
      throw res.error
    }
    if (this._running === true) {
      throw Object.assign(new Error('Already running'), { code: 'ERUNNING' })
    }
    try {
      this._running = true

      options = res.value

      const imageSize = await getImageSize(options.gm, options.file, options.signal)
      this.emit('inputSize', imageSize.width, imageSize.height)

      const fileHash = await hash.file(options.file)
      maybeAbort(options.signal)

      options = calculateZoomLevel(imageSize.width, imageSize.height, options)
      const levels = calculateLevelData(imageSize.width, imageSize.height, options)
      this.emit('levels', levels)

      const serialTasks = collectTasks(levels, fileHash, options)
      const totalTasks = serialTasks.reduce((total, parallelTasks) => total + parallelTasks.length, 0)
      this.emit('start', totalTasks, options)

      let executedTasks = 0
      this.emit('progress', 0, totalTasks, executedTasks)

      for (const parallelTasks of serialTasks) {
        await pMap(parallelTasks, async task => {
          maybeAbort(options.signal)
          let result
          try {
            result = await task()
          } catch (error) {
            maybeAbort(options.signal)
            this.emit('warning', error)
          }
          executedTasks++
          this.emit('progress', executedTasks / totalTasks, totalTasks, executedTasks, result)
        }, { concurrency: options.concurrency })
      }
    } finally {
      this._running = false
    }
  }
}

module.exports = MapSlicer
