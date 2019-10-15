
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LinksScreen from '../../screens/LinksScreen';
import Lamp from '../../components/TabBarIcons/Lamp';

const LinksStack = createStackNavigator(
    {
        LinksScreen,
    }
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

export default LinksStack;