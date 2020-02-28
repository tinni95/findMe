import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PresentazioneSwitch from "./PresentazioneSwitch";
import PosizioniModal from "./PosizioniModal";
import AnteprimaQueryRenderer from "../../../../screens/InsertStack/Anteprima";

const Stack = createStackNavigator();

const InsertStack = () => {
  return (
    <Stack.Navigator initialRouteName="Presentazione">
      <Stack.Screen
        name="Presentazione"
        component={PresentazioneSwitch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Posizioni"
        component={PosizioniModal}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Anteprima"
        component={AnteprimaQueryRenderer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default InsertStack;
