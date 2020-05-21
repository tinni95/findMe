import React from 'react';
import { View, StyleSheet } from 'react-native';
import FieldIcon from './FieldIcon';

export default function FieldIconRound(props) {
  return (
    <View style={styles.container}>
      <FieldIcon {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
  },
  bottomText: {
    fontSize: 10,
    marginTop: 23,
  },
});
