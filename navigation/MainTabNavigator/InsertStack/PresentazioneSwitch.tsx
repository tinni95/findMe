import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Presentazione from "../../../../screens/InsertStack/index";
import AutoComplete from "../../../../shared/components/AutoComplete";
import AutoCompleteLocation from "../../../../shared/components/AutoCompleteLocation";

const Stack = createStackNavigator();

const PresentazioneSwitch = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Presentazione"
        component={Presentazione}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AutoComplete"
        component={AutoComplete}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AutoCompleteLocation"
        component={AutoCompleteLocation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PresentazioneSwitch;
