import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import TenditSpinner from "../../shared/graphql/TenditSpinner";
import TenditErrorDisplay from "../../shared/graphql/TenditErrorDisplay";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../shared/constants/Colors";
import { Bold, Light, Body } from "../../shared/components/StyledText";
import LocationWithText from "../../shared/components/LocationWithText";
import ImageViewer from "react-native-image-zoom-viewer";
import TouchablePen from "../../shared/components/TouchablePen";
import ItemsBlock from "../../shared/components/ItemsBlock";
import CompetenzeBlock from "../../shared/components/Competenze/CompetenzeBlock";
import {sortEsperienze} from "../../shared/functions/sortEsperienze";
import BioBlock from "../../shared/components/Bio/BioBlock";
import { HeaderTitle } from "react-navigation-stack";

const User = gql`
  {
    currentUser {
      id
      pictureUrl
      nome
      email
      cognome
      pictureUrl
      comune
      regione
      provincia
      presentazione
      DoB
      posizione
      formazioni {
        id
        link
        corso
        istituto
        dataFine
        dataInizio
        descrizione
      }
      esperienze {
        id
        link
        compagnia
        titolo
        dataFine
        dataInizio
        descrizione
      }
      progetti {
        id
        link
        sottoTitolo
        titolo
        dataFine
        dataInizio
        descrizione
      }
      competenze
    }
  }
`;

export default function ProfilePage({ navigation, route }) {

  const isRefetch = navigation.getParam("refetch",null)

  const [modalVisbile, setModalVisible] = useState(false);
  const { loading, error, data, refetch } = useQuery(User);

  useEffect(() => {
    console.log("isRefetch",isRefetch)
    isRefetch ? refetch() : null;
  }, [isRefetch]);

  useEffect(() => {
    data ? navigation.setParams({ currentUser: data.currentUser }) : null;
  }, [data]);

  if (loading) return <TenditSpinner />;

  const image = data.currentUser.pictureUrl
    ? { uri: data.currentUser.pictureUrl }
    : require("../../assets/images/placeholder.png");
  const images = [
    data.currentUser.pictureUrl
      ? { url: data.currentUser.pictureUrl }
      : { props: { source: require("../../assets/images/placeholder.png") } }
  ];
  if (error) return <TenditErrorDisplay />;

  const Profilo = () => {
    return (
      <View style={styles.itemsWrapper}>
             <View style={styles.itemWrapper}>
          <BioBlock
          bio={data.currentUser.presentazione}
          onPress={() =>
            navigation.navigate("BioScreen", {
              bio: data.currentUser.presentazione
            })
          }
        ></BioBlock>
        </View>
      <View style={styles.itemWrapper}>
        <ItemsBlock
          refetch={refetch}
          onPress={() =>
            data.currentUser.formazioni.length == 0
              ? navigation.navigate("FormazioneEditScreen")
              : navigation.navigate("FormazioniScreen", {
                  formazioni: sortEsperienze(data.currentUser.formazioni)
                })
          }
          items={sortEsperienze(data.currentUser.formazioni)}
          title={"Formazione"}
        ></ItemsBlock>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.itemWrapper}>
        <ItemsBlock
          refetch={refetch}
          onPress={() =>
            data.currentUser.esperienze.length == 0
              ? navigation.navigate("EsperienzeEditScreen")
              : navigation.navigate("EsperienzeScreen", {
                  esperienze: sortEsperienze(data.currentUser.esperienze)
                })
          }
          items={sortEsperienze(data.currentUser.esperienze)}
          title={"Esperienze"}
        ></ItemsBlock>
           </View>
        <View style={styles.separator}></View>
        <View style={styles.itemWrapper}>
        <CompetenzeBlock
          competenze={data.currentUser.competenze}
          onPress={() =>
            navigation.navigate("CompetenzeScreen", {
              competenze: data.currentUser.competenze
            })
          }
        ></CompetenzeBlock>
        </View>
        <View style={styles.separator}></View>
      </View>
    );
  };

  const ImageViewerModal = () => {
    return (
      <Modal
        visible={modalVisbile}
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableHighlight
          onPress={() => setModalVisible(false)}
          style={{
            backgroundColor: "black",
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <Ionicons
            name={"ios-close"}
            size={40}
            style={{ margin: 10 , marginTop:50}}
            color={"white"}
          ></Ionicons>
        </TouchableHighlight>
        <ImageViewer
          menus={({ cancel }) => (cancel ? setModalVisible(false) : null)}
          imageUrls={images}
        />
      </Modal>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {ImageViewerModal()}
      <View style={styles.userWrapper}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={image}
            style={{ width: 80, height: 80, borderRadius: 40, marginRight:10 }}
          />
        </TouchableOpacity>
        <View>
        <Bold style={{ marginTop: 12, fontSize: 20 }}>
          {data.currentUser.nome + " " + data.currentUser.cognome}
        </Bold>
        {data.currentUser.posizione && (
          <Body
            style={{
              marginTop: 7.5,
              marginBottom: -5,
              color: "#8E8E8E",
              fontSize: 17
            }}
          >
            {data.currentUser.posizione}
          </Body>
        )}
        {data.currentUser.comune && (
          <LocationWithText
            isLight
            points={16}
            fontSize={16}
            color={"black"}
            comune={data.currentUser.comune}
            regione={data.currentUser.regione}
          />
        )}
        </View>
      </View>
      <Profilo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBFB",
    flex: 1,
  },
  separator: {
    height: 5
  },
  userWrapper: {
    borderRadius:8,
    paddingTop: 20,
    paddingBottom: 50,
    marginLeft:10,
    marginRight:10,
    justifyContent: "center",
    flexDirection:"row",
    alignItems: "center"
  },
  itemWrapper:{
    borderRadius:8,
  },
  itemsWrapper: {
    borderRadius:8,
    paddingTop: 5,
  },
  flex: {
    flex: 1
  },
  bio: {
    marginLeft: 10,
    paddingBottom: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  tabButton: {
    padding: 10,
    height: "100%",
    alignItems: "center",
    paddingBottom: 10
  },
  tabButtonActive: {
    padding: 10,
    paddingBottom: 10,
    height: "100%",
    zIndex: 10,
    borderBottomColor: Colors.ocean,
    borderBottomWidth: 2
  },
  questionContainer: {

    minHeight: 500
  }
});

ProfilePage.navigationOptions = ({ navigation }) => {
  return {
    title:"",
    headerRight: () => (
      <TouchablePen
        onPress={() => {
          navigation.navigate("EditProfile", {
             currentUser: navigation.getParam("currentUser",null)
          });
        }}
        size={22}
      />
    ),
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons
          name={"ios-menu"}
          size={25}
          style={{ marginLeft: 10 }}
          color={Colors.blue}
        ></Ionicons>
      </TouchableOpacity>
    )
  }
}
