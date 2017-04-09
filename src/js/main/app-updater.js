const {app, dialog, autoUpdater}= require('electron')

module.exports = class AppUpdater {
  start() {
    // error callback for Windows.
    autoUpdater.on('error', (event, message) => {
      console.log(`error:${message}`)
    })

    // update callback for macOS.
    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
      dialog.showMessageBox({
        type: 'info',
        buttons: ['Restart now', 'Apply at next reboot'],
        title: app.getName(),
        cancelId: 1,
        message: 'Update downloaded. Would you like to restart now?',
        detail: `${releaseName}\n\n${releaseNotes}`
      }, (index) => {
        if (index === 1) {
          return
        }

        quitAndUpdate()
      })
    })

    // Check for update.
    let feedUrl = ''
    if (process.platform === 'darwin') {
      feedUrl = `http://example.com/download/latest?version=${app.getVersion()}`
    } else {
      feedUrl = 'http://example.com/win'
    }
    autoUpdater.setFeedURL(feedUrl)
    autoUpdater.checkForUpdates()
  }
}
