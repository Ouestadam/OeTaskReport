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

/*
--- Ouestadam products
*/

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
