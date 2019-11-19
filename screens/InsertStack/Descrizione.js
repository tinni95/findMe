import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StepsIndicator } from "./stepsIndicator";
import FormTextInput from "../shared/Form/FormTextInput";
import WithErrorString from "../shared/Form/WithErrorString";
import { RoundFilters } from "../Explore/FiltersStack/components/RoundFilters";
import RoundButton from '../../components/shared/RoundButton';
import RoundButtonEmptyUniversal from '../../components/shared/RoundButtonEmptyUniversal';
import { StepsLabel, StepsLabelError } from "./StepsLabel";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FormStyles } from "../shared/Form/FormStyles";
import { isBigDevice } from '../../constants/Layout';
import { Settori } from "./helpers";
const POST_DESCRIZIONE = gql`
  query DescrizioneQuery {
    postTitle @client
    postDescription @client
    postCategories @client
    postLocation @client
  }
`;


export function Descrizione({ navigation }) {
  const client = useApolloClient();
  const { data } = useQuery(POST_DESCRIZIONE);
  //if first page data is missing, we go back to it
  useEffect(() => {
    data.postLocation === "" ? navigation.navigate("Presentazione") : null
  }, [])

  const [title, setTitle] = useState(data.postTitle || "");
  const [description, setDescription] = useState(data.postDescription || "");
  const [titleError, setTitleError] = useState("");
  const [settoreError, setSettoreError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const settore = data.postCategories;
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
    if (description.length === 0) {
      setDescriptionError(true);
    }
    else {
      setDescriptionError(false)
    }
    if (categories.length === 0) {
      setSettoreError(true);
    }
    else {
      setSettoreError(false);
    }
    if (categories.length > 0 && title.length > 0 && description.length > 0) {
      console.log(categories);
      console.log(title);
      console.log(description);

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
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {settoreError ?
            <StepsLabelError text={"Inserisci Titolo"} />
            :
            <StepsLabel text={"Inserisci Titolo"} />
          }
          <WithErrorString
            error={titleError}
            errorText={"Campo Obbligatorio"}>
            <FormTextInput
              placeholder="Titolo Post Idea (es. `Sviluppo App`)"
              onChangeText={val => setTitle(val)}
              value={title}
              style={titleError ? FormStyles.inputError : FormStyles.input}
            />
          </WithErrorString>
          {settoreError ?
            <StepsLabelError text={"Categoria"} />
            :
            <StepsLabel text={"Categoria (es. Economia,Ingegneria..)"} />
          }
          <RoundFilters maximum={3} items={categories} addItem={addItem} removeItem={removeItem} settori={Settori} settoreAttivi={settore} />
          {descriptionError ?
            <StepsLabelError text={"Descrizione"} />
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
            style={FormStyles.large}
            value={description}
          />

          <View style={styles.buttonWrapper}>
            <RoundButtonEmptyUniversal text={"INDIETRO"} color={"#10476C"} onPress={() => navigation.navigate("Presentazione")} />
            <RoundButton text={"  AVANTI  "} color={"#10476C"} textColor={"white"} onPress={() => handlePress()} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View >
  )
};

Descrizione.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 28,
    marginTop: 40,
    marginBottom: 40
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
    marginLeft: isBigDevice ? 100 : 20,
    marginRight: isBigDevice ? 100 : 20,
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
