import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import SearchBarComponent from './SearchBarComponent';
import FilterButton from './FilterButton';

export default function SearchHeader({ navigation, setSearch, search, settore }) {
  return (
    <View style={styles.container}>
      <FilterButton onPress={() => navigation.navigate("FiltersPage", {
        settore
      })} />
      <SearchBarComponent navigation={navigation} search={search} setSearch={setSearch} />
      <View style={{ top: 17.5, flex: 1.25 }}>
        <Image
          resizeMode="contain"
          style={{ alignSelf: "center", width: 30, height: 30 }}
          source={require('../../assets/images/arrows.png')}
        />
      </View>
    </View>
  );
}

SearchHeader.propTypes = {
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    borderBottomColor: "#EBEBEB",
    borderBottomWidth: 0.3,
    flexDirection: "row"
  },

});
