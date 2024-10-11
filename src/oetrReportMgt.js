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
  !  File  : oetrReportMgt.js                                   !
  !  Desc. : Reports management for rendering of oetaskreport   !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 10/10/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/*
--- Ouestadam products
*/
import {OetrError_jsx} from "./oetrError";
import {oetrDefModal_e} from "./oetrDef";
import {oetrMainRefreshPage_f} from "./oetrMain";
import {oetrInitReportBuild_f} from "./oetrInit";
import {oetrFileMgtListMonths_f, oetrFileMgtListYears_f} from "./oetrFileMgt";

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
    --- Close the Modal
    */
    paramCtx_o.currentModal = oetrDefModal_e.noModal;
    /*
    --- Reset the Build
    */
    paramCtx_o.reportBuildReset = true;
    /*
    --- Reset the error state
    */
    paramCtx_o.error_o.inError = false;
    /*
    --- Refresh the main page
    */
    oetrMainRefreshPage_f(paramCtx_o);
}

/*=============== Local JSX components =========================*/

/*
+-------------------------------------------------------------+
! Routine    : LocContent_jsx                                 !
! Description: JSX Report build Modal content                 !
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
    const locReportBuild_o = locCtx_o.reportBuild_o;
    /*
    --- If no selected year, display a message only
    */
    if (locReportBuild_o.selectedYear_s === "") {
        return (
            <div style={{height: "70px", marginTop: "30px", width: "100%", textAlign: "center"}}>
                {locTrans_o.oeComTransGet_m("report", "noReport")}
            </div>
        );
    }

    /*
    --- Return the Dialog Content to display
    */
    return (
        <div style={{height: "600px"}}>
        </div>);
}

/*=============== Exported functions ===========================*/

/*+--------------------------------------------- ---------------+
  ! Routine    : oetrReportMgtAddDuration_f                     !
  ! Description: Add current task duration in the monthly report!
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export function oetrReportMgtAddDuration_f(paramCtx_o) {
    /*
    --- Initialisation
    */
    const locReport_o = paramCtx_o.monthReport_o;
    const locStartedTask_o = paramCtx_o.definitions_o.startedTask_o;
    const locClient_s = locStartedTask_o.client_s;
    const locTask_s = locStartedTask_o.task_s;
    const locDay_s = locStartedTask_o.day_s;
    let locDuration = locStartedTask_o.duration;
    /*
    --- If the client doesn't exist, create it
    */
    if (locReport_o[locClient_s] === undefined) locReport_o[locClient_s] = {};
    /*
    --- If the task for this client doesn't exist, create it
    */
    if (locReport_o[locClient_s][locTask_s] === undefined) locReport_o[locClient_s][locTask_s] = {};
    /*
    --- If it's not the first time of the day for this task, the add the previous duration
    */
    const locPreviousDuration = locReport_o[locClient_s][locTask_s][locDay_s];
    if (locPreviousDuration !== undefined) locDuration += locPreviousDuration;
    /*
    --- Update the report
    */
    locReport_o[locClient_s][locTask_s][locDay_s] = locDuration;
}

/*
+-------------------------------------------------------------+
! Routine : oetrReportMgtRefreshModal_f                       !
! Description: Request the refresh of the Modal               !
!                                                             !
! IN: - Context                                               !
! OUT: - Nothing                                              !
+-------------------------------------------------------------+
*/
export function oetrReportMgtRefreshModal_f(paramCtx_o) {
    paramCtx_o.refresh_o.reportMgt_s = !paramCtx_o.refresh_o.reportMgt_s;
    paramCtx_o.refresh_o.reportMgt_f(paramCtx_o.refresh_o.reportMgt_s);
}
/*=============== Exported JSX components ======================*/

/*+-------------------------------------------------------------+
  ! Routine    : OetrDialogReportMgt_jsx                        !
  ! Description: JSX Report Management Dialog                   !
  !                                                             !
  ! IN:  - Properties including Context                         !
  ! OUT: - Page rendering                                       !
  +-------------------------------------------------------------+
*/
export function OetrDialogReportMgt_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
    /*
    --- Get React state for refreshing the page
    */
    const [locReportMgt_s, locReportMgt_f] = useState(false);
    locCtx_o.refresh_o.reportMgt_f = locReportMgt_f;
    locCtx_o.refresh_o.reportMgt_s = locReportMgt_s;
    /*
    --- Check if Report build object should be reset
    */
    if (locCtx_o.reportBuildReset) {
        /*
        --- Reset the report build object
        */
        oetrInitReportBuild_f(locCtx_o);
        /*
        --- Get the list of Year directories then list of month directories
        */
        oetrFileMgtListYears_f(locCtx_o).then(()=>oetrFileMgtListMonths_f(locCtx_o)).then(()=>{
            /*
            --- Report build object is updated
            */
            locCtx_o.reportBuildReset = false;
            /*
            --- Refresh the Report Modal
            */
            oetrReportMgtRefreshModal_f(locCtx_o);
            console.log("Selected year ="+locCtx_o.reportBuild_o.selectedYear_s);
        });
    }
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
                backgroundColor: locColors_o.backgroundDialogTitle
            }}>
                {locTrans_o.oeComTransGet_m("report", "title")}
                <IconButton
                    aria-label="Close"
                    size="small"
                    sx={{position: "absolute", right: "8px"}}
                    onClick={(paramEvent) => locClose_f(locCtx_o, paramEvent)}
                >
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{pb: 0, mb: 0, mt: '30px'}}>
                <LocContent_jsx ctx={locCtx_o}/>
            </DialogContent>
            <DialogActions sx={{mt: 0, mb: 0}}>
                <Button
                    onClick={(paramEvent) => locClose_f(locCtx_o, paramEvent)}
                >
                    {locTrans_o.oeComTransGet_m("common", "return")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
