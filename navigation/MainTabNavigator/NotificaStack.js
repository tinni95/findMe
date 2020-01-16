import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NotificationPage from "../../screens/Notifications"
import QuestionScreen from "../../screens/HomeStack/QuestionScreen"
import NotificheIcon from '../../components/NotificheIcon';
const NotificaStack = createStackNavigator({
  NotificationPage,
  QuestionScreen
});

NotificaStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Notifiche',
  tabBarOptions: {
    activeTintColor: '#10426E',
    inactiveTintColor: '#43494A',
  },
  tabBarIcon: ({ focused }) => <NotificheIcon navigation={navigation} name={"ios-notifications"} focused={focused} />,
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    navigation.setParams({ focused: true })
    console.log('this will be fired just before nagivation happens')
    defaultHandler() // if you omit this, navigation will not happen
  }
});

NotificaStack.path = '';

export default NotificaStack;
