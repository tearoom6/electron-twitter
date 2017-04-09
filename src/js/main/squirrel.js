const {app} = require('electron')
const {spawn} = require('child_process')
const path = require('path')

function run(args, done) {
  const updateExe = path.resolve(path.dirname(process.execPath), "..", "Update.exe")
  spawn(updateExe, args, {
    detached: true
  }).on("close", done)
}

module.exports = function handleStartupEvent() {
  if (process.platform !== "win32") {
    return false
  }

  const cmd = process.argv[1]
  const target = path.basename(process.execPath)
  switch (cmd) {
    case '--squirrel-install':
    case '--squirrel-updated':
      run(['--createShortcut=' + target + ''], app.quit)
      return true
    case '--squirrel-uninstall':
      run(['--removeShortcut=' + target + ''], app.quit)
      return true
    case '--squirrel-obsolete':
      app.quit()
      return true
  }

  return false
}
