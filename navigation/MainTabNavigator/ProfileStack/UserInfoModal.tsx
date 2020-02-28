import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AutoCompleteLocation from "../../../shared/components/AutoCompleteLocation";
import EditProfile from "../../../screens/ProfileStack/EditProfile";
import {
  headerStyle,
  headerTitleStyle
} from "../../../shared/constants/HeaderStyles";
import HeaderLeft from "../../../shared/components/HeaderLeft";

const Stack = createStackNavigator();

const UserInfoModal = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Edit"
        component={EditProfile}
        options={({ navigation }) => ({
          title: "",
          headerStyle: headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="AutoCompleteLocation"
        options={{ headerShown: false }}
        component={AutoCompleteLocation}
      />
    </Stack.Navigator>
  );
};
export default UserInfoModal;
