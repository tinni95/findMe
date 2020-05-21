import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Light, Bold } from '../StyledText';
import EsperienzaCard from './EsperienzaCard';
import TouchablePen from '../TouchablePen';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../../constants/Colors';

export default function EsperienzaEditCard({ esperienza, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.touchablePenContainer}>
        <TouchablePen
          onPress={() => navigation.navigate('EsperienzeEditScreen', { esperienza })}
          penStyle={{ marginTop: 15 }}
          size={20}></TouchablePen>
      </View>
      <View style={styles.innerContainer}>
        <EsperienzaCard
          noBorder={{ borderBottomColor: 'white' }}
          item={esperienza}></EsperienzaCard>
        <View style={styles.textContainer}>
          <Light>{esperienza.descrizione}</Light>
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
