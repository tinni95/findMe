import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RoundFilterItem } from "./RoundFilterItem";
import RoundButton from "../../../../components/shared/RoundButton";
import { Bold, Body } from "../../../../components/StyledText";

export function RoundFilters({ inactive, maximum, settori, addItem, removeItem, settoreAttivi, wrapperStyle, items, hide }) {
    const [hidden, setHidden] = useState(hide)
    const [selected, setSelected] = useState(settoreAttivi);
    useEffect(() => {
        setSelected(settoreAttivi)
    }, [settoreAttivi])

    let filters, active;
    if (maximum == 1) {
        filters = settori.map((settore, index) => {
            active = index === selected
            if (hide && index < 8 || !hide)
                return (
                    <View key={index} style={{ margin: 5 }}>
                        <RoundButton isLight={true} styleProps={{ borderWidth: 0.5, borderColor: "#707070" }}
                            text={settore} textColor={active ? "#FFF" : "#5F5E5E"}
                            color={active ? "#DD1E63" : "#FFF"}
                            onPress={() => {
                                if (!inactive) {
                                    addItem(settore);
                                    setSelected(index)
                                }
                            }} />
                    </View>
                )
        })
    }
    else {
        filters = settori.map((settore, index) => {
            if (hidden && index < 8 || !hidden)
                return (
                    <View key={index} style={{ margin: 5 }}>
                        <RoundFilterItem maximum={maximum} items={items} addItem={addItem} removeItem={removeItem} text={settore} isActive={settoreAttivi.includes(settore) ? true : false} />
                    </View>
                )
            if (hidden && index == 8)
                return (<Body style={{ margin: 5, marginTop: 15 }} onPress={() => setHidden(!hidden)} key={index}>..Altro</Body>)
        }
        )
    }
    return <View style={[styles.wrapper, wrapperStyle]}>{filters}</View>
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
});
