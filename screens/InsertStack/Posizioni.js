import React, {useState, useEffect} from 'react';
import { TouchableOpacity,ScrollView,View, StyleSheet,Platform } from 'react-native';
import {StepsLabel} from "./StepsLabel";
import {StepsIndicator} from "./stepsIndicator";
import FormTextInput from "../shared/Form/FormTextInput";
import FormTextInputLarge from "../shared/Form/FormTextInputLarge";
import {RoundFilters} from "../Explore/FiltersStack/components/RoundFilters";
import RoundButton from '../../components/shared/RoundButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const Settori =["Aereonautica", "Fashion","Ingegneria", "Ristorazione", "Intrattenimento","Cinofilia","Musica","Arte","Teatro"];
const autoCompleteItems= [
  {
    name:"passsa",
    id:"sad",
    settore:"Aereonautica"
  },
  {
    name:"dasd",
    id:"sa21321d",
    settore:"Aereonautica"
  },
  {
    name:"pusst",
    id:"das",
    settore:"Aereonautica"
  }
]
export function Posizioni ({navigation,settore}) {
  const passedTitle= navigation.getParam("item") || null
  const [title,setTitle]= useState("");
  const [description,setDescription]= useState("");
  const [titleError,setTitleError]= useState("");
  const [descriptionError,setDescriptionError]= useState("");
  settore= Platform =="web" ? (settore ? settore : []) : (navigation.getParam("settore") || [])
  useEffect(()=>{
    passedTitle? setTitle(passedTitle.name) : null
  })
  const [items,setItems] = useState(settore);
  const addItem= item => {
    if(items.length<1)
      setItems([...items,item]);
  };
  const removeItem= item => {
      setItems(items.filter(i=> i!== item));
  };
  const handlePress = () => {
    navigation.navigate("Anteprima");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <StepsIndicator navigation={navigation} active={2}></StepsIndicator>
      </View>
      <View style={styles.body}>
        <KeyboardAwareScrollView >
        <FormTextInput 
        value={title}
        onFocus={()=>navigation.navigate("AutoComplete",{path:"Posizioni",items:autoCompleteItems})}
        placeholder="Titolo Posizione"
        errorText="Campo Obbligatorio"
        error={titleError}
          />
      <FormTextInputLarge
        placeholder="Descrizione"
        onChangeText={val => setDescription(val)}
        errorText="Campo Obbligatorio"
        error={descriptionError}
          />
        <StepsLabel text="Categorie (es. Economia, Ingegneria...)"/>
       <RoundFilters maximum={1} items={items} addItem={addItem} removeItem={removeItem} settori={Settori} settoreAttivi={settore}/>
        <View style={styles.buttonWrapper}>
       <RoundButton text={"PROCEDI"} color={"#10476C"} textColor={"white"}onPress={()=>handlePress()}/>
       </View>
       </KeyboardAwareScrollView>
      </View>
    </View>
  )
};

Posizioni.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  buttonWrapper:{
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
});
