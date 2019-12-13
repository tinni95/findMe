import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { isSmallDevice } from '../../constants/Layout';
import { Bold, Light } from '../../components/StyledText';
import LocationWithText from '../../components/shared/LocationWithText';
import { PositionCard } from '../../components/PositionCard';
import PostInfo from './PostInfo';
import * as Haptics from 'expo-haptics';

export default function PostScreen({ post, navigation }) {

  const positionCards = () => {
    return post.positions.map((position, index) => {
      return <PositionCard buttonOnPress={() => {
        Haptics.selectionAsync()
      }} buttonText={"CANDIDATI"} navigation={navigation} key={index} position={position} />;
    });
  };
  return (
    <View style={styles.contentContainer}>
      <Bold style={styles.title}>{post.title}</Bold>
      <LocationWithText
        points={25}
        fontSize={isSmallDevice ? 18 : 20}
        style={styles.location}
        comune={post.comune}
        regione={post.regione}
      />
      <PostInfo tipoSocio={post.type} pubblicatoDa={post.pubblicatoDa}
        fields={post.fields}
        posizione={post.posizione} />
      <View style={styles.DesriptionContainer}>
        <Bold style={styles.titleSm}>Descrizione</Bold>
        <Light style={styles.body}>{post.description}</Light>
      </View>
      <ScrollView style={{ height: 500 }}>
        {positionCards()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  parallaxScrollView: {
    flex: 1,
    backgroundColor: '#1393F2'
  },
  image: {
    width: 200
  },
  title: {
    margin: 5,
    marginLeft: 5,
    marginRight: 10,
    fontSize: isSmallDevice ? 22 : 26
  },
  titleSm: {
    fontSize: isSmallDevice ? 16 : 18,
    marginBottom: 5,
    marginTop: 10,
    color: "#10476C"
  },
  location: {
    marginLeft: 5,
    marginTop: isSmallDevice ? 10 : 15
  },
  body: {
    fontSize: isSmallDevice ? 14 : 18
  },
  DesriptionContainer: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  },
  contentContainer: {
    flex: 1,
  }
});
