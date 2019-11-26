import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import ProfilePageQueryRenderer from '../../screens/ProfileStack';

const ProfileStack = createStackNavigator({
  ProfilePageQueryRenderer: props => <ProfilePageQueryRenderer {...props}></ProfilePageQueryRenderer>
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profilo',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-contact"} focused={focused} />
};

ProfileStack.path = '';

export default ProfileStack;
