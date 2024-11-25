/*
  +-------------------------------------------------------------+
  ! CODE SOURCE MATERIALS                                       !
  ! Copyright (C) 2024 Ouestadam-Esteve                         !
  !                                                             !
  ! This file is part of oeTaskReport.                          !
  ! oeTaskReport is free software: you can redistribute it      !
  ! and/or modify it under the terms of the GNU General Public  !
  ! License as published by the Free Software Foundation,       !
  ! either version 3 of the License, or any later version.      !
  ! oeTaskReport is distributed in the hope that it will be     !
  ! useful, but WITHOUT ANY WARRANTY; without even the implied  !
  ! warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR     !
  ! PURPOSE.                                                    !
  ! See the GNU General Public License for more details.        !
  ! You should have received a copy of the GNU General Public   !
  ! License along with oeTaskReport.                            !
  ! If not, see <https://www.gnu.org/licenses/>.                !
  +-------------------------------------------------------------+
  +-------------------------------------------------------------+
  !  File  : preload.js                                         !
  !  Desc. : Electron preload for oetaskreport                  !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 21/11/2024                                         !
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
    //--- Declare oetrDialogFolderPath for getting File path
    dialogSaveFile: (paramFilters_a, paramDefaultPath_s) =>
        ipcRenderer.invoke('oetrDialogSaveFile', paramFilters_a, paramDefaultPath_s),
    //--- Declare oetrFileExists for checking if a File exists
    fileExists: (paramFileName) => ipcRenderer.invoke('oetrFileExists', paramFileName),
    //--- Declare oetrCreateDir for creating a directory if not exists
    createDir: (paramDirName) => ipcRenderer.invoke('oetrCreateDir', paramDirName),
    //--- Declare oetrDirRead for listing a directory
    dirRead: (paramDirName) => ipcRenderer.invoke('oetrDirRead', paramDirName),
    //--- Declare oetrFileRead for reading a File
    fileRead: (paramFileName) => ipcRenderer.invoke('oetrFileRead', paramFileName),
    //--- Declare oetrFileWrite for writing in a File
    fileWrite: (paramFileName, paramData) => ipcRenderer.invoke('oetrFileWrite', paramFileName, paramData),
    //--- From Main to Rendering ---
    onUpdateMaximizing: (paramCallback_f) => ipcRenderer.on('oetrOnUpdateMaximizing',
        (paramEvent, paramValue) => paramCallback_f(paramValue)),
    onUpdateResizing: (paramCallback_f) => ipcRenderer.on('oetrOnUpdateResizing',
        (paramEvent, paramValue) => paramCallback_f(paramValue)),
});
