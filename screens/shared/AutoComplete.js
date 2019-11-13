import React, {useEffect, useRef,useState} from "react";
import {ScrollView, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { FormStyles } from "./Form/FormStyles";
import { Bold } from '../../components/StyledText';
  
export function AutoComplete({ navigation }){
    let items=navigation.getParam("items") || "";
    let path=navigation.getParam("path") || "";
    const [text,setText] = useState("");
    const passwordInput = useRef();
    let filteredItems=items.filter(item=> item.name.toLowerCase().includes(text.toLowerCase()));
    filteredItems= filteredItems.length == 0 ? [{name:text,id:"123edwa"}] : filteredItems;
    const renderItems= filteredItems.map(item=>{
       return <TouchableOpacity onPress={()=> navigation.navigate(path,{item})} key={item.id} style={styles.item}><Bold style={styles.itemText}>{item.name}</Bold></TouchableOpacity>
    })

    
    useEffect(() => {
        passwordInput.current.focus()
      });

    return (<View style={styles.container}>
        <View style={styles.textContainer}>
            <TextInput style={[FormStyles.input, styles.input]} ref={passwordInput} onChangeText={text=> setText(text)}/>
            <TouchableOpacity style={styles.cancelContainer} onPress={() => navigation.goBack()}>
                <Bold style={styles.cancelButton}>Cancella</Bold>
            </TouchableOpacity>
        </View>
        <ScrollView style={{marginTop:25}}>
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
    cancelButton: { marginRight: 2.5,color:"#26547C" },
    cancelContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item:{
        marginLeft:15,
        borderBottomWidth:0.5,
        borderBottomColor:"#B19393"
    },
    itemText:{
        color:"#26547C",
        margin:5,
        marginBottom:10,
        fontSize:18
    }
})