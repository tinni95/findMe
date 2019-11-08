import React, {useState} from 'react';
import { TouchableOpacity,ScrollView,View, StyleSheet,Platform } from 'react-native';
import { Light, Bold } from '../../components/StyledText';
import {StepsIndicator} from "./stepsIndicator";
import FormTextInput from "../shared/Form/FormTextInput";
import FormTextInputLarge from "../shared/Form/FormTextInputLarge";
import {RoundFilters} from "../Explore/FiltersStack/components/RoundFilters";
import RoundButton from '../../components/shared/RoundButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const Settori =["Aereonautica", "Fashion","Ingegneria", "Ristorazione", "Intrattenimento","Cinofilia","Musica","Arte","Teatro"];

export function InsertFlowHome ({navigation,settore}) {
  const [title,setTitle]= useState("");
  const [description,setDescription]= useState("");
  const [titleError,setTitleError]= useState("");
  const [descriptionError,setDescriptionError]= useState("");
  settore= Platform =="web" ? (settore ? settore : []) : (navigation.getParam("settore") || [])
  

  const [items,setItems] = useState(settore);
  const addItem= item => {
    if(items.length<3||items.includes(items))
      setItems([...items,item]);
  };
  const removeItem= item => {
      setItems(items.filter(i=> i!== item));
  };
  const handlePress = () => {
    navigation.navigate("Posizioni");
    console.log(items);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <StepsIndicator navigation={navigation} active={0}></StepsIndicator>
      </View>
      <View style={styles.body}>
        <KeyboardAwareScrollView >
        <FormTextInput 
        placeholder="Titolo Post Idea"
        onChangeText={val => setTitle(val)}
        errorText="Campo Obbligatorio"
        error={titleError}
          />
      <Bold style={styles.textHeading}>
      Settore
      </Bold>
       <RoundFilters maximum={3} items={items} addItem={addItem} removeItem={removeItem} settori={Settori} settoreAttivi={settore}/>
       <FormTextInputLarge
        placeholder="Descrizione"
        onChangeText={val => setDescription(val)}
        errorText="Campo Obbligatorio"
        error={descriptionError}
          />
        <View style={styles.buttonWrapper}>
       <RoundButton text={"PROCEDI"} color={"#10476C"} textColor={"white"} onPress={()=>handlePress()}/>
       </View>
       </KeyboardAwareScrollView>
      </View>
    </View>
  )
};

InsertFlowHome.navigationOptions = {
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
    flex:2
  },
  textHeading:{
     marginLeft: 5, 
     marginBottom: 15, 
     marginTop:25,
     color: '#5F5E5E' 
  }
});
