import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SearchBarComponent from './SearchBarComponent';
import FilterButton from './FilterButton';
import { useState } from 'react';
import CandidatureIcon from '../CandidatureIcon';

export default function SearchHeader({ navigation, setSearch, settore, filters }) {
  const [isSearch, setIs] = useState(false)
  console.log(filters)
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {!isSearch &&
          <FilterButton onPress={() => navigation.navigate("FiltersPage", {
            settore
          })} filters={filters} />

        }
        <SearchBarComponent updateSearch={setSearch} setIs={setIs} setSearch={setSearch} />
        {!isSearch &&
          <View style={styles.bubbio}>
            <CandidatureIcon navigation={navigation}></CandidatureIcon>
          </View>
        }
      </View>
    </View>
  );
}

SearchHeader.propTypes = {
  setSearch: PropTypes.func.isRequired,
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
  bubbio: {
    flex: 2,
    height: 100, marginTop: 35,
    alignItems: "center", justifyContent: "center",
  },


});
