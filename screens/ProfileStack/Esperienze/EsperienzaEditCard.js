import React from 'react'
import { View, StyleSheet } from "react-native"
import { Light, Bold } from '../../../components/StyledText'
import EsperienzaCard from './EsperienzaCard'
import TouchablePen from '../shared/TouchablePen'
import * as WebBrowser from 'expo-web-browser';
import Colors from '../../../constants/Colors'

export default function EsperienzaEditCard({ esperienza, navigation }) {
    const adjustLink = (link) => {
        if (!link.startsWith("http")) {
            return "http://" + link
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.touchablePenContainer}>
                <TouchablePen onPress={() => navigation.navigate("EsperienzeEditScreen", { esperienza })} penStyle={{ marginTop: 15 }} size={20}></TouchablePen>
            </View>
            <View style={styles.innerContainer}>
                <EsperienzaCard noBorder={{ borderBottomColor: "white" }} item={esperienza}></EsperienzaCard>
                <View style={styles.textContainer}>
                    <Light>{esperienza.descrizione}</Light>
                </View>
                {esperienza.link.length > 0 &&
                    <View style={{ marginTop: 10, marginLeft: 6 }}>
                        <Bold onPress={() => WebBrowser.openBrowserAsync(adjustLink(esperienza.link))} style={styles.link}>LINK</Bold>
                    </View>
                }
            </View>
        </View >)
}

const styles = StyleSheet.create({
    container: {
        borderTopColor: "grey",
        borderTopWidth: 0.3
    },
    touchablePenContainer: {
        alignItems: "flex-end"
    },
    innerContainer: {
        margin: 15,
        marginTop: 0
    },
    textContainer: {
        margin: 15,
        marginLeft: 6,
    },
    link: {
        color: Colors.blue,
        fontSize: 12
    }
})