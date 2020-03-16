import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Posizioni from "../../../../screens/InsertStack/Posizioni";
import ConfermaPosizione from "../../../../screens/InsertStack/Posizioni/ConfermaPosizione";
import ModificaPosizioni from "../../../../screens/InsertStack/Posizioni/ModificaPosizioni";
import ModificaPosizione from "../../../../screens/InsertStack/Posizioni/ModificaPosizione";
import HeaderLeft from "../../../../shared/components/HeaderLeft";
import {
  headerStyle,
  headerTitleStyle
} from "../../../../shared/constants/HeaderStyles";
const Stack = createStackNavigator();

const PosizioniStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Posizioni"
        component={Posizioni}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfermaPosizione"
        options={({ navigation }) => ({
          headerStyle,
          headerTitleStyle,
          headerTitle: "Conferma",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={ConfermaPosizione}
      />
      <Stack.Screen
        name="ModificaPosizioni"
        options={({ navigation }) => ({
          headerStyle,
          headerTitleStyle,
          headerTitle: "Modifica",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={ModificaPosizioni}
      />
      <Stack.Screen
        name="ModificaPosizione"
        options={({ navigation }) => ({
          headerStyle,
          headerTitleStyle,
          headerTitle: "Modifica",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={ModificaPosizione}
      />
    </Stack.Navigator>
  );
};
export default PosizioniStack;
