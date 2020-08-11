/// <reference types="node"/>

import { AbortSignal } from 'abort-controller'

declare namespace MapSlicer {

  interface IImageMagickState {
    bitdepth (bitdepth: number): this
    dither (dither: boolean): this
    colors (colors: number): this
    options (options: { disposers: { emitter: NodeJS.EventEmitter, events: string[] }[]}): this
    draw (drawCommand: string): this
    write (file: string, handler: (error: Error) => any): void
    out(option: string, value: string): this
  }

  interface IImageMagickCompatible {
    (stream: NodeJS.ReadableStream | Buffer | string, image?: string): IImageMagickState
    (width: number, height: number, color?: string): IImageMagickState
  }

  interface IMapSlicerOptions {
    /** Filepath for huge image to slice                                                           */ file: string
    /** Output file pattern                                                                        */ output?: string
    /** Output folder used to generate a pattern, can not be mixed with `output`                   */ outputFolder?: string
    /** Tile-size to be used (default: 256)                                                        */ tileSize?: number
    /** If (true) then use ImageMagick instead of GraphicsMagick (default: false)                  */ imageMagick?: boolean
    /** Background color to be used for the tiles. More: http://ow.ly/rsluD (default: '#FFFFFFFF') */ background?: string
    /** Temporary directory to be used to store helper files (default: '.tmp')                     */ tmp?: string
    /** Maximum parallel tasks to be run at the same time (default: 5)                             */ parallelLimit?: number
    /** Minimum width to be used for size detection: see docs!                                     */ minWidth?: number
    /** Skips all the empty tiles                                                                  */ skipEmptyTiles?: boolean
    /** See http://aheckmann.github.io/gm/docs.html#bitdepth                                       */ bitdepth?: number
    /** See http://aheckmann.github.io/gm/docs.html#dither                                         */ dither?: boolean
    /** See http://aheckmann.github.io/gm/docs.html#colors                                         */ colors?: number
    /** Alternative way to specify the GraphicsMagic library                                       */ gm?: IImageMagickCompatible
    /** Signal to abort the map slicing process                                                    */ signal?: AbortSignal
  }

  interface ITiles {
    /** x-index, starting from 0, used for naming */
    xIndex: number
    /** y-index, starting from 0, used for naming */
    yIndex: number
    /** x-offset in the zoomLevel */
    x: number
    /** y-offset in the zoomLevel */
    y: number
    width: number
    height: number
    zoomLevel: number
  }
  interface IZoomLevel {
    scale: number
    width: number
    height: number
    x: number
    y: number
    /** Size in pixels for this zoom level */
    size: number
    tiles: ITiles[],
    level: number
  }

  /**
   * Emitted when the size of the file was successfully evaluated
   */
  type IInputHandler = (width: number, height: number) => any

  /**
   * Emitted for every progress change
   * 
   * @param percentage 0-1 percent executed
   * @param totalTask number of total files to process
   * @param executedTasks number of files already processed
   * @param previousPath file that was created when progress is sent, the first call will be undefined, as nothing has been processed yet
   */
  type IProgressHandler = (percentage: number, totalTasks: number, executedTasks: number, previousPath: string | undefined) => any

  /**
   * Emitted when all the zoom-levels are calculated, before the start of the process
   */
  type ILevelsHandler = (levels: IZoomLevel[]) => any

  /**
   * Emitted when a part of the process was not properly executed
   */
  type IWarningHandler = (warning: Error) => any

  /**
   * Emitted when all the options are clear and the processing of files is about to start
   * 
   * @param options Options are preprocessed: refined to the actually used options!
   */
  type IStartHandler = (totalTasks: number, options: IMapSlicerOptions) => any

  type Events = 'inputSize' | 'levels' | 'start' | 'progress' | 'warning'
}

declare class MapSlicer {
  constructor (options?: MapSlicer.IMapSlicerOptions)

  /**
   * Starts the mapslicer process
   * 
   * @param options Options for the process, will override any options that are set in the constructor!
   */
  start (options?: MapSlicer.IMapSlicerOptions): Promise<void>

  /** Options as passed to the constructor */
  options?: MapSlicer.IMapSlicerOptions

  eventNames (): string[]
  listenerCount (event: MapSlicer.Events): number
  rawListeners (event: MapSlicer.Events): Function[]
  setMaxListeners (n: number): this
  getMaxListeners (): number
  removeAllListeners (event: MapSlicer.Events): this

  on (event: 'inputSize', handler: MapSlicer.IInputHandler): this
  off (event: 'inputSize', handler: MapSlicer.IInputHandler): this
  addEventListener (event: 'inputSize', handler: MapSlicer.IInputHandler): this
  removeEventListener (event: 'inputSize', handler: MapSlicer.IInputHandler): this
  once (event: 'inputSize', handler: MapSlicer.IInputHandler): this
  prependListener (event: 'inputSize', handler: MapSlicer.IInputHandler): this
  prependOnceListener (event: 'inputSize', handler: MapSlicer.IInputHandler): this

  on (event: 'levels', handler: MapSlicer.ILevelsHandler): this
  off (event: 'levels', handler: MapSlicer.ILevelsHandler): this
  addEventListener (event: 'levels', handler: MapSlicer.ILevelsHandler): this
  removeEventListener (event: 'levels', handler: MapSlicer.ILevelsHandler): this
  listenerCount (event: 'levels'): this
  once (event: 'levels', handler: MapSlicer.ILevelsHandler): this
  prependListener (event: 'levels', handler: MapSlicer.ILevelsHandler): this
  prependOnceListener (event: 'levels', handler: MapSlicer.ILevelsHandler): this

  on (event: 'start', handler: MapSlicer.IStartHandler): this
  off (event: 'start', handler: MapSlicer.IStartHandler): this
  addEventListener (event: 'start', handler: MapSlicer.IStartHandler): this
  removeEventListener (event: 'start', handler: MapSlicer.IStartHandler): this
  listenerCount (event: 'start'): this
  once (event: 'start', handler: MapSlicer.IStartHandler): this
  prependListener (event: 'start', handler: MapSlicer.IStartHandler): this
  prependOnceListener (event: 'start', handler: MapSlicer.IStartHandler): this

  on (event: 'progress', handler: MapSlicer.IProgressHandler): this
  off (event: 'progress', handler: MapSlicer.IProgressHandler): this
  addEventListener (event: 'progress', handler: MapSlicer.IProgressHandler): this
  removeEventListener (event: 'progress', handler: MapSlicer.IProgressHandler): this
  listenerCount (event: 'progress'): this
  once (event: 'progress', handler: MapSlicer.IProgressHandler): this
  prependListener (event: 'progress', handler: MapSlicer.IProgressHandler): this
  prependOnceListener (event: 'progress', handler: MapSlicer.IProgressHandler): this

  on (event: 'warning', handler: MapSlicer.IWarningHandler): this
  off (event: 'warning', handler: MapSlicer.IWarningHandler): this
  addEventListener (event: 'warning', handler: MapSlicer.IWarningHandler): this
  removeEventListener (event: 'warning', handler: MapSlicer.IWarningHandler): this
  listenerCount (event: 'warning'): this
  once (event: 'warning', handler: MapSlicer.IWarningHandler): this
  prependListener (event: 'warning', handler: MapSlicer.IWarningHandler): this
  prependOnceListener (event: 'warning', handler: MapSlicer.IWarningHandler): this
}

export = MapSlicer
