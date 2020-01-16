import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NotificationPage from "../../screens/Notifications"
import TabBarIcon from '../../components/TabBarIcon';

const NotificaStack = createStackNavigator({
  NotificationPage,
});

NotificaStack.navigationOptions = {
  tabBarLabel: 'Notifiche',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-notifications"} focused={focused} />

};

NotificaStack.path = '';

export default NotificaStack;
