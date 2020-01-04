import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MessagesIcon from '../../components/MessagesIcon';
import Channels from '../../screens/MessaggiStack/Channels';
import Chat from '../../screens/MessaggiStack/Chat';

const ChatStack = createStackNavigator({
  Channels,
  Chat
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => <MessagesIcon name={"ios-send"} focused={focused} />
};

ChatStack.path = '';

export default ChatStack;
