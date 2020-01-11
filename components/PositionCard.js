import React, { useState } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { Bold, Body, Light } from "./StyledText";
import FieldIconRound from "./FieldIcons";
import RoundButton from "./shared/RoundButton";
import { Tooltip } from "react-native-elements";
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import FindMeSpinner from "../shared/FindMeSpinner";
import { sendNotification } from "../shared/PushNotifications";
import * as Haptics from 'expo-haptics';


const DELETEAPPLICATION_MUTATION = gql`
mutation deleteApplication($id: ID!) {
  deleteApplication(id:$id) {
        id
    }
}`;

const application = gql`
query application($id: ID!) {
  applicationUserForPosition(id:$id){
    id
  }
}
`
var shortid = require("shortid")
export function PositionCard({ position, button, post, navigation }) {

  const [deleteApplication] = useMutation(DELETEAPPLICATION_MUTATION,
    {
      onCompleted: async ({ deleteApplication }) => {
        alert("success")
      },
      onError: error => {
        console.log(error)
        alert("Qualcosa è andato storto")
      }
    });

  const handleRimuovi = () => {
    deleteApplication({ variables: { id: data.applicationUserForPosition[0].id } }).then(() => {
      refetch()
    }).then(() => {
      sendNotification({
        to: post.postedBy.pushToken,
        title: post.title,
        body: "Qualcuno ha rimosso la sua applicazione per " + position.title
      })
      Haptics.selectionAsync()
    })

  }

  const handleApply = () => {
    navigation.navigate("ApplyScreen", { position, post, refetch })
  }

  const { loading, error, data, refetch } = useQuery(application, {
    variables: {
      id: position.id
    },
    fetchPolicy: "no-cache"
  })
  if (loading)
    return <FindMeSpinner></FindMeSpinner>

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
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
              <Body style={styles.DescriptionItemTitle}>Requisiti</Body>
              {
                position.requisiti.length == 0 ? <Light style={styles.DescriptionItemBody}>
                  Non Specificato
            </Light>
                  :
                  position.requisiti.map(requisito => {
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
              {position.description || "Non Specificato"}
            </Light>
          </View>
          <View style={styles.line}></View>
          <View style={styles.ButtonWrapper}>
            {button ? null :
              <RoundButton isMedium={true} onPress={() => data.applicationUserForPosition.length > 0 ? handleRimuovi() : handleApply()} text={data.applicationUserForPosition.length > 0 ? "Rimuovi Candidatura" : "Candidati"} textColor={"white"} color={"#DD1E63"} />
            }
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
    marginTop: 10
  },
  headerText: {
    margin: 10,
    marginTop: 10,
    marginLeft: 0,
    marginBottom: 5,
    fontSize: 18
  },
  line: {
    height: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: "#D0D0D0",
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
  subContainer: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white"
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
