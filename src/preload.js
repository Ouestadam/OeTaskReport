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
  !  Modif.: 30/09/2024                                         !
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
    //--- Declare oetrSetMaximized for maximising or unmaximized the window
    setMaximized: (paramMaximizeFlag) => ipcRenderer.send('oetrSetMaximized', paramMaximizeFlag),

    //--- From Main to Rendering ---
    onUpdateMaximizing: (paramCallback_f) => ipcRenderer.on('oetrOnUpdateMaximizing',
        (paramEvent,paramValue) => paramCallback_f(paramValue))
});
