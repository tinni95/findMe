import React from 'react'
import { ScrollView, View, Platform } from "react-native";
import { PositionCard } from "../../components/PositionCard"
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
const Settori = ["Aereonautica", "Fashion", "Ingegneria", "Ristorazione", "Intrattenimento", "Cinofilia", "Musica", "Arte", "Teatro", "Economia"];
const TipoSocio = ["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];
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
    const { data } = useQuery(POST_POSIZIONI);
    const posizioni = data.postPositions || []

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={Platform.OS == "web" ? { height: 500 } : null}>
                {posizioni.map((position) => {
                    return (
                        <PositionCard buttonOnPress={() =>
                            navigation.navigate("ModificaPosizione", {
                                description: position.description,
                                categoria: Settori.indexOf(position.field),
                                socio: TipoSocio.indexOf(position.type),
                                title: position.title
                            })} buttonText={"MODIFICA"} position={position}></PositionCard>
                    );
                })}
            </ScrollView>
        </View>
    )
};


ModificaPosizioni.navigationOptions = {
    title: "Modifica Posizioni"
}
