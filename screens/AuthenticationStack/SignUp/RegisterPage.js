import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { isSmallDevice } from '../../../constants/Layout';
import TenditTextInput from '../../../components/TenditTextInput';
import HeaderRight from '../../../components/HeaderRight';
import HeaderLeft from '../../../components/HeaderLeft';

export default function RegisterPage({ navigation }) {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [nameError, setNameError] = useState(false)
    const [surnameError, setSurnameError] = useState("")
    let preinput = useRef();
    let input = useRef();

    useEffect(() => {
        preinput.current.focus()
    }, [])


    useEffect(() => {
        navigation.setParams({ login })
    }, [name, surname])

    const login = () => {
        if (name.length == 0) {
            setNameError(true)
        }
        else {
            setNameError(false)
        }
        if (surname.length == 0) {
            setSurnameError(true)
        }
        else {
            setSurnameError(false)
        }
        if (name.length > 0 && surname.length > 0) {
            navigation.navigate("EmailPage", { user: { nome: name, cognome: surname } })
        }
    }

    return (
        <View style={styles.container}>
            <TenditTextInput
                reference={preinput}
                label='first name'
                value={name}
                hintError={nameError}
                hintText={"Empty field"}
                placeholder={"first name"}
                onChangeText={text => setName(text)}
                onSubmitEditing={() => input.current.focus()}
            />
            <TenditTextInput
                reference={input}
                label='last name'
                value={surname}
                hintError={surnameError}
                hintText={"Empty field"}
                placeholder={"last name"}
                onChangeText={text => setSurname(text)}
                onSubmitEditing={() => login()}
            />
        </View>
    );
}

RegisterPage.navigationOptions = ({ navigation }) => {
    return {
        headerRight:
            (<HeaderRight text={"Next"} onPress={() => navigation.getParam("login")()} />),
        headerLeft:
            (<HeaderLeft navigation={navigation} />
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10
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
        margin: 30,
        marginTop: isSmallDevice ? 20 : 40,
        justifyContent: 'center'
    },
    buttonsContainer: {
        flex: isSmallDevice ? 10 : 7.5,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    spacer: { height: 20 }
});
