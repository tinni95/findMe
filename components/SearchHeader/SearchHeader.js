import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SearchBarComponent from './SearchBarComponent';
import FilterButton from './FilterButton';
import { useState } from 'react';

export default function SearchHeader({ navigation, setSearch, search, settore }) {
  const [isSearch, setIs] = useState(false)
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {!isSearch &&
          <FilterButton onPress={() => navigation.navigate("FiltersPage", {
            settore
          })} />}
        <SearchBarComponent navigation={navigation} setIs={setIs} search={search} setSearch={setSearch} />
        {!isSearch &&
          <TouchableOpacity onPress={() => navigation.navigate("AttivitàScreen")} style={{ top: 17.5, flex: 1.25 }}>
            <Image
              resizeMode="contain"
              style={{ alignSelf: "center", width: 30, height: 30 }}
              source={require('../../assets/images/arrows.png')}
            />
          </TouchableOpacity>
        }
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
