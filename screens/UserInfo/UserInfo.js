import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Image, Platform } from "react-native"
import Colors from '../../constants/Colors'
import { width } from '../../constants/Layout'
import { Bold } from '../../components/StyledText'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
const { ReactNativeFile } = require('apollo-upload-client')
import { Linking } from 'expo';


const UPDATEUSER_MUTATION = gql`
mutation updateUser($email: String, $password: String,$nome: String, $cognome: String, $locationString:String,$picture:Upload,$presentazione:String, $DoB:DateTime) {
        updateUser(email: $email, password:$password, nome:$nome,cognome:$cognome,locationString:$locationString,picture:$picture,presentazione:$presentazione, DoB:$DoB) {
        pictureUrl
    }
}`;

export default function UserInfo({ navigation }) {

    const [
        updateUser,
        { loading: mutationLoading, error: mutationError, error, data },
    ] = useMutation(UPDATEUSER_MUTATION,
        {
            onCompleted: async ({ updateUser }) => {
                console.log(updateUser)
            }
        });

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
            quality: 1
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri)
        }
    };

    const uploadImage = () => {
        if (image == initialString) {
            return alert("image not selected")
        }
        const file = new ReactNativeFile({
            uri: image,
            name: navigation.getParam("email") + ".jpg",
            type: 'image/jpeg'
        })
        updateUser({ variables: { picture: file } })
    }

    const initialString = "http://hwattsup.website/AppBackEnd/images/placeholder.jpeg"
    const [image, setImage] = useState(initialString);
    const pen = require("../../assets/images/pen.png")
    return <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => uploadImage()} style={styles.button}>
                <Bold style={{ color: "white" }}>Salva</Bold>
            </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => PickImage()}>
                <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 75 }} />
                <View style={styles.penWrapper}>
                    <Image source={pen} style={{ width: 30, height: 30 }} />
                </View>
            </TouchableOpacity>
        </View>
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