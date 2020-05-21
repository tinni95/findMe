import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { isSmallDevice } from '../../../shared/constants/Layout';
import { Bold, Light } from '../../../shared/components/StyledText';
import LocationWithText from '../../../shared/components/LocationWithText';
import PostInfo from './PostInfo';
import RoundButtonEmpty from '../../../shared/components/RoundButtonEmpty';
import Colors from '../../../shared/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment/min/moment-with-locales';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import TenditSpinner from '../../../shared/graphql/TenditSpinner';
moment.locale('it');

const User = gql`
  {
    currentUser {
      id
      nome
      cognome
      pictureUrl
    }
  }
`;

export default function PostScreenConfirm({ navigation, hidden, post }) {
  const { data, loading } = useQuery(User);
  if (loading) return <TenditSpinner></TenditSpinner>;
  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.descriptionCard}>
        <Bold style={styles.title}>{post.titolo}</Bold>
        <LocationWithText
          fontSize={14}
          style={styles.location}
          comune={post.comune}
          regione={post.regione}
        />
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={['#EBEBEB', '#FFFDFD']}
          style={styles.line}
        />
        <PostInfo
          navigation={navigation}
          user={data.currentUser}
          settori={post.categoria}
          isHidden={hidden}
        />
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={['#EBEBEB', '#FFFDFD']}
          style={styles.line}
        />
        <View style={styles.DesriptionContainer}>
          <Bold style={styles.titleSm}>Descrizione</Bold>
          <Light style={styles.body}>{post.descrizione}</Light>
        </View>
        <View style={styles.DesriptionContainer}>
          <Bold style={styles.titleSm}>Requisiti</Bold>
          <View style={styles.RequisitiContainer}>
            {post.requisiti ? (
              post.requisiti.map((requisito) => {
                return <RoundButtonEmpty onPress={null} color={Colors.blue} text={requisito} />;
              })
            ) : (
              <Light>NS</Light>
            )}
          </View>
        </View>
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={['#EBEBEB', '#FFFDFD']}
          style={styles.line}
        />
        <View style={styles.DesriptionContainer}>
          <Bold style={styles.titleSm}>Quando</Bold>
          <Light style={styles.body}>
            {' '}
            {post.data ? moment(post.data).format('LL') : 'Da definire'}
          </Light>
        </View>
        {post.data && (
          <View style={styles.DesriptionContainer}>
            <Bold style={styles.titleSm}>Fascia Oraria</Bold>
            {post.startTime || post.endTime ? (
              <Light>
                <Light style={styles.body}> {post.startTime && 'dalle ' + post.startTime} </Light>
                <Light style={styles.body}> {post.endTime && ' alle ' + post.endTime} </Light>
              </Light>
            ) : (
              <Light>Da definire</Light>
            )}
          </View>
        )}
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={['#EBEBEB', '#FFFDFD']}
          style={styles.line}
        />
        <View style={styles.DesriptionContainer}>
          <Bold style={styles.titleSm}>Budget</Bold>
          <Bold style={styles.titleSmGreen}>{post.budget}</Bold>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  descriptionCard: {
    backgroundColor: 'white',
  },
  image: {
    width: 200,
  },
  title: {
    margin: 5,
    marginTop: 25,
    marginLeft: 5,
    marginRight: 10,
    fontSize: isSmallDevice ? 24 : 28,
  },
  titleSm: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
    color: 'black',
  },
  titleSmGreen: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
    color: 'green',
  },
  location: {
    marginLeft: 5,
    marginTop: 5,
  },
  body: {
    fontSize: 14,
    marginTop: 5,
  },
  DesriptionContainer: {
    margin: 5,
    marginLeft: 15,
    marginRight: 10,
    marginBottom: 20,
    marginTop: 15,
  },
  RequisitiContainer: {
    margin: 10,
    marginLeft: 0,
  },
  line: {
    height: 1.5,
    marginTop: 15,
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#F7F4F4',
  },
  ButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 20,
  },
});
