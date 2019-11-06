import React from 'react';
import { View, ScrollView, StyleSheet,Platform } from 'react-native';
import PostCard from '../../components/PostCard';
import {Bold} from "../../components/StyledText";
import SearchHeader from '../../components/SearchHeader';
import FiltersPage from './FiltersStack/FiltersPage';

export default class Explore extends React.Component {
  state = {
    search: '',
    modalVisible: false,
    posts: null
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  updateSearch = search => {
    this.setState({ search });
  };

  renderPosts = () => {
    return this.props.posts.map((post, index) => {
      return (
        <PostCard
          navigation={this.props.navigation}
          key={index}
          bg="#00B6BE"
          color="white"
          post={post}
        />
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchHeader
          setModalVisible={this.setModalVisible}
          search={this.state.search}
          navigation={this.props.navigation}
          setSearch={this.updateSearch}
        />
        <View style={styles.postBody}>
          {Platform.OS=="web" ? 
          <View style={styles.subContainer}>
          <View style={{flex:1}}>
          <FiltersPage navigation={this.props.navigation}/>
          </View>
          <View style={{flex:4}}>
          <Bold style={styles.resultText}>{this.props.posts.length} risultati</Bold>
          <ScrollView>{this.renderPosts()}</ScrollView>
          </View>
          </View>
          :
          <View>
          <Bold style={styles.resultText}>{this.props.posts.length} risultati</Bold>
          <ScrollView>{this.renderPosts()}</ScrollView>
          </View>
        }
  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  postBody: {
    flex: 5
  },
  resultText:{
    textAlign:"center",
    fontSize:Platform.OS == "web" ? 25: 20,
    margin:Platform.OS == "web" ? 20: 10
  },
  subContainer:{
    flex:1,
    flexDirection:"row"
  }
});

Explore.navigationOptions = {
  header: null
};

