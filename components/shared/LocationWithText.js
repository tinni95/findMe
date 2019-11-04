import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Body } from '../StyledText';
import { isSmallDevice } from '../../constants/Layout';

export default function LocationWithText(props) {
  return (
    <View style={[styles.container, props.style]}>
       <Ionicons
        name={"ios-pin"}
        size={22}
        style={{ marginBottom: 10, marginLeft:3 }}
        color={"#DD1E63"}
  />
      <Body style={[styles.text, { fontSize: props.fontSize }]}>
        {`${props.comune}, ${props.regione}`}
      </Body>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginLeft: -3,
    flexDirection: 'row',
    margin: 5,
    marginTop: isSmallDevice ? 3 : 7
  },
  text: {
    color: '#AFA9A9',
    fontSize: 15,
    marginLeft: 5,
    marginTop:4
  }
});
