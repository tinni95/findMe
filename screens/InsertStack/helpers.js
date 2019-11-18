import React from "react";
var _ = require("lodash");
export const Settori = ["Aereonautica", "Fashion", "Ingegneria", "Ristorazione", "Intrattenimento", "Cinofilia", "Musica", "Arte", "Teatro", "Economia"];
export const TipoSocio = ["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];
export const autoCompleteItems = [
    {
        name: "passsa",
        id: "sad",
        settore: "Aereonautica"
    },
    {
        name: "dasd",
        id: "sa21321d",
        settore: "Aereonautica"
    },
    {
        name: "pusst",
        id: "das",
        settore: "Aereonautica"
    }
]
export const indexOfPosition = (positions, position) => {
    let toReturn = -1;
    positions.forEach((temp, index) => {
        if (_.isEqual(temp, position)) {
            toReturn = index
        }
    })
    return toReturn
}