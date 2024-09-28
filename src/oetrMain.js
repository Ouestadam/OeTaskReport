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
    const locColors_o = locCtx_o.config_o.colors_o;
    const locBackGroundColor = locColors_o.backgroundMainGrey;
    /*
   --- Set hook for Window resizing
   */
    [locCtx_o.window_o.width, locCtx_o.window_o.height] = OetrMainWindowResize_f();
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
    --- Return the Main page
    */
    return (<ThemeProvider theme={locTheme_o}>
        <CssBaseline/>
        <LocHeader_jsx ctx={locCtx_o}/>
    </ThemeProvider>);
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

/*
+-------------------------------------------------------------+
! Routine    : OetrMainWindowResize_f                         !
! Description: Manage hook for Window resizing                !
!                                                             !
! IN:  - Context                                              !
! OUT: - Nothing                                              !
+-------------------------------------------------------------+
*/
export const OetrMainWindowResize_f = () => {
    const [locWindowSize, locSetWindowSize_f] = useState([0, 0])
    const locUpdateWindowSize_f = () => {
        locSetWindowSize_f([window.innerWidth, window.innerHeight])
    }
    useLayoutEffect(() => {
        window.addEventListener('resize', locUpdateWindowSize_f);
        locUpdateWindowSize_f();
        return () => window.removeEventListener('resize', locUpdateWindowSize_f);
    }, [])
    return [locWindowSize[0], locWindowSize[1]]
}

