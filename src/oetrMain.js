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
import React, {useState} from "react";
import {
    Box,
    createTheme, CssBaseline, ThemeProvider
} from "@mui/material";
import {enUS, frFR} from "@mui/material/locale";

/*
--- Ouestadam products
*/
import {OetrLocaleSwitcher_jsx} from "./oetrLocale";

/*=============== Local JSX components =========================*/

/*
+-------------------------------------------------------------+
! Routine    : LocHeader_jsx                                  !
! Description: JSX Header of the Main page                    !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocHeader_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    /*
    --- Create the Main page Header
    */
    return (
        <Box sx={{position: "absolute", top: "10px", right: "10px"}}>
            <OetrLocaleSwitcher_jsx ctx={locCtx_o}/>
        </Box>
    )
}

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
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
    /*
    --- Check if Window is maximized in Cookies
    */
    if (locCtx_o.cookiesManagement_o.oeComCookiesGet_m('oetrMaximized') === 'true') {
        /*
        --- Request the window maximizing
        */
        window.electronAPI.setMaximized('true');
    } else {
        /*
        --- Request the window unmaximizing
        */
        window.electronAPI.setMaximized('false');
    }
    /*
    --- Check if Window size is in Cookies
    */
    const locWindowSize_s = locCtx_o.cookiesManagement_o.oeComCookiesGet_m('oetrWindowSize');
    if (locWindowSize_s.length > 0) {
        /*
        --- Request the window resizing
        */
        window.electronAPI.setResized(locWindowSize_s);
    }
    /*
    --- Search the theme locale
    */
    let locLocale_o = frFR;
    if (locCtx_o.config_o.locale === "en-GB") locLocale_o = enUS;
    /*
    --- Get React state for refreshing the page
    */
    const [locMain_s, locMain_f] = useState(false);
    locCtx_o.refresh_o.main_f = locMain_f;
    locCtx_o.refresh_o.main_s = locMain_s;
    /*
    --- Set the application title according the locale
    */
    window.electronAPI.setTitle(locTrans_o.oeComTransGet_m("main", "title"));
    /*
    --- Update the cookie Maximize/Unmaximize if the main process detects the change
    */
    window.electronAPI.onUpdateMaximizing((paramValue) => {
        locCtx_o.cookiesManagement_o.oeComCookiesSet_m("oetrMaximized", paramValue,
            locCtx_o.cookiesManagement_o.oeComCookiesDuration_e.unlimited);
    });
    /*
    --- Update the cookie Window size if the main process detects the change
    */
    window.electronAPI.onUpdateResizing((paramValue) => {
        locCtx_o.cookiesManagement_o.oeComCookiesSet_m("oetrWindowSize", paramValue,
            locCtx_o.cookiesManagement_o.oeComCookiesDuration_e.unlimited);
    });
    /*
    --- Create the Theme
    */
    const locTheme_o = createTheme({
        palette: {
            type: "dark",
        }
    }, locLocale_o);
    /*
    --- Return the Main page
    */
    return (
        <ThemeProvider theme={locTheme_o}>
            <CssBaseline/>
            <LocHeader_jsx ctx={locCtx_o}/>
        </ThemeProvider>)
}

/*
+-------------------------------------------------------------+
! Routine    : oetrMainRefreshPage_f                          !
! Description: Request the refresh of the Main page           !
!                                                             !
! IN:  - Context                                              !
! OUT: - Nothing                                              !
+-------------------------------------------------------------+
*/
export function oetrMainRefreshPage_f(paramCtx_o) {
    paramCtx_o.refresh_o.main_s = !paramCtx_o.refresh_o.main_s;
    paramCtx_o.refresh_o.main_f(paramCtx_o.refresh_o.main_s);
}
