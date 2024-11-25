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
  !  File  : oeComCookies.js                                    !
  !  Desc. : Common Cookies Management                          !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 28/09/2024                                         !
  +-------------------------------------------------------------+
*/

/*=============== Class definition ============================*/

/*+-------------------------------------------------------------+
  ! Class      : OeComCookies_c                                 !
  ! Description: Class for Cookies management                   !
  !                                                             !
  ! Public methods:                                             !
  !   - constructor    : Constructor                            !
  !   - oaComtransGet_m : Get the translated string             !
  !   - oaComTransChangeLocale_m : Change the locale            !
  +-------------------------------------------------------------+
*/
export class OeComCookies_c {

    /*=============== Class variables ==============================*/
    /*
    --- Current Cookies
    */
    oeComCookiesCurrent_o = {};
    /*
    --- Cookies duration
    */
    oeComCookiesDuration_e = {
        session: 0,
        oneDay: 1,
        oneMonth: 2,
        oneYear: 3,
        unlimited: 4
    }

    /*=============== Class methods ================================*/

    /*+-------------------------------------------------------------+
      ! Routine    : oeComCookiesGetAll_m                           !
      ! Description: Get All the current Cookies                    !
      !                                                             !
      ! IN:  - Nothing                                              !
      ! OUT: - Current Cookies Object                               !
      +-------------------------------------------------------------+
    */
    oeComCookiesGetAll_m() {
        /*
        --- Initialisation
        */
        this.oeComCookiesCurrent_o = {};
        /*
        --- Get the Cookies string
        */
        const locCookies_s = document.cookie;
        /*
        --- Convert String to Object
        */
        const locCookies_a = locCookies_s.split('; ');
        for (let locI = 0; locI < locCookies_a.length; locI++) {
            const locElt_a = locCookies_a[locI].split('=');
            this.oeComCookiesCurrent_o[locElt_a[0]] = locElt_a[1];
        }
        /*
        --- Return the found Cookies
        */
        return this.oeComCookiesCurrent_o;
    }

    /*+-------------------------------------------------------------+
      ! Routine    : oeComCookiesGet_m                              !
      ! Description: Get the current value of Cookie                !
      !                                                             !
      ! IN:  - Cookie name                                          !
      ! OUT: - Value of the cookie or "" if not existing            !
      +-------------------------------------------------------------+
    */
    oeComCookiesGet_m(param_name) {
        /*
        --- Initialisation
        */
        let locValue_s = "";
        /*
        --- Check that the cookie exist
        */
        if (param_name in this.oeComCookiesCurrent_o) {
           locValue_s = this.oeComCookiesCurrent_o[param_name];
        }
        /*
        --- Return the value of Cookie
        */
        return locValue_s;
    }

  /*+-------------------------------------------------------------+
    ! Routine    : oeComCookiesSet_m                              !
    ! Description: Set a Cookie                                   !
    !                                                             !
    ! IN:  - Cookie name                                          !
    !      - Cookie value                                         !
    !      - Cookie duration                                      !
    ! OUT: - True = Ok                                            !
    +-------------------------------------------------------------+
  */
    oeComCookiesSet_m(paramName,paramValue,paramDuration) {
        /*
        --- Initialisation
        */
        let locCookie_s = paramName+"="+paramValue;
        /*
        --- Check if duration is required
        */
        switch (paramDuration) {
            case this.oeComCookiesDuration_e.oneDay:
                locCookie_s += "; max-age=86400"
                break;
            case this.oeComCookiesDuration_e.oneMonth:
                locCookie_s += "; max-age=2678400"
                break;
            case this.oeComCookiesDuration_e.oneYear:
                locCookie_s += "; max-age=31536000"
                break;
            case this.oeComCookiesDuration_e.unlimited:
                locCookie_s += "; max-age=315360000"
                break;
            default:
                /*
                --- Only during the session: don't add anything
                */
                break;
        }
        /*
        --- Set the cookie
        */
        document.cookie = locCookie_s;
        /*
        --- Refresh the current cookies object
        */
        this.oeComCookiesGetAll_m();
        /*
        --- Return Ok
        */
        return true;
    }
    /*=============== Constructor Routine =========================*/

    /*+-------------------------------------------------------------+
      ! Description: Constructor                                    !
      !                                                             !
      ! IN:  - Nothing                                              !
      ! OUT: - Nothing                                              !
      +-------------------------------------------------------------+
    */
    constructor() {
        /*
        --- Read the current cookies
        */
        this.oeComCookiesGetAll_m();
        return true;
    } // Constructor

} // end Class