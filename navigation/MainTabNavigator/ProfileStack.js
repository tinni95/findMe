import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Profile from '../../components/TabBarIcons/Profile';
import ProfilePageQueryRenderer from '../../screens/ProfileStack';

const ProfileStack = createStackNavigator(
    {
        ProfilePageQueryRenderer,
    }
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

export default ProfileStack;


