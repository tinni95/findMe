import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Body } from '../../components/StyledText';
import moment from 'moment/min/moment-with-locales';
moment.locale('it');

export default function ForumHeader({ createdAt }) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          source={require('../../../assets/images/Forum_notifica.png')}
          style={{ width: 10, height: 10, marginRight: 5 }}
        />
        <Body style={styles.text}>Forum</Body>
      </View>
      <Body style={styles.time}>{moment(createdAt).fromNow()}</Body>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  subContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#ACA7A7',
  },
  time: {
    fontSize: 11,
    color: '#ACA7A7',
  },
});
