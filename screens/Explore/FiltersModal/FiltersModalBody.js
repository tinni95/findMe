import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Bold, Light } from '../../../components/StyledText';
import { width } from '../../../constants/Layout';

export const FiltersModalBody = ({ setModalVisible }) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 5
      }
    })
  }
});
