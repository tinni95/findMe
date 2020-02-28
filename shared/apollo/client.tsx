import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { resolvers, typeDefs } from "./resolvers";
import { setContext } from "apollo-link-context";
import { AsyncStorage } from "react-native";
import { TOKEN_KEY } from "../constants/Token";
import { ApolloClient } from "apollo-client";
import { graphlEndPoint } from "../constants/urls";

export async function makeClient() {
  let token = await AsyncStorage.getItem(TOKEN_KEY);
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
    }
  });

  let authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  let httpLink = createUploadLink({
    uri: graphlEndPoint
  });

  return {
    token,
    client: new ApolloClient({
      link: authLink.concat(httpLink),
      cache,
      resolvers,
      typeDefs
    })
  };
}
