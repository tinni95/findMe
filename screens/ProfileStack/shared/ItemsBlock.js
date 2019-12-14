import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Body, Bold } from "../../../components/StyledText"
import Colors from "../../../constants/Colors"
import FormazioneCard from "../Formazioni/FormazioneCard"
import EsperienzaCard from "../Esperienze/EsperienzaCard"
import ProgettoCard from "../Progetti/ProgettoCard"
import UnTouchablePen from "./UnTouchablePen"
import Swipeout from 'react-native-swipeout';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
var shortid = require("shortid")

const DELETEFORMAZIONE_MUTATION = gql`
mutation deleteFormazione($id: ID!) {
    deleteFormazione(id:$id) {
       id
}
}`;

const DELETEESPERIENZA_MUTATION = gql`
mutation deleteEsperienza($id: ID!) {
    deleteEsperienza(id:$id) {
       id
}
}`;

const DELETEPROGETTO_MUTATION = gql`
mutation deleteProgetto($id: ID!) {
    deleteProgetto(id:$id) {
       id
}
}`;

export default function ItemsBlock({ refetch, title, items, onPress }) {
    const [deleteEsperienza] = useMutation(DELETEESPERIENZA_MUTATION,
        {
            onCompleted: async () => {
                refetch()
            }
        });

    const [deleteFormazione] = useMutation(DELETEFORMAZIONE_MUTATION,
        {
            onCompleted: async () => {
                refetch()
            }
        });

    const [deleteProgetto] = useMutation(DELETEPROGETTO_MUTATION,
        {
            onCompleted: async () => {
                refetch()
            }
        });

    return (
        <View>
            <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <Body style={{ color: Colors.blue }}>{title}</Body>
                <UnTouchablePen size={15}></UnTouchablePen>
            </TouchableOpacity>

            {items.length > 0 &&
                title == "Formazione" && items.map(item => {
                    const swipeoutBtns = [
                        {
                            text: "delete",
                            type: "delete",
                            onPress: () => deleteFormazione(
                                {
                                    variables: {
                                        id: item.id
                                    }
                                }
                            )
                        },
                    ];
                    return <Swipeout key={shortid.generate()} autoClose={true} backgroundColor={"#FFFFFF"} right={swipeoutBtns}><FormazioneCard item={item}></FormazioneCard></Swipeout>
                }) ||
                title == "Esperienze" && items.map(item => {
                    const swipeoutBtns = [
                        {
                            text: "delete",
                            type: "delete",
                            onPress: () => deleteEsperienza(
                                {
                                    variables: {
                                        id: item.id
                                    }
                                }
                            )
                        },
                    ];
                    return <Swipeout key={shortid.generate()} autoClose={true} backgroundColor={"#FFFFFF"} right={swipeoutBtns}><EsperienzaCard key={shortid.generate()} item={item}></EsperienzaCard></Swipeout>
                }) ||
                title == "Progetti" && items.map(item => {
                    const swipeoutBtns = [
                        {
                            text: "delete",
                            type: "delete",
                            onPress: () => deleteProgetto(
                                {
                                    variables: {
                                        id: item.id
                                    }
                                }
                            )
                        },
                    ];
                    return <Swipeout key={shortid.generate()} autoClose={true} backgroundColor={"#FFFFFF"} right={swipeoutBtns}><ProgettoCard key={shortid.generate()} item={item}></ProgettoCard></Swipeout>
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    aggiungiButton: {
        textAlign: "center",
        color: Colors.blue
    },
    aggiungiWrapper: {
        margin: 20
    }
})