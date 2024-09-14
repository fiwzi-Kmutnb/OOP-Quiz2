const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const production = process.env.ROLLUP_WATCH;

const main = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    icon: path.join(__dirname, '../public/icon.jpg'),
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  })
  win.loadFile(path.join(__dirname, '../public/index.html'))
  win.on('ready-to-show', () => {
    win.show()
  })
  ipcMain.on('closeApp', () => {
    win.close()
  })
  ipcMain.on('minimizeApp', () => {
    win.minimize()
  })
}
app.whenReady().then(main)