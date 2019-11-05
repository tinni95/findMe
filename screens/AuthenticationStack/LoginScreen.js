import React ,{useState}from 'react';
import { View, Image,Text, TextInput, AsyncStorage, StyleSheet } from 'react-native';
import AvoidingView from './AvoidingView';
import { TOKEN_KEY } from '../../shared/Token';
import RoundButton from '../../components/shared/RoundButtonSignUpScreen';
import { isSmallDevice } from '../../constants/Layout';
import {FormStyles} from './FormStyles';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import FindMeSpinner from "../../shared/FindMeSpinner";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password:$password) {
        token
    }
  }
`;

export default function LoginScreen ({navigation}) {
    const [
        login,
        { loading: mutationLoading, error: mutationError,error,data },
      ] = useMutation(LOGIN_MUTATION,
        {
            onCompleted: async ({ login }) => {
                await AsyncStorage.setItem(TOKEN_KEY, login.token);
                navigation.navigate("MainTabNavigator")
            }
          });
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const emailError=mutationError && error.message.toString().includes("user");
      const passwordError=mutationError && error.message.toString().includes("password");
        
        return (
            mutationLoading ? 
            <FindMeSpinner/>
            :
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={emailError?FormStyles.inputError : FormStyles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
                    />
                {emailError &&
                <Text style={FormStyles.error}>email invalida</Text>
                }
                    <TextInput
                        style={passwordError?FormStyles.inputError : FormStyles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={password => setPassword(password)}
                    />
                       {passwordError &&
                <Text style={FormStyles.error}>password invalida</Text>
                }
                </View>
                <View style={styles.buttonsContainer}>
                    <RoundButton
                        onPress={() => {
                            let emails = email.toString().toLowerCase();
                            login({variables: { email:emails,password}});
                        }}
                        isLong
                        fontColor="#DD1E63"
                        text="ACCEDI"
                        color="#DD1E63"
                    />
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20
    },
    formContainer: {
        margin: isSmallDevice ? 30 : 40,
        marginTop: isSmallDevice ? 40 : 60,
        justifyContent: 'center'
    },
    buttonsContainer: {
        flex: isSmallDevice ? 10 : 7.5,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
