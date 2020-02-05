import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, Dimensions, Platform, RefreshControl } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useMutation } from '@apollo/react-hooks';
import Colors from "../../../constants/Colors"
import gql from "graphql-tag";
import { ScrollView } from "react-native-gesture-handler";
import SentCard from "./SentCard";
import TabBars from "../../../shared/TabBars";
import HeaderStyles from "../../shared/HeaderStyles";
import ReceivedCard from "./ReceivedCard";
var shortid = require("shortid")

const User = gql`
{
    currentUser {
        id
        applicationsSent {
                subRead
                pubRead
                id
                from{
                    pictureUrl
                    id
                }
                to{
                    pictureUrl
                    id
                }
                position {
                    field
                    post{
                        comune
                        regione
                        id
                        hidden
                        title
                        postedBy{
                            pictureUrl
                            nome
                            cognome
                            id
                        }
                    }
                    title
                    requisiti
                }
            }
        applicationsReceived{
            id
            pubRead
            position {
                field
                title
                requisiti
                post{
                    id
                }
            }
            from{
                pictureUrl
                id
                nome
                cognome
                regione
                comune
            }
            position{
              post{
                title
                postedBy{
                    nome
                    cognome
                }
              }
            }
            to{
                pictureUrl
                id
            }
            messages{
                text
                createdAt
                updatedAt
            }
        }
  }
}
`

const UNSEEAPPLICATIONCHAT_MUTATION = gql`
mutation unseeApplicationChatChatMutation($id:ID!,$pubRead:Boolean,$subRead:Boolean){
    UnseeApplication(id:$id,pubRead:$pubRead,subRead:$subRead){
        id
        subRead
        pubRead
    }
}`



export default function AttivitàScreen({ navigation }) {
    const [posizioniInvitate, setInviate] = useState([]);
    const [posizioniRicevute, setRicevute] = useState([]);
    const [id, setId] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const { refetch } = useQuery(User, {
        onCompleted: async ({ currentUser }) => {
            setInviate(currentUser.applicationsSent);
            setRicevute(currentUser.applicationsReceived);
            setId(currentUser.id)
        }, fetchPolicy: "no-cache"
    });
    const [unseeChat] = useMutation(UNSEEAPPLICATIONCHAT_MUTATION, {
        onCompleted: () => {
            refetch()
        }
    })

    const FirstRoute = () => (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ backgroundColor: "#F7F4F4" }}>
            {posizioniInvitate.length > 0 && posizioniInvitate.map(application => {
                return <SentCard
                    onPress={() => {
                        navigation.navigate("ApplicationSentChat", {
                            application,
                            id: application.from.id,
                            onGoBack: () => refetch()
                        })
                        unseeChat({
                            variables: {
                                id: application.id,
                                subRead: true
                            }
                        })
                    }}
                    application={application} key={shortid.generate()} navigation={navigation} />
            })}
        </ScrollView>
    );

    const SecondRoute = () => (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ backgroundColor: "#F7F4F4" }}>
            {
                posizioniRicevute.length > 0 &&
                posizioniRicevute.map(application => {
                    return <ReceivedCard
                        onPress={() => {
                            navigation.navigate("ApplicationReceivedChat", {
                                id: application.to.id, application,
                                onGoBack: () => refetch()
                            })
                            unseeChat({
                                variables: {
                                    id: application.id,
                                    pubRead: true
                                }
                            })
                        }
                        } id={id} navigation={navigation} key={shortid.generate()} application={application}></ReceivedCard>
                })
            }
        </ScrollView>
    );

    const onRefresh = async () => {
        setRefreshing(true)
        refetch().then(() => setRefreshing(false))
    }

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