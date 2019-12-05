import React, { useState, useEffect, useRef } from 'react'
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
import RoundButton from '../../components/shared/RoundButtonSignUpScreen'


const UPDATEUSER_MUTATION = gql`
mutation updateUser($email: String, $password: String,$nome: String, $cognome: String, $locationString:String,$picture:Upload,$presentazione:String, $DoB:String) {
        updateUser(email: $email, password:$password, nome:$nome,cognome:$cognome,locationString:$locationString,picture:$picture,presentazione:$presentazione, DoB:$DoB) {
        pictureUrl
    }
}`;


export default function UserInfo({ navigation, screenProps }) {
    //passedLocation (autocomplete)
    const passedLocation = navigation.getParam("location") || ""

    //hooks
    const currentUser = screenProps.currentUser ? screenProps.currentUser : navigation.getParam("currentUser")
    console.log(navigation.getParam("currentUser"))
    const [zoom, setZoom] = useState(false)
    const [visibleDate, setVisibleDate] = useState(false)
    const [nome, setNome] = useState(currentUser.nome)
    const [nomeError, setNomeError] = useState(false)
    const [cognome, setCognome] = useState(currentUser.cognome)
    const [cognomeError, setCognomeError] = useState(false)
    const [DoB, setDoB] = useState(currentUser.DoB ? currentUser.DoB : "")
    const [DoBError, setDoBError] = useState(false)
    const [location, setLocation] = useState(currentUser.locationString ? currentUser.locationString : "")
    const [locationError, setLocationError] = useState(false)
    const [presentazione, setPresentazione] = useState(currentUser.presentazione ? currentUser.presentazione : "")
    const [presentazioneError, setPresentazioneError] = useState(false)
    //useEffect
    useEffect(() => {
        passedLocation ? setLocation(passedLocation) : null
    })

    let scrollview = useRef();

    const [updateUser] = useMutation(UPDATEUSER_MUTATION,
        {
            onCompleted: async ({ updateUser }) => {
                currentUser.presentazione ? navigation.navigate("ProfilePage", { refetch: true }) : navigation.navigate("LinksScreen")
            }
        });

    const _handleDatePicked = (dates) => {
        console.log('A date has been picked: ', dates);
        setVisibleDate(false)
        setDoB(moment(dates).format("DD-MM-YYYY"))
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
        console.log("yo");
        await getPermissionAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        console.log("result", result.uri);
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
        if (location.length === 0) {
            setLocationError(true);
        }
        else {
            setLocationError(false)
        }
        if (presentazione.length === 0) {
            setPresentazioneError(true);
        }
        else {
            setPresentazioneError(false)
        }
        if (image == initialString) {
            return alert("image not selected")
        }
        if (nome.length > 0 && cognome.length > 0 && DoB.length > 0 && location.length > 0 && presentazione.length > 0 && image != initialString) {
            submit()
        }
    }

    const submit = () => {
        const file = new ReactNativeFile({
            uri: image,
            name: currentUser.email + ".jpg",
            type: 'image/jpeg',

        })
        updateUser({ variables: { picture: file, DoB, nome, cognome, presentazione, locationString: location } })
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
        <View style={{ flex: 8 }}>
            <KeyboardAwareScrollView
                ref={scrollview}
                contentContainerStyle={{ margin: 30 }}>
                {!zoom &&
                    <View>
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
                                onSubmitEditing={() => cognomeInput.current.focus()}
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
                        <StepsLabel error={DoBError} text={"Data Di Nascita"} />
                        <WithErrorString
                            error={DoBError}
                            errorText={"Campo Obbligatorio"}>
                            <TouchableOpacity
                                onPress={() => setVisibleDate(true)}>
                                <FormTextInput
                                    pointerEvents="none"
                                    editable={false}
                                    value={DoB}
                                    style={cognomeError ? FormStyles.inputError : FormStyles.input}
                                />
                            </TouchableOpacity>
                        </WithErrorString>
                        <StepsLabel error={locationError} text={"Città"} />
                        <WithErrorString
                            errorText="Campo Obbligatorio"
                            error={locationError}
                        >
                            <FormTextInput
                                style={locationError ? FormStyles.inputError : FormStyles.input}
                                value={location}
                                onFocus={() => navigation.navigate("AutoCompleteLocation", { path: "UserInfo" })}
                            />
                        </WithErrorString>
                    </View>
                }
                <StepsLabelWithHint error={presentazioneError}
                    tooltipText={"Scrivi una biografia che ti serve a descriverti, per aiutare agli altri utenti a capire se sei fatto per la loro attività"}
                    text={"Presentazione"} />
                <FormTextInput
                    large="true"
                    multiline
                    numberOfLines={4}
                    onChangeText={val => setPresentazione(val)}
                    onFocus={() => setZoom(true)}
                    onEndEditing={() => setZoom(false)}
                    textAlignVertical={"top"}
                    style={zoom ? FormStyles.xlarge : FormStyles.large}
                    value={presentazione}
                />
                {zoom && <RoundButton onPress={() => setZoom(false)} color={Colors.red} text={"OK"} textColor={"white"} />}
                <DateTimePicker isVisible={visibleDate} onConfirm={_handleDatePicked} onCancel={() => setVisibleDate(false)} maximumDate={new Date()} />
                <View style={{ height: 50 }}></View>
            </KeyboardAwareScrollView>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flex: 1.5,
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