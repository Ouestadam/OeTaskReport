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
  !  File  : oetrFileMgt.js                                     !
  !  Desc. : Files management for rendering of oetaskreport     !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 05/11/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/

/*
--- Ouestadam products
*/
import {oetrInitDefinitions_f} from "./oetrInit";
import {oetrDefModal_e} from "./oetrDef";

/*=============== Exported functions ===========================*/

/*+-------------------------------------------------------------+
  ! Routine    : oetrFileMgtReadJsonReportFile_f                !
  ! Description: Read a JSON Report File                        !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export async function oetrFileMgtReadJsonReportFile_f(paramCtx_o) {
    /*
    --- Initialisation
    */
    const locStartedTask_o = paramCtx_o.definitions_o.startedTask_o;
    const locReportDir_s = locStartedTask_o.reportDir_s;
    const locFileName_s = locReportDir_s + '/' + paramCtx_o.config_o.reportFileName;
    /*
    --- Create the directory if it doesn't exist
    */
    await window.electronAPI.createDir(locReportDir_s);
    /*
    --- Check if the monthly report file exists
    */
    const locFileExists = await window.electronAPI.fileExists(locFileName_s);
    if (!locFileExists) {
        /*
        --- File is not present then reset the Report Object and return
        */
        paramCtx_o.monthReport_o = {};
        return;
    }
    /*
    --- Read the JSON File
    */
    const locData_s = await window.electronAPI.fileRead(locFileName_s);
    if (locData_s.length > 4) {
        /*
        --- Parse only if Json is present
        */
        paramCtx_o.monthReport_o = JSON.parse(locData_s);
    } else {
        /*
        --- Not present then reset the report
        */
        paramCtx_o.monthReport_o = {};
    }
}

/*+-------------------------------------------------------------+
  ! Routine    : oetrFileMgtComputeOneJsonReportFile_f          !
  ! Description: Read and Compute one JSON Report File          !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Year                                                 !
  !      - Month                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export async function oetrFileMgtComputeOneJsonReportFile_f(paramCtx_o, paramYear_s, paramMonth_s) {
    /*
    --- Initialisation
    */
    const locTotalReport_o = paramCtx_o.reportBuild_o.report;
    const locReportDir_s = paramCtx_o.workingDir_s + '/' + paramYear_s + '/' + paramMonth_s;
    const locFileName_s = locReportDir_s + '/' + paramCtx_o.config_o.reportFileName;
    /*
    --- Check if the monthly report file exists
    */
    const locFileExists = await window.electronAPI.fileExists(locFileName_s);
    if (!locFileExists) {
        /*
        --- File is not present then return without updating the report
        */
        return;
    }
    /*
    --- Read the JSON File
    */
    const locData_s = await window.electronAPI.fileRead(locFileName_s);
    if (locData_s.length < 5) {
        /*
        --- Data are not present then return without updating the report
        */
        return;
    }
    /*
    --- Parse the Json
    */
    const locMonthReport_o = JSON.parse(locData_s);
    /*
    --- Get the list of clients
    */
    const locClients_a = Object.keys(locMonthReport_o);
    /*
    --- For each Client, get the list of associated tasks
    */
    for (let locI = 0; locI < locClients_a.length; locI++) {
        /*
        --- If the Client is not already in the report, then add it
        */
        const locClient_s = locClients_a[locI];
        if (locTotalReport_o[locClient_s] === undefined) locTotalReport_o[locClient_s] = {};
        /*
        --- For each task, accumulate the daily values
        */
        const locTasks_a = Object.keys(locMonthReport_o[locClient_s]);
        for (let locJ = 0; locJ < locTasks_a.length; locJ++) {
            /*
            --- If the Task is not already in the report, then add it
            */
            const locTask_s = locTasks_a[locJ];
            if (locTotalReport_o[locClient_s][locTask_s] === undefined) locTotalReport_o[locClient_s][locTask_s] = 0;
            /*
            --- For each day, add the number of minutes
            */
            const locDays_a = Object.keys(locMonthReport_o[locClient_s][locTask_s]);
            for (let locK = 0; locK < locDays_a.length; locK++) {
                const locDay_s = locDays_a[locK];
                locTotalReport_o[locClient_s][locTask_s] += locMonthReport_o[locClient_s][locTask_s][locDay_s];
            }
        }
    }
}

