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
  !  Modif.: 27/09/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import React from 'react';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
/*
--- Ouestadam products
*/
import {oetrMainRefreshPage_f} from "./oetrMain";
import flagFrench from "./assets/flagFrench.png";
import flagUK from "./assets/flagUK.png";


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
    const locColors_o = locCtx_o.config_o.colors_o;

    /*
    --- Return the Switcher
    */
    return (
        <ToggleButtonGroup
            orientation="horizontal"
            value={locCtx_o.config_o.locale}
            exclusive
            size="small"
            style={{backgroundColor: locColors_o.backgroundIcon, color: locColors_o.backgroundMainBlack}}
            onChange={(paramEvent, paramLocale) => {
                if (paramLocale) {
                    locCtx_o.config_o.locale = paramLocale;
                    locCtx_o.trans_o.oeComTransChangeLocale_m(paramLocale);
                    oetrMainRefreshPage_f(locCtx_o);
                }
            }}
        >
            <ToggleButton value="fr-FR" aria-label="fr-FR" sx={{margin: 0, padding: 0}}>
                <img src={flagFrench} alt="French"/>
            </ToggleButton>
            <ToggleButton value="en-GB" aria-label="en-GB" sx={{margin: 0, padding: 0}}>
                <img src={flagUK} alt="English"/>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
