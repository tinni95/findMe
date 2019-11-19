import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { FormStyles } from "./Form/FormStyles";
import { Bold } from '../../components/StyledText';
import { italia } from "./italia_comuni";
const shortid = require('shortid');

export function AutoCompleteLocation({ navigation }) {
    let items = italia.regioni;
    let path = navigation.getParam("path") || "";
    const [text, setText] = useState("null");
    const Input = useRef();
    let filteredRegions = italia.regioni.slice(0, 10).map(item => item.nome).filter(nome => nome.toLowerCase().includes(text.toLowerCase()));
    filteredRegions = filteredRegions.map(region => "Regione " + region)
    let Provinces = italia.regioni.map(regione =>
        regione.province.map(province => province.nome).filter(nome => nome.toLowerCase().includes(text.toLowerCase()))
    )
    var filteredProvinces = [].concat.apply([], Provinces).slice(0, 10);
    filteredProvinces = filteredProvinces.map(provincia => "Provincia di " + provincia);
    let Comuni = italia.regioni.map(regione =>
        regione.province.map(province =>
            province.comuni.map(comune => comune.nome).filter(nome => nome.toLowerCase().includes(text.toLocaleLowerCase()))));
    var filteredComuni = [].concat.apply([], Comuni);
    filteredComuni = [].concat.apply([], filteredComuni).slice(0, 10);
    let filteredItems = filteredRegions.concat(filteredComuni);
    const renderItems = filteredItems.map(item => {
        return <TouchableOpacity onPress={() => navigation.navigate(path, { location: item })} key={shortid.generate()} style={styles.item}><Bold style={styles.itemText}>{item}</Bold></TouchableOpacity>
    })


    useEffect(() => {
        Input.current.focus()
    });

    return (<View style={styles.container}>
        <View style={styles.textContainer}>
            <TextInput style={[FormStyles.input, styles.input]} ref={Input} onChangeText={text => setText(text)} />
            <TouchableOpacity style={styles.cancelContainer} onPress={() => navigation.goBack()}>
                <Bold style={styles.cancelButton}>Cancella</Bold>
            </TouchableOpacity>
        </View>
        <ScrollView style={{ marginTop: 25 }}>
            {renderItems}
        </ScrollView>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        marginTop: 20,
        borderBottomColor: "#B19393"
    },
    textContainer: {
        flexDirection: "row"
    },
    input: {
        marginLeft: 15,
        marginRight: 5,
        borderBottomColor: "#B19393",
        flex: 4
    },
    cancelButton: { marginRight: 2.5, color: "#26547C" },
    cancelContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        marginLeft: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "#B19393"
    },
    itemText: {
        color: "#26547C",
        margin: 5,
        marginBottom: 10,
        fontSize: 18
    }
})