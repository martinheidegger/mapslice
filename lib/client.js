'use strict'
const path = require('path')
const AbortController = require('abort-controller')
const MapSlicer = require('./MapSlicer')
const gradient = '█▉▊▋▌▍▎▏ '
const gradientSize = gradient.length - 1

function renderBar (barSize, percent) {
  const bars = percent * barSize
  return (Array.apply(null, Array(barSize))).map((_, bar) => {
    return gradient[(Math.min(Math.max((bar + 1) - bars, 0), 1) * gradientSize) | 0]
  }).join('')
}

module.exports = function client (options) {
  const mapSlicer = new MapSlicer(options)
  mapSlicer.on('start', (files, options) => {
    console.info(`Single Tile Size: ${options.tileSize}x${options.tileSize}px`)
    console.info(`Files to process: ${files}`)
  })

  mapSlicer.on('levels', levels => {
    for (const level of levels) {
      console.info(`Level #${level.level}: ${level.size}x${level.size}, ${level.width}x${level.height}`)
    }
  })

  mapSlicer.on('inputSize', (width, height) => {
    console.log(`Input File: ${options.file}`)
    console.info(`Input Size: ${width}x${height}`)
  })

  function writeError (err) {
    return `${err}\n---\n${Object.keys(err).filter(key => err[key]).map(key => `${key}: ${err[key]}`).join('\n')}`
  }

  mapSlicer.on('warning', err => {
    process.stdout.write('\n')
    console.warn(writeError(err))
  })

  mapSlicer.on('progress', (progress, total, current, file) => {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(`Progress: ${renderBar(22, progress)}▏${Math.round(progress * 100)}% ▏${current}/${total} ▏${file ? path.relative('.', file) : ''}`)
  })

  mapSlicer.on('end', () => {
    process.stdout.write('\n')
    console.info('Finished processing slices.')
  })

  const controller = new AbortController()
  process.once('SIGINT', () => controller.abort())

  mapSlicer.start({ signal: controller.signal })
    .catch(err => {
      process.stdout.write('\n')
      console.error(writeError(err))
      process.exit(1)
    })
}
