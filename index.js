const fs = require('fs')

const path = require('path')

const checkList = ['png', 'gif', 'svg', 'jpg']

const utils = {
  isDir: path => {
    const res = fs.statSync(path)

    return res.isDirectory()
  },
  getFileSize: path => {
    const res = fs.statSync(path)

    return (res.size / 1024).toFixed(2)
  }
}

let count = 0;

function start(route) {
  const { isDir, getFileSize } = utils

  if (isDir(route)) {
    const res = fs.readdirSync(route)

    const ignore = fs.readFileSync('./.gitignore', 'utf-8')

    for (let i = 0; i < res.length; i++) {
      const item = res[i]

      if (!ignore.includes(item)) {
        const itemPath = path.resolve(__dirname, route + '/' +item)

        if (isDir(itemPath)) {
          start(itemPath)
        } else {
          const extname = path.extname(item).replace('.', '')

          if (checkList.includes(extname)) {
            count += 1
            console.log(count, itemPath, getFileSize(itemPath) + 'kb')
          }
        }
      }
    }
  } else {
    const extname = path.extname(route)

    if (checkList.includes(extname)) {
      console.log(route)
    }
  }
}

start('./')
