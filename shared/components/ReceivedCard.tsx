import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Tooltip } from "react-native-elements";
import AvatarAndVedi from "./AvatarAndVedi";
import FieldIcon from "./FieldIcons";
import { Bold, Body, Light } from "./StyledText";
import Colors from "../constants/Colors";
import { RoundButtonEmptyIcon } from "./RoundButtonEmptyIcon";
import RoundButtonEmpty from "./RoundButtonEmpty";
import LocationWithText from "./LocationWithText";

export default function ReceivedCard({ id, application, navigation, onPress }) {
  const navigateToProfile = () =>
    navigation.navigate("UserVisitsProfileScreen", { id: application.from.id });
  return (
    <View style={styles.container}>
      <View style={styles.upperContent}>
        <AvatarAndVedi
          navigateToProfile={navigateToProfile}
          image={application.from.pictureUrl}
        />
        <LinearGradient colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />
        <View style={styles.info}>
          <Info
            navigateToProfile={navigateToProfile}
            navigation={navigation}
            postId={application.position.post.id}
            title={application.position.post.titolo}
            nome={application.from.nome}
            cognome={application.from.cognome}
            comune={application.from.comune}
            regione={application.from.regione}
            posizione={application.position.titolo}
          ></Info>
        </View>
      </View>
      <View style={styles.messageWrapper}>
        <Bold style={{ fontSize: 12, marginBottom: 10, color: Colors.blue }}>
          Risposta
        </Bold>
        <Light style={{ fontSize: 12, marginBottom: 10 }}>
          {application.messages[0].text}
        </Light>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonWrapper}>
          {application.pubRead ? (
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
          <RoundButtonEmpty
            color={Colors.red}
            isLight
            text={"Accetta"}
            isMedium
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
}

function Info({
  navigateToProfile,
  postId,
  title,
  nome,
  cognome,
  regione,
  comune,
  posizione,
  navigation
}) {
  const navigate = navigateToProfile ? navigateToProfile : {};
  return (
    <View style={styles.containerInfo}>
      <Bold onPress={navigate} style={{ fontSize: 16 }}>
        {nome + " " + cognome}
      </Bold>
      {comune ? (
        <LocationWithText
          points={17}
          style={{ marginTop: 3 }}
          comune={comune}
          regione={regione}
        ></LocationWithText>
      ) : null}
      <Body style={{ fontSize: 14, marginTop: 15, color: Colors.blue }}>
        Posizione
      </Body>
      <Light style={{ fontSize: 12, marginTop: 5 }}>{posizione}</Light>
      <Body
        onPress={() =>
          navigation.navigate("PostScreen", {
            id: postId
          })
        }
        style={{ fontSize: 14, marginTop: 15, color: Colors.blue }}
      >
        Titolo post
      </Body>
      <Light
        onPress={() =>
          navigation.navigate("PostScreen", {
            id: postId
          })
        }
        style={{ fontSize: 12, marginTop: 5 }}
      >
        {title}
      </Light>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    marginBottom: 5
  },
  containerInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 10,
    marginBottom: 0
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
    justifyContent: "space-between",
    width: "60%"
  },
  info: {
    flexDirection: "row",
    flex: 6.5,
    marginBottom: 10
  },
  tooltip: {
    alignContent: "flex-end",
    margin: 10
  },
  line: {
    flex: 0.03
  }
});
