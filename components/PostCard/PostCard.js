import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { width } from '../../constants/Layout';
import {PostCardPublisher} from './PostCardPublisher';
import {PostCardText} from './PostCardText';
import {Fields} from './Fields';
import RoundButtonEmpty from '../shared/RoundButtonEmpty';

export const PostCard = ({ post, navigation }) => {
  return (
    <View style={styles.wrapper}>
    <View style={styles.card}>
      <View style={styles.body}>
        <PostCardPublisher post={post} />
        <LinearGradient colors={['#EBEBEB', '#FFFDFD']} style={styles.line} />
        <PostCardText post={post} />
      </View>
      <View style={styles.footer}>
        <Fields post={post} />
        <View style={styles.buttonContainer}>
          <RoundButtonEmpty
            fontColor={"#5DD9D8"}
            text="Scopri di Più"
            onPress={() =>
              navigation.navigate('PostScreenQueryRenderer', {
                id: post.id
              })
            }
            color="#60E1E0"
          />
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper:{
    alignItems:"center",
  },
  card: {
    height: Platform.OS == "web"?250:200,
    marginTop: 15,
    width:Platform.OS == "web"? undefined : width,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      },
      web:{
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 4,
        width:"80%",
      }
    })
  },
  body: {
    flex: 7,
    flexDirection: 'row'
  },
  footer: {
    flex: 3,
    flexDirection: 'row'
  },
  buttonContainer: {
    marginLeft: 50,
    marginTop: 10,
    flex: 6
  },
  line: {
    flex: 0.01,
    backgroundColor: 'black'
  }
});

