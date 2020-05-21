import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput, View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { FormStyles } from './Form/FormStyles';
import { Bold, Body } from './StyledText';
import { Ionicons } from '@expo/vector-icons';
import { wait } from '../functions/wait';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
const shortid = require('shortid');

export function AutoCompleteFiltri({ navigation, route }) {
  let { items, path, is } = navigation.state.params;
  let isFor = navigation.getParam('for', null);
  const [text, setText] = useState('');
  useEffect(() => {
    wait(50).then(() => {
      textInput.current.focus();
    });
  }, []);
  const textInput = useRef<any>();
  let filteredItems = items.filter((item) =>
    isFor != 'Requisiti'
      ? item.titolo.toLowerCase().includes(text.toLowerCase())
      : item.toLowerCase().includes(text.toLowerCase()),
  );
  if (is == '') {
    filteredItems = filteredItems.length == 0 ? [text] : filteredItems;
  }
  const renderItems = filteredItems.splice(0, 20).map((item) => {
    let objectToPass =
      isFor == 'Requisiti' || filteredItems[0] == text
        ? { title: item, for: isFor, is }
        : { title: item.titolo, categoria: item.categoria, for: isFor };
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(path, objectToPass)}
        key={shortid.generate()}
        style={styles.item}>
        <Body style={styles.itemText}>
          {isFor == 'Requisiti' || filteredItems[0] == text ? item : item.titolo}
        </Body>
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={['#EBEBEB', '#FFFDFD']}
          style={styles.line}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput
          maxLength={40}
          style={[FormStyles.input, styles.input]}
          ref={textInput}
          onChangeText={(text) => setText(text)}
        />
        <TouchableOpacity style={styles.cancelContainer} onPress={() => navigation.goBack()}>
          <Bold style={styles.cancelButton}>Cancella</Bold>
        </TouchableOpacity>
      </View>
      <ScrollView onScrollBeginDrag={Keyboard.dismiss} style={{ marginTop: 25 }}>
        {renderItems}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 35,
    borderBottomColor: '#B19393',
  },
  textContainer: {
    flexDirection: 'row',
  },
  line: {
    height: 1.5,
  },
  input: {
    marginLeft: 15,
    marginRight: 5,
    flex: 4,
  },
  cancelButton: { marginRight: 2.5, color: Colors.blue },
  cancelContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginTop: 5,
    marginLeft: 15,
  },
  itemText: {
    color: Colors.black,
    margin: 10,
    marginBottom: 5,
    fontSize: 16,
  },
});

AutoCompleteFiltri.navigationOptions = ({ navigation }) => {
  return {
    headerShown: false,
  };
};
