import React from "react";

import { createStackNavigator } from 'react-navigation-stack';
import { Posizioni } from '../../../screens/InsertStack/Posizioni';
import { ConfermaPosizione } from '../../../screens/InsertStack/ConfermaPosizione';
import { ModificaPosizioni } from '../../../screens/InsertStack/ModificaPosizioni';
import { ConfermaModifica } from '../../../screens/InsertStack/ConfermaModifica';

export const PosizioniStack = createStackNavigator(
    {
        Posizioni,
        ConfermaPosizione,
        ModificaPosizioni,
        ConfermaModifica
    }
);