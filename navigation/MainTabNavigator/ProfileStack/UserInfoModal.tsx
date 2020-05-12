import React from "react";
import { createStackNavigator } from 'react-navigation-stack';
import AutoCompleteLocation from "../../../shared/components/AutoCompleteLocation";
import EditProfile from "../../../screens/ProfileStack/EditProfile";
import {
  headerStyle,
  headerTitleStyle
} from "../../../shared/constants/HeaderStyles";
import HeaderLeft from "../../../shared/components/HeaderLeft";

const UserInfoModal = createStackNavigator(
  {
      EditProfile,
      AutoCompleteLocation
  },
  {
      mode: 'modal',
  }
);

UserInfoModal.navigationOptions = ({ navigation }) => {
  return {
      header:null
  }
}

export default UserInfoModal;