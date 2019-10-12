import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Lamp from '../components/TabBarIcons/Lamp';
import Add from '../components/TabBarIcons/Add';
import House from '../components/TabBarIcons/House';
import Profile from '../components/TabBarIcons/Profile';
import Tie from '../components/TabBarIcons/Tie';
import ExploreQueryRenderer from '../screens/Explore';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: ExploreQueryRenderer,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Esplora',
  tabBarIcon: ({ focused }) => (
    <House
      focused={focused}
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Post idea',
  tabBarIcon: ({ focused }) => (
    <Lamp
      focused={focused}
    />
  ),
};

LinksStack.path = '';


const InserisciStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

InserisciStack.navigationOptions = {
  tabBarLabel: 'Inserisci',
  tabBarIcon: ({ focused }) => (
    <Add
      focused={focused}
    />
  ),
};

InserisciStack.path = '';

const ServiziStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

ServiziStack.navigationOptions = {
  tabBarLabel: 'Servizi',
  tabBarIcon: ({ focused }) => (
    <Tie
      focused={focused}
    />
  ),
};

ServiziStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profilo',
  tabBarIcon: ({ focused }) => (
    <Profile
      focused={focused}
    />
  ),
};

ProfileStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  InserisciStack,
  ServiziStack,
  ProfileStack
});

tabNavigator.path = '';

export default tabNavigator;
