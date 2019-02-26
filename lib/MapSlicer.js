'use strict'
const path = require('path')
const { EventEmitter } = require('events')
const async = require('async')
const hash = require('./util/hash')
const calculateLevelData = require('./util/calculateLevelData')
const calculateZoomLevel = require('./util/calculateZoomLevel')
const processLevel = require('./processLevel')
const processTile = require('./processTile')
const validateOptions = require('./validateOptions')
const getImageSize = require('./getImageSize')

function parallel (options, tasks, cb) {
  if (options.parallelLimit === 0) {
    return async.parallel(tasks, cb)
  }
  async.parallelLimit(tasks, options.parallelLimit, cb)
}

function collectTasks (levels, fileHash, options) {
  const tasks = []
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
    tasks.push(processLevel.bind(null, options, level, levelFile))
    tasks.push(level.tiles.map(tile => processTile.bind(null, options, level, levelFile, tile)))
  }
  return tasks
}

class MapSlicer extends EventEmitter {
  constructor (options) {
    super()
    this._running = false

    this.options = options

    if (options && options.autoStart === true) {
      this.start(options)
    }
  }

  start (options) {
    if (this._running === true) {
      throw new Error('Already running')
    }
    this._running = true
    setImmediate(() => {
      const res = validateOptions(options || this.options)
      if (res.error) {
        this._running = false
        return this.emit('error', res.error)
      }

      options = res.value

      const startProcess = (inputWidth, inputHeight, fileHash) => {
        options = calculateZoomLevel(inputWidth, inputHeight, options)
        const levels = calculateLevelData(inputWidth, inputHeight, options)
        this.emit('levels', levels)

        const tasks = collectTasks(levels, fileHash, options)
        const totalTasks = tasks.reduce((total, entry) => total + (Array.isArray(entry) ? entry.length : 1), 0)
        this.emit('start', totalTasks, options)

        let executedTasks = 0
        this.emit('progress', 0, totalTasks, executedTasks)

        const wrap = task => {
          return cb => {
            task((error, result) => {
              executedTasks++
              this.emit('progress', executedTasks / totalTasks, totalTasks, executedTasks, result)
              if (error) {
                this.emit('warning', error)
              }
              cb(error, result)
            })
          }
        }

        async.series(tasks.map(entry => {
          if (Array.isArray(entry)) {
            return parallel.bind(null, options, entry.map(wrap))
          }
          return wrap(entry)
        }), () => {
          this._running = false
          this.emit('end')
        })
      }

      getImageSize(options.gm, options.file, (err, inputSpec) => {
        if (err) {
          this._running = false
          return this.emit('error', err)
        }
        this.emit('inputSize', inputSpec.width, inputSpec.height)

        hash.file(options.file, (err, fileHash) => {
          if (err) {
            this._running = false
            return this.emit('error', err)
          }
          startProcess(inputSpec.width, inputSpec.height, fileHash)
        })
      })
    })
  }
}

module.exports = MapSlicer
