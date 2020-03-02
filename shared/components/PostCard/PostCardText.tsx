import React from "react";
import { StyleSheet, View } from "react-native";
import LocationWithText from "../LocationWithText";
import { Bold, Body } from "../StyledText";
import { isSmallDevice } from "../../constants/Layout";
import FixOverflow from "../../functions/FixOverflow";
import getAge from "../../functions/getAge";

const MainText = ({ settori, postedBy: { DoB } }) => {
  return (
    <View style={styles.mainTextContainer}>
      <View style={styles.mainTextColumn}>
        <Bold style={styles.columnHeader}>Settore</Bold>
        <Bold style={styles.columnBody}>{FixOverflow(settori, 20)}</Bold>
      </View>
      <View style={styles.mainTextColumn}>
        <Bold style={styles.columnHeader}>Età</Bold>
        <Bold style={styles.columnBody}>{DoB ? getAge(DoB) : "N.S."}</Bold>
      </View>
    </View>
  );
};

const PostCardText = ({ post }) => {
  return (
    <View style={styles.container}>
      <Bold style={styles.title}>{FixOverflow(post.titolo, 50)}</Bold>
      <LocationWithText
        comune={post.comune}
        regione={post.regione}
        color="#AFA9A9"
      />
      {MainText(post)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 4,
    margin: 5,
    marginLeft: 10
  },
  title: {
    fontSize: isSmallDevice ? 16 : 18
  },
  mainTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between"
  },
  mainTextColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  columnHeader: {
    fontSize: 7,
    color: "#ADADAD"
  },
  columnBody: {
    fontSize: 10,
    marginTop: isSmallDevice ? 5 : 8,
    color: "#002C3C"
  },
  content: {
    flex: 9
  }
});

export default PostCardText;
