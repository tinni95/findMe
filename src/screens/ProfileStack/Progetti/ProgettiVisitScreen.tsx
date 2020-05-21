import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../../shared/constants/Colors';
let shortid = require('shortid');
import ProgettoVisitCard from '../../../shared/components/Progetti/ProgettoVisitCard';

export default function ProgettiVisitScreen({ navigation, route }) {
  const progetti = navigation.getParam('progetti', null);
  return (
    <View style={styles.container}>
      {progetti.map((progetto) => {
        return (
          <ProgettoVisitCard navigation={navigation} key={shortid.generate()} progetto={progetto} />
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
