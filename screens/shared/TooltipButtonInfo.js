import React from 'react'
import { View, StyleSheet, Platform } from "react-native"
import { Tooltip } from "react-native-elements";
import { Light, Body } from '../../components/StyledText';

export default function TooltipButtonInfo({ text }) {
    return <Tooltip containerStyle={styles.container} backgroundColor={"white"} popover={<Light>{text}</Light>}><View style={{ backgroundColor: "#EBEBEB", width: 30, heigh: 30, borderRadius: 15 }}><Light>?</Light></View></Tooltip>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 5
            },
            web: {
                borderBottomColor: '#EBEBEB',
                borderBottomWidth: 4,
            }
        })
    },
})