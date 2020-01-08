import React from 'react';
import { SearchBar } from 'react-native-elements';
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
      <SearchBar
        platform="ios"
        inputContainerStyle={{ backgroundColor: "#F7F4F4" }}
        containerStyle={styles.container}
        placeholder="Cerca parola chiave"
        onChangeText={this.updateSearch}
        onSubmitEditing={() => this.props.navigation.navigate("Explore", {
          filter: this.props.search.toLowerCase()
        })}
        value={this.props.search}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    marginTop: 30,
    backgroundColor: "white"
  }
});

export default SearchBarComponent;
