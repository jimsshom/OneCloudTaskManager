const electron = require('electron')
const {app, BrowserWindow, Tray, Menu, nativeImage, ipcMain} = require('electron')

let mainWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        show: false,
        frame: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.webContents.openDevTools()
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