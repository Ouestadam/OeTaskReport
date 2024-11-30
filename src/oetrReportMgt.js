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
  !  File  : oetrReportMgt.js                                   !
  !  Desc. : Reports management for rendering of oetaskreport   !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 21/11/2024                                         !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import React, {useState} from 'react';
import {
    Box,
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider,
    FormControl,
    IconButton, MenuItem,
    Select, Switch
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";

/*
--- Ouestadam products
*/
import {OetrError_jsx} from "./oetrError";
import {oetrDefModal_e, oetrDefSelectAll} from "./oetrDef";
import {oetrMainRefreshPage_f} from "./oetrMain";
import {oetrInitReportBuild_f} from "./oetrInit";
import {oetrFileMgtComputeAllJsonReportFile_f, oetrFileMgtListMonths_f, oetrFileMgtListYears_f} from "./oetrFileMgt";
import {DataGrid} from "@mui/x-data-grid";

/*=============== Local functions ==============================*/

/*+-------------------------------------------------------------+
  ! Routine    : locClose_f                                     !
  ! Description: Handle the Cancel Button                       !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locClose_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Close the Modal
    */
    paramCtx_o.currentModal = oetrDefModal_e.noModal;
    /*
    --- Reset the Build
    */
    paramCtx_o.reportBuildReset = true;
    /*
    --- Reset the error state
    */
    paramCtx_o.error_o.inError = false;
    /*
    --- Refresh the main page
    */
    oetrMainRefreshPage_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : locReportToText_f                              !
  ! Description: Convert the report to text                     !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Characters for End of Cell                           !
  !      - Characters for End of Line                           !
  ! OUT: - Report in a String                                   !
  +-------------------------------------------------------------+
*/
function locReportToText_f(paramCtx_o, paramEndCell_s, paramEndLine_s) {
    /*
    --- Initialisation
    */
    const locTrans_o = paramCtx_o.trans_o;
    const locReportBuild_o = paramCtx_o.reportBuild_o;
    const locRows_a = locReportBuild_o.rows_a;
    let locText_s = "";
    /*
    --- Add the Client
    */
    locText_s += locTrans_o.oeComTransGet_m("report", "labelReportClient") + ":" + paramEndCell_s;
    locText_s += ((locReportBuild_o.selectedClient_s === oetrDefSelectAll) ?
        locTrans_o.oeComTransGet_m("clients", locReportBuild_o.selectedClient_s) :
        locReportBuild_o.selectedClient_s) + paramEndLine_s;
    /*
    --- Add the Year and the Month
    */
    locText_s += locTrans_o.oeComTransGet_m("report", "labelReportYear") + ":" + paramEndCell_s;
    locText_s += locReportBuild_o.selectedYear_s + paramEndLine_s;
    locText_s += locTrans_o.oeComTransGet_m("report", "labelReportMonth") + ":" + paramEndCell_s;
    locText_s += locTrans_o.oeComTransGet_m("months", locReportBuild_o.selectedMonth_s) + paramEndLine_s;
    /*
    --- Add the header of the table
    */
    locText_s += paramEndLine_s;
    if (locReportBuild_o.selectedClient_s === oetrDefSelectAll)
        locText_s += locTrans_o.oeComTransGet_m("report", "headerClient") + paramEndCell_s;
    locText_s += locTrans_o.oeComTransGet_m("report", "headerTask") + paramEndCell_s;
    if (locReportBuild_o.isDetailed)
        locText_s += locTrans_o.oeComTransGet_m("report", "headerDate") + paramEndCell_s;
    locText_s += locTrans_o.oeComTransGet_m("report", "headerMinutes") + paramEndCell_s;
    locText_s += locTrans_o.oeComTransGet_m("report", "headerHours") + paramEndLine_s;
    /*
    --- Add each row
    */
    for (let locI = 0; locI < locRows_a.length; locI++) {
        const locRow_o = locRows_a[locI];
        if (locReportBuild_o.selectedClient_s === oetrDefSelectAll)
            locText_s += locRow_o.headerClient + paramEndCell_s;
        locText_s += locRow_o.headerTask + paramEndCell_s;
        if (locReportBuild_o.isDetailed)
            locText_s += locRow_o.headerDate + paramEndCell_s;
        locText_s += locRow_o.headerMinutes + paramEndCell_s;
        locText_s += locRow_o.headerHours + paramEndLine_s;
    }
    /*
    --- Return the Report in Text
    */
    return (locText_s);
}

/*+-------------------------------------------------------------+
  ! Routine    : locCopyClipboard_f                             !
  ! Description: Copy the report to the Clipboard               !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locCopyClipboard_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Initialisation
    */
    const locTrans_o = paramCtx_o.trans_o;
    /*
    --- Get the report in Text
    */
    const locText_s = locReportToText_f(paramCtx_o, "\t", "\r\n");
    /*
    --- Copy the text in Clipboard
    */
    navigator.clipboard.writeText(locText_s).then(() => {
        /*
        --- Create the confirmation message and refresh the Dialog
        */
        paramCtx_o.message_s = locTrans_o.oeComTransGet_m("report", "copied");
        oetrReportMgtRefreshModal_f(paramCtx_o);
    });
}

