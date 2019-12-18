import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Platform, RefreshControl, TouchableOpacity } from 'react-native';
import PostCardEdit from '../../components/PostCard/PostCardEdit';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const posts = gql`
{
  userPosts{
    id
    title
    description
    fields
    comune
    regione
    provincia
    positions{
    id
    description
    requisiti
    field
    }
}
}
`;

export default function UserPosts({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const { loading, error, data, refetch } = useQuery(posts);

    if (loading) return <FindMeSpinner />;
    if (error) return <FindMeGraphQlErrorDisplay />
    if (data) {
        const onRefresh = async () => {
            setRefreshing(true)
            refetch().then(() => setRefreshing(false))
        }

        const renderPosts = () => {
            return data.userPosts.map((post, index) => {
                return (
                    <PostCardEdit
                        navigation={navigation}
                        key={index}
                        bg="#00B6BE"
                        color="white"
                        post={post}
                    />
                );
            });
        };
        return (
            <View style={styles.container}>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {renderPosts()}</ScrollView>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F4F4'
    },
    subContainer: {
        flex: 1,
        flexDirection: "row"
    }
});


UserPosts.navigationOptions = ({ navigation }) => {
    return {
        title: "I miei Post",
        headerStyle: {
            ...Platform.select({
                ios: {
                    shadowColor: "black",
                    shadowOffset: { height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3
                },
                android: {
                    elevation: 20
                },
            })
        },
        headerTitleStyle: {
            fontFamily: "sequel-sans-bold",
            color: Colors.blue,
            fontSize: 12
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Ionicons
                    name={"ios-menu"}
                    size={25}
                    style={{ marginLeft: 10 }}
                    color={Colors.blue}
                ></Ionicons>
            </TouchableOpacity>
        )
    }
}