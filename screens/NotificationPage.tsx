import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useSubscription } from "react-apollo";
import TenditSpinner from "../shared/graphql/TenditSpinner";
import TenditErrorDisplay from "../shared/graphql/TenditErrorDisplay";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import PostApplicationCard from "../shared/components/PostApplicationCard";

const NOTIFICHE_QUERY = gql`
  {
    currentUser {
      id
    }
    UserNotifiche {
      opened
      id
      createdAt
      from {
        id
        nome
        cognome
        pictureUrl
      }
      text
      type
    }
  }
`;

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function NotificationPage({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);

  const { data, loading, error, refetch } = useQuery(NOTIFICHE_QUERY);

  if (loading) {
    return <TenditSpinner></TenditSpinner>;
  }
  if (error) {
    return <TenditErrorDisplay></TenditErrorDisplay>;
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
    >
      {data.UserNotifiche.map(notifica => {
        const image = notifica.from.pictureUrl
          ? { uri: notifica.from.pictureUrl }
          : require("../assets/images/placeholder.png");
        if (notifica.type == "applicationPost") {
          return (
            <PostApplicationCard
              image={image}
              refetch={refetch}
              navigation={navigation}
              key={notifica.id}
              notifica={notifica}
            ></PostApplicationCard>
          );
        }
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4"
  }
});
