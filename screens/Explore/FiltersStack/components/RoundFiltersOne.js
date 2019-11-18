import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RoundFilterItem } from "./RoundFilterItem";
import RoundButton from "../../../../components/shared/RoundButton";

export default function RoundFiltersOne({ inactive, settori, setItem, settoreAttivi, wrapperStyle }) {
    const [selected, setSelected] = useState(settoreAttivi);
    useEffect(() => {
        setSelected(settoreAttivi)
    }, [settoreAttivi])

    let filters, active;
    filters = settori.map((settore, index) => {
        active = index === selected
        return (
            <View key={index} style={{ margin: 5 }}>
                <RoundButton isLight={true} styleProps={{ borderWidth: 0.5, borderColor: "#707070" }}
                    text={settore} textColor={active ? "#FFF" : "#5F5E5E"}
                    color={active ? "#DD1E63" : "#FFF"}
                    onPress={() => {
                        if (!inactive) {
                            setItem(settore);
                            setSelected(index)
                        }
                    }} />
            </View>
        )
    })
    return <View style={[styles.wrapper, wrapperStyle]}>{filters}</View>
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
});
