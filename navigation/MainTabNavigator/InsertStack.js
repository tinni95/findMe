import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { InsertFlowHome } from '../../screens/InsertStack';
import TabBarIcon from '../../components/TabBarIcon';

const InsertStack = createStackNavigator({
  InsertFlowHome,
});

InsertStack.navigationOptions = {
  tabBarLabel: 'Inserisci',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-add-circle"} focused={focused} />
};

InsertStack.path = '';

export default InsertStack;
