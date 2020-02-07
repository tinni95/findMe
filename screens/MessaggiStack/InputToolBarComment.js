import React, { useState, useEffect } from "react"
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Bold, Body, Light } from "../../components/StyledText"
import Colors from "../../constants/Colors"
import { gql } from "apollo-boost"
import { useMutation } from "react-apollo"

const CREATECOMMENT_MUTATION = gql`
mutation createComment($text:String!,$answerId:ID!){
    createComment(text:$text, answerId:$answerId){
        text
    }
}
`

const CREATESUBCOMMENT_MUTATION = gql`
mutation createSubComment($text:String!,$commentId:ID!){
    createSubComment(text:$text, commentId:$commentId){
        text
    }
}
`

export default function InputToolbarComment({ answerId, refetch, comment, refer, image, viewStyle }) {
    const [text, setText] = useState("")
    const [displaydText, setDisplay] = useState("")
    const [subComment, setSubComment] = useState()
    const [createComment] = useMutation(CREATECOMMENT_MUTATION,
        {
            onCompleted: async ({ createAnswer }) => {
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });
    const [createSubComment] = useMutation(CREATESUBCOMMENT_MUTATION,
        {
            onCompleted: async ({ createAnswer }) => {
                refetch()
            },
            onError: error => {
                alert("Qualcosa è andato storto")
            }
        });
    useEffect(() => {
        setSubComment(comment)
    }, [comment])

    const onSend = () => {
        if (subComment) {
            text.length > 0 && createSubComment({ variables: { text, commentId: subComment.id } })
            setText("");
            setDisplay("");
            setSubComment(null)
        }
        else {
            text.length > 0 && createComment({ variables: { text, answerId } })
            setText("");
            setDisplay("");
        }

    }

    return (
        <View style={styles.wrapper}>
            {subComment ? <TouchableOpacity onPress={() => setSubComment(null)} style={styles.subComment}>
                <Ionicons
                    style={{ marginLeft: 5, marginRight: 5, marginTop: 2 }}
                    name={"md-close-circle-outline"}
                    size={15}
                    color={Colors.blue} />
                <Light>Rispondendo a {subComment.postedBy.nome}</Light></TouchableOpacity> : null}
            <View style={[styles.container, viewStyle]}>
                <View style={styles.imageContainer}>
                    <Image source={image.uri ? image : require("../../assets/images/placeholder.png")} style={styles.image} />
                </View>
                <TextInput
                    ref={refer}
                    value={displaydText} onChangeText={val => {
                        setText(val)
                        setDisplay(val)
                    }} placeholder={"Scrivi Messaggio"} placeholderTextColor={"#818181"} multiline
                    style={styles.textInput}
                    onFocus={() => {
                        setDisplay(text)
                    }}
                    onEndEditing={() => {
                        setSubComment(null)
                        if (text.includes("\n")) {
                            setDisplay("..." + text.replace(/\n/g, "").substring(text.length - 3, text.length))
                        }
                    }}
                >
                </TextInput>
                <TouchableOpacity
                    onPress={() => {
                        onSend();
                    }} style={styles.imageContainer}>
                    <Ionicons name={"ios-send"} size={28} ></Ionicons>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    subComment: {
        flexDirection: "row",
        padding: 5,
        margin: 5,
        alignSelf: 'baseline',
        backgroundColor: "#F5F5F5",
        borderRadius: 3
    },
    wrapper: {
        paddingTop: 5,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: -5
            }
        })
    },
    textInput: {
        maxHeight: 60,
        flex: 7,
        backgroundColor: "#F5F5F5",
        borderRadius: 5,
        padding: 5,
        fontFamily: "sequel-sans-light"
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 17.5
    },
    imageContainer: {
        flex: 1.5,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    }
})