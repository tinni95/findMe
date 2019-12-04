import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import UserInfo from '../screens/UserInfo';
import MainTabNavigator from "./MainTabNavigator"
const UserModal = createSwitchNavigator({
    UserInfo,
    MainTabNavigator
});

UserModal.path = '';

export default createAppContainer(UserModal);
