import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../shared/constants/Colors";
import { Light, Body } from "../../../shared/components/StyledText";
import gql from "graphql-tag";
import StepsLabelDefault from "../../../shared/components/StepsLabel";
import FormTextInput from "../../../shared/components/Form/FormTextInput";
import { FormStyles } from "../../../shared/components/Form/FormStyles";
import RoundButton from "../../../shared/components/RoundButton";
import { useMutation, useQuery } from "@apollo/react-hooks";
import * as Haptics from "expo-haptics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { sendNotification } from "../../../shared/functions/PushNotifications";
import SocketContext from "../../../shared/SocketContext";

const UserNome = gql`
  {
    currentUser {
      nome
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
  mutation createApplication($postId: ID!, $to: ID!) {
    createApplication(postId: $postId, to: $to) {
      id
      to {
        id
      }
      from {
        id
        nome
        cognome
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

function ApplyScreen({ route, navigation, socket }) {
  const refetch = route.params.refetch;
  const post = route.params.post;
  const { data, loading } = useQuery(UserNome, { fetchPolicy: "no-cache" });
  console.log("post", post);
  const [messaggio, setMessaggio] = useState("");
  const [UnseeApplication] = useMutation(UNSEEAPPLICATION_MUTATION, {
    onCompleted: () => console.log("yea"),
    onError: error => console.log("a")
  });

  const [createApplication] = useMutation(CREATEAPPLICATION_MUTATION, {
    onCompleted: async ({ createApplication }) => {
      console.log("createApplication");
      socket.emit("postnotifica", createApplication.to.id);
      createMessage({
        variables: {
          applicationId: createApplication.id,
          text: messaggio,
          subId: createApplication.to.id
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
      console.log("createPostMEssage", createPostMessage);
    },
    onError: error => {
      console.log(error);
      alert("Qualcosa è andato storto");
    }
  });

  if (loading) {
    return null;
  }
  const handleApply = () => {
    if (messaggio.length === 0) {
      return alert("Inserisci il tuo messaggio di presentazione");
    }
    createApplication({
      variables: { postId: post.id, to: post.postedBy.id }
    })
      .then(() => {
        refetch();
      })
      .then(() => {
        sendNotification(
          post.postedBy.pushToken,
          post.titolo,
          data.currentUser.nome +
            " si è applicato alla tua posizione di " +
            post.titolo
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
            <Body> "{post.titolo}"</Body>
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

const ApplyScreenWS = props => (
  <SocketContext.Consumer>
    {socket => <ApplyScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ApplyScreenWS;

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
