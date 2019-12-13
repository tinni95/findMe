import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ApolloProvider } from '@apollo/react-hooks';
import { graphlEndPoint } from "./shared/urls";
import { TOKEN_KEY } from "./shared/Token"
import MainTabNavigator from './navigation/MainTabNavigator';
import AuthenticationStack from './navigation/AuthenticationStack';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from "apollo-upload-client";
import { resolvers, typeDefs } from "./resolvers"
export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [client, setClient] = useState(null)
  const [loggedin, setLoggedin] = useState(false)
  let token;

  async function fetchToken() {
    token = await AsyncStorage.getItem(TOKEN_KEY);
    console.log(token)
  }

  async function makeClient() {
    const cache = new InMemoryCache();
    cache.writeData({
      data: {
        postComune: "",
        postRegione: "",
        postProvincia: "",
        postOwnerPosition: "",
        postTitle: "",
        postDescription: "",
        postOwner: "",
        postCategories: [],
        postPositions: []
      },
    });
    let authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });

    let httpLink = createUploadLink({
      uri: graphlEndPoint,
    });

    setClient(
      new ApolloClient({
        link: authLink.concat(httpLink),
        cache,
        resolvers,
        typeDefs
      })
    )
  }

  function login() {
    fetchToken().then(() => makeClient()).then(() => { setLoggedin(true); console.log("client", client) })
  }

  function logout() {
    fetchToken().then(() => makeClient()).then(() => setLoggedin(false))
  }

  useEffect(() => {
    fetchToken().then(() => makeClient()).then(() => token ? setLoggedin(true) : setLoggedin(false))
  }, [])

  if (!isLoadingComplete || !client) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        {loggedin ? <MainTabNavigator screenProps={{ changeLoginState: () => logout() }} /> :
          <AuthenticationStack screenProps={{ changeLoginState: () => login() }} />}
      </View>
    </ApolloProvider>
  );
}

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      Avenir: require('./assets/fonts/avenir.otf'),
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'changa-one': require('./assets/fonts/ChangaOne-Regular.ttf'),
      'sequel-sans': require('./assets/fonts/SequelSans-Body.ttf'),
      'sequel-sans-bold': require('./assets/fonts/SequelSans-Bold.ttf'),
      'sequel-sans-light': require('./assets/fonts/SequelSans-Body-light.ttf')
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
    backgroundColor: '#fff'
  }
});
