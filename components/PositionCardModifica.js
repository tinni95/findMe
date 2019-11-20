import React from "react";
import { View, StyleSheet, Platform, Text, TouchableOpacity } from "react-native";
import { Bold, Body, Light } from "./StyledText";
import FieldIconRound from "./FieldIcons";
import RoundButton from "./shared/RoundButton";
import { Tooltip } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { isBigDevice } from "../constants/Layout";
export function PositionCardModifica({ position, buttonText, buttonOnPress, trashOnPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bold style={styles.headerText}>{position.title}</Bold>
        <View style={styles.iconContainer}>
          {Platform.OS == "web" ? <FieldIconRound size={25} field={position.field} color="#60E1E0" /> :
            <Tooltip backgroundColor={"#10476C"} popover={<Text style={{ color: "white" }}>{position.field}</Text>}>
              <FieldIconRound size={25} field={position.field} color="#60E1E0" />
            </Tooltip>
          }
        </View>
      </View>
      <View style={styles.description}>
        <View style={styles.DescriptionItem}>
          <Body style={styles.DescriptionItemTitle}>Qualifiche</Body>
          <Light style={styles.DescriptionItemBody}>
            - Esempio Qualifica
          </Light>
        </View>
        <View style={styles.spacer} />
        <View style={styles.DescriptionItem}>
          <Body style={styles.DescriptionItemTitle}>Descrizione</Body>
          <Light style={styles.DescriptionItemBody}>
            {position.description || "esempio descrizione"}
          </Light>
        </View>
        <View style={styles.spacer} />
        <View style={{ flexDirection: "row" }}>
          <View style={styles.ButtonWrapper}>
            <RoundButton onPress={buttonOnPress} text={buttonText} textColor={"white"} color={"#10476C"} />
          </View>
          <View style={styles.trashWrapper}>
            <TouchableOpacity onPress={trashOnPress} style={styles.trash}>
              <Ionicons
                name={"ios-trash"}
                size={22}
                style={{ padding: 5 }}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  DescriptionItemBody: {
    fontSize: 12,
    marginBottom: 2
  },
  DescriptionItemTitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5
  },
  description: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10
  },
  headerText: {
    margin: 10,
    marginTop: 7.5,
    marginBottom: 5,
    fontSize: 25
  },
  header: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D0D0D0",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  iconContainer: {
    marginRight: 5,
    marginTop: 5
  },
  container: {
    height: Platform.OS == "web" ? 500 : undefined,
    marginTop: 15,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -15 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      },
      web: {
        borderTopColor: "#EBEBEB",
        borderTopWidth: 4,
        width: isBigDevice ? "60%" : "100%"
      }
    })
  },
  trash: {
    alignItems: "center",
    backgroundColor: "#DD1E63",
    width: 30,
    borderRadius: 15
  },
  spacer: {
    height: 20
  },
  ButtonWrapper: {
    alignItems: "center",
    flex: 5,
  },
  trashWrapper: {
    alignItems: "center",
    flex: 1,
  }
});