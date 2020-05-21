import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { width, isBigDevice, isSmallDevice } from '../../constants/Layout';
import PostCardText from './PostCardText';
import RoundButtonEmptySm from '../RoundButtonEmptySm';
import Colors from '../../constants/Colors';

const PostCard = ({ post, onPress, navigation }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <PostCardText navigation={navigation} post={post} />
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <View style={{ height: 10 }}></View>
            <RoundButtonEmptySm text="Scopri di più" onPress={onPress} color={Colors.ocean} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  card: {
    marginTop: 10,
    paddingBottom: 5,
    width: isBigDevice ? undefined : width - 20,
    borderRadius: 5,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
          width: 10,
          height: 5,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  body: {
    flex: 7,
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    flex: 3,
    flexDirection: 'row',
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 5,
    marginRight: 20,
    marginBottom: 5,
    flex: 6,
  },
  line: {
    flex: 0.01,
    backgroundColor: 'black',
  },
  postBody: {
    fontSize: 10,
    marginTop: isSmallDevice ? 5 : 8,
    color: '#002C3C',
  },
  columnHeader: {
    fontSize: 12,
    color: Colors.ocean,
  },
  columnBody: {
    fontSize: 10,
    marginTop: isSmallDevice ? 5 : 8,
    color: '#002C3C',
  },
  descrizioneBlock: {
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default PostCard;
