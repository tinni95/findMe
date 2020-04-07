import React, { useState, useEffect } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment/min/moment-with-locales";
moment.locale("it");

export default function Quando({ navigation, route }) {
  const requisiti = route.params?.requisiti
  const categoria = route.params?.categoria
  const servizio = route.params?.servizio
  const descrizione = route.params?.descrizione
  const [data, setData] = useState("");
  const [dataToPass, setDataToPass] = useState("");
  const[quando,setQuando] = useState("")
  const[giornata,setGiornata] = useState("Da definire")
  const[visibleData,setVisibleDate] = useState<boolean>(false)
  const[visibleStartTime,setVisibleStartTime] = useState<boolean>(false)
  const[visibleEndTime,setVisibleEndTime] = useState<boolean>(false)
  const [startTime,setStartTime] = useState("");
  const [endTime,setEndTime] = useState("");
  const [dataError,setDataError] = useState(false);

  const _handleDatePicked = dates => {
    setVisibleDate(false);
    setData(moment(dates).format("DD-MM-YYYY"));
    setDataToPass(moment(dates).format("YYYY-MM-DD"));
  };

  const _handleStartTime = dates => {
    setVisibleStartTime(false);
    setStartTime(moment(dates).format("HH:mm"));
    console.log("dates",dates)
  };


  const _handleEndTime = dates => {
    setVisibleEndTime(false);
    setEndTime(moment(dates).format("HH:mm"));
    console.log(dates)
  };

  const handlePress = () => {
    if(data.length==0&&quando==="In un giorno preciso"){
      setDataError(true)
    }
    else if(quando!=""){
      if(quando==="In un giorno preciso"){
        navigation.navigate("Budget",{categoria,requisiti,servizio,descrizione,giornata,data:dataToPass,startTime,endTime})
      }
      else{
        navigation.navigate("Budget",{categoria,requisiti,servizio,descrizione})
      }
     
    }
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderBarLeft
        onPress={() => navigation.goBack()}
      ></HeaderBarLeft>
      <HeaderTitle text={"Quando"}></HeaderTitle>
      <View style={{margin:20}}>
      <SingleFilter
      inactive={false}
      settori={["In un giorno preciso","Entro una data","Da definire"]} setItem={item => setQuando(item)} settoreAttivi={-1}/>
      <View style={{marginTop:20}}/>
      { quando==="In un giorno preciso"&& <View>
      <LinearGradient start={[0, 1]} end={[1, 0]} colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />
      <StepsLabel error={dataError} text={"Data"} />
      <TouchableOpacity onPress={() => setVisibleDate(true)}>
                <FormTextInput
                  pointerEvents="none"
                  editable={false}
                  value={data}
                  placeholder={"Seleziona data"}
                  style={
                    dataError?
                    FormStyles.inputError:
                    FormStyles.input
                  }
                />
              </TouchableOpacity>
              <View style={{marginTop:20}}/>
              <LinearGradient start={[0, 1]} end={[1, 0]} colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />
              <StepsLabel text={"Fase della giornata"} />
              <SingleFilter
      inactive={false}
      settori={["Da definire","Mattino","Pomeriggio","Sera"]} setItem={item => setGiornata(item)} settoreAttivi={-1}/>
              <View style={{marginTop:20}}/>
              <LinearGradient start={[0, 1]} end={[1, 0]} colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />              
 <StepsLabel  text={"Fascia oraria"} />

 <View style={FormStyles.inputHalfsContainer}>
        <View style={FormStyles.inputHalfContainer}>
      
            <TouchableOpacity onPress={() => setVisibleStartTime(true)}>
              <FormTextInput
                editable={false}
                pointerEvents="none"
                style={
               FormStyles.inputHalf
                }
                value={startTime}
                placeholder="Data Inizio"
                placeholderTextColor="#ADADAD"
              />
            </TouchableOpacity>

        </View>
        <View style={FormStyles.inputHalfContainer}>

            <TouchableOpacity onPress={() => setVisibleEndTime(true)}>
              <FormTextInput
                editable={false}
                pointerEvents="none"
                style={FormStyles.inputHalf}
                placeholder="A ora"
                value={endTime}
                placeholderTextColor="#ADADAD"
              />
            </TouchableOpacity>

        </View>
      </View>

  
  </View>}</View>
  <View style={{flex:1,margin:50,justifyContent:"center",alignItems:"center"}}>
      <RoundButton 
      onPress={()=>handlePress()}
      text={"Procedi"}
      color={Colors.blue}
      textColor={"white"}/>
      </View>
      <DateTimePicker
          cancelTextIOS={"Cancella"}
          confirmTextIOS={"Conferma"}
          locale={"it"}
          hideTitleContainerIOS={true}
            isVisible={visibleData}
            onConfirm={_handleDatePicked}
            onCancel={() => setVisibleDate(false)}
            minimumDate={new Date()}
          />
            <DateTimePicker
            mode={"time"}
            is24Hour={true}
            locale={"it"}
            isVisible={visibleStartTime}
            onConfirm={_handleStartTime}
            onCancel={() => setVisibleStartTime(false)}
          />
               <DateTimePicker
            mode={"time"}
            is24Hour={true}
            locale={"it"}
            isVisible={visibleEndTime}
            onConfirm={_handleEndTime}
            onCancel={() => setVisibleEndTime(false)}
          />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  line:{
    height:1.5,
    marginTop:15
  },
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
