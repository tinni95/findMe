import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  RegisterPage,
  EmailPage,
  PasswordPage,
  PasswordForgot,
  PrivacyPage
} from "../screens/AuthenticationStack";
import { LandingPage } from "../screens/AuthenticationStack/LandingPage";
import HeaderLeft from "../shared/components/HeaderLeft";

const Stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator initialRouteName="LandingPage">
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: { shadowColor: "transparent" },
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: { shadowColor: "transparent" },
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="EmailPage"
        component={EmailPage}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: { shadowColor: "transparent" },
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="PasswordPage"
        component={PasswordPage}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: { shadowColor: "transparent" },
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="PasswordForgot"
        component={PasswordForgot}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: { shadowColor: "transparent" },
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="PrivacyPage"
        component={PrivacyPage}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: { shadowColor: "transparent" },
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
