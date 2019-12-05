import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, AsyncStorage, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { TOKEN_KEY } from '../../shared/Token';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FindMeSpinner from "../../shared/FindMeSpinner"
import FindMeGraphQlErrorDisplay from "../../shared/FindMeSpinner"
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { Bold } from '../../components/StyledText';
import LocationWithText from '../../components/shared/LocationWithText';
import ImageViewer from 'react-native-image-zoom-viewer';
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
  const [modalVisbile, setModalVisible] = useState(false)
  const { loading, error, data } = useQuery(User);
  const image = "http://hwattsup.website/AppBackEnd/images/placeholder.jpeg";
  const images = [{ url: image }]
  if (loading) return <FindMeSpinner />;
  if (error) return <FindMeGraphQlErrorDisplay />;

  const logout = async () => {
    AsyncStorage.removeItem(TOKEN_KEY).then(() => {
      screenProps.changeLoginState();
    })
  }
  console.log(data)
  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        </TouchableOpacity>
        <Modal
          visible={modalVisbile}
          transparent={false}
          onRequestClose={() => setModalVisible(false)}>
          <TouchableHighlight onPress={() => setModalVisible(false)} style={{ backgroundColor: "black", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Ionicons
              name={"ios-close"}
              size={40}
              style={{ margin: 10 }}
              color={"white"}
            ></Ionicons>
          </TouchableHighlight>
          <ImageViewer menus={({ cancel }) => cancel ? setModalVisible(false) : null} imageUrls={images} />
        </Modal>
        <Bold style={{ marginTop: 10, fontSize: 18 }}>{data.currentUser.nome + " " + data.currentUser.cognome}</Bold>
        <LocationWithText comune={data.currentUser.locationString.split(",")[0]} regione={data.currentUser.locationString.split(",")[2]} />
      </View>
      <View style={styles.infoWrapper}></View>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1.5
  },
  infoWrapper: { flex: 2 }
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
