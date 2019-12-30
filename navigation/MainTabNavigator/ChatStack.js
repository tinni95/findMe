import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import Channels from '../../screens/MessaggiStack/Channels';

const ChatStack = createStackNavigator({
  Channels
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-bowtie"} focused={focused} />
};

ChatStack.path = '';

export default ChatStack;
