import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import ProfilePage from '../../screens/ProfileStack';
import Logout from '../../screens/ProfileStack/Logout';

const LogoutStack = createStackNavigator({
  Logout
});

const ProfileStack = createStackNavigator({
  ProfilePage
});

const ProfileDrawer = createDrawerNavigator(
  {
    Profilo: ProfileStack,
    Logout: LogoutStack
  },
  {
    drawerPosition: 'left',
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleOuterDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
      };
    },
  }
);

ProfileDrawer.navigationOptions = {
  tabBarLabel: 'Profilo',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-contact"} focused={focused} />
};

ProfileDrawer.path = '';

export default ProfileDrawer;
