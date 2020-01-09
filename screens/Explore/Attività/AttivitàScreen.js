import React, { useState } from "react"
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform, RefreshControl } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from '@apollo/react-hooks';
import Colors from "../../../constants/Colors"
import gql from "graphql-tag";
import { ScrollView } from "react-native-gesture-handler";
import SentCard from "./SentCard";
import TabBars from "../../../shared/TabBars";
import HeaderStyles from "../../shared/HeaderStyles";
import ReceivedCard from "./ReceivedCard";
import { Bold } from "../../../components/StyledText";
var shortid = require("shortid")

const Inviate = gql`
{
    applicationsSent{
      position{
        field
        title
        requisiti
      }
      post{
          id
          pubblicatoDa
      }
    }
  }
`

const Ricevute = gql`
{
    applicationsReceived{
    id
      user{
        id
        pictureUrl
        nome
        cognome
        comune
        regione
        provincia
      }
      position{
        title
        field
      }
      messages{
          text
          createdAt
          updatedAt
          user{
              id
              nome
          }
      }
    }
  }
`


export default function AttivitàScreen({ navigation }) {
    const [posizioniInvitate, setInviate] = useState([]);
    const [posizioniRicevute, setRicevute] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const FirstRoute = () => (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ backgroundColor: "#F7F4F4" }}>
            {posizioniInvitate.length > 0 && posizioniInvitate.map(posizione => {
                return <SentCard key={shortid.generate()} title={posizione.position.title} field={posizione.position.field} pubblicatoDa={posizione.post.pubblicatoDa} qualifiche={posizione.position.requisiti} id={posizione.post.id} navigation={navigation} />
            })}
        </ScrollView>
    );

    const SecondRoute = () => (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ backgroundColor: "#F7F4F4" }}>
            {
                posizioniRicevute.length > 0 &&
                posizioniRicevute.map(posizione => {
                    return <ReceivedCard key={shortid.generate()} posizione={posizione}></ReceivedCard>
                })
            }
        </ScrollView>
    );
    const { refetch } = useQuery(Inviate, {
        onCompleted: async ({ applicationsSent }) => {
            setInviate(applicationsSent)
        }
    });

    const onRefresh = async () => {
        setRefreshing(true)
        refetch().then(() => setRefreshing(false))
    }

    const receivedQuery = useQuery(Ricevute, {
        onCompleted: async ({ applicationsReceived }) => {
            setRicevute(applicationsReceived)
        }
    });

    const [routes] = React.useState([
        { key: 'first', title: 'Inviate' },
        { key: 'second', title: 'Ricevute' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    return (
        <TabBars renderScene={renderScene} routes={routes}></TabBars>
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: "#EBEBEB"
    },
});

AttivitàScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Candidature",
        headerStyle: HeaderStyles.headerStyle,
        headerTitleStyle: HeaderStyles.headerTitleStyle,
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name={"ios-arrow-back"}
                    size={25}
                    style={{ marginLeft: 10 }}
                    color={Colors.blue}
                ></Ionicons>
            </TouchableOpacity>
        ),
    }
}