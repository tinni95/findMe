import { createSwitchNavigator } from 'react-navigation';
import UserInfo from '../screens/UserInfo';
import { createBrowserApp } from "@react-navigation/web";
const MainTabNavigator = createSwitchNavigator({
    UserInfo
});

MainTabNavigator.path = '';

export default createBrowserApp(MainTabNavigator);
