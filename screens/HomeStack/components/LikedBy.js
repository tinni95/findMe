import React from "react"
import { View, Image, TouchableOpacity } from "react-native"
import { Body } from "../../../components/StyledText"

export default function LikedBy({ likes, onPress }) {
    return <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", marginTop: 10, paddingBottom: 10 }}>
        {likes.map((like, index) => {
            image = like.user.pictureUrl ? { uri: like.user.pictureUrl } : require("../../../assets/images/placeholder.png")
            return <View style={{ flexDirection: "row" }}><Image source={image} style={{ alignContent: "center", marginLeft: -4, width: 15, height: 15, borderRadius: 7.5 }} />
                {index == likes.length - 1 && <Body style={{ marginLeft: 5, color: "#707070", fontSize: 11 }}>{like.user.nome} e altri {index} hanno votato</Body>}
            </View>
        })}
    </TouchableOpacity>
}