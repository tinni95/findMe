import React, { useEffect, useState } from 'react';
import { Platform, Modal, View, ScrollView, StyleSheet, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
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

const User = gql`
  {
    currentUser {
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
    <ScrollView >
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
      <View style={styles.bio}>
        <Body style={{ color: Colors.blue, marginLeft: 10 }}>Mi Presento</Body>
        {data.currentUser.presentazione ?
          (data.currentUser.presentazione.length < 75 || showAll)
            ? <Light style={{ textAlign: "left", margin: 10 }}>{data.currentUser.presentazione}</Light> : <Text style={{ textAlign: "left", margin: 20 }}>
              <Light style={{ textAlign: "left", margin: 10 }}>{data.currentUser.presentazione.slice(0, 75)}</Light><Bold onPress={() => setShowAll(true)}> ...Altro</Bold></Text>
          : null}
      </View>
      <View style={{ height: 5 }}></View>
      <View style={{ height: 5, backgroundColor: '#F7F4F4', width: "100%" }}></View>
      <View style={styles.infoWrapper}>
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
      </View>
    </ScrollView>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    flex: 1,
    margin: 20
  },
  bio: {
    marginLeft: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }
})

ProfilePage.navigationOptions = ({ navigation }) => {
  return {
    title: "PROFILO",
    headerStyle: {
      ...Platform.select({
        ios: {
          shadowColor: "black",
          shadowOffset: { height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 3
        },
        android: {
          elevation: 20
        },
      })
    },
    headerTitleStyle: {
      fontFamily: "sequel-sans-bold",
      color: Colors.blue,
      fontSize: 12
    },
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
