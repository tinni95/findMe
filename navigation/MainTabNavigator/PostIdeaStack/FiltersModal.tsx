import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FiltersPage from "../../../screens/Explore/FiltersStack/FiltersPage";
import { AutoCompleteFiltri } from "../../../shared/components/AutoCompleteFiltri";
import HeaderLeft from "../../../shared/components/HeaderLeft";
import {
  headerStyle,
  headerTitleStyle
} from "../../../shared/constants/HeaderStyles";
const Stack = createStackNavigator();

const FiltersModal = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Filters"
        component={FiltersPage}
        options={({ navigation }) => ({
          headerStyle,
          headerTitleStyle,
          headerTitle: "Filtri",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="AutoComplete"
        component={AutoCompleteFiltri}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default FiltersModal;
