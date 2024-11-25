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
    IconButton
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
    /*
    --- Return the Dialog Content to display
    */
    return (
        <div>
            <Avatar
                alt="Denis Esteve picture"
                src={oetrImgDenis}
                sx={{position: "absolute", top: "48px", left: "8px", width: "100px", height: "100px"}}
            />
            <Avatar
                alt="GNU GPL Icon"
                variant="square"
                src={oetrGPLIcon}
                sx={{position: "absolute", top: "48px", right: "8px", width: "75px", height: "32px"}}
            />
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
                <DialogContent sx={{pb: 0, mb: 0, mt: '10px', minHeight: "300px"}}>
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
