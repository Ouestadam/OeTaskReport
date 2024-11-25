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
  !  File  : oeComTrans.js                                      !
  !  Desc. : Common Translation Management                      !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 09/10/2024                                         !
  +-------------------------------------------------------------+
*/

/*=============== Class definition ============================*/

/*+-------------------------------------------------------------+
  ! Class      : OeComTrans_c                                   !
  ! Description: Class for translation management               !
  !                                                             !
  ! Public methods:                                             !
  !   - constructor    : Constructor setting the locale         !
  !   - oaComtransGet_m : Get the translated string             !
  !   - oaComTransChangeLocale_m : Change the locale            !
  +-------------------------------------------------------------+
*/
export class OeComTrans_c {
    /*=============== Constructor Routine =========================*/

    /*+-------------------------------------------------------------+
      ! Description: Constructor                                    !
      !                                                             !
      ! IN:  - Locale                                               !
      !      - Strings repository                                   !
      ! OUT: - Nothing                                              !
      +-------------------------------------------------------------+
    */
    constructor(paramLocale, paramStringsRepo) {
        /*=============== Instance Variables =======================*/
        /*
        --- Locale
        */
        this.oeComTransShortLocale = "fr";
        /*
        --- Strings repository
        */
        this.oeComTransStringsRepo = {};

        /*=============== Create Instance ==========================*/
        /*
        --- Update Locale
        */
        if (paramLocale) this.oeComTransShortLocale = paramLocale.substring(0, 2);
        /*
        --- Update Strings repository
        */
        if (paramStringsRepo) {
            this.oeComTransStringsRepo = paramStringsRepo;
        } else {
            return false;
        } // endif
        return true;
    } // Constructor

    /*=============== Class methods ================================*/

    /*+-------------------------------------------------------------+
      ! Routine    : oeComTransGet_m                                !
      ! Description: Get the translated string                      !
      !                                                             !
      ! IN:  - Page id                                              !
      !      - String id                                            !
      !      - Value 1 (optional)                                   !
      !      - Value 2 (optional)                                   !
      !      - Value 3 (optional)                                   !
      ! OUT: - Extracted string                                     !
      +-------------------------------------------------------------+
    */
    oeComTransGet_m(paramPageId, paramStringId, paramValue1, paramValue2, paramValue3) {
        /*
        --- Get the list of Strings for a page ID and a string ID
        */
        const locStringList = this.oeComTransStringsRepo[paramPageId][paramStringId];
        /*
        --- If the string list doesn't exist then return empty string
        */
        if (!locStringList) return "";
        /*
        --- Get the String according the locale
        */
        let locString = locStringList[this.oeComTransShortLocale];
        /*
        --- If the string doesn't exist then return empty string
        */
        if (!locString) return "";
        /*
        --- Process each optional value
        */
        if (paramValue1 !== undefined) locString = locString.replace("$$1$$", paramValue1);
        if (paramValue2 !== undefined) locString = locString.replace("$$2$$", paramValue2);
        if (paramValue3 !== undefined) locString = locString.replace("$$3$$", paramValue3);
        /*
        --- Return the found string
        */
        return locString;
    } // oeComTransGet_m

    /*+-------------------------------------------------------------+
      ! Routine    : oeComTransChangeLocale_m                       !
      ! Description: Change the locale                              !
      !                                                             !
      ! IN:  - New locale                                           !
      ! OUT: - Nothing                                              !
      +-------------------------------------------------------------+
    */
    oeComTransChangeLocale_m(paramLocale) {
        /*
        --- Update the locale value
        */
        this.oeComTransShortLocale = paramLocale.substring(0, 2);
    } // oeComTransChangeLocale_m
} // end Class