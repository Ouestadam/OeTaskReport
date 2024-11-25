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
  !  File  : oetrMain.js                                        !
  !  Desc. : Main Entry for rendering of oetaskreport           !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 25/11/2024                                         !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import React, {useState} from "react";
import {
    Box, createTheme, CssBaseline, IconButton, Link, ThemeProvider, Tooltip
} from "@mui/material";
import {enUS, frFR} from "@mui/material/locale";
import SettingsIcon from '@mui/icons-material/Settings';
import CalculateIcon from '@mui/icons-material/Calculate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

/*
--- Ouestadam products
*/
import {OetrLocaleSwitcher_jsx} from "./oetrLocale";
import {OetrDialogParameters_jsx} from "./oetrParameters";
import {oetrFileMgtReadJsonDefinitionFile_f} from "./oetrFileMgt";
import {OetrStartTask_jsx} from "./oetrStartTask";
import {OetrDialogEndTask_jsx, OetrEndTask_jsx} from "./oetrEndTask";
import {oetrDefModal_e} from "./oetrDef";
import {OetrDialogReportMgt_jsx} from "./oetrReportMgt";
import {OetrDialogInformation_jsx} from "./oetrInformation";

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
        case oetrDefModal_e.noModal:
            return (<></>);
        case oetrDefModal_e.parametersModal:
            return (<OetrDialogParameters_jsx ctx={locCtx_o}/>);
        case oetrDefModal_e.endTaskModal:
            return (<OetrDialogEndTask_jsx ctx={locCtx_o}/>);
        case oetrDefModal_e.reportModal:
            return (<OetrDialogReportMgt_jsx ctx={locCtx_o}/>);
        case oetrDefModal_e.infoModal:
            return (<OetrDialogInformation_jsx ctx={locCtx_o}/>)
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
    const locColors_o = locCtx_o.config_o.colors_o;
    const locTrans_o = locCtx_o.trans_o;

    /*
    --- Create the Main page Header
    */
    return (
        <div>
            <Box sx={{position: "absolute", top: "14px", left: "20px"}}>
                <Tooltip title={locTrans_o.oeComTransGet_m("main", "toolTipParameters")}>
                    <IconButton
                        aria-label="Configuration"
                        size="large"
                        color="primary"
                        sx={{backgroundColor: locColors_o.backgroundIcon}}
                        onClick={() => {
                            locCtx_o.currentModal = oetrDefModal_e.parametersModal;
                            oetrMainRefreshPage_f(locCtx_o);
                        }}>
                        <SettingsIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={locTrans_o.oeComTransGet_m("main", "toolTipReport")}>
                    <IconButton
                        aria-label="Configuration"
                        size="large"
                        color="primary"
                        sx={{backgroundColor: locColors_o.backgroundIcon, ml: "10px"}}
                        onClick={() => {
                            locCtx_o.currentModal = oetrDefModal_e.reportModal;
                            oetrMainRefreshPage_f(locCtx_o);
                        }}>
                        <CalculateIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={locTrans_o.oeComTransGet_m("main", "toolTipInfo")}>
                    <IconButton
                        aria-label="Information"
                        size="large"
                        color="primary"
                        sx={{backgroundColor: locColors_o.backgroundIcon, ml: "10px"}}
                        onClick={() => {
                            locCtx_o.currentModal = oetrDefModal_e.infoModal;
                            oetrMainRefreshPage_f(locCtx_o);
                        }}>
                        <HelpOutlineIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{position: "absolute", top: "14px", right: "20px"}}>
                <OetrLocaleSwitcher_jsx ctx={locCtx_o}/>
            </Box>
        </div>
    )
}

/*
+-------------------------------------------------------------+
! Routine    : LocContent_jsx                                 !
! Description: JSX Content of the Main page                   !
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
    const locStartedTask_o = locCtx_o.definitions_o.startedTask_o;
    /*
    --- If parameters are not completed then return empty box
    */
    if ((locCtx_o.workingDir_s.length < 1) || (!locCtx_o.parametersCompleted)) return (<div></div>);
    /*
    --- Check if Reporting is started
    */
    const LocBlock_j = (locStartedTask_o.started) ?
        (<OetrEndTask_jsx ctx={locCtx_o}/>) : (<OetrStartTask_jsx ctx={locCtx_o}/>);
    /*
    --- Create the Main page Content
    */
    return (
        <div>
            {LocBlock_j}
        </div>
    )
}

/*
+-------------------------------------------------------------+
! Routine    : LocFooter_jsx                                  !
! Description: JSX Footer of the Main page                    !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocFooter_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
    /*
    --- Create the Main page Header
    */
    return (
        <div>
            <Box sx={{position: "absolute", bottom: "14px", left: "20px"}}>
                <div style={{color: locColors_o.foregroundFooter}}>
                    {"V" + locCtx_o.config_o.version}
                </div>
            </Box>
            <Box sx={{position: "absolute", bottom: "14px", right: "20px"}}>
                <Link href={locCtx_o.config_o.urlOuestadam}
                      target="_blank"
                      underline="hover"
                      color={locColors_o.foregroundFooter}
                >
                    {locTrans_o.oeComTransGet_m("main", "urlOuestadam")}
                </Link>
            </Box>
        </div>
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
    --- Read the definition file
    */
    oetrFileMgtReadJsonDefinitionFile_f(locCtx_o, oetrMainRefreshPage_f);
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
    --- Define Body color
    */
    const locBodyColor_s = "body {\nbackground: linear-gradient(to bottom right, " + locColors_o.backgroundStart +
        " 0%, " + locColors_o.backgroundEnd + " 100%);\n}";
    /*
    --- Return the Main page
    */
    return (
        <ThemeProvider theme={locTheme_o}>
            <style>
                {locBodyColor_s}
            </style>
            <CssBaseline/>
            <LocHeader_jsx ctx={locCtx_o}/>
            <LocContent_jsx ctx={locCtx_o}/>
            <LocFooter_jsx ctx={locCtx_o}/>
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