/*+-------------------------------------------------------------+
  ! Routine    : oetrFileMgtComputeAllJsonReportFile_f          !
  ! Description: Read and Compute all JSON Report Files         !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export async function oetrFileMgtComputeAllJsonReportFile_f(paramCtx_o) {
    /*
    --- Initialisation
    */
    const locReportBuild_o = paramCtx_o.reportBuild_o;
    /*
    --- Reset the current report and the selected client/task
    */
    locReportBuild_o.report = {};
    locReportBuild_o.selectedClient_s = "";
    /*
    --- If the year or the month are not selected then return without any report built
    */
    if ((locReportBuild_o.selectedYear_s.length < 1) || (locReportBuild_o.selectedMonth_s.length < 1)) return;
    /*
    --- Check if single month selected or all the year
    */
    if (locReportBuild_o.selectedMonth_s === "00") {
        /*
        --- All the year: process each existing month
        */
        for (let locI = 1; locI < locReportBuild_o.listDirMonths_a.length; locI++) {
            await oetrFileMgtComputeOneJsonReportFile_f(paramCtx_o, locReportBuild_o.selectedYear_s, locReportBuild_o.listDirMonths_a[locI]);
        }
    } else {
        /*
        --- Just one month is selected
        */
        await oetrFileMgtComputeOneJsonReportFile_f(paramCtx_o, locReportBuild_o.selectedYear_s, locReportBuild_o.selectedMonth_s);
    }
    /*
    --- Extract the sorted list of Clients
    */
    const locListClientsUnsorted_a = Object.keys(locReportBuild_o.report);
    locReportBuild_o.listClients_a = locListClientsUnsorted_a.sort();
    /*
    --- If no Client then return
    */
    if (locReportBuild_o.listClients_a.length < 1) return;
    /*
    --- Add '_All' as first client
    */
    locReportBuild_o.listClients_a.unshift('_All');
    /*
    --- Check if the current client is defined in the report else take the first one
    */
    if (locReportBuild_o.report[paramCtx_o.currentClient_s] !== undefined) {
        /*
        --- Set the selected client as the current client
        */
        locReportBuild_o.selectedClient_s = paramCtx_o.currentClient_s;
    } else {
        /*
        --- Get All the clients
        */
        locReportBuild_o.selectedClient_s = locReportBuild_o.listClients_a[0];
    }
}

/*+-------------------------------------------------------------+
  ! Routine    : oetrFileMgtWriteJsonReportFile_f               !
  ! Description: Write the JSON Report File                     !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export async function oetrFileMgtWriteJsonReportFile_f(paramCtx_o) {
    /*
    --- Initialisation
    */
    const locStartedTask_o = paramCtx_o.definitions_o.startedTask_o;
    const locReportDir_s = locStartedTask_o.reportDir_s;
    const locFileName_s = locReportDir_s + '/' + paramCtx_o.config_o.reportFileName;
    /*
    --- Create the directory if it doesn't exist
    */
    await window.electronAPI.createDir(locReportDir_s);
    /*
    --- Convert to String the report object
    */
    const locData_s = JSON.stringify(paramCtx_o.monthReport_o);
    /*
    --- Write the definition file
    */
    await window.electronAPI.fileWrite(locFileName_s, locData_s);
}

/*+-------------------------------------------------------------+
  ! Routine    : oetrFileMgtReadJsonDefinitionFile_f            !
  ! Description: Read the JSON Definition File                  !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export async function oetrFileMgtReadJsonDefinitionFile_f(paramCtx_o, paramRefresh_f) {
    /*
    --- If Working directory is not defined then return without any action
    */
    if (paramCtx_o.workingDir_s.length < 1) {
        paramCtx_o.parametersCompleted = false;
        paramCtx_o.currentModal = oetrDefModal_e.parametersModal;
        return;
    }
    /*
    --- Check if the Definition file should be read
    */
    if (!paramCtx_o.definitionToBeRead) return;
    paramCtx_o.definitionToBeRead = false;
    /*
    --- Check if the Working directory exists
    */
    const locWorkingDirExists = await window.electronAPI.fileExists(paramCtx_o.workingDir_s);
    if (!locWorkingDirExists) {
        /*
        --- Working directory is not present then reset the Definition Object set the Parameters Modal and return
        */
        paramCtx_o.workingDir_s = "";
        oetrInitDefinitions_f(paramCtx_o);
        paramCtx_o.currentModal = oetrDefModal_e.parametersModal
        if (paramRefresh_f !== undefined) paramRefresh_f(paramCtx_o);
        return;
    }
    /*
    --- Build filename
    */
    const locFileName_s = paramCtx_o.workingDir_s + "/" + paramCtx_o.config_o.definitionsFileName;
    /*
    --- Check if the Definitions file exists
    */
    const locFileExists = await window.electronAPI.fileExists(locFileName_s);
    if (!locFileExists) {
        /*
        --- File is not present then reset the Definition Object set the Parameters Modal and return
        */
        oetrInitDefinitions_f(paramCtx_o);
        paramCtx_o.currentModal = oetrDefModal_e.parametersModal
        if (paramRefresh_f !== undefined) paramRefresh_f(paramCtx_o);
        return;
    }
    /*
    --- Read the JSON File
    */
    const locData_s = await window.electronAPI.fileRead(locFileName_s);
    if (locData_s.length > 4) {
        /*
        --- Parse only if Json is present
        */
        paramCtx_o.definitions_o = JSON.parse(locData_s);
        /*
        --- Set parameters as completed
        */
        paramCtx_o.parametersCompleted = true;
    } else {
        paramCtx_o.currentModal = oetrDefModal_e.parametersModal
        oetrInitDefinitions_f(paramCtx_o);
    }
    /*
    --- Return by requesting refresh of the parameters dialog if present
    */
    if (paramRefresh_f !== undefined) paramRefresh_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : oetrFileMgtWriteJsonDefinitionFile_f           !
  ! Description: Write the JSON Definition File                 !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export async function oetrFileMgtWriteJsonDefinitionFile_f(paramCtx_o) {
    /*
    --- If Working directory is not defined then return without any action
    */
    if (paramCtx_o.workingDir_s.length < 1) return;
    /*
    --- Check if the Working directory exists
    */
    const locWorkingDirExists = await window.electronAPI.fileExists(paramCtx_o.workingDir_s);
    if (!locWorkingDirExists) return;
    /*
    --- Build filename
    */
    const locFileName_s = paramCtx_o.workingDir_s + "/" + paramCtx_o.config_o.definitionsFileName;
    /*
    --- Convert to String the Definition object
    */
    const locData_s = JSON.stringify(paramCtx_o.definitions_o);
    /*
    --- Write the definition file
    */
    await window.electronAPI.fileWrite(locFileName_s, locData_s);
}

