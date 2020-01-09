import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, View, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { FormStyles } from "./Form/FormStyles";
import { Bold, Body } from '../../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
const shortid = require('shortid');

export function AutoCompleteFiltri({ navigation }) {
    let items = navigation.getParam("items") || "";
    let path = navigation.getParam("path") || "";
    let isFor = navigation.getParam("for") || "";
    let is = navigation.getParam("is") || "";
    const [text, setText] = useState("");
    const textInput = useRef();
    let filteredItems = items.filter(item => isFor != "Requisiti" ? item.titolo.toLowerCase().includes(text.toLowerCase()) : item.toLowerCase().includes(text.toLowerCase()));
    if (is == "") {
        filteredItems = filteredItems.length == 0 ? [text] : filteredItems;
    }
    const renderItems = filteredItems.splice(0, 20).map(item => {
        let objectToPass = isFor == "Requisiti" || filteredItems[0] == text ? { title: item, for: isFor, is } : { title: item.titolo, categoria: item.categoria, for: isFor };
        return <TouchableOpacity onPress={() => navigation.navigate(path, objectToPass)} key={shortid.generate()} style={styles.item}>
            <Ionicons
                name={"ios-search"}
                size={22}
                style={{ padding: 5 }}
                color={"#26547C"}
            /><Body style={styles.itemText}>{isFor == "Requisiti" || filteredItems[0] == text ? item : item.titolo}</Body>
        </TouchableOpacity>
    })

    useEffect(() => {
        textInput.current.focus()
    }, []);

    return (<View style={styles.container}>
        <View style={styles.textContainer}>
            <TextInput
                maxLength={40}
                style={[FormStyles.input, styles.input]} ref={textInput} onChangeText={text => setText(text)} />
            <TouchableOpacity style={styles.cancelContainer} onPress={() => navigation.goBack()}>
                <Bold style={styles.cancelButton}>Cancella</Bold>
            </TouchableOpacity>
        </View>
        <ScrollView onScrollBeginDrag={Keyboard.dismiss} style={{ marginTop: 25 }}>
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
        borderBottomColor: "#B19393",
        flexDirection: "row"
    },
    itemText: {
        color: "#26547C",
        margin: 5,
        marginBottom: 10,
        fontSize: 16
    }
})