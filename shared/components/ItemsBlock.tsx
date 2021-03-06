import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Body, Bold } from "./StyledText";
import Colors from "../constants/Colors";
import FormazioneCard from "./Formazioni/FormazioneCard";
import EsperienzaCard from "./Esperienze/EsperienzaCard";
import UnTouchablePen from "./UnTouchablePen";
import Swipeout from "react-native-swipeout";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
var shortid = require("shortid");

const DELETEFORMAZIONE_MUTATION = gql`
  mutation deleteFormazione($id: ID!) {
    deleteFormazione(id: $id) {
      id
    }
  }
`;

const DELETEESPERIENZA_MUTATION = gql`
  mutation deleteEsperienza($id: ID!) {
    deleteEsperienza(id: $id) {
      id
    }
  }
`;

const DELETEPROGETTO_MUTATION = gql`
  mutation deleteProgetto($id: ID!) {
    deleteProgetto(id: $id) {
      id
    }
  }
`;

export default function ItemsBlock({ refetch, title, items, onPress }) {
  const [deleteEsperienza] = useMutation(DELETEESPERIENZA_MUTATION, {
    onCompleted: async () => {
      refetch();
    }
  });

  const [deleteFormazione] = useMutation(DELETEFORMAZIONE_MUTATION, {
    onCompleted: async () => {
      refetch();
    }
  });

  if (items.length == 0) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10
          }}
        >
          <Bold style={{ color: "black", fontSize: 18 }}>{title}</Bold>
          <UnTouchablePen size={40}></UnTouchablePen>
        </View>
        <View style={{ height: 50 }}></View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10
        }}
      >
        <Bold style={{ color: "black", fontSize: 18 }}>{title}</Bold>
        <UnTouchablePen size={40}></UnTouchablePen>
      </TouchableOpacity>

      {(title == "Formazione" &&
        items.map(item => {
          const swipeoutBtns = [
            {
              component: (
                <View
                  style={{
                    flex: 1,
                    margin: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Colors.red
                  }}
                >
                  <Body style={{ color: "white" }}>Elimina</Body>
                </View>
              ),
              backgroundColor: "white",
              onPress: () =>
                deleteFormazione({
                  variables: {
                    id: item.id
                  }
                })
            }
          ];
          return (
            <Swipeout
              key={shortid.generate()}
              autoClose={true}
              backgroundColor={"#FFFFFF"}
              right={swipeoutBtns}
            >
              <FormazioneCard item={item}></FormazioneCard>
            </Swipeout>
          );
        })) ||
        (title == "Esperienze" &&
          items.map(item => {
            const swipeoutBtns = [
              {
                component: (
                  <View
                    style={{
                      flex: 1,
                      margin: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: Colors.red
                    }}
                  >
                    <Body style={{ color: "white" }}>Elimina</Body>
                  </View>
                ),
                backgroundColor: "white",
                onPress: () =>
                  deleteEsperienza({
                    variables: {
                      id: item.id
                    }
                  })
              }
            ];
            return (
              <Swipeout
                key={shortid.generate()}
                autoClose={true}
                backgroundColor={"#FFFFFF"}
                right={swipeoutBtns}
              >
                <EsperienzaCard
                  noBorder={false}
                  key={shortid.generate()}
                  item={item}
                ></EsperienzaCard>
              </Swipeout>
            );
          }))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    borderRadius: 8
  },
  aggiungiButton: {
    textAlign: "center",
    color: Colors.blue
  },
  aggiungiWrapper: {
    margin: 20
  }
});
