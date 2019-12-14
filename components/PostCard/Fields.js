import React from 'react';
import { Text, Platform, StyleSheet, View, ScrollView } from 'react-native';
import FieldIconRound from '../FieldIcons';
import { Tooltip } from "react-native-elements";
import { Bold } from '../StyledText';

export const Fields = ({ post: { positions } }) => {
  let fields;
  if (Platform.OS == "web") {
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
  else {
    fields = positions.map((position, index) => {
      return (
        <Tooltip key={index} backgroundColor={"#10476C"} popover={<Text style={{ color: "white" }}>{position.field}</Text>}>
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
      <Bold style={{ color: "#AFA9A9", fontSize: 10, margin: 5 }}>Cosa Cerco</Bold>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {fields}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});


