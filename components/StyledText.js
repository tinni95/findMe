import React from 'react';
import { Text } from 'react-native';

export function AvenirText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'Avenir' }]} />
  );
}
