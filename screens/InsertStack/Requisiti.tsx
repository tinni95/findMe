import React, { useState } from "react";
import { View, StyleSheet, ScrollView,TouchableOpacity } from "react-native";
import { isBigDevice } from "../../shared/constants/Layout";
import HeaderBarLeft from "../../shared/components/HeaderBarLeft";
import HeaderTitle from "../../shared/components/HeaderTitle";
import RequisitiMultiSelect from "../../shared/components/RequisitiMultiSelect";
import RequisitiPicker from "../../shared/components/RequisitiPicker";
import InputOverlayModal from "../../shared/components/InputOverlayModal";
import RoundButton from "../../shared/components/RoundButton";
import Colors from "../../shared/constants/Colors";

export default function Requisiti({ navigation }) {
  const {requisiti, categoria, servizio} = 
  navigation.state.params;
  const [active, setActive] = useState<any>([]);
  const [custom, setCustom] = useState<any>([]);
  const [modalVisibile, setModalVisible] = useState<boolean>(false);

  const parseRequisiti = () => {
    let requisitis= []
    active.map(index => {
      requisitis.push(requisiti[index])
    })
    return [...requisitis,...custom]
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderBarLeft
        onPress={() => navigation.navigate("Posizione")}
      ></HeaderBarLeft>
      <HeaderTitle text={"Requisiti"}></HeaderTitle>
      <RequisitiMultiSelect active={active} setActive={setActive} items={requisiti}></RequisitiMultiSelect>
      {custom.map(custo=>{
        return (
        <TouchableOpacity onPress={()=>setCustom(custom.filter(i => i !== custo))}>
          <RequisitiPicker selected={true} text={custo}></RequisitiPicker></TouchableOpacity>)
      })}
      <TouchableOpacity onPress={()=> setModalVisible(true)}>
      <RequisitiPicker selected={false} text={"Personalizza"}></RequisitiPicker>
      </TouchableOpacity>
      <InputOverlayModal modalVisibile={modalVisibile} setModalVisible={setModalVisible}
      title={"Aggiungi requisito"} input={custom} setInput={setCustom}></InputOverlayModal>
      <View style={{flex:1,margin:50,justifyContent:"center",alignItems:"center"}}>
      <RoundButton 
      onPress={()=>navigation.navigate("Descrizione",{categoria,servizio,requisiti:parseRequisiti()})}
      text={"Procedi"}
      color={Colors.blue}
      textColor={"white"}></RoundButton>
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

Requisiti.navigationOptions = {
  header:null
}