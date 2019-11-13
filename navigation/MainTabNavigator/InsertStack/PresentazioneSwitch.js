import React from "react";

import { createStackNavigator } from 'react-navigation-stack';
import { Presentazione } from '../../../screens/InsertStack/Presentazione';
import {AutoComplete} from "../../../screens/shared/AutoComplete"
import {AutoCompleteLocation} from "../../../screens/shared/AutoCompleteLocation"

export const PresentazioneSwitch = createStackNavigator(
  {
    Presentazione,
    AutoComplete,
    AutoCompleteLocation
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);