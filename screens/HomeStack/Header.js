import React from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


export default function Header({ setSearch, search }) {
    return (
        <View style={styles.container}>
            <Searchbar
                style={styles.searchContainer}
                placeholder="Cerca Parola Chiave..."
                onChangeText={text => setSearch(text)}
                value={search}
            />
            <View style={styles.iconContainer}>
                <Ionicons
                    name={"ios-notifications"}
                    size={30}
                    style={{ padding: 5, alignContent: "center", justifyContent: "center" }}
                    color={"#707070"}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
    },
    searchContainer: {
        flex: 10,
        height: 50,
        margin: 10,
    },
    iconContainer: {
        flex: 1,

        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    }
})
