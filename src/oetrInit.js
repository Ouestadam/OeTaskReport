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
  !  File  : oetrInit.js                                        !
  !  Desc. : Initialisation for rendering of oetaskreport       !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 26/09/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- Ouestadam products
*/
import {OeComTrans_c} from "./oecommon/oeComTrans";
import {oetrConfig_o} from "./oetrConfig";
import {oetrTrans_o} from "./oetrTrans";

/*=============== Exported functions ===========================*/

/*+-------------------------------------------------------------+
  ! Routine    : oetrInit_f                                     !
  ! Description: Initialize the rendering context               !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Updated context                                      !
  +-------------------------------------------------------------+
*/
export function oetrInit_f(paramCtx_o) {
    /*
    --- Create Config object
    */
    paramCtx_o.config_o = oetrConfig_o;
    /*
    --- Initialize the Refresh functions
    */
    paramCtx_o.refresh_o = {};
    /*
    --- Current Window information
    */
    paramCtx_o.window_o = {
        width: 0,
        height: 0
    }
    /*
    --- Update the locale if defined in the navigator
    */
    const locLocale = navigator.language;
    if (locLocale !== undefined) {
        paramCtx_o.config_o.locale = (locLocale.substring(0, 2).toLowerCase() === 'fr') ? 'fr-FR' : 'en-GB';
    }
    /*
    --- Create Translation object
    */
    paramCtx_o.trans_o = new OeComTrans_c(paramCtx_o.config_o.locale, oetrTrans_o);
}