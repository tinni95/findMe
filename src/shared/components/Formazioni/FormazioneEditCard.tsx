import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Light } from '../StyledText';
import FormazioneCard from './FormazioneCard';
import TouchablePen from '../TouchablePen';
import Colors from '../../constants/Colors';

export default function FormazioneEditCard({ formazione, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.touchablePenContainer}>
        <TouchablePen
          onPress={() => navigation.navigate('FormazioneEditScreen', { formazione })}
          penStyle={{ marginTop: 15 }}
          size={20}></TouchablePen>
      </View>
      <View style={styles.innerContainer}>
        <FormazioneCard
          noBorder={{ borderBottomColor: 'white' }}
          item={formazione}></FormazioneCard>
        <View style={styles.textContainer}>
          <Light>{formazione.descrizione}</Light>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#F2F2F2',
    borderTopWidth: 5,
  },
  touchablePenContainer: {
    alignItems: 'flex-end',
  },
  innerContainer: {
    margin: 15,
    marginTop: 0,
  },
  textContainer: {
    margin: 15,
    marginTop: 20,
    marginLeft: 6,
  },
  link: {
    color: Colors.blue,
    fontSize: 12,
  },
});
