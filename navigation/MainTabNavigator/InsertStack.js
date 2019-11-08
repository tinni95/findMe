import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { InsertFlowHome } from '../../screens/InsertStack';
import { step2 } from '../../screens/InsertStack/step2';
import { step3 } from '../../screens/InsertStack/step3';
import TabBarIcon from '../../components/TabBarIcon';

const InsertStack = createSwitchNavigator({
  InsertFlowHome,
  step2,
  step3
});

InsertStack.navigationOptions = {
  tabBarLabel: 'Inserisci',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-add-circle"} focused={focused} />
};

InsertStack.path = '';

export default InsertStack;
