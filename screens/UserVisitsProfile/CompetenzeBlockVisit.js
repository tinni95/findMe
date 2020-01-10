import React from "react"
import { View } from "react-native"
import { Body } from "../../components/StyledText"
import RoundButtonEmpty2 from "../../components/shared/RoundButtonEmpty2"
import Colors from "../../constants/Colors"

var shortid = require("shortid")

export default function CompetenzeBlockVisit({ competenze }) {
    return (
        <View>
            <View>
                <Body style={{ color: Colors.blue }}>Competenze</Body>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
                {competenze.map(competenza => {
                    return <RoundButtonEmpty2 key={shortid.generate()} buttonStyle={{ margin: 5 }} isLight={true} text={competenza} textColor={Colors.blue} color={Colors.blue}></RoundButtonEmpty2 >
                })}
            </View>
        </View>
    )
}