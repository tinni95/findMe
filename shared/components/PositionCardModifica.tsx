import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity
} from "react-native";
import { Bold, Body, Light } from "./StyledText";
import FieldIconRound from "./FieldIcons";
import RoundButton from "./RoundButton";
import { Tooltip } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { isBigDevice } from "../constants/Layout";
var shortid = require("shortid");
export function PositionCardModifica({
  position,
  buttonText,
  buttonOnPress,
  trashOnPress
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bold style={styles.headerText}>{position.titolo}</Bold>
        <View style={styles.iconContainer}>
          {Platform.OS == "web" ? (
            <FieldIconRound size={25} field={position.field} color="#60E1E0" />
          ) : (
            <Tooltip
              backgroundColor={"#10476C"}
              popover={<Text style={{ color: "white" }}>{position.field}</Text>}
            >
              <FieldIconRound
                size={25}
                field={position.field}
                color="#60E1E0"
              />
            </Tooltip>
          )}
        </View>
      </View>
      <View style={styles.description}>
        {position.requisiti.length > 0 ? (
          <View>
            <Body style={styles.DescriptionItemTitle}>Requisiti</Body>
            {position.requisiti.map(requisito => {
              return (
                <Light
                  key={shortid.generate()}
                  style={styles.DescriptionItemBody}
                >
                  - {requisito}
                </Light>
              );
            })}
          </View>
        ) : null}
        <View style={styles.spacer} />
        <View>
          <Body style={styles.DescriptionItemTitle}>Descrizione</Body>
          <Light style={styles.DescriptionItemBody}>
            {position.description || "esempio descrizione"}
          </Light>
        </View>
        <View style={{ height: 20 }}></View>
        <View>
          <Body style={styles.DescriptionItemTitle}>Tipo posizione</Body>
          <Light style={styles.DescriptionItemBody}>
            {position.type || "NS"}
          </Light>
        </View>
        <View style={styles.spacer} />
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-around",
            paddingBottom: 20
          }}
        >
          <View style={styles.ButtonWrapper}>
            <RoundButton
              onPress={buttonOnPress}
              text={buttonText}
              textColor={"white"}
              color={"#10476C"}
            />
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
    fontSize: 14,
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
    fontSize: 20
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
    height: Platform.OS == "web" ? 300 : undefined,
    marginTop: 5,
    marginBottom: 30,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 5
      },
      web: {
        borderTopColor: "#EBEBEB",
        borderTopWidth: 4,
        width: isBigDevice ? "100%" : "100%"
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
    alignSelf: "center"
  },
  trashWrapper: {
    alignSelf: "flex-end"
  }
});
