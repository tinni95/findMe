import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { PresentazioneSwitch } from './PresentazioneSwitch';
import { PosizioniModal } from './PosizioniModal';
import AnteprimaQueryRenderer from '../../../screens/InsertStack/Anteprima';
import TabBarIcon from '../../../components/TabBarIcon';

export const InsertStack = createSwitchNavigator({
  PresentazioneSwitch,
  Posizioni: PosizioniModal,
  Anteprima: AnteprimaQueryRenderer
});

InsertStack.path = '';

export default InsertStack;
