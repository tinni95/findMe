import React from "react";
var _ = require("lodash");

export const Settori = ["Abbigliamento", "Alberghiero", "Arte e Cultura", "Bar e Ristorazione", "Benessere e Salute", "Edilizia", "Energia e Ambiente", "Formazione", "Forniture", "Industria", "Informatica e Telecomunicazioni", "Intrattenimento", "Marketing", "Economia", "Motori", "Servizi per Privati", "Servizi per Aziende", "Servizi di Intermediazione", "Servizi Finanziari", "Servizi Immobiliari", "Sport", "Trasporti", "Turismo", "Vendita al Dettaglio", "Economia", "Altro"];

export const TipoSocio = ["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];

export const TitoliPosizioni = ["co-fondatore", "C.E.O", "C.F.O", "C.T.O", "C.O.O", "Ingegnere", "Social Media Manager", "Ux/Ui designer", "Tecnico di marketing", "Digital marketer", "Tecnico della pubblicità", "Contabile", "Front-End Developer", "Back-End Developer", "Full-Stack Developer", "Customer Support", "Risorse Umane", "Legale", "Vendite"]

export const indexOfPosition = (positions, position) => {
    let toReturn = -1;
    positions.forEach((temp, index) => {
        if (_.isEqual(temp, position)) {
            toReturn = index
        }
    })
    return toReturn
}