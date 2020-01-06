import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HomeScreenModal } from "./HomeScreenModal"
import TabBarIcon from "../../../components/TabBarIcon";

const HomeStack = createStackNavigator({
  HomeScreenModal
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Esplora',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-home"} focused={focused} />
};

HomeStack.path = '';

export default HomeStack