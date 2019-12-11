import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import ProfilePage from '../../screens/ProfileStack';
import Logout from '../../screens/ProfileStack/Logout';
import FormazioneEditScreen from '../../screens/ProfileStack/FormazioneEditScreen';
import EsperienzeEditScreen from '../../screens/ProfileStack/EsperienzeEditScreen';
import ProgettiEditScreen from '../../screens/ProfileStack/ProgettiEditScreen';
import UserInfoModal from '../UserInfoModal';
const LogoutStack = createStackNavigator({
  Logout
});

const ProfileStack = createStackNavigator({
  ProfilePage,
  UserInfoModal,
  FormazioneEditScreen,
  EsperienzeEditScreen,
  ProgettiEditScreen
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
