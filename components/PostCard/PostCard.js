import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { width, isBigDevice } from '../../constants/Layout';
import { PostCardPublisher } from './PostCardPublisher';
import { PostCardText } from './PostCardText';
import { Fields } from './Fields';
import RoundButtonEmpty from '../shared/RoundButtonEmpty';
import Colors from '../../constants/Colors';

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
            <View style={{ height: 10 }}></View>
            <RoundButtonEmpty
              fontColor={Colors.ocean
              }
              fontSize={10}
              text="Scopri di più"
              onPress={() =>
                navigation.navigate('PostScreen', {
                  id: post.id
                })
              }
              color={Colors.ocean}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  card: {
    height: isBigDevice ? 250 : 200,
    marginBottom: 5,
    paddingBottom: 5,
    width: isBigDevice ? undefined : width,
    backgroundColor: 'white',
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
    alignItems: "center",
    margin: 5,
    marginRight: 20,
    marginBottom: 5,
    flex: 6
  },
  line: {
    flex: 0.01,
    backgroundColor: 'black'
  }
});

