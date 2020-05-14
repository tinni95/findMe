import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { isSmallDevice } from "../../../shared/constants/Layout";
import { Bold, Light } from "../../../shared/components/StyledText";
import LocationWithText from "../../../shared/components/LocationWithText";
import PostInfo from "./PostInfo";
import * as Haptics from "expo-haptics";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import TenditSpinner from "../../../shared/graphql/TenditSpinner";
import TenditErrorDisplay from "../../../shared/graphql/TenditErrorDisplay";
import { sendNotification } from "../../../shared/functions/PushNotifications";
import { Alert } from "react-native";
import HeaderRightElimina from "../../../shared/components/HeaderRightElimina";
import RoundButtonEmpty from "../../../shared/components/RoundButtonEmpty";
import Colors from "../../../shared/constants/Colors";
import RoundButton from "../../../shared/components/RoundButton";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import HeaderLeft from "../../../shared/components/HeaderLeft";
import SocketContext from "../../../shared/SocketContext";
moment.locale("it");

const DELETEAPPLICATION_MUTATION = gql`
  mutation deleteApplication($id: ID!) {
    deleteApplication(id: $id) {
      id
    }
  }
`;


const DELETEPOST_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

const Post = gql`
  query PostScreenQuery($postId: ID!) {
 
    singlePost(id: $postId) {
      id
      comune
      data
      regione
      provincia
      categoria
      opened
      hidden
      budget
      id
      startTime
      endTime
      descrizione
      titolo
      requisiti
      postedBy {
        pictureUrl
        nome
        cognome
        id
        pushToken
      }
    }
    applicationUserForPosition(id: $postId) {
      to{
        id
      }
      id
    }
    currentUser {
      id
      nome
    }
  }
`;

 function PostScreen({ navigation, socket }) {

  const [isOwner,setIsOwner] = useState(false);

  const { loading, error, data ,refetch} = useQuery(Post, {
    variables: {
      postId: navigation.getParam("id",null)
    },
    onCompleted: async ({ currentUser, singlePost }) => {
      if(currentUser.id === singlePost.postedBy.id){
        setIsOwner(true)
      }
    },
    fetchPolicy: "no-cache"
  });

  const [deleteApplication] = useMutation(DELETEAPPLICATION_MUTATION, {
    onCompleted: async ({ deleteApplication }) => {
      alert("success");
    },
    onError: error => {
      if (error.toString().includes("Closed")) {
        alert("L'applicazione è stata chiusa, non puoi rimuovere la tua applicazione in questo momento")
      }
      else
      alert("Qualcosa è andato storto");
    }
  });

  const [deletePost] = useMutation(DELETEPOST_MUTATION);

  useEffect(() => {
    navigation.setParams({ deleteP , isOwner});
  }, [isOwner]);

  if (loading) return <TenditSpinner />;
  if (error) return <TenditErrorDisplay />;

  const deleteP = () => {
    // Works on both Android and iOS
    Alert.alert(
      "sei sicuro?",
      "sicuro che vuoi eliminare il post, definitivamente?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            deletePost({ variables: { id: navigation.getParam("id",null) } });
            navigation.getParam("onGoBack",null)()
            navigation.goBack();
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleRimuovi = () => {
    deleteApplication({
      variables: { id: data.applicationUserForPosition[0].id }
    })
      .then(() => {
        refetch();
      })
      .then(() => {
        sendNotification(
          data.singlePost.postedBy.pushToken,
          data.singlePost.titolo,
          data.currentUser.nome+" ha rimosso la sua applicazione per " + data.singlePost.titolo
        );
        Haptics.selectionAsync();
        socket.socket.emit("chat message",data.applicationUserForPosition[0].to.id)
      });
  };

  const handleApply = () => {
    navigation.navigate("ApplyScreen", {
      post:data.singlePost,
      refetch
    });
  }
  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.descriptionCard}>
        <Bold style={styles.title}>{data.singlePost.titolo}</Bold>
        <LocationWithText
          fontSize={14}
          style={styles.location}
          comune={data.singlePost.comune}
          regione={data.singlePost.regione}
        />
         <LinearGradient start={[0, 1]} end={[1, 0]} colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />
        <PostInfo
        navigation={navigation}
          user={data.singlePost.postedBy}
          isHidden={data.singlePost.hidden}
        />

        { data.singlePost.description&& <LinearGradient start={[0, 1]} end={[1, 0]} colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />}
         
       { data.singlePost.description&&<View style={styles.DesriptionContainer}>
          <Bold style={styles.titleSm}>Descrizione</Bold>
          <Light style={styles.body}>{data.singlePost.descrizione}</Light>
        </View>}
        

        <LinearGradient start={[0, 1]} end={[1, 0]} colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />
        <View style={styles.DesriptionContainer}>
        <Bold style={styles.titleSm}>Quando</Bold>
          <Light style={styles.body}> {data.singlePost.data? moment(data.singlePost.data).format("LL"):
          "Da definire"}</Light>
        </View>
        {data.singlePost.data&&
        <View style={styles.DesriptionContainer}>
        <Bold style={styles.titleSm}>Fascia Oraria</Bold>
        {data.singlePost.startTime || data.singlePost.endTime ?
        <Light>
          <Light style={styles.body}> {data.singlePost.startTime && "dalle "+ data.singlePost.startTime} </Light>
          <Light style={styles.body}> {data.singlePost.endTime && " alle "+ data.singlePost.endTime} </Light>
          </Light>
: <Light>Da definire</Light>}
        </View>
        }
         <LinearGradient start={[0, 1]} end={[1, 0]} colors={["#EBEBEB", "#FFFDFD"]} style={styles.line} />
         <View style={styles.DesriptionContainer}>
         <Bold style={styles.titleSm}>Budget</Bold>
         <Bold style={styles.titleSmGreen}>{data.singlePost.budget}</Bold>
         </View>
        <View style={styles.ButtonWrapper}>
          {!isOwner&&
              <RoundButton

                onPress={() =>
                  data.applicationUserForPosition.length > 0
                    ? handleRimuovi()
                    : handleApply()
                }
                text={
                  data.applicationUserForPosition.length > 0
                    ? "Rimuovi Candidatura"
                    : "Candidati"
                }
                textColor={"white"}
                color={Colors.red}
              />
}
          </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  descriptionCard: {
    backgroundColor: "white",
    borderBottomWidth: 10,
    borderBottomColor: "#F7F4F4"
  },
  image: {
    width: 200
  },
  title: {
    margin: 5,
    marginTop: 25,
    marginLeft: 5,
    marginRight: 10,
    fontSize: isSmallDevice ? 24 : 28
  },
  titleSm: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 15,
    color: "black"
  },
  titleSmGreen: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
    color: "green"
  },
  location: {
    marginLeft: 5,
    marginTop: 5
  },
  body: {
    fontSize: 14,
    marginTop: 5
  },
  DesriptionContainer: {
    margin: 5,
    marginLeft: 15,
    marginRight: 10,
    marginBottom: 20,
    marginTop:15
  },
  RequisitiContainer: {
    flexDirection: "row", flexWrap: "wrap", marginTop: 20 
  },
  line:{
    height:1.5,
    marginTop:15
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F7F4F4"
  },
  ButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 20
  }
})



const PostScreenWS = props => (
  <SocketContext.Consumer>
    {socket => <PostScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
);

PostScreenWS.navigationOptions = ({ navigation }) => {
  return {
    title:"",
    headerLeft: <HeaderLeft navigation={navigation}></HeaderLeft>,
    headerRight: () => navigation.getParam("isOwner",false)&&<HeaderRightElimina onPress={() =>navigation.getParam("deleteP",null)} />
  }
}

export default PostScreenWS