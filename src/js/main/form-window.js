const {app, BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')

module.exports = class FormWindow {
  constructor() {
    this.window = null
    this.start()
  }

  start() {
    app.on('ready', () => {
      this.createWindow()
    })

    app.on('activate', () => {
      if (this.window === null) {
        this.createWindow()
      }
    })

    app.on('showForm', () => {
      this.window.show()
    })
  }

  createWindow() {
    this.window = new BrowserWindow({
      title: 'Tweet',
      center: true,
      resizable: false,
      minimizable: false,
      maximizable: false,
      width: 300,
      height: 250,
      show: false
    })

    this.window.on('close', (event) => {
      if (this.window.isVisible()) {
        this.window.hide()
        event.preventDefault()
      }
    })

    this.window.loadURL(url.format({
      pathname: path.join(__dirname, 'form.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
}
