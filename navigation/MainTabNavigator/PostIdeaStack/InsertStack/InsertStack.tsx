import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Categoria from "../../../../screens/InsertStack/Categoria";
import Posizione from "../../../../screens/InsertStack/Posizione";
import RequisitiModal from "./RequisitiModal";

const Stack = createStackNavigator();

const InsertStack = () => {
  return (
    <Stack.Navigator initialRouteName="Categoria">
      <Stack.Screen
        name="Categoria"
        component={Categoria}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Posizione"
        component={Posizione}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequisitiModal"
        component={RequisitiModal}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default InsertStack;
