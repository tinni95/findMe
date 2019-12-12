import React from "react";

import { createStackNavigator } from 'react-navigation-stack';
import Posizioni from '../../../screens/InsertStack/Posizioni/Posizioni';
import ConfermaPosizione from '../../../screens/InsertStack/Posizioni/ConfermaPosizione';
import ModificaPosizioni from '../../../screens/InsertStack/Posizioni/ModificaPosizioni';
import ModificaPosizione from '../../../screens/InsertStack/Posizioni/ModificaPosizione';

export const PosizioniStack = createStackNavigator(
    {
        Posizioni,
        ConfermaPosizione,
        ModificaPosizioni,
        ModificaPosizione,
    }
);