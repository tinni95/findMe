import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Categoria from "../../../screens/InsertStack/Categoria";
import Posizione from "../../../screens/InsertStack/Posizione";
import Quando from "../../../screens/InsertStack/Quando";
import Requisiti from "../../../screens/InsertStack/Requisiti";
import Descrizione from "../../../screens/InsertStack/Descrizione";
import Budget from "../../../screens/InsertStack/Budget";
import Anteprima from "../../../screens/InsertStack/Anteprima";
import Dove from "../../../screens/InsertStack/Dove";
import AutoCompleteLocation from "../../../shared/components/AutoCompleteLocation";

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
        name="AutoCompleteLocation"
        component={AutoCompleteLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Posizione"
        component={Posizione}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Requisiti"
        component={Requisiti}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Descrizione"
        component={Descrizione}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quando"
        component={Quando}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Budget"
        component={Budget}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Anteprima"
        component={Anteprima}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dove"
        component={Dove}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default InsertStack;
