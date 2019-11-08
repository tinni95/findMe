import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet,Platform, ImageBackground } from 'react-native';
import { Light } from '../../components/StyledText';

export const StepsIndicator = ({active, navigation:{navigate}}) => {
    if(active==1){
        return (
            <View style={styles.container}>
            <View style={styles.separator} />
            <ImageBackground style={styles.stepsContainer} source={require("../../assets/images/line.png")}>
            <View style={styles.activeWrapper}>
            <View style={[styles.circleActive]}>
            <Light style={styles.textActive}>1</Light>
            </View>
            </View>
            <TouchableWithoutFeedback onPress={() => navigate("step2")} style={styles.activeWrapper}>
            <View>
            <View style={[styles.circle]}>
            <Light style={styles.text}>2</Light>
            </View>
            </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigate("step3")} style={styles.activeWrapper}>
            <View>
            <View style={[styles.circle]}>
            <Light style={styles.text}>3</Light>
            </View>
            </View>
            </TouchableWithoutFeedback>
            </ImageBackground>
            <View style={styles.separator} />
            </View>
        );
    }
    else if(active==2){
        return (
            <View style={styles.container}>
            <View style={styles.separator} />
            <ImageBackground style={styles.stepsContainer} source={require("../../assets/images/line.png")}>
            <TouchableWithoutFeedback onPress={()=>navigate("InsertFlowHome")} style={styles.activeWrapper}>
            <View>
            <View style={[styles.circle]}>
            <Light style={styles.text}>1</Light>
            </View>
            </View>
            </TouchableWithoutFeedback>
            <View style={styles.activeWrapper}>
            <View style={[styles.circleActive]}>
            <Light style={styles.textActive}>2</Light>
            </View>
            </View>
            <TouchableWithoutFeedback onPress={()=>navigate("step3")} style={styles.activeWrapper}>
            <View>
            <View style={[styles.circle]}>
            <Light style={styles.text}>3</Light>
            </View>
            </View>
            </TouchableWithoutFeedback>
            </ImageBackground>
            <View style={styles.separator} />
            </View>
        );
    }
    else{
        return (
            <View style={styles.container}>
                  <View style={styles.separator} />
            <ImageBackground style={styles.stepsContainer} source={require("../../assets/images/line.png")}>
            <TouchableWithoutFeedback onPress={()=>navigate("InsertFlowHome")} style={styles.activeWrapper}>
            <View>
            <View style={[styles.circle]}>
            <Light style={styles.text}>1</Light>
            </View>
            </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>navigate("step2")} style={styles.activeWrapper}>
            <View>
            <View style={[styles.circle]}>
            <Light style={styles.text}>2</Light>
            </View>
            </View>
            </TouchableWithoutFeedback>
            <View style={styles.activeWrapper}>
            <View style={[styles.circleActive]}>
            <Light style={styles.textActive}>3</Light>
            </View>
            </View>
            </ImageBackground>
            <View style={styles.separator} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection:"row"
  },
  stepsContainer:{
      flex:1,
    alignSelf: 'center',
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
  },
  circle:{
    backgroundColor:"white",
    margin:20,
    width: Platform.OS=="web"?100:50,
    height: Platform.OS=="web"?100:50,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"black",
    borderRadius:Platform.OS=="web"?50:25,
    borderWidth:1
  },
  circleActive:{
    backgroundColor:"white",
    margin:20,
    width: Platform.OS=="web"?100:50,
    height: Platform.OS=="web"?100:50,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#26547C",
    borderRadius:Platform.OS=="web"?50:25,
    borderWidth:3
  },
  body:{
    flex:5
  },
  line:{
    borderBottomColor: 'black',
    backgroundColor:"black",
    margin:10,
    position:"absolute",
    alignSelf:'center',
    borderBottomWidth: 2,
},
    text:{
        fontSize:Platform.OS=="web"?40:20,
        color:"#D4C3C3"
    },
    textActive:{
        fontSize:Platform.OS=="web"?40:20
    },
    activeWrapper:{
      flex:4
    },
    separator:{flex:1}
});
