import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import ItemsBlockVisit from "../../shared/components/ItemsBlockVisit";
import CompetenzeBlockVisit from "../../shared/components/CompetenzeBlockVisit";
import LocationWithText from "../../shared/components/LocationWithText";
import { Body, Light, Bold } from "../../shared/components/StyledText";
import Colors from "../../shared/constants/Colors";
import TenditSpinner from "../../shared/graphql/TenditSpinner";
import TenditErrorDisplay from "../../shared/graphql/TenditErrorDisplay";
import SocketContext from "../../shared/SocketContext";
import BioBlockVisit from "../../shared/components/Bio/BioBlockVisit";


const User = gql`
  query UserProfile($id: ID!) {
    User(id: $id) {
      id
      email
      nome
      cognome
      posizione
      pictureUrl
      comune
      regione
      provincia
      presentazione
      DoB
      formazioni {
        id
        link
        corso
        istituto
        dataFine
        dataInizio
        descrizione
      }
      esperienze {
        id
        link
        compagnia
        titolo
        dataFine
        dataInizio
        descrizione
      }
      progetti {
        id
        link
        sottoTitolo
        titolo
        dataFine
        dataInizio
        descrizione
      }
      competenze
    }
  }
`;

export function UserVisitProfile({ navigation, route }) {
  const id = route.params.id;
  const [modalVisbile, setModalVisible] = useState(false);
  const isRefetch = route.param?.refetch ?? false;
  const [showAll, setShowAll] = useState(false);
  console.log(id)
  const { loading, error, data, refetch } = useQuery(User, {
    variables: { id },
    fetchPolicy: "no-cache",
  });

  const Profilo = () => {
    return (
      <View style={styles.infoWrapper}>
        {<BioBlockVisit bio={data.User.presentazione}></BioBlockVisit>}
       {data.User.formazioni.length>0&& <View><ItemsBlockVisit onPress={() => navigation.navigate("FormazioniScreen",{formazioni:data.User.formazioni})} items={data.User.formazioni} title={"Formazioni"} />
        <View style={styles.separator}></View></View>}
        {data.User.esperienze.length>0&& <View><ItemsBlockVisit onPress={() => navigation.navigate("EsperienzeScreen",{esperienze:data.User.esperienze})} items={data.User.esperienze} title={"Esperienze"} />
        <View style={styles.separator}></View></View>}
        {data.User.competenze.length>0&&<View><CompetenzeBlockVisit
          competenze={data.User.competenze}
          onPress={() =>
            navigation.navigate("CompetenzeScreen", {
              competenze: data.User.competenze
            })
          }
        ></CompetenzeBlockVisit></View>}
      </View>
    );
  };

  useEffect(() => {
    isRefetch ? refetch() : null;
  }, [isRefetch]);

  useEffect(() => {
    navigation.setParams({ loading });
  }, [data]);
  if (loading) return <TenditSpinner />;
  const image = data.User.pictureUrl
    ? { uri: data.User.pictureUrl }
    : require("../../assets/images/placeholder.png");
  const images = [
    data.User.pictureUrl
      ? { url: data.User.pictureUrl }
      : { props: { source: require("../../assets/images/placeholder.png") } }
  ];
  const renderModal = () => {
    return <Modal
    visible={modalVisbile}
    transparent={false}
    onRequestClose={() => setModalVisible(false)}
  >
    <TouchableHighlight
      onPress={() => setModalVisible(false)}
      style={{
        backgroundColor: "black",
        justifyContent: "flex-end",
        alignItems: "flex-end"
      }}
    >
      <Ionicons
        name={"ios-close"}
        size={40}
        style={{ margin: 10, marginTop:40 }}
        color={"white"}
      ></Ionicons>
    </TouchableHighlight>
    <ImageViewer
      menus={({ cancel }) => (cancel ? setModalVisible(false) : null)}
      imageUrls={images}
    />
  </Modal>
  }
  if (error) return <TenditErrorDisplay />;

  return (
    <ScrollView>     
       <View style={styles.container}>
         {renderModal()}
      <View style={styles.userWrapper}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={image}
            style={{ width: 80, height: 80, borderRadius: 40, marginRight:10  }}
          />
        </TouchableOpacity> 
       <View>
      <Bold style={{ marginTop: 12, fontSize: 16 }}>
          {data.User.nome + " " + data.User.cognome}
        </Bold>
        {data.User.posizione && (
          <Body
            style={{
              marginTop: 5,
              marginBottom: -5,
              color: "#8E8E8E",
              fontSize: 12
            }}
          >
            {data.User.posizione}
          </Body>
        )}
           {data.User.comune && (
          <LocationWithText
            isLight
            points={16}
            fontSize={12}
            color={"black"}
            comune={data.User.comune}
            regione={data.User.regione}
          />
        )}
             </View>
             </View>
      <Profilo />
      </View>

    </ScrollView>
  );
}

const UserVisitProfileWS = props => (
  <SocketContext.Consumer>
    {socket => <UserVisitProfile {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default UserVisitProfileWS;

const styles = StyleSheet.create({
  userWrapper: {
    borderRadius:8,
    paddingTop: 20,
    paddingBottom: 50,
    marginLeft:10,
    marginRight:10,
    justifyContent: "center",
    flexDirection:"row",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor:"#FBFBFB"
  },
  tabText: {
    color: "#6E6E6E"
  },

  separator: {
    height: 5
  },

  infoWrapper: {

    minHeight: 500
  },
  flex: {
    flex: 1
  },
  bio: {
    marginLeft: 10,
    marginTop:40,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  tabButton: {
    padding: 10,
    height: "100%",
    alignItems: "center",
    paddingBottom: 15
  },
  tabButtonActive: {
    padding: 10,
    paddingBottom: 15,
    height: "100%",
    zIndex: 10,
    borderBottomColor: Colors.ocean,
    borderBottomWidth: 2
  },
  questionContainer: {
    backgroundColor: "#F2F2F2",
    minHeight: 500
  }
});
