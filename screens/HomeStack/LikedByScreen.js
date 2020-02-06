import React from "react";
import { View } from "react-native"
import UserLikeCard from "./components/UserLikeCard";
import HeaderBarComments from "./components/HeaderBarComments";

export default function LikedByScreen({ navigation }) {
    const likes = navigation.getParam("likes")
    return (
        <View style={{ marginTop: 40 }}>
            <HeaderBarComments text={""} navigation={navigation}></HeaderBarComments>
            {likes.map(like => {
                return <UserLikeCard navigation={navigation} user={like.user}></UserLikeCard>
            })}
        </View>)
}