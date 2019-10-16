import React from 'react';
import { Text } from 'react-native';

export function AvenirText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'changa-one' }]} />
  );
}

export function Body(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'sequel-sans' }]} />
  );
}

export function Bold(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'sequel-sans-bold' }]} />
  );
}

export function Light(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'sequel-sans-light' }]} />
  );
}