const Core = require('@uppy/core')
const FileInput = require('@uppy/file-input')
const ImageCompressor = require('../lib/index.js')

const core = new Core({
  debug: true
})
core.use(FileInput, {
  target: 'body'
})
core.use(ImageCompressor, {
  quality: 0.6
})

window.uppy = core

export default uppy
