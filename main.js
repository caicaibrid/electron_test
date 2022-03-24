const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, '/static/close.png'),
        skipTaskbar: true,
        width: 800,
        height: 600,
        center: true,
        autoHideMenuBar: true,
        alwaysOnTop: true,
        closable: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, '/preload.js'),
            sandbox: true,
            nodeIntegration: true,
            webSecurity: false, //禁用同源策略
            plugins: true, //是否支持插件
            nativeWindowOpen: true, //是否使用原生的window.open()
        }
    })
    mainWindow.loadURL('http://www.baidu.com')
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    if (!app.isPackaged){
        mainWindow.webContents.openDevTools()
        mainWindow.setClosable(true)
    }
}

// 创建监听
ipcMain.on('changeSize', (e, { width= 800, height= 600 }) => {
    mainWindow.setSize(width, height);
    mainWindow.center();
});

ipcMain.on('getParams', (e) => {
    console.log('主线程接受参数')
    mainWindow.webContents.send('getParams',process.argv)
});

app.on('ready', createWindow)


app.on('activate', function () {
    if (mainWindow === null) createWindow()
})