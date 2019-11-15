import React from 'react'
import { ScrollView, View } from "react-native";
import { PositionCard } from "../../components/PositionCard"
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
const Settori = ["Aereonautica", "Fashion", "Ingegneria", "Ristorazione", "Intrattenimento", "Cinofilia", "Musica", "Arte", "Teatro"];
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
    console.log(posizioni)

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {posizioni.map((position) => {
                    return (
                        <PositionCard buttonOnPress={() =>
                            navigation.navigate("ConfermaModifica", {
                                description: position.description,
                                categoria: Settori.indexOf(position.field),
                                socio: TipoSocio.indexOf(position.type)
                                , title: position.title
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
