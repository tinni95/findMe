import React from 'react';
import { View, Image } from 'react-native';
import { Body, Bold } from '../../shared/components/StyledText';
import Colors from '../../shared/constants/Colors';

export default function ProfiloIcon(props) {
  return (
    <View style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}>
      {props.focused ? (
        <Image
          source={require('../../../assets/images/profiloIcon.png')}
          style={{ width: 20, height: 25 }}></Image>
      ) : (
        <Image
          source={require('../../../assets/images/profiloIcon.png')}
          style={{ width: 20, height: 25 }}></Image>
      )}
      <Bold
        style={{
          fontSize: 9,
          textAlign: 'center',
          marginTop: 5,
          color: !props.focused ? 'white' : Colors.red,
          marginRight: 0,
        }}>
        PROFILO
      </Bold>
    </View>
  );
}
