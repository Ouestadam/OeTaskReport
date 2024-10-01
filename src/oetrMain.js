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
  !  Modif.: 30/10/2024                                         !
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
import {OetrDialogParameters_jsx} from "./oetrParameters";

/*=============== Exported objects =============================*/
export const oetrMainModal_e = {
    noModal: 0,
    parametersModal: 1
};

/*=============== Local functions ==============================*/

/*+-------------------------------------------------------------+
  ! Routine    : locIpcExchanges_f                              !
  ! Description: Process all requires IPC Exchanges             !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locIpcExchanges_f(paramCtx_o) {
    /*
    --- Initialisation
    */
    const locTrans_o = paramCtx_o.trans_o;
    /*
    --- Check if Window is maximized in Cookies
    */
    if (paramCtx_o.cookiesManagement_o.oeComCookiesGet_m('oetrMaximized') === 'true') {
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
    const locWindowSize_s = paramCtx_o.cookiesManagement_o.oeComCookiesGet_m('oetrWindowSize');
    if (locWindowSize_s.length > 0) {
        /*
        --- Request the window resizing
        */
        window.electronAPI.setResized(locWindowSize_s);
    }
    /*
    --- Set the application title according the locale
    */
    window.electronAPI.setTitle(locTrans_o.oeComTransGet_m("main", "title"));
    /*
    --- Update the cookie Maximize/Unmaximize if the main process detects the change
    */
    window.electronAPI.onUpdateMaximizing((paramValue) => {
        paramCtx_o.cookiesManagement_o.oeComCookiesSet_m("oetrMaximized", paramValue,
            paramCtx_o.cookiesManagement_o.oeComCookiesDuration_e.unlimited);
    });
    /*
    --- Update the cookie Window size if the main process detects the change
    */
    window.electronAPI.onUpdateResizing((paramValue) => {
        paramCtx_o.cookiesManagement_o.oeComCookiesSet_m("oetrWindowSize", paramValue,
            paramCtx_o.cookiesManagement_o.oeComCookiesDuration_e.unlimited);
    });
}


/*=============== Local JSX components =========================*/

/*
+-------------------------------------------------------------+
! Routine    : LocStartModal_jsx                              !
! Description: JSX Start Modal if required                    !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocStartModal_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    /*
    --- Check if a Modal should be started
    */
    switch (locCtx_o.currentModal) {
        case oetrMainModal_e.noModal:
            return (<></>);
        case oetrMainModal_e.parametersModal:
            return (<OetrDialogParameters_jsx ctx={locCtx_o}/>);
        default:
            return (<></>);
    }
}

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
    /*
    --- Get React state for refreshing the page
    */
    const [locMain_s, locMain_f] = useState(false);
    locCtx_o.refresh_o.main_f = locMain_f;
    locCtx_o.refresh_o.main_s = locMain_s;
    /*
    --- Process all IPC exchanges
    */
    locIpcExchanges_f(locCtx_o);
    /*
    --- If Parameters are not completed then force the Parameters Modal
    */
    if (!locCtx_o.parammetersCompleted) {
        locCtx_o.currentModal = oetrMainModal_e.parametersModal;
    }
    /*
    --- Search the theme locale
    */
    let locLocale_o = frFR;
    if (locCtx_o.config_o.locale === "en-GB") locLocale_o = enUS;
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
            <LocStartModal_jsx ctx={locCtx_o}/>
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
