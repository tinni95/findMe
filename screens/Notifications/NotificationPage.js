import React from 'react'
import { Light } from '../../components/StyledText'
import HeaderStyles from '../shared/HeaderStyles';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import FindMeSpinner from '../../shared/FindMeSpinner';
import FindMeGraphQlErrorDisplay from '../../shared/FindMeGraphQlErrorDisplay';
import { StyleSheet, View, Image } from 'react-native';
import QuestionLikeCard from './QuestionLikeCard';
import QuestionAnswerCard from './QuestionAnswerCard';

const NOTIFICHE_QUERY = gql`
{
    UserNotifiche{
        id
        createdAt
        from{
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

export default function NotificationPage({ navigation }) {
    const { data, loading, error, refetch } = useQuery(NOTIFICHE_QUERY)
    if (loading) {
        return <FindMeSpinner></FindMeSpinner>
    }
    if (error) {
        return <FindMeGraphQlErrorDisplay></FindMeGraphQlErrorDisplay>
    }
    return <View style={styles.container}>
        {
            data.UserNotifiche.map(notifica => {
                if (notifica.type == "questionLike") {
                    return <QuestionLikeCard navigation={navigation} key={notifica.id} notifica={notifica}></QuestionLikeCard>
                }
                else if (notifica.type == "questionAnswer") {
                    return <QuestionAnswerCard navigation={navigation} key={notifica.id} notifica={notifica}></QuestionAnswerCard>
                }
            })
        }
    </View>
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