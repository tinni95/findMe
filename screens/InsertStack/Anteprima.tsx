import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView,TouchableOpacity, TextInput } from "react-native";
import { isBigDevice } from "../../shared/constants/Layout";
import HeaderBarLeft from "../../shared/components/HeaderBarLeft";
import HeaderTitle from "../../shared/components/HeaderTitle";
import RoundButton from "../../shared/components/RoundButton";
import Colors from "../../shared/constants/Colors";
import PostScreenConfirm from "../Explore/Post/PostScreenConfirm"
import CheckBox from "react-native-check-box";
import { Light } from "../../shared/components/StyledText";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";

const CREATEPOST_MUTATION = gql`
  mutation createPost(
    $titolo: String!
    $descrizione: String!
    $comune: String!
    $regione: String!
    $provincia: String!
    $budget: String!
    $endTime: String
    $startTime: String
    $hidden: Boolean
    $categoria: String!
    $data: DateTime
    
  ) {
    createPost(
      titolo: $titolo
      descrizione: $descrizione
      comune: $comune
      regione: $regione
      provincia: $provincia
      budget: $budget
      startTime: $startTime
      endTime: $endTime
      hidden: $hidden
      categoria: $categoria
      data:$data
    ) {
      titolo
    }
  }
`;

export default function Anteprima({ navigation, route }) {
  const post = route.params?.post
  console.log("post",post)
  const [checked,setChecked] = useState(false)
  const [pubblicaPost] = useMutation(CREATEPOST_MUTATION,{
    onCompleted: () => {
      alert("pubblicato")
      navigation.navigate("Categoria")
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const pubblica = () => {
    const hidden = checked;
    const variables = {
      titolo: post.titolo,
      descrizione: post.descrizione,
      comune:post.comune,
      regione:post.regione,
      provincia:post.provincia,
      startTime:post.startTime||null,
      endTime:post.endTime||null,
      data:post.data||null,
      budget:post.budget,
      hidden,
      categoria:post.categoria,
      requisiti:{ set: post.requisiti }
    };
    console.log("variables", variables)
    pubblicaPost({variables})

  }

  return (
    <ScrollView style={styles.container}>
      <HeaderBarLeft
        onPress={() => navigation.goBack()}
      ></HeaderBarLeft>
      <HeaderTitle text={"Anteprima"}></HeaderTitle>
  <View style={{flex:1,margin:20,justifyContent:"center",alignItems:"center"}}>
    <PostScreenConfirm hidden={checked} post={post}></PostScreenConfirm>
    <View style={styles.buttonWrapper}>
    <View style={styles.checkBoxWrapper}>
              <CheckBox
                isChecked={checked}
                onClick={() => setChecked(!checked)}
                checkBoxColor={Colors.blue}
              ></CheckBox>
              <Light onPress={() => setChecked(!checked)}>
                {" "}
                Nascondi Profilo
              </Light>
            </View>
      <RoundButton 
      onPress={pubblica}
      text={"PUBBLICA POST IDEA"}
      color={Colors.blue}
      textColor={"white"}/>
      </View>
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
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80
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
