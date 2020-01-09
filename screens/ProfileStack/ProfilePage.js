import React, { useEffect, useState } from 'react';
import { Modal, View, ScrollView, StyleSheet, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { Bold, Light, Body } from '../../components/StyledText';
import LocationWithText from '../../components/shared/LocationWithText';
import ImageViewer from 'react-native-image-zoom-viewer';
import TouchablePen from './shared/TouchablePen';
import ItemsBlock from './shared/ItemsBlock';
import CompetenzeBlock from "./Competenze/CompetenzeBlock"
import HeaderStyles from '../shared/HeaderStyles';
import QuestionCardProfile from "./shared/QuestionCardProfile"

const User = gql`
  {
    currentUser {
      questions{
        id
        question
        postedBy{
          nome
          cognome
        }
        createdAt
        answers{
          id
        }
      }
      email
      nome
      cognome
      pictureUrl
      comune
      regione
      provincia
      presentazione
      DoB
      formazioni{
        id
        link
        corso
        istituto
        dataFine
        dataInizio
        descrizione
      }
      esperienze{
        id
        link
        compagnia
        titolo
        dataFine
        dataInizio
        descrizione
      }
      progetti{
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

export default function ProfilePage({ navigation }) {

  // tabs
  const Questions = () => {
    return (
      <View style={styles.questionContainer}>
        <ScrollView >
          <View style={{ alignSelf: "baseline" }}>
            {
              data.currentUser.questions.map((question) => {
                return <QuestionCardProfile key={question.id} question={question} navigation={navigation}></QuestionCardProfile>
              })
            }
          </View>
        </ScrollView>
      </View>
    )
  }
  const Profilo = () => {
    return <ScrollView style={styles.infoWrapper}>
      <ItemsBlock refetch={refetch} onPress={
        () =>
          data.currentUser.formazioni.length == 0 ? navigation.navigate("FormazioneEditScreen") :
            navigation.navigate("FormazioniScreen", { formazioni: data.currentUser.formazioni })} navigation={navigation} items={data.currentUser.formazioni} title={"Formazione"}></ItemsBlock>
      <View style={styles.separator}></View>
      <ItemsBlock refetch={refetch} navigation={navigation} onPress={
        () =>
          data.currentUser.esperienze.length == 0 ? navigation.navigate("EsperienzeEditScreen") :
            navigation.navigate("EsperienzeScreen", { esperienze: data.currentUser.esperienze })
      }
        items={data.currentUser.esperienze} title={"Esperienze"}></ItemsBlock>
      <View style={styles.separator}></View>
      <ItemsBlock refetch={refetch} navigation={navigation} onPress={
        () =>
          data.currentUser.progetti.length == 0 ? navigation.navigate("ProgettiEditScreen") :
            navigation.navigate("ProgettiScreen", { progetti: data.currentUser.progetti })
      }
        items={data.currentUser.progetti} title={"Progetti"}></ItemsBlock>
      <View style={styles.separator}></View>
      <CompetenzeBlock competenze={data.currentUser.competenze} onPress={() => navigation.navigate("CompetenzeScreen", { competenze: data.currentUser.competenze })}></CompetenzeBlock>
      <View style={styles.separator}></View>
    </ScrollView>
  }

  const [active, setActive] = useState(0)
  const isRefetch = navigation.getParam("refetch") || false
  const [showAll, setShowAll] = useState(false)
  const [modalVisbile, setModalVisible] = useState(false)
  const { loading, error, data, refetch } = useQuery(User, {
    onCompleted: async ({ currentUser }) => {
      navigation.setParams({ currentUser })
    }
  });

  useEffect(() => {
    isRefetch ? refetch() : null
  }, [isRefetch])

  useEffect(() => {
    data ? navigation.setParams({ currentUser: data.currentUser }) : null
  }, [data])
  const image = "http://hwattsup.website/AppBackEnd/images/placeholder.jpeg";
  const images = [{ uri: image }]
  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />;

  return (
    <View >
      <View style={styles.userWrapper}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={require("../../assets/images/placeholder.png")} style={{ width: 100, height: 100, borderRadius: 50 }} />
        </TouchableOpacity>
        <Modal
          visible={modalVisbile}
          transparent={false}
          onRequestClose={() => setModalVisible(false)}>
          <TouchableHighlight onPress={() => setModalVisible(false)} style={{ backgroundColor: "black", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Ionicons
              name={"ios-close"}
              size={40}
              style={{ margin: 10 }}
              color={"white"}
            ></Ionicons>
          </TouchableHighlight>
          <ImageViewer menus={({ cancel }) => cancel ? setModalVisible(false) : null} imageUrls={images} />
        </Modal>
        <Bold style={{ marginTop: 10, fontSize: 18 }}>{data.currentUser.nome + " " + data.currentUser.cognome}</Bold>
        {data.currentUser.comune &&
          <LocationWithText
            points={16}
            fontSize={12}
            comune={data.currentUser.comune} regione={data.currentUser.regione} />
        }
        <View style={{ height: 20 }}></View>
      </View>
      {data.currentUser.presentazione &&
        <View style={styles.bio}>
          <Body style={{ color: Colors.blue, marginLeft: 10 }}>Presentazione</Body>
          {(data.currentUser.presentazione.length < 75 || showAll)}
          ? <Light style={{ textAlign: "left", margin: 10 }}>{data.currentUser.presentazione}</Light> : <Text style={{ textAlign: "left", margin: 20 }}>
            <Light style={{ textAlign: "left", margin: 10 }}>{data.currentUser.presentazione.slice(0, 75)}</Light><Bold onPress={() => setShowAll(true)}> ...Altro</Bold></Text>
        </View>}
      <View style={{ height: 5 }}></View>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setActive(0)} style={active == 0 ? styles.tabButtonActive : styles.tabButton}>
          <Bold style={active == 0 ? styles.tabTextActive : styles.tabText}> Profilo</Bold>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActive(1)} style={active == 1 ? styles.tabButtonActive : styles.tabButton}>
          <Bold style={active == 1 ? styles.tabTextActive : styles.tabText}>Domande</Bold>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActive(2)} style={active == 2 ? styles.tabButtonActive : styles.tabButton}>
          <Bold style={active == 2 ? styles.tabTextActive : styles.tabText}>Risposte</Bold>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActive(3)} style={active == 3 ? styles.tabButtonActive : styles.tabButton}>
          <Bold style={active == 3 ? styles.tabTextActive : styles.tabText}>Connessioni</Bold>
        </TouchableOpacity>
      </View>
      {
        active == 0 && <Profilo /> ||
        active == 1 && <Questions />
      }
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabText: {
    color: "#6E6E6E"
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "lightgrey"
  },
  separator: {
    height: 30
  },
  userWrapper: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoWrapper: {
    margin: 20
  },
  flex: {
    flex: 1
  },
  bio: {
    marginLeft: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  tabButton: {
    padding: 10,
    height: "100%",
    alignItems: "center",
    paddingBottom: 15,
  },
  tabButtonActive: {
    padding: 10,
    paddingBottom: 15,
    height: "100%",
    zIndex: 10,
    borderBottomColor: Colors.ocean,
    borderBottomWidth: 2
  },
  questionContainer: {
    backgroundColor: "#F2F2F2",
  }
})

ProfilePage.navigationOptions = ({ navigation }) => {
  return {
    title: "Profilo",
    headerStyle: HeaderStyles.headerStyle,
    headerTitleStyle: HeaderStyles.headerTitleStyle,
    headerRight: (
      <TouchablePen onPress={() => navigation.navigate("EditProfile", { currentUser: navigation.getParam("currentUser") })} size={22}></TouchablePen>
    ),
    headerLeft: (
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
