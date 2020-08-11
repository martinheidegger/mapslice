'use strict'
const joi = require('joi')
const def = require('./defaultSettings')
const { AbortSignal } = require('abort-controller')

module.exports = joi.object({
  tileSize: joi.number().integer().min(1).default(def.tileSize).description('Has to be a power of 2'),
  tmp: joi.string().default(def.tmp).description('Temp folder to store images'),
  parallelLimit: joi.number().integer().min(1).default(def.parallelLimit).description('Amount of parallel tasks that are run'),
  background: joi.string().default(def.background).description('Color to be used outside of the image'),
  imageMagick: joi.boolean().default(def.imageMagick).description('If (true) then use ImageMagick instead of GraphicsMagick'),
  output: joi.string(),
  outputFolder: joi.string(),
  gm: joi.func(),
  file: joi.string().required(),
  minWidth: joi.number().integer(),
  minHeight: joi.number().integer(),
  skipEmptyTiles: joi.boolean().default(false).description('Ignore empty tiles'),
  signal: joi.object().instance(AbortSignal)
}).unknown()
