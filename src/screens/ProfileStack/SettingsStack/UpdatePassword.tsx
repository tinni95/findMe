import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { isSmallDevice } from '../../../shared/constants/Layout';
import HeaderRight from '../../../shared/components/HeaderRight';
import { Ionicons } from '@expo/vector-icons';
import TenditTextInput from '../../../shared/components/TenditTextInput';
import { validatePassword } from '../../AuthenticationStack/validators';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';
import HeaderLeft from '../../../shared/components/HeaderLeft';

const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($password: String!, $newPassword: String!) {
    updatePassword(password: $password, newPassword: $newPassword) {
      id
    }
  }
`;

export default function UpdatePassword({ navigation }) {
  const [updatePassword] = useMutation(UPDATE_PASSWORD, {
    onCompleted: () => {
      alert('la password è cambiata con successo');
      sethePasswordError(false);
    },
    onError: () => {
      sethePasswordError(true);
    },
  });
  const [hePassword, sethePassword] = useState<string>('');
  const [hePasswordError, sethePasswordError] = useState<Boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<Boolean>(false);
  const [rePasswordError, setRePasswordError] = useState<Boolean>(false);
  const [passHidden, setPassHidden] = useState<Boolean>(true);
  const [repassHidden, setRePassHidden] = useState<Boolean>(true);
  let preinput = useRef<any>();
  let input = useRef<any>();
  let postInput = useRef<any>();

  useEffect(() => {
    preinput.current.focus();
  }, []);

  useEffect(() => {
    navigation.setParams({ action });
  }, [password, rePassword]);

  const action = () => {
    if (!validatePassword(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (password != rePassword) {
      setRePasswordError(true);
    } else {
      setRePasswordError(false);
    }
    if (validatePassword(password) && password == rePassword) {
      updatePassword({
        variables: {
          password: hePassword,
          newPassword: password,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TenditTextInput
          reference={preinput}
          label="Password attuale"
          secureTextEntry={passHidden}
          value={hePassword}
          autoCapitalize="none"
          hintError={hePasswordError}
          hintText={'Password non valida'}
          placehheer={'password'}
          onChangeText={(text) => sethePassword(text)}
          onSubmitEditing={() => input.current.focus()}
        />
        <TouchableOpacity onPress={() => setPassHidden(!passHidden)} style={styles.wrapper}>
          <Ionicons name={'ios-eye'} size={25} style={{ padding: 5 }} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.spacer}></View>
      <View>
        <TenditTextInput
          reference={input}
          label="Nuova password"
          secureTextEntry={passHidden}
          value={password}
          autoCapitalize="none"
          hintError={passwordError}
          hintText={'Invalid password'}
          placehheer={'password'}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={() => postInput.current.focus()}
        />
        <TouchableOpacity onPress={() => setPassHidden(!passHidden)} style={styles.wrapper}>
          <Ionicons name={'ios-eye'} size={25} style={{ padding: 5 }} color={'black'} />
        </TouchableOpacity>
      </View>
      <View>
        <TenditTextInput
          reference={postInput}
          label="Ripeti"
          value={rePassword}
          secureTextEntry={repassHidden}
          autoCapitalize="none"
          hintError={rePasswordError}
          hintText={'Password do not match'}
          placehheer={'password'}
          onChangeText={(text) => setRePassword(text)}
          onSubmitEditing={() => action()}
        />
        <TouchableOpacity onPress={() => setRePassHidden(!repassHidden)} style={styles.wrapper}>
          <Ionicons name={'ios-eye'} size={25} style={{ padding: 5 }} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    alignSelf: 'center',
    right: 25,
    top: 15,
  },
  spacer: { height: 25 },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  formContainer: {
    margin: 30,
    marginTop: isSmallDevice ? 20 : 40,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: isSmallDevice ? 10 : 7.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  spacer: { height: 20 },
});

UpdatePassword.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => <HeaderLeft navigation={navigation}></HeaderLeft>,
    title: '',
    headerRight: () => (
      <HeaderRight text={'Conferma'} onPress={() => navigation.getParam('action', null)()} />
    ),
  };
};
