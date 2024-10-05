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
  !  File  : oetrParameters.js                                  !
  !  Desc. : Parameters dialog for rendering of oetaskreport    !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 01/10/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    IconButton,
    InputAdornment, InputLabel, MenuItem,
    OutlinedInput, Select, Tooltip
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

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
    if (paramCtx_o.workingDir.length < 1) {
        oetrMainRefreshPage_f(paramCtx_o);
        return;
    }
    /*
    --- Save the Working Dir and current Client and Task in the Cookies
    */
    paramCtx_o.cookiesManagement_o.oeComCookiesSet_m("oetrWorkingDir",
        paramCtx_o.workingDir, paramCtx_o.cookiesManagement_o.oeComCookiesDuration_e.unlimited);
    paramCtx_o.cookiesManagement_o.oeComCookiesSet_m("oetrCurrentClient",
        paramCtx_o.currentClient_s, paramCtx_o.cookiesManagement_o.oeComCookiesDuration_e.unlimited);
    paramCtx_o.cookiesManagement_o.oeComCookiesSet_m("oetrCurrentTask",
        paramCtx_o.currentTask_s, paramCtx_o.cookiesManagement_o.oeComCookiesDuration_e.unlimited);
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
    const locWorkingDir = await window.electronAPI.dialogFolderPath();
    /*
    --- If cancel the return with refresh
    */
    if (locWorkingDir.length < 1) {
        oetrParametersRefreshModal_f(paramCtx_o);
        return;
    }
    /*
    --- Update the Working dir in the context
    */
    paramCtx_o.workingDir = locWorkingDir;
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
  ! Routine    : locDeleteTask_f                                !
  ! Description: Delete a task from the definitions             !
  !                                                             !
  ! IN:  - Context                                              !
  !      - Event                                                !
  ! OUT: - Nothing                                              !
  +-------------------------------------------------------------+
*/
function locDeleteTask_f(paramCtx_o, paramEvent) {
    /*
    --- Stop Event
    */
    paramEvent.preventDefault();
    /*
    --- If current client or task is not defined then return without change
    */
    const locClient_s = paramCtx_o.currentClient_s;
    if (locClient_s.length < 1) return;
    const locTask_s = paramCtx_o.currentTask_s;
    if (locTask_s.length < 1) return;
    /*
    --- Delete the task in the definition object
    */
    delete paramCtx_o.definitions_o.clients_o[locClient_s][locTask_s];
    /*
    --- Set the last task as current task
    */
    const locTasks_a = Object.keys(paramCtx_o.definitions_o.clients_o[locClient_s]);
    const locTaskNbElt = locTasks_a.length;
    if (locTaskNbElt > 0) {
        paramCtx_o.currentTask_s = locTasks_a[locTaskNbElt - 1];
    } else {
        paramCtx_o.currentTask_s = "";
    }
    /*
    --- Refresh the parameters modal
    */
    oetrParametersRefreshModal_f(paramCtx_o);
}

/*+-------------------------------------------------------------+
  ! Routine    : locAddNewTask_f                                !
  ! Description: Add a new task in the definitions              !
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
    --- Check if the current client exists in the definition
    */
    if ((paramCtx_o.definitions_o.clients_o === undefined) ||
        (paramCtx_o.definitions_o.clients_o[paramCtx_o.currentClient_s] === undefined)) return;
    /*
    --- Save the current task
    */
    paramCtx_o.currentTask_s = locTask_s;
    /*
    --- Check if the task exists in the definition
    */
    if (paramCtx_o.definitions_o.clients_o[locTask_s] === undefined) {
        /*
        --- Create the new task definition
        */
        paramCtx_o.definitions_o.clients_o[paramCtx_o.currentClient_s][locTask_s] = {};
        /*
        --- Authorise parameters validation
        */
        paramCtx_o.parametersCompleted = true;
    }
    /*
    --- Set Focus on Entry task
    */
    paramCtx_o.focus = oetrDefFocus_e.parametersEntryTask;
    /*
    --- Refresh the parameters modal
    */
    oetrParametersRefreshModal_f(paramCtx_o);
}

/*=============== Local JSX components =========================*/

/*
+-------------------------------------------------------------+
! Routine    : LocContent_jsx                                 !
! Description: JSX Parameters Modal content                   !
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

    const locLabelNewClient = locTrans_o.oeComTransGet_m("parameters", "entryNewClient");
    const locLabelNewTask = locTrans_o.oeComTransGet_m("parameters", "entryNewTask");
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
    const locDisplayAddClient = (locCtx_o.workingDir.length < 1) ? "none" : "box";
    const locDisplaySelectClient = (locClients_a.length < 1) ? "none" : "block";
    const locDisplayAddTask = ((locClients_a.length < 1) || (locCtx_o.currentClient_s.length < 1)) ? "none" : "box";
    const locDisplaySelectTask = (locTasks_a.length < 1) ? "none" : "block";
    /*
    --- Set the Focus
    */
    if (locCtx_o.workingDir.length < 1) {
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
                    sx={{mr: "10px"}}
                    autoFocus={locCtx_o.focus === oetrDefFocus_e.parametersWorkingDir}
                >
                    <CreateNewFolderIcon fontSize="large"/>
                </IconButton>
                <span>
                    <i>
                        {locCtx_o.workingDir}
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
            <Grid container spacing={1} sx={{mt: "20px", display: locDisplayAddTask}}>
                <Grid size={6}>
                    <div>
                        {locTrans_o.oeComTransGet_m("parameters", "labelCreateTask")}
                    </div>
                    <Box sx={{width: "320px", mt: "8px"}}>
                        <FormControl variant="outlined" fullWidth size="small">
                            <InputLabel htmlFor="oetrParamEntryTask">{locLabelNewTask}</InputLabel>
                            <OutlinedInput
                                id="oetrParamEntryTask"
                                key={"oetrParamEntryTaskKey" + Math.random()}
                                defaultValue=""
                                type="text"
                                label={locLabelNewTask}
                                size="small"
                                autoFocus={locCtx_o.focus === oetrDefFocus_e.parametersEntryTask}
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
                </Grid>
                <Grid size={6} sx={{display: locDisplaySelectTask}}>
                    {locTrans_o.oeComTransGet_m("parameters", "labelSelectTask")}
                    <Box sx={{minWidth: "100px", display: "flex"}}>
                        <FormControl variant="standard" fullWidth size="small">
                            <Select
                                id="oetrParamSelectTask"
                                key={"oetrParamSelectTaskKey" + Math.random()}
                                value={locCtx_o.currentTask_s}
                                defaultValue={locCtx_o.currentTask_s}
                                variant="standard"
                                onChange={(paramEvent) => {
                                    locCtx_o.currentTask_s = paramEvent.target.value;
                                    oetrParametersRefreshModal_f(locCtx_o);
                                }}
                            >
                                {locTasks_a.map((paramTask) => (
                                    <MenuItem key={"itemTask" + paramTask}
                                              value={paramTask}>{paramTask}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Tooltip title={locTrans_o.oeComTransGet_m("parameters", "toolTipDeleteTask")}>
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={(paramEvent) => locDeleteTask_f(locCtx_o, paramEvent)}
                                sx={{ml: "4px"}}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </div>
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
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
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
            </DialogTitle>
            <DialogContent sx={{pb: 0, mb: 0}}>
                <LocContent_jsx ctx={locCtx_o}/>
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
    );
}
