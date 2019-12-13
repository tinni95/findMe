import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import Explore from '../../screens/Explore/Explore';
import PostScreenQueryRenderer from '../../screens/Post';
import FiltersPage from "../../screens/Explore/FiltersStack";

const HomeStack = createStackNavigator({
  Explore,
  PostScreenQueryRenderer,
  FiltersPage,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Post idea',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-bulb"} focused={focused} />
};

HomeStack.path = '';

export default HomeStack;
