import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { InsertFlowHome } from '../../../screens/InsertStack';
import { Presentazione } from '../../../screens/InsertStack/Presentazione';
import { PosizioniSwitch } from './PosizioniSwitch';
import {Anteprima}  from '../../../screens/InsertStack/Anteprima';
import TabBarIcon from '../../../components/TabBarIcon';

export const InsertStack = createSwitchNavigator({
  Presentazione,
  InsertFlowHome,
  Posizioni:PosizioniSwitch,
  Anteprima
});

InsertStack.navigationOptions = {
  tabBarLabel: 'Inserisci',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-add-circle"} focused={focused} />
};

InsertStack.path = '';

export default InsertStack;
