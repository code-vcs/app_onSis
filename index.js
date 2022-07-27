const { app, BrowserWindow, dialog, BrowserView, ipcMain } = require('electron');
const ytdl = require('ytdl-core')
const fs = require('fs')
const path = require('path');

// require('electron-reload')(__dirname, {
//     require: (__dirname + '/node_modules/electron')
// })

var win = null;
app.on('ready', () => {
    win = new BrowserWindow({
        title: 'Sis Financeiro',
        width: 1000,
        height: 630,
        minWidth:1000,
        minHeight:630,
        maximizable: true,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: 'black',
            symbolColor: 'yellow',
        },
        webPreferences: {
            // devTools: true,
            nodeIntegration: true,
            contextIsolation: false
        },
    })
    win.loadFile('index.html')
    // win.webContents.toggleDevTools();
})

ipcMain.on('solicitarVd', (evt, arg) => {
    if (arg == 'vd') {
        const selection = dialog.showMessageBoxSync(win, {
            title: 'Download',
            buttons: ['Ok', 'Close'],
            type: 'question',
            message: 'Deseja Fazer o Download ?',
        })
        if (selection == '0') {
            let windDataView = BrowserWindow.getFocusedWindow()
            windDataView.webContents.send('vdSolicited', 'true')
        } else {
            win.webContents.reload();
        }
    }
})


// video update
ipcMain.on('chaveUploadVideo', (evt, arg) => {
    let data = arg
    let destino = dialog.showSaveDialogSync(win) + data[0].format
    ytdl(data[0].url).pipe(fs.createWriteStream(destino))
    let dt = BrowserWindow.getFocusedWindow()
    dt.webContents.send('saveDataBase','banco')
})

// erro no update https:// invalido
ipcMain.on('erro', (evt, arg) => {
    if (arg == 'erro') {
        dialog.showMessageBoxSync(win, {
            title: 'Infomation !',
            buttons: ['Close'],
            type: 'warning',
            message: 'Erro ! ( URL INVALIDA )...',
        })
        win.webContents.reload()
    }
})




