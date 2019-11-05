import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBarComponent from './SearchBarComponent';
import FilterButton from './FilterButton';
import { isSmallDevice } from '../../constants/Layout';

export default function SearchHeader({ setSearch, search, setModalVisible }) {
  return (
    <View style={styles.container}>
      <SearchBarComponent search={search} setSearch={setSearch} />
      <View style={styles.footer}>
        <FilterButton onPress={() => setModalVisible(true)} />
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
    backgroundColor: '#FFFFFF',
    flex: isSmallDevice ? 1.9 : 1.4,
    borderBottomColor:"#EBEBEB",
    borderBottomWidth:0.3
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
