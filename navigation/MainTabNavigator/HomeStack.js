import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import Explore from '../../screens/Explore/Explore';
import AttivitàScreen from '../../screens/Explore/Attività/AttivitàScreen';
import ApplyScreen from '../../screens/Post/ApplyScreen';
import PostScreen from '../../screens/Post/PostScreen';
import FiltersModal from "./FiltersModal";

const HomeStack = createStackNavigator({
  Explore,
  PostScreen,
  FiltersModal,
  AttivitàScreen,
  ApplyScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Post idea',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-bulb"} focused={focused} />
};

HomeStack.path = '';

export default HomeStack;
