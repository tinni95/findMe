import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import FieldIconRound from '../FieldIcons';

export const Fields = ({ post: { positions } }) => {
  const fields = positions.map((position, index) => {
    return (
      <FieldIconRound
        available={position.available}
        color="#26547C"
        key={index}
        field={position.field}
      />
    );
  });
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {fields}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3
  }
});


