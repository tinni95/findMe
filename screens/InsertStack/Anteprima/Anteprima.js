import React, { useEffect, useState } from 'react';
import { View, StyleSheet, CheckBox, Platform } from 'react-native';
import { CheckBox as Checkbox } from 'react-native-elements'
import { Light } from '../../../components/StyledText';
import { StepsIndicator } from "../shared/stepsIndicator";
import PostScreenConfirm from "../../Post/PostScreenConfirm";
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ScrollView } from 'react-native-gesture-handler';
import RoundButton from '../../../components/shared/RoundButton';
import { isBigDevice, width } from '../../../constants/Layout';
import { parsePositions } from './helpers';

const POST_ANTEPRIMA = gql`
  query DescrizioneQuery {
    postComune @client
    postRegione @client
    postProvincia @client
    postOwner @client
    postOwnerPosition @client
    postTitle @client
    postDescription @client
    postCategories @client
    postPositions @client{
      field
      type
      description
      title
      requisiti
    }
  }
`;

const CREATEPOST_MUTATION = gql`
mutation createPost($title: String!, $description: String!,$comune: String!, $regione:String!, $provincia:String!, $fields:String!,$type:String!,$posizione:String!, $pubblicatoDa:String! $positions:PositionCreateManyInput!) {
  createPost(title: $title, description:$description, comune:$comune, regione:$regione, provincia:$provincia,fields:$fields,type:$type,posizione:$posizione, pubblicatoDa:$pubblicatoDa,positions:$positions) {
      title
  }
}`;

export default Anteprima = ({ navigation, user }) => {

  const client = useApolloClient();
  const [createPost] = useMutation(CREATEPOST_MUTATION,
    {
      onCompleted: async ({ createPost }) => {
        alert("il post " + createPost.title + " è stato pubblicato")
        client.writeData({
          data: {
            postComune: "",
            postRegione: "",
            postProvincia: "",
            postOwnerPosition: "",
            postTitle: "",
            postDescription: "",
            postOwner: "",
            postCategories: [],
            postPositions: []
          },
        });
        navigation.navigate("Presentazione")
      }
    });
  const { data } = useQuery(POST_ANTEPRIMA);
  const [checked, setChecked] = useState(false);
  const pubblica = () => {
    data.postPositions.forEach(position => {
      delete position["__typename"]
    })
    createPost({
      variables: {
        title: data.postTitle,
        description: data.postDescription,
        posizione: data.postOwnerPosition,
        comune: data.postComune,
        regione: data.postRegione,
        provincia: data.postProvincia,
        fields: data.postCategories.join(),
        type: data.postOwnerPosition,
        pubblicatoDa: checked ? user.nome[0] + user.cognome : user.nome + " " + user.cognome,
        posizione: data.postOwnerPosition,
        positions: { create: parsePositions(data.postPositions) }
      }
    })
  }
  //if first page data is missing, we go back to it
  useEffect(() => {
    if (data.postRegione === "") {
      navigation.navigate("Presentazione")
    }
    else if (data.postTitle === "") {
      navigation.navigate("Descrizione")
    }
    else if (data.postPositions === "") {
      navigation.navigate("Posizioni")
    }
  }, [data])
  const post = {
    fields: data.postCategories.join(),
    title: data.postTitle,
    description: data.postDescription,
    positions: data.postPositions,
    tipoSocio: data.postOwner,
    posizione: data.postOwnerPosition,
    comune: data.postComune,
    regione: data.postRegione,
    provincia: data.postProvincia,
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StepsIndicator navigation={navigation} active={3}></StepsIndicator>
      </View>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PostScreenConfirm navigation={navigation} post={post} user={user} isHidden={checked}></PostScreenConfirm>
          <View style={styles.line}></View>
          <View style={styles.buttonWrapper}>
            {Platform.OS == "ios" ?
              <Checkbox
                containerStyle={{ backgroundColor: "white" }}
                title='Nascondi Profilo'
                checked={checked}
                onPress={() => setChecked(!checked)}
              ></Checkbox>
              :
              <View style={styles.checkBoxWrapper}>
                <CheckBox
                  style={{ margin: 5 }}
                  value={checked}
                  onValueChange={() => setChecked(!checked)}
                ></CheckBox>
                <Light style={{ margin: 5 }}>Nascondi Profilo</Light>
              </View>
            }
            <RoundButton onPress={() => pubblica()} styleProps={{ margin: 25 }} text={"PUBBLICA POST IDEA"}
              color={"#10476C"} textColor={"white"} />
          </View>
        </ScrollView>
      </View>
    </View>
  )
};

Anteprima.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  body: {
    flex: 8,
    marginLeft: isBigDevice ? 100 : 20,
    marginRight: isBigDevice ? 100 : 20,
  },
  header: {
    flex: 1.5
  },
  buttonWrapper: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    width: width,
    height: 2.5,
    backgroundColor: "#EBEBEB"
  },
  checkBoxWrapper: { flexDirection: "row", alignItems: "center", justifyContent: "center" }
});
