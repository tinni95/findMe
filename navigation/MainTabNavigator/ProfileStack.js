import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Profile from '../../components/TabBarIcons/Profile';
import SettingsScreen from '../../screens/SettingsScreen';

const ProfileStack = createStackNavigator(
    {
        SettingsScreen,
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


