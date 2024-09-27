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
  !  File  : index.js                                           !
  !  Desc. : Rendering of oetaskreport                          !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 26/09/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
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
