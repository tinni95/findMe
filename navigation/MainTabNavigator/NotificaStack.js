import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NotificationPage from "../../screens/Notifications"
import QuestionScreen from "../../screens/HomeStack/QuestionScreen"
import NotificheIcon from '../../components/NotificheIcon';
import AttivitàScreen from '../../screens/Explore/Attività/AttivitàScreen';
import PostScreen from '../../screens/Post/PostScreen';
import UserVisitsProfileScreen from "../../screens/UserVisitsProfile"
import ApplicationReceivedChat from '../../screens/Post/ApplicationReceivedChat';
import ApplicationSentChat from '../../screens/Post/ApplicationSentChat';
import FirstTimeChat from "../../screens/UserVisitsProfile/FirstTimeChat";
import { QuestionScreenModal } from "../MainTabNavigator/HomeStack/QuestionScreenModal"
import Chat from '../../screens/MessaggiStack/Chat';
const NotificaStack = createStackNavigator({
  NotificationPage,
  QuestionScreen,
  AttivitàScreen,
  PostScreen,
  UserVisitsProfileScreen,
  ApplicationReceivedChat,
  ApplicationSentChat,
  FirstTimeChat,
  Chat,
  QuestionScreenModal
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
