import React from "react";
import { StyleSheet, View, ScrollView } from "react-native"
import { graphql, createFragmentContainer } from "react-relay";
import FieldIconRound from "../FieldIcons"
import { Tooltip, Text } from 'react-native-elements';

export const Fields = ({ post: { positions } }) => {
    const fields = positions.map((position, index) => {
        return <FieldIconRound available={position.available} color={"#26547C"} key={index} field={position.field} />
    });
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {fields}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
    }
});


export default createFragmentContainer(Fields, {
    post: graphql`
        fragment Fields_post on Post {
            positions{
                available
                  field  
            }
        }
    `,
});