/*+-------------------------------------------------------------+
  ! Routine    : locCreateCSV_f                                 !
  ! Description: Create a CSV file with the report              !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
async function locCreateCSV_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Initialisation
    */
    const locTrans_o = paramCtx_o.trans_o;
    /*
    --- Get the report in Text
    */
    const locText_s = locReportToText_f(paramCtx_o, ";", "\r\n");
    /*
    --- Request File Path selection
    */
    const locFilters_a = [
        {name: 'CSV', extensions: ['csv']},
        {name: '*.*', extensions: ['*']}
    ];
    const locFilePath_s = await window.electronAPI.dialogSaveFile(locFilters_a, paramCtx_o.lastPathCSV_s);
    /*
    --- If cancel the return with refresh
    */
    if (locFilePath_s.length < 1) {
        oetrReportMgtRefreshModal_f(paramCtx_o);
        return;
    }
    /*
    --- Update the current CSV Path
    */
    paramCtx_o.lastPathCSV_s = locFilePath_s.substring(0, locFilePath_s.lastIndexOf("/"));
    localStorage.setItem("oetrPathCSV", paramCtx_o.lastPathCSV_s);
    /*
    --- Save the file
    */
    const locFileName_s = (locFilePath_s.indexOf(".") > 0) ? locFilePath_s : (locFilePath_s + ".csv");
    await window.electronAPI.fileWrite(locFileName_s, locText_s);
    /*
    --- Create the message for return
    */
    paramCtx_o.message_s = locTrans_o.oeComTransGet_m("report", "csvCreated") + "\n" + locFileName_s;
    oetrReportMgtRefreshModal_f(paramCtx_o);
}

/*
+-------------------------------------------------------------+
! Routine    : locTableHeader_f                               !
! Description: Report Table Header                            !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function locTableHeader_f(paramCtx_o) {
    /*
    --- Initialisation
    */
    const locTrans_o = paramCtx_o.trans_o;
    const locReportBuild_o = paramCtx_o.reportBuild_o;
    /*
    --- Build the header list
    */
    const locHeaders_a = [];
    if (locReportBuild_o.selectedClient_s === oetrDefSelectAll)
        locHeaders_a.push(
            {
                field: "headerClient",
                headerName: locTrans_o.oeComTransGet_m("report", "headerClient"),
                minWidth: 100,
                editable: false,
                flex: 1,
                hide: false,

            });
    locHeaders_a.push(
        {
            field: "headerTask",
            headerName: locTrans_o.oeComTransGet_m("report", "headerTask"),
            minWidth: 100,
            editable: false,
            flex: 1,
            hide: false
        });
    if (locReportBuild_o.isDetailed)
        locHeaders_a.push(
            {
                field: "headerDate",
                headerName: locTrans_o.oeComTransGet_m("report", "headerDate"),
                minWidth: 20,
                editable: false,
                flex: 1,
                hide: false
            });
    locHeaders_a.push(
        {
            field: "headerMinutes",
            headerName: locTrans_o.oeComTransGet_m("report", "headerMinutes"),
            minWidth: 20,
            editable: false,
            flex: 1,
            hide: false
        });
    locHeaders_a.push(
        {
            field: "headerHours",
            headerName: locTrans_o.oeComTransGet_m("report", "headerHours"),
            minWidth: 20,
            editable: false,
            flex: 1,
            hide: false
        });
    /*
    --- Return the Table header
    */
    return (locHeaders_a);
}

