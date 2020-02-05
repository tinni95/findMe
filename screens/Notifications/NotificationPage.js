import React from 'react'
import HeaderStyles from '../shared/HeaderStyles';
import { gql } from 'apollo-boost';
import { useQuery, useSubscription } from 'react-apollo';
import FindMeSpinner from '../../shared/FindMeSpinner';
import FindMeGraphQlErrorDisplay from '../../shared/FindMeGraphQlErrorDisplay';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import QuestionLikeCard from './QuestionLikeCard';
import QuestionAnswerCard from './QuestionAnswerCard';
import ConnessioneRequestCard from './ConnessioneRequestCard';
import { useEffect } from 'react';


const NOTIFICHE_QUERY = gql`
{   
    currentUser{
        id
    }
    UserNotifiche{
        opened
        id
        createdAt
        from{
            id
            nome
            cognome
            pictureUrl
        }
      text
      type
      answer{
        question{
          id
        }
      }
      question{
          id
      }
      connessione{
          id
      }
    }
  }
`
const NOTIFICA_SUBSCRIPTION = gql`
subscription notificaReceivedSub($id:ID!){
    notificaReceivedSub(id:$id){
        updatedFields
    }
  }`;

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}


export default function NotificationPage({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch()
        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    const { data, loading, error, refetch } = useQuery(NOTIFICHE_QUERY)

    if (loading) {
        return <FindMeSpinner></FindMeSpinner>
    }
    if (error) {
        return <FindMeGraphQlErrorDisplay></FindMeGraphQlErrorDisplay>
    }
    return <ScrollView
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.container}>
        {
            data.UserNotifiche.map(notifica => {
                const image = notifica.from.pictureUrl ? { uri: notifica.from.pictureUrl } : require("../../assets/images/placeholder.png")
                if (notifica.type == "questionLike") {
                    return <QuestionLikeCard image={image} refetch={refetch} navigation={navigation} key={notifica.id} notifica={notifica}></QuestionLikeCard>
                }
                else if (notifica.type == "questionAnswer") {
                    return <QuestionAnswerCard image={image} refetch={refetch} navigation={navigation} key={notifica.id} notifica={notifica}></QuestionAnswerCard>
                }
                else if (notifica.type == "connessioneRequest") {
                    return <ConnessioneRequestCard image={image} refetch={refetch} navigation={navigation} key={notifica.id} notifica={notifica}></ConnessioneRequestCard>
                }
                else if (notifica.type == "applicationPost") {
                    return <QuestionLikeCard image={image} refetch={refetch} navigation={navigation} key={notifica.id} notifica={notifica}></QuestionLikeCard>
                }
            })
        }
    </ScrollView>
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F4F4"
    }
})
NotificationPage.navigationOptions = {
    headerStyle: HeaderStyles.headerStyle,
    headerTitleStyle: HeaderStyles.headerTitleStyle,
    title: "Notifiche"
};