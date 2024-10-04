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
  !  File  : oetrEndReport.js                                   !
  !  Desc. : End reporting for rendering of oetaskreport        !
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
    Button
} from "@mui/material";
import Grid from '@mui/material/Grid2';

/*
--- Ouestadam products
*/
import {oetrMainRefreshPage_f} from "./oetrMain";
import {oetrFileMgtWriteJsonDefinitionFile_f} from "./oetrFileMgt";

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
    const locDate = new Date();
    locStartedTask_o.dateEnd = locDate.getTime();
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
  ! Routine    : OetrEndReport_jsx                              !
  ! Description: JSX End report block                           !
  !                                                             !
  ! IN:  - Properties including Context                         !
  ! OUT: - Page rendering                                       !
  +-------------------------------------------------------------+
*/
export function OetrEndReport_jsx(paramProps_o) {
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
    const locDateStart_s = locDateStart_o.getDate() + '/' + (locDateStart_o.getMonth() + 1) + '/' + locDateStart_o.getFullYear();
    const locTimeStart_s = locDateStart_o.getHours() + ':' + locDateStart_o.getMinutes();
    const locDate_s = locTrans_o.oeComTransGet_m("common", "date",
        locDateStart_s, locTimeStart_s)
    /*
    --- Return the Block
    */
    return (
        <Box style={{minHeight: "300px", position: "absolute", top: "120px", width: "100%", padding: "20px"}}>
            <Grid container spacing={2}>
                <Grid size={5} sx={{textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("endReport", "labelSelectedClient")}
                </Grid>
                <Grid size={7} sx={{textAlign: "left"}}>
                    {locStartedTask_o.client_s}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt: "8px"}}>
                <Grid size={5} sx={{textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("endReport", "labelSelectedTask")}
                </Grid>
                <Grid size={7} sx={{textAlign: "left"}}>
                    {locStartedTask_o.task_s}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt: "8px"}}>
                <Grid size={5} sx={{textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("endReport", "labelStartDate")}
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
                        {locTrans_o.oeComTransGet_m("endReport", "buttonEnd")}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
