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
  !  File  : oetConfig.js                                       !
  !  Desc. : Configuration for rendering of oetaskreport        !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 30/01/2025                                         !
  +-------------------------------------------------------------+
*/
/*=============== Imports ======================================*/

/*=============== Definitions ==================================*/
/*
--- oetaskreport configuration parameters
*/
export const oetrConfig_o = {
    version: "1.2.4",
    modification: "30/01/2025",
    name: "oeTaskReport",
    locale: "fr-FR",
    colors_o: {
        backgroundDialogTitle: "#d6d4d4",
        backgroundStart : "#bddca0",
        backgroundEnd : "#59674d",
        backgroundIcon : "#efefef",
        backgroundSelect : "#efefef",
        backgroundTableHeader : "#faf9dd",
        backgroundTableTotalAllClients : "#f3fffe",
        backgroundTableTotalClient : "#fff7f3",
        backgroundTableTotalTask : "#f4ffef",
        foregroundFooter : "#efefef",
    },
    definitionsFileName: "oeTaskReport.json",
    reportFileName: "oetrMonth.json",
    urlOuestadam: "https://ouestadam.com",
    urlFreeware: "https://ouestadam.com/freeware",
    urlGithub: "https://github.com/Ouestadam/OeTaskReport/",
    urlLicenses: "https://www.gnu.org/licenses/"
}