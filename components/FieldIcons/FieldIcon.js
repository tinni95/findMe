import React from 'react';
import { Image } from "react-native";

export const SettoriDict = {
  "Abbigliamento": "Abbigliamento",
  "Alberghiero": "Alberghiero",
  "Arte e Cultura": "Arte",
  "Bar e Ristorazione": "Bar",
  "Benessere e Salute": "Benessere",
  "Edilizia": "Edilizia",
  "Energia e Ambiente": "Energia",
  "Formazione": "Formazione",
  "Informatica e Telecomunicazioni": "It",
  "Intrattenimento": "Intrattenimento",
  "Marketing": "Marketing",
  "Economia": "Economia",
  "Ingegneria": "Ingegneria",
  "Servizi per Privati": "Cravatta",
  "Servizi per Aziende": "Cravatta",
  "Servizi Professionali": "Cravatta",
  "Servizi di Intermediazione": "Cravatta",
  "Servizi Finanziari": "Cravatta",
  "Servizi Immobiliari": "Immobiliari",
  "Sport": "Sport",
  "Scienze": "Scienze",
  "Turismo": "Turismo",
  "Altro": "Other"
}

const components = {
  Abbigliamento: require('../../assets/images/fieldIcons/abbigliamento.png'),
  Alberghiero: require('../../assets/images/fieldIcons/Alberghiero.png'),
  Arte: require('../../assets/images/fieldIcons/Arte.png'),
  Bar: require('../../assets/images/fieldIcons/Bar.png'),
  Benessere: require('../../assets/images/fieldIcons/Benessere.png'),
  Edilizia: require('../../assets/images/fieldIcons/Edilizia.png'),
  Energia: require('../../assets/images/fieldIcons/Energia.png'),
  Formazione: require('../../assets/images/fieldIcons/Formazione.png'),
  It: require('../../assets/images/fieldIcons/Informatica.png'),
  Intrattenimento: require('../../assets/images/fieldIcons/Intrattenimento.png'),
  Marketing: require('../../assets/images/fieldIcons/Marketing.png'),
  Ingegneria: require('../../assets/images/fieldIcons/Motori.png'),
  Cravatta: require('../../assets/images/fieldIcons/Cravatta.png'),
  Immobiliari: require('../../assets/images/fieldIcons/Immobiliari.png'),
  Sport: require('../../assets/images/fieldIcons/Sports.png'),
  Scienze: require('../../assets/images/fieldIcons/Laboratory.png'),
  Turismo: require('../../assets/images/fieldIcons/Turismo.png'),
  Other: require('../../assets/images/fieldIcons/worldwide.png'),
};

export default function FieldIcon(props) {
  const FieldIcon =
    components[SettoriDict[props.field]] === undefined ? components.Other : components[SettoriDict[props.field]];

  return (
    <Image
      source={FieldIcon}
      style={{ width: props.size || 25, height: props.size || 25, resizeMode: 'contain' }}
    />
  );
}
