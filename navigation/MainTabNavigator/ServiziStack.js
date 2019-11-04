import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import SettingsScreen from '../../screens/SettingsScreen';

const ServiziStack = createStackNavigator({
  SettingsScreen
});

ServiziStack.navigationOptions = {
  tabBarLabel: 'Servizi',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-bowtie"} focused={focused} />
};

ServiziStack.path = '';

export default ServiziStack;
