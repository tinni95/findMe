import React from 'react';
import { View, StyleSheet } from 'react-native';
import { isSmallDevice } from '../../../constants/Layout';
import CheckBox from 'react-native-check-box'
import HeaderLeft from '../../../components/HeaderLeft';
import { Bold, Body, Light } from '../../../components/StyledText';
import Colors from '../../../constants/Colors';
import RoundButton from '../../../components/shared/RoundButton';
import { useState } from 'react';

export default function PrivacyPage({ navigation }) {
    const { user } = navigation.state.params;
    const [checked, setChecked] = useState(false)

    const login = () => {
        if (checked) {
            console.log(user)
        }
    }

    return (
        <View style={styles.container}>
            <Bold style={styles.terms}>Termini</Bold>
            <Bold style={styles.subTerms}>Dichiarazione esplicita di Accettazione dei termini e Condizioni</Bold>
            <Body style={styles.descTerms}>
                Cliccando su “accetto” dichiari di accettare
                i
                <Bold style={styles.redTerms}> Termini e condizioni d’uso</Bold>,
                E ci consenti all’uso dei tuoi dati come
                Descritto nella  <Bold style={styles.redTerms}>Privacy Policy</Bold>
            </Body>
            <View style={styles.buttonsContainer}>
                <View style={styles.checkBoxWrapper}>
                    <CheckBox
                        isChecked={checked}
                        onClick={() => setChecked(!checked)}
                        checkBoxColor={Colors.blue}
                    ></CheckBox>
                    <Light style={{ margin: 5 }}>
                        <Light >Accetto i</Light>
                        <Light style={{ color: Colors.blue }}> Termini e Condizioni</Light>
                    </Light>
                </View>
                <RoundButton onPress={() => login()} text={"Accetto"} color={Colors.red} textColor={"white"}></RoundButton>
            </View>
        </View>
    );
}


PrivacyPage.navigationOptions = ({ navigation }) => {
    return {
        headerLeft:
            (<HeaderLeft navigation={navigation} />
            )
    }
}

const styles = StyleSheet.create({
    checkBoxWrapper: { marginBottom: 20, marginTop: 40, flexDirection: "row", alignItems: "center", justifyContent: "center" },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    terms: {
        marginTop: 20,
        fontSize: 30,
        marginBottom: 10
    },
    descTerms: {
        marginLeft: 5,
        fontSize: 14,
        lineHeight: 29,
    },
    subTerms: {
        marginLeft: 5,
        fontSize: 14,
        lineHeight: 29,
        marginBottom: 40
    },
    redTerms: {
        fontSize: 14,
        color: Colors.red,
        lineHeight: 29,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
    header: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20
    },
    formContainer: {
        margin: 30,
        marginTop: isSmallDevice ? 20 : 40,
        justifyContent: 'center'
    },
    buttonsContainer: {
        flex: isSmallDevice ? 10 : 7.5,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    spacer: { height: 20 }
});
