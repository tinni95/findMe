import React from "react";

import { createStackNavigator } from 'react-navigation-stack';
import LinksStack from './LinksStack';
import UserInfo from "../../../screens/UserInfo/UserInfo";
import TabBarIcon from "../../../components/TabBarIcon";

const UserModal = createStackNavigator(
    {
        LinksStack: LinksStack,
        UserInfo: UserInfo
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

UserModal.navigationOptions = {
    tabBarLabel: 'Esplora',
    tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-home"} focused={focused} />
};

UserModal.path = '';

export default UserModal