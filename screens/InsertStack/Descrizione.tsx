import React, { useState } from "react";
import { View, StyleSheet, ScrollView,TouchableOpacity } from "react-native";
import { isBigDevice } from "../../shared/constants/Layout";
import HeaderBarLeft from "../../shared/components/HeaderBarLeft";
import HeaderTitle from "../../shared/components/HeaderTitle";
import RoundButton from "../../shared/components/RoundButton";
import Colors from "../../shared/constants/Colors";
import FormTextInput from "../../shared/components/Form/FormTextInput";
import { FormStyles } from "../../shared/components/Form/FormStyles";

export default function Descrizione({ navigation, route }) {
  const requisiti = route.params?.requisiti
  const servizio = route.params?.servizio
  console.log(requisiti)
  console.log(servizio)
  const [descrizione, setDescrizione] = useState<any>([]);

  return (
    <ScrollView style={styles.container}>
      <HeaderBarLeft
        onPress={() => navigation.goBack()}
      ></HeaderBarLeft>
      <HeaderTitle text={"Descrizione"}></HeaderTitle>
      <View style={{margin:20}}>
      <FormTextInput
    large="true"
    multiline
    numberOfLines={4}
    placeholder={"ho bisogno di... per.."}
    onChangeText={val => setDescrizione(val)}
    textAlignVertical={"top"}
    style={FormStyles.xlarge}
    value={descrizione}
  />
  </View>
  <View style={{flex:1,margin:50,justifyContent:"center",alignItems:"center"}}>
      <RoundButton 
      onPress={null}
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
  }
});
