import React, { useState } from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { width } from "../../constants/Layout";
import StepIndicator from 'react-native-step-indicator';

const labels = ["Cart", "Delivery Address", "Order Summary", "Payment Method", "Track"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
}
const onPageChange = (setCurrentPosition, currentPosition) => {
    setCurrentPosition(currentPosition);
}

export default InsertSecondScreen = ({ navigation: { navigate } }) => {
    const [currentPosition, setCurrentPosition] = useState(0);

    return (
        <View style={styles.container}>
            <StepIndicator
                currentPosition={currentPosition}
                labels={labels}
            />
            <Image
                style={styles.header}
                source={require('../../assets/images/header.png')}
                resizeMode="contain"
            />
        </View>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBEBEB"
    },
    header: {
        flex: 1,
        height: 5,
        width
    },
    button: {
        flex: 1,
        alignItems: "center"
    }
})