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
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton, MenuItem,
    Select
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/*
--- Ouestadam products
*/
import {OetrError_jsx} from "./oetrError";
import {oetrDefModal_e} from "./oetrDef";
import {oetrMainRefreshPage_f} from "./oetrMain";
import {oetrInitReportBuild_f} from "./oetrInit";
import {oetrFileMgtComputeAllJsonReportFile_f, oetrFileMgtListMonths_f, oetrFileMgtListYears_f} from "./oetrFileMgt";
import Grid from "@mui/material/Grid2";

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
! Routine    : LocSelectYear_jsx                              !
! Description: JSX Select Year field                          !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocSelectYear_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locColors_o = locCtx_o.config_o.colors_o;
    const locReportBuild_o = locCtx_o.reportBuild_o;
    /*
    --- Return the Select Year field
    */
    return (
        <FormControl variant="filled" size="small"
                     sx={{
                         width: "100px",
                         backgroundColor: locColors_o.backgroundSelect
                     }}>
            <Select
                id="oetrReportSelectYear"
                value={locReportBuild_o.selectedYear_s}
                defaultValue={locReportBuild_o.selectedYear_s}
                variant="standard"
                sx={{pl: "14px", pt: "4px"}}
                onChange={(paramEvent) => {
                    locReportBuild_o.selectedYear_s = paramEvent.target.value;
                    oetrFileMgtListMonths_f(locCtx_o).then(() => oetrReportMgtRefreshModal_f(locCtx_o));
                }}
            >
                {locReportBuild_o.listDirYears_a.map((paramYear) => (
                    <MenuItem key={"itemYear" + paramYear}
                              value={paramYear}>{paramYear}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

/*
+-------------------------------------------------------------+
! Routine    : LocSelectMonth_jsx                             !
! Description: JSX Select Month field                         !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocSelectMonth_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
    const locReportBuild_o = locCtx_o.reportBuild_o;
    /*
    --- If no selected month then return a simple text
    */
    if (locReportBuild_o.selectedMonth_s.length < 1) return (
        <div>
            {locTrans_o.oeComTransGet_m("report", "noMonth")}
        </div>
    )
    /*
    --- Return the Select Month field
    */
    return (
        <FormControl variant="filled" size="small"
                     sx={{
                         width: "200px",
                         backgroundColor: locColors_o.backgroundSelect
                     }}>
            <Select
                id="oetrReportSelectMonth"
                value={locReportBuild_o.selectedMonth_s}
                defaultValue={locReportBuild_o.selectedMonth_s}
                variant="standard"
                sx={{pl: "14px", pt: "4px"}}
                onChange={(paramEvent) => {
                    locReportBuild_o.selectedMonth_s = paramEvent.target.value;
                    oetrFileMgtComputeAllJsonReportFile_f(locCtx_o).then(() => oetrReportMgtRefreshModal_f(locCtx_o));
                }}
            >
                {locReportBuild_o.listDirMonths_a.map((paramMonth) => (
                    <MenuItem key={"itemMonth" + paramMonth}
                              value={paramMonth}>
                        {locTrans_o.oeComTransGet_m("months", paramMonth)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

/*
+-------------------------------------------------------------+
! Routine    : LocSelectClient_jsx                            !
! Description: JSX Select Client field                        !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocSelectClient_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
    const locReportBuild_o = locCtx_o.reportBuild_o;
    /*
    --- If no selected client then return a simple text
    */
    if ((locReportBuild_o.selectedMonth_s.length < 1) || (locReportBuild_o.selectedClient_s.length < 1)) return (
        <div>
            {locTrans_o.oeComTransGet_m("report", "noClient")}
        </div>
    )
    /*
    --- Return the Select Client field
    */
    return (
        <FormControl variant="filled" size="small"
                     sx={{
                         width: "350px",
                         backgroundColor: locColors_o.backgroundSelect
                     }}>
            <Select
                id="oetrReportSelectClient"
                value={locReportBuild_o.selectedClient_s}
                defaultValue={locReportBuild_o.selectedClient_s}
                variant="standard"
                sx={{pl: "14px", pt: "4px"}}
                onChange={(paramEvent) => {
                    locReportBuild_o.selectedClient_s = paramEvent.target.value;
                    oetrReportMgtRefreshModal_f(locCtx_o);
                }}
            >
                {locReportBuild_o.listClients_a.map((paramClient) => (
                    <MenuItem key={"itemClient" + paramClient}
                              value={paramClient}>
                        {(paramClient === '_All') ?
                            locTrans_o.oeComTransGet_m("clients", paramClient) : paramClient
                        }
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

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
            <div>
                {locTrans_o.oeComTransGet_m("report", "labelSelectDate")}
            </div>
            <Grid container spacing={1} sx={{mt: "8px"}}>
                <Grid size={6}>
                    <LocSelectYear_jsx ctx={locCtx_o}/>
                </Grid>
                <Grid size={6}>
                    <LocSelectMonth_jsx ctx={locCtx_o}/>
                </Grid>
            </Grid>
            <div style={{marginTop: "20px"}}>
                {locTrans_o.oeComTransGet_m("report", "labelSelectClient")}
            </div>
            <Grid container spacing={1} sx={{mt: "8px"}}>
                <Grid size={6}>
                    <LocSelectClient_jsx ctx={locCtx_o}/>
                </Grid>
                <Grid size={6}>
                </Grid>
            </Grid>
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
        oetrFileMgtListYears_f(locCtx_o).then(() =>
            oetrFileMgtListMonths_f(locCtx_o).then(() =>
                oetrFileMgtComputeAllJsonReportFile_f(locCtx_o).then(() => {
                    /*
                    --- Report build object is updated
                    */
                    locCtx_o.reportBuildReset = false;
                    /*
                    --- Refresh the Report Modal
                    */
                    oetrReportMgtRefreshModal_f(locCtx_o);
                })));
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
            <DialogContent sx={{pb: 0, mb: 0, mt: '10px'}}>
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
