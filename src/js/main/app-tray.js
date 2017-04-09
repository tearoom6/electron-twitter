const {app, Menu, Tray} = require('electron')
const path = require('path')

module.exports = class AppTray {
  constructor() {
    this.tray = null
    this.start()
  }

  start() {
    app.on('ready', () => {
      this.tray = new Tray(path.join(__dirname, 'img/twitter.png'))
      const contextMenu = Menu.buildFromTemplate([
        {
          label: 'New Tweet',
          click() {
            app.emit('showForm')
          }
        }
      ])
      this.tray.setContextMenu(contextMenu)
    })
  }
}
