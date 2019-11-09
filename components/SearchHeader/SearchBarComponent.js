import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { width } from '../../constants/Layout';

class SearchBarComponent extends React.Component {
  static propTypes = {
    setSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired
  };

  updateSearch = search => {
    this.props.setSearch(search);
  };

  render() {
    return (
      <Searchbar
        style={styles.container}
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        onSubmitEditing={() => this.props.navigation.navigate("ExploreQueryRenderer",{
          filter:this.props.search.toLowerCase()
        })}
        value={this.props.search}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:8,
    height:50,
    margin: 10,
    marginTop: 50,
  }
});

export default SearchBarComponent;
