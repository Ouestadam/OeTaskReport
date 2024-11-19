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
  !  File  : oetConfig.js                                       !
  !  Desc. : Configuration for rendering of oetaskreport        !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 18/11/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/

/*=============== Definitions ==================================*/
/*
--- oetaskreport configuration parameters
*/
export const oetrConfig_o = {
    version: "1.0",
    modification: "18/11/2024",
    locale: "fr-FR",
    colors_o: {
        backgroundDialogTitle: "#d6d4d4",
        backgroundStart : "#bddca0",
        backgroundEnd : "#59674d",
        backgroundIcon : "#efefef",
        backgroundSelect : "#efefef",
        backgroundTableHeader : "#efefef",
        foregroundTableHeader : "#000000",
        foregroundFooter : "#efefef",
    },
    definitionsFileName: "oeTaskReport.json",
    reportFileName: "oetrMonth.json",
    urlOuestadam: "https://ouestadam.com"
}