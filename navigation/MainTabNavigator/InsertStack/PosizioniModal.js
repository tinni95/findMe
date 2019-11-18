import React from "react";

import { createStackNavigator } from 'react-navigation-stack';
import { PosizioniStack } from './PosizioniStack';
import { AutoComplete } from "../../../screens/shared/AutoComplete"

export const PosizioniModal = createStackNavigator(
  {
    Posizioni: PosizioniStack,
    AutoComplete
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);