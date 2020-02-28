import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { isSmallDevice } from "../../constants/Layout";
import getHiddenString from "../../functions/getHiddenString";

const authorInfo = () => {
  return (
    <View style={styles.authorInfo}>
      <Text style={styles.authorInfoText}></Text>
    </View>
  );
};

const PostCardPublisher = ({ post }) => {
  const image =
    post.hidden || !post.postedBy.pictureUrl
      ? require("../../../assets/images/placeholder.png")
      : { uri: post.postedBy.pictureUrl };
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image resizeMode="contain" style={styles.image} source={image} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorInfoText}>
            {"" +
              getHiddenString(
                post.hidden,
                post.postedBy.nome,
                post.postedBy.cognome
              )}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1.5,
    marginTop: 5
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  authorInfo: {
    marginTop: 8,
    marginLeft: 4,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  authorInfoText: {
    fontSize: 10,
    color: "#002C3C",
    maxWidth: 60,
    textAlign: "center",
    fontFamily: "Avenir",
    fontWeight: "bold"
  },
  amount: {
    textAlign: "center",
    fontSize: isSmallDevice ? 6 : 6.5,
    margin: 5
  }
});

export default PostCardPublisher;
