import React, { FunctionComponent } from "react";

import { Light, Bold, Body } from "../components/StyledText";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  ImageSourcePropType,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";

type CategoriaCardProps = {
  title: string;
  image: ImageSourcePropType;
};

const CategoriaCard: FunctionComponent<CategoriaCardProps> = ({
  title,
  image
}) => (
  <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode={"contain"}></Image>
    </View>
    <Body style={styles.title}>{title}</Body>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  title: {
    color: Colors.blue,
    textAlign: "center",
    marginTop: 5
  },
  image: {
    maxHeight: 80,
    maxWidth: 80
  },
  card: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    width: 120,
    borderRadius: 8,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 16
      },
      android: {
        elevation: 5
      }
    })
  }
});

export default CategoriaCard;