/*+-------------------------------------------------------------+
  ! Routine    : oetrFileMgtListYears_f                         !
  ! Description: List all years in the working directory        !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export async function oetrFileMgtListYears_f(paramCtx_o) {
    /*
    --- Initialisation
    */
    const locReportBuild_o = paramCtx_o.reportBuild_o;
    locReportBuild_o.listDirYears_a = [];
    locReportBuild_o.selectedYear_s = "";
    /*
    --- If Working directory is not defined then return without any action
    */
    if (paramCtx_o.workingDir_s.length < 1) return;
    /*
    --- Read the working directory
    */
    const locListUnsorted_a = await window.electronAPI.dirRead(paramCtx_o.workingDir_s);
    const locListSorted_a = locListUnsorted_a.sort();
    /*
    --- For each element of the directory, keep only years
    */
    locListSorted_a.forEach((paramName_s) => {
        if (paramName_s.length === 4) {
            const locValue = parseInt(paramName_s);
            if ((locValue > 2000) && (locValue < 2100)) locReportBuild_o.listDirYears_a.push(paramName_s);
        }
    });
    /*
    --- Selected the most recent year
    */
    const locNbYears = locReportBuild_o.listDirYears_a.length;
    locReportBuild_o.selectedYear_s = (locNbYears > 0) ? locReportBuild_o.listDirYears_a[locNbYears - 1] : "";
}

/*+-------------------------------------------------------------+
  ! Routine    : oetrFileMgtListMonths_f                        !
  ! Description: List all Months in the Year directory          !
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export async function oetrFileMgtListMonths_f(paramCtx_o) {
    /*
    --- Initialisation
    */
    const locReportBuild_o = paramCtx_o.reportBuild_o;
    locReportBuild_o.listDirMonths_a = ["00"];
    locReportBuild_o.selectedMonth_s = "";
    /*
    --- If Working directory not defined or no selected year then return without any action
    */
    if ((paramCtx_o.workingDir_s.length < 1) || (locReportBuild_o.selectedYear_s === "")) return;
    /*
    --- Read the selected year directory
    */
    const locListUnsorted_a = await window.electronAPI.dirRead(paramCtx_o.workingDir_s + "/" + locReportBuild_o.selectedYear_s);
    const locListSorted_a = locListUnsorted_a.sort();
    /*
    --- For each element of the directory, keep only years
    */
    locListSorted_a.forEach((paramName_s) => {
        if (paramName_s.length === 2) {
            const locValue = parseInt(paramName_s);
            if ((locValue > 0) && (locValue < 13)) locReportBuild_o.listDirMonths_a.push(paramName_s);
        }
    });
    /*
    --- Selected the most recent month
    */
    const locNbMonths = locReportBuild_o.listDirMonths_a.length;
    locReportBuild_o.selectedMonth_s = (locNbMonths > 1) ? locReportBuild_o.listDirMonths_a[locNbMonths - 1] : "";
}