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
  !  Modif.: 10/10/2024                                         !
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
import {oetrDefFocus_e, oetrDefModal_e} from "./oetrDef";
import {OeComDate_c} from "./oecommon/oeComDate";

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
            started: false,
            client_s: "",
            task_s: "",
            dateStart: 0,
            dateEnd: 0,
            year_s: "",
            month_s: "",
            day_s: "",
            reportDir_s: "",
            duration: 0
        }
    };
    /*
    --- Reset the current client and task
    */
    paramCtx_o.currentClient_s = "";
    paramCtx_o.currentTask_s = "";
}

/*+-------------------------------------------------------------+
  ! Routine    : oetrInitReportBuild_f                          !
  ! Description: Initialize the Report build object in context  !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Updated context                                      !
  +-------------------------------------------------------------+
*/
export function oetrInitReportBuild_f(paramCtx_o) {
    /*
    --- Initialise Definitions object in the context
    */
    paramCtx_o.reportBuild_o = {
        selectedYear_s: "",
        selectedMonth_s: "",
        selectedClient_s: "",
        selectedTask_s: "",
        listDirYears_a: [],
        listDirMonths_a: [],
        report: {}
    };
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
    --- Create Date Object
    */
    paramCtx_o.date_o = new OeComDate_c(paramCtx_o.config_o.locale);
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
    paramCtx_o.currentModal = oetrDefModal_e.noModal;
    /*
    --- Parameters are completed
    */
    paramCtx_o.parametersCompleted = false;
    /*
    --- Working directory
    */
    paramCtx_o.workingDir_s = paramCtx_o.cookiesManagement_o.oeComCookiesGet_m("oetrWorkingDir");
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
    /*
    --- Reset Focus
    */
    paramCtx_o.focus = oetrDefFocus_e.noFocus;
    /*
    --- Current Month report
    */
    paramCtx_o.monthReport_o = {};
    /*
    --- Initialise report consolidation object
    */
    oetrInitReportBuild_f(paramCtx_o);
    /*
    --- Set if report consolidation should be reset
    */
    paramCtx_o.reportBuildReset = true;
}