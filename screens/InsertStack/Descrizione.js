import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, View, StyleSheet, Platform } from 'react-native';
import { Light, Bold } from '../../components/StyledText';
import { StepsIndicator } from "./stepsIndicator";
import FormTextInput from "../shared/Form/FormTextInput";
import WithErrorString from "../shared/Form/WithErrorString";
import FormTextInputLarge from "../shared/Form/FormTextInputLarge";
import { RoundFilters } from "../Explore/FiltersStack/components/RoundFilters";
import RoundButton from '../../components/shared/RoundButton';
import { StepsLabel, StepsLabelError } from "./StepsLabel";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const POST_DESCRIZIONE = gql`
  query DescrizioneQuery {
    postTitle @client
    postDescription @client
    postCategories @client
  }
`;

const Settori = ["Aereonautica", "Fashion", "Ingegneria", "Ristorazione", "Intrattenimento", "Cinofilia", "Musica", "Arte", "Teatro"];

export function Descrizione({ navigation, settore }) {
  const client = useApolloClient();
  const { data } = useQuery(POST_DESCRIZIONE);
  const [title, setTitle] = useState(data.postTitle || "");
  const [description, setDescription] = useState(data.postDescription || "");
  const [titleError, setTitleError] = useState("");
  const [settoreError, setSettoreError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  settore = data.postCategories;
  const [categories, setCategories] = useState(settore);
  const addItem = item => {
    if (categories.length < 3 || categories.includes(categories))
      setCategories([...categories, item]);
  };
  const removeItem = item => {
    setCategories(categories.filter(i => i !== item));
  };
  const handlePress = () => {
    if (title.length === 0) {
      setTitleError(true);
    }
    else {
      setTitleError(false)
    }
    if (categories.length === 0) {
      setSettoreError(true);
    }
    else {
      setSettoreError(false);
    }
    if (categories.length > 0 && title.length > 0) {
      client.writeData({
        data: {
          postDescription: description,
          postTitle: title,
          postCategories: categories
        }
      });
      navigation.navigate("Posizioni");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StepsIndicator navigation={navigation} active={1}></StepsIndicator>
      </View>
      <View style={styles.body}>
        <KeyboardAwareScrollView >
          <WithErrorString
            error={titleError}
            errorText={"Campo Obbligatorio"}>
            <FormTextInput
              placeholder="Titolo Post Idea"
              onChangeText={val => setTitle(val)}
              value={title}
              error={titleError}
            />
          </WithErrorString>
          {settoreError ?
            <StepsLabelError text={"Categoria"} />
            :
            <StepsLabel text={"Categoria (es. Economia,Ingegneria..)"} />
          }
          <RoundFilters maximum={3} items={categories} addItem={addItem} removeItem={removeItem} settori={Settori} settoreAttivi={settore} />
          {descriptionError ?
            <StepsLabelError text={"Descrizione *"} />
            :
            <StepsLabel text={"Descrizione"} />
          }
          <FormTextInput
            large="true"
            multiline
            numberOfLines={4}
            placeholder="Descrizione"
            placeholderTextColor="#ADADAD"
            onChangeText={val => setDescription(val)}
            editable
            error={descriptionError}
            value={description}
          />
          <View style={styles.buttonWrapper}>
            <RoundButton text={"PROCEDI"} color={"#10476C"} textColor={"white"} onPress={() => handlePress()} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  )
};

Descrizione.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "center",
    margin: 20
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    marginTop: 40
  },
  body: {
    flex: 8,
    marginLeft: Platform.OS == "web" ? 100 : 20,
    marginRight: Platform.OS == "web" ? 100 : 20,

  },
  header: {
    flex: 1.5
  },
  textHeading: {
    marginLeft: 5,
    marginBottom: 15,
    marginTop: 25,
    color: '#5F5E5E'
  }
});
