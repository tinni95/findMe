import React from "react";
import { Text, StyleSheet, Image, View, Platform } from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { isSmallDevice } from "../../constants/Layout";
import PostScreenHeader from "../../components/PostScreenHeader";
import { Bold, Light } from "../../components/StyledText";
import LocationWithText from "../../components/shared/LocationWithText";
import Tabs from "../../components/shared/Tabs";
import PositionCard from "../../components/PositionCard";

export default class PostScreen extends React.Component {

    positionCards = () => {
        return this.props.post.positions
            .map((position, index) => {
                return <PositionCard navigation={this.props.navigation} key={index} position={position} />
            });
    }

    render() {
        return (
            <ParallaxScrollView
                style={styles.parallaxScrollView}
                showsVerticalScrollIndicator={false}
                parallaxHeaderHeight={150}
                renderBackground={() => (
                    <Image resizeMode={"contain"} source={require("../../assets/images/postHeader.png")}></Image>
                )}
                renderForeground={() => (
                    <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <PostScreenHeader name={"Giovanni D'Amico"} image={require("../../assets/images/placeholder.png")} />
                    </View>
                )}>
                <View style={styles.contentContainer}>
                    <Bold style={styles.title}>{this.props.post.title}</Bold>
                    <LocationWithText points={25} fontSize={isSmallDevice ? 18 : 20} style={styles.location} regione={this.props.post.regione} comune={this.props.post.comune}></LocationWithText>
                    <Tabs style={{ marginLeft: 5 }} tab1Title={"Desrizione"} tab2Title={"Team"}
                        tab1Content={() => <View style={styles.tabContainer}><Light style={styles.body}>{this.props.post.description}</Light></View>}
                        tab2Content={() => <View style={styles.tabContainer}><Light style={styles.body}>blabllallal</Light></View>}></Tabs>
                </View>
                {this.positionCards()}
            </ParallaxScrollView>
        )
    }
}

const styles = StyleSheet.create({
    parallaxScrollView: {
        flex: 1,
        backgroundColor: "#1393F2"
    },
    image: {
        width: 200
    },
    title: {
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        fontSize: isSmallDevice ? 22 : 26
    },
    location: {
        marginLeft: 5,
        marginTop: isSmallDevice ? 10 : 15
    },
    body: {
        fontSize: isSmallDevice ? 14 : 18
    },
    tabContainer: {
        marginBottom: 20,
    },
    contentContainer: {
        marginTop: 5,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
    }
})

PostScreen.navigationOptions = {
    header: "hello",
};