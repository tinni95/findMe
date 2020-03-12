import React, { useState } from "react";
import { View, StyleSheet, ScrollView,TouchableOpacity } from "react-native";
import { isBigDevice } from "../../shared/constants/Layout";
import HeaderBarLeft from "../../shared/components/HeaderBarLeft";
import HeaderTitle from "../../shared/components/HeaderTitle";
import RoundButton from "../../shared/components/RoundButton";
import Colors from "../../shared/constants/Colors";
import SingleFilter from "../../shared/components/Filters/SingleFilter";
import StepsLabel from "../../shared/components/StepsLabel";
import { FormStyles } from "../../shared/components/Form/FormStyles";
import FormTextInput from "../../shared/components/Form/FormTextInput";
import DateTimePicker from "react-native-modal-datetime-picker";
var moment= require("moment");

export default function Quando({ navigation, route }) {
  const requisiti = route.params?.requisiti
  const servizio = route.params?.servizio
  const descrizione = route.params?.descrizione
  const [data, setData] = useState( "");
  const[quando,setQuando] = useState("")
  const[giornata,setGiornata] = useState("")
  const[visibleData,setVisibleDate] = useState<boolean>(false)
  console.log(requisiti)
  console.log(servizio)
  console.log(descrizione)

  const _handleDatePicked = dates => {
    setVisibleDate(false);
    setData(moment(dates).format("DD-MM-YYYY"));
  };


  return (
    <ScrollView style={styles.container}>
      <HeaderBarLeft
        onPress={() => navigation.goBack()}
      ></HeaderBarLeft>
      <HeaderTitle text={"Quando"}></HeaderTitle>
      <View style={{margin:20}}>
      <SingleFilter
      inactive={false}
      settori={["Un giorno","Da definire"]} setItem={item => setQuando(item)} settoreAttivi={0}/>
      <StepsLabel text={"Data"} />
      <TouchableOpacity onPress={() => setVisibleDate(true)}>
                <FormTextInput
                  pointerEvents="none"
                  editable={false}
                  value={data}
                  placeholder={"Seleziona data"}
                  style={
                    FormStyles.input
                  }
                />
              </TouchableOpacity>
              <StepsLabel text={"In giornata"} />
              <SingleFilter
      inactive={false}
      settori={["Mattino","Pomeriggio","Sera"]} setItem={item => setGiornata(item)} settoreAttivi={0}/>

  </View>
  <View style={{flex:1,margin:50,justifyContent:"center",alignItems:"center"}}>
      <RoundButton 
      onPress={null}
      text={"Procedi"}
      color={Colors.blue}
      textColor={"white"}/>
      </View>
      <DateTimePicker
            isVisible={visibleData}
            onConfirm={_handleDatePicked}
            onCancel={() => setVisibleDate(false)}
            minimumDate={new Date()}
          />
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
  }
});
