import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostIdeaStack from "./PostIdeaStack";
import ProfileStack from "./ProfileStack";
import NotificaStack from "./NotificaStack";
import NotificheIcon from "../Icons/NotificaIcon";
import ProfiloIcon from "../Icons/ProfiloIcon";
import PostIdeaIcon from "../Icons/PostIdeaIcon";
import TabBarText from "../../shared/components/TabBarText";

const BottomTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName="PostIdeaStack">
      <BottomTab.Screen
        name="PostIdeaStack"
        component={PostIdeaStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText text={"Post Idea"} focused={focused} />
          ),
          tabBarIcon: ({ focused }) => (
            <PostIdeaIcon focused={focused}></PostIdeaIcon>
          )
        }}
      />
      <BottomTab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText text={"Profilo"} focused={focused} />
          ),
          tabBarIcon: ({ focused }) => <ProfiloIcon focused={focused} />
        }}
      />
      <BottomTab.Screen
        name="NotificaStack"
        component={NotificaStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText text={"Notifiche"} focused={focused} />
          ),
          tabBarIcon: ({ focused }) => <NotificheIcon focused={focused} />
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainTabNavigator;
