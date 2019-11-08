import React from 'react';
import { TouchableOpacity, View, StyleSheet,Platform } from 'react-native';
import { Light } from '../../components/StyledText';
import {StepsIndicator} from "./stepsIndicator";

export const step3 = ({ navigation }) => {
    return(
      <View style={styles.container}>
      <View style={styles.header}>
      <StepsIndicator navigation={navigation} active={2}></StepsIndicator>
      </View>
      <View style={styles.body}>
      <Light>Step 3</Light>
      </View>
    </View>
    )
};

step3.navigationOptions = {
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
