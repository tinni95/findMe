import { createSwitchNavigator } from 'react-navigation';
import UserInfo from '../screens/UserInfo';
import { createBrowserApp } from "@react-navigation/web";
import MainTabNavigator from "./MainTabNavigator"

const UserModal = createSwitchNavigator({
    MainTabNavigator
});

UserModal.path = '';

export default createBrowserApp(UserModal);
