import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExploreModal from "./ExploreModal";
import AttivitàScreen from "../../../screens/Explore/Attività/AttivitàScreen";
import ApplyScreen from "../../../screens/Explore/Post/ApplyScreen";
import PostScreen from "../../../screens/Explore/Post/PostScreen";
import ApplicationReceivedChat from "../../../screens/Explore/Post/ApplicationReceivedChat";
import ApplicationSentChat from "../../../screens/Explore/Post/ApplicationSentChat";
import FiltersModal from "./FiltersModal";
import UserVisitsProfileScreen from "../../../screens/shared/UserVisitsProfileScreen";
import HeaderLeft from "../../../shared/components/HeaderLeft";
import {
  headerStyle,
  headerTitleStyle
} from "../../../shared/constants/HeaderStyles";
import FormazioniVisitScreen from "../../../screens/ProfileStack/Formazioni/FormazioniVisitScreen";
import ProgettiVisitScreen from "../../../screens/ProfileStack/Progetti/ProgettiVisitScreen";
import EsperienzeVisitScreen from "../../../screens/ProfileStack/Esperienze/EsperienzeVisitScreen";
const Stack = createStackNavigator();

const PostIdeaStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        component={ExploreModal}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="FiltersPage"
        component={FiltersModal}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AttivitàScreen"
        component={AttivitàScreen}
        options={({ navigation }) => ({
          headerStyle,
          headerTitleStyle,
          headerTitle: "Candidature",
          headerLeft: () => <HeaderLeft text={" "} navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="ApplyScreen"
        component={ApplyScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="ApplicationReceivedChat"
        component={ApplicationReceivedChat}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="ApplicationSentChat"
        component={ApplicationSentChat}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="UserVisitsProfileScreen"
        component={UserVisitsProfileScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="FormazioniScreen"
        component={FormazioniVisitScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="ProgettiScreen"
        component={ProgettiVisitScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="EsperienzeScreen"
        component={EsperienzeVisitScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
      />
    </Stack.Navigator>
  );
};

export default PostIdeaStack;
