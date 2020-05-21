import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { Bold } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
type HeaderProps = {
  onPress: any;
};

const HeaderRight: FunctionComponent<HeaderProps> = ({ onPress }) => (
  <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPress}>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Bold style={{ color: Colors.red }}>Elimina</Bold>
    </View>
    <Ionicons name={'ios-trash'} size={25} style={{ margin: 10 }} color={Colors.red}></Ionicons>
  </TouchableOpacity>
);

export default HeaderRight;
