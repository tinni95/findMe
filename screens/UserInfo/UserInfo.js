import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image, Platform } from "react-native"
import Colors from '../../constants/Colors'
import { width } from '../../constants/Layout'
import { Bold } from '../../components/StyledText'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function UserInfo() {
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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri)
        }
    };

    const [image, setImage] = useState("http://hwattsup.website/AppBackEnd/images/placeholder.jpeg");
    const pen = require("../../assets/images/pen.png")
    return <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.button}>
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