import React from "react";

import { createStackNavigator } from 'react-navigation-stack';
import { Posizioni } from '../../../screens/InsertStack/Posizioni';
import { ConfermaPosizione } from '../../../screens/InsertStack/ConfermaPosizione';
import { ModificaPosizioni } from '../../../screens/InsertStack/ModificaPosizioni';
import { ModificaPosizione } from '../../../screens/InsertStack/ModificaPosizione';
import { Anteprima } from "../../../screens/InsertStack/Anteprima"
export const PosizioniStack = createStackNavigator(
    {
        Posizioni,
        ConfermaPosizione,
        ModificaPosizioni,
        ModificaPosizione,
        Anteprima
    }
);