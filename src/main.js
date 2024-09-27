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
  !  Modif.: 26/09/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'node:path';

/*=============== Local functions ==============================*/

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
    const locMainWindow_o = new BrowserWindow({
        width: 800,
        height: 600,
        icon: "./LogoOuestadam32.png",
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            nodeIntegration: true,
        }
    });

    /*
    --- Load the index.html of the app
    */
    locMainWindow_o.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    /*
    --- Hide the Menu bar
    */
    locMainWindow_o.menuBarVisible = false;
    /*
    --- For debugging: Open the DevTools
    */
    locMainWindow_o.webContents.openDevTools();
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
