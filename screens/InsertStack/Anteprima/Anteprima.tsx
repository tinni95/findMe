import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import CheckBox from "react-native-check-box";
import { Light } from "../../../shared/components/StyledText";
import { StepsIndicator } from "../../../shared/components/StepstIndicator";
import PostScreenConfirm from "../../Explore/Post/PostScreenConfirm";
import { useApolloClient, useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ScrollView } from "react-native-gesture-handler";
import RoundButton from "../../../shared/components/RoundButton";
import { isBigDevice, width } from "../../../shared/constants/Layout";
import {
  parsePositions,
  parsePositionsLocal
} from "../../../shared/functions/ParsePositions";
import HeaderBar from "../../../shared/components/HeaderBar";
import Colors from "../../../shared/constants/Colors";

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
    postPositions @client {
      description
      title
      requisiti
    }
  }
`;

const CREATEPOST_MUTATION = gql`
  mutation createPost(
    $titolo: String!
    $descrizione: String!
    $comune: String!
    $regione: String!
    $provincia: String!
    $settori: String!
    $posizione: String!
    $posizioni: PositionCreateManyWithoutPostInput!
    $hidden: Boolean
  ) {
    createPost(
      titolo: $titolo
      descrizione: $descrizione
      comune: $comune
      regione: $regione
      provincia: $provincia
      settori: $settori
      posizione: $posizione
      posizioni: $posizioni
      hidden: $hidden
      type: "Idea"
    ) {
      titolo
    }
  }
`;

const Anteprima = ({ navigation, user }) => {
  const client = useApolloClient();
  const [createPost] = useMutation(CREATEPOST_MUTATION, {
    onCompleted: async ({ createPost }) => {
      alert("il post " + createPost.title + " è stato pubblicato");
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
        }
      });
      navigation.navigate("ExploreScreen", { refetch: true });
    },
    onError: error => {
      console.log(error);
    }
  });
  const { data } = useQuery(POST_ANTEPRIMA);
  const [checked, setChecked] = useState(false);
  const pubblica = () => {
    data.postPositions.forEach(position => {
      delete position["__typename"];
    });
    createPost({
      variables: {
        titolo: data.postTitle,
        descrizione: data.postDescription,
        posizione: data.postOwnerPosition,
        comune: data.postComune,
        regione: data.postRegione,
        provincia: data.postProvincia,
        settori: data.postCategories.join(", "),
        hidden: checked,
        posizioni: { create: parsePositions(data.postPositions) }
      }
    });
  };
  //if first page data is missing, we go back to it
  useEffect(() => {
    if (data.postRegione === "") {
      navigation.navigate("Presentazione");
    } else if (data.postTitle === "") {
      navigation.navigate("Descrizione");
    } else if (data.postPositions === "") {
      navigation.navigate("Posizioni");
    }
  }, [data]);

  const post = {
    settori: data.postCategories.join(", "),
    title: data.postTitle,
    description: data.postDescription,
    posizioni: parsePositionsLocal(data.postPositions),
    tipoSocio: data.postOwner,
    posizione: data.postOwnerPosition,
    comune: data.postComune,
    regione: data.postRegione,
    provincia: data.postProvincia
  };
  return (
    <View style={styles.container}>
      <HeaderBar
        onPress={() => navigation.navigate("ExploreScreen")}
      ></HeaderBar>
      <View style={styles.header}>
        <StepsIndicator navigation={navigation} active={2}></StepsIndicator>
      </View>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PostScreenConfirm
            navigation={navigation}
            post={post}
            user={user}
            isHidden={checked}
          ></PostScreenConfirm>
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
              onPress={() => pubblica()}
              text={"PUBBLICA POST IDEA"}
              color={"#10476C"}
              textColor={"white"}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white"
  },
  body: {
    flex: 8,
    marginLeft: isBigDevice ? 100 : 20,
    marginRight: isBigDevice ? 100 : 20
  },
  header: {
    flex: 1.5
  },
  buttonWrapper: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80
  },
  line: {
    width: width,
    height: 2.5,
    backgroundColor: "#EBEBEB"
  },
  checkBoxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40
  }
});

export default Anteprima;
