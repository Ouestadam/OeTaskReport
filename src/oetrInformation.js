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
  ! License along with oeTaskReport                             !
  ! If not, see <https://www.gnu.org/licenses/>.                !
  +-------------------------------------------------------------+
  +-------------------------------------------------------------+
  !  File  : oetrInformation.js                                 !
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
import React from 'react';
import {
    Avatar, Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton, Tooltip, Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/*
--- Ouestadam products
*/
import {OetrError_jsx} from "./oetrError";
import {oetrDefModal_e} from "./oetrDef";
import {oetrMainRefreshPage_f} from "./oetrMain";

/*
--- Ouestadam resources
*/
import oetrImgDenis from "./assets/Denis_Esteve_Janvier_2024_Medium.jpg";
import oetrGPLIcon from "./assets/gplv3-or-later.png";
import Grid from "@mui/material/Grid2";


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
    --- Refresh the main page
    */
    oetrMainRefreshPage_f(paramCtx_o);
}

/*
+-------------------------------------------------------------+
! Routine    : LocContent_jsx                                 !
! Description: JSX Information Modal content                  !
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
    /*
    --- Return the Dialog Content to display
    */
    return (
        <div>
            <Grid container sx={{width: "100%"}}>
                <Grid size={2} sx={{textAlign: "left"}}>
                    <Tooltip title={locTrans_o.oeComTransGet_m("info", "toolTipDenis")}>
                        <IconButton
                            color="info"
                            onClick={() => window.open(locCtx_o.config_o.urlOuestadam, "_blank")}
                        >
                            <Avatar
                                alt="Denis Esteve picture"
                                src={oetrImgDenis}
                                sx={{width: "90px", height: "90px"}}
                            />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid size={8}>
                    <Box sx={{ml: "10px"}}>
                        <Typography variant="body2">
                            <strong>{locCtx_o.config_o.name}</strong>
                            {locTrans_o.oeComTransGet_m("info", "overviewStart")}
                            <a href={locCtx_o.config_o.urlOuestadam} target="_blank">
                                Denis ESTEVE
                            </a>
                            .<br/><br/>
                            {locTrans_o.oeComTransGet_m("info", "overviewEnd")}
                            <a href={locCtx_o.config_o.urlLicenses} target="_blank">
                                {locCtx_o.config_o.urlLicenses}
                            </a>
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={2} sx={{textAlign: "right"}}>
                    <Tooltip title={locTrans_o.oeComTransGet_m("info", "toolTipGPL")}>
                        <IconButton
                            color="info"
                            onClick={() => window.open(locCtx_o.config_o.urlLicenses, "_blank")}
                        >
                            <Avatar
                                alt="GNU GPL Icon"
                                variant="square"
                                src={oetrGPLIcon}
                                sx={{width: "75px", height: "32px"}}
                            />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </div>
    );
}

/*=============== Exported JSX components ======================*/

/*+-------------------------------------------------------------+
  ! Routine    : OetrDialogInformation_jsx                      !
  ! Description: JSX Information Dialog                         !
  !                                                             !
  ! IN:  - Properties including Context                         !
  ! OUT: - Page rendering                                       !
  +-------------------------------------------------------------+
*/
export function OetrDialogInformation_jsx(paramProps_o) {
    /*
    --- Initialisation
    */
    const locCtx_o = paramProps_o.ctx;
    const locTrans_o = locCtx_o.trans_o;
    const locColors_o = locCtx_o.config_o.colors_o;
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
                    {locTrans_o.oeComTransGet_m("info", "title")}
                    <IconButton
                        aria-label="Close"
                        size="small"
                        sx={{position: "absolute", right: "8px"}}
                        onClick={(paramEvent) => locClose_f(locCtx_o, paramEvent)}
                    >
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{pb: 0, mb: 0, mt: 0}}>
                    <LocContent_jsx ctx={locCtx_o}/>
                </DialogContent>
                <DialogActions sx={{mt: "10px", mb: 0}}>
                    <Button
                        onClick={(paramEvent) => locClose_f(locCtx_o, paramEvent)}
                    >
                        {locTrans_o.oeComTransGet_m("common", "return")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
