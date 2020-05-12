import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import TenditTextInput from "../../shared/components/TenditTextInput";
import HeaderRight from "../../shared/components/HeaderRight";
import HeaderLeft from "../../shared/components/HeaderLeft";
import { Light } from "../../shared/components/StyledText";

const PASSWORD_RESET_MUTATION = gql`
  mutation passwordReset($email: String!) {
    askPasswordReset(email: $email) {
      id
    }
  }
`;

export default function PasswordForgot({ navigation }) {
  navigation.setOptions({
    headerRight: () => <HeaderRight text={"Next"} onPress={() => login()} />
  });

  const passedEmail = navigation.getParam("email",null);
  const [resetComplete, setResetComplete] = useState<any>(false);
  const [email, setEmail] = useState(passedEmail);
  const [emailError, setEmailError] = useState<any>(undefined);
  let preinput = useRef<any>();

  const [resetMutation] = useMutation(PASSWORD_RESET_MUTATION, {
    onCompleted: async ({ login }) => {
      setResetComplete(true);
    },
    onError: error => {
      if (error.toString().includes("user")) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
  });

  useEffect(() => {
    preinput.current.focus();
  }, []);

  useEffect(() => {
    navigation.setParams({ login });
  }, [email]);

  const login = () => {
    resetMutation({ variables: { email } });
  };

  if (resetComplete) {
    return (
      <View style={styles.container2}>
        <Light>
          Hai ricevuto un e-mail per resettare la password, alcuni gestori
          segnalano l'email come spam
        </Light>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TenditTextInput
        reference={preinput}
        label="Email"
        autoCapitalize="none"
        value={email}
        hintError={emailError}
        hintText={"email non valida"}
        placeholder={"email"}
        onChangeText={text => setEmail(text)}
        onSubmitEditing={() => login()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "white"
  },
  container2: {
    paddingTop: 10,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    backgroundColor: "white"
  }
});
