/*
  +-------------------------------------------------------------+
  ! CODE SOURCE MATERIALS                                       !
  ! Copyright (C) 2024-2025 Ouestadam-Esteve                    !
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
  !  File  : oetrParameters.js                                  !
  !  Desc. : Parameters dialog for rendering of oetaskreport    !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 30/01/2025                                         !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import React, {useState} from 'react';
import {
    Box,
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, FormControlLabel,
    IconButton,
    InputAdornment, InputLabel, MenuItem,
    OutlinedInput, Select, Tooltip
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

/*
--- Ouestadam products
*/
import {oetrDefFocus_e, oetrDefModal_e} from "./oetrDef";
import {oetrMainRefreshPage_f} from "./oetrMain";
import {OetrError_jsx} from "./oetrError";
import {oetrFileMgtReadJsonDefinitionFile_f, oetrFileMgtWriteJsonDefinitionFile_f} from "./oetrFileMgt";
import {oetrInitDefinitions_f} from "./oetrInit";

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
async function locClose_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Read again the definition file
    */
    paramCtx_o.definitionToBeRead = true;
    await oetrFileMgtReadJsonDefinitionFile_f(paramCtx_o);
    /*
    --- If parameters are not completed then close the application
    */
    if (!paramCtx_o.parametersCompleted) {
        window.close();
    }
    /*
    --- Close the Modal
    */
    paramCtx_o.currentModal = oetrDefModal_e.noModal;
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
  ! Routine    : locValid_f                                     !
  ! Description: Handle the Validation Button                   !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
async function locValid_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Close the Modal
    */
    paramCtx_o.currentModal = oetrDefModal_e.noModal;
    /*
    --- Reset the error state
    */
    paramCtx_o.error_o.inError = false;
    /*
    --- If Working directory is not defined then return without only main page refresh
    */
    if (paramCtx_o.workingDir_s.length < 1) {
        oetrMainRefreshPage_f(paramCtx_o);
        return;
    }
    /*
    --- Save the Working Dir and current Client and Task in the local storage
    */
    localStorage.setItem("oetrWorkingDir", paramCtx_o.workingDir_s);
    localStorage.setItem("oetrCurrentClient", paramCtx_o.currentClient_s);
    localStorage.setItem("oetrCurrentTask", paramCtx_o.currentTask_s);
    /*
    --- Save the definitions in file
    */
    await oetrFileMgtWriteJsonDefinitionFile_f(paramCtx_o);
    /*
    --- Refresh the main page
    */
    oetrMainRefreshPage_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : locGetFolderPath_f                             !
  ! Description: Handle the entering of the Folder Path         !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
