const {app, BrowserWindow, ipcMain} = require('electron')

const path = require('path')
const url = require('url')

module.exports = class TimelineWindow {
  constructor() {
    this.window = null
    this.newMentionsCount = 0
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

    ipcMain.on('newMention', () => {
      if(this.window.isFocused()) {
        return
      }
      this.newMentionsCount++
      this.updateBadge()
    })
  }

  createWindow() {
    this.window = new BrowserWindow({
      x: 0,
      y: 0,
      width: 400,
      height: 800,
    })

    this.window.on('focus', () => {
      this.newMentionsCount = 0
      this.updateBadge()
    })

    this.window.on('closed', () => {
      this.window = null
    })

    this.window.webContents.openDevTools()
    this.window.loadURL(url.format({
      pathname: path.join(__dirname, 'timeline.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  updateBadge() {
    app.setBadgeCount(this.newMentionsCount)
    if (process.platform === 'darwin') {
      app.dock.bounce()
    }
  }
}
