import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HomeScreenModal } from "./HomeScreenModal"
import { QuestionScreenModal } from "./QuestionScreenModal"
import TabBarIcon from "../../../components/TabBarIcon";
import UserVisitsProfileScreen from "../../../screens/UserVisitsProfile"
import FirstTimeChat from "../../../screens/UserVisitsProfile/FirstTimeChat"

const HomeStack = createStackNavigator({
  HomeScreenModal,
  QuestionScreenModal,
  UserVisitsProfileScreen,
  FirstTimeChat
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Esplora',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-home"} focused={focused} />
};

HomeStack.path = '';

export default HomeStack