import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { graphlEndPoint } from "./shared/urls";
import { TOKEN_KEY } from "./shared/Token"
import { resolvers, typeDefs } from './resolvers';
import { InMemoryCache } from 'apollo-cache-inmemory';
const cache = new InMemoryCache();

const client = new ApolloClient({
  request: async (operation) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: graphlEndPoint,
  cache,
  resolvers,
  typeDefs
})

cache.writeData({
  data: {
    postLocation: "",
    postOwnerPosition: "",
    postTitle: "",
    postDescription: "",
    postOwner: "",
    postCategories: [],
    postPositions: []
  },
});

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
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
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
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
