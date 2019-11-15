import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StepsLabel, StepsLabelError } from "./StepsLabel";
import { AddButton } from "./AddButton";
import WithErrorString from "../shared/Form/WithErrorString";
import { StepsIndicator } from "./stepsIndicator";
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
const Settori = ["Aereonautica", "Fashion", "Ingegneria", "Ristorazione", "Intrattenimento", "Cinofilia", "Musica", "Arte", "Teatro"];
const TipoSocio = ["Socio Operativo", "Socio Finanziatore", "Socio Operativo e Finanziatore"];
const autoCompleteItems = [
    {
        name: "passsa",
        id: "sad",
        settore: "Aereonautica"
    },
    {
        name: "dasd",
        id: "sa21321d",
        settore: "Aereonautica"
    },
    {
        name: "pusst",
        id: "das",
        settore: "Aereonautica"
    }
]
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
    const [socioError, setSocioError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [categoriaError, setCategoriaError] = useState(false);
    useEffect(() => {
        setCategoria([Settori[activeIndex]])
        setSocio([TipoSocio[activeIndexSocio]])
        passedTitle ? setTitle(passedTitle.name ? passedTitle.name : "") : null
    })
    const addItem1 = item => {
        setSocio([item]);
    };
    const addItem = item => {
        setCategoria([item]);
    };

    const handlePress = () => {
        if (description.length === 0) {
            setDescriptionError(true)
        } else {
            setDescriptionError(false)
        }
        if (categoria.length === 0) {
            setCategoriaError(true)
        } else {
            setCategoriaError(false)
        }
        if (socio.length === 0) {
            setSocioError(true)
        } else {
            setSocioError(false)
        }
        if (title.length === 0) {
            setTitleError(true)
        } else {
            setTitleError(false)
        }
        if (title.length > 0 && socio.length > 0 && categoria.length > 0 && description.length > 0) {

            const posizione = {
                __typename: 'data',
                title,
                type: socio[0],
                field: categoria[0],
                description,
            }

            client.writeData({
                data: {
                    postPositions: [...posizioni, posizione]
                }
            });
            navigation.navigate("Posizioni", { settore: Math.floor((Math.random() * -1000)), item: null });
        }
    }

    if (socio == "Socio Finanziatore") {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <KeyboardAwareScrollView >
                        {socioError ?
                            <StepsLabelError text={"Cosa Cerco"} />
                            :
                            <StepsLabel text={"Cosa Cerco"} />
                        }
                        <RoundFilters maximum={1} items={socio} addItem={addItem1} settori={TipoSocio} settoreAttivi={activeIndexSocio} />
                        <View style={{ height: 15 }}></View>
                        {descriptionError ?
                            <StepsLabelError text={"Descrizione"} />
                            :
                            <StepsLabel text={"Descrizione"} />
                        }
                        <FormTextInput
                            large="true"
                            multiline
                            numberOfLines={4}
                            placeholder="Descrizione"
                            placeholderTextColor="#ADADAD"
                            onChangeText={val => setDescription(val)}
                            editable
                            error={descriptionError}
                            value={description}
                        />
                        <View style={styles.buttonWrapper}>
                            <RoundButton text={"PROCEDI"} color={"#10476C"} textColor={"white"} onPress={() => handlePress()} />
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <KeyboardAwareScrollView >
                    {socioError ?
                        <StepsLabelError text={"Mi Propongo Come"} />
                        :
                        <StepsLabel text={"Mi Propongo Come"} />
                    }
                    <RoundFilters maximum={1} items={socio} addItem={addItem1} settori={TipoSocio} settoreAttivi={activeIndexSocio} />
                    <View style={{ height: 15 }}></View>
                    <WithErrorString
                        error={titleError}
                        errorText={"Campo Obbligatorio"}>
                        <FormTextInput
                            value={title}
                            onFocus={() => navigation.navigate("AutoComplete", { path: "ConfermaPosizione", items: autoCompleteItems })}
                            onChangeText={val => setTitle(val)}
                            placeholder="Titolo Posizione"
                            error={titleError}
                        />
                    </WithErrorString>
                    {descriptionError ?
                        <StepsLabelError text={"Descrizione"} />
                        :
                        <StepsLabel text={"Descrizione"} />
                    }
                    <FormTextInput
                        large="true"
                        multiline
                        numberOfLines={4}
                        placeholder="Descrizione"
                        placeholderTextColor="#ADADAD"
                        onChangeText={val => setDescription(val)}
                        editable
                        error={descriptionError}
                        value={description}
                    />
                    {categoriaError ? <StepsLabelError text="Categoria" /> :
                        <StepsLabel text="Categoria (es. Economia, Ingegneria...)" />}
                    <RoundFilters maximum={1} items={categoria} addItem={addItem} settori={Settori} settoreAttivi={activeIndex} />
                    <View style={styles.buttonWrapper}>
                        <RoundButton text={"PROCEDI"} color={"#10476C"} textColor={"white"} onPress={() => handlePress()} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
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
});
