import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import PostIdeaStack from "./PostIdeaStack";
import ProfileStack from "./ProfileStack";
import NotificaStack from "./NotificaStack";
import NotificheIcon from "../Icons/NotificaIcon";
import ProfiloIcon from "../Icons/ProfiloIcon";
import PostIdeaIcon from "../Icons/PostIdeaIcon";
import TabBarText from "../../shared/components/TabBarText";

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
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => <NotificheIcon focused={focused} />
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainTabNavigator;
