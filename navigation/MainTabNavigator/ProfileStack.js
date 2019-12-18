import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import ProfilePage from '../../screens/ProfileStack';
import Logout from '../../screens/ProfileStack/Logout';
import FormazioniScreen from '../../screens/ProfileStack/Formazioni/FormazioniScreen';
import EsperienzeScreen from '../../screens/ProfileStack/Esperienze/EsperienzeScreen';
import ProgettiScreen from '../../screens/ProfileStack/Progetti/ProgettiScreen';
import CompetenzeScreen from '../../screens/ProfileStack/Competenze/CompetenzeScreen';
import FormazioneEditScreen from '../../screens/ProfileStack/Formazioni/FormazioneEditScreen';
import EsperienzeEditScreen from '../../screens/ProfileStack/Esperienze/EsperienzeEditScreen';
import ProgettiEditScreen from '../../screens/ProfileStack/Progetti/ProgettiEditScreen';
import UserInfoModal from '../UserInfoModal';
import UserPosts from '../../screens/ProfileStack/UserPosts';
const LogoutStack = createStackNavigator({
  Logout
});
const PostsStack = createStackNavigator({
  UserPosts
});

const ProfileStack = createStackNavigator({
  ProfilePage,
  EditProfile: UserInfoModal,
  FormazioniScreen,
  EsperienzeScreen,
  ProgettiScreen,
  FormazioneEditScreen,
  CompetenzeScreen,
  EsperienzeEditScreen,
  ProgettiEditScreen
});

const ProfileDrawer = createDrawerNavigator(
  {
    Profilo: ProfileStack,
    Logout: LogoutStack,
    Posts: PostsStack
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
