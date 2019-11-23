import React from 'react'
import { Bold, Light } from '../../components/StyledText';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import CustomTooltip from './CustomTooltip';

export default function StepsLabelDefault(props) {
    return props.error ? <StepsLabelError {...props} /> : <StepsLabel {...props} />
}

export const StepsLabelWithHint = (props) => {
    return (
        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
            <StepsLabelDefault error={props.error} text={props.text} />
            {Platform.OS == "web" ?
                <TouchableOpacity onPress={() => alert(props.tooltipText)} style={{ height: 20, width: 20, marginTop: 7.5, marginLeft: 5, borderRadius: 10, backgroundColor: "#EBEBEB", justifyContent: "center", alignItems: "center" }}><Light style={{ fontSize: 14 }}>?</Light></TouchableOpacity>
                :
                <CustomTooltip questionMark={() => <View style={{ height: 20, width: 20, marginTop: 7.5, marginLeft: 5, borderRadius: 10, backgroundColor: "#EBEBEB", justifyContent: "center", alignItems: "center" }}><Light style={{ fontSize: 14 }}>?</Light></View>} tooltipText={props.tooltipText}></CustomTooltip>
            }
        </View>)
}
export const StepsLabel = (props) => {
    return (
        <Bold {...props} style={[styles.textHeading, props.style]}>
            {props.text}
        </Bold>
    )
}

export const StepsLabelError = (props) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <Bold style={[props.style, styles.textHeading, styles.error]}>
                {props.text}
            </Bold>
            <Bold style={[props.style, styles.textHeading, styles.error]}>
                *
    </Bold>
        </View>
    )
}


const styles = StyleSheet.create({
    textHeading: {
        marginLeft: 5,
        marginBottom: 15,
        marginTop: 25,
        color: '#5F5E5E'
    },
    error: {
        color: "#DD1E63"
    }
});