/*
+-------------------------------------------------------------+
! Routine    : locTableOneTask_f                              !
! Description: Report Table Rows for one task for one client  !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function locTableOneTask_f(paramCtx_o, paramClient_s, paramTask_s) {
    /*
    --- Initialisation
    */
    const locReportBuild_o = paramCtx_o.reportBuild_o;
    const locReportMonth_o = paramCtx_o.monthReport_o;
    const locTrans_o = paramCtx_o.trans_o;
    /*
    --- Compute Total task value
    */
    const locTaskTotalMinutes = locReportBuild_o.report_o[paramClient_s][paramTask_s];
    const locTaskTotalHours = Math.floor(locTaskTotalMinutes / 60);
    const locTaskTotalRest = locTaskTotalMinutes - (locTaskTotalHours * 60);
    /*
    --- Check if no detail is required
    */
    if (!locReportBuild_o.isDetailed) {
        /*
        --- Create one only row
        */
        locReportBuild_o.rows_a.push({
            id: "rowNameTask" + paramTask_s,
            headerClient: "",
            headerTask: paramTask_s,
            headerDate: "",
            headerMinutes: "" + locTaskTotalMinutes,
            headerHours: locTaskTotalHours + " h " + ((locTaskTotalRest > 0) ? (locTaskTotalRest + " min") : "")
        });
        return;
    }
    /*
    --- Detail is required:  Add the name of the task
    */
    locReportBuild_o.rows_a.push({
        id: "rowNameTask" + paramTask_s,
        headerClient: "",
        headerTask: paramTask_s,
        headerDate: "",
        headerMinutes: "",
        headerHours: ""
    });
    /*
    --- Get the sorted list of days
    */
    const locDaysUnsorted_a = Object.keys(locReportMonth_o[paramClient_s][paramTask_s]);
    const locDays_a = locDaysUnsorted_a.sort();
    /*
    --- For each Day, create a row
    */
    for (let locI = 0; locI < locDays_a.length; locI++) {
        const locDay_s = locDays_a[locI];
        let locDate_s = (paramCtx_o.config_o.locale === "en-GB") ?
            locReportBuild_o.selectedMonth_s + "/" + locDay_s : locDay_s + "/" + locReportBuild_o.selectedMonth_s;
        locReportBuild_o.rows_a.push({
            id: "rowDetailedTask" + paramTask_s + "_" + locI,
            headerClient: "",
            headerTask: "",
            headerDate: locDate_s,
            headerMinutes: "" + locReportMonth_o[paramClient_s][paramTask_s][locDay_s],
            headerHours: ""
        });
    }
    /*
    --- Add the total for this task
    */
    locReportBuild_o.rows_a.push({
        id: "rowTotalTask" + paramTask_s,
        headerClient: "",
        headerTask: locTrans_o.oeComTransGet_m("report", "totalTask", paramTask_s),
        headerDate: "",
        headerMinutes: "" + locTaskTotalMinutes,
        headerHours: locTaskTotalHours + " h " + ((locTaskTotalRest > 0) ? (locTaskTotalRest + " min") : "")
    });
}

