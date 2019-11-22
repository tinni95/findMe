import React, { useEffect, useState } from 'react';
import { View, StyleSheet, CheckBox, Platform } from 'react-native';
import { CheckBox as Checkbox } from 'react-native-elements'
import { Light } from '../../components/StyledText';
import { StepsIndicator } from "./stepsIndicator";
import PostScreenConfirm from "../../screens/Post/PostScreenConfirm";
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ScrollView } from 'react-native-gesture-handler';
import RoundButton from '../../components/shared/RoundButton';
import { isBigDevice, width } from '../../constants/Layout';

const POST_ANTEPRIMA = gql`
  query DescrizioneQuery {
    postLocation @client
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

export const Anteprima = ({ navigation, user }) => {
  const client = useApolloClient();
  const { data } = useQuery(POST_ANTEPRIMA);
  const [checked, setChecked] = useState(false);
  const pubblica = () => {
    client.writeData({
      data: {

      }
    });
  }
  //if first page data is missing, we go back to it
  useEffect(() => {
    if (data.postLocation === "") {
      navigation.navigate("Presentazione")
    }
    else if (data.postTitle === "") {
      navigation.navigate("Descrizione")
    }
    else if (data.postPositions === "") {
      navigation.navigate("Posizioni")
    }
  }, [])
  const post = {
    fields: data.postCategories,
    title: data.postTitle,
    description: data.postDescription,
    positions: data.postPositions,
    tipoSocio: data.postOwner,
    posizione: data.postOwnerPosition,
    regione: "Campania",
    comune: "Caserta"
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
    height: 15,
    backgroundColor: "#EBEBEB"
  },
  checkBoxWrapper: { flexDirection: "row", alignItems: "center", justifyContent: "center" }
});
