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
  !  File  : oetrStartReport.js                                 !
  !  Desc. : Start reporting for rendering of oetaskreport      !
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
import React from 'react';
import {
    Box,
    Button, FormControl,
    MenuItem,
    Select
} from "@mui/material";
import Grid from '@mui/material/Grid2';

/*
--- Ouestadam products
*/
import {oetrMainRefreshPage_f} from "./oetrMain";
import {oetrFileMgtWriteJsonDefinitionFile_f} from "./oetrFileMgt";

/*=============== Local functions ==============================*/

/*+-------------------------------------------------------------+
  ! Routine    : locStart_f                                     !
  ! Description: Handle the Start Button                        !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locStart_f(paramCtx_o, paramEvent) {
    /*
    --- Initialisation
    */
    const locStartedTask_o = paramCtx_o.definitions_o.startedTask_o;
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Declare the Task as started
    */
    locStartedTask_o.started = true;
    /*
    --- Save the current client and task
    */
    locStartedTask_o.client_s = paramCtx_o.currentClient_s;
    locStartedTask_o.task_s = paramCtx_o.currentTask_s;
    /*
    --- Save the current date in milliseconds
    */
    locStartedTask_o.dateStart = paramCtx_o.date_o.oeComDateStringMilliseconds_m();
    /*
    --- Save the Definition file
    */
    oetrFileMgtWriteJsonDefinitionFile_f(paramCtx_o);
    /*
    --- Refresh the main page
    */
    oetrMainRefreshPage_f(paramCtx_o);
}

/*=============== Exported JSX components ======================*/

/*+-------------------------------------------------------------+
  ! Routine    : OetrStartReport_jsx                            !
  ! Description: JSX Start report block                         !
  !                                                             !
  ! IN:  - Properties including Context                         !
  ! OUT: - Page rendering                                       !
  +-------------------------------------------------------------+
*/
export function OetrStartReport_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
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
    --- If current client is empty and list of clients is not empty, then the current client is the first of list
    */
    if ((locCtx_o.currentClient_s.length < 1) && (locClients_a.length > 0)) locCtx_o.currentClient_s = locClients_a[0];
    /*
    --- If current task is empty and list of tasks is not empty, then the current task is the first of list
    */
    if ((locCtx_o.currentTask_s.length < 1) && (locTasks_a.length > 0)) locCtx_o.currentTask_s = locTasks_a[0];
    /*
    --- Return the Block
    */
    return (
        <Box style={{minHeight: "300px", position: "absolute", top: "120px", width: "100%", padding: "20px"}}>
            <Grid container spacing={2}>
                <Grid size={4} sx={{pt: "6px", textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("startReport", "labelSelectClient")}
                </Grid>
                <Grid size={8} sx={{textAlign: "left"}}>
                    <FormControl variant="filled" fullWidth size="small"
                                 sx={{
                                     width: "350px",
                                     backgroundColor: locColors_o.backgroundSelect
                                 }}>
                        <Select
                            id="oetrParamSelectClient"
                            value={locCtx_o.currentClient_s}
                            defaultValue={locCtx_o.currentClient_s}
                            variant="filled"
                            size="small"
                            sx={{pb: "14px", height: "30px"}}
                            onChange={(paramEvent) => {
                                locCtx_o.currentClient_s = paramEvent.target.value;
                                locCtx_o.currentTask_s = "";
                                oetrMainRefreshPage_f(locCtx_o);
                            }}
                        >
                            {locClients_a.map((paramClient) => (
                                <MenuItem key={"itemClient" + paramClient}
                                          value={paramClient}>{paramClient}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt: "20px"}}>
                <Grid size={4} sx={{pt: "6px", textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("startReport", "labelSelectTask")}
                </Grid>
                <Grid size={8} sx={{textAlign: "left"}}>
                    <FormControl variant="filled" fullWidth size="small"
                                 sx={{
                                     width: "350px",
                                     backgroundColor: locColors_o.backgroundSelect
                                 }}>
                        <Select
                            id="oetrParamSelectTask"
                            value={locCtx_o.currentTask_s}
                            defaultValue={locCtx_o.currentTask_s}
                            variant="filled"
                            size="small"
                            sx={{pb: "14px", height: "30px"}}
                            onChange={(paramEvent) => {
                                locCtx_o.currentTask_s = paramEvent.target.value;
                                oetrMainRefreshPage_f(locCtx_o);
                            }}
                        >
                            {locTasks_a.map((paramTask) => (
                                <MenuItem key={"itemTask" + paramTask}
                                          value={paramTask}>{paramTask}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt: "50px"}}>
                <Grid size={4}>
                </Grid>
                <Grid size={8} sx={{textAlign: "left"}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(paramEvent) => locStart_f(locCtx_o, paramEvent)}
                    >
                        {locTrans_o.oeComTransGet_m("startReport", "buttonStart")}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
