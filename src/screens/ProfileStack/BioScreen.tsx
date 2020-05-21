import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import HeaderRight from '../../shared/components/HeaderRight';
import { StepsLabelWithHint } from '../../shared/components/StepsLabel';
import FormTextInput from '../../shared/components/Form/FormTextInput';
import { FormStyles } from '../../shared/components/Form/FormStyles';
import WithErrorString from '../../shared/components/Form/WithErrorString';
import HeaderLeft from '../../shared/components/HeaderLeft';
let shortid = require('shortid');

const UPDATEUSER_MUTATION = gql`
  mutation updateUser($presentazione: String!) {
    updateUser(presentazione: $presentazione) {
      id
    }
  }
`;

export default function BioScreen({ navigation }) {
  const [bio, setBio] = useState<string>(navigation.getParam('bio', ''));
  const [bioError, setBioError] = useState<boolean>(false);

  const action = () => {
    if (bio.length > 0) {
      setBioError(false);
      updateUser({ variables: { presentazione: bio } });
    } else {
      setBioError(true);
    }
  };

  useEffect(() => {
    navigation.setParams({ action });
  }, [bio]);

  //mutation
  const [updateUser] = useMutation(UPDATEUSER_MUTATION, {
    onCompleted: async ({ updateUser }) => {
      navigation.navigate('ProfilePage', {
        refetch: Math.floor(Math.random() * -1000),
      });
    },
  });
  //hooks

  return (
    <View style={styles.container}>
      <StepsLabelWithHint
        tooltipText={
          'Scrivi una biografia che ti serve a descriverti, per aiutare agli altri utenti a capire se sei fatto per la loro attività'
        }
        text={'Bio'}
      />
      <WithErrorString error={bioError} errorText={'Campo Obbligatorio'}>
        <FormTextInput
          large="true"
          multiline
          numberOfLines={4}
          onChangeText={(val) => setBio(val)}
          textAlignVertical={'top'}
          style={FormStyles.xlarge}
          value={bio}
        />
      </WithErrorString>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
});

BioScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => <HeaderLeft navigation={navigation}></HeaderLeft>,
    title: '',
    headerRight: () => (
      <HeaderRight text={'Conferma'} onPress={() => navigation.getParam('action', null)()} />
    ),
  };
};
