
import { createStackNavigator } from 'react-navigation-stack';
import { AutoCompleteLocation } from "../screens/shared/AutoCompleteLocation"
import UserInfo from '../screens/UserInfo';

const UserInfoModal = createStackNavigator(
    {
        UserInfo,
        AutoCompleteLocation
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

UserInfoModal.path = '';

export default UserInfoModal 