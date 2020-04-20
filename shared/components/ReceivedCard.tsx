import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AvatarAndVedi from "./AvatarAndVedi";
import { Bold, Body, Light } from "./StyledText";
import Colors from "../constants/Colors";
import { RoundButtonEmptyIcon } from "./RoundButtonEmptyIcon";
import RoundButtonEmpty from "./RoundButtonEmpty";
import LocationWithText from "./LocationWithText";
import RoundButton from "./RoundButton";

export default function ReceivedCard({
  onClosePosition,
  application,
  navigation,
  onPress
}) {
  const navigateToProfile = () =>
    navigation.navigate("UserVisitsProfileScreen", { id: application.from.id });
  return (
    <View
      style={[
        styles.container,
        {
          opacity:
            !application.post.opened &&
            application.post.closedFor.id != application.id
              ? 0.5
              : 1
        }
      ]}
    >
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
            postId={application.post.id}
            title={application.post.titolo}
            nome={application.from.nome}
            cognome={application.from.cognome}
            comune={application.from.comune}
            regione={application.from.regione}
            posizione={application.post.titolo}
          ></Info>
        </View>
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
                  marginLeft: -8,
                  width: 15,
                  height: 15,
                  borderRadius: 7.5,
                  backgroundColor: Colors.red,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Bold
                  style={{ textAlign: "center", color: "white", marginTop: 2 }}
                >

                </Bold>
              </View>
            </View>
          )}
          {!application.post.opened ? (
            application.post.closedFor.id === application.id ? (
              <RoundButton
                color={Colors.ocean}
                textColor={"white"}
                isLight
                text={"Accettata"}
                isMedium
                onPress={() => {}}
              />
            ) : (
              <RoundButton
                color={Colors.red}
                textColor={"white"}
                isLight
                text={"Rifiutata"}
                isMedium
                onPress={() => {}}
              />
            )
          ) : (
            <RoundButtonEmpty
              color={Colors.ocean}
              isLight
              text={"Accetta"}
              isMedium
              onPress={() => onClosePosition(application)}
            />
          )}
        </View>
      </View>
    </View>
  );
}

function Info({
  navigateToProfile,
  nome,
  cognome,
  regione,
  comune,
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
        Risposta
      </Body>
      <Light style={{ fontSize: 12, marginTop: 5 }}>Ciao, sono disponibile per quel prezzo a quell'ora..</Light>
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
