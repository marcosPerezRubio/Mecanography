'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const ipcMain = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({frame: false, width: 800, height: 600});


    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });


    //??????
    mainWindow.on('maximize', function () {
        //Cambiar datos directiva
        console.log('MAXIMIZED');
    });

    mainWindow.on('unmaximize', function () {
        //Cambiar datos directiva
        mainWindow.setProgressBar(0.5);
        console.log('UNMAXMIZED');
    });

    mainWindow.on('minimize', function () {
        //Cambiar datos directiva

        console.log('MINIMIZE');
    });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});



ipcMain.on('quit', function () {
    app.quit();
});

ipcMain.on('minimize', function () {
    console.log('received minimize');
    mainWindow.minimize();
});

ipcMain.on('reload', function () {
    mainWindow.loadURL('file://' + __dirname + '/index.html');
});
ipcMain.on('maximize', function () {
    mainWindow.maximize();
});

ipcMain.on('unmaximize', function () {
    mainWindow.unmaximize();
});


app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});