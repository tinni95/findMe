
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LinksScreen from '../../screens/LinksScreen';
import House from '../../components/TabBarIcons/House';
const LinksStack = createStackNavigator(
    {
        LinksScreen,
    }
);

LinksStack.navigationOptions = {
    tabBarLabel: 'Esplora',
    tabBarIcon: ({ focused }) => (
        <House
            focused={focused}
        />
    ),
};

LinksStack.path = '';

export default LinksStack;