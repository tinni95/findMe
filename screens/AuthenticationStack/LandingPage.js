import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Light } from '../../components/StyledText';
import RoundButtonEmptyLarge from '../../components/shared/RoundButtonEmptyLarge';
import Colors from "../../constants/Colors"

export const LandingPage = ({ navigation: { navigate }, screenProps }) => {

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/Logo_Home_FINDME.png')}
          resizeMode="contain"
        />
        <Light style={styles.heading}>Inspire your life</Light>
      </View>
      <View style={styles.buttonsWrapper}>
        <RoundButtonEmptyLarge
          isMedium
          textColor={Colors.blue}
          color={Colors.blue}
          onPress={() => navigate('SignUpScreen')}
          text="Iscriviti"
        />
        <View style={{ height: 20 }}></View>
        <RoundButtonEmptyLarge
          isMedium
          textColor={Colors.red}
          color={"white"}
          onPress={() => navigate('LoginScreen')}
          text="Accedi"
        />
      </View>
    </View>
  );
};

LandingPage.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8
  },
  logo: {
    alignItems: 'center',
    width: 280,
    height: 100,
  },
  heading: {
    fontSize: 18,
  },
  buttonsWrapper: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

});
