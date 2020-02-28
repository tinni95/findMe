import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PosizioniStack from "./PosizioniStack";
import AutoCompletePosizioni from "../../../../shared/components/AutoCompletePosizioni";

const Stack = createStackNavigator();

const PosizioniModal = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="PosizioniModal"
        component={PosizioniStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AutoComplete"
        options={{ headerShown: false }}
        component={AutoCompletePosizioni}
      />
    </Stack.Navigator>
  );
};
export default PosizioniModal;
