import React from 'react';
import { View } from 'react-native';
import { Body, Bold } from './StyledText';
import RoundButtonEmpty from './RoundButtonEmpty';
import Colors from '../constants/Colors';

var shortid = require('shortid');

export default function CompetenzeBlockVisit({ competenze, onPress }) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 8,
        width: '100%',
      }}>
      <View>
        <Bold style={{ color: 'black', fontSize: 18 }}>Competenze</Bold>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
        {competenze.map((competenza) => {
          return (
            <RoundButtonEmpty
              onPress={null}
              key={shortid.generate()}
              buttonStyle={{ margin: 5 }}
              isLight={true}
              text={competenza}
              color={Colors.blue}></RoundButtonEmpty>
          );
        })}
      </View>
    </View>
  );
}
