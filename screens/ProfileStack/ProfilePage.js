import React, { useEffect } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import RoundButton from '../../components/shared/RoundButtonSignUpScreen';
import { TOKEN_KEY } from '../../shared/Token';

export default function ProfilePage({ user, screenProps }) {

  const logout = async () => {
    AsyncStorage.removeItem(TOKEN_KEY).then(() => {
      screenProps.changeLoginState();
    })

  }

  return (
    <View style={styles.container}>
      <Text>{user.email}</Text>
      <Text>{user.nome}</Text>
      <Text>{user.cognome}</Text>
      <Text>{user.pictureUrl}</Text>
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