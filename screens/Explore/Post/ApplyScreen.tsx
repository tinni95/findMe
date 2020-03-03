import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../shared/constants/Colors";
import { Light, Body } from "../../../shared/components/StyledText";
import gql from "graphql-tag";
import StepsLabelDefault from "../../../shared/components/StepsLabel";
import FormTextInput from "../../../shared/components/Form/FormTextInput";
import { FormStyles } from "../../../shared/components/Form/FormStyles";
import RoundButton from "../../../shared/components/RoundButton";
import { useMutation } from "@apollo/react-hooks";
import * as Haptics from "expo-haptics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { sendNotification } from "../../../shared/functions/PushNotifications";

const CREATENOTIFICA_MUTATION = gql`
  mutation createNotifica($text: String!, $type: String!, $id: ID!) {
    createNotifica(text: $text, type: $type, id: $id) {
      id
    }
  }
`;

const UNSEEAPPLICATION_MUTATION = gql`
  mutation UnseeApplication($id: ID!, $pubRead: Boolean, $subRead: Boolean) {
    UnseeApplication(id: $id, pubRead: $pubRead, subRead: $subRead) {
      id
      subRead
      pubRead
    }
  }
`;

const CREATEAPPLICATION_MUTATION = gql`
  mutation createApplication($positionId: ID!, $to: ID!) {
    createApplication(positionId: $positionId, to: $to) {
      id
      to {
        id
      }
      from {
        id
        nome
        cognome
      }
      position {
        titolo
      }
    }
  }
`;

const CREATEPOSTMESSAGE_MUTATION = gql`
  mutation createPostMessage($applicationId: ID!, $text: String!, $subId: ID!) {
    createPostMessage(
      applicationId: $applicationId
      text: $text
      subId: $subId
    ) {
      id
      application {
        from {
          id
          nome
        }
        to {
          id
          pushToken
        }
      }
    }
  }
`;

export default function ApplyScreen({ route, navigation }) {
  const refetch = route.params.refetch;
  const position = route.params.position;
  const post = route.params.post;
  console.log("post", post);
  const [messaggio, setMessaggio] = useState("");
  const [UnseeApplication] = useMutation(UNSEEAPPLICATION_MUTATION, {
    onCompleted: () => console.log("yea"),
    onError: error => console.log("a")
  });
  const [createNotifica] = useMutation(CREATENOTIFICA_MUTATION, {
    onCompleted: () => {
      console.log("yeah");
    },
    onError: error => {
      console.log("notifica");
      console.log(error);
    }
  });
  const [createApplication] = useMutation(CREATEAPPLICATION_MUTATION, {
    onCompleted: async ({ createApplication }) => {
      console.log("createApplication");
      createMessage({
        variables: {
          applicationId: createApplication.id,
          text: messaggio,
          subId: createApplication.to.id
        }
      });
      createNotifica({
        variables: {
          type: "applicationPost",
          id: createApplication.to.id,
          text:
            createApplication.from.nome +
            " " +
            createApplication.from.cognome +
            " si è applicato alla tua posizione di " +
            position.titolo
        }
      });
      UnseeApplication({
        variables: { id: createApplication.id, pubRead: false, subRead: true }
      });
    },
    onError: error => {
      if (error.toString().includes("Verified"))
        alert("devi prima verificare la tua email per candidarti");
      console.log("lol");
    }
  });

  const [createMessage] = useMutation(CREATEPOSTMESSAGE_MUTATION, {
    onCompleted: async ({ createPostMessage }) => {
      sendNotification(
        createPostMessage.application.to.pushToken,
        createPostMessage.application.from.nome +
          " si è applicato a un tuo post idea",
        createPostMessage.text
      );
    },
    onError: error => {
      console.log(error);
      alert("Qualcosa è andato storto");
    }
  });

  const handleApply = () => {
    if (messaggio.length === 0) {
      return alert("aoh el messaggio");
    }
    console.log("ehu7");
    createApplication({
      variables: { positionId: position.id, to: post.postedBy.id }
    })
      .then(() => {
        refetch();
      })
      .then(() => {
        sendNotification(
          post.postedBy.pushToken,
          post.titolo,
          "Qualcuno si è applicato alla tua posizione di " + position.titolo
        );
        Haptics.selectionAsync();
        navigation.goBack();
      });
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <View style={styles.spacer} />
          <Text>
            <Light style={{ lineHeight: 20 }}>
              Scrivi a {post.postedBy.nome} Per informargli del tuo interesse
              per la posizione di
            </Light>
            <Body> "{position.titolo}"</Body>
          </Text>
          <View style={styles.spacer} />
          <StepsLabelDefault text={"Messaggio"} />
          <FormTextInput
            large="true"
            multiline
            numberOfLines={4}
            placeholder="Esempio:
                    (Ho competenze in … Vorrei candidarmi come….)"
            placeholderTextColor="#ADADAD"
            textAlignVertical={"top"}
            style={FormStyles.xlarge}
            onChangeText={val => setMessaggio(val)}
            value={messaggio}
          />
          <View style={styles.buttonWrapper}>
            <RoundButton
              text={" Invia "}
              color={Colors.red}
              textColor={"white"}
              onPress={() => handleApply()}
            ></RoundButton>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  textWrapper: {
    margin: 30
  },
  spacer: {
    height: 25
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    margin: 40
  }
});
