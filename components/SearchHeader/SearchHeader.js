import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBarComponent from './SearchBarComponent';
import FilterButton from './FilterButton';
import { isSmallDevice } from '../../constants/Layout';

export default function SearchHeader({ navigation,setSearch, search, settore }) {
  return (
    <View style={styles.container}>
           <FilterButton onPress={() => navigation.navigate("FiltersPage",{
             settore
           })} />
      <SearchBarComponent navigation={navigation} search={search} setSearch={setSearch} />
    </View>
  );
}

SearchHeader.propTypes = {
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    backgroundColor: '#FFFFFF',
    borderBottomColor:"#EBEBEB",
    borderBottomWidth:0.3,
    flexDirection:"row"
  },

});
