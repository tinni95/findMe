import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MessagesIcon from '../../components/MessagesIcon';
import Channels from '../../screens/MessaggiStack/Channels';
import Chat from '../../screens/MessaggiStack/Chat';
import UserVisitsProfileScreen from "../../screens/UserVisitsProfile"

const ChatStack = createStackNavigator({
  Channels,
  Chat,
  UserVisitsProfileScreen,
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarOptions: {
    activeTintColor: '#10426E',
    inactiveTintColor: '#43494A',
  },
  tabBarIcon: ({ focused }) => <MessagesIcon name={"ios-send"} focused={focused} />,
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    navigation.setParams({ focused: true })
    console.log('this will be fired just before nagivation happens')
    defaultHandler() // if you omit this, navigation will not happen
  }
};

ChatStack.path = '';

export default ChatStack;
