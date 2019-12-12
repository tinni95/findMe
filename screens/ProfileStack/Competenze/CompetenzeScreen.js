import React, { useState, useRef } from "react"
import { View, Platform, TouchableOpacity, StyleSheet, ScrollView, Keyboard } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../../../constants/Colors"
import { Searchbar } from "react-native-paper"
import { Requisiti } from "../../InsertStack/shared/helpers"
import RoundButton from "../../../components/shared/RoundButton"
import { Body } from "../../../components/StyledText"
let shortid = require("shortid")
export default function CompetenzeScreen() {
    const [competenze, setCompetenze] = useState(["cacca", "pupu"]);
    const scrollViewRef = useRef();
    const [text, setText] = useState("");
    const [active, setActive] = useState("");
    let filteredItems = Requisiti.filter(item => item.toLowerCase().includes(text.toLowerCase()))
    filteredItems = filteredItems.length == 0 ? [text] : filteredItems;
    const renderItems = filteredItems.slice(0, 5).map(item => {
        return <TouchableOpacity onPress={() => {
            if (!competenze.includes(item)) {
                setCompetenze([...competenze, item])
                setActive(-1)
            }
        }} key={shortid.generate()} style={styles.item}>
            <Ionicons
                name={"ios-search"}
                size={22}
                style={{ padding: 5 }}
                color={"#26547C"}
            /><Body style={styles.itemText}>{item}</Body>
        </TouchableOpacity>
    })
    return (<View>
        <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center" }}>
            <Searchbar
                onChangeText={text => setText(text)}
                placeholder="Cerca Competenza"
                style={{ width: "80%", margin: 20, height: 35 }}
            ></Searchbar>
        </View>
        <ScrollView onContentSizeChange={(contentWidth, contentHeight) => { scrollViewRef.current.scrollToEnd({ animated: true }) }} ref={scrollViewRef} showsHorizontalScrollIndicator={false} horizontal>
            <View style={{ flexDirection: "row" }}>
                {
                    competenze.map((competenza, index) => {
                        let isActive = active === index
                        return (
                            <View style={{ margin: 5, marginLeft: isActive ? 0 : 5, marginRight: isActive ? 0 : 5, flexDirection: "row" }} key={shortid.generate()} >
                                <RoundButton onPress={() => {
                                    if (isActive) {
                                        let newCompetenze = competenze.filter(el => el != competenze[index])
                                        setCompetenze(newCompetenze)
                                        setActive(-1)
                                    }
                                    else {
                                        setActive(index);
                                    }
                                }}
                                    isLight={true} style={{ padding: 5 }} key={shortid.generate()} color={isActive ? Colors.red : Colors.blue} textColor="white" text={competenza}>
                                </RoundButton>
                                {isActive ?
                                    <Ionicons
                                        name={"ios-close"}
                                        size={30}
                                        color={"#989090"}
                                        style={{ marginTop: -10 }}
                                    /> : null}
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
        <View style={styles.spacer}></View>
        <ScrollView onScrollBeginDrag={Keyboard.dismiss} >
            {renderItems}
        </ScrollView>
    </View>)
}

const styles = StyleSheet.create({
    itemText: {
        color: "#26547C",
        margin: 5,
        marginBottom: 10,
        fontSize: 18
    },
    item: {
        marginLeft: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "#B19393",
        flexDirection: "row"
    },
    spacer: {
        height: 10
    }
})

CompetenzeScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "COMPETENZE",
        headerStyle: {
            ...Platform.select({
                ios: {
                    shadowColor: "black",
                    shadowOffset: { height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3
                },
                android: {
                    elevation: 20
                },
            })
        },
        headerTitleStyle: {
            fontFamily: "sequel-sans-bold",
            color: Colors.blue,
            fontSize: 12
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name={"ios-arrow-back"}
                    size={25}
                    style={{ marginLeft: 10 }}
                    color={Colors.blue}
                ></Ionicons>
            </TouchableOpacity>
        ),
    }
}