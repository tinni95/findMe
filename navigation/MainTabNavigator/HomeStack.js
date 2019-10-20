import React from 'react';
import { createStackNavigator } from 'react-navigation';
import House from '../../components/TabBarIcons/House';
import ExploreQueryRenderer from '../../screens/Explore';
import PostScreenQueryRenderer from '../../screens/Post';

const HomeStack = createStackNavigator(
    {
        ExploreQueryRenderer,
        PostScreenQueryRenderer
    }
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

export default HomeStack;