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
  !  File  : oeComDate.js                                       !
  !  Desc. : Common Date Management                             !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 05/10/2024                                         !
  +-------------------------------------------------------------+
*/

/*=============== Class definition ============================*/

/*+-------------------------------------------------------------+
  ! Class      : OeComDate_c                                    !
  ! Description: Class for Date management                      !
  +-------------------------------------------------------------+
*/
export class OeComDate_c {

    /*=============== Class variables ==============================*/

    /*=============== Class methods ================================*/

    /*+-------------------------------------------------------------+
      ! Routine    : oeComDateChangeLocale_m                        !
      ! Description: Change the locale                              !
      !                                                             !
      ! IN:  - New locale                                           !
      ! OUT: - Nothing                                              !
      +-------------------------------------------------------------+
    */
    oeComDateChangeLocale_m(paramLocale) {
        /*
        --- Update the locale value
        */
        this.oeComDateShortLocale = paramLocale.substring(0, 2);
    }

    /*+-------------------------------------------------------------+
      ! Routine    : oeComDateStringYear_m                          !
      ! Description: Get Year in string                             !
      !                                                             !
      ! IN:  - Date object, if not present use now                  !
      ! OUT: - Year in string                                       !
      +-------------------------------------------------------------+
    */
    oeComDateStringYear_m(paramDate_o) {
        /*
        --- If no provided date the take the now
        */
        const locDate_o = (paramDate_o === undefined) ? (new Date()) : paramDate_o;
        /*
        --- return the Year
        */
        return ("" + locDate_o.getFullYear());
    }

    /*+-------------------------------------------------------------+
      ! Routine    : oeComDateStringMonthNumber_m                   !
      ! Description: Get Month number in string                     !
      !                                                             !
      ! IN:  - Date object, if not present use now                  !
      ! OUT: - Month number in string                               !
      +-------------------------------------------------------------+
    */
    oeComDateStringMonthNumber_m(paramDate_o) {
        /*
        --- If no provided date the take the now
        */
        const locDate_o = (paramDate_o === undefined) ? (new Date()) : paramDate_o;
        /*
        --- return the Month number
        */
        const locMonth = locDate_o.getMonth() + 1;
        return ((locMonth < 10) ? ("0" + locMonth) : ("" + locMonth));
    }

    /*+-------------------------------------------------------------+
      ! Routine    : oeComDateStringMonthName_m                     !
      ! Description: Get Month Name                                 !
      !                                                             !
      ! IN:  - Date object, if not present use now                  !
      ! OUT: - Month name according the locale                      !
      +-------------------------------------------------------------+
    */
    oeComDateStringMonthName_m(paramDate_o) {
        /*
        --- If no provided date the take the now
        */
        const locDate_o = (paramDate_o === undefined) ? (new Date()) : paramDate_o;
        /*
        --- Define Month Name
        */
        const locFrenchMonths_a = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        const locEnglishMonths_a = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        /*
        --- return the Month number
        */
        const locMonth = locDate_o.getMonth();
        return ((this.oeComDateShortLocale === 'fr') ? locFrenchMonths_a[locMonth] :
            locEnglishMonths_a[locMonth]);
    }

    /*+-------------------------------------------------------------+
      ! Routine    : oeComDateStringDay_m                           !
      ! Description: Get Day of the month in string                 !
      !                                                             !
      ! IN:  - Date object, if not present use now                  !
      ! OUT: - Day in string                                        !
      +-------------------------------------------------------------+
    */
    oeComDateStringDay_m(paramDate_o) {
        /*
        --- If no provided date the take the now
        */
        const locDate_o = (paramDate_o === undefined) ? (new Date()) : paramDate_o;
        /*
        --- return the Day
        */
        const locDay = locDate_o.getDate();
        return ((locDay < 10) ? ("0" + locDay) : ("" + locDay));
    }

    /*+-------------------------------------------------------------+
      ! Routine    : oeComDateStringHour_m                          !
      ! Description: Get Hour in string                             !
      !                                                             !
      ! IN:  - Date object, if not present use now                  !
      ! OUT: - Hour in string                                       !
      +-------------------------------------------------------------+
    */
    oeComDateStringHour_m(paramDate_o) {
        /*
        --- If no provided date the take the now
        */
        const locDate_o = (paramDate_o === undefined) ? (new Date()) : paramDate_o;
        /*
        --- return the Hour
        */
        const locHour = locDate_o.getHours();
        return ((locHour < 10) ? ("0" + locHour) : ("" + locHour));
    }

