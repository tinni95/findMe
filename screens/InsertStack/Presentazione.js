import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StepsIndicator } from "./stepsIndicator";
import FormTextInput from "../shared/Form/FormTextInput";
import { StepsLabel, StepsLabelError } from "./StepsLabel";
import WithErrorString from "../shared/Form/WithErrorString";
import { FormStyles } from "../shared/Form/FormStyles";
import RoundFiltersOne from "../Explore/FiltersStack/components/RoundFiltersOne";
import RoundButton from '../../components/shared/RoundButton';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { isBigDevice } from '../../constants/Layout';
import { TitoliPosizioni } from './helpers';

const POST_PRESENTAZIONE = gql`
  query PresentazioneQuery {
    postLocation @client
    postOwner @client
    postOwnerPosition @client
  }
`;


const TipoSocio = ["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];

export function Presentazione({ navigation }) {
    const client = useApolloClient();
    const { data } = useQuery(POST_PRESENTAZIONE);
    const activeIndex = TipoSocio.indexOf(data.postOwner) || -1;
    const passedTitle = navigation.getParam("title") || data.postOwnerPosition
    const passedLocation = navigation.getParam("location") || data.postLocation
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");
    const [postOwner, setPostOwner] = useState("");
    const [locationError, setLocationError] = useState("");
    const [positionError, setPositionError] = useState("");
    const [postOwnerError, setPostOwnerError] = useState("");

    useEffect(() => {
        passedTitle ? setPosition(passedTitle.name ? passedTitle.name : passedTitle) : null
        passedLocation ? setLocation(passedLocation) : null
    })

    useEffect(() => {
        activeIndex !== -1 ? setPostOwner(data.postOwner) : null
    }, [])

    const handlePress = () => {
        if (position.length === 0) {
            setPositionError(true)
        }
        else {
            setPositionError(false)
        }
        if (postOwner.length === 0) {
            setPostOwnerError(true)
        }
        else {
            setPostOwnerError(false)
        }
        if (location.length === 0) {
            setLocationError(true)
        }
        else {
            setLocationError(false)
        }
        if (position.length > 0 && postOwner.length > 0 && location.length > 0) {
            client.writeData({
                data: {
                    postLocation: location,
                    postOwnerPosition: position,
                    postOwner
                }
            });
            navigation.navigate("Descrizione");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <StepsIndicator navigation={navigation} active={0}></StepsIndicator>
            </View>
            <View style={styles.body}>
                {locationError ?
                    <StepsLabelError text={"Scegli Località"} />
                    :
                    <StepsLabel text={"Scegli Località"} />
                }
                <WithErrorString
                    errorText="Campo Obbligatorio"
                    error={locationError}
                >
                    <FormTextInput
                        style={locationError ? FormStyles.inputError : FormStyles.input}
                        value={location}
                        onFocus={() => navigation.navigate("AutoCompleteLocation", { path: "Presentazione" })}
                        placeholder="Località"
                    />
                </WithErrorString>
                {postOwnerError ?
                    <StepsLabelError text={"Mi Propongo Come"} />
                    :
                    <StepsLabel text={"Mi Propongo Come"} />
                }
                <View style={styles.spacer} />
                <RoundFiltersOne setItem={tipoSocio => setPostOwner(tipoSocio)} settori={TipoSocio} settoreAttivi={activeIndex} />
                <View style={styles.spacer} />
                <View style={styles.PosizioniTitleWrapper}>
                    {positionError ?
                        <StepsLabelError text={"La Mia Funzione"} />
                        :
                        <StepsLabel text={"La Mia Funzione"} />
                    }
                    <WithErrorString
                        errorText="Campo Obbligatorio"
                        error={positionError}
                    >
                        <FormTextInput
                            style={positionError ? FormStyles.inputError : FormStyles.input}
                            value={position}
                            onFocus={() => navigation.navigate("AutoComplete", { path: "Presentazione", items: TitoliPosizioni })}
                            placeholder="Posizione (es. CEO, Programmatore)"
                        />
                    </WithErrorString>
                </View>
                <View style={styles.buttonWrapper}>
                    <RoundButton text={"  AVANTI  "} color={"#10476C"} textColor={"white"} onPress={() => handlePress()} />
                </View>
            </View>
        </View>
    )
};

Presentazione.navigationOptions = {
    header: null
};
const styles = StyleSheet.create({
    buttonWrapper: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        margin: 20
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
    spacer: { height: 10 }
});
