import React from 'react';
import { TouchableWithoutFeedback, View, ScrollView, StyleSheet } from 'react-native';
import { isSmallDevice } from '../../constants/Layout';
import { Bold, Light } from '../../components/StyledText';
import LocationWithText from '../../components/shared/LocationWithText';
import { PositionCard } from '../../components/PositionCard';
import PostInfo from './PostInfo';

export default function PostScreenConfirm({ post, isHidden, user, navigation }) {
  const positionCards = () => {
    return post.positions.map((position, index) => {
      return <PositionCard button={"false"} navigation={navigation} key={index} position={position} />;
    });
  };
  return (
    <View style={styles.contentContainer}>
      <TouchableWithoutFeedback onPress={() => console.log("Descrizione")}>
        <Bold style={styles.title}>{post.title}</Bold>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => console.log("Presentazione")}>
        <LocationWithText
          points={25}
          fontSize={isSmallDevice ? 18 : 20}
          style={styles.location}
          regione={post.regione}
          comune={post.comune}
        />
      </TouchableWithoutFeedback>
      <PostInfo isHidden={isHidden}
        withredirect={"true"} tipoSocio={post.tipoSocio}
        user={user}
        fields={post.fields}
        posizione={post.posizione} />
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Descrizione")}>
        <View style={styles.DesriptionContainer}>
          <Bold style={styles.titleSm}>Descrizione</Bold>
          <Light style={styles.body}>{post.description}</Light>
        </View>
      </TouchableWithoutFeedback>
      <View>
        {positionCards()}
      </View>
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
