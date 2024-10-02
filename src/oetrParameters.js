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
  !  File  : oetrParameters.js                                  !
  !  Desc. : Parameters dialog for rendering of oetaskreport    !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 01/10/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {oetrMainModal_e, oetrMainRefreshPage_f} from "./oetrMain";
import {OetrError_jsx} from "./oetrError";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

/*
--- Ouestadam products
*/

/*=============== Local functions ==============================*/

/*+-------------------------------------------------------------+
  ! Routine    : locClose_f                                     !
  ! Description: Handle the Cancel Button                       !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locClose_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- If parameters are not completed then close the application
    */
    if (!paramCtx_o.parammetersCompleted) {
        window.close();
    }
    /*
    --- Close the Modal
    */
    paramCtx_o.currentModal = oetrMainModal_e.noModal;
    /*
    --- Reset the error state
    */
    paramCtx_o.error_o.inError = false;
    /*
    --- Refresh the main page
    */
    oetrMainRefreshPage_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : locValid_f                                     !
  ! Description: Handle the Validation Button                   !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
async function locValid_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Close the Modal
    */
    paramCtx_o.currentModal = oetrMainModal_e.noModal;
    /*
    --- Reset the error state
    */
    paramCtx_o.error_o.inError = false;
    /*
    --- If Working directory is not defined then return without only main page refresh
    */
    if (paramCtx_o.workingDir.length < 1) {
        oetrMainRefreshPage_f(paramCtx_o);
        return;
    }
    /*
    --- Save the Working Dir in the Cookies
    */
    paramCtx_o.cookiesManagement_o.oeComCookiesSet_m("oetrWorkingDir",
        paramCtx_o.workingDir, paramCtx_o.cookiesManagement_o.oeComCookiesDuration_e.unlimited);
    /*
    --- Build filename
    */
    const locFileName = paramCtx_o.workingDir + "/" + paramCtx_o.config_o.definitionsFileName;
    /*
    --- Convert to String the Definition object
    */
    const locData_s = JSON.stringify(paramCtx_o.definitions_o);
    /*
    --- Write the definition file
    */
    await window.electronAPI.fileWrite(locFileName, locData_s);
    /*
    --- Refresh the main page
    */
    oetrMainRefreshPage_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : locGetFolderPath_f                             !
  ! Description: Handle the entering of the Folder Path         !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
async function locGetFolderPath_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Request Path selection
    */
    const locWorkingDir = await window.electronAPI.dialogFolderPath();
    /*
    --- Update the Working dir in the context if present
    */
    if (locWorkingDir.length > 0) paramCtx_o.workingDir = locWorkingDir;
    /*
    --- Request the Definitions file read and refresh the Parameters dialog
    */
    paramCtx_o.definitionToBeRead = true;
    oetrParametersRefreshModal_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : locReadJsonDefinitionFile_f                    !
  ! Description: Read the JSON Definition File                  !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
async function locReadJsonDefinitionFile_f(paramCtx_o) {
    /*
    --- If Working directory is not defined then return without any action
    */
    if (paramCtx_o.workingDir.length < 1) return;
    /*
    --- Check if the Definition file should be read
    */
    if (!paramCtx_o.definitionToBeRead) return;
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
        --- File is not present then reset the Definition Object and return
        */
        paramCtx_o.definitions_o = {};
        paramCtx_o.definitionToBeRead = false;
        oetrParametersRefreshModal_f(paramCtx_o);
        return;
    }
    /*
    --- Read the JSON File
    */
    const locData_s = await window.electronAPI.fileRead(locFileName);
    if (locData_s.length > 4) {
        /*
        --- Parse only minimum Json
         */
        paramCtx_o.definitions_o = JSON.parse(locData_s);
    } else {
        paramCtx_o.definitions_o = {};
    }
    /*
    --- Return by requesting refresh of the parameters dialog
    */
    paramCtx_o.definitionToBeRead = false;
    oetrParametersRefreshModal_f(paramCtx_o);
}


/*=============== Local JSX components =========================*/

/*
+-------------------------------------------------------------+
! Routine    : LocContent_jsx                                 !
! Description: JSX Parameters Modal content                   !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocContent_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    /*
    --- Read the Definitions JSON file if present
    */
    locReadJsonDefinitionFile_f(locCtx_o);
    /*
    --- Return the Dialog Content to display
    */
    return (
        <div style={{minHeight: "300px"}}>
            <div>
                {locTrans_o.oeComTransGet_m("parameters", "labelGetWorkingDir")}
            </div>
            <div>
                <Button
                    variant="contained"
                    onClick={(paramEvent) => locGetFolderPath_f(locCtx_o, paramEvent)}
                    sx={{mr: "14px"}}>
                    <CreateNewFolderIcon/>
                </Button>
                <span>
                    <i>
                        {locCtx_o.workingDir}
                    </i>
                </span>
            </div>
        </div>
    )
}

/*=============== Exported functions ===========================*/

/*
+-------------------------------------------------------------+
! Routine : oetrParametersRefreshModal_f                      !
! Description: Request the refresh of the Modal               !
!                                                             !
! IN: - Context                                               !
! OUT: - Nothing                                              !
+-------------------------------------------------------------+
*/
export function oetrParametersRefreshModal_f(paramCtx_o) {
    paramCtx_o.refresh_o.parameters_s = !paramCtx_o.refresh_o.parameters_s;
    paramCtx_o.refresh_o.parameters_f(paramCtx_o.refresh_o.parameters_s);
}

/*=============== Exported JSX components ======================*/

/*+-------------------------------------------------------------+
  ! Routine    : OetrDialogParameters_jsx                       !
  ! Description: JSX Parameters Dialog                          !
  !                                                             !
  ! IN:  - Properties including Context                         !
  ! OUT: - Page rendering                                       !
  +-------------------------------------------------------------+
*/
export function OetrDialogParameters_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;

    /*
    --- Get React state for refreshing the page
    */
    const [locParameters_s, locParameters_f] = useState(false);
    locCtx_o.refresh_o.parameters_f = locParameters_f;
    locCtx_o.refresh_o.parameters_s = locParameters_s;

    /*
    --- Return the Dialog
    */
    return (
        <Dialog open={true} fullWidth maxWidth="xl">
            <OetrError_jsx ctx={locCtx_o}/>
            <DialogTitle sx={{
                height: "40px",
                pt: "6px",
                pb: "10px",
                mb: "14px",
                textAlign: "center",
                backgroundColor: locColors_o.backgroundDialogTitle }}>
                {locTrans_o.oeComTransGet_m("parameters", "title")}
            </DialogTitle>
            <DialogContent sx={{pb: 0, mb: 0}}>
                <LocContent_jsx ctx={locCtx_o}/>
            </DialogContent>
            <DialogActions sx={{mt: 0, mb: 0}}>
                <Button
                    onClick={(paramEvent) => locClose_f(locCtx_o, paramEvent)}
                    sx={{mr: "6px"}}>
                    {locTrans_o.oeComTransGet_m("common", "cancel")}
                </Button>
                <Button
                    disabled={!locCtx_o.parammetersCompleted}
                    variant="contained"
                    onClick={(paramEvent) => locValid_f(locCtx_o, paramEvent)}>
                    {locTrans_o.oeComTransGet_m("common", "validate")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
