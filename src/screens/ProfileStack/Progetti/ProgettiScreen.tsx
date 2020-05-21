import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../../shared/constants/Colors';
import Aggiungi from '../../../shared/components/Aggiungi';
let shortid = require('shortid');
import ProgettoEditCard from '../../../shared/components/Progetti/ProgettoEditCard';

export default function ProgettiScreen({ navigation, route }) {
  const progetti = navigation.getParam('progetti', null);

  return (
    <View style={styles.container}>
      <Aggiungi onPress={() => navigation.navigate('ProgettiEditScreen')} text={'Progetto'} />
      {progetti.map((progetto) => {
        return (
          <ProgettoEditCard navigation={navigation} key={shortid.generate()} progetto={progetto} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  aggiungiWrapper: {
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#707070',
    borderBottomWidth: 0.3,
  },
  aggiungiText: {
    color: Colors.blue,
    fontSize: 12,
  },
});
