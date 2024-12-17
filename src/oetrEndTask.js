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
  !  File  : oetrEndTask.js                                     !
  !  Desc. : End task for rendering of oetaskreport             !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 17/12/2024                                         !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import React from 'react';
import {
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Switch
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import CloseIcon from "@mui/icons-material/Close";

/*
--- Ouestadam products
*/
import {oetrMainRefreshPage_f} from "./oetrMain";
import {
    oetrFileMgtReadJsonReportFile_f,
    oetrFileMgtWriteJsonDefinitionFile_f,
    oetrFileMgtWriteJsonReportFile_f
} from "./oetrFileMgt";
import {oetrDefModal_e} from "./oetrDef";
import {OetrError_jsx} from "./oetrError";
import {oetrReportMgtAddDuration_f, oetrReportMgtRefreshModal_f} from "./oetrReportMgt";

/*=============== Local functions ==============================*/

/*+-------------------------------------------------------------+
  ! Routine    : locEnd_f                                       !
  ! Description: Handle the End Button                          !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locEnd_f(paramCtx_o, paramEvent) {
    /*
    --- Initialisation
    */
    const locStartedTask_o = paramCtx_o.definitions_o.startedTask_o;
    const locNow_o = new Date();
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Declare the Task as ended
    */
    locStartedTask_o.started = false;
    /*
    --- Save the current end date in milliseconds
    */
    locStartedTask_o.dateEnd = paramCtx_o.date_o.oeComDateStringMilliseconds_m(locNow_o);
    /*
    --- Save current year and month in string
    */
    locStartedTask_o.year_s = paramCtx_o.date_o.oeComDateStringYear_m(locNow_o);
    locStartedTask_o.month_s = paramCtx_o.date_o.oeComDateStringMonthNumber_m(locNow_o);
    locStartedTask_o.day_s = paramCtx_o.date_o.oeComDateStringDay_m(locNow_o);
    /*
    --- Save current report directory
    */
    locStartedTask_o.reportDir_s = paramCtx_o.workingDir_s + '/' + locStartedTask_o.year_s + '/' + locStartedTask_o.month_s;
    /*
    --- Save the duration in minutes
    */
    locStartedTask_o.duration = (locStartedTask_o.dateEnd > locStartedTask_o.dateStart) ?
        Math.round((locStartedTask_o.dateEnd - locStartedTask_o.dateStart) / 60000) : 0;
    /*
    --- Check if Rounding is required
    */
    if (paramCtx_o.isRounding) {
        const locNbHours = Math.round(locStartedTask_o.duration / 60);
        locStartedTask_o.duration = locNbHours * 60;
    }
    /*
    --- Save the Definition file
    */
    oetrFileMgtWriteJsonDefinitionFile_f(paramCtx_o);
    /*
    --- Set new Modal as End task modal
    */
    paramCtx_o.currentModal = oetrDefModal_e.endTaskModal;
    /*
    --- Refresh the main page
    */
    oetrMainRefreshPage_f(paramCtx_o);
}

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
    paramCtx_o.currentModal = oetrDefModal_e.noModal;
    /*
    --- Read the current Report file if exists
    */
    await oetrFileMgtReadJsonReportFile_f(paramCtx_o);
    /*
    --- Add the task duration in the monthly report
    */
    oetrReportMgtAddDuration_f(paramCtx_o);
    /*
    --- Save the updated report
    */
    await oetrFileMgtWriteJsonReportFile_f(paramCtx_o);
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
! Routine    : LocTaskInfo_jsx                                !
! Description: JSX Display task information                   !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocTaskInfo_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locStartedTask_o = locCtx_o.definitions_o.startedTask_o;
    /*
    --- Get the start date in string
    */
    const locDateStart_o = new Date(locStartedTask_o.dateStart);
    const locDateStart_s = locCtx_o.date_o.oeComDateStringDateTime_m(locDateStart_o);
    /*
    --- Get the end date, if exists, in string
    */
    let locDateEnd_s = "";
    let locDuration_s = "";
    if (locStartedTask_o.dateEnd > locStartedTask_o.dateStart) {
        const locDateEnd_o = new Date(locStartedTask_o.dateEnd);
        locDateEnd_s = locCtx_o.date_o.oeComDateStringDateTime_m(locDateEnd_o);
        const locDurationHours = Math.floor(locStartedTask_o.duration / 60);
        const locDurationMinutes = locStartedTask_o.duration - (locDurationHours * 60);
        locDuration_s = locTrans_o.oeComTransGet_m("endTask", "durationMinutes",
            locStartedTask_o.duration);
        if (locDurationHours > 0) locDuration_s += locTrans_o.oeComTransGet_m("endTask", "durationHours",
            locDurationHours, locDurationMinutes);
    }
    /*
    --- Return the task information
    */
    return (
        <div>
            <Grid container spacing={2}>
                <Grid size={6} sx={{textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("endTask", "labelSelectedClient")}
                </Grid>
                <Grid size={6} sx={{textAlign: "left"}}>
                    {locStartedTask_o.client_s}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt: "8px"}}>
                <Grid size={6} sx={{textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("endTask", "labelSelectedTask")}
                </Grid>
                <Grid size={6} sx={{textAlign: "left"}}>
                    {locStartedTask_o.task_s}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt: "8px"}}>
                <Grid size={6} sx={{textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("endTask", "labelStartDate")}
                </Grid>
                <Grid size={6} sx={{textAlign: "left"}}>
                    {locDateStart_s}
                </Grid>
            </Grid>
            <div style={{display: (locStartedTask_o.dateEnd > locStartedTask_o.dateStart) ? 'block' : 'none'}}>
                <Grid container spacing={2} sx={{mt: "8px"}}>
                    <Grid size={6} sx={{textAlign: "right"}}>
                        {locTrans_o.oeComTransGet_m("endTask", "labelEndDate")}
                    </Grid>
                    <Grid size={6} sx={{textAlign: "left"}}>
                        {locDateEnd_s}
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mt: "8px"}}>
                    <Grid size={6} sx={{textAlign: "right"}}>
                        {locTrans_o.oeComTransGet_m("endTask", "labelSwitchRound")}
                    </Grid>
                    <Grid size={6} sx={{textAlign: "left"}}>
                        <Switch defaultChecked={locCtx_o.isRounding}
                                onChange={(paramEvent) => {
                                    locCtx_o.isRounding = !locCtx_o.isRounding;
                                    localStorage.setItem("oetrIsRounding", locCtx_o.isRounding);
                                    locEnd_f(locCtx_o, paramEvent);
                                }}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mt: "8px"}}>
                    <Grid size={6} sx={{textAlign: "right"}}>
                        {locTrans_o.oeComTransGet_m("endTask", "labelDuration")}
                    </Grid>
                    <Grid size={6} sx={{textAlign: "left"}}>
                        {locDuration_s}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

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
    /*
    --- Return the Dialog Content to display
    */
    return (
        <div style={{height: "220px"}}>
            <LocTaskInfo_jsx ctx={locCtx_o}/>
        </div>);
}

