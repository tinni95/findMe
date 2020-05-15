import { AppLoading } from "expo";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import AuthenticationStack from "./navigation/AuthenticationStack";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { ApolloProvider } from "@apollo/react-hooks";
import AppWrapper from "./AppWrapper";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Colors from "./shared/constants/Colors";
import LoginContext from "./shared/LoginContext";
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import {TOKEN_KEY} from "./shared/constants/Token";
import ApolloClient from 'apollo-boost'
import { graphlEndPoint } from "./shared/constants/urls";

Sentry.init({
  dsn: 'https://db25e88e44d04dd3b02475df3830a0d8@o387249.ingest.sentry.io/5222235',
  enableInExpoDevelopment: true,
  debug: true,
});

Sentry.setRelease(Constants.manifest.revisionId);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue,
    accent: Colors.ocean
  }
};


export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [loggedIn, setLoggedin] = useState<boolean>(false);
  const [token, setToken] = useState<any>(null);

  async function fetchToken(){
    let token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  }

  const client = new ApolloClient({
    request: (operation) => {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      })
    },
    uri: graphlEndPoint
  })

  function login() {
      setLoggedin(true);
  }

  function logout() {
      setLoggedin(false);
  }

  useEffect(()=>{
    fetchToken().then(tokens => {
      if(tokens){
        setToken(tokens);
        setLoggedin(true)
      }
    })
  },[])

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <ApolloProvider client={client}>
          <LoginContext.Provider
            value={{ logout: () => logout(), login: () => login() }}
          >
            <PaperProvider theme={theme}>
                {!loggedIn ? (
                  <AuthenticationStack></AuthenticationStack>
                ) : (
                  <AppWrapper logout={() => logout()}></AppWrapper>
                )}
            </PaperProvider>
          </LoginContext.Provider>
        </ApolloProvider>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
  
  Asset.loadAsync([
  require("./assets/images/hat.png"),
  require("./assets/images/CandidatureIcon.png"),
  require("./assets/images/placeholder.png"),
  require("./assets/images/pen-opaca.png"),
  require("./assets/images/logo.png"),
  require("./assets/images/controls.png"),
  require("./assets/images/homeIcon.png"),
  require("./assets/images/Settori/azienda.png"),
  require("./assets/images/Settori/benessere.png"),
  require("./assets/images/Settori/casa.png"),
  require("./assets/images/Settori/consegne.png"),
  require("./assets/images/Settori/feste.png"),
  require("./assets/images/Settori/homeIcon.png"),
  require("./assets/images/Settori/informatica.png"),
  require("./assets/images/Settori/lezioni.png"),
  require("./assets/images/Settori/privati.png"),
  require("./assets/images/Settori/ristorazione.png"),
  require("./assets/images/shimmer.gif"),
  require("./assets/images/valigia.png"),
  ]),
  Font.loadAsync({
    "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
    Avenir: require("./assets/fonts/avenir.otf"),
    "changa-one": require("./assets/fonts/ChangaOne-Regular.ttf"),
    "sequel-sans": require("./assets/fonts/regular.otf"),
    "sequel-sans-bold": require("./assets/fonts/medium.otf"),
    "sequel-sans-light": require("./assets/fonts/light.otf")
  }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  }
});
