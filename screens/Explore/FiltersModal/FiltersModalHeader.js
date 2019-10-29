import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Bold, Light } from '../../../components/StyledText';

export default FiltersModalHeader = ({ setModalVisible }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Light>Annulla</Light>
      </TouchableOpacity>
      <Bold>Ricerca Avanzata</Bold>
      <TouchableOpacity onPress={() => null}>
        <Light>Azzera Filtri</Light>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
