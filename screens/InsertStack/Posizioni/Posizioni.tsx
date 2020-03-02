import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import StepsLabel from "../../../shared/components/StepsLabel";
import { AddButton } from "../../../shared/components/AddButton";
import WithErrorString from "../../../shared/components/Form/WithErrorString";
import { StepsIndicator } from "../../../shared/components/StepstIndicator";
import FormTextInput from "../../../shared/components/Form/FormTextInput";
import RoundFiltersOne from "../../../shared/components/Filters/SingleFilter";
import RoundButton from "../../../shared/components/RoundButton";
import RoundButtonEmpty from "../../../shared/components/RoundButtonEmpty";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FormStyles } from "../../../shared/components/Form/FormStyles";
import { Settori } from "../../../shared/constants/Settori";
import { TipoSocio } from "../../../shared/constants/TipoSocio";
import { TitoliPosizioni } from "../../../shared/constants/TitoliPosizioni";
import { Requisiti } from "../../../shared/constants/Requisiti";
import { isBigDevice } from "../../../shared/constants/Layout";
import { Light } from "../../../shared/components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../shared/constants/Colors";
import HeaderBar from "../../../shared/components/HeaderBar";

var shortid = require("shortid");
const POST_POSIZIONI = gql`
  query PosizioniQuery {
    postPositions @client {
      type
      description
      title
    }
    postProvincia @client
    postTitle @client
    postCategories @client
  }
`;

