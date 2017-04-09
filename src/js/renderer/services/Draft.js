import {remote} from 'electron'
import fs from 'fs'

module.exports = class Draft {
  static getPath() {
    return `${remote.app.getPath('userData')}/draft.txt`
  }

  static read() {
    return new Promise((onFulfilled, onRejected) => {
      fs.readFile(Draft.getPath(), 'utf8', (error, text) => {
        if (error) {
          onRejected(error)
          return
        }
        onFulfilled(text)
      })
    })
  }

  static write(text) {
    return new Promise((onFulfilled, onRejected) => {
      fs.writeFile(Draft.getPath(), text, 'utf8', (error) => {
        if (error) {
          onRejected(error)
          return
        }

        onFulfilled(text)
      })
    })
  }
}
