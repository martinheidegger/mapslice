const { EventEmitter } = require('events')

const map = new WeakMap()

module.exports = function abortDisposers (signal) {
  if (!signal) {
    return
  }
  let emitters = map.get(signal)
  if (!emitters) {
    const emitter = new EventEmitter()
    signal.addEventListener('abort', () => emitter.emit('abort'))
    emitter.setMaxListeners(0)
    emitters = [{ emitter, events: ['abort'] }]
    map.set(signal, emitters)
  }
  return emitters
}
