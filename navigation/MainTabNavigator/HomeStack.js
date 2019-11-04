import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import ExploreQueryRenderer from '../../screens/Explore';
import PostScreenQueryRenderer from '../../screens/Post';

const HomeStack = createStackNavigator({
  ExploreQueryRenderer,
  PostScreenQueryRenderer
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Post idea',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-bulb"} focused={focused} />
};

HomeStack.path = '';

export default HomeStack;
