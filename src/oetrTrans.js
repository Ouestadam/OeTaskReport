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
        }
    }
};