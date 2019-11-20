import React from 'react'
import { ScrollView, View, Platform, TouchableOpacity } from "react-native";
import { PositionCardModifica } from "../../components/PositionCardModifica"
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Ionicons } from '@expo/vector-icons';
const shortid = require('shortid');
const POST_POSIZIONI = gql`
  query PosizioniQuery {
    postPositions @client{
      field
      type
      description
      title
    }
  }
`;

export function ModificaPosizioni({ navigation }) {
    const client = useApolloClient();
    const removeItem = index => {
        posizioni.splice(index, 1)
        client.writeData({
            data: {
                postPositions: posizioni
            }
        });
        navigation.navigate("ModificaPosizioni", { refresh: true });
    }
    const { data, refetch } = useQuery(POST_POSIZIONI);
    const posizioni = data.postPositions || []

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={Platform.OS == "web" ? { height: 500 } : null}>
                {posizioni.map((position, index) => {
                    return (
                        <PositionCardModifica key={shortid.generate()} buttonOnPress={() =>
                            navigation.navigate("ModificaPosizione", {
                                description: position.description,
                                categoria: position.field,
                                socio: position.type,
                                title: position.title
                            })}
                            trashOnPress={() => removeItem(index)}
                            buttonText={"MODIFICA"} position={position}></PositionCardModifica>
                    );
                })}
            </ScrollView>
        </View>
    )
};


ModificaPosizioni.navigationOptions = ({ navigation }) => ({
    title: "Modifica Posizioni",
    headerLeft:
        <TouchableOpacity onPress={() => navigation.navigate("Posizioni", { refresh: true })}>
            <Ionicons
                name={"md-arrow-back"}
                size={25}
                style={{ padding: 7.5, paddingLeft: 15 }}
                color={"#5F5E5E"}
            />
        </TouchableOpacity>
})
