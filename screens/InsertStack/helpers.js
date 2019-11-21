import React from "react";
var _ = require("lodash");

export const Settori = ["Abbigliamento", "Alberghiero", "Arte e Cultura", "Bar e Ristorazione", "Benessere e Salute", "Edilizia", "Energia e Ambiente", "Formazione", "Forniture", "Informatica e Telecomunicazioni", "Intrattenimento", "Marketing", "Direzione", "Motori", "Servizi per Privati", "Servizi per Aziende", "Servizi di Intermediazione", "Servizi Finanziari", "Servizi Immobiliari", "Sport", "Trasporti", "Turismo", "Vendita al Dettaglio", "Economia", "Scienze", "Altro"];

export const Requisiti = [
    "Laurea Di Primo Livello",
    "Laurea Magistrale di Primo Livello",
    "Scuola Superiore",
    "PHP",
    "MySql",
    "Wordpress",
    "Magento",
    "React-Native",
    "React",
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "Linguaggio Di Programmazione Orientato Agli Oggetti",
    "Abilità di Presentazione",
    "Abilità di Vendite",
    "Lavoro di Squadra",
    "Illustrator",
    "Adobe Creative Cloud",
    "After Effects",
    "Logic Pro x",
]

export const TipoSocio = ["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];

export const TitoliPosizioni = [
    {
        titolo: "co-fondatore",
        categoria: "Direzione"
    }, {
        titolo: "C.E.O",
        categoria: "Direzione"
    }, {
        titolo: "C.F.O",
        categoria: "Direzione"
    }, {
        titolo: "C.T.O",
        categoria: "Direzione"
    }, {
        titolo: "C.O.O",
        categoria: "Direzione"
    }, {
        titolo: "Contabile",
        categoria: "Servizi per Aziende"
    }, {
        titolo: "Front-End Developer",
        categoria: "Informatica e Telecomunicazioni"
    }, {
        titolo: "Back-End Developer",
        categoria: "Informatica e Telecomunicazioni"
    }, {
        titolo: "Full-Stack Developer",
        categoria: "Informatica e Telecomunicazioni"
    }, {
        titolo: "Customer Support",
        categoria: "Servizi per Aziende"
    }, {
        titolo: "Risorse Umane",
        categoria: "Servizi per Aziende"
    },
    {
        titolo: "Legale",
        categoria: "Servizi per Aziende"
    },
    {
        titolo: "Legale",
        categoria: "Servizi per Privati"
    },
    {
        titolo: "Vendite",
        categoria: "Servizi per Aziende"
    },
    {
        titolo: "Designer di interni",
        categoria: "Arte e Cultura"
    },
    {
        titolo: "Designer di esterni",
        categoria: "Arte e Cultura"
    },
    {
        titolo: "Designer del prodotto",
        categoria: "Arte e Cultura"
    },
    {
        titolo: "Graphic Designer",
        categoria: "Arte e Cultura"
    },
    {
        titolo: "Fashion Designer",
        categoria: "Abbigliamento"
    },
    {
        titolo: "Ux/Ui designer",
        categoria: "Informatica e Telecomunicazioni"
    },
    {
        titolo: "Marketing Digitale",
        categoria: "Marketing"
    },
    {
        titolo: "Tecnico della pubblicità",
        categoria: "Marketing"
    },
    {
        titolo: "Social Media Manager",
        categoria: "Marketing"
    },
    {
        titolo: "Tecnico di Marketing",
        categoria: "Marketing"
    },
    {
        titolo: "Ingegnere",
        categoria: "Motori"
    },
    {
        titolo: "Ingegnere Meccanico",
        categoria: "Motori"
    },
    {
        titolo: "Ingegnere Elettronico",
        categoria: "Motori"
    },
    {
        titolo: "Ingegnere Elettrico",
        categoria: "Motori"
    },
    {
        titolo: "Ingegnere Informatico",
        categoria: "Informatica e Telecomunicazioni"
    },
    {
        titolo: "Ingegnere Civile",
        categoria: "Servizi Immobiliari"
    },
    {
        titolo: "Psicologo",
        categoria: "Benessere e Salute"
    },
    {
        titolo: "Psicoterapeuta",
        categoria: "Benessere e Salute"
    },
    {
        titolo: "Architetto",
        categoria: "Edilizia"
    },
    {
        titolo: "Architetto di Interni",
        categoria: "Edilizia"
    },
    {
        titolo: "Architetto di Esterni",
        categoria: "Edilizia"
    },
    {
        titolo: "Consulente Aziendale",
        categoria: "Servizi per Aziende"
    },
    {
        titolo: "Commercialista",
        categoria: "Servizi per Aziende"
    },
    {
        titolo: "Contabile",
        categoria: "Servizi per Aziende"
    },
    {
        titolo: "Contabile",
        categoria: "Servizi per Aziende"
    },
    {
        titolo: "Contabile",
        categoria: "Analista Finanziaro"
    },

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