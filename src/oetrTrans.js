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
  !  File  : oetrTrans.js                                       !
  !  Desc. : Translation table for rendering of oetaskreport    !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 25/11/2024                                         !
  +-------------------------------------------------------------+
*/
/*=============== Exported constants ===========================*/
/*
--- oetr translation table
*/
export const oetrTrans_o = {
    "common": {
        "cancel": {
            en: "Cancel",
            fr: "Annuler"
        },
        "return": {
            en: "Return",
            fr: "Retour"
        },
        "validate": {
            en: "Validate",
            fr: "Validation"
        }
    },
    "main": {
        "title": {
            en: "Tasks reporting tools",
            fr: "Outil de déclaration de tâches"
        },
        "urlOuestadam": {
            en: "Developed by Denis Esteve",
            fr: "Développé par Denis Esteve"
        },
        "toolTipParameters": {
            en: "Configuration",
            fr: "Configuration"
        },
        "toolTipReport": {
            en: "Generate reports",
            fr: "Création de rapports"
        },
        "toolTipInfo": {
            en: "Information and help",
            fr: "Information et aide"
        }
    },
    "months": {
        "00": {
            en: "Full year",
            fr: "Année complète"
        },
        "01": {
            en: "January",
            fr: "Janvier"
        },
        "02": {
            en: "February",
            fr: "Février"
        },
        "03": {
            en: "March",
            fr: "Mars"
        },
        "04": {
            en: "April",
            fr: "Avril"
        },
        "05": {
            en: "May",
            fr: "Mai"
        },
        "06": {
            en: "June",
            fr: "Juin"
        },
        "07": {
            en: "July",
            fr: "Juillet"
        },
        "08": {
            en: "August",
            fr: "Août"
        },
        "09": {
            en: "September",
            fr: "Septembre"
        },
        "10": {
            en: "October",
            fr: "Octobre"
        },
        "11": {
            en: "November",
            fr: "Novembre"
        },
        "12": {
            en: "December",
            fr: "Décembre"
        }
    },
    "clients": {
        "_All": {
            en: "All clients",
            fr: "Tous les clients"
        },
    },
    "parameters": {
        "title": {
            en: "Parameters",
            fr: "Paramètres"
        },
        "labelGetWorkingDir": {
            en: "Select the data folder:",
            fr: "Sélectionner l'emplacement des données :"
        },
        "labelCreateClient": {
            en: "Add a new client in the list:",
            fr: "Ajouter un nouveau client dans la liste :"
        },
        "entryNewClient": {
            en: "New client",
            fr: "Nouveau client"
        },
        "labelSelectClient": {
            en: "Select a client:",
            fr: "Sélectionner un client :"
        },
        "toolTipDeleteClient": {
            en: "Remove the selected client",
            fr: "Enlève le client sélectionné"
        },
        "labelCreateTask": {
            en: "Add a new task in the list:",
            fr: "Ajouter une nouvelle tâche dans la liste :"
        },
        "entryNewTask": {
            en: "New task",
            fr: "Nouvelle tâche"
        },
        "labelSelectTask": {
            en: "List of tasks:",
            fr: "Liste des tâches :"
        },
        "toolTipDeleteTask": {
            en: "Suppress the selected task",
            fr: "Enlève la tâche sélectionnée"
        }
    },
    "startTask": {
        "buttonStart": {
            en: "Start the task",
            fr: "Démarrage de la tâche"
        },
        "labelSelectClient": {
            en: "Select a client:",
            fr: "Sélectionner un client :"
        },
        "labelSelectTask": {
            en: "Select a task:",
            fr: "Sélectionner une tâche :"
        }
    },
    "endTask": {
        "title": {
            en: "End of the current task",
            fr: "Fin de la tâche courante"
        },
        "buttonEnd": {
            en: "End the task",
            fr: "Arrêt de la tâche"
        },
        "buttonSave": {
            en: "Record the task",
            fr: "Enregistrer la tâche"
        },
        "buttonCancel": {
            en: "Don't record the task",
            fr: "Ne pas enregistrer la tâche"
        },
        "labelSelectedClient": {
            en: "Working for the client:",
            fr: "Client en cours :"
        },
        "labelSelectedTask": {
            en: "Working on the task:",
            fr: "Tâche en cours :"
        },
        "labelStartDate": {
            en: "Task start date:",
            fr: "Date de démarrage de la tâche :"
        },
        "labelEndDate": {
            en: "Task end date:",
            fr: "Date d'arrêt de la tâche :"
        },
        "labelDuration": {
            en: "Task duration:",
            fr: "Durée de la tâche :"
        },
        "durationMinutes": {
            en: "$$1$$ minutes",
            fr: "$$1$$ minutes"
        },
        "durationHours": {
            en: " ($$1$$h $$2$$m)",
            fr: " ($$1$$h $$2$$m)"
        },
    },
    "report": {
        "title": {
            en: "Generate reports",
            fr: "Création de rapports"
        },
        "noReport": {
            en: "No monthly report found in the data folder",
            fr: "Aucun rapport mensuel trouvé dans le répertoire de données"
        },
        "buttonCopyPaste": {
            en: "Copy/Paste",
            fr: "Copier/Coller"
        },
        "buttonCSV": {
            en: "CSV file",
            fr: "Fichier CSV"
        },
        "labelSelectDate": {
            en: "Select the year and the month(s) for the report:",
            fr: "Sélectionner l'année et le(s) mois pour le rapport :"
        },
        "noMonth": {
            en: "No monthly report found for this year",
            fr: "Aucun rapport mensuel pour cette année"
        },
        "labelSelectClient": {
            en: "Select client(s) for the report:",
            fr: "Sélectionner le(s) client(s) pour le rapport :"
        },
        "noClient": {
            en: "No client found",
            fr: "Aucun client trouvé"
        },
        "labelSwitchDetail": {
            en: "Detailed report:",
            fr: "Rapport détaillé :"
        },
        "labelDivider": {
            en: "Report",
            fr: "Rapport"
        },
        "labelReportClient": {
            en: "Client",
            fr: "Client"
        },
        "labelReportYear": {
            en: "Year",
            fr: "Année"
        },
        "labelReportMonth": {
            en: "Month",
            fr: "Mois"
        },
        "headerClient": {
            en: "Client",
            fr: "Client"
        },
        "headerTask": {
            en: "Task",
            fr: "Tâche"
        },
        "headerDate": {
            en: "Date",
            fr: "Date"
        },
        "headerMinutes": {
            en: "Nb.minutes",
            fr: "Nb.minutes"
        },
        "headerHours": {
            en: "Nb.hours",
            fr: "Nb.heures"
        },
        "totalClient": {
            en: "Total client $$1$$",
            fr: "Total client $$1$$"
        },
        "totalTask": {
            en: "Total task $$1$$",
            fr: "Total tâche $$1$$"
        },
        "copied": {
            en: "Report copied in the Clipboard.",
            fr: "Rapport copié dans le Clipboard."
        },
        "csvCreated": {
            en: "The following CSV file has been created: ",
            fr: "Le fichier CSV suivant a été créé : "
        }
    },
    "info": {
        "title": {
            en: "Information",
            fr: "Information"
        },
        "toolTipDenis": {
            en: "Denis ESTEVE (OUESTADAM freelance company)",
            fr: "Denis ESTEVE (Micro-entreprise OUESTADAM)"
        },
        "toolTipGPL": {
            en: "GNU GPL V3 license description",
            fr: "Description de la licence GNU GPL V3"
        },
        "overviewStart": {
            en: " is a free program that allows you to easily build " +
                "activities reports. It has been developed by ",
            fr: " est un programme gratuit qui permet de construire simplement " +
                "des rapports d'activités. Il a été développé par ",
        },
        "overviewEnd": {
            en: "This program comes with ABSOLUTELY NO WARRANTY. " +
                "This is free software, and you are welcome to redistribute it " +
                "under certain conditions following the GNU General Public License "+
                "version 3 (or later) available on following Web site: ",
            fr: "Ce programme ne vient avec ABSOLUMENT AUCUNE GARANTIE. " +
                "C'est un logiciel libre, et vous êtes bienvenu de le redistribuer " +
                "sous certaines conditions définie par la licence GNU GPL version 3 "+
                "(ou ultérieure) disponible sur le site Web suivant : ",
        },
    }
}