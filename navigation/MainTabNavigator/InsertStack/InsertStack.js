import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import Descrizione from '../../../screens/InsertStack';
import { PresentazioneSwitch } from './PresentazioneSwitch';
import { PosizioniModal } from './PosizioniModal';
import AnteprimaQueryRenderer from '../../../screens/InsertStack/Anteprima';
import TabBarIcon from '../../../components/TabBarIcon';
import { Platform, TouchableOpacity } from 'react-native';
import Colors from "../../../constants/Colors"
import { Ionicons } from '@expo/vector-icons';

export const InsertStack = createSwitchNavigator({
  PresentazioneSwitch,
  Descrizione,
  Posizioni: PosizioniModal,
  Anteprima: AnteprimaQueryRenderer
});

InsertStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: 'Inserisci',
    tabBarIcon: ({ focused }) => <TabBarIcon name={"ios-add-circle"} focused={focused} />,
    title: "Modifica Post Idea",
    headerStyle: {
      ...Platform.select({
        ios: {
          shadowColor: "black",
          shadowOffset: { height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 3
        },
        android: {
          elevation: 20
        },
      })
    },
    headerTitleStyle: {
      fontFamily: "sequel-sans-bold",
      color: Colors.blue,
      fontSize: 12
    },
    headerLeft: (
      <TouchableOpacity style={{ padding: 5, paddingRight: 10 }} onPress={() => navigation.goBack()}>
        <Ionicons
          name={"ios-arrow-back"}
          size={25}
          style={{ marginLeft: 10 }}
          color={Colors.blue}
        ></Ionicons>
      </TouchableOpacity>
    ),
  }
};

InsertStack.path = '';

export default InsertStack;
