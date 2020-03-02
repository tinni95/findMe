import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { width, isBigDevice, isSmallDevice } from "../../constants/Layout";
import PostCardPublisher from "./PostCardPublisher";
import PostCardText from "./PostCardText";
import RoundButtonEmpty from "../RoundButtonEmpty";
import Colors from "../../constants/Colors";
import PosizioniString from "../../functions/PosizioniString";
import { Bold } from "../StyledText";
import FixOverflow from "../../functions/FixOverflow";

const PosizioniBlock = ({ post }) => {
  return (
    <View style={{ margin: 30 }}>
      <Bold style={{ color: "#AFA9A9", fontSize: 10 }}>Cosa Cerco</Bold>
      <Bold style={styles.postBody}>
        {FixOverflow(PosizioniString(post), 40)}
      </Bold>
    </View>
  );
};

const PostCard = ({ post, onPress, navigation }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.body}>
          <PostCardPublisher navigation={navigation} post={post} />
          <LinearGradient colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />
          <PostCardText post={post} />
        </View>
        {PosizioniBlock({ post })}
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <View style={{ height: 10 }}></View>
            <RoundButtonEmpty
              text="Scopri di più"
              onPress={onPress}
              color={Colors.ocean}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center"
  },
  card: {
    marginBottom: 5,
    paddingBottom: 5,
    width: isBigDevice ? undefined : width,
    backgroundColor: "white"
  },
  body: {
    flex: 7,
    flexDirection: "row"
  },
  footer: {
    flex: 3,
    flexDirection: "row"
  },
  buttonContainer: {
    alignItems: "center",
    margin: 5,
    marginRight: 20,
    marginBottom: 5,
    flex: 6
  },
  line: {
    flex: 0.01,
    backgroundColor: "black"
  },
  postBody: {
    fontSize: 10,
    marginTop: isSmallDevice ? 5 : 8,
    color: "#002C3C"
  }
});

export default PostCard;
