import React from 'react';
import { Text,Platform,StyleSheet, View, ScrollView } from 'react-native';
import FieldIconRound from '../FieldIcons';
import {Tooltip} from "react-native-elements";

export const Fields = ({ post: { positions } }) => {
  let fields;
  if(Platform.OS =="web"){
     fields = positions.map((position, index) => {
      return (
        <FieldIconRound
          available={position.available}
          color="#26547C"
          key={index}
          field={position.field}
        />
      );
    });
  }
  else{
   fields = positions.map((position, index) => {
    return (
      <Tooltip key={index} popover={<Text>{position.field}</Text>}>
      <FieldIconRound
        available={position.available}
        color="#26547C"
        field={position.field}
      />
      </Tooltip>
    );
  });
}

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