async function locGetFolderPath_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Request Path selection
    */
    const locWorkingDir_s = await window.electronAPI.dialogFolderPath();
    /*
    --- If cancel the return with refresh
    */
    if (locWorkingDir_s.length < 1) {
        oetrParametersRefreshModal_f(paramCtx_o);
        return;
    }
    /*
    --- Update the Working dir in the context
    */
    paramCtx_o.workingDir_s = locWorkingDir_s;
    /*
    --- Reset default Client and task
    */
    paramCtx_o.currentClient_s = "";
    paramCtx_o.currentTask_s = "";
    /*
    --- Request the Definitions file read and refresh the Parameters dialog
    */
    paramCtx_o.definitionToBeRead = true;
    oetrParametersRefreshModal_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : locAddNewClient_f                              !
  ! Description: Add a new client in the definitions            !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locAddNewClient_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Get the Entry element
    */
    const locEntryElement = document.getElementById("oetrParamEntryClient");
    /*
    --- Get the client name
    */
    const locClient_s = locEntryElement.value.trim();
    /*
    --- If empty string then return without change
    */
    if (locClient_s.length < 1) return;
    /*
    --- Save the current client
    */
    paramCtx_o.currentClient_s = locClient_s;
    /*
    --- Check if the client exists in the definition
    */
    if (paramCtx_o.definitions_o.clients_o === undefined) oetrInitDefinitions_f(paramCtx_o);
    if (paramCtx_o.definitions_o.clients_o[locClient_s] === undefined) {
        /*
        --- Create the new client definition
        */
        paramCtx_o.definitions_o.clients_o[locClient_s] = {};
    }
    /*
    --- Set Focus on Entry client
    */
    paramCtx_o.focus = oetrDefFocus_e.parametersEntryClient;
    /*
    --- Refresh the parameters modal
    */
    oetrParametersRefreshModal_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : locDeleteClient_f                              !
  ! Description: Delete a client from the definitions           !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locDeleteClient_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- If current client is not defined then return without change
    */
    const locClient_s = paramCtx_o.currentClient_s;
    if (locClient_s.length < 1) return;
    /*
    --- Delete the client in the definition object
    */
    delete paramCtx_o.definitions_o.clients_o[locClient_s];
    /*
    --- Set the last Client as current client
    */
    const locClients_a = Object.keys(paramCtx_o.definitions_o.clients_o);
    const locClientNbElt = locClients_a.length;
    if (locClientNbElt > 0) {
        paramCtx_o.currentClient_s = locClients_a[locClientNbElt - 1];
    } else {
        paramCtx_o.currentClient_s = "";
    }
    /*
    --- Refresh the parameters modal
    */
    oetrParametersRefreshModal_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : locBuildTasksList_f                            !
  ! Description: Delete a task from the definitions             !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locBuildTasksList_f(paramCtx_o) {
    /*
    --- Initialisation
    */
    paramCtx_o.allTasksList_o = {}
    /*
    --- Build list of clients
    */
    const locClients_a = Object.keys(paramCtx_o.definitions_o.clients_o);
    /*
    --- For each client get the associated tasks
    */
    for (let locI = 0; locI < locClients_a.length; locI++) {
        /*
        --- Get the client's tasks list
        */
        const locClient_s = locClients_a[locI];
        const locTasks_a = Object.keys(paramCtx_o.definitions_o.clients_o[locClient_s]);
        /*
        --- Add each task to the full list
        */
        for (let locJ = 0; locJ < locTasks_a.length; locJ++) {
            const locTask_s = locTasks_a[locJ];
            /*
            --- For the current client, set the task has selected
            */
            if (locClient_s === paramCtx_o.currentClient_s) {
                paramCtx_o.allTasksList_o[locTask_s] = true;
            } else {
                /*
                --- Update the tasks list only if the task is not still defined
                */
                if (paramCtx_o.allTasksList_o[locTask_s] === undefined)
                    paramCtx_o.allTasksList_o[locTask_s] = false;
            }
        }
    }
}

/*+-------------------------------------------------------------+
  ! Routine    : locAddNewTask_f                                !
  ! Description: Add a new task in the task list                !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locAddNewTask_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Get client tasks list
    */
    const locTasks_o = paramCtx_o.definitions_o.clients_o[paramCtx_o.currentClient_s];
    /*
    --- Get the Entry element
    */
    const locEntryElement = document.getElementById("oetrParamEntryTask");
    /*
    --- Get the task name
    */
    const locTask_s = locEntryElement.value.trim();
    /*
    --- If empty string then return without change
    */
    if (locTask_s.length < 1) return;
    /*
    --- Add the task in the client task list
    */
    locTasks_o[locTask_s] = {};
    /*
    --- Save the current task
    */
    paramCtx_o.currentTask_s = locTask_s;
    /*
    --- Set it as selected in the task list
    */
    paramCtx_o.allTasksList_o[locTask_s] = true;
    /*
    --- Refresh the parameters modal
    */
    oetrParametersRefreshModal_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : locModifyTaskList_f                            !
  ! Description: Add or Remove a task name for a client         !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locModifyTaskList_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- Get the selected Task name
    */
    const locTask_s = paramEvent.target.name;
    /*
    --- Get client tasks list
    */
    const locTasks_o = paramCtx_o.definitions_o.clients_o[paramCtx_o.currentClient_s];
    /*
    --- Get if checked or not
    */
    const locChecked = paramEvent.target.checked;
    /*
    --- Test if checked or unchecked
    */
    if (locChecked) {
        /*
        --- Add the task in the client task list
        */
        locTasks_o[locTask_s] = {};
    } else {
        /*
        --- Remove the task from the client task list
        */
        delete locTasks_o[locTask_s];
    }
    /*
    --- Save the current task
    */
    paramCtx_o.currentTask_s = locTask_s;
    /*
    --- Set it as selected or not in the task list
    */
    paramCtx_o.allTasksList_o[locTask_s] = locChecked;
    /*
    --- Refresh the parameters modal
    */
    oetrParametersRefreshModal_f(paramCtx_o);
}

/*=============== Local JSX components =========================*/

