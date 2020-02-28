import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Light } from "../../shared/components/StyledText";
import RoundButtonEmptyLarge from "../../shared/components/RoundButtonEmptyLarge";
import Colors from "../../shared/constants/Colors";

export const LandingPage = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/Logo_tendit.png")}
          resizeMode="contain"
        />
        <Light style={styles.heading}>Get start-up ready</Light>
      </View>
      <View style={styles.buttonsWrapper}>
        <RoundButtonEmptyLarge
          isMedium
          textColor={Colors.blue}
          color={Colors.blue}
          onPress={() => navigate("RegisterPage")}
          text="Iscriviti"
        />
        <View style={{ height: 20 }}></View>
        <RoundButtonEmptyLarge
          isMedium
          textColor={Colors.red}
          color={"white"}
          onPress={() => navigate("LoginScreen")}
          text="Accedi"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 8
  },
  logo: {
    alignItems: "center",
    width: 320,
    height: 120
  },
  heading: {
    fontSize: 18
  },
  buttonsWrapper: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
