import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import StepsLabel, {
  StepsLabelError
} from "../../../shared/components/StepsLabel";
import WithErrorString from "../../../shared/components/Form/WithErrorString";
import FormTextInput from "../../../shared/components/Form/FormTextInput";
import RoundButton from "../../../shared/components/RoundButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Settori } from "../../../shared/constants/Settori";
import { indexOfPosition } from "../../../shared/functions/IndexOfPosition";
import { TipoSocio } from "../../../shared/constants/TipoSocio";
import { TitoliPosizioni } from "../../../shared/constants/TitoliPosizioni";
import { FormStyles } from "../../../shared/components/Form/FormStyles";
import RoundFiltersOne from "../../../shared/components/Filters/SingleFilter";
import { isBigDevice } from "../../../shared/constants/Layout";
import { Light } from "../../../shared/components/StyledText";
import { Ionicons } from "@expo/vector-icons";
var _ = require("lodash");
var shortid = require("shortid");

const POST_POSIZIONI = gql`
  query PosizioniQuery {
    postPositions @client {
      field
      type
      description
      title
    }
  }
`;

export default function ModificaPosizione({ navigation, route }) {
  const { data } = useQuery(POST_POSIZIONI);
  const client = useApolloClient();
  const [requisiti, setRequisiti] = useState(route.params.requisiti);
  const [active, setActive] = useState<number>(-1);
  const [title, setTitle] = useState(route.params.title);
  const [description, setDescription] = useState(route.params.description);
  const [categoria, setCategoria] = useState(route.params.categoria);
  const activeIndexCategoria = Settori.indexOf(categoria);
  const [socio, setSocio] = useState(route.params.socio);
  const activeIndexSocio = TipoSocio.indexOf(socio);
  const [requisitiError, setRequisitiError] = useState(false);
  const [socioError, setSocioError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [categoriaError, setCategoriaError] = useState(false);
  const [positionInArray, setPositionInArray] = useState(-1);
  let posizioni = data.postPositions || [];
  let passedTitle =
    route.params.for == "Titoli" ? route.params?.title ?? null : null;
  let passedRequisito =
    route.params.for == "Requisiti" ? route.params?.title ?? null : null;

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

  useEffect(() => {
    const posizione = {
      __typename: "data",
      title,
      type: TipoSocio[activeIndexSocio],
      field: Settori[activeIndexCategoria],
      description
    };
    setPositionInArray(indexOfPosition(posizioni, posizione));
  }, []);

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
    if (description.length === 0) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
    if (requisiti.length === 0 && !bool) {
      setRequisitiError(true);
    } else {
      setRequisitiError(false);
    }
    if (categoria.length === 0 && !bool) {
      setCategoriaError(true);
    } else {
      setCategoriaError(false);
    }
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
      description.length > 0 &&
      ((categoria.length > 0 &&
        socio.length > 0 &&
        title.length > 0 &&
        requisiti.length > 0) ||
        bool)
    ) {
      const posizione = {
        __typename: "data",
        title: socio == "Socio Finanziatore" ? "Finanziatore" : title,
        type: socio,
        field: socio == "Socio Finanziatore" ? "Servizi Finanziari" : categoria,
        description,
        requisiti: socio == "Socio Finanziatore" ? [] : requisiti
      };
      posizioni[positionInArray] = posizione;
      client.writeData({
        data: {
          postPositions: posizioni
        }
      });
      navigation.navigate("ModificaPosizioni", { refresh: true });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <KeyboardAwareScrollView>
          <StepsLabel error={socioError} text={"Cosa Cerco"} />
          <RoundFiltersOne
            inactive={false}
            settori={TipoSocio}
            setItem={item => setSocio(item)}
            settoreAttivi={activeIndexSocio}
          />
          <View style={{ height: 15 }}></View>
          {socio != "Socio Finanziatore" ? (
            <WithErrorString
              error={titleError}
              errorText={"Campo Obbligatorio"}
            >
              <FormTextInput
                value={title}
                onFocus={() =>
                  navigation.navigate("AutoComplete", {
                    path: "ModificaPosizione",
                    items: TitoliPosizioni,
                    for: "Titoli"
                  })
                }
                onChangeText={val => setTitle(val)}
                placeholder="Titolo Posizione"
                style={titleError ? FormStyles.inputError : FormStyles.input}
              />
            </WithErrorString>
          ) : null}
          {socio != "Socio Finanziatore" ? (
            <View>
              {categoriaError ? (
                <StepsLabelError text="Categoria" />
              ) : (
                <StepsLabel text="Categoria (es. Economia, Ingegneria...)" />
              )}
              <RoundFiltersOne
                inactive={false}
                settori={Settori}
                setItem={item => setCategoria(item)}
                settoreAttivi={activeIndexCategoria}
              />
              {requisitiError ? (
                <StepsLabelError text="Requisiti" />
              ) : (
                <StepsLabel text="Requisiti" />
              )}
              {requisiti.length == 0 ? (
                <View style={FormStyles.requisiti}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate("AutoComplete", {
                        path: "ModificaPosizione",
                        items: TitoliPosizioni,
                        for: "Requisiti"
                      });
                    }}
                  >
                    <Light>AGGIUNGI REQUISITO +</Light>
                  </TouchableWithoutFeedback>
                </View>
              ) : (
                <View style={FormStyles.requisitiL}>
                  {requirements()}
                  <Light
                    onPress={() =>
                      navigation.navigate("AutoComplete", {
                        path: "ModificaPosizione",
                        items: TitoliPosizioni,
                        for: "Requisiti"
                      })
                    }
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
          ) : null}
          <StepsLabel error={descriptionError} text={"Descrizione"} />
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
            <RoundButton
              text={"Annulla"}
              color={"#DD1E63"}
              textColor={"white"}
              onPress={() => navigation.goBack()}
            />
            <RoundButton
              text={"PROCEDI"}
              color={"#10476C"}
              textColor={"white"}
              onPress={() =>
                socio != "Socio Finanziatore"
                  ? handlePress(false)
                  : handlePress(true)
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

ModificaPosizione.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  aggiungiWrapper: {
    alignItems: "center",
    flexDirection: "column",
    margin: 20
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
    flex: 1.5
  }
});
