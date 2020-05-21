import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Body } from '../components/StyledText';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const FindMeGraphQlErrorDisplay = () => {
  return (
    <View style={styles.view}>
      <Ionicons name="ios-alert" size={30} style={styles.icon} />
      <Body style={styles.text}>
        {'Oops, qualocsa è andato storto...\n' +
          '\n' +
          'se continui a vedere questo errore contattaci a admin@tendit.it'}
      </Body>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: Colors.blue,
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
});

export default FindMeGraphQlErrorDisplay;
