import React from "react"
import { View, TouchableOpacity } from "react-native"
import Colors from "../../../constants/Colors"
import UnTouchablePen from "../shared/UnTouchablePen"
import { Body } from "../../../components/StyledText"
import RoundButton from "../../../components/shared/RoundButton"
var shortid = require("shortid")

export default function CompetenzeBlock({ competenze, onPress }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Body style={{ color: Colors.blue }}>Competenze</Body>
                <UnTouchablePen size={15}></UnTouchablePen>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                {competenze.map(competenza => {
                    return <RoundButton key={shortid.generate()} style={{ margin: 5 }} isLight={true} text={competenza} textColor={"white"} color={Colors.blue}></RoundButton>
                })}
            </View>
        </View>
    )
}