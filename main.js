const electron = require('electron')
const {app, BrowserWindow, Tray, Menu, nativeImage, ipcMain} = require('electron')

let mainWindow

function createMainWindow() {
    let tmpX = 800
    let tmpY = 400
    let debug = true

    let displays = electron.screen.getAllDisplays()
    let externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0
    })
    if (externalDisplay) {
        tmpX += externalDisplay.bounds.x
        tmpY += externalDisplay.bounds.y
    }
    mainWindow = new BrowserWindow({
        x: tmpX,
        y: tmpY,
        show: false,
        frame: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    if (debug) {
        mainWindow.webContents.openDevTools()
    }
    mainWindow.loadFile('main.html')
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
}

app.on('ready', () => {
    createMainWindow()
})

app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    //if (process.platform !== 'darwin') app.quit()
    app.quit()
})