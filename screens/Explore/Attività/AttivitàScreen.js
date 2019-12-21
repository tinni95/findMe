import React, { useState } from "react"
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform, RefreshControl } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from '@apollo/react-hooks';
import Colors from "../../../constants/Colors"
import gql from "graphql-tag";
import { ScrollView } from "react-native-gesture-handler";
import SentCard from "./SentCard";
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
      user{
        id
        pictureUrl
        nome
        comune
        regione
      }
      position{
        title
        field
      }
    }
  }
`


const initialLayout = { width: Dimensions.get('window').width };

export default function AttivitàScreen({ navigation }) {
    const [posizioniInvitate, setInviate] = useState([]);
    const [posizioniRicecute, setRicevute] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const FirstRoute = () => (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ backgroundColor: "#F7F4F4" }}>
            {posizioniInvitate.length > 0 && posizioniInvitate.map(posizione => {
                return <SentCard key={shortid.generate()} title={posizione.position.title} field={posizione.position.field} pubblicatoDa={posizione.post.pubblicatoDa} qualifiche={posizione.position.requisiti} id={posizione.post.id} navigation={navigation} />
            })}
        </ScrollView>
    );

    const SecondRoute = () => (
        <View style={styles.scene} />
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

    const { loading2, error2, data2, refetch2 } = useQuery(Ricevute, {
        onCompleted: async ({ applicationsReceived }) => {
            console.log(applicationsReceived)
        }
    });

    renderTabBar = props => {
        return (<TabBar
            style={{ paddingTop: 5, backgroundColor: '#FFFFFF', elevation: 0, borderColor: '#B9B0B0', borderBottomWidth: 1, height: 60 }}
            labelStyle={{ color: 'black', fontSize: 14, fontFamily: 'sequel-sans-bold' }}
            {...props}
            indicatorStyle={{ backgroundColor: Colors.ocean, height: 2.5, marginBottom: -2 }}
        />
        );
    }

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Inviate' },
        { key: 'second', title: 'Ricevute' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            indicatorStyle={{ backgroundColor: Colors.blue, height: 2 }}
        />
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

AttivitàScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "CANDIDATURE",
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