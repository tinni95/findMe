import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { InsertFlowHome } from '../../screens/InsertStack';
import { Posizioni } from '../../screens/InsertStack/Posizioni';
import {Anteprima}  from '../../screens/InsertStack/Anteprima';
import TabBarIcon from '../../components/TabBarIcon';

const InsertStack = createSwitchNavigator({
  InsertFlowHome,
  Posizioni,
  Anteprima
});

InsertStack.navigationOptions = {
  tabBarLabel: 'Inserisci',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-add-circle"} focused={focused} />
};

InsertStack.path = '';

export default InsertStack;
