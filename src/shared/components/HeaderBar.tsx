import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../shared/constants/Colors';

const HeaderBar = ({ onPress }) => {
  return (
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons style={{ marginLeft: 25 }} name={'ios-close'} size={25} color={Colors.red} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  headerBar: {
    borderBottomWidth: 2.5,
    borderBottomColor: '#F2F2F2',
    height: 40,
    marginBottom: 20,
  },
};

export default HeaderBar;
