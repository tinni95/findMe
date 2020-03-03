import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { isSmallDevice } from "../../../shared/constants/Layout";
import TenditTextInput from "../../../shared/components/TenditTextInput";
import HeaderRight from "../../../shared/components/HeaderRight";
import { validateEmail } from "../../AuthenticationStack/validators";

export default function EmailPage({ navigation }) {
  navigation.setOptions({
    headerRight: () => (
      <HeaderRight text={"Conferma"} onPress={() => action()} />
    )
  });

  const [emailUsed, setEmailUsed] = useState("");
  const [email, setEmail] = useState("");
  const [reEmail, setReEmail] = useState("");
  const [emailError, setEmailError] = useState<any>(undefined);
  const [reEmailError, setReEmailError] = useState<any>(undefined);

  let preinput = useRef<any>();
  let input = useRef<any>();

  useEffect(() => {
    preinput.current.focus();
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
