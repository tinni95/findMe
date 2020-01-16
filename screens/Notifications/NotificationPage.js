import React from 'react'
import { Light } from '../../components/StyledText'
import HeaderStyles from '../shared/HeaderStyles';
import { gql } from 'apollo-boost';
import { useQuery, useSubscription } from 'react-apollo';
import FindMeSpinner from '../../shared/FindMeSpinner';
import FindMeGraphQlErrorDisplay from '../../shared/FindMeGraphQlErrorDisplay';
import { StyleSheet, ScrollView } from 'react-native';
import QuestionLikeCard from './QuestionLikeCard';
import QuestionAnswerCard from './QuestionAnswerCard';
import ConnessioneRequestCard from './ConnessioneRequestCard';

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

export default function NotificationPage({ navigation }) {
    const { data, loading, error, refetch } = useQuery(NOTIFICHE_QUERY)
    const subscription = useSubscription(
        NOTIFICA_SUBSCRIPTION,
        {
            variables: { id: !loading && data.currentUser.id },
            onSubscriptionData: () => {
                refetch()
            }
        }
    );
    if (loading) {
        return <FindMeSpinner></FindMeSpinner>
    }
    if (error) {
        return <FindMeGraphQlErrorDisplay></FindMeGraphQlErrorDisplay>
    }
    return <ScrollView style={styles.container}>
        {
            data.UserNotifiche.map(notifica => {
                if (notifica.type == "questionLike") {
                    return <QuestionLikeCard refetch={refetch} navigation={navigation} key={notifica.id} notifica={notifica}></QuestionLikeCard>
                }
                else if (notifica.type == "questionAnswer") {
                    return <QuestionAnswerCard refetch={refetch} navigation={navigation} key={notifica.id} notifica={notifica}></QuestionAnswerCard>
                }
                else if (notifica.type == "connessioneRequest") {
                    return <ConnessioneRequestCard refetch={refetch} navigation={navigation} key={notifica.id} notifica={notifica}></ConnessioneRequestCard>
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