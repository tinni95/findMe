import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import AutoCompleteLocation from '../../../shared/components/AutoCompleteLocation';
import EditProfile from '../../../screens/ProfileStack/EditProfile';

const UserInfoModal = createStackNavigator(
  {
    EditProfile,
    AutoCompleteLocation,
  },
  {
    mode: 'modal',
  },
);

UserInfoModal.navigationOptions = ({ navigation }) => {
  return {
    headerShown: false,
  };
};

export default UserInfoModal;
