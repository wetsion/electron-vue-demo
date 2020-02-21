import { app, BrowserWindow, Menu, ipcMain } from 'electron'

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

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
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

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 去除原生顶部菜单栏
  mainWindow.setMenu(null)

  // 主进程监听渲染器进程发来的事件
  // 关闭窗口
  ipcMain.on('close', () => {
    mainWindow.close()
  })

  ipcMain.on('min', () => {
    mainWindow.minimize()
  })

  ipcMain.on('max', () => {
    mainWindow.maximize()
  })

  ipcMain.on('unmax', () => {
    mainWindow.unmaximize()
  })

  ipcMain.on('ondragstart', (event, filePath) => {
    event.sender.startDrag({
      file: filePath,
      icon: `file://${__dirname}/title/max.png`
    })
  })


	// 自定义Mac 的 dock菜单
	const dockMenu = Menu.buildFromTemplate([
		{
			label: '新窗口',
			click () {
				console.log('新窗口')
			}
		},{
	    label: '打开',
      click () {
	      console.log('打开文件')
      }
    }
	])
	app.dock.setMenu(dockMenu)

}

app.on('ready', () => {
	const menu = Menu.buildFromTemplate([
		{
			label: '打开...',
			click () {
				console.log('打开')
			}
		}
	])
	Menu.setApplicationMenu(menu)
  createWindow()
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
