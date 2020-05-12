import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import SettingsButton from "../../../shared/components/SettingsButton";
import { Bold } from "../../../shared/components/StyledText";
import Colors from "../../../shared/constants/Colors";
import LoginContext from "../../../shared/LoginContext";
import AccountStatus from "../../../shared/components/AccountStatus";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo";
import TenditSpinner from "../../../shared/graphql/TenditSpinner";
import { Ionicons } from "@expo/vector-icons";
const USER_STATUS = gql`
  {
    currentUser {
      email
      isVerified
    }
  }
`;

const DELETE_USER_MUTATION = gql`
mutation{
  deleteUser{
    id
  }
}
`;

const SEND_EMAIL_MUTATION = gql`
mutation{
  resendEmail{
    id
  }
}
`;

function SettingsScreen({ navigation, route, context }) {
  const { data, loading, refetch } = useQuery(USER_STATUS, {
    fetchPolicy: "no-cache"
  });
  const [deleteUser] = useMutation(DELETE_USER_MUTATION,{
    onCompleted:() => {            context.logout();},
    onError: () => {alert("oops... si è verificato un errore")}
  })
  const [sendEmail] = useMutation(SEND_EMAIL_MUTATION,{
    onCompleted:() => { alert("email invitata")},
    onError: () => {alert("oops... si è verificato un errore")}
  })
  const [refreshing, setRefreshing] = useState(false);
  const isRefetch = navigation.getParam("refetch",null)
  useEffect(() => {
    isRefetch ? onRefresh() : null;
  }, [isRefetch]);

  const onRefresh = async () => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  };
  const deleteAccount = () => {
    // Works on both Android and iOS
    Alert.alert(
      "Sei sicuro?",
      "sicuro che vuoi eliminare il tuo account?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            deleteUser()
          }
        }
      ],
      { cancelable: false }
    );
  };
  if (loading) {
    return <TenditSpinner></TenditSpinner>;
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
    >
      <AccountStatus onPress={ ()=> sendEmail()}currentUser={data.currentUser} />
      <View style={styles.spacer} />
      <Bold style={styles.sectionTitle}>IMPOSTAZIONI ACCOUNT</Bold>
      <SettingsButton
        onPress={() => navigation.navigate("UpdatePassword")}
        text={"Cambia password"}
      />
      <SettingsButton
        onPress={() =>
          navigation.navigate("UpdateEmail", { onGoBack: () => refetch() })
        }
        text={"Cambia e-mail"}
      />
      <View style={styles.spacer} />
      <Bold style={styles.sectionTitle}>INFO</Bold>
      <SettingsButton
        onPress={() => navigation.navigate("CambiaPassword")}
        text={"Privacy policy"}
      />
      <SettingsButton
        onPress={() => navigation.navigate("About")}
        text={"Riguardo Tendit"}
      />
      <View style={styles.spacer} />
      <Bold style={styles.sectionTitle}>ELIMINA ACCOUNT</Bold>
      <SettingsButton
        onPress={ () => deleteAccount()}
        text={"Elimina account"}
        color={Colors.red}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb"
  },
  spacer: {
    height: 25
  },
  sectionTitle: {
    color: "#5D5151",
    fontSize: 11,
    margin: 10,
    marginBottom: 15
  }
});

const SettingsScreenWC = props => {
  return (
    <LoginContext.Consumer>
      {context => <SettingsScreen {...props} context={context} />}
    </LoginContext.Consumer>
  );
};



SettingsScreenWC.navigationOptions = ({ navigation }) => {
  return {
 
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons
          name={"ios-menu"}
          size={25}
          style={{ marginLeft: 10 }}
          color={Colors.blue}
        ></Ionicons>
      </TouchableOpacity>
    )
  }
}

export default SettingsScreenWC;