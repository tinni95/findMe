import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Bold, Body } from "../../../shared/components/StyledText";
import AvatarAndVediCorNome from "../../../shared/components/AvatarAndVediCorNome";

export default function PostInfo({ user, isHidden, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        {user && (
          <View>
            <Bold style={styles.titleSm}>Proposto Da:</Bold>
            {!isHidden ? (
              <AvatarAndVediCorNome
                navigateToProfile={() =>
                  navigation.navigate("UserVisitsProfileScreen", {
                    id: user.id
                  })
                }
                nome={user.nome + " " + user.cognome}
                image={user.pictureUrl}
              ></AvatarAndVediCorNome>
            ) : (
              <AvatarAndVediCorNome
                navigateToProfile={null}
                nome={user.nome + " " + user.cognome[0] + "."}
                image={null}
              ></AvatarAndVediCorNome>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 10,
    marginLeft: 15,
    marginTop: 10
  },
  line: {
    flexDirection: "row",
    margin: 5,
    marginTop: 10,
    marginLeft: 0
  },
  grigio: {
    color: "#989898"
  },
  titleSm: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
    color: "black"
  }
});
