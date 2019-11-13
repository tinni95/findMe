import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, TextInput } from 'react-native';
import { StepsIndicator } from "./stepsIndicator";
import FormTextInput from "../shared/Form/FormTextInput";
import { StepsLabel, StepsLabelError } from "./StepsLabel";
import WithErrorString from "../shared/Form/WithErrorString";
import { FormStyles } from "../shared/Form/FormStyles";
import { RoundFilters } from "../Explore/FiltersStack/components/RoundFilters";
import RoundButton from '../../components/shared/RoundButton';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const POST_PRESENTAZIONE = gql`
  query PresentazioneQuery {
    postLocation @client
    postOwnerIndex @client
    postOwnerPosition @client
  }
`;
const Posizioni = [
    { name: "C.E.O", id: 1 }, { name: "C.T.O", id: 2 }, { id: 3, name: "Amministratore" }, { id: 4, name: "Direttore" }, { id: 5, name: "Finanziatore" }
];
const Settori = ["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];

export function Presentazione({ navigation }) {
    const client = useApolloClient();
    const { data } = useQuery(POST_PRESENTAZIONE);
    const activeIndex = data.postOwnerIndex;
    const passedTitle = navigation.getParam("item") || data.postOwnerPosition
    const passedLocation = navigation.getParam("location") || data.postLocation
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");
    const [items, setItems] = useState([]);
    const [locationError, setLocationError] = useState("");
    const [positionError, setPositionError] = useState("");
    const [itemsError, setItemsError] = useState("");
    const addItem = item => {
        setItems([item]);
    };
    const handlePress = () => {
        if (position.length === 0) {
            setPositionError(true)
        }
        else {
            setPositionError(false)
        }
        if (items.length === 0) {
            setItemsError(true)
        }
        else {
            setItemsError(false)
        }
        if (location.length === 0) {
            setLocationError(true)
        }
        else {
            setLocationError(false)
        }
        if (position.length > 0 && items.length > 0 && location.length>0) {
            client.writeData({ data: { 
                postLocation: location, 
                postOwnerPosition:position,
                postOwnerIndex: Settori.indexOf(items[0])
             } });
            navigation.navigate("InsertFlowHome");
        }
    }
    useEffect(() => {
        passedTitle ? setPosition(passedTitle.name?passedTitle.name:passedTitle ) : null
        passedLocation ? setLocation(passedLocation) : null
        activeIndex !==-1 ? setItems([Settori[activeIndex]]): null
    })
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <StepsIndicator navigation={navigation} active={0}></StepsIndicator>
            </View>
            <View style={styles.body}>
            <WithErrorString
                        errorText="Campo Obbligatorio"
                        error={locationError}
                    >
                <FormTextInput
                    error={locationError}
                    style={locationError ? FormStyles.inputError : FormStyles.input}
                    value={location}
                    onFocus={() => navigation.navigate("AutoCompleteLocation", { path: "Presentazione", items: Posizioni })}
                    placeholder="Località"
                />
                </WithErrorString>
                {itemsError ?
                    <StepsLabelError text={"Mi Propongo Come"} />
                    :
                    <StepsLabel text={"Mi Propongo Come"} />
                }
                <RoundFilters maximum={1} items={items} addItem={addItem} settori={Settori} settoreAttivi={activeIndex} />
                <View style={styles.PosizioniTitleWrapper}>
                    <WithErrorString
                        errorText="Campo Obbligatorio"
                        error={positionError}
                    >
                        <FormTextInput
                            error={positionError}
                            style={positionError ? FormStyles.inputError : FormStyles.input}
                            value={position}
                            onFocus={() => navigation.navigate("AutoComplete", { path: "Presentazione", items: Posizioni })}
                            placeholder="Posizione (es. CEO, Programmatore)"
                        />
                    </WithErrorString>
                </View>
                <View style={styles.buttonWrapper}>
                    <RoundButton text={"PROCEDI"} color={"#10476C"} textColor={"white"} onPress={() => handlePress()} />
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
        marginLeft: Platform.OS == "web" ? 100 : 20,
        marginRight: Platform.OS == "web" ? 100 : 20,
    },
    header: {
        flex: 1.5
    },
    PosizioniTitleWrapper: {
        marginTop: 20
    }
});
