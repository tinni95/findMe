import React from "react"
import { View, TouchableOpacity } from "react-native"
import Colors from "../../../constants/Colors"
import UnTouchablePen from "../shared/UnTouchablePen"
import { Body } from "../../../components/StyledText"
import RoundButtonEmpty2 from "../../../components/shared/RoundButtonEmpty2"
var shortid = require("shortid")

export default function CompetenzeBlock({ competenze, onPress }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Body style={{ color: Colors.blue }}>Competenze</Body>
                <UnTouchablePen size={15}></UnTouchablePen>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
                {competenze.map(competenza => {
                    return <RoundButtonEmpty2 key={shortid.generate()} buttonStyle={{ margin: 5 }} isLight={true} text={competenza} textColor={Colors.blue} color={Colors.blue}></RoundButtonEmpty2 >
                })}
            </View>
        </View>
    )
}