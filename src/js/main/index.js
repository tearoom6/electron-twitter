const {app, globalShortcut} = require('electron')
const TimelineWindow = require('./timeline-window')
const FormWindow = require('./form-window')
const AppMenu = require('./app-menu')
const AppTray = require('./app-tray')

class Main {
  constructor() {
    this.timelineWindow = new TimelineWindow()
    this.formWindow = new FormWindow()
    this.appTray = new AppTray()
    this.start()
  }

  start() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('will-quit', () => {
      globalShortcut.unregisterAll()
    })

    app.on('ready', () => {
      this.registerGlobalShortcut()
      AppMenu.setup()
    })
  }

  registerGlobalShortcut() {
    const accelerator = 'CommandOrControl+Shift+N'
    if (globalShortcut.isRegistered(accelerator)) {
      return
    }

    globalShortcut.register(accelerator, () => {
      this.formWindow.window.show()
    })
  }

}

new Main()
