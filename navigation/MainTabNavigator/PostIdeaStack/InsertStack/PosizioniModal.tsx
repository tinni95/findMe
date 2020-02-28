import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PosizioniStack from "./PosizioniStack";
import AutoComplete from "../../../../shared/components/AutoComplete";

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
        component={AutoComplete}
      />
    </Stack.Navigator>
  );
};
export default PosizioniModal;
