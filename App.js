import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ApolloProvider } from '@apollo/react-hooks';
import { graphlEndPoint } from "./shared/urls";
import { TOKEN_KEY } from "./shared/Token"
import AuthenticationStack from './navigation/AuthenticationStack';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from "apollo-upload-client";
import { resolvers, typeDefs } from "./resolvers"
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import moment from 'moment/min/moment-with-locales'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import MainTabNavigatorWrapper from './MainTabNavigatorWrapper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Colors from './constants/Colors';

moment.locale('it');

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue,
    accent: Colors.ocean
  },
};


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

    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      httpLink,
    );

    setClient(
      new ApolloClient({
        link: authLink.concat(link),
        cache,
        resolvers,
        typeDefs
      })
    )
  }

  function login() {
    fetchToken().then(() => makeClient()).then(() => { setLoggedin(true); })
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
    <ActionSheetProvider>
      <PaperProvider theme={theme}>
        <ApolloProvider client={client}>
          <View style={styles.container}>
            {loggedin ?
              (
                <MainTabNavigatorWrapper screenProps={{ changeLoginState: () => logout() }} />
              ) :
              <AuthenticationStack screenProps={{ changeLoginState: () => login() }} />}
          </View>
        </ApolloProvider>
      </PaperProvider>
    </ActionSheetProvider>


  );
}

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      ...Ionicons.font,
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
