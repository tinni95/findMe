import React from "react";

import { createStackNavigator } from 'react-navigation-stack';
import { Presentazione } from '../../../screens/InsertStack/Presentazione';
import {AutoComplete} from "../../../screens/shared/AutoComplete"

export const PresentazioneSwitch = createStackNavigator(
  {
    Presentazione,
    AutoComplete
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);