    /*+-------------------------------------------------------------+
      ! Routine    : oeComDateStringMinute_m                        !
      ! Description: Get Hour in string                             !
      !                                                             !
      ! IN:  - Date object, if not present use now                  !
      ! OUT: - Minute in string                                     !
      +-------------------------------------------------------------+
    */
    oeComDateStringMinute_m(paramDate_o) {
        /*
        --- If no provided date the take the now
        */
        const locDate_o = (paramDate_o === undefined) ? (new Date()) : paramDate_o;
        /*
        --- return the Minute
        */
        const locMinute = locDate_o.getMinutes();
        return ((locMinute < 10) ? ("0" + locMinute) : ("" + locMinute));
    }

    /*+-------------------------------------------------------------+
      ! Routine    : oeComDateStringDate_m                          !
      ! Description: Get Date in string                             !
      !                                                             !
      ! IN:  - Date object, if not present use now                  !
      ! OUT: - Date in string according the locale                  !
     +-------------------------------------------------------------+
    */
    oeComDateStringDate_m(paramDate_o) {
        /*
        --- If no provided date the take the now
        */
        const locDate_o = (paramDate_o === undefined) ? (new Date()) : paramDate_o;
        /*
        --- Build the date according French or English
        */
        return ((this.oeComDateShortLocale === 'fr') ? (this.oeComDateStringDay_m(locDate_o) + "/" +
                this.oeComDateStringMonthNumber_m(locDate_o) + "/" + this.oeComDateStringYear_m(locDate_o)) :
            (this.oeComDateStringYear_m(locDate_o) + "/" + this.oeComDateStringMonthNumber_m(locDate_o) +
                "/" + this.oeComDateStringDay_m(locDate_o)));
    }

    /*+-------------------------------------------------------------+
      ! Routine    : oeComDateStringTime_m                          !
      ! Description: Get Date in string                             !
      !                                                             !
      ! IN:  - Date object, if not present use now                  !
      ! OUT: - Time (HH:MM) in string                               !
      +-------------------------------------------------------------+
    */
    oeComDateStringTime_m(paramDate_o) {
        /*
        --- If no provided date the take the now
        */
        const locDate_o = (paramDate_o === undefined) ? (new Date()) : paramDate_o;
        /*
        --- Build the date according French or English
        */
        return (this.oeComDateStringHour_m(locDate_o) + ":" + this.oeComDateStringMinute_m(locDate_o));
    }

    /*+-------------------------------------------------------------+
      ! Routine    : oeComDateStringDateTime_m                      !
      ! Description: Get date and time in string                    !
      !                                                             !
      ! IN:  - Date object, if not present use now                  !
      ! OUT: - Date and Time according the Locale                   !
      +-------------------------------------------------------------+
    */
    oeComDateStringDateTime_m(paramDate_o) {
        /*
        --- If no provided date the take the now
        */
        const locDate_o = (paramDate_o === undefined) ? (new Date()) : paramDate_o;
        /*
        --- Build the Date and Time according the locale
        */
        return ((this.oeComDateShortLocale === 'fr') ?
            (this.oeComDateStringDate_m(locDate_o)+' à '+this.oeComDateStringTime_m(locDate_o)) :
            (this.oeComDateStringDate_m(locDate_o)+' at '+this.oeComDateStringTime_m(locDate_o)));
    }

    /*+-------------------------------------------------------------+
      ! Routine    : oeComDateStringMilliseconds_m                  !
      ! Description: Get date in milliseconds                       !
      !                                                             !
      ! IN:  - Date object, if not present use now                  !
      ! OUT: - Nb Milliseconds since beginning of dates             !
      +-------------------------------------------------------------+
    */
    oeComDateStringMilliseconds_m(paramDate_o) {
        /*
        --- If no provided date the take the now
        */
        const locDate_o = (paramDate_o === undefined) ? (new Date()) : paramDate_o;
        /*
        --- Return nb milliseconds
        */
        return (locDate_o.getTime());
    }

    /*=============== Constructor Routine =========================*/

    /*+-------------------------------------------------------------+
      ! Description: Constructor                                    !
      !                                                             !
      ! IN:  - Locale                                               !
      ! OUT: - Nothing                                              !
      +-------------------------------------------------------------+
    */
    constructor(paramLocale) {
        /*=============== Instance Variables =======================*/
        /*
        --- Locale
        */
        this.oeComDateShortLocale = "fr";

        /*=============== Create Instance ==========================*/
        /*
        --- Update Locale
        */
        if (paramLocale) this.oeComDateShortLocale = paramLocale.substring(0, 2);
        return true;
    } // Constructor
} // end Class