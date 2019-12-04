
import { createStackNavigator } from 'react-navigation-stack';
import { AutoCompleteLocation } from "../screens/shared/AutoCompleteLocation"
import UserInfo from '../screens/UserInfo';

export default UserInfoModal = createStackNavigator(
    {
        UserInfo,
        AutoCompleteLocation
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);