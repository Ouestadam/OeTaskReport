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
  !  File  : oetrEndTask.js                                     !
  !  Desc. : End task for rendering of oetaskreport             !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 08/10/2024                                         !
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
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import Grid from '@mui/material/Grid2';

/*
--- Ouestadam products
*/
import {oetrMainRefreshPage_f} from "./oetrMain";
import {oetrFileMgtReadJsonDefinitionFile_f, oetrFileMgtWriteJsonDefinitionFile_f} from "./oetrFileMgt";
import {oetrDefFocus_e, oetrDefModal_e} from "./oetrDef";
import {OetrError_jsx} from "./oetrError";
import {oetrParametersRefreshModal_f} from "./oetrParameters";

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
    locStartedTask_o.dateEnd = paramCtx_o.date_o.oeComDateStringMilliseconds_m();
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
    --- Read the Definitions JSON file if present
    */
    oetrFileMgtReadJsonDefinitionFile_f(locCtx_o, oetrParametersRefreshModal_f);
    /*
    --- Build list of clients
    */
    const locClients_a = Object.keys(locCtx_o.definitions_o.clients_o);
    /*
    --- Build list of task if current client exists
    */
    const locTasks_a = ((locClients_a.length > 0) && (locCtx_o.currentClient_s.length > 0) &&
        (locCtx_o.definitions_o.clients_o[locCtx_o.currentClient_s] !== undefined)) ?
        Object.keys(locCtx_o.definitions_o.clients_o[locCtx_o.currentClient_s]) : [];
    /*
    --- If one task exists then set parameters as completed
    */
    locCtx_o.parametersCompleted = (locTasks_a.length > 0);
    /*
    --- If current client is empty and list of clients is not empty, then the current client is the first of list
    */
    if ((locCtx_o.currentClient_s.length < 1) && (locClients_a.length > 0)) locCtx_o.currentClient_s = locClients_a[0];
    /*
    --- If current task is empty and list of tasks is not empty, then the current task is the first of list
    */
    if ((locCtx_o.currentTask_s.length < 1) && (locTasks_a.length > 0)) locCtx_o.currentTask_s = locTasks_a[0];
    /*
    --- Set the Focus
    */
    if (locCtx_o.workingDir.length < 1) {
        /*
        --- Set focus on select Working Directory
        */
        locCtx_o.focus = oetrDefFocus_e.parametersWorkingDir;
    } else if (locCtx_o.focus !== oetrDefFocus_e.parametersEntryTask) {
        /*
        --- Set focus on Entry Client
        */
        locCtx_o.focus = oetrDefFocus_e.parametersEntryClient;
    }
    /*
    --- Return the Dialog Content to display
    */
    return (
        <div style={{minHeight: "300px"}}>

        </div>);
}

/*=============== Exported functions ===========================*/

/*
+-------------------------------------------------------------+
! Routine : oetrEndTaskRefreshModal_f                         !
! Description: Request the refresh of the Modal               !
!                                                             !
! IN: - Context                                               !
! OUT: - Nothing                                              !
+-------------------------------------------------------------+
*/
export function oetrEndTaskRefreshModal_f(paramCtx_o) {
    paramCtx_o.refresh_o.endTask_s = !paramCtx_o.refresh_o.endTask_s;
    paramCtx_o.refresh_o.endTask_f(paramCtx_o.refresh_o.endTask_s);
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
    const locStartedTask_o = locCtx_o.definitions_o.startedTask_o;
    /*
    --- Get the start date in string
    */
    const locDate_o = new Date(locStartedTask_o.dateStart);
    const locDate_s = locCtx_o.date_o.oeComDateStringDateTime_m(locDate_o);
    /*
    --- Return the Block
    */
    return (
        <Box style={{minHeight: "300px", position: "absolute", top: "120px", width: "100%", padding: "20px"}}>
            <Grid container spacing={2}>
                <Grid size={5} sx={{textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("endTask", "labelSelectedClient")}
                </Grid>
                <Grid size={7} sx={{textAlign: "left"}}>
                    {locStartedTask_o.client_s}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt: "8px"}}>
                <Grid size={5} sx={{textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("endTask", "labelSelectedTask")}
                </Grid>
                <Grid size={7} sx={{textAlign: "left"}}>
                    {locStartedTask_o.task_s}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt: "8px"}}>
                <Grid size={5} sx={{textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("endTask", "labelStartDate")}
                </Grid>
                <Grid size={7} sx={{textAlign: "left"}}>
                    {locDate_s}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt: "50px"}}>
                <Grid size={5}>
                </Grid>
                <Grid size={7} sx={{textAlign: "left"}}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={(paramEvent) => locEnd_f(locCtx_o, paramEvent)}
                    >
                        {locTrans_o.oeComTransGet_m("endTask", "buttonEnd")}
                    </Button>
                </Grid>
            </Grid>
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
    --- Get React state for refreshing the page
    */
    const [locEndTask_s, locEndTask_f] = useState(false);
    locCtx_o.refresh_o.endTask_f = locEndTask_f;
    locCtx_o.refresh_o.endTask_s = locEndTask_s;
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
            </DialogTitle>
            <DialogContent sx={{pb: 0, mb: 0}}>
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
                    onClick={(paramEvent) => locValid_f(locCtx_o, paramEvent)}>
                    {locTrans_o.oeComTransGet_m("endTask", "buttonSave")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
