import React from 'react';
import { Text } from 'react-native';

export default class ProfilePage extends React.Component {
  render() {
    return <Text>{this.props.user.email}</Text>;
  }
}
