import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LinksScreen from '../../screens/LinksScreen';
import TabBarIcon from '../../components/TabBarIcon';

const LinksStack = createStackNavigator({
  LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Esplora',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-home"} focused={focused} />
};

LinksStack.path = '';

export default LinksStack;
