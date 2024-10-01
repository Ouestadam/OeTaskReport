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
function locValid_f(paramCtx_o, paramEvent) {
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
    console.log("Dir="+locWorkingDir);
    /*
    --- Refresh the Parameters dialog
    */
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
    --- Return the Dialog Content to display
    */
    return (
        <div>
            <Button
                variant="contained"
                onClick={(paramEvent) => locGetFolderPath_f(locCtx_o, paramEvent)}>
                {locTrans_o.oeComTransGet_m("parameters", "getFolderPath")}
            </Button>
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
            <DialogTitle sx={{textAlign: "center"}}>
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
