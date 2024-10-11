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
  !  File  : oetrLocale.js                                      !
  !  Desc. : Locale switcher for rendering of oetaskreport       !
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
import {ToggleButton, ToggleButtonGroup, Tooltip} from "@mui/material";
/*
--- Ouestadam products
*/
import {oetrMainRefreshPage_f} from "./oetrMain";
import flagOnFrench from "./assets/flagOnFrench.png";
import flagOffFrench from "./assets/flagOffFrench.png";
import flagOnUK from "./assets/flagOnUK.png";
import flagOffUK from "./assets/flagOffUK.png";


/*=============== Exported JSX components ======================*/

/*+-------------------------------------------------------------+
  ! Routine    : OetrLocaleSwitcher_jsx                         !
  ! Description: JSX Locale switcher                            !
  !                                                             !
  ! IN:  - Properties including Context                         !
  ! OUT: - Page rendering                                       !
  +-------------------------------------------------------------+
*/
export function OetrLocaleSwitcher_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;

    /*
    --- Return the Switcher
    */
    return (
        <ToggleButtonGroup
            orientation="horizontal"
            value={locCtx_o.config_o.locale}
            exclusive
            size="small"
            onChange={(paramEvent, paramLocale) => {
                if (paramLocale) {
                    locCtx_o.config_o.locale = paramLocale;
                    locCtx_o.trans_o.oeComTransChangeLocale_m(paramLocale);
                    locCtx_o.date_o.oeComDateChangeLocale_m(paramLocale);
                    locCtx_o.cookiesManagement_o.oeComCookiesSet_m("oetrLocale",
                        paramLocale, locCtx_o.cookiesManagement_o.oeComCookiesDuration_e.unlimited);
                    oetrMainRefreshPage_f(locCtx_o);
                }
            }}
        >
            <Tooltip title="Français">
                <ToggleButton value="fr-FR" aria-label="fr-FR" sx={{padding: 0, mr: "4px"}}>
                    <img src={locCtx_o.config_o.locale === "fr-FR" ? flagOnFrench : flagOffFrench} alt="French"/>
                </ToggleButton>
            </Tooltip>
            <Tooltip title="English">
                <ToggleButton value="en-GB" aria-label="en-GB" sx={{padding: 0}}>
                    <img src={locCtx_o.config_o.locale === "en-GB" ? flagOnUK : flagOffUK} alt="English"/>
                </ToggleButton>
            </Tooltip>
        </ToggleButtonGroup>
    );
}