export default function Posizioni({ navigation, route }) {
  console.log("route", route.params);
  //Hooks
  const [zoom, setZoom] = useState(false);
  const [active, setActive] = useState<number>(-1);
  const [title, setTitle] = useState("");
  const [socio, setSocio] = useState("");
  const [requisiti, setRequisiti] = useState([]);
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [socioError, setSocioError] = useState(false);
  const [posizioniError, setPosizioniError] = useState(false);
  //Data
  const { data,refetch } = useQuery(POST_POSIZIONI);

  const posizioni = data.postPositions || [];
  let passedTitle = route.params?.for == "Titoli" ? route.params?.title : null;
  let passedRequisito =
    route.params?.for == "Requisiti" ? route.params?.title : null;
  let passedSettore = route.params?.settore ?? null;

//if first page data is missing, we go back to it
  useEffect(() => {
    if (data.postProvincia === "") {
      navigation.navigate("Presentazione");
    } else if (data.postTitle === "") {
      navigation.navigate("Descrizione");
    }
  }, []);

  //Autocomplete titolo
  useEffect(() => {
    passedTitle ? setTitle(passedTitle) : null;
  }, [passedTitle]);
  //Autocomplete requisiti
  useEffect(() => {
    passedRequisito
      ? requisiti.includes(passedRequisito.trim())
        ? null
        : setRequisiti([...requisiti, passedRequisito])
      : null;
  }, [passedRequisito]);
  //reset when added a position
  useEffect(() => {
    resetState();
    refetch();
    console.log("posizioni",data )
  }, [passedSettore]);

  const refreshSettore = () => {
    passedSettore = TipoSocio.indexOf(socio);
  };

  const resetState = () => {
    passedTitle = null;
    setTitle("");
    setDescription("");
    setSocio("");
    setRequisiti([]);
  };

  const handleAggiungi = (bool, skip) => {
    if (socio.length === 0) {
      setSocioError(true);
    } else {
      setSocioError(false);
    }
    if (title.length === 0 && !bool) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (
      ( socio.length > 0 && title.length > 0) ||
      bool
    ) {
      navigation.navigate("ConfermaPosizione", {
        description,
        socio,
        title,
        requisiti,
        skip
      });
    }
  };

  const buttons = bool => {
    return (
      <View>
        <View style={styles.aggiungiWrapper}>
          {posizioni.length == 0 ? (
            <StepsLabel error={posizioniError} text="Aggiungi Una Posizione" />
          ) : (
            <View style={{ flexDirection: "row" }}>
              <StepsLabel text={`Hai Aggiunto`} />
              <StepsLabel
                style={styles.link}
                text={
                  posizioni.length +
                  (posizioni.length == 1 ? ` posizione` : ` posizioni`)
                }
                onPress={() => navigation.navigate("ModificaPosizioni")}
              />
            </View>
          )}
          <AddButton
            style={undefined}
            onPress={() => handleAggiungi(bool, false)}
            text={"+ Aggiungi Posizione"}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <RoundButtonEmpty
            text={"Indietro"}
            color={"#10476C"}
            onPress={() => navigation.navigate("Presentazione")}
          />
          <RoundButton
            text={"  Avanti  "}
            color={"#10476C"}
            textColor={"white"}
            onPress={() => handlePress(bool)}
          />
        </View>
      </View>
    );
  };

  const requirements = () => {
    return requisiti.map((requisito, index) => {
      let isActive = active === index;
      return (
        <View
          key={shortid.generate()}
          style={{ margin: 5, flexDirection: "row" }}
        >
          <RoundButton
            onPress={() => {
              if (isActive) {
                let newRequisiti = requisiti.filter(
                  el => el != requisiti[index]
                );
                setRequisiti(newRequisiti);
                setActive(-1);
              } else {
                setActive(index);
              }
            }}
            isLight={true}
            text={requisito}
            textColor={"white"}
            color={isActive ? "#DD1E63" : "#26547C"}
          ></RoundButton>
          {isActive ? (
            <Ionicons
              name={"ios-close"}
              size={30}
              color={"#989090"}
              style={{ marginTop: -10, padding: 5 }}
            />
          ) : null}
        </View>
      );
    });
  };

  const handlePress = bool => {
    handleAggiungi(bool, true);
    if (
      !(
        (socio.length > 0 && title.length > 0) ||
        bool
      ) &&
      posizioni.length < 1
    ) {
      setPosizioniError(true);
    } else {
      setPosizioniError(false);
    }
    if (posizioni.length > 0) {
      navigation.navigate("Anteprima");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar onPress={() => navigation.navigate("ExploreScreen")}></HeaderBar>
      <View style={styles.header}>
        <StepsIndicator navigation={navigation} active={1}></StepsIndicator>
      </View>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!zoom && (
            <View>
              {refreshSettore()}
              <StepsLabel error={socioError} text={"Cosa Cerco"} />
              <RoundFiltersOne
                inactive={false}
                setItem={item => setSocio(item)}
                settori={TipoSocio}
                settoreAttivi={passedSettore}
              />
              <View style={{ height: 15 }}></View>
              {socio != "Socio Finanziatore" && (
                <WithErrorString
                  error={titleError}
                  errorText={"Campo Obbligatorio"}
                >
                  <StepsLabel error={titleError} text={"Titolo Posizione"} />
                  <FormTextInput
                    value={title}
                    style={
                      titleError ? FormStyles.inputError : FormStyles.input
                    }
                    onFocus={() =>
                      navigation.navigate("AutoComplete", {
                        path: "PosizioniModal",
                        items: TitoliPosizioni,
                        for: "Titoli"
                      })
                    }
                    onChangeText={val => setTitle(val)}
                  />
                </WithErrorString>
              )}
              {socio != "Socio Finanziatore" && (
                <View>
                  <StepsLabel text={"Requisiti"} />
                  {requisiti.length == 0 ? (
                    <View style={FormStyles.requisiti}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          navigation.navigate("AutoComplete", {
                            path: "PosizioniModal",
                            items: Requisiti,
                            for: "Requisiti"
                          });
                        }}
                      >
                        <Light style={{ fontSize: 11 }}>
                          Aggiungi Requisito +
                        </Light>
                      </TouchableWithoutFeedback>
                    </View>
                  ) : (
                    <View style={FormStyles.requisitiL}>
                      {requirements()}
                      <Light
                        onPress={() => {
                          setActive(-1);
                          navigation.navigate("AutoComplete", {
                            path: "Posizioni",
                            items: Requisiti,
                            for: "Requisiti"
                          });
                        }}
                        style={{
                          fontSize: 40,
                          color: "#26547C",
                          marginLeft: 10,
                          alignSelf: "center"
                        }}
                      >
                        +
                      </Light>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
          <StepsLabel text={"Descrizione"} />
          <FormTextInput
            large="true"
            multiline
            numberOfLines={4}
            placeholder="Esempio Descrizione"
            onFocus={() => setZoom(true)}
            onEndEditing={() => setZoom(false)}
            textAlignVertical={"top"}
            style={zoom ? FormStyles.xlarge : FormStyles.large}
            placeholderTextColor="#ADADAD"
            onChangeText={val => setDescription(val)}
            editable
            value={description}
          />
          {zoom && (
            <View style={{ alignItems: "center" }}>
              <RoundButton
                onPress={() => setZoom(false)}
                color={Colors.red}
                text={"Conferma"}
                textColor={"white"}
              />
            </View>
          )}
          {socio == "Socio Finanziatore" ? buttons(true) : buttons(false)}
        </ScrollView>
      </View>
    </View>
  );
}

Posizioni.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  aggiungiWrapper: {
    alignItems: "center",
    flexDirection: "column",
    margin: 20,
    marginBottom: 10
  },
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
    flex: 1
  },
  link: {
    color: "#26547C",
    textDecorationLine: "underline"
  }
});
