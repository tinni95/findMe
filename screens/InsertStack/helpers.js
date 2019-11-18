import React from "react";
var _ = require("lodash");
export const Settori = ["Aereonautica", "Fashion", "Ingegneria", "Ristorazione", "Intrattenimento", "Cinofilia", "Musica", "Arte", "Teatro"];
export const TipoSocio = ["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];

export const indexOfPosition = (positions, position) => {
    let toReturn = -1;
    positions.forEach((temp, index) => {
        if (_.isEqual(temp, position)) {
            toReturn = index
        }
    })
    return toReturn
}