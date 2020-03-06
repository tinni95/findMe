import React, { useEffect } from "react";

import { StyleSheet, View, Image } from "react-native";
import { Body } from "../../shared/components/StyledText";
import Colors from "../../shared/constants/Colors";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import SocketContext from "../../shared/SocketContext";
import { wait } from "../../shared/functions/wait";

const UNOPENEDNOTIFICHE_QUERY = gql`
  {
    UnreadNotifiche {
      opened
    }
    currentUser {
      id
    }
  }
`;
const READNOTIFICA_MUTATION = gql`
  mutation {
    viewNotificas {
      count
    }
  }
`;

function NotificheIcon(props) {
  const [readNotifica] = useMutation(READNOTIFICA_MUTATION, {
    onCompleted: () => {
      refetch();
    }
  });
  const { loading, error, refetch, data } = useQuery(UNOPENEDNOTIFICHE_QUERY, {
    fetchPolicy: "no-cache"
  });
  const focused = props.focused;

  useEffect(() => {
    props.socket.on(
      "postnotifica",
      msg => {
        wait(500).then(() => refetch());
      },
      []
    );
  });

  if (loading) {
    return (
      <Image
        source={require("../../assets/images/Notification_empty.png")}
        style={{ width: 23, height: 28 }}
      ></Image>
    );
  }
  if (error) {
    return (
      <Image
        source={require("../../assets/images/Notification_empty.png")}
        style={{ width: 23, height: 28 }}
      ></Image>
    );
  }
  if (data) {
    return (
      <View style={data.UnreadNotifiche.length > 0 && styles.container}>
        {props.focused ? (
          <Image
            source={require("../../assets/images/Notification_full.png")}
            style={{ width: 23, height: 28 }}
          ></Image>
        ) : (
          <Image
            source={require("../../assets/images/Notification_empty.png")}
            style={{ width: 23, height: 28 }}
          ></Image>
        )}
        {data.UnreadNotifiche.length > 0 && (
          <View style={styles.counter}>
            <Body style={styles.text}>{data.UnreadNotifiche.length}</Body>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: -5
  },
  counter: {
    height: 13,
    width: 13,
    borderRadius: 6.5,
    marginLeft: -8,
    backgroundColor: Colors.red
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 9
  }
});

const NotificheIconWS = props => (
  <SocketContext.Consumer>
    {socket => <NotificheIcon {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default NotificheIconWS;

NotificheIcon.navigationOptions = ({ navigation }) => ({
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    console.log("this will be fired just before nagivation happens");
    defaultHandler(); // if you omit this, navigation will not happen
  }
});
