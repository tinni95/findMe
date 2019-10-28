import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Lamp from '../../components/TabBarIcons/Lamp';
import ExploreQueryRenderer from '../../screens/Explore';
import PostScreenQueryRenderer from '../../screens/Post';

const HomeStack = createStackNavigator(
    {
        ExploreQueryRenderer,
        PostScreenQueryRenderer
    }
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Post idea',
    tabBarIcon: ({ focused }) => (
        <Lamp
            focused={focused}
        />
    ),
};

HomeStack.path = '';

export default HomeStack;