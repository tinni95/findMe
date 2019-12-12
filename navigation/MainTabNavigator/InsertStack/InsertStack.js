import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import Descrizione from '../../../screens/InsertStack';
import { PresentazioneSwitch } from './PresentazioneSwitch';
import { PosizioniModal } from './PosizioniModal';
import AnteprimaQueryRenderer from '../../../screens/InsertStack/Anteprima';
import TabBarIcon from '../../../components/TabBarIcon';

export const InsertStack = createSwitchNavigator({
  PresentazioneSwitch,
  Descrizione,
  Posizioni: PosizioniModal,
  Anteprima: AnteprimaQueryRenderer
});

InsertStack.navigationOptions = {
  tabBarLabel: 'Inserisci',
  tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-add-circle"} focused={focused} />
};

InsertStack.path = '';

export default InsertStack;
