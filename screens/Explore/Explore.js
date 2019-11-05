import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import PostCard from '../../components/PostCard';

import SearchHeader from '../../components/SearchHeader';

export default class Explore extends React.Component {
  state = {
    search: '',
    modalVisible: false
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
          setSearch={this.updateSearch}
        />
        <View style={styles.postBody}>
          <ScrollView>{this.renderPosts()}</ScrollView>
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
  }
});

Explore.navigationOptions = {
  header: null
};

