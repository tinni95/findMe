import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ScrollView, StyleSheet, View, Image, Platform } from "react-native"
import Colors from '../../constants/Colors'
import { width } from '../../constants/Layout'
import { Bold } from '../../components/StyledText'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FormTextInput from "../shared/Form/FormTextInput";
import WithErrorString from "../shared/Form/WithErrorString";
import StepsLabel, { StepsLabelWithHint } from "../shared/StepsLabel";
import { FormStyles } from '../shared/Form/FormStyles'
const { ReactNativeFile } = require('apollo-upload-client')
import moment from "moment";
import DateTimePicker from 'react-native-modal-datetime-picker';


const UPDATEUSER_MUTATION = gql`
mutation updateUser($email: String, $password: String,$nome: String, $cognome: String, $locationString:String,$picture:Upload,$presentazione:String, $DoB:DateTime) {
        updateUser(email: $email, password:$password, nome:$nome,cognome:$cognome,locationString:$locationString,picture:$picture,presentazione:$presentazione, DoB:$DoB) {
        pictureUrl
    }
}`;

export default function UserInfo({ navigation, screenProps }) {
    const [visibleDate, setVisibleDate] = useState(false)
    const [nome, setNome] = useState(screenProps.currentUser.nome)
    const [nomeError, setNomeError] = useState(false)
    const [cognome, setCognome] = useState(screenProps.currentUser.cognome)
    const [cognomeError, setCognomeError] = useState(false)
    const [DoB, setDoB] = useState("")
    const [DoBError, setDoBError] = useState(false)
    const [location, setLocation] = useState("")
    const [locationError, setLocationError] = useState(false)
    const [presentazione, setPresentazione] = useState("")
    const [presentazioneError, setPresentazioneError] = useState(false)

    const [updateUser] = useMutation(UPDATEUSER_MUTATION,
        {
            onCompleted: async ({ updateUser }) => {
                navigation.navigate("LinksScreen")
            }
        });

    const _handleDatePicked = (dates) => {
        console.log('A date has been picked: ', dates);
        setVisibleDate(false)
        setDoB(moment(dates).format("YYYY-MM-DD"))
    };

    const getPermissionAsync = async () => {
        if (Platform.OS == "ios") {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const PickImage = async () => {
        await getPermissionAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        console.log(result.uri);
        if (!result.cancelled) {
            setImage(result.uri)
        }
    };

    const handlePress = () => {
        if (nome.length === 0) {
            setNomeError(true);
        }
        else {
            setNomeError(false)
        }
        if (cognome.length === 0) {
            setCognomeError(true);
        }
        else {
            setCognomeError(false)
        }
        if (DoB.length === 0) {
            setDoBError(true);
        }
        else {
            setDoBError(false)
        }
        if (image == initialString) {
            return alert("image not selected")
        }
        if (nome.length > 0 && cognome.length > 0) {
            submit()
        }
    }

    const submit = () => {
        const file = new ReactNativeFile({
            uri: image,
            name: screenProps.email + ".jpg",
            type: 'image/jpeg',
            base64: true
        })
        updateUser({ variables: { picture: file } })
    }

    const initialString = "http://hwattsup.website/AppBackEnd/images/placeholder.jpeg"
    const [image, setImage] = useState(initialString);
    const pen = require("../../assets/images/pen.png")

    return <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => handlePress()} style={styles.button}>
                <Bold style={{ color: "white" }}>Salva</Bold>
            </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView contentContainerStyle={{ margin: 30 }}>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => PickImage()}>
                    <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    <View style={styles.penWrapper}>
                        <Image source={pen} style={{ width: 20, height: 20 }} />
                    </View>
                </TouchableOpacity>
            </View>
            <StepsLabel error={nomeError} text={"Nome"} />
            <WithErrorString
                error={nomeError}
                errorText={"Campo Obbligatorio"}>
                <FormTextInput
                    placeholder={"Nome"}
                    onChangeText={val => setNome(val)}
                    value={nome}
                    style={nomeError ? FormStyles.inputError : FormStyles.input}
                />
            </WithErrorString>
            <StepsLabel error={cognomeError} text={"Cognome"} />
            <WithErrorString
                error={cognomeError}
                errorText={"Campo Obbligatorio"}>
                <FormTextInput
                    placeholder={"Cognome"}
                    onChangeText={val => setCognome(val)}
                    value={cognome}
                    style={cognomeError ? FormStyles.inputError : FormStyles.input}
                />
            </WithErrorString>
            <StepsLabel error={cognomeError} text={"Data Di Nascita"} />
            <WithErrorString
                error={DoBError}
                errorText={"Campo Obbligatorio"}>
                <TouchableOpacity onPress={() => setVisibleDate(true)}>
                    <FormTextInput
                        pointerEvents="none"
                        editable={false}
                        value={DoB}
                        style={cognomeError ? FormStyles.inputError : FormStyles.input}
                    />
                </TouchableOpacity>
            </WithErrorString>
            <DateTimePicker isVisible={visibleDate} onConfirm={_handleDatePicked} onCancel={() => setVisibleDate(false)} maximumDate={new Date()} />
        </KeyboardAwareScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        height: 100,
        backgroundColor: Colors.blue,
        width: width,
        alignItems: "flex-end",
        justifyContent: "center"
    },
    button: {
        margin: 20
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center', justifyContent: 'center'
    },
    penWrapper: {
        backgroundColor: "white",
        alignSelf: "flex-end",
        marginTop: -30,
        marginRight: 5,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOpacity: 0.2,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            },
            web: {
                shadowColor: "black",
                shadowOpacity: 0.2,
                shadowRadius: 3
            },
        }),
        padding: 7.5,
        borderRadius: 25
    }
})