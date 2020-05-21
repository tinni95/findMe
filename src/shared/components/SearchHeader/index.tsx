import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBarComponent from './SearchBarComponent';
import FilterButton from './FilterButton';
import { useState } from 'react';

export default function SearchHeader({
  navigation,
  setSearch,
  settore,
  provincia,
  regione,
  comune,
}) {
  const countFilters = () => {
    let i = 0;
    if (regione != null) {
      i = i + 1;
    }
    if (provincia != null) {
      i = i + 1;
    }
    if (comune != null) {
      i = i + 1;
    }
    if (settore != null) {
      i = i + settore.length;
    }
    return i;
  };

  const filters = countFilters();
  const [isSearch, setIs] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {!isSearch ? (
          <FilterButton
            onPress={() =>
              navigation.navigate('FiltersPage', {
                settore,
                regione,
                provincia,
                comune,
              })
            }
            filters={filters}
          />
        ) : (
          <View style={{ height: 50 }} />
        )}
        <SearchBarComponent updateSearch={setSearch} setIs={setIs} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
  },
  bubbio: {
    flex: 2,
    height: 100,
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
