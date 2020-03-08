import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AvatarAndVedi from "./AvatarAndVedi";
import { Bold, Body, Light } from "./StyledText";
import LocationWithText from "./LocationWithText";
import Colors from "../constants/Colors";
import RoundButton from "./RoundButton";
import { RoundButtonEmptyIcon } from "./RoundButtonEmptyIcon";
import RoundButtonEmpty from "./RoundButtonEmpty";
var shortid = require("shortid");

export default function SentCard({ onPress, application, navigation }) {
  const { post } = application;
  const navigateToProfile = () =>
    navigation.navigate("UserVisitsProfileScreen", { id: post.postedBy.id });
  return (
    <View
      style={[
        styles.container,
        {
          opacity:
            post.closedFor && post.closedFor.id != application.id ? 0.5 : 1
        }
      ]}
    >
      <View style={styles.upperContent}>
        <AvatarAndVedi
          navigateToProfile={navigateToProfile}
          image={post.postedBy.pictureUrl}
        />
        <LinearGradient colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />
        <View style={styles.info}>
          {post.closedFor && post.closedFor.id == application.id ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Bold style={{ fontSize: 16 }}>{post.titolo}</Bold>
              <Bold
                style={{
                  fontSize: 14,
                  color: "green",
                  borderWidth: 0.5,
                  padding: 3,
                  borderRadius: 3,
                  borderColor: "green"
                }}
              >
                Accettato
              </Bold>
            </View>
          ) : (
            <Bold style={{ fontSize: 16 }}>{post.titolo}</Bold>
          )}
          {post.comune ? (
            <LocationWithText
              points={17}
              style={{ marginTop: 3 }}
              comune={post.comune}
              regione={post.regione}
            ></LocationWithText>
          ) : null}
          <Body style={{ fontSize: 14, marginTop: 15, color: Colors.blue }}>
            Pubblicato da
          </Body>
          <Light style={{ fontSize: 12, marginTop: 5 }}>
            {post.hidden
              ? post.postedBy.nome + " " + post.postedBy.cognome[0] + "."
              : post.postedBy.nome + " " + post.postedBy.cognome}
          </Light>
        </View>
      </View>
      <View style={styles.messageWrapper}>
        <Bold style={{ fontSize: 12, marginBottom: 10, color: Colors.blue }}>
          Qualifiche
        </Bold>
        <View style={styles.qualifiche}>
          {post.requisiti && post.requisiti.length == 0 && (
            <Body>Non Specificato</Body>
          )}
          {post.requisiti &&
            post.requisiti.map(qualifica => {
              return (
                <RoundButton
                  onPress={() => {}}
                  key={shortid.generate()}
                  text={qualifica}
                  textColor={"white"}
                  color={Colors.blue}
                ></RoundButton>
              );
            })}
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonWrapper}>
          <RoundButtonEmpty
            buttonStyle={{ padding: 9 }}
            onPress={() =>
              navigation.navigate("PostScreen", {
                id: post.id
              })
            }
            isMedium
            text={"  Apri  "}
            color={Colors.blue}
          ></RoundButtonEmpty>
          {application.subRead ? (
            <RoundButtonEmptyIcon
              onPress={onPress}
              iconName={"ios-send"}
              text={"Rispondi"}
              iconColor={Colors.blue}
              color={Colors.blue}
              isMedium
            />
          ) : (
            <View style={{ flexDirection: "row" }}>
              <RoundButtonEmptyIcon
                onPress={onPress}
                iconName={"ios-send"}
                text={"Rispondi"}
                iconColor={Colors.blue}
                color={Colors.blue}
                isMedium
              />
              <View
                style={{
                  marginLeft: -5,
                  width: 15,
                  height: 15,
                  borderRadius: 7.5,
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{ textAlign: "center", color: "white", marginTop: 2 }}
                >
                  *
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    marginBottom: 5
  },
  upperContent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  messageWrapper: {
    justifyContent: "flex-start",
    margin: 15,
    marginTop: 5
  },
  footer: {
    borderTopWidth: 0.3,
    marginLeft: 10,
    marginRight: 10,
    borderTopColor: "#D0D0D0",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%"
  },
  info: {
    flexDirection: "column",
    flex: 6.5,
    margin: 10,
    marginTop: 15
  },
  tooltip: {
    alignContent: "flex-end",
    margin: 10
  },
  line: {
    flex: 0.03
  },
  qualifiche: {
    marginTop: 5,
    flexWrap: "wrap",
    flexDirection: "row"
  }
});
