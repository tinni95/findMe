import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RoundFilterItem } from "./RoundFilterItem";
import RoundButton from "../../../../components/shared/RoundButton";

export function RoundFilters({ maximum, settori, addItem, removeItem, settoreAttivi, wrapperStyle, items, reset }) {

    const [selected, setSelected] = useState(settoreAttivi);
    useEffect(() => {
        if (reset != null) {
            setSelected(-1)
            console.log("bastard")
        }
    }, [reset])
    let filters, active;
    if (maximum == 1) {
        filters = settori.map((settore, index) => {
            active = index === selected
            return (
                <View key={index} style={{ margin: 5 }}>
                    <RoundButton styleProps={{ borderWidth: 0.5, borderColor: "#707070" }}
                        text={settore} textColor={active ? "#FFF" : "#5F5E5E"}
                        color={active ? "#DD1E63" : "#FFF"}
                        onPress={() => {
                            addItem(settore);
                            setSelected(index)
                        }} />
                </View>
            )
        })
    }
    else {
        filters = settori.map((settore, index) => {
            return (
                <View key={index} style={{ margin: 5 }}>
                    <RoundFilterItem maximum={maximum} items={items} addItem={addItem} removeItem={removeItem} text={settore} isActive={settoreAttivi.includes(settore) ? true : false} />
                </View>
            )
        })
    }
    return <View style={[styles.wrapper, wrapperStyle]}>{filters}</View>
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
});
