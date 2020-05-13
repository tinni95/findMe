import { AppLoading } from "expo";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import AuthenticationStack from "./navigation/AuthenticationStack";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { ApolloProvider } from "@apollo/react-hooks";
import { makeClient } from "./shared/apollo/client";
import AppWrapper from "./AppWrapper";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Colors from "./shared/constants/Colors";
import LoginContext from "./shared/LoginContext";
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';

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
  const [client, setClient] = useState<any>(null);

  function login() {
    makeClient().then(object => {
      setClient(object.client);
      setLoggedin(true);
    });
  }

  function logout() {
    makeClient().then(object => {
      setClient(object.client);
      setLoggedin(false);
    });
  }

  useEffect(() => {
    makeClient().then(object => {
      setClient(object.client);
      object.token ? setLoggedin(true) : setLoggedin(false);
    });
  }, []);

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
    Asset.loadAsync([require("./assets/images/arrows.png"),
    require("./assets/images/homeIcon.png")
  ]),
    Font.loadAsync({
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
      Avenir: require("./assets/fonts/avenir.otf"),
      "changa-one": require("./assets/fonts/ChangaOne-Regular.ttf"),
      "sequel-sans": require("./assets/fonts/regular.otf"),
      "sequel-sans-bold": require("./assets/fonts/medium.otf"),
      "sequel-sans-light": require("./assets/fonts/light.otf")
    })
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
