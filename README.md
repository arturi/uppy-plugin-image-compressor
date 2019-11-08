# Uppy Image Compressor

<img src="https://uppy.io/images/logos/uppy-dog-head-arrow.svg" width="120" alt="Uppy logo: a superman puppy in a pink suit" align="right">

ImageCompressor is an [Uppy](https://uppy.io) file uploader plugin, that compresses images before upload, saving bandwidth.

ImageCompressor uses [Compressor.js](https://github.com/fengyuanchen/compressorjs), and the compression is lossy. From Compressor.js readme:

> JavaScript image compressor. Uses the Browser's native canvas.toBlob API to do the compression work, which means it is lossy compression. General use this to precompress a client image file before upload it.

:warning: This is not an official Uppy plugin, so no support is offered for it. Please use at your own risk.

Uppy is being developed by the folks at [Transloadit](https://transloadit.com), a versatile file encoding service.

## Example

```js
const Uppy = require('@uppy/core')
const ImageCompressor = require('uppy-plugin-image-compressor')

const uppy = Uppy()
uppy.use(ImageCompressor, {
  // Options from Compressor.js https://github.com/fengyuanchen/compressorjs#options, just don’t set `success` or `error`
})
```

## Installation

```bash
$ npm install uppy-plugin-image-compressor --save
```
