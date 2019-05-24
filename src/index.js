const Compressor = require('compressorjs')

class UppyCompressor extends Plugin {
  constructor (uppy, options) {
    super(uppy, options)
    this.id = options.id || 'Compressor'
    this.type = 'modifier'

    this.prepareUpload = this.prepareUpload.bind(this)
    this.compress = this.compress.bind(this)
  }

  compress (blob) {
    this.uppy.log(`[Compressor] Image size before compression: ${blob.size}`)
    return new Promise((resolve, reject) => {
      new Compressor(blob, Object.assign(
        {},
        this.opts,
        {
          success: (result) => {
            this.uppy.log(`[Compressor] Image size after compression: ${result.size}`)
            return resolve(result)
          },
          error: (err) => {
            return reject(err)
          }
        }
      ))
    })
  }

  prepareUpload (fileIDs) {
    const promises = fileIDs.map((fileID) => {
      const file = this.uppy.getFile(fileID)
      if (file.type.split('/')[0] !== 'image') {
        return
      }
      return this.compress(file.data).then((compressedBlob) => {
        const compressedFile = Object.assign({}, file, { data: compressedBlob })
        this.uppy.setFileState(fileID, compressedFile)
      })
    })
    return Promise.all(promises)
  }

  install () {
    this.uppy.addPreProcessor(this.prepareUpload)
  }
}

module.exports = UppyCompressor