/*
+-------------------------------------------------------------+
! Routine    : locTableRowsAllTasks_f                         !
! Description: Report Table Rows for all tasks for one client !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function locTableRowsAllTasks_f(paramCtx_o, paramClient_s) {
    /*
    --- Initialisation
    */
    const locReportBuild_o = paramCtx_o.reportBuild_o;
    const locTrans_o = paramCtx_o.trans_o;
    let locClientTotalMinutes = 0;
    /*
    --- Get the sorted list of tasks for this client
    */
    const locListTasksUnsorted_a = Object.keys(locReportBuild_o.report_o[paramClient_s]);
    const locListTasks_a = locListTasksUnsorted_a.sort();
    /*
    --- Process task by task
    */
    for (let locI = 0; locI < locListTasks_a.length; locI++) {
        /*
        --- Add number of minutes for this task
        */
        const locTask_s = locListTasks_a[locI];
        locClientTotalMinutes += locReportBuild_o.report_o[paramClient_s][locTask_s];
        /*
        --- Process the task
        */
        locTableOneTask_f(paramCtx_o, paramClient_s, locTask_s);
    }
    /*
    --- Create row for the total of the client according if multiple client or not
    */
    const locClientTotalHours = Math.floor(locClientTotalMinutes / 60);
    const locClientTotalRest = locClientTotalMinutes - (locClientTotalHours * 60);
    if (locReportBuild_o.selectedClient_s === oetrDefSelectAll) {
        locReportBuild_o.rows_a.push({
            id: "rowTotalClient" + paramClient_s,
            headerClient: locTrans_o.oeComTransGet_m("report", "totalClient", paramClient_s),
            headerTask: "",
            headerDate: "",
            headerMinutes: "" + locClientTotalMinutes,
            headerHours: locClientTotalHours + " h " + ((locClientTotalRest > 0) ? (locClientTotalRest + " min") : "")
        });
    } else {
        locReportBuild_o.rows_a.push({
            id: "rowTotalClient" + paramClient_s,
            headerClient: "",
            headerTask: locTrans_o.oeComTransGet_m("report", "totalClient", paramClient_s),
            headerDate: "",
            headerMinutes: "" + locClientTotalMinutes,
            headerHours: locClientTotalHours + " h " + ((locClientTotalRest > 0) ? (locClientTotalRest + " min") : "")
        });
    }
}

/*
+-------------------------------------------------------------+
! Routine    : locTableRowsOneClient_f                        !
! Description: Report Table Rows for one client               !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function locTableRowsOneClient_f(paramCtx_o, paramClient_s) {
    /*
    --- Don't process the generic client 'All'
    */
    if (paramClient_s === oetrDefSelectAll) return;
    /*
    --- Initialisation
    */
    const locReportBuild_o = paramCtx_o.reportBuild_o;
    /*
    --- Add the client name if all clients should be reported
    */
    if (locReportBuild_o.selectedClient_s === oetrDefSelectAll) {
        /*
        --- Add client name as a new row
        */
        locReportBuild_o.rows_a.push({
            id: "rowNameClient" + paramClient_s,
            headerClient: paramClient_s,
            headerTask: "",
            headerDate: "",
            headerMinutes: "",
            headerHours: ""
        })
    }
    /*
    --- Process all tasks for this client
    */
    locTableRowsAllTasks_f(paramCtx_o, paramClient_s);
}

/*
+-------------------------------------------------------------+
! Routine    : locTableRowsAllClients_f                       !
! Description: Report Table Rows for all clients              !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function locTableRowsAllClients_f(paramCtx_o) {
    /*
    --- Initialisation
    */
    const locReportBuild_o = paramCtx_o.reportBuild_o;
    /*
    --- Check if all clients should be reported
    */
    if (locReportBuild_o.selectedClient_s === oetrDefSelectAll) {
        /*
        --- Process client by client
        */
        for (let locI = 0; locI < locReportBuild_o.listClients_a.length; locI++) {
            locTableRowsOneClient_f(paramCtx_o, locReportBuild_o.listClients_a[locI]);
        }
    } else {
        /*
        --- Process the selected client alone
        */
        locTableRowsOneClient_f(paramCtx_o, locReportBuild_o.selectedClient_s);
    }
}

/*=============== Local JSX components =========================*/