/*
+-------------------------------------------------------------+
! Routine    : LocTasksContent_jsx                            !
! Description: JSX Tasks list Modal content                   !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocTasksContent_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locLabelNewTask = locTrans_o.oeComTransGet_m("tasksList", "entryNewTask");
    /*
    --- Build the tasks list
    */
    const locTasksListUnsorted_a = Object.keys(locCtx_o.allTasksList_o);
    const locTasksList_a = locTasksListUnsorted_a.sort();
    const locListJsx_a = [];
    for (let locI = 0; locI < locTasksList_a.length; locI += 2) {
        /*
        --- Get the 2 task names to display
        */
        let locTaskName_s = locTasksList_a[locI];
        const locLeftTask_Jsx = (
            <FormControlLabel
                control={<Checkbox
                    key={"KeyCheckbox" + (locI)}
                    checked={locCtx_o.allTasksList_o[locTaskName_s]}
                    name={locTaskName_s}
                    onChange={(paramEvent) =>
                        locModifyTaskList_f(locCtx_o, paramEvent)}
                    sx={{pt: 0, pb: 0}}/>}
                label={locTaskName_s}
            />);
        let locRightTask_Jsx = (<div></div>);
        /*
        --- Process ony if second task name exists
        */
        if (locI < (locTasksList_a.length - 1)) {
            locTaskName_s = locTasksList_a[locI + 1];
            locRightTask_Jsx = (
                <FormControlLabel
                    control={<Checkbox
                        key={"KeyCheckbox" + (locI + 1)}
                        checked={locCtx_o.allTasksList_o[locTaskName_s]}
                        name={locTaskName_s}
                        onChange={(paramEvent) =>
                            locModifyTaskList_f(locCtx_o, paramEvent)}
                        sx={{pt: 0, pb: 0}}/>}
                    label={locTaskName_s}
                />);
        }
        /*
        --- Build the line to display
        */
        locListJsx_a.push(
            <Grid key={"KeyLine" + locI} container spacing={1} sx={{mt: 0, mb: 0}}>
                <Grid size={6} sx={{mt: 0, mb: 0}}>
                    {locLeftTask_Jsx}
                </Grid>
                <Grid size={6} sx={{mt: 0, mb: 0}}>
                    {locRightTask_Jsx}
                </Grid>
            </Grid>);
    }

    /*
    --- Return the content
    */
    return (
        <div>
            <Box sx={{display: "flex", alignItems: "center", mt: "8px"}}>
                <Box sx={{mr: "20px"}}>
                    {locTrans_o.oeComTransGet_m("tasksList", "labelCreateTask")}
                </Box>
                <Box sx={{width: "400px"}}>
                    <FormControl variant="outlined" fullWidth size="small">
                        <InputLabel htmlFor="oetrParamEntryTask">{locLabelNewTask}</InputLabel>
                        <OutlinedInput
                            id="oetrParamEntryTask"
                            key={"oetrParamEntryTaskKey" + Math.random()}
                            defaultValue=""
                            type="text"
                            label={locLabelNewTask}
                            size="small"
                            autoFocus
                            onKeyDown={(paramEvent) => {
                                if (paramEvent.key === 'Enter') locAddNewTask_f(locCtx_o, paramEvent)
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Add new task"
                                        onClick={(paramEvent) => locAddNewTask_f(locCtx_o, paramEvent)}
                                        edge="end"
                                    >
                                        <AddCircleOutlineIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
            </Box>
            <div style={{marginTop: "40px"}}>
                {locListJsx_a}
            </div>
        </div>
    )
}

/*
+-------------------------------------------------------------+
! Routine    : LocTasksDialog_jsx                             !
! Description: JSX Tasks list Dialog Modal                    !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocTasksDialog_jsx(paramProps_o
) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
    /*
    --- Build the Main Dialog
    */
    return (
        <Dialog open={locCtx_o.isTasksList} sx={{mr: "10px", ml: "10px"}} fullWidth maxWidth="xl">
            <DialogTitle sx={{
                height: "40px",
                pt: "6px",
                pb: "10px",
                mb: "14px",
                textAlign: "center",
                backgroundColor: locColors_o.backgroundDialogTitle
            }}>
                {locTrans_o.oeComTransGet_m("tasksList", "title")}
                <strong>{locCtx_o.currentClient_s}</strong>
                <IconButton
                    aria-label="Close"
                    size="small"
                    sx={{position: "absolute", right: "8px"}}
                    onClick={() => {
                        locCtx_o.isTasksList = false;
                        oetrParametersRefreshModal_f(locCtx_o);
                    }}
                >
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{pb: 0, mb: 0}}>
                <LocTasksContent_jsx ctx={locCtx_o}/>
            </DialogContent>
            <DialogActions sx={{mt: "20px", mb: 0}}>
                <Button
                    variant="contained"
                    onClick={() => {
                        locCtx_o.isTasksList = false;
                        oetrParametersRefreshModal_f(locCtx_o);
                    }}
                >
                    {locTrans_o.oeComTransGet_m("common", "return")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

/*
+-------------------------------------------------------------+
! Routine    : LocMainContent_jsx                             !
! Description: JSX Main Parameters Modal content              !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocMainContent_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locLabelNewClient = locTrans_o.oeComTransGet_m("parameters", "entryNewClient");
    /*
    --- Read the Definitions JSON file if present
    */
    oetrFileMgtReadJsonDefinitionFile_f(locCtx_o, oetrParametersRefreshModal_f);
    /*
    --- Build list of clients
    */
    const locClients_a = Object.keys(locCtx_o.definitions_o.clients_o);
    /*
    --- Build list of task if current client exists
    */
    const locTasks_a = ((locClients_a.length > 0) && (locCtx_o.currentClient_s.length > 0) &&
        (locCtx_o.definitions_o.clients_o[locCtx_o.currentClient_s] !== undefined)) ?
        Object.keys(locCtx_o.definitions_o.clients_o[locCtx_o.currentClient_s]) : [];
    /*
    --- If one task exists then set parameters as completed
    */
    locCtx_o.parametersCompleted = (locTasks_a.length > 0);
    /*
    --- If current client is empty and list of clients is not empty, then the current client is the first of list
    */
    if ((locCtx_o.currentClient_s.length < 1) && (locClients_a.length > 0)) locCtx_o.currentClient_s = locClients_a[0];
    /*
    --- If current task is empty and list of tasks is not empty, then the current task is the first of list
    */
    if ((locCtx_o.currentTask_s.length < 1) && (locTasks_a.length > 0)) locCtx_o.currentTask_s = locTasks_a[0];
    /*
    --- Build visibility flags
    */
    const locDisplayAddClient = (locCtx_o.workingDir_s.length < 1) ? "none" : "box";
    const locDisplaySelectClient = (locClients_a.length < 1) ? "none" : "block";
    const locDisplayAddTask = ((locClients_a.length < 1) || (locCtx_o.currentClient_s.length < 1)) ? "none" : "box";
    /*
    --- Set the Focus
    */
    if (locCtx_o.workingDir_s.length < 1) {
        /*
        --- Set focus on select Working Directory
        */
        locCtx_o.focus = oetrDefFocus_e.parametersWorkingDir;
    } else if (locCtx_o.focus !== oetrDefFocus_e.parametersEntryTask) {
        /*
        --- Set focus on Entry Client
        */
        locCtx_o.focus = oetrDefFocus_e.parametersEntryClient;
    }
    /*
    --- Return the Dialog Content to display
    */
    return (
        <div style={{minHeight: "300px"}}>
            <div style={{marginTop: "20px"}}>
                {locTrans_o.oeComTransGet_m("parameters", "labelGetWorkingDir")}
            </div>
            <div>
                <IconButton
                    size="large"
                    color="primary"
                    onClick={(paramEvent) => locGetFolderPath_f(locCtx_o, paramEvent)}
                    sx={{mr: "10px", ml: "-12px"}}
                    autoFocus={locCtx_o.focus === oetrDefFocus_e.parametersWorkingDir}
                >
                    <CreateNewFolderIcon fontSize="large"/>
                </IconButton>
                <span>
                    <i>
                        {locCtx_o.workingDir_s}
                    </i>
                </span>
            </div>
            <Grid container spacing={1} sx={{mt: "8px", display: locDisplayAddClient}}>
                <Grid size={6}>
                    <div>
                        {locTrans_o.oeComTransGet_m("parameters", "labelCreateClient")}
                    </div>
                    <Box sx={{width: "320px", mt: "8px"}}>
                        <FormControl variant="outlined" fullWidth size="small">
                            <InputLabel htmlFor="oetrParamEntryClient">{locLabelNewClient}</InputLabel>
                            <OutlinedInput
                                id="oetrParamEntryClient"
                                key={"oetrParamEntryClientKey" + Math.random()}
                                defaultValue=""
                                type="text"
                                label={locLabelNewClient}
                                size="small"
                                autoFocus={locCtx_o.focus === oetrDefFocus_e.parametersEntryClient}
                                onKeyDown={(paramEvent) => {
                                    if (paramEvent.key === 'Enter') locAddNewClient_f(locCtx_o, paramEvent)
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Add new client"
                                            onClick={(paramEvent) => locAddNewClient_f(locCtx_o, paramEvent)}
                                            edge="end"
                                        >
                                            <AddCircleOutlineIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>
                </Grid>
                <Grid size={6} sx={{display: locDisplaySelectClient}}>
                    {locTrans_o.oeComTransGet_m("parameters", "labelSelectClient")}
                    <Box sx={{minWidth: "100px", display: "flex"}}>
                        <FormControl variant="standard" fullWidth size="small">
                            <Select
                                id="oetrParamSelectClient"
                                value={locCtx_o.currentClient_s}
                                defaultValue={locCtx_o.currentClient_s}
                                variant="standard"
                                onChange={(paramEvent) => {
                                    locCtx_o.currentClient_s = paramEvent.target.value;
                                    locCtx_o.currentTask_s = "";
                                    oetrParametersRefreshModal_f(locCtx_o);
                                }}
                            >
                                {locClients_a.map((paramClient) => (
                                    <MenuItem key={"itemClient" + paramClient}
                                              value={paramClient}>{paramClient}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Tooltip title={locTrans_o.oeComTransGet_m("parameters", "toolTipDeleteClient")}>
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={(paramEvent) => locDeleteClient_f(locCtx_o, paramEvent)}
                                sx={{ml: "4px"}}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{mt: "30px", display: locDisplayAddTask}}>
                <Grid size={12}>
                    <div>
                        {locTrans_o.oeComTransGet_m("parameters", "labelCreateTask")}
                        <strong>{locCtx_o.currentClient_s}</strong>
                    </div>
                    <Button
                        variant="contained"
                        startIcon={<PlaylistAddIcon fontSize="large"/>}
                        sx={{mt: "12px"}}
                        onClick={() => {
                            locBuildTasksList_f(locCtx_o);
                            locCtx_o.isTasksList = true;
                            oetrParametersRefreshModal_f(locCtx_o);
                        }}
                    >
                        {locTrans_o.oeComTransGet_m("parameters", "buttonCreateTask")}
                    </Button>
                </Grid>
                <Grid size={6}>
                </Grid>
            </Grid>
        </div>
    )
}

/*
+-------------------------------------------------------------+
! Routine    : LocMainDialog_jsx                              !
! Description: JSX Main Parameters Dialog Modal               !
!                                                             !
! IN:  - Properties including Context                         !
! OUT: - Page rendering                                       !
+-------------------------------------------------------------+
*/
function LocMainDialog_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
    /*
    --- Build the Main Dialog
    */
    return (
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
                {locTrans_o.oeComTransGet_m("parameters", "title")}
                <IconButton
                    aria-label="Close"
                    size="small"
                    sx={{position: "absolute", right: "8px"}}
                    onClick={async (paramEvent) => locClose_f(locCtx_o, paramEvent)}
                >
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{pb: 0, mb: 0}}>
                <LocMainContent_jsx ctx={locCtx_o}/>
            </DialogContent>
            <DialogActions sx={{mt: 0, mb: 0}}>
                <Button
                    onClick={async (paramEvent) => locClose_f(locCtx_o, paramEvent)}
                    sx={{mr: "6px"}}>
                    {locTrans_o.oeComTransGet_m("common", "cancel")}
                </Button>
                <Button
                    disabled={!locCtx_o.parametersCompleted}
                    variant="contained"
                    onClick={(paramEvent) => locValid_f(locCtx_o, paramEvent)}>
                    {locTrans_o.oeComTransGet_m("common", "validate")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

/*=============== Exported functions ===========================*/

/*
+-------------------------------------------------------------+
! Routine : oetrParametersRefreshModal_f                      !
! Description: Request the refresh of the Modal               !
!                                                             !
! IN: - Context                                               !
! OUT: - Nothing                                              !
+-------------------------------------------------------------+
*/
export function oetrParametersRefreshModal_f(paramCtx_o) {
    paramCtx_o.refresh_o.parameters_s = !paramCtx_o.refresh_o.parameters_s;
    paramCtx_o.refresh_o.parameters_f(paramCtx_o.refresh_o.parameters_s);
}

/*=============== Exported JSX components ======================*/

/*+-------------------------------------------------------------+
  ! Routine    : OetrDialogParameters_jsx                       !
  ! Description: JSX Parameters Dialog                          !
  !                                                             !
  ! IN:  - Properties including Context                         !
  ! OUT: - Page rendering                                       !
  +-------------------------------------------------------------+
*/
export function OetrDialogParameters_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    /*
    --- Get React state for refreshing the page
    */
    const [locParameters_s, locParameters_f] = useState(false);
    locCtx_o.refresh_o.parameters_f = locParameters_f;
    locCtx_o.refresh_o.parameters_s = locParameters_s;
    /*
    --- Return the Dialog
    */
    return (
        <div>
            <LocMainDialog_jsx ctx={locCtx_o}/>
            <LocTasksDialog_jsx ctx={locCtx_o}/>
        </div>
    );
}
