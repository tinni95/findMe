import React from "react"
import { TabView, TabBar } from 'react-native-tab-view';
import { StyleSheet, View, Dimensions } from 'react-native';
import Colors from "../constants/Colors";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import { Body } from "../components/StyledText";

export default function TabBars({ routes, renderScene, sent, received }) {
    const [index, setIndex] = React.useState(0);
    const initialLayout = { width: Dimensions.get('window').width };

    renderTabBar = props => {
        if (true) {
            return (<TabBar
                style={{ paddingTop: 5, backgroundColor: '#FFFFFF', elevation: 0, borderColor: '#B9B0B0', borderBottomWidth: 1, height: 60 }}
                renderLabel={({ route, focused }) => (
                    <View style={{ flexDirection: "row" }}>
                        <Body style={{ color: focused ? "black" : "grey", margin: 8 }}>
                            {route.title}
                        </Body>
                        {route.title == "Inviate" ? sent.length > 0 &&
                            <View style={{
                                height: 15, width: 15, borderRadius: 7.5,
                                backgroundColor: Colors.red, alignContent: "center",
                                justifyContent: "center", alignItems: "center"
                            }}>
                                <Body style={{ color: "white", fontSize: 9 }}>
                                    {sent.length}
                                </Body>
                            </View> :
                            received.length > 0 &&
                            <View style={{
                                height: 15, width: 15, borderRadius: 7.5,
                                backgroundColor: Colors.red, alignContent: "center",
                                justifyContent: "center", alignItems: "center"
                            }}>
                                <Body style={{ color: "white", fontSize: 9 }}>
                                    {received.length}
                                </Body>
                            </View>
                        }
                    </View>
                )}
                {...props}
                indicatorStyle={{ backgroundColor: Colors.ocean, height: 2.5, marginBottom: -2 }}
            />
            );
        }
    }
    return (
        <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            inactiveColor={"grey"}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            indicatorStyle={{ backgroundColor: Colors.blue, height: 2 }}
        />
    );



}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});
