import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import ProfilePage from '../../screens/ProfileStack';
import Logout from '../../screens/ProfileStack/Logout';
import FormazioneEditScreen from '../../screens/ProfileStack/Formazioni/FormazioneEditScreen';
import FormazioniScreen from '../../screens/ProfileStack/Formazioni/FormazioniScreen';
import EsperienzeEditScreen from '../../screens/ProfileStack/Esperienze/EsperienzeEditScreen';
import ProgettiEditScreen from '../../screens/ProfileStack/Progetti/ProgettiEditScreen';
import UserInfoModal from '../UserInfoModal';
const LogoutStack = createStackNavigator({
  Logout
});

const ProfileStack = createStackNavigator({
  ProfilePage,
  EditProfile: UserInfoModal,
  FormazioniScreen,
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