/*=============== Exported JSX components ======================*/

/*+-------------------------------------------------------------+
  ! Routine    : OetrEndTask_jsx                                !
  ! Description: JSX End task block                             !
  !                                                             !
  ! IN:  - Properties including Context                         !
  ! OUT: - Page rendering                                       !
  +-------------------------------------------------------------+
*/
export function OetrEndTask_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    /*
    --- Return the Block
    */
    return (
        <Box style={{minHeight: "300px", position: "absolute", top: "150px", width: "100%", padding: "20px"}}>
            <LocTaskInfo_jsx ctx={locCtx_o}/>
            <Box sx={{mt: '50px', width: '100%', textAlign: 'center'}}>
                <Button
                    aria-label="End Task"
                    variant="contained"
                    color="error"
                    onClick={(paramEvent) => locEnd_f(locCtx_o, paramEvent)}
                >
                    {locTrans_o.oeComTransGet_m("endTask", "buttonEnd")}
                </Button>
            </Box>
        </Box>
    );
}

/*+-------------------------------------------------------------+
  ! Routine    : OetrDialogEndTask_jsx                          !
  ! Description: JSX End Task Dialog                            !
  !                                                             !
  ! IN:  - Properties including Context                         !
  ! OUT: - Page rendering                                       !
  +-------------------------------------------------------------+
*/
export function OetrDialogEndTask_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
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
                {locTrans_o.oeComTransGet_m("endTask", "title")}
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
                    variant="contained"
                    color="error"
                    onClick={(paramEvent) => locClose_f(locCtx_o, paramEvent)}
                    sx={{mr: "6px"}}>
                    {locTrans_o.oeComTransGet_m("endTask", "buttonCancel")}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={(locCtx_o.definitions_o.startedTask_o.duration < 1)}
                    onClick={(paramEvent) => locValid_f(locCtx_o, paramEvent)}>
                    {locTrans_o.oeComTransGet_m("endTask", "buttonSave")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
