import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let aboutWindow
const aboutWindowUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#about`
  : `file://${__dirname}/index.html#/about`

let windowCount = 0

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    title: '秋月编辑器',
    height: 600,
    useContentSize: true,
    width: 1000,
    frame: false, // 默认标题栏去掉
    // resizable: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      devTools: true
    }
  })

  mainWindow.loadURL(winURL)
  windowCount ++

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 去除原生顶部菜单栏
  mainWindow.setMenu(null)



  // 自定义Mac 的 dock菜单
  const dockMenu = Menu.buildFromTemplate([
    {
      label: '新窗口',
      click () {
        createWindow()
      }
    }
  ])
  app.dock.setMenu(dockMenu)


  return mainWindow
}

// 主进程监听渲染器进程发来的事件
// 关闭窗口
ipcMain.on('close', () => {
  console.log('window count: ', windowCount)
  BrowserWindow.getFocusedWindow().close()
})

ipcMain.on('min', () => {
  BrowserWindow.getFocusedWindow().minimize()
})

ipcMain.on('max', () => {
  BrowserWindow.getFocusedWindow().maximize()
})

ipcMain.on('unmax', () => {
  BrowserWindow.getFocusedWindow().unmaximize()
})

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: `file://${__dirname}/title/max.png`
  })
})

ipcMain.on('render-process-open-file', () => {
  dialog.showSaveDialog(
    {
      filters: [
        { name: 'MarkDown', extensions: ['md'] }
      ]
    },
    (filename, bookmark) => {
      console.log('render-process-open-file:', filename)
      if (filename) {
        BrowserWindow.getFocusedWindow().webContents.send('main-process-save-to-another', filename)
      }
    }
  )
})

app.on('ready', () => {
  createWindow()
	let menu = Menu.buildFromTemplate([
    {
      submenu: [
        {
          label: '关于秋月编辑器',
          click (event, focusedWindow, focusedWebContents) {
            if (aboutWindow) {
              aboutWindow.show()
            } else {
              aboutWindow = new BrowserWindow({
                title: '关于秋月编辑器',
                height: 400,
                useContentSize: true,
                width: 300,
                resizable: false,
                frame: true,
                webPreferences: {
                  nodeIntegration: true,
                  nodeIntegrationInWorker: true,
                  webSecurity: false,
                  devTools: true
                }
              })
              aboutWindow.loadURL(aboutWindowUrl)
              aboutWindow.on('closed', () => {
                aboutWindow = null
              })
            }
          }
        },
        {
          label: '关闭当前',
          role: 'close'
        },
        {
          label: '退出',
          role: 'quit'
        }
      ]
    },
		{
			label: '文件',
			submenu: [
        {
          label: '打开..',
          click (event, focusedWindow, focusedWebContents) {
            dialog.showOpenDialog(
              {
                properties: ['openFile'],
                filters: [
                  { name: 'MarkDown', extensions: ['md'] }
                ]
              },
              (filePaths, bookmarks) => {
                console.log(filePaths)
                if (filePaths) {
                  focusedWindow.webContents.send('main-process-open-file', filePaths)
                }
              }
            )
          }
        },
        {
          label: '保存',
          click (event, focusedWindow, focusedWebContents) {
            focusedWindow.webContents.send('main-process-save', 'save')
          }
        },
        {
          label: '另存为',
          click (event, focusedWindow, focusedWebContents) {
            dialog.showSaveDialog(
              {
                filters: [
                  { name: 'MarkDown', extensions: ['md'] }
                ]
              },
              (filename, bookmark) => {
                console.log(filename)
                console.log(bookmark)
                if (filename) {
                  focusedWindow.webContents.send('main-process-save-to-another', filename)
                }
              }
            )
          }
        }
      ]
		}
	])
	Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
