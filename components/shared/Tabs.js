import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Bold } from '../StyledText';

export default class Tabs extends React.Component {
    state = {
        tab1: true
    }

    tabWrapperStyle = (n) => {
        const { tab1 } = this.state;
        if (tab1 && n == 1 || !tab1 & n == 2) {
            return {
                borderBottomWidth: 1.5,
                borderBottomColor: "#DD1E63",
                marginRight: 10,
                padding: 5
            }
        }
        return {
            marginRight: 10,
            padding: 5
        }
    }

    tabStyle = (n) => {
        const { tab1 } = this.state;
        if (tab1 && n == 1 || !tab1 & n == 2) {
            return {
                fontSize: 18,
                color: "#DE89A8",
            }
        }
        return {
            fontSize: 18,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titlesContainer}>
                    <View>
                        <TouchableOpacity onPress={() => this.setState({ tab1: true })}
                            style={this.tabWrapperStyle(1)}>
                            <Bold style={this.tabStyle(1)}>{this.props.tab1Title}</Bold>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.setState({ tab1: false })}
                            style={this.tabWrapperStyle(2)}>
                            <Bold style={this.tabStyle(2)}>{this.props.tab2Title}</Bold>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    {this.state.tab1 ?
                        this.props.tab1Content()
                        :
                        this.props.tab2Content()
                    }
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginTop: 25
    },
    titlesContainer: {
        flexDirection: "row"
    },
    contentContainer: {
        marginTop: 10
    }
})