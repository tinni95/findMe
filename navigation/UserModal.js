import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import UserInfoModal from './UserInfoModal';
import MainTabNavigator from "./MainTabNavigator"

const UserModal = createSwitchNavigator({
    UserInfoModal,
    MainTabNavigator
});

UserModal.path = '';

export default createAppContainer(UserModal);
