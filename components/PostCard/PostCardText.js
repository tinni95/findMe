import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import LocationWithText from '../shared/LocationWithText';
import { Bold, Body } from '../StyledText';
import { isSmallDevice } from '../../constants/Layout';


const titleLimit = 50;

const fixOverflow = (text, limit) => {
  {
    return text.length > limit ? `${text.substring(0, limit - 3)}...` : text;
  }
};
const MainText = ({ nome, cognome, hidden, fields }) => {
  return (
    <View style={styles.mainTextContainer}>
      <View style={styles.mainTextColumn}>
        <Bold style={styles.columnHeader}>PubblicatoDa</Bold>
        <Bold style={styles.columnBody}>{hidden ? nome + " " + cognome.substring(0, 1) + "." : nome + " " + cognome}</Bold>
      </View>
      <View style={styles.mainTextColumn}>
        <Bold style={styles.columnHeader}>Settore</Bold>
        <Bold style={styles.columnBody}>{fixOverflow(fields, 15)}</Bold>
      </View>
      <View style={styles.mainTextColumn}>
        <Bold style={styles.columnHeader}>Età</Bold>
        <Bold style={styles.columnBody}>24</Bold>
      </View>
    </View>
  );
};

export const PostCardText = ({ post }) => {
  return (
    <View style={styles.container}>
      <Bold style={styles.title}>{fixOverflow(post.title, titleLimit)}</Bold>
      <LocationWithText
        style={styles.location}
        comune={post.comune}
        regione={post.regione}
        color="#DD1E63"
        textColor="#ADBFC5"
      />
      {MainText({ nome: post.postedBy.nome, cognome: post.postedBy.cognome, hidden: post.hidden, fields: post.fields })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 4,
    margin: 5,
    marginLeft: 10
  },
  title: {
    fontSize: isSmallDevice ? 16 : 18
  },
  mainTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mainTextColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  columnHeader: {
    fontSize: 7,
    color: '#ADADAD'
  },
  columnBody: {
    fontSize: 10,
    marginTop: isSmallDevice ? 5 : 8,
    color: '#002C3C'
  },
  content: {
    flex: 9
  }
});
