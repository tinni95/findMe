import React from "react";
var _ = require("lodash");

export const Settori = ["Abbigliamento", "Alberghiero", "Arte e Cultura", "Bar e Ristorazione", "Benessere e Salute", "Edilizia", "Energia e Ambiente", "Formazione", "Forniture", "Industria", "Informatica e Telecomunicazioni", "Intrattenimento", "Marketing", "Economia", "Motori", "Servizi per Privati", "Servizi per Aziende", "Servizi di Intermediazione", "Servizi Finanziari", "Servizi Immobiliari", "Sport", "Trasporti", "Turismo", "Vendita al Dettaglio", "Economia", "Scienze", "Altro"];


export const TipoSocio = ["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];

export const TitoliPosizioni = ["co-fondatore", "C.E.O", "C.F.O", "C.T.O", "C.O.O", "Contabile",
    "Front-End Developer", "Back-End Developer", "Full-Stack Developer", "Customer Support", "Risorse Umane", "Legale", "Vendite",
    "Designer di interni", "Designer di esterni", "Designer del prodotto", "Graphic Designer", "Fashion Designer", "Ux/Ui designer",
    "Marketing Digitale", "Tecnico della pubblicità", "Social Media Manager", "Tecnico di marketing",
    "Ingegnere", "Ingegnere Meccanico", "Ingegnere Elettronico", "Ingegnere Elettrico", "Ingegnere Informatico", "Ingegnere Civile",
    "Psicologo", "Psicoterapeuta",
    "Architetto", "Architetto di Interni", "Architetto di esterni",
    "Consulente Aziendale", "Commercialista", "Contabile",
    "Responsabile Strategico", "Analista Finanziaro"
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