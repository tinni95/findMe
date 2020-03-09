import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { Body, Bold } from "./StyledText";
import Colors from "../constants/Colors";
import { width } from "../constants/Layout";
import RoundButton from "./RoundButton";

const APPLICATIONS_FOR_POST = gql`
  query applicationsForPosition($postId: ID!) {
    applicationsForPosition(postId: $postId) {
      id
      from {
        pictureUrl
      }
      post {
        titolo
      }
    }
  }
`;

const getUri = uri => {
  if (uri) return { uri };
  else {
    return require("../../assets/images/placeholder.png");
  }
};

export default function PostApplicationCard({ id }) {
  const { data, loading } = useQuery(APPLICATIONS_FOR_POST, {
    variables: { postId: id },
    onCompleted: ({ applicationsForPosition }) => {
      console.log(applicationsForPosition);
    }
  });

  if (loading) {
    return <Image source={require("../../assets/images/shimmer.gif")}></Image>;
  } else if (data.applicationsForPosition.length == 0) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Bold style={styles.header}>
          {data.applicationsForPosition[0].post.titolo}
        </Bold>
        <Bold style={styles.subHeader}>
          {data.applicationsForPosition.length} risposte
        </Bold>
        <View style={styles.images}>
          {data.applicationsForPosition.map((post, index) => {
            if (index < 4) {
              return (
                <Image
                  key={post.id}
                  style={styles.image}
                  source={getUri(post.from.pictureUrl)}
                ></Image>
              );
            }
          })}
        </View>
        <RoundButton
          buttonStyle={{ margin: 10 }}
          color={Colors.ocean}
          text={"Vedi Risposte"}
          textColor={"white"}
        ></RoundButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "white",
    alignSelf: "baseline",
    alignItems: "center",
    width: width
  },
  header: {
    margin: 5,
    alignSelf: "center",
    fontSize: 24
  },
  subHeader: {
    margin: 5,
    alignSelf: "center",
    color: Colors.blue,
    fontSize: 18
  },
  images: {
    margin: 5,
    flexDirection: "row"
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: 5
  }
});
