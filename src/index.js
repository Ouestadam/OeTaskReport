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
  !  File  : index.js                                           !
  !  Desc. : Rendering of oetaskreport                          !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 26/09/2024                                         !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/
/*
--- External products
*/
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
/*
--- Ouestadam products
*/
import {OetrMainEntry_jsx} from "./oetrMain.js";
import {oetrInit_f} from "./oetrInit";

/*=============== Global variables =============================*/
/*
---- General context
*/
const oetrCtx_o = {};

/*=============== Main =========================================*/
/*
--- Start initialization
*/
oetrInit_f(oetrCtx_o);

/*
--- Render the Main page
*/
const locRoot = ReactDOM.createRoot(document.getElementById("root"));
locRoot.render(
  <React.StrictMode>
    <OetrMainEntry_jsx ctx={oetrCtx_o}/>
  </React.StrictMode>
);
