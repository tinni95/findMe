import React, { useState, useEffect, useRef, ReactDOM } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { StepsIndicator } from "../../shared/components/StepstIndicator";
import FormTextInput from "../../shared/components/Form/FormTextInput";
import WithErrorString from "../../shared/components/Form/WithErrorString";
import RoundButton from "../../shared/components/RoundButton";
import StepsLabel, {
  StepsLabelWithHint
} from "../../shared/components/StepsLabel";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FormStyles } from "../../shared/components/Form/FormStyles";
import { isBigDevice } from "../../shared/constants/Layout";
import { Settori } from "../../shared/constants/Settori";
import HeaderBar from "../../shared/components/HeaderBar";
import MultiFilters from "../../shared/components/Filters/MultiFilter";
import ZoomButton from "../../shared/components/ZoomButton";

const POST_DESCRIZIONE = gql`
  query DescrizioneQuery {
    postTitle @client
    postDescription @client
    postCategories @client
    postComune @client
    postRegione @client
    postProvincia @client
  }
`;

export default function Presentazione({ navigation, route }) {
  const client = useApolloClient();
  const { data } = useQuery(POST_DESCRIZIONE);
  const refreshSettore = () => {
    settore = categories;
  };
  let settore = data.postCategories;
  let input = useRef<any>();
  let input2 = useRef<any>();
  let scrollview = useRef<ScrollView | null>();
  //navigation filling values
  const passedComune = route.params?.comune ?? data.postComune;
  const passedProvincia = route.params?.provincia ?? data.postProvincia;
  const passedRegione = route.params?.regione ?? data.postRegione;
  const [zoom, setZoom] = useState(false);
  const [comune, setComune] = useState<string>("");
  const [regione, setRegione] = useState<string>("");
  const [provincia, setProvincia] = useState<string>("");
  const [locationError, setLocationError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(data.postTitle || "");
  const [description, setDescription] = useState<string>(
    data.postDescription || ""
  );
  const [titleError, setTitleError] = useState<boolean>(false);
  const [settoreError, setSettoreError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>(settore);

  const _scrollToInput = input => {
    input.current.measure((fx, fy, width, height, px, py) => {
      const scrollResponder = scrollview.current.scrollTo({
        y: fy,
        animated: true
      });
    });
  };

  //filling autocomplete returned values
  useEffect(() => {
    passedComune ? setComune(passedComune) : null;
    passedRegione ? setRegione(passedRegione) : null;
    passedProvincia ? setProvincia(passedProvincia) : null;
  });

  const addItem = item => {
    if (categories.length < 3 || categories.includes(categories))
      setCategories([...categories, item]);
  };
  const removeItem = item => {
    setCategories(categories.filter(i => i !== item));
  };
  const handlePress = () => {
    if (comune.length === 0 || title.length === 0) {
      _scrollToInput(input);
    } else if (categories.length === 0) {
      _scrollToInput(input2);
    }
    if (comune.length === 0) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
    if (title.length === 0) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    if (description.length === 0) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
    if (categories.length === 0) {
      setSettoreError(true);
    } else {
      setSettoreError(false);
    }
    if (
      comune.length > 0 &&
      categories.length > 0 &&
      title.length > 0 &&
      description.length > 0
    ) {
      client.writeData({
        data: {
          postDescription: description,
          postTitle: title,
          postCategories: categories,
          postProvincia: provincia,
          postComune: comune,
          postRegione: regione
        }
      });
      navigation.navigate("Posizioni");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        onPress={() => navigation.navigate("ExploreScreen")}
      ></HeaderBar>
      <View style={styles.header}>
        <StepsIndicator navigation={navigation} active={0}></StepsIndicator>
      </View>
      <View style={styles.body}>
        <ScrollView ref={scrollview} showsVerticalScrollIndicator={false}>
          {!zoom && (
            <View>
              {refreshSettore()}
              <StepsLabel text={"Scegli Località"} error={locationError} />
              <WithErrorString
                errorText="Campo Obbligatorio"
                error={locationError}
              >
                <FormTextInput
                  style={
                    locationError ? FormStyles.inputError : FormStyles.input
                  }
                  value={
                    comune.length > 0
                      ? comune + ", " + provincia + ", " + regione
                      : ""
                  }
                  onFocus={() =>
                    navigation.push("AutoCompleteLocation", {
                      path: "Presentazione",
                      lollo: "s"
                    })
                  }
                  placeholder="Località"
                />
              </WithErrorString>
              <StepsLabel error={titleError} text={"Titolo Progetto"} />
              <WithErrorString
                error={titleError}
                errorText={"Campo Obbligatorio"}
              >
                <FormTextInput
                  reference={input}
                  placeholder="Titolo Post Idea (es. `Sviluppo App`)"
                  onChangeText={val => setTitle(val)}
                  value={title}
                  style={titleError ? FormStyles.inputError : FormStyles.input}
                />
              </WithErrorString>
              <View
                ref={input2}
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <StepsLabelWithHint
                  error={settoreError}
                  tooltipText={
                    "Queste sono le categorie della tua idea, puoi sceglierne massimo 3"
                  }
                  text={"Settore"}
                />
              </View>
              <MultiFilters
                maximum={3}
                items={categories}
                addItem={addItem}
                removeItem={removeItem}
                settori={Settori}
                settoreAttivi={settore}
              />
            </View>
          )}
          <StepsLabel error={descriptionError} text={"Descrizione"} />
          <FormTextInput
            large="true"
            multiline
            numberOfLines={4}
            placeholder="Descrizione"
            placeholderTextColor="#ADADAD"
            onFocus={() => setZoom(true)}
            onEndEditing={() => setZoom(false)}
            textAlignVertical={"top"}
            style={zoom ? FormStyles.xlarge : FormStyles.large}
            onChangeText={val => setDescription(val)}
            editable
            value={description}
          />
          {zoom && <ZoomButton onPress={() => setZoom(false)} />}
          {!zoom && (
            <View style={styles.buttonWrapper}>
              <RoundButton
                text={"  Avanti  "}
                color={"#10476C"}
                textColor={"white"}
                onPress={() => handlePress()}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    margin: 28,
    marginTop: 40,
    marginBottom: 40
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "flex-start"
  },
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 40
  },
  body: {
    flex: 8,
    marginLeft: isBigDevice ? 100 : 20,
    marginRight: isBigDevice ? 100 : 20
  },
  header: {
    flex: 1,
    paddingBottom: 15
  },
  textHeading: {
    marginLeft: 5,
    marginBottom: 15,
    marginTop: 25,
    color: "#5F5E5E"
  }
});
