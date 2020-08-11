'use strict'
const fs = require('fs').promises

module.exports = async function getImageSize (gm, file) {
  try {
    await fs.access(file)
  } catch (cause) {
    throw Object.assign(new Error('File not found'), { code: 'ENOTFOUND', file, cause })
  }
  return new Promise((resolve, reject) => {
    gm(file).identify((cause, spec) => {
      if (cause) {
        let hint
        if (/.svg$/.test(file)) {
          hint = 'SVG files are poorly supported by graphicsMagics. Maybe convert them to another format first.'
        }
        return reject(Object.assign(new Error('Error while fetching size of file'), { code: 'MMAPIDENT', cause, file, hint }))
      }
      if (!spec.size) {
        return reject(Object.assign(new Error('The size couldnt properly be gathered'), { code: 'MMAPSIZE', cause, file, spec }))
      }
      resolve(spec.size)
    })
  })
}
