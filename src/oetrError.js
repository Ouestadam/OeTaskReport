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
  !  File  : oetrError.js                                       !
  !  Desc. : Error display for rendering of oetaskreport        !
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
import React from 'react';
import {Alert, AlertTitle} from "@mui/material";

/*=============== Exported JSX components ======================*/

/*+-------------------------------------------------------------+
  ! Routine    : OetrError_jsx                                  !
  ! Description: JSX Display Error message                      !
  !                                                             !
  ! IN:  - Properties including Context                         !
  ! OUT: - Page rendering                                       !
  +-------------------------------------------------------------+
*/
export function OetrError_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    /*
    --- Check if an error has been detected
    */
    if (locCtx_o.error_o.inError) {
        /*
        --- Prepare the Alert
        */
        const locAlertTitle_s = locTrans_o.comtransGet_m("main", "errorTitle");
        const  locAlertMessage_s = locCtx_o.error_o.message;
        return (
            <Alert severity="error">
                <AlertTitle>{locAlertTitle_s}</AlertTitle>
                {locAlertMessage_s}
            </Alert>
        );
    } else {
        /*
        --- No Error no alert
         */
        return (<></>);
    }
}
