import HomeStack from "./HomeStack";
import LinksStack from "./LinksStack";
import InsertStack from "./InsertStack";
import ServiziStack from "./ServiziStack";
import ProfileStack from "./ProfileStack";

import { createBottomTabNavigator } from 'react-navigation';

const MainTabNavigator = createBottomTabNavigator({
    HomeStack,
    LinksStack,
    InsertStack,
    ServiziStack,
    ProfileStack
});

MainTabNavigator.path = '';

export default MainTabNavigator;