import React from 'react';
import { TouchableOpacity, View, StyleSheet,Platform } from 'react-native';
import { Light } from '../../components/StyledText';
import {StepsIndicator} from "./stepsIndicator";

export const Presentazione = ({ navigation }) => {
    return(
      <View style={styles.container}>
      <View style={styles.header}>
      <StepsIndicator navigation={navigation} active={0}></StepsIndicator>
      </View>
      <View style={styles.body}>
      </View>
    </View>
    )
};

Presentazione.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40
  },
  body:{
    flex:7,
    flexDirection:"row",
    backgroundColor: 'white',
  },
  header:{
    flex:2
  }
});
