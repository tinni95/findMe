import React from "react";
import { StyleSheet, View } from "react-native";
import LocationWithText from "../LocationWithText";
import { Bold, Body } from "../StyledText";
import { isSmallDevice } from "../../constants/Layout";
import FixOverflow from "../../functions/FixOverflow";
import getAge from "../../functions/getAge";
import Colors from "../../constants/Colors";
import PostCardPublisher from "./PostCardPublisher";
import { LinearGradient } from "expo-linear-gradient";

const MainTextFreelancer = ({ data, durata, compenso }) => {
  return (
    <View>
      <View style={styles.mainTextContainer}>
        <View style={styles.mainTextColumn}>
          <Bold style={styles.columnHeader}>Data</Bold>
          <Bold style={styles.columnBody}>{data}</Bold>
        </View>
        <View style={styles.mainTextColumn}>
          <Bold style={styles.columnHeader}>Compenso</Bold>
          <Bold style={styles.columnBody}>{compenso}</Bold>
        </View>
        <View style={styles.mainTextColumn}>
          <Bold style={styles.columnHeader}>Durata</Bold>
          <Bold style={styles.columnBody}>{durata}</Bold>
        </View>
      </View>
    </View>
  );
};

const MainText = ({ descrizione, settori, type, postedBy: { DoB } }) => {
  return (
    <View>
      <View style={styles.mainTextContainer}>
        <View style={styles.mainTextColumn}>
          <Bold style={styles.columnHeader}>Settore Progetto</Bold>
          <Bold style={styles.columnBody}>{FixOverflow(settori, 20)}</Bold>
        </View>
        <View style={styles.mainTextColumn}>
          <Bold style={styles.columnHeader}>Tipo</Bold>
          <Bold style={styles.columnBody}>{type}</Bold>
        </View>
      </View>
    </View>
  );
};

const PostCardText = ({ post, navigation }) => {
  return (
    <View>
      <View style={styles.body}>
        <PostCardPublisher navigation={navigation} post={post} />
        <LinearGradient colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />
        <View style={styles.container}>
          <Bold style={styles.title}>{FixOverflow(post.titolo, 50)}</Bold>
          <LocationWithText
            comune={post.comune}
            regione={post.regione}
            color="#AFA9A9"
          />
        </View>
      </View>
      {!post.compenso && MainText(post)}
      {post.compenso && MainTextFreelancer(post)}
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flex: 0.01,
    backgroundColor: "black"
  },
  body: {
    flex: 7,
    flexDirection: "row"
  },
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
    fontSize: 13,
    color: Colors.ocean
  },
  columnBody: {
    fontSize: 13,
    marginTop: isSmallDevice ? 5 : 8,
    color: "#002C3C"
  },
  content: {
    flex: 9
  }
});

export default PostCardText;
