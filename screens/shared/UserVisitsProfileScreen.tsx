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
import { RoundButtonEmptyIconInverted } from "../../shared/components/RoundButtonEmptyIcon";
import RoundButtonEmpty from "../../shared/components/RoundButtonEmpty";
import SocketContext from "../../shared/SocketContext";

const SENDREQUEST_MUTATION = gql`
  mutation sendRequest($subId: ID!) {
    createConnessione(subId: $subId) {
      id
      pub {
        nome
        id
      }
      sub {
        nome
        id
      }
    }
  }
`;

const CREATENOTIFICA_MUTATION = gql`
  mutation createNotifica(
    $connessioneId: ID!
    $text: String!
    $type: String!
    $id: ID!
  ) {
    createNotifica(
      connessioneId: $connessioneId
      text: $text
      type: $type
      id: $id
    ) {
      id
    }
  }
`;

const ACCEPTREQUEST_MUTATION = gql`
  mutation acceptRequest($id: ID!) {
    acceptConnessione(id: $id) {
      id
    }
  }
`;

const DELETEREQUEST_MUTATION = gql`
  mutation deleteRequest($id: ID!) {
    deleteConnessione(id: $id) {
      id
    }
  }
`;

const User = gql`
  query UserProfile($id: ID!) {
    Connessioni {
      id
      pub {
        id
        nome
        cognome
        regione
        comune
        presentazione
      }
      sub {
        id
        nome
        cognome
        regione
        comune
        presentazione
      }
    }
    ConnessioniReceivedFromUser(id: $id) {
      id
    }
    ConnessioniSentToUser(id: $id) {
      id
    }
    ConnessioniWithUser(id: $id) {
      id
    }
    ChatBetweenUsers(id: $id) {
      id
      pub {
        id
      }
      sub {
        id
      }
    }
    currentUser {
      nome
      cognome
      id
    }
    User(id: $id) {
      id
      answers {
        comments {
          id
        }
        postedBy {
          nome
          cognome
        }
        question {
          title
          id
          postedBy {
            nome
            id
            cognome
          }
          createdAt
          question
        }
        text
        id
      }
      questions {
        title
        id
        question
        postedBy {
          nome
          cognome
        }
        createdAt
        answers {
          id
        }
      }
      email
      nome
      cognome
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

export function UserVisitProfile({ navigation, socket, route }) {
  const id = route.params.id;
  const userId = route.params.userId;
  const [createNotifica] = useMutation(CREATENOTIFICA_MUTATION);
  const [sendRequest] = useMutation(SENDREQUEST_MUTATION, {
    onCompleted: ({ createConnessione }) => {
      setRequestId(createConnessione.id);
      createNotifica({
        variables: {
          type: "connessioneRequest",
          connessioneId: createConnessione.id,
          id,
          text:
            data.currentUser.nome +
            " " +
            data.currentUser.cognome +
            " ha richiesto di connettersi"
        }
      });
      socket.emit("notifica", userId);
      refetch();
    }
  });
  const [deleteRequest] = useMutation(DELETEREQUEST_MUTATION, {
    onCompleted: () => {
      refetch();
    }
  });
  const [acceptRequest] = useMutation(ACCEPTREQUEST_MUTATION, {
    onCompleted: () => {
      refetch();
    }
  });
  const [requestId, setRequestId] = useState("");
  const [modalVisbile, setModalVisible] = useState(false);
  const isRefetch = route.param?.refetch ?? false;
  const [showAll, setShowAll] = useState(false);

  const { loading, error, data, refetch } = useQuery(User, {
    variables: { id },
    fetchPolicy: "no-cache",
    onCompleted: async result => {
      console.log(result.User.esperienze);
      console.log("result", result.ChatBetweenUsers);
      if (result.ChatBetweenUsers[0]) {
        navigation.setParams({ chatId: result.ChatBetweenUsers[0].id });
      }
      if (result.ConnessioniReceivedFromUser.length > 0) {
        setRequestId(result.ConnessioniReceivedFromUser[0].id);
      } else if (result.ConnessioniSentToUser.length > 0) {
        setRequestId(result.ConnessioniSentToUser[0].id);
      }
    }
  });

  const InviaRichiesta = () => {
    sendRequest({ variables: { subId: id } });
  };

  const CancellaRichiesta = () => {
    deleteRequest({ variables: { id: requestId } });
  };

  const AccettaRichiesta = () => {
    acceptRequest({ variables: { id: requestId } });
  };
  const Profilo = () => {
    return (
      <View style={styles.infoWrapper}>
        <ItemsBlockVisit items={data.User.formazioni} title={"Formazione"} />
        <View style={styles.separator}></View>
        <ItemsBlockVisit items={data.User.esperienze} title={"Esperienze"} />
        <View style={styles.separator}></View>
        <ItemsBlockVisit items={data.User.progetti} title={"Progetti"} />
        <View style={styles.separator}></View>
        <CompetenzeBlockVisit
          competenze={data.User.competenze}
          onPress={() =>
            navigation.navigate("CompetenzeScreen", {
              competenze: data.User.competenze
            })
          }
        ></CompetenzeBlockVisit>
        <View style={styles.separator}></View>
      </View>
    );
  };

  useEffect(() => {
    isRefetch ? refetch() : null;
  }, [isRefetch]);

  useEffect(() => {
    navigation.setParams({ loading });
    if (
      !loading &&
      data.ChatBetweenUsers.length > 0 &&
      data.ChatBetweenUsers[0]
    ) {
      navigation.setParams({ chatId: data.ChatBetweenUsers[0].id });
    }
    if (!loading) {
      navigation.setParams({
        user: data.User,
        userId: data.currentUser.id,
        isSub: false
      });
    }
  }, [data]);
  if (loading || !id || !userId) return <TenditSpinner />;
  const image = data.User.pictureUrl
    ? { uri: data.User.pictureUrl }
    : require("../../assets/images/placeholder.png");
  const images = [image];
  if (error) return <TenditErrorDisplay />;

  return (
    <ScrollView>
      <View style={styles.userWrapper}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={image}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </TouchableOpacity>
        <Modal
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
              style={{ margin: 10 }}
              color={"white"}
            ></Ionicons>
          </TouchableHighlight>
          <ImageViewer
            menus={({ cancel }) => (cancel ? setModalVisible(false) : null)}
            imageUrls={images}
          />
        </Modal>
        <Bold style={{ marginTop: 10, fontSize: 18 }}>
          {data.User.nome + " " + data.User.cognome}
        </Bold>
        {data.User.comune && (
          <LocationWithText
            points={16}
            fontSize={12}
            comune={data.User.comune}
            regione={data.User.regione}
          />
        )}
        <View style={{ height: 20 }}></View>
        {id != userId &&
          ((data.ConnessioniSentToUser.length == 0 &&
            data.ConnessioniReceivedFromUser.length == 0 &&
            data.ConnessioniWithUser.length == 0 && (
              <RoundButtonEmpty
                onPress={() => InviaRichiesta()}
                color={Colors.blue}
                isMedium
                text={"  +   Segui  "}
              />
            )) ||
            (data.ConnessioniSentToUser.length > 0 && (
              <RoundButtonEmpty
                color={Colors.blue}
                isMedium
                onPress={() => CancellaRichiesta()}
                text={"  Richiesta Inviata  "}
              />
            )) ||
            (data.ConnessioniWithUser.length > 0 && (
              <RoundButtonEmpty
                color={Colors.blue}
                onPress={() => CancellaRichiesta()}
                isMedium
                text={"  Connesso  "}
              />
            )) ||
            (data.ConnessioniReceivedFromUser.length > 0 && (
              <RoundButtonEmpty
                onPress={() => AccettaRichiesta()}
                color={Colors.blue}
                isMedium
                text={"  Accetta Richiesta  "}
              />
            )))}
        <View style={{ height: 20 }}></View>
      </View>
      {data.User.presentazione && (
        <View style={styles.bio}>
          <Body style={{ color: Colors.blue, marginLeft: 10 }}>Bio</Body>
          {data.User.presentazione.length < 75 || showAll ? (
            <Light style={{ textAlign: "left", margin: 10 }}>
              {data.User.presentazione}
            </Light>
          ) : (
            <Text style={{ textAlign: "left", margin: 10 }}>
              <Light>{data.User.presentazione.slice(0, 75)}</Light>
              <Bold onPress={() => setShowAll(true)}> ...Altro</Bold>
            </Text>
          )}
        </View>
      )}
      <Profilo />
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
  container: {
    flex: 1
  },
  tabText: {
    color: "#6E6E6E"
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "lightgrey"
  },
  separator: {
    height: 30
  },
  userWrapper: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  infoWrapper: {
    margin: 20,
    minHeight: 500
  },
  flex: {
    flex: 1
  },
  bio: {
    marginLeft: 10,
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
