const {app} = require('electron')
const TimelineWindow = require('./timeline-window')

class Main {
  constructor() {

    this.timelineWindow = new TimelineWindow()
    this.start()
  }

  start() {
    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('ready', () => {
    })
  }
}

new Main()
