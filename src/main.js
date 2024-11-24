/*
  +-------------------------------------------------------------+
  !     CODE SOURCE MATERIALS                                   !
  !     OUESTADAM CONFIDENTIAL                                  !
  !                                                             !
  !     OUESTADAM CONFIDENTIAL                                  !
  !     (C) COPYRIGHT OUESTADAM 2024                            !
  !     Licensed Internal Code - Property of OUESTADAM          !
  +-------------------------------------------------------------+
  +-------------------------------------------------------------+
  !                                                             !
  !  File  : main.js                                            !
  !  Desc. : Electron main for oetaskreport                     !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 24/11/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import {app, BrowserWindow, nativeImage, ipcMain, dialog} from 'electron';
import fs from "node:fs";
import {join} from "path";

/*=============== Global variables =============================*/
/*
--- Current Browser Window
*/
let mainWindow_o = null;

/*=============== Local functions ==============================*/

/*+-------------------------------------------------------------+
  ! Routine    : locIpcReceiving_f                              !
  ! Description: Process all IPC receiving process              !
  !                                                             !
  ! IN:  - Nothing                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locIpcReceiving_f() {
    /*
    --- Set Title processing
    */
    ipcMain.on('oetrSetTitle', (paramEvent, paramTitle) => {
        mainWindow_o.setTitle(paramTitle);
    });
    /*
    --- Set Maximizing and Minimizing processing
    */
    ipcMain.on('oetrSetMaximized', (paramEvent, paramMaximizeFlag) => {
        if (paramMaximizeFlag === 'true') {
            mainWindow_o.maximize();
        } else {
            mainWindow_o.unmaximize();
        }
    });
    /*
    --- Set Resizing processing
    */
    ipcMain.on('oetrSetResized', (paramEvent, paramSize) => {
        const locSize_a = paramSize.split(',');
        mainWindow_o.setSize(parseInt(locSize_a[0]), parseInt(locSize_a[1]));
    });
    /*
    --- Process Folder path dialog
    */
    ipcMain.handle('oetrDialogFolderPath', async () => {
        const locDialogResult =
            await dialog.showOpenDialog(mainWindow_o, {properties: ['openDirectory', 'createDirectory']});
        if (locDialogResult.canceled) {
            return ("");
        } else {
            return (locDialogResult.filePaths[0]);
        }
    });
    /*
    --- Process Save File dialog
    */
    ipcMain.handle('oetrDialogSaveFile', async (paramEvent, paramFilters_a, paramDefaultPath_s) => {
        const locDialogResult =
            await dialog.showSaveDialog(mainWindow_o, {
                defaultPath: paramDefaultPath_s,
                filters: paramFilters_a,
                properties: ['createDirectory']
            });
        if (locDialogResult.canceled) {
            return ("");
        } else {
            return (locDialogResult.filePath);
        }
    });
    /*
    --- Process Check if a File is present
    */
    ipcMain.handle('oetrFileExists', async (paramEvent, paramFileName) => {
        return fs.existsSync(paramFileName);
    });
    /*
    --- Process create a directory if not present
    */
    ipcMain.handle('oetrCreateDir', async (paramEvent, paramDirName) => {
        if (fs.existsSync(paramDirName)) return true;
        return fs.mkdirSync(paramDirName, {recursive: true});
    });
    /*
    --- Process Listing of a directory
    */
    ipcMain.handle('oetrDirRead', async (paramEvent, paramDirName) => {
        return (fs.readdirSync(paramDirName, {encoding: 'utf8'}));
    });
    /*
    --- Process Read of a File
    */
    ipcMain.handle('oetrFileRead', async (paramEvent, paramFileName) => {
        return (fs.readFileSync(paramFileName, {encoding: 'utf8'}));
    });
    /*
    --- Process Write of a File
    */
    ipcMain.handle('oetrFileWrite', async (paramEvent, paramFileName, paramData) => {
        return fs.writeFileSync(paramFileName, paramData, {encoding: 'utf8'});
    });
}

/*+-------------------------------------------------------------+
  ! Routine    : locIpcSending_f                                !
  ! Description: Process all IPC sending process                !
  !                                                             !
  ! IN:  - Nothing                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locIpcSending_f() {
    /*
    --- Process Window maximizing process
    */
    mainWindow_o.on('maximize', () => {
        mainWindow_o.webContents.send('oetrOnUpdateMaximizing', 'true');
    });
    mainWindow_o.on('unmaximize', () => {
        mainWindow_o.webContents.send('oetrOnUpdateMaximizing', 'false');
    });
    /*
    --- Process Window resizing process
    */
    mainWindow_o.on('resize', () => {
        /*
        --- Get the new window size
        */
        const locSize_a = mainWindow_o.getSize();
        const locSize_s = locSize_a[0] + ',' + locSize_a[1];
        mainWindow_o.webContents.send('oetrOnUpdateResizing', locSize_s);
    });
}

/*+-------------------------------------------------------------+
  ! Routine    : locCreateWindow_f                              !
  ! Description: Creation of the main window                    !
  !                                                             !
  ! IN:  - Nothing                                              !
  ! OUT: - Created window                                       !
  +-------------------------------------------------------------+
*/
function locCreateWindow_f() {
    /*
    --- Create the browser window
    */
    mainWindow_o = new BrowserWindow({
        width: "1024px",
        height: "800px",
        minHeight: "800px",
        icon: nativeImage.createFromPath(join(__dirname, './assets/icons/png/256x256.png')),
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            nodeIntegration: true,
        }
    });

    /*
    --- Load the index.html of the app
    */
    mainWindow_o.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    /*
    --- Hide the Menu bar
    */
    mainWindow_o.menuBarVisible = false;
    /*
    --- For debugging: Open the DevTools
    */
    // mainWindow_o.webContents.openDevTools();
    /*
    --- Process receiving IPC messages
    */
    locIpcReceiving_f();
    /*
    --- Process sending IPC messages
    */
    locIpcSending_f();
}

/*=============== Main =========================================*/

/*
--- Handle creating/removing shortcuts on Windows when installing/uninstalling
*/
if (require('electron-squirrel-startup')) {
    app.quit();
}

/*
--- When Ready then create the Main Window
*/
app.whenReady().then(() => {
    locCreateWindow_f();
    /*
    --- On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
    */
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            locCreateWindow_f();
        }
    });
});

/*
--- Quit when all windows are closed, except on macOS. There, it's common
    for applications and their menu bar to stay active until the user quits
    explicitly with Cmd + Q.
*/
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
