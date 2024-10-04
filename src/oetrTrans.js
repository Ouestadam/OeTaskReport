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
  !  Modif.: 01/10/2024                                         !
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
        },
        "date": {
            en: "$$1$$ at $$2$$",
            fr: "$$1$$ à $$2$$"
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
        }
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
    "startReport": {
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
    "endReport": {
        "buttonEnd": {
            en: "End the task",
            fr: "Arrêt de la tâche"
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
            fr: "Date de démarrage de la Tâche :"
        }
    }
};