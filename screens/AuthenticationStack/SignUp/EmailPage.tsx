import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { isSmallDevice } from "../../../shared/constants/Layout";
import TenditTextInput from "../../../shared/components/TenditTextInput";
import HeaderRight from "../../../shared/components/HeaderRight";
import { validateEmail } from "../validators";
import { wait } from "../../../shared/functions/wait";

export default function EmailPage({ navigation, route }) {
  navigation.setOptions({
    headerRight: () => <HeaderRight text={"Next"} onPress={() => login()} />
  });

  const { user, emailUsed } = route.params;
  const [email, setEmail] = useState("");
  const [reEmail, setReEmail] = useState("");
  const [emailError, setEmailError] = useState<any>(undefined);
  const [reEmailError, setReEmailError] = useState<any>(undefined);

  let preinput = useRef<any>();
  let input = useRef<any>();

  useEffect(() => {
    wait(100).then(() => {
      preinput.current.focus();
    });
  }, []);

  useEffect(() => {
    navigation.setParams({ login });
  }, [email, reEmail]);

  const login = () => {
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
      navigation.navigate("PasswordPage", { user: { ...user, email } });
    }
  };

  return (
    <View style={styles.container}>
      <TenditTextInput
        reference={preinput}
        label="Email"
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
        label="Repeat Email"
        value={reEmail}
        autoCapitalize="none"
        hintError={reEmailError}
        hintText={"Email don't match"}
        placeholder={"email"}
        onChangeText={text => setReEmail(text)}
        onSubmitEditing={() => login()}
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
