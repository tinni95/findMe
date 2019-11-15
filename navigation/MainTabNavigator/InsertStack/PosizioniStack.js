import React from "react";

import { createStackNavigator } from 'react-navigation-stack';
import { Posizioni } from '../../../screens/InsertStack/Posizioni';
import { ConfermaPosizione } from '../../../screens/InsertStack/ConfermaPosizione';
import { ModificaPosizioni } from '../../../screens/InsertStack/ModificaPosizioni';

export const PosizioniStack = createStackNavigator(
    {
        Posizioni,
        ConfermaPosizione,
        ModificaPosizioni
    }
);