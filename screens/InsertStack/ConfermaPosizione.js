import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StepsLabel } from "./StepsLabel";
import FormTextInput from "../shared/Form/FormTextInput";
import RoundFiltersOne from "../Explore/FiltersStack/components/RoundFiltersOne";
import RoundButton from '../../components/shared/RoundButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { indexOfPosition, Settori, TipoSocio } from "./helpers";
import { FormStyles } from "../shared/Form/FormStyles";
import { isBigDevice } from '../../constants/Layout';
import { StepsIndicator } from "./stepsIndicator";
var shortid = require("shortid")
const POST_POSIZIONI = gql`
  query PosizioniQuery {
    postPositions @client{
      field
      type
      description
      requisiti
      title
    }
  }
`;

export function ConfermaPosizione({ navigation }) {
    const { data } = useQuery(POST_POSIZIONI);
    const client = useApolloClient();
    const posizioni = data.postPositions || []
    const title = navigation.getParam("title");
    const description = navigation.getParam("description");
    const categoria = navigation.getParam("categoria");
    const requisiti = navigation.getParam("requisiti");
    const activeIndex = Settori.indexOf(categoria);
    const socio = navigation.getParam("socio");
    const activeIndexSocio = TipoSocio.indexOf(socio);

    const handlePress = () => {
        let posizione = {
            __typename: 'data',
            title: socio == "Socio Finanziatore" ? "Finanziatore" : title,
            type: socio,
            field: socio == "Socio Finanziatore" ? "Economia" : categoria,
            description,
            requisiti
        }
        var PositionIndex = indexOfPosition(posizioni, posizione);
        if (PositionIndex != -1) {
            return alert("è gia stata aggiunta questa posizione, devi cambiare almeno un campo")
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
                        <RoundFiltersOne inactive={true} settori={TipoSocio} settoreAttivi={activeIndexSocio} />
                        <View style={{ height: 15 }}></View>
                        {socio != "Socio Finanziatore" ?
                            <FormTextInput
                                editable={false}
                                style={FormStyles.input}
                                value={title}
                                placeholder="Titolo Posizione"
                            />
                            : null}
                        <StepsLabel text={"Descrizione"} />
                        <FormTextInput
                            editable={false}
                            large="true"
                            multiline
                            style={FormStyles.large}
                            numberOfLines={4}
                            placeholder="Descrizione"
                            placeholderTextColor="#ADADAD"
                            value={description}
                        />
                        {socio != "Socio Finanziatore" ?
                            <View>
                                <StepsLabel text="Requisiti" />
                                {
                                    <View style={FormStyles.requisitiL}>
                                        {requisiti.map(requisito => {
                                            return <View
                                                key={shortid.generate()}
                                                style={{ margin: 5, flexDirection: "row" }}><RoundButton isLight={true} text={requisito} textColor={"white"} color={"#26547C"}></RoundButton></View>
                                        })}

                                    </View>
                                }
                                <StepsLabel text="Categoria" />
                                <RoundFiltersOne inactive={true} settori={Settori} settoreAttivi={activeIndex} />
                            </View>
                            : null}
                    </View>
                    <View style={styles.buttonWrapper}>
                        <RoundButton text={"Annulla"} color={"#DD1E63"}
                            textColor={"white"} onPress={() => navigation.goBack()} />
                        <RoundButton text={"CONFERMA"} color={"#10476C"}
                            textColor={"white"} onPress={() => handlePress()} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View >
    )
};

ConfermaPosizione.navigationOptions = {
    title: "Conferma Posizione",
    header: null
}
const styles = StyleSheet.create({
    aggiungiWrapper: {
        alignItems: "center",
        flexDirection: "column",
        margin: 20
    },
    buttonWrapper: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 28,
        marginTop: 40,
        marginBottom: 40
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
        marginLeft: isBigDevice ? 100 : 20,
        marginRight: isBigDevice ? 100 : 20,
    },
    header: {
        flex: 1.5
    },
});
