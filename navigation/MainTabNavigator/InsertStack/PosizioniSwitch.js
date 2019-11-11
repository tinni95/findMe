import React from "react";

import { createStackNavigator } from 'react-navigation-stack';
import { Posizioni } from '../../../screens/InsertStack/Posizioni';
import {AutoComplete} from "../../../screens/shared/AutoComplete"

export const PosizioniSwitch = createStackNavigator(
  {
    Posizioni,
    AutoComplete
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);