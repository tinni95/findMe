import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { FormStyles } from "./Form/FormStyles";
import { Light, Bold } from '../../components/StyledText';
import { comuni } from "./comuni";
const shortid = require('shortid');

export function AutoCompleteLocation({ navigation }) {
    let path = navigation.getParam("path") || "";
    const [text, setText] = useState("null");
    const Input = useRef();
    let filteredComuni = comuni.filter(comune => comune.città.toLowerCase().includes(text.toLowerCase())).slice(0, 10)
    const renderItems = filteredComuni.map(item => {
        return <TouchableOpacity onPress={() => navigation.navigate(path, { location: item.città + ", " + item.provincia + ", " + item.regione })} key={shortid.generate()} style={styles.item}><Light style={styles.itemText}>{item.città + ", " + item.provincia + ", " + item.regione}</Light></TouchableOpacity>
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