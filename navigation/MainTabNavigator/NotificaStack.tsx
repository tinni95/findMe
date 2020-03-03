import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationPage from "../../screens/NotificationPage";
import AttivitàScreen from "../../screens/Explore/Attività/AttivitàScreen";
import PostScreen from "../../screens/Explore/Post/PostScreen";
import UserVisitsProfileScreen from "../../screens/shared/UserVisitsProfileScreen";
import ApplicationReceivedChat from "../../screens/Explore/Post/ApplicationReceivedChat";
import ApplicationSentChat from "../../screens/Explore/Post/ApplicationSentChat";
import HeaderLeft from "../../shared/components/HeaderLeft";
import {
  headerStyle,
  headerTitleStyle
} from "../../shared/constants/HeaderStyles";

const Stack = createStackNavigator();

const NotificaStack = ({ changeLoginState }) => {
  return (
    <Stack.Navigator initialRouteName="LandingPage">
      <Stack.Screen
        name="NotificationPage"
        component={NotificationPage}
        options={{
          headerTitle: "Notifiche",
          headerStyle,
          headerTitleStyle
        }}
      />
      <Stack.Screen
        name="NotificheIcon"
        component={AttivitàScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: { shadowColor: "transparent" },
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="UserVisitsProfileScreen"
        component={UserVisitsProfileScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: { shadowColor: "transparent" },
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="ApplicationReceivedChat"
        component={ApplicationReceivedChat}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: { shadowColor: "transparent" },
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="ApplicationSentChat"
        component={ApplicationSentChat}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: { shadowColor: "transparent" },
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
    </Stack.Navigator>
  );
};

export default NotificaStack;