/*
+-------------------------------------------------------------+
! Routine    : LocSelectYear_jsx                              !
! Description: JSX Select Year field                          !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocSelectYear_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locColors_o = locCtx_o.config_o.colors_o;
    const locReportBuild_o = locCtx_o.reportBuild_o;
    /*
    --- Return the Select Year field
    */
    return (
        <FormControl variant="filled" size="small"
                     sx={{
                         width: "100px",
                         backgroundColor: locColors_o.backgroundSelect
                     }}>
            <Select
                id="oetrReportSelectYear"
                value={locReportBuild_o.selectedYear_s}
                defaultValue={locReportBuild_o.selectedYear_s}
                variant="standard"
                sx={{pl: "14px", pt: "4px"}}
                onChange={(paramEvent) => {
                    locReportBuild_o.selectedYear_s = paramEvent.target.value;
                    oetrFileMgtListMonths_f(locCtx_o).then(() => oetrReportMgtRefreshModal_f(locCtx_o));
                }}
            >
                {locReportBuild_o.listDirYears_a.map((paramYear) => (
                    <MenuItem key={"itemYear" + paramYear}
                              value={paramYear}>{paramYear}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

/*
+-------------------------------------------------------------+
! Routine    : LocSelectMonth_jsx                             !
! Description: JSX Select Month field                         !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocSelectMonth_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
    const locReportBuild_o = locCtx_o.reportBuild_o;
    /*
    --- If no selected month then return a simple text
    */
    if (locReportBuild_o.selectedMonth_s.length < 1) return (
        <div>
            {locTrans_o.oeComTransGet_m("report", "noMonth")}
        </div>
    )
    /*
    --- Return the Select Month field
    */
    return (
        <FormControl variant="filled" size="small"
                     sx={{
                         width: "200px",
                         backgroundColor: locColors_o.backgroundSelect
                     }}>
            <Select
                id="oetrReportSelectMonth"
                value={locReportBuild_o.selectedMonth_s}
                defaultValue={locReportBuild_o.selectedMonth_s}
                variant="standard"
                sx={{pl: "14px", pt: "4px"}}
                onChange={(paramEvent) => {
                    locReportBuild_o.selectedMonth_s = paramEvent.target.value;
                    oetrFileMgtComputeAllJsonReportFile_f(locCtx_o).then(() => oetrReportMgtRefreshModal_f(locCtx_o));
                }}
            >
                {locReportBuild_o.listDirMonths_a.map((paramMonth) => (
                    <MenuItem key={"itemMonth" + paramMonth}
                              value={paramMonth}>
                        {locTrans_o.oeComTransGet_m("months", paramMonth)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

/*
+-------------------------------------------------------------+
! Routine    : LocSelectClient_jsx                            !
! Description: JSX Select Client field                        !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocSelectClient_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
    const locReportBuild_o = locCtx_o.reportBuild_o;
    /*
    --- If no selected month then return nothing
    */
    if (locReportBuild_o.selectedMonth_s.length < 1) return (<div></div>)
    /*
    --- If no selected client then return a simple text
    */
    if (locReportBuild_o.selectedClient_s.length < 1) return (
        <div>
            {locTrans_o.oeComTransGet_m("report", "noClient")}
        </div>
    )
    /*
    --- Return the Select Client field
    */
    return (
        <div style={{marginTop: "20px"}}>
            <div>
                {locTrans_o.oeComTransGet_m("report", "labelSelectClient")}
            </div>
            <FormControl variant="filled" size="small"
                         sx={{
                             width: "350px",
                             marginTop: "8px",
                             backgroundColor: locColors_o.backgroundSelect
                         }}>
                <Select
                    id="oetrReportSelectClient"
                    value={locReportBuild_o.selectedClient_s}
                    defaultValue={locReportBuild_o.selectedClient_s}
                    variant="standard"
                    sx={{pl: "14px", pt: "4px"}}
                    onChange={(paramEvent) => {
                        locReportBuild_o.selectedClient_s = paramEvent.target.value;
                        oetrReportMgtRefreshModal_f(locCtx_o);
                    }}
                >
                    {locReportBuild_o.listClients_a.map((paramClient) => (
                        <MenuItem key={"itemClient" + paramClient}
                                  value={paramClient}>
                            {(paramClient === oetrDefSelectAll) ?
                                locTrans_o.oeComTransGet_m("clients", paramClient) : paramClient
                            }
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

/*
+-------------------------------------------------------------+
! Routine    : LocDisplayReport_jsx                           !
! Description: JSX Display report                             !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocDisplayReport_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
    const locReportBuild_o = locCtx_o.reportBuild_o;
    /*
    --- If no selected client then return a simple text
    */
    if ((locReportBuild_o.selectedMonth_s.length < 1) || (locReportBuild_o.selectedClient_s.length < 1))
        return (<div></div>)
    /*
    --- Build the Header
    */
    const locHeaders_a = locTableHeader_f(locCtx_o);
    /*
    --- Build the Rows for all clients
    */
    locReportBuild_o.rows_a = [];
    locTableRowsAllClients_f(locCtx_o);
    /*
    --- Return the Report
    */
    return (
        <div>
            <Divider sx={{mt: "20px", mb: "0px"}}>
                <Chip label={locTrans_o.oeComTransGet_m("report", "labelDivider")} size="small"/>
            </Divider>
            <div style={{
                textAlign: "right",
                display: ((locReportBuild_o.selectedMonth_s === "00") ? "none" : "block")
            }}>
                {locTrans_o.oeComTransGet_m("report", "labelSwitchDetail")}
                <Switch defaultChecked={locReportBuild_o.isDetailed}
                        onChange={() => {
                            locReportBuild_o.isDetailed = !locReportBuild_o.isDetailed;
                            oetrReportMgtRefreshModal_f(locCtx_o);
                        }}/>
            </div>
            <Grid container spacing={1} columns={11} sx={{mt: "0"}}>
                <Grid size={1} sx={{textAlign: "left"}}>
                    {locTrans_o.oeComTransGet_m("report", "labelReportClient")}
                </Grid>
                <Grid size="auto">
                    :
                    <strong>
                        {
                            " " +
                            ((locReportBuild_o.selectedClient_s === oetrDefSelectAll) ?
                                locTrans_o.oeComTransGet_m("clients", locReportBuild_o.selectedClient_s) :
                                locReportBuild_o.selectedClient_s)
                        }
                    </strong>
                </Grid>
            </Grid>
            <Grid container spacing={1} columns={11} sx={{mt: "8px"}}>
                <Grid size={1} sx={{textAlign: "left"}}>
                    {locTrans_o.oeComTransGet_m("report", "labelReportYear")}
                </Grid>
                <Grid size={2}>
                    :
                    <strong>
                        {" " + locReportBuild_o.selectedYear_s}
                    </strong>
                </Grid>
                <Grid size={1} sx={{textAlign: "right"}}>
                    {locTrans_o.oeComTransGet_m("report", "labelReportMonth")}
                </Grid>
                <Grid size={4}>
                    :
                    <strong>
                        {" " + locTrans_o.oeComTransGet_m("months", locReportBuild_o.selectedMonth_s)}
                    </strong>
                </Grid>
                <Grid size="auto">
                </Grid>
            </Grid>
            <div style={{width: "100%", marginTop: "20px"}}>
                <DataGrid
                    rows={locReportBuild_o.rows_a}
                    columns={locHeaders_a}
                    density="compact"
                    sx={{
                        "& .MuiDataGrid-columnHeader": {
                            background: locColors_o.backgroundTableHeader,
                        },
                        "& .MuiDataGrid-row.TotalClient": {
                            background: locColors_o.backgroundTableTotalClient,
                            "font-weight": "bold"
                        },
                        "& .MuiDataGrid-row.TotalTask": {
                            background: locColors_o.backgroundTableTotalTask,
                            "font-weight": "bold"
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            "font-weight": "bold"
                        },
                    }}
                    getRowClassName={(paramRow) => {
                        if ((paramRow.id.includes("rowTotalClient")) ||
                            ((paramRow.row.headerClient !== undefined) && (paramRow.row.headerClient.length > 0))) {
                            return ("TotalClient");
                        } else if ((paramRow.id.includes("rowTotalTask")) || (paramRow.row.headerMinutes.length < 1)) {
                            return ("TotalTask");
                        }
                    }}
                    disableColumnSelector
                    disableColumnMenu
                    disableColumnSorting
                    hideFooter
                    autoPageSize={false}
                />
            </div>
        </div>
    );
}

/*
+-------------------------------------------------------------+
! Routine    : LocContent_jsx                                 !
! Description: JSX Report build Modal content                 !
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
    const locTrans_o = locCtx_o.trans_o;
    const locReportBuild_o = locCtx_o.reportBuild_o;
    /*
    --- If no selected year, display a message only
    */
    if (locReportBuild_o.selectedYear_s === "") {
        return (
            <div style={{height: "70px", marginTop: "30px", width: "100%", textAlign: "center"}}>
                {locTrans_o.oeComTransGet_m("report", "noReport")}
            </div>
        );
    }
    /*
    --- Return the Dialog Content to display
    */
    return (
        <div>
            <div>
                {locTrans_o.oeComTransGet_m("report", "labelSelectDate")}
            </div>
            <Grid container spacing={1} sx={{mt: "8px"}}>
                <Grid size={6}>
                    <LocSelectYear_jsx ctx={locCtx_o}/>
                </Grid>
                <Grid size={6}>
                    <LocSelectMonth_jsx ctx={locCtx_o}/>
                </Grid>
            </Grid>
            <LocSelectClient_jsx ctx={locCtx_o}/>
            <LocDisplayReport_jsx ctx={locCtx_o}/>
        </div>
    );
}

/*
+-------------------------------------------------------------+
! Routine    : LocDialogMessage_jsx                           !
! Description: JSX Display a message dialog                   !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocDialogMessage_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locColors_o = locCtx_o.config_o.colors_o;
    const locTrans_o = locCtx_o.trans_o;
    const locLines_a = locCtx_o.message_s.split("\n");
    /*
    --- Return the Dialog Content to display
    */
    return (
        <div>
            <DialogTitle sx={{
                height: "32px",
                pt: "2px",
                pb: "2px",
                textAlign: "center",
                backgroundColor: locColors_o.backgroundDialogTitle
            }}>
                <IconButton
                    aria-label="Close"
                    size="small"
                    sx={{position: "absolute", right: "8px"}}
                    onClick={() => {
                        locCtx_o.message_s = "";
                        oetrReportMgtRefreshModal_f(locCtx_o);
                    }}
                >
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{mt: "30px", textAlign: "center"}}>
                {locLines_a.map((paramLine) => (<div>{paramLine}</div>))}
            </DialogContent>
            <DialogActions>
                <Box sx={{width: "100%", textAlign: "center", mb: "10px"}}>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                            locCtx_o.message_s = "";
                            oetrReportMgtRefreshModal_f(locCtx_o);
                        }}
                    >
                        {locTrans_o.oeComTransGet_m("common", "return")}
                    </Button>
                </Box>
            </DialogActions>
        </div>
    )
}

/*=============== Exported functions ===========================*/

/*+--------------------------------------------- ---------------+
  ! Routine    : oetrReportMgtAddDuration_f                     !
  ! Description: Add current task duration in the monthly report!
  !                                                             !
  ! IN:  - Context                                              !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
export function oetrReportMgtAddDuration_f(paramCtx_o) {
    /*
    --- Initialisation
    */
    const locReport_o = paramCtx_o.monthReport_o;
    const locStartedTask_o = paramCtx_o.definitions_o.startedTask_o;
    const locClient_s = locStartedTask_o.client_s;
    const locTask_s = locStartedTask_o.task_s;
    const locDay_s = locStartedTask_o.day_s;
    let locDuration = locStartedTask_o.duration;
    /*
    --- If the client doesn't exist, create it
    */
    if (locReport_o[locClient_s] === undefined) locReport_o[locClient_s] = {};
    /*
    --- If the task for this client doesn't exist, create it
    */
    if (locReport_o[locClient_s][locTask_s] === undefined) locReport_o[locClient_s][locTask_s] = {};
    /*
    --- If it's not the first time of the day for this task, the add the previous duration
    */
    const locPreviousDuration = locReport_o[locClient_s][locTask_s][locDay_s];
    if (locPreviousDuration !== undefined) locDuration += locPreviousDuration;
    /*
    --- Update the report
    */
    locReport_o[locClient_s][locTask_s][locDay_s] = locDuration;
}

/*
+-------------------------------------------------------------+
! Routine : oetrReportMgtRefreshModal_f                       !
! Description: Request the refresh of the Modal               !
!                                                             !
! IN: - Context                                               !
! OUT: - Nothing                                              !
+-------------------------------------------------------------+
*/
export function oetrReportMgtRefreshModal_f(paramCtx_o) {
    paramCtx_o.refresh_o.reportMgt_s = !paramCtx_o.refresh_o.reportMgt_s;
    paramCtx_o.refresh_o.reportMgt_f(paramCtx_o.refresh_o.reportMgt_s);
}

/*=============== Exported JSX components ======================*/

/*+-------------------------------------------------------------+
  ! Routine    : OetrDialogReportMgt_jsx                        !
  ! Description: JSX Report Management Dialog                   !
  !                                                             !
  ! IN:  - Properties including Context                         !
  ! OUT: - Page rendering                                       !
  +-------------------------------------------------------------+
*/
export function OetrDialogReportMgt_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
    /*
    --- Get React state for refreshing the page
    */
    const [locReportMgt_s, locReportMgt_f] = useState(false);
    locCtx_o.refresh_o.reportMgt_f = locReportMgt_f;
    locCtx_o.refresh_o.reportMgt_s = locReportMgt_s;
    /*
    --- Check if Report build object should be reset
    */
    if (locCtx_o.reportBuildReset) {
        /*
        --- Reset the report build object
        */
        oetrInitReportBuild_f(locCtx_o);
        /*
        --- Get the list of Year directories then list of month directories
        */
        oetrFileMgtListYears_f(locCtx_o).then(() =>
            oetrFileMgtListMonths_f(locCtx_o).then(() =>
                oetrFileMgtComputeAllJsonReportFile_f(locCtx_o).then(() => {
                    /*
                    --- Report build object is updated
                    */
                    locCtx_o.reportBuildReset = false;
                    /*
                    --- Refresh the Report Modal
                    */
                    oetrReportMgtRefreshModal_f(locCtx_o);
                })));
    }
    /*
    --- Return the Dialog
    */
    return (
        <div>
            <Dialog open={true} fullWidth maxWidth="xl">
                <OetrError_jsx ctx={locCtx_o}/>
                <DialogTitle sx={{
                    height: "40px",
                    pt: "6px",
                    pb: "10px",
                    mb: "14px",
                    textAlign: "center",
                    backgroundColor: locColors_o.backgroundDialogTitle
                }}>
                    {locTrans_o.oeComTransGet_m("report", "title")}
                    <IconButton
                        aria-label="Close"
                        size="small"
                        sx={{position: "absolute", right: "8px"}}
                        onClick={(paramEvent) => locClose_f(locCtx_o, paramEvent)}
                    >
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{pb: 0, mb: 0, mt: '10px'}}>
                    <LocContent_jsx ctx={locCtx_o}/>
                </DialogContent>
                <DialogActions sx={{mt: "10px", mb: 0}}>
                    <Button
                        key={"buttonCopyPaste" + Math.random()}
                        disabled={((locCtx_o.reportBuild_o.selectedYear_s.length < 1) ||
                            (locCtx_o.reportBuild_o.selectedMonth_s.length < 1))}
                        variant="contained"
                        onClick={(paramEvent) => locCopyClipboard_f(locCtx_o, paramEvent)}
                    >
                        {locTrans_o.oeComTransGet_m("report", "buttonCopyPaste")}
                    </Button>
                    <Button
                        key={"buttonCSV" + Math.random()}
                        disabled={((locCtx_o.reportBuild_o.selectedYear_s.length < 1) ||
                            (locCtx_o.reportBuild_o.selectedMonth_s.length < 1))}
                        variant="contained"
                        onClick={(paramEvent) => locCreateCSV_f(locCtx_o, paramEvent)}
                    >
                        {locTrans_o.oeComTransGet_m("report", "buttonCSV")}
                    </Button>
                    <Button
                        onClick={(paramEvent) => locClose_f(locCtx_o, paramEvent)}
                    >
                        {locTrans_o.oeComTransGet_m("common", "return")}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={locCtx_o.message_s.length > 0}>
                <LocDialogMessage_jsx ctx={locCtx_o}/>
            </Dialog>
        </div>
    );
}
