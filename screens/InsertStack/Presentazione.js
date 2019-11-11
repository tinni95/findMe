import React, {useState,useEffect} from 'react';
import { View, StyleSheet,Platform } from 'react-native';
import {StepsIndicator} from "./stepsIndicator";
import FormTextInput from "../shared/Form/FormTextInput";
import {StepsLabel} from "./StepsLabel";
import {RoundFilters} from "../Explore/FiltersStack/components/RoundFilters";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RoundButton from '../../components/shared/RoundButton';
const Posizioni = [
   {name: "C.E.O", id:1}, {name: "C.T.O",id:2} ,{id:3,name: "Amministratore"},{id:4,name: "Direttore"},{id:5,name: "Finanziatore"}
]
const Settori =["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];

export function Presentazione ({ navigation }){
    const passedTitle= navigation.getParam("item") || null
    const [title,setTitle]= useState("");
    const [items,setItems] = useState([]);
    const [titleError,setTitleError]= useState("");
    const addItem= item => {
        if(items.length<1)
          setItems([...items,item]);
      };
      const removeItem= item => {
          setItems(items.filter(i=> i!== item));
      };
      const handlePress = () => {
        navigation.navigate("InsertFlowHome");
      }
      useEffect(()=>{
        passedTitle? setTitle(passedTitle.name) : null
      })
    return(
      <View style={styles.container}>
      <View style={styles.header}>
      <StepsIndicator navigation={navigation} active={0}></StepsIndicator>
      </View>
      <View style={styles.body}>
      <StepsLabel text={"Mi Propongo Come*"}/>
      <RoundFilters maximum={1} items={items} addItem={addItem} removeItem={removeItem} settori={Settori} settoreAttivi={[]}/>
      <View style={styles.PosizioniTitleWrapper}>
      <FormTextInput 
        value={title}
        onFocus={()=>navigation.navigate("AutoComplete",{path:"Presentazione",items:Posizioni})}
        placeholder="Posizione (es. CEO, Programmatore)"
        errorText="Campo Obbligatorio"
        error={titleError}
          />
        </View>
        <View style={styles.buttonWrapper}>
       <RoundButton text={"PROCEDI"} color={"#10476C"} textColor={"white"}onPress={()=>handlePress()}/>
       </View>
      </View>
    </View>
    )
};

Presentazione.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
    buttonWrapper:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
        margin:20
      },
      inputWrapper:{
        flex:1,
        justifyContent:"flex-start",
      },
      container: {
        backgroundColor:"#FFF",
        flex: 1,
        marginTop:40
      },
      body:{
        flex:8,
        marginLeft:Platform.OS=="web"? 100:20,
        marginRight:Platform.OS=="web"? 100:20,
      },
      header:{
        flex:1.5
      },
      PosizioniTitleWrapper:{
          marginTop:20
      }
});
