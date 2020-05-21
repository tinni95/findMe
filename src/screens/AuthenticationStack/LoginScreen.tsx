import React, { useEffect, useRef, useState } from "react";
import { View, AsyncStorage, StyleSheet, TouchableOpacity } from "react-native";
import { TOKEN_KEY } from "../../shared/constants/Token";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import TenditTextInput from "../../shared/components/TenditTextInput";
import HeaderRight from "../../shared/components/HeaderRight";
import Colors from "../../shared/constants/Colors";
import { Light } from "../../shared/components/StyledText";
import LoginContext from "../../shared/LoginContext";
import HeaderLeft from "../../shared/components/HeaderLeft";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function wait(timeout) {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

function LoginScreen({ context, navigation }) {
 
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState<any>("");
	const [password, setPassword] = useState<any>("");
	const [passwordError, setPasswordError] = useState<any>("");

	let preinput = useRef<any>();
	let input = useRef<any>();
	const [loginMutation] = useMutation(LOGIN_MUTATION, {
		onCompleted: async ({ login }) => {
			AsyncStorage.setItem(TOKEN_KEY, login.token).then(() => {
				context.login();
			});
		},
		onError: error => {
			if (error.toString().includes("password")) {
				setPasswordError(true);
			} else {
				setPasswordError(false);
			}
			if (error.toString().includes("user")) {
				setEmailError(true);
			} else {
				setEmailError(false);
			}
		}
	});

	useEffect(() => {
		navigation.setParams({login});
		wait(50).then(() => preinput.current.focus());
	}, []);

	useEffect(() => {
		navigation.setParams({ login });
	}, [email, password]);

	const login = () => {
		loginMutation({
			variables: {
				email: email.trim().toLowerCase(),
				password
			}
		});
	};

	return (
		<View style={styles.container}>
			<TenditTextInput
				reference={preinput}
				label="Email"
				autoCapitalize="none"
				value={email}
				hintError={emailError}
				hintText={"email non valida"}
				placeholder={"email"}
				onChangeText={text => setEmail(text)}
				onSubmitEditing={() => input.current.focus()}
			/>
			<TenditTextInput
				reference={input}
				label="Password"
				secureTextEntry={true}
				value={password}
				autoCapitalize="none"
				hintError={passwordError}
				hintText={"password non valida"}
				placeholder={"password"}
				onChangeText={text => setPassword(text)}
				onSubmitEditing={() => login()}
			/>
			<TouchableOpacity
				onPress={() => navigation.navigate("PasswordForgot", { email })}
				style={{ alignSelf: "flex-end", marginRight: 15, marginTop: 10 }}
			>
				<Light style={{ color: Colors.red }}>Password Dimenticata?</Light>
			</TouchableOpacity>
		</View>
	);
}

const LoginScreenWS = props => {
	return (
		<LoginContext.Consumer>
			{context => <LoginScreen {...props} context={context} />}
		</LoginContext.Consumer>
	);
};

LoginScreenWS.navigationOptions = ({ navigation }) => {
	return {
		headerLeft:() => <HeaderLeft navigation={navigation}/>,
		title:null,
		headerRight: () => <HeaderRight text={"Next"} onPress={() => navigation.getParam("login",null)()} />
	};
};

export default LoginScreenWS;

const styles = StyleSheet.create({
	container: {
		padding:15,
		flex: 1,
		backgroundColor: "white"
	}
});
