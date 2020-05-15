import React, { useEffect } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { isSmallDevice } from "../../../shared/constants/Layout";
import CheckBox from "react-native-check-box";
import { Bold, Body, Light } from "../../../shared/components/StyledText";
import Colors from "../../../shared/constants/Colors";
import RoundButton from "../../../shared/components/RoundButton";
import { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import { TOKEN_KEY } from "../../../shared/constants/Token";
import PushNotifications from "../../../shared/functions/PushNotifications";
import HeaderRight from "../../../shared/components/HeaderRight";
import LoginContext from "../../../shared/LoginContext";
import HeaderLeft from "../../../shared/components/HeaderLeft";
import * as WebBrowser from 'expo-web-browser';

const SIGNUP_MUTATION = gql`
  mutation signup(
    $email: String!
    $password: String!
    $nome: String!
    $cognome: String!
  ) {
    signup(email: $email, password: $password, nome: $nome, cognome: $cognome) {
      token
    }
  }
`;

const UPDATEUSER_MUTATION = gql`
  mutation updateUser($pushToken: String) {
    updateUser(pushToken: $pushToken) {
      pushToken
      nome
    }
  }
`;

function PrivacyPage({ navigation, context, route }) {

  const [signup] = useMutation(SIGNUP_MUTATION, {
    onCompleted: async ({ signup }) => {
      await AsyncStorage.setItem(TOKEN_KEY, signup.token);
      context.login();
      PushNotifications(updateUser);
    },
    onError: error => {
      if (error.toString().includes("User already exists with that email")) {
        navigation.navigate("EmailPage", {
          user: { nome, cognome },
          emailUsed: true
        });
      }
    }
  });

  const [updateUser] = useMutation(UPDATEUSER_MUTATION);

  const {
    user: { nome, cognome, email, password }
  } = navigation.state.params;

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    navigation.setParams({ login });
  }, [checked]);
  
  const login = () => {
    if (checked) {
      signup({ variables: { nome, cognome, email, password } });
    } else {
      alert("devi accettare i termini");
    }
  };

  return (
    <View style={styles.container}>
      <Bold style={styles.terms}>Termini</Bold>
      <Bold style={styles.subTerms}>
        Dichiarazione esplicita di Accettazione dei termini e Condizioni
      </Bold>
      <Body style={styles.descTerms}>
        Cliccando su “accetto” dichiari di accettare i
        <Bold style={styles.redTerms}> Termini e condizioni d’uso</Bold>, E ci
        consenti all’uso dei tuoi dati come Descritto nella{" "}
        <Bold onPress={()=>WebBrowser.openBrowserAsync('https://www.iubenda.com/privacy-policy/34475001')} style={styles.redTerms}>Privacy Policy</Bold>
      </Body>
      <View style={styles.buttonsContainer}>
        <View style={styles.checkBoxWrapper}>
          <CheckBox
            isChecked={checked}
            onClick={() => setChecked(!checked)}
            checkBoxColor={Colors.blue}
          ></CheckBox>
          <Light style={{ margin: 5 }}>
            <Light>Accetto i</Light>
            <Light style={{ color: Colors.blue }}> Termini e Condizioni</Light>
          </Light>
        </View>
        <RoundButton
          onPress={() => login()}
          text={"Accetto"}
          color={Colors.red}
          textColor={"white"}
        ></RoundButton>
      </View>
    </View>
  );
}

const PrivacyPageWC = props => {
  return (
    <LoginContext.Consumer>
      {context => <PrivacyPage {...props} context={context} />}
    </LoginContext.Consumer>
  );
};

export default PrivacyPageWC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  checkBoxWrapper: {
    marginBottom: 20,
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  terms: {
    marginTop: 20,
    fontSize: 30,
    marginBottom: 10
  },
  descTerms: {
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 29
  },
  subTerms: {
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 29,
    marginBottom: 40
  },
  redTerms: {
    fontSize: 14,
    color: Colors.red,
    lineHeight: 29
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

PrivacyPage.navigationOptions = ({ navigation }) => {
  return {
    title:null,
    headerLeft: <HeaderLeft navigation={navigation}></HeaderLeft>,
    headerRight: () => <HeaderRight text={"Next"} onPress={() => navigation.getParam("login",null)()} />
  }
}