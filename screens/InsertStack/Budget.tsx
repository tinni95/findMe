import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView,TouchableOpacity, TextInput } from "react-native";
import { isBigDevice } from "../../shared/constants/Layout";
import HeaderBarLeft from "../../shared/components/HeaderBarLeft";
import HeaderTitle from "../../shared/components/HeaderTitle";
import RoundButton from "../../shared/components/RoundButton";
import Colors from "../../shared/constants/Colors";
import { Bold, Light } from "../../shared/components/StyledText";
import CheckBox from "react-native-check-box";
var moment= require("moment");

export default function Budget({ navigation, }) {

  const {servizio,descrizione,categoria,quando,startTime,endTime,data}=navigation.state.params;
  const [checked, setChecked] = useState(false);
  const [budget, setBudget] = useState("15");
  const post={
    quando,
    titolo:servizio,
    descrizione,
    categoria,
    data,
    startTime,
    endTime,
    budget: checked? "Richiede preventivo":"€ "+ budget
  }
  const procedi = () => {
  if(parseInt(budget)<5){
      alert("budget minimo 5 euro")
  }
  else{
    navigation.navigate("Dove",{post})
  }
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderBarLeft
        onPress={() => navigation.goBack()}
      ></HeaderBarLeft>
      <HeaderTitle text={"Budget"}></HeaderTitle>
      <View style={{ opacity:checked?0.2:1,flex:1,margin:50,paddingBottom:10,borderBottomWidth:0.5,borderBottomColor:"black",flexDirection:"row"}}>
        <Bold style={{color:Colors.blue,fontSize:22}}>€</Bold>
        <TextInput
        editable={!checked}
       keyboardType = 'numeric'
        style={{flex:1,marginRight:10,justifyContent:"center", textAlign:"center",color:Colors.blue,fontSize:22,fontFamily:"sequel-sans-bold"}}
        value={budget}
        onChangeText={text=>setBudget(text)}
        />
      </View>
      <View style={styles.checkBoxWrapper}>
              <CheckBox
                isChecked={checked}
                onClick={() => setChecked(!checked)}
                checkBoxColor={Colors.blue}
              ></CheckBox>
              <Light onPress={() => setChecked(!checked)}>
                {" "}
              Chiedi preventivo
              </Light>
            </View>
  <View style={{flex:1,margin:50,justifyContent:"center",alignItems:"center"}}>
      <RoundButton 
      onPress={()=>procedi()}
      text={"Procedi"}
      color={Colors.blue}
      textColor={"white"}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  posizioneContent:{
    padding:20
  },
  categoriaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 50,
    flexWrap: 'wrap'
  },
  categoriaContent: {
    padding: 40
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    margin: 28,
    marginTop: 40,
    marginBottom: 40
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "flex-start"
  },
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 40
  },
  body: {
    flex: 8,
    marginLeft: isBigDevice ? 100 : 20,
    marginRight: isBigDevice ? 100 : 20
  },
  header: {
    flex: 1,
    paddingBottom: 15
  },
  textHeading: {
    marginLeft: 5,
    marginBottom: 15,
    marginTop: 25,
    color: "#5F5E5E"
  },
  checkBoxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40
  }
});

Budget.navigationOptions = {
  header:null
}