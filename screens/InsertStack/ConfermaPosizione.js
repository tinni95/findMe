import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StepsLabel } from "./StepsLabel";
import { StepsIndicator } from "./stepsIndicator";
import FormTextInput from "../shared/Form/FormTextInput";
import { RoundFilters } from "../Explore/FiltersStack/components/RoundFilters";
import RoundButton from '../../components/shared/RoundButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
export function ConfermaPosizione({ navigation, settore }) {
    const passedTitle = navigation.getParam("item") || null
    const [title, setTitle] = useState("");
    const [socio, setSocio] = useState([]);
    const [socioError, setSocioError] = useState(false);
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    settore = Platform == "web" ? (settore ? settore : []) : (navigation.getParam("settore") || [])
    useEffect(() => {
        passedTitle ? setTitle(passedTitle.name) : null
    })
    const [items, setItems] = useState(settore);
    const addItem1 = item => {
        setSocio([item]);
    };
    const addItem = item => {
        setItems([item]);
    };
    const handlePress = () => {
        navigation.navigate("Anteprima");
    }
    if (socio == "Socio Finanziatore") {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <StepsIndicator navigation={navigation} active={2}></StepsIndicator>
                </View>
                <View style={styles.body}>
                    <KeyboardAwareScrollView >
                        {socioError ?
                            <StepsLabelError text={"Cosa Cerco"} />
                            :
                            <StepsLabel text={"Cosa Cerco"} />
                        }
                        <RoundFilters maximum={1} items={items} addItem={addItem1} settori={TipoSocio} settoreAttivi={[]} />
                        <View style={{ height: 15 }}></View>
                        {descriptionError ?
                            <StepsLabelError text={"Descrizione*"} />
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
            <View style={styles.header}>
                <StepsIndicator navigation={navigation} active={2}></StepsIndicator>
            </View>
            <View style={styles.body}>
                <KeyboardAwareScrollView >
                    {socioError ?
                        <StepsLabelError text={"Mi Propongo Come"} />
                        :
                        <StepsLabel text={"Mi Propongo Come"} />
                    }
                    <RoundFilters maximum={1} items={items} addItem={addItem1} settori={TipoSocio} settoreAttivi={[]} />
                    <View style={{ height: 15 }}></View>
                    <FormTextInput
                        value={title}
                        onFocus={() => navigation.navigate("AutoComplete", { path: "Posizioni", items: autoCompleteItems })}
                        placeholder="Titolo Posizione"
                        errorText="Campo Obbligatorio"
                        error={titleError}
                    />
                    {descriptionError ?
                        <StepsLabelError text={"Descrizione*"} />
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
                    <StepsLabel text="Categorie (es. Economia, Ingegneria...)" />
                    <RoundFilters maximum={1} items={items} addItem={addItem} settori={Settori} settoreAttivi={settore} />
                    <View style={styles.buttonWrapper}>
                        <RoundButton text={"CONFERMA"} color={"#10476C"} textColor={"white"} onPress={() => handlePress()} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    )
};

Posizioni.navigationOptions = {
    header: null
};
const styles = StyleSheet.create({
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
