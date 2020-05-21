import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Body, Light } from '../StyledText';
import { useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import PostHeader from './PostHeader';

const OPENNOTIFICA_MUTATION = gql`
  mutation openNotificaMutation($notificaId: ID!) {
    openNotifica(notificaId: $notificaId) {
      id
    }
  }
`;
export default function PostApplicationCard({ image, refetch, notifica, navigation }) {
  const [openNotifica] = useMutation(OPENNOTIFICA_MUTATION);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AttivitàScreen', { onGoBack: () => refetch() });
        openNotifica({ variables: { notificaId: notifica.id } });
      }}
      style={[styles.container, { backgroundColor: notifica.opened ? 'white' : null }]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={{ width: 40, height: 40, borderRadius: 20 }} />
      </View>
      <View style={styles.contentContainer}>
        <PostHeader createdAt={notifica.createdAt} />
        <Body style={styles.title}>{'qualcuno si è applicato al tuo post idea'}</Body>
        <Light style={styles.text}>{notifica.text}</Light>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'baseline',
    minHeight: 80,
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: '#C6BEBE',
  },
  imageContainer: {
    margin: 10,
    flex: 1,
  },
  contentContainer: {
    flex: 8,
    margin: 10,
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
});
