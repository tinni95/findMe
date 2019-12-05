import React, { useEffect } from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image } from 'react-native';
import RoundButton from '../../components/shared/RoundButtonSignUpScreen';
import { TOKEN_KEY } from '../../shared/Token';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const User = gql`
  {
    currentUser {
      email
      nome
      cognome
      pictureUrl
      locationString
    }
  }
`;

export default function ProfilePage({ screenProps }) {
  const { loading, error, data } = useQuery(User);
  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />;
  const logout = async () => {
    AsyncStorage.removeItem(TOKEN_KEY).then(() => {
      screenProps.changeLoginState();
    })

  }

  return (
    <View style={styles.container}>
      <Text>{data.currentUser.email}</Text>
      <Text>{data.currentUser.nome}</Text>
      <Text>{data.currentUser.cognome}</Text>
      <Text>{data.currentUser.locationString}</Text>
      <Text>{data.currentUser.pictureUrl}</Text>
      <RoundButton fontColor="white"
        isLong color="#DD1E63" text={"LOGOUT"}
        onPress={() => logout()}
      ></RoundButton>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

ProfilePage.navigationOptions = {
  title: "Profilo",
  headerStyle: {
    borderBottomWidth: 0.1,
  },
  headerTitleStyle: {
    fontSize: 20,
    fontFamily: "sequel-sans"
  },
  headerRight: (
    <TouchableOpacity>
      <Image source={require("../../assets/images/pen.png")} style={{ width: 25, height: 25, marginRight: 15 }} />
    </TouchableOpacity>
  ),
  headerLeft: (
    <TouchableOpacity>
      <Ionicons
        name={"ios-menu"}
        size={30}
        style={{ marginLeft: 10 }}
        color={Colors.blue}
      ></Ionicons>
    </TouchableOpacity>
  ),
}
