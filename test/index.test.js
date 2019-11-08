const path = require('path')
const nycJpgPath = path.join(__dirname, 'assets/nyc.jpg')

beforeEach(async () => {
  jest.setTimeout(20 * 1000)
  await page.goto(PATH, { waitUntil: 'load' })
})

describe('Image Compressor', () => {
  it('should compress an image before upload, its size should become smaller', async () => {
    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click('.uppy-FileInput-btn') // some button that triggers file selection
    ])
    await fileChooser.accept([nycJpgPath])

    const sizes = await page.evaluate(() => {
      return new Promise((resolve) => {
        const sizeBefore = window.uppy.getFiles()[0].data.size
          return window.uppy.upload().then(() => {
            const sizeAfter = window.uppy.getFiles()[0].data.size
            return resolve({
              before: sizeBefore,
              after: sizeAfter
            })
          })
      })
    })

    console.log(sizes)
    
    expect(sizes.after).toBeLessThan(sizes.before)
    expect(sizes.before).toBe(33981)
    expect(sizes.after).toBe(12174)
  })
})

// if we want to load an image as blob from a url
// did this at first, went with `fileChooser` instead

// window.loadImageAsBlob = (url, done) => {
//   const xhr = new XMLHttpRequest()

//   xhr.onload = () => {
//     const blob = xhr.response

//     blob.name = url.replace(/^.*?(\w+\.\w+)$/, '$1')
//     done(blob)
//   };
//   xhr.open('GET', url)
//   xhr.responseType = 'blob'
//   xhr.send()
// }
