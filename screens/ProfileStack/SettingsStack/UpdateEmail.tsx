import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { isSmallDevice } from "../../../shared/constants/Layout";
import TenditTextInput from "../../../shared/components/TenditTextInput";
import HeaderRight from "../../../shared/components/HeaderRight";
import { validateEmail } from "../../AuthenticationStack/validators";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import { wait } from "../../../shared/functions/wait";
const UPDATE_EMAIL = gql`
  mutation UpdateEmail($email: String!) {
    updateEmail(email: $email) {
      id
    }
  }
`;

export default function UpdateEmail({ navigation, route }) {
  navigation.setOptions({
    headerRight: () => (
      <HeaderRight text={"Conferma"} onPress={() => action()} />
    )
  });
  const [updateEmail] = useMutation(UPDATE_EMAIL, {
    onCompleted: () => {
      alert("email aggiornata, per favore verifica la nuova mail");
    },
    onError: error => {
      if (error.toString().includes("email")) {
        setEmailUsed(true);
      } else alert("ops, si è verificato un errore");
    }
  });
  const [emailUsed, setEmailUsed] = useState<any>("");
  const [email, setEmail] = useState<string>("");
  const [reEmail, setReEmail] = useState("");
  const [emailError, setEmailError] = useState<any>(undefined);
  const [reEmailError, setReEmailError] = useState<any>(undefined);

  let preinput = useRef<any>();
  let input = useRef<any>();

  useEffect(() => {
    wait(500).then(() => preinput.current.focus());
  }, []);

  const action = () => {
    if (!validateEmail(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (email != reEmail) {
      setReEmailError(true);
    } else {
      setReEmailError(false);
    }
    if (validateEmail(email) && email == reEmail) {
      Alert.alert(
        "Sei sicuro?",
        "sicuro che vuoi cambiare e-mail?",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              updateEmail({ variables: { email } });
              navigation.navigate("Impostazioni", {
                refetch: Math.floor(Math.random() * -1000)
              });
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <TenditTextInput
        reference={preinput}
        label="nuova e-mail"
        autoCapitalize="none"
        value={email}
        hintError={emailError || emailUsed}
        hintText={emailUsed ? "email gia in uso" : "email non valida"}
        placeholder={"email"}
        onChangeText={text => setEmail(text)}
        onSubmitEditing={() => input.current.focus()}
      />
      <TenditTextInput
        reference={input}
        label="ripeti"
        value={reEmail}
        autoCapitalize="none"
        hintError={reEmailError}
        hintText={"Email don't match"}
        placeholder={"email"}
        onChangeText={text => setReEmail(text)}
        onSubmitEditing={() => action()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10
  },
  header: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20
  },
  formContainer: {
    margin: 30,
    marginTop: isSmallDevice ? 20 : 40,
    justifyContent: "center"
  },
  buttonsContainer: {
    flex: isSmallDevice ? 10 : 7.5,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  spacer: { height: 20 }
});
