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
  !  Modif.: 04/10/2024                                         !
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
import {oetrDefModal_e} from "./oetrDef";

/*=============== Exported functions ===========================*/

/*+-------------------------------------------------------------+
  ! Routine    : oetrFileMgtReadJsonReportFile_f                !
  ! Description: Read a JSON Report File                        !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Report Directory Name                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export async function oetrFileMgtReadJsonReportFile_f(paramCtx_o, paramDirName_s) {

    /*
    --- Create the directory if it doesn't exist
    */
    await window.electronAPI.createDir(paramDirName_s);
    /*
    --- Read the current report file if present else create a new record
    */

}

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
    if (paramCtx_o.workingDir_s.length < 1) {
        paramCtx_o.parametersCompleted = false;
        paramCtx_o.currentModal = oetrDefModal_e.parametersModal;
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
    const locWorkingDirExists = await window.electronAPI.fileExists(paramCtx_o.workingDir_s);
    if (!locWorkingDirExists) {
        /*
        --- Working directory is not present then reset the Definition Object set the Parameters Modal and return
        */
        paramCtx_o.workingDir_s = "";
        oetrInitDefinitions_f(paramCtx_o);
        paramCtx_o.currentModal = oetrDefModal_e.parametersModal
        if (paramRefresh_f !== undefined) paramRefresh_f(paramCtx_o);
        return;
    }
    /*
    --- Build filename
    */
    const locFileName = paramCtx_o.workingDir_s + "/" + paramCtx_o.config_o.definitionsFileName;
    /*
    --- Check if the Definitions file exists
    */
    const locFileExists = await window.electronAPI.fileExists(locFileName);
    if (!locFileExists) {
        /*
        --- File is not present then reset the Definition Object set the Parameters Modal and return
        */
        oetrInitDefinitions_f(paramCtx_o);
        paramCtx_o.currentModal = oetrDefModal_e.parametersModal
        if (paramRefresh_f !== undefined) paramRefresh_f(paramCtx_o);
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
        paramCtx_o.parametersCompleted = true;
    } else {
        paramCtx_o.currentModal = oetrDefModal_e.parametersModal
        oetrInitDefinitions_f(paramCtx_o);
    }
    /*
    --- Return by requesting refresh of the parameters dialog if present
    */
    if (paramRefresh_f !== undefined) paramRefresh_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : oetrFileMgtWriteJsonDefinitionFile_f           !
  ! Description: Write the JSON Definition File                 !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export async function oetrFileMgtWriteJsonDefinitionFile_f(paramCtx_o) {
    /*
    --- If Working directory is not defined then return without any action
    */
    if (paramCtx_o.workingDir_s.length < 1) return;
    /*
    --- Check if the Working directory exists
    */
    const locWorkingDirExists = await window.electronAPI.fileExists(paramCtx_o.workingDir_s);
    if (!locWorkingDirExists) return;
    /*
    --- Build filename
    */
    const locFileName = paramCtx_o.workingDir_s + "/" + paramCtx_o.config_o.definitionsFileName;
    /*
    --- Convert to String the Definition object
    */
    const locData_s = JSON.stringify(paramCtx_o.definitions_o);
    /*
    --- Write the definition file
    */
    await window.electronAPI.fileWrite(locFileName, locData_s);
    }
