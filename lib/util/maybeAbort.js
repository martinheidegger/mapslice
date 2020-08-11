module.exports = function maybeAbort (signal) {
  if (signal && signal.aborted) {
    throw Object.assign(new Error('Aborted.'), { code: 'EABORT' })
  }
}
