import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import PostIdeaStack from "./PostIdeaStack";
import ProfileStack from "./ProfileStack";
import ProfiloIcon from "../Icons/ProfiloIcon";
import PostIdeaIcon from "../Icons/PostIdeaIcon";
import InsertStack from "./InsertStack";
import CreateIcon from "../Icons/CreateIcon";
import NotificaStack from "./NotificaStack";
import CandidatureIconWS from "../../shared/components/CandidatureIcon";

const BottomTab = createMaterialBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <BottomTab.Navigator
      barStyle={{ backgroundColor: "white" }}
      initialRouteName="PostIdeaStack"
    >
      <BottomTab.Screen
        name="PostIdeaStack"
        component={PostIdeaStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <PostIdeaIcon focused={focused}></PostIdeaIcon>
          )
        }}
      />
      <BottomTab.Screen
        name="InsertStack"
        component={InsertStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => <CreateIcon focused={focused} />
        }}
      />
      <BottomTab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => <ProfiloIcon focused={focused} />
        }}
      />
      <BottomTab.Screen
        name="NotificaStack"
        component={NotificaStack}
        options={({ route, navigation }) => ({
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => <CandidatureIconWS focused={focused} />
        })}
      />
    </BottomTab.Navigator>
  );
};

export default MainTabNavigator;
