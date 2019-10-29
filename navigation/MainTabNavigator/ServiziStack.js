import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Tie from '../../components/TabBarIcons/Tie';
import SettingsScreen from '../../screens/SettingsScreen';

const ServiziStack = createStackNavigator({
  SettingsScreen
});

ServiziStack.navigationOptions = {
  tabBarLabel: 'Servizi',
  tabBarIcon: ({ focused }) => <Tie focused={focused} />
};

ServiziStack.path = '';

export default ServiziStack;
