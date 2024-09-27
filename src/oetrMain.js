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
  !  File  : main.js                                            !
  !  Desc. : Main Entry for rendering of oetaskreport           !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 26/09/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import React, {useLayoutEffect, useState} from "react";
import {
    createTheme, CssBaseline, Paper, ThemeProvider
} from "@mui/material";
import {enUS, frFR} from "@mui/material/locale";

/*=============== Exported functions ===========================*/

/*+-------------------------------------------------------------+
! Routine    : OetrMainEntry_jsx                                !
! Description: Main Page function                               !
!                                                               !
! IN:  - Context                                                !
! OUT: - Main page rendering                                    !
+---------------------------------------------------------------+
*/
export function OetrMainEntry_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locColors_o = locCtx_o.config_o.colors_o;
    const locBackGroundColor = locColors_o.backgroundMainGrey;
    /*
    --- Search the theme locale
    */
    let locLocale_o = frFR;
    if (locCtx_o.config_o.locale === "en-GB") locLocale_o = enUS;
    /*
    --- Get React state for refreshing the page
    */
    const [locMain_s, locMain_f] = React.useState(false);
    locCtx_o.refresh_o.main_f = locMain_f;
    locCtx_o.refresh_o.main_s = locMain_s;
    /*
    --- Create the Theme
    */
    const locTheme_o = createTheme({
        palette: {
            background: {
                default: locBackGroundColor
            }
        }
    }, locLocale_o);
    /*
    --- Set a Background image according the window width
    */
    const locStyle_o = {
        background: "linear-gradient(to bottom right, " + locColors_o.backgroundStart + " 0%, " +
            locColors_o.backgroundEnd + " 100%)",
        width: "100%",
        height: "100%"
    };
    /*
    --- Return the Main page
    */
    return (<ThemeProvider theme={locTheme_o}>
        <CssBaseline/>
        <div style={locStyle_o}>
            <h1>💖 Hello World!</h1>
            <p>Welcome to your Electron application.</p>
        </div>
    </ThemeProvider>);
}


