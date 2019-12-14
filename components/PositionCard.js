import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { Bold, Body, Light } from "./StyledText";
import FieldIconRound from "./FieldIcons";
import RoundButton from "./shared/RoundButton";
import { Tooltip } from "react-native-elements";
import { isBigDevice } from "../constants/Layout";
var shortid = require("shortid")
export function PositionCard({ position, buttonText, buttonOnPress, button }) {
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
        {position.requisiti ?
          <View style={styles.DescriptionItem}>
            {position.requisiti.length > 0 ?
              <Body style={styles.DescriptionItemTitle}>Requisiti</Body>
              : null
            }
            {position.requisiti.map(requisito => {
              return <Light key={shortid.generate()} style={styles.DescriptionItemBody}>
                - {requisito}
              </Light>
            })}
            <View style={styles.spacer} />
          </View>
          : null}
        <View style={styles.DescriptionItem}>
          <Body style={styles.DescriptionItemTitle}>Descrizione</Body>
          <Light style={styles.DescriptionItemBody}>
            {position.description || "esempio descrizione"}
          </Light>
        </View>
        <View style={styles.ButtonWrapper}>
          {button ? null :
            <RoundButton onPress={buttonOnPress} text={buttonText} textColor={"white"} color={"#DD1E63"} />
          }
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
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18
  },
  header: {
    paddingBottom: 10,
    borderBottomWidth: 0.3,
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
    marginTop: 5,
    backgroundColor: "white",
  },

  spacer: {
    height: 20
  },
  ButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 20
  }
});
