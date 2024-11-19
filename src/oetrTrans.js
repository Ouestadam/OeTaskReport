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
  !  File  : oetrTrans.js                                      !
  !  Desc. : Translation table for rendering of oetaskreport    !
  !                                                             !
  !  Author: D.ESTEVE                                           !
  !  Modif.: 13/11/2024                                         !
  !                                                             !
  !  0.1: Creation                                              !
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
                en: "Total for $$1$$",
                fr: "Total pour $$1$$"
            }
        }
    }
;