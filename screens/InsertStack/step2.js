import React from 'react';
import { TouchableOpacity, View, StyleSheet,Platform } from 'react-native';
import { Light } from '../../components/StyledText';
import {StepsIndicator} from "./stepsIndicator";

export const step2 = ({ navigation}) => {
  return (  <View style={styles.container}>
    <StepsIndicator active={2} navigation={navigation}/>
    <View style={styles.body}>
    </View>
  </View>)
};

step2.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop:20
  },
  body:{
    flex:5
  }
});
