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
import {OeComCookies_c} from "./oecommon/oeComCookies";
import {oetrMainModal_e} from "./oetrMain";

/*=============== Exported functions ===========================*/

/*+-------------------------------------------------------------+
  ! Routine    : oetrInitDefinitions_f                          !
  ! Description: Initialize the definitions object in context   !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Updated context                                      !
  +-------------------------------------------------------------+
*/
export function oetrInitDefinitions_f(paramCtx_o) {
    /*
    --- Initialise Definitions object in the context
    */
    paramCtx_o.definitions_o = {
        clients_o: {},
        startedTask_o: {
            started : false,
            client_s : "",
            task_s : "",
            dateStart : 0,
            dateEnd: 0
        }
    };
    /*
    --- Reset the current client and task
    */
    paramCtx_o.currentClient_s = "";
    paramCtx_o.currentTask_s = "";
}

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
    --- Create Cookies management object
    */
    paramCtx_o.cookiesManagement_o = new OeComCookies_c();
    /*
    --- Get the Local in cookies
    */
    paramCtx_o.config_o.locale = paramCtx_o.cookiesManagement_o.oeComCookiesGet_m("oetrLocale");
    /*
    --- If no cookie then use this one define for the Navigator
    */
    if (paramCtx_o.config_o.locale === "") {
        const locLocale = navigator.language;
        if (locLocale !== undefined) {
            paramCtx_o.config_o.locale = (locLocale.substring(0, 2).toLowerCase() === 'fr') ? 'fr-FR' : 'en-GB';
        } else {
            /*
            --- If not defined in the navigator set as English
             */
            paramCtx_o.config_o.locale = 'en-GB';
        }
    }
    /*
    --- Create Translation object
    */
    paramCtx_o.trans_o = new OeComTrans_c(paramCtx_o.config_o.locale, oetrTrans_o);
    /*
    --- In case of error: current Error information
    */
    paramCtx_o.error_o = {
        inError: false,
        message: ""
    }
    /*
    --- Current Modal
    */
    paramCtx_o.currentModal = oetrMainModal_e.noModal;
    /*
    --- Parameters are completed
    */
    paramCtx_o.parametersCompleted = false;
    /*
    --- Working directory
    */
    paramCtx_o.workingDir = paramCtx_o.cookiesManagement_o.oeComCookiesGet_m("oetrWorkingDir");
    /*
    --- Initialise the Definitions object
    */
    oetrInitDefinitions_f(paramCtx_o);
    /*
    --- Flag for not request twice reading Definitions file
    */
    paramCtx_o.definitionToBeRead = true;
    /*
    --- Current Client
    */
    paramCtx_o.currentClient_s = paramCtx_o.cookiesManagement_o.oeComCookiesGet_m("oetrCurrentClient");
    /*
    --- Current Task Name
    */
    paramCtx_o.currentTask_s = paramCtx_o.cookiesManagement_o.oeComCookiesGet_m("oetrCurrentTask");
    /*
    --- Task started flag
    */
    paramCtx_o.taskStarted = false;
}