import React, { useEffect } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import RoundButton from '../../components/shared/RoundButtonSignUpScreen';
import { TOKEN_KEY } from '../../shared/Token';

export default function ProfilePage({ user, navigation }) {

  const logout = async () => {
    AsyncStorage.removeItem(TOKEN_KEY).then(() => {
      navigation.navigate("AuthenticationStack")
    })
  }

  return (
    <View style={styles.container}>
      <Text>{user.email}</Text>
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