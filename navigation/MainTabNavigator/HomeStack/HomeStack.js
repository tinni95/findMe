import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HomeScreenModal } from "./HomeScreenModal"
import { QuestionScreenModal } from "./QuestionScreenModal"
import TabBarIcon from "../../../components/TabBarIcon";
import UserVisitsProfileScreen from "../../../screens/UserVisitsProfile"
import FirstTimeChat from "../../../screens/UserVisitsProfile/FirstTimeChat"
import ForumIcon from '../../../components/ForumIcon';

const HomeStack = createStackNavigator({
  HomeScreenModal,
  QuestionScreenModal,
  UserVisitsProfileScreen,
  FirstTimeChat
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Esplora',
  tabBarOptions: {
    activeTintColor: '#10426E',
    inactiveTintColor: '#43494A',
  },
  tabBarIcon: ({ focused }) => <ForumIcon focused={focused} />
};

HomeStack.path = '';

export default HomeStack