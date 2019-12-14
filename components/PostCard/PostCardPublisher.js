import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { isSmallDevice } from '../../constants/Layout';

const authorInfo = () => {
  return (
    <View style={styles.authorInfo}>
      <Text style={styles.authorInfoText}>Membri (2)</Text>
    </View>
  );
};

export const PostCardPublisher = ({ post: { positions } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/images/placeholder.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1.5,
    marginTop: 5
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  authorInfo: {
    marginTop: 8,
    marginLeft: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  authorInfoText: {
    fontSize: 10,
    color: '#002C3C',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    marginTop: -2,
    marginLeft: 2
  },
  amount: {
    textAlign: 'center',
    fontSize: isSmallDevice ? 6 : 6.5,
    margin: 5
  }
});
