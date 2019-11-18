import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StepsLabel, StepsLabelError } from "./StepsLabel";
import FormTextInput from "../shared/Form/FormTextInput";
import { RoundFilters } from "../Explore/FiltersStack/components/RoundFilters";
import RoundButton from '../../components/shared/RoundButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
const Settori = ["Aereonautica", "Fashion", "Ingegneria", "Ristorazione", "Intrattenimento", "Cinofilia", "Musica", "Arte", "Teatro", "Aereonautica", "Fashion", "Ingegneria", "Ristorazione", "Intrattenimento", "Cinofilia", "Musica", "Arte", "Teatro", "Fashion", "Ingegneria", "Ristorazione", "Fantozzi", "Cinofilia", "Musica", "Arte", "Teatro"];
const TipoSocio = ["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];

export function ConfermaPosizione({ navigation }) {
    const { data } = useQuery(POST_POSIZIONI);
    const client = useApolloClient();
    const posizioni = data.postPositions || []
    let passedTitle = navigation.getParam("item") || null
    const [title, setTitle] = useState(navigation.getParam("title"));
    const [description, setDescription] = useState(navigation.getParam("description"));
    const [categoria, setCategoria] = useState([]);
    const activeIndex = navigation.getParam("categoria");
    const [socio, setSocio] = useState([]);
    const activeIndexSocio = navigation.getParam("socio");

    useEffect(() => {
        setCategoria([Settori[activeIndex]])
        setSocio([TipoSocio[activeIndexSocio]])
        passedTitle ? setTitle(passedTitle.name ? passedTitle.name : "") : null
    })

    const handlePress = () => {
        const posizione = {
            __typename: 'data',
            title: socio == "Socio Finanziatore" ? "Finanziatore" : title,
            type: socio[0],
            field: socio == "Socio Finanziatore" ? "Economia" : categoria[0],
            description,
        }

        client.writeData({
            data: {
                postPositions: [...posizioni, posizione]
            }
        });
        navigation.navigate("Posizioni", { settore: Math.floor((Math.random() * -1000)), item: null });
    }
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <KeyboardAwareScrollView>
                    <View opacity={0.6}>
                        <StepsLabel text={"Cosa Cerco"} />
                        <RoundFilters maximum={1} inactive={true} items={socio} settori={TipoSocio} settoreAttivi={activeIndexSocio} />
                        <View style={{ height: 15 }}></View>
                        {socio != "Socio Finanziatore" ?
                            <FormTextInput
                                editable={false}
                                value={title}
                                onChangeText={val => setTitle(val)}
                                placeholder="Titolo Posizione"
                            />
                            : null}
                        <StepsLabel text={"Descrizione"} />
                        <FormTextInput
                            editable={false}
                            large="true"
                            multiline
                            numberOfLines={4}
                            placeholder="Descrizione"
                            placeholderTextColor="#ADADAD"
                            onChangeText={val => setDescription(val)}
                            value={description}
                        />
                        {socio != "Socio Finanziatore" ?
                            <View>
                                <StepsLabel text="Categoria (es. Economia, Ingegneria...)" />
                                <RoundFilters inactive={true} maximum={1} items={categoria} settori={Settori} settoreAttivi={activeIndex} />
                            </View>
                            : null}
                    </View>
                    <View style={styles.buttonWrapper}>
                        <RoundButton text={"CONFERMA"} color={"#10476C"} textColor={"white"} onPress={() => handlePress()} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View >
    )
};

ConfermaPosizione.navigationOptions = {
    title: "Conferma Posizione"
}
const styles = StyleSheet.create({
    aggiungiWrapper: {
        alignItems: "center",
        flexDirection: "column",
        margin: 20
    },
    buttonWrapper: {
        alignItems: "center",
        margin: 60
    },
    inputWrapper: {
        flex: 1,
        justifyContent: "flex-start",
    },
    container: {
        backgroundColor: "#FFF",
        flex: 1,
        marginTop: 40
    },
    body: {
        flex: 8,
        marginLeft: Platform.OS == "web" ? 100 : 20,
        marginRight: Platform.OS == "web" ? 100 : 20,
    },
    header: {
        flex: 1.5
    },
});
