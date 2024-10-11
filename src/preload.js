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
  !  File  : preload.js                                         !
  !  Desc. : Electron preload for oetaskreport                  !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 09/10/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
const {contextBridge, ipcRenderer} = require('electron')

/*=============== Declarations =================================*/
/*
--- Declare each IPC verb
*/
contextBridge.exposeInMainWorld('electronAPI', {
    //--- From Rendering to Main ---
    //--- Declare oetrSetTitle for updating the MAin Window Title
    setTitle: (paramTitle) => ipcRenderer.send('oetrSetTitle', paramTitle),
    //--- Declare oetrSetMaximized for maximising or unmaximizing the window
    setMaximized: (paramMaximizeFlag) => ipcRenderer.send('oetrSetMaximized', paramMaximizeFlag),
    //--- Declare oetrSetResized for resizing the window
    setResized: (paramSize) => ipcRenderer.send('oetrSetResized', paramSize),
    //--- Declare oetrDialogFolderPath for getting Folder path
    dialogFolderPath: () => ipcRenderer.invoke('oetrDialogFolderPath'),
    //--- Declare oetrFileExists for checking if a File exists
    fileExists: (paramFileName) => ipcRenderer.invoke('oetrFileExists',paramFileName),
    //--- Declare oetrCreateDir for creating a directory if not exists
    createDir: (paramDirName) => ipcRenderer.invoke('oetrCreateDir',paramDirName),
    //--- Declare oetrDirRead for listing a directory
    dirRead: (paramDirName) => ipcRenderer.invoke('oetrDirRead',paramDirName),
    //--- Declare oetrFileRead for reading a File
    fileRead: (paramFileName) => ipcRenderer.invoke('oetrFileRead',paramFileName),
    //--- Declare oetrFileWrite for writing in a File
    fileWrite: (paramFileName,paramData) => ipcRenderer.invoke('oetrFileWrite',paramFileName, paramData),
    //--- From Main to Rendering ---
    onUpdateMaximizing: (paramCallback_f) => ipcRenderer.on('oetrOnUpdateMaximizing',
        (paramEvent, paramValue) => paramCallback_f(paramValue)),
    onUpdateResizing: (paramCallback_f) => ipcRenderer.on('oetrOnUpdateResizing',
        (paramEvent, paramValue) => paramCallback_f(paramValue)),
});
