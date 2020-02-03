import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SearchBarComponent from './SearchBarComponent';
import { useState } from 'react';
import MessagesIcon from '../MessagesIcon';
import { Body } from '../StyledText';
import Colors from '../../constants/Colors';

export default function SearchHeaderHome({ navigation, setSearch, settore, filters }) {
  const [isSearch, setIs] = useState(false)
  console.log(filters)
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBarComponent updateSearch={setSearch} setIs={setIs} setSearch={setSearch} />
        {!isSearch &&
          <View style={{ flexDirection: "column", flex: 1.5, alignItems: "center", justifyContent: "center", height: 100, marginTop: 35 }}>
            <MessagesIcon navigation={navigation}></MessagesIcon>
            <Body style={{ fontSize: 9, color: Colors.blue }}>Chat</Body>
          </View>
        }
      </View>
    </View>
  );
}

SearchHeaderHome.propTypes = {
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

});
