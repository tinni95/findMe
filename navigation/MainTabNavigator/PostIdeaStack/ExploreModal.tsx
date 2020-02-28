import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Explore from "../../../screens/Explore";
import InsertStack from "./InsertStack";

const Stack = createStackNavigator();

const ExploreModal = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="ExploreScreen"
        component={Explore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InsertStack"
        component={InsertStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default ExploreModal;
