import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { width } from '../../constants/Layout';
import { Light, Bold } from '../../components/StyledText';
import RoundButtonEmpty from '../../components/shared/RoundButtonEmpty';
import RoundButton from '../../components/shared/RoundButton';

export default LandingPage = ({ navigation: { navigate } }) => {
  return (
    <LinearGradient
      colors={['#0F406A', '#6D90AD']}
      style={{
        flex: 1
      }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.header}
            source={require('../../assets/images/fmlogo.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonsWrapper}>
          <Light style={styles.register}>Registrati</Light>
          <View style={styles.roundButtons}>
            <RoundButtonEmpty
              fontColor="white"
              color="#5EDDDC"
              onPress={() => navigate('SignUpScreenUser')}
              text="Sono Un Utente"
            />
            <RoundButtonEmpty
              fontColor="white"
              color="#5EDDDC"
              onPress={() => navigate('SignUpScreenCompany')}
              text="Sono Un Azienda"
            />
          </View>
        </View>
        <View style={styles.buttonFooterWrapper}>
          <Light style={styles.register}>Hai già un account?</Light>
          <View style={styles.roundButtons}>
            <RoundButton onPress={() => navigate('LoginScreen')} color="#DD1E63" text="Accedi" />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

LandingPage.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2
  },
  header: {
    alignItems: 'center',
    width: 280
  },
  buttonsWrapper: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttonFooterWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  loginWrapper: {
    marginTop: 20
  },
  loginPrompt: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 20
  },
  register: {
    color: 'white',
    fontSize: 21
  },
  roundButtons: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
    width,
    justifyContent: 'center'
  }
});
