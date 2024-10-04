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
  !  File  : oetrFileMgt.js                                     !
  !  Desc. : Files management for rendering of oetaskreport     !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 03/10/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/

/*
--- Ouestadam products
*/
import {oetrInitDefinitions_f} from "./oetrInit";
import {oetrMainModal_e} from "./oetrMain";

/*=============== Local functions ==============================*/

/*=============== Exported functions ===========================*/
/*+-------------------------------------------------------------+
  ! Routine    : oetrFileMgtReadJsonDefinitionFile_f            !
  ! Description: Read the JSON Definition File                  !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export async function oetrFileMgtReadJsonDefinitionFile_f(paramCtx_o, paramRefresh_f) {
    /*
    --- If Working directory is not defined then return without any action
    */
    if (paramCtx_o.workingDir.length < 1) {
        paramCtx_o.currentModal = oetrMainModal_e.parametersModal;
        return;
    }
    /*
    --- Check if the Definition file should be read
    */
    if (!paramCtx_o.definitionToBeRead) return;
    paramCtx_o.definitionToBeRead = false;
    /*
    --- Check if the Working directory exists
    */
    const locWorkingDirExists = await window.electronAPI.fileExists(paramCtx_o.workingDir);
    if (!locWorkingDirExists) {
        /*
        --- Working directory is not present then reset the Definition Object set the Parameters Modal and return
        */
        paramCtx_o.workingDir = "";
        oetrInitDefinitions_f(paramCtx_o);
        paramCtx_o.currentModal = oetrMainModal_e.parametersModal
        paramRefresh_f(paramCtx_o);
        return;
    }
    /*
    --- Build filename
    */
    const locFileName = paramCtx_o.workingDir + "/" + paramCtx_o.config_o.definitionsFileName;
    /*
    --- Check if the Definitions file exists
    */
    const locFileExists = await window.electronAPI.fileExists(locFileName);
    if (!locFileExists) {
        /*
        --- File is not present then reset the Definition Object set the Parameters Modal and return
        */
        oetrInitDefinitions_f(paramCtx_o);
        paramCtx_o.currentModal = oetrMainModal_e.parametersModal
        paramRefresh_f(paramCtx_o);
        return;
    }
    /*
    --- Read the JSON File
    */
    const locData_s = await window.electronAPI.fileRead(locFileName);
    if (locData_s.length > 4) {
        /*
        --- Parse only if Json is present
        */
        paramCtx_o.definitions_o = JSON.parse(locData_s);
        /*
        --- Set parameters as completed
        */
        paramCtx_o.parammetersCompleted = true;
    } else {
        paramCtx_o.currentModal = oetrMainModal_e.parametersModal
        oetrInitDefinitions_f(paramCtx_o);
    }
    /*
    --- Return by requesting refresh of the parameters dialog
    */
    paramRefresh_f(paramCtx_o);
}
