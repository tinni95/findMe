import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { width } from '../../../shared/constants/Layout';

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
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
