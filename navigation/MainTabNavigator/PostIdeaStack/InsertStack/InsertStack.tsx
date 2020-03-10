import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PresentazioneSwitch from "./PresentazioneSwitch";
import PosizioniModal from "./PosizioniModal";
import AnteprimaQueryRenderer from "../../../../screens/InsertStack/Anteprima";
import Categoria from "../../../../screens/InsertStack/Categoria";

const Stack = createStackNavigator();

const InsertStack = () => {
  return (
    <Stack.Navigator initialRouteName="Categoria">
      <Stack.Screen
        name="Categoria"
        component={Categoria}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default InsertStack;
