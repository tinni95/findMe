import React from 'react';
import { TouchableOpacity, View, StyleSheet,Platform } from 'react-native';
import { Light } from '../../components/StyledText';
import {StepsIndicator} from "./stepsIndicator";

export const InsertFlowHome = ({ navigation}) => {
  console.log(navigation);
  return (<StepsIndicator active={1} navigation={navigation}></StepsIndicator>)
};

InsertFlowHome.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop:20
  },
});
