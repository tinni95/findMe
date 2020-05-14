import React from "react";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import ProfilePage from "../../../screens/ProfileStack/";
import LogoutPage from "../../../screens/ProfileStack/Logout";
import FormazioniScreen from "../../../screens/ProfileStack/Formazioni/FormazioniScreen";
import EsperienzeScreen from "../../../screens/ProfileStack/Esperienze/EsperienzeScreen";
import ProgettiScreen from "../../../screens/ProfileStack/Progetti/ProgettiScreen";
import CompetenzeScreen from "../../../screens/ProfileStack/CompetenzeScreen";
import FormazioneEditScreen from "../../../screens/ProfileStack/Formazioni/FormazioneEditScreen";
import EsperienzeEditScreen from "../../../screens/ProfileStack/Esperienze/EsperienzeEditScreen";
import ProgettiEditScreen from "../../../screens/ProfileStack/Progetti/ProgettiEditScreen";
import UserInfoModal from "./UserInfoModal";
import Colors from "../../../shared/constants/Colors";
import PostScreen from "../../../screens/Explore/Post/PostScreen";
import SettingsScreen from "../../../screens/ProfileStack/SettingsStack";
import UpdatePassword from "../../../screens/ProfileStack/SettingsStack/UpdatePassword";
import UpdateEmail from "../../../screens/ProfileStack/SettingsStack/UpdateEmail";
import AboutPage from "../../../screens/ProfileStack/SettingsStack/AboutPage";
import BioScreen from "../../../screens/ProfileStack/BioScreen";

const Impostazioni = createStackNavigator(
  {
      Impostazioni:SettingsScreen,
      UpdatePassword,
      About:AboutPage,
      UpdateEmail
  }
);


const Logout = createStackNavigator(
  {
    LogoutPage
  }
);


const Profilo = createStackNavigator(
  {
    ProfilePage,
    PostScreen,
    UserInfoModal,
    BioScreen,
    FormazioniScreen,
    EsperienzeScreen,
    ProgettiScreen,
    FormazioneEditScreen,
    CompetenzeScreen,
    ProgettiEditScreen,
    EsperienzeEditScreen
  }
);


const ProfileDrawer = createDrawerNavigator({
  Profilo,
  Logout,
  Impostazioni
},{
  drawerBackgroundColor:Colors.blue,
  contentOptions:{
    activeTintColor: Colors.red,
    inactiveTintColor: Colors.semiBlue,
    labelStyle: {
      fontFamily: "sequel-sans"
    }
  }
});

export default ProfileDrawer;
