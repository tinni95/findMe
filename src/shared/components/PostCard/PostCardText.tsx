import React from 'react';
import { StyleSheet, View } from 'react-native';
import LocationWithText from '../LocationWithText';
import { Bold } from '../StyledText';
import { isSmallDevice } from '../../constants/Layout';
import FixOverflow from '../../functions/FixOverflow';
import Colors from '../../constants/Colors';
import PostCardPublisher from './PostCardPublisher';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment/min/moment-with-locales';
moment.locale('it');

const MainTextFreelancer = ({ data, quando, budget }) => {
  return (
    <View>
      <View style={styles.mainTextContainer}>
        <View style={styles.mainTextColumn}>
          <Bold style={styles.columnHeader}>
            {quando === 'Entro una data' ? 'Entro il' : 'In data'}
          </Bold>
          <Bold style={styles.columnBody}>
            {data ? moment(data).format('DD-MM-YYYY') : 'Da definire'}
          </Bold>
        </View>
        <View style={styles.mainTextColumn}>
          <Bold style={styles.columnHeader}>Compenso</Bold>
          <Bold style={styles.columnBody}>{budget}</Bold>
        </View>
      </View>
    </View>
  );
};

const PostCardText = ({ post, navigation }) => {
  return (
    <View>
      <View style={styles.body}>
        <PostCardPublisher navigation={navigation} post={post} />
        <LinearGradient colors={['#EBEBEB', '#FFFDFD']} style={styles.line} />
        <View style={styles.container}>
          <Bold style={styles.title}>{FixOverflow(post.titolo, 50)}</Bold>
          <LocationWithText comune={post.comune} regione={post.regione} color="#AFA9A9" />
        </View>
      </View>
      {post.budget && MainTextFreelancer(post)}
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flex: 0.03,
    backgroundColor: 'black',
  },
  body: {
    flex: 7,
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'column',
    flex: 4,
    margin: 5,
    marginLeft: 10,
  },
  title: {
    fontSize: isSmallDevice ? 16 : 18,
    color: Colors.black,
    marginTop: 5,
  },
  mainTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  mainTextColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  columnHeader: {
    fontSize: 13,
    color: Colors.ocean,
  },
  columnBody: {
    fontSize: 13,
    marginTop: isSmallDevice ? 5 : 8,
    color: '#002C3C',
  },
  content: {
    flex: 9,
  },
});

export default PostCardText;
