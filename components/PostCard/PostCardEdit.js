import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { width, isBigDevice } from '../../constants/Layout';
import { PostCardPublisher } from './PostCardPublisher';
import { PostCardText } from './PostCardText';
import { Fields } from './Fields';
import RoundButtonEmpty2 from '../shared/RoundButtonEmpty2';
import Colors from "../../constants/Colors"
import { Ionicons } from '@expo/vector-icons';

export default PostCardEdit = ({ post, navigation }) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                <View style={styles.body}>
                    <PostCardPublisher post={post} />
                    <LinearGradient colors={['#EBEBEB', '#FFFDFD']} style={styles.line} />
                    <PostCardText post={post} />
                    <TouchableOpacity onPress={() => { }} style={styles.trash}>
                        <Ionicons
                            name={"ios-trash"}
                            size={25}
                            style={{ padding: 5 }}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Fields post={post} />
                    <View style={styles.buttonContainer}>
                        <View style={{ height: 10 }}></View>
                        <RoundButtonEmpty2
                            buttonStyle={{ paddingLeft: 10, paddingRight: 10 }}
                            textColor={Colors.red}
                            fontSize={10}
                            text="Apri"
                            isLight
                            onPress={() =>
                                navigation.navigate('PostScreenQueryRenderer', {
                                    id: post.id
                                })
                            }
                            color={Colors.red}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
    },
    card: {
        height: isBigDevice ? 250 : 200,
        marginBottom: 5,
        paddingBottom: 5,
        width: isBigDevice ? undefined : width,
        backgroundColor: 'white',
    },
    body: {
        flex: 7,
        flexDirection: 'row'
    },
    footer: {
        flex: 3,
        flexDirection: 'row'
    },
    buttonContainer: {
        alignItems: "center",
        margin: 5,
        flex: 6
    },
    line: {
        flex: 0.01,
        backgroundColor: 'black'
    },
    trash: {
        alignItems: "center",
        backgroundColor: "#DD1E63",
        width: 35,
        height: 35,
        margin: 5,
        borderRadius: 15
    },
});

