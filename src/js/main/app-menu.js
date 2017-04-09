const {app, Menu, MenuItem} = require('electron')

module.exports = class AppMenu {
  static setup() {
    const tweetMenu = new MenuItem({
      label: 'Tweet',
      submenu: [
        {
          label: 'New Tweet',
          click() {
            app.emit('showForm')
          }
        }
      ]
    })

    const template = AppMenu.getBasicTemplate()
    const menu = Menu.buildFromTemplate(template)
    menu.append(tweetMenu)
    Menu.setApplicationMenu(menu)
  }

  static getBasicTemplate() {
    const template = [
      {
        label: 'Edit',
        submenu: [
          {
            role: 'undo'
          },
          {
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            role: 'cut'
          },
          {
            role: 'copy'
          },
          {
            role: 'paste'
          },
          {
            role: 'pasteandmatchstyle'
          },
          {
            role: 'delete'
          },
          {
            role: 'selectall'
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            role: 'reload',
            accelerator: 'CmdOrCtrl+R',
            click(item, focusedWindow) {
              if (focusedWindow) focusedWindow.reload()
            }
          },
          {
            role: 'togglefullscreen'
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.webContents.toggleDevTools()
            }
          }
        ]
      },
      {
        role: 'window',
        submenu: [
          {
            role: 'minimize'
          },
          {
            role: 'close'
          }
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              require('electron').shell.openExternal('https://github.com/tearoom6/electron-twitter')
            }
          }
        ]
      }
    ]

    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          {
            role: 'about'
          },
          {
            type: 'separator'
          },
          {
            role: 'services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            role: 'hide'
          },
          {
            role: 'hideothers'
          },
          {
            role: 'unhide'
          },
          {
            type: 'separator'
          },
          {
            role: 'quit'
          }
        ]
      })

      template[3].submenu = [
        {
          label: 'Close',
          role: 'close'
        },
        {
          label: 'Minimize',
          role: 'minimize'
        },
        {
          label: 'Zoom',
          role: 'zoom'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          role: 'front'
        }
      ]
    }

    return template
  }
}
