import React from 'react';
import Tie from '../../components/TabBarIcons/Tie';
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../../screens/SettingsScreen';

const ServiziStack = createStackNavigator(
    {
        SettingsScreen,
    }
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

export default ServiziStack;