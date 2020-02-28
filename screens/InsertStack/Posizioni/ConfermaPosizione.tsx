import React from "react";
import { View, StyleSheet } from "react-native";
import StepsLabel from "../../../shared/components/StepsLabel";
import FormTextInput from "../../../shared/components/Form/FormTextInput";
import SingleFilter from "../../../shared/components/Filters/SingleFilter";
import RoundButton from "../../../shared/components/RoundButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { indexOfPosition } from "../../../shared/functions/IndexOfPosition";
import { Settori } from "../../../shared/constants/Settori";
import { TipoSocio } from "../../../shared/constants/TipoSocio";
import { FormStyles } from "../../../shared/components/Form/FormStyles";
import { isBigDevice } from "../../../shared/constants/Layout";

var shortid = require("shortid");
const POST_POSIZIONI = gql`
  query PosizioniQuery {
    postPositions @client {
      field
      type
      description
      requisiti
      title
    }
  }
`;

export default function ConfermaPosizione({ navigation, route }) {
  const { data } = useQuery(POST_POSIZIONI);
  const client = useApolloClient();
  const posizioni = data.postPositions || [];
  const title = route.params.title;
  const description = route.params.description;
  const categoria = route.params.categoria;
  const requisiti = route.params.requisiti;
  const skip = route.params.skip;
  const activeIndex = Settori.indexOf(categoria);
  const socio = route.params.socio;
  const activeIndexSocio = TipoSocio.indexOf(socio);

  const handlePress = () => {
    let posizione = {
      __typename: "data",
      titolo: socio == "Socio Finanziatore" ? "Finanziatore" : title,
      type: socio,
      field: socio == "Socio Finanziatore" ? "Servizi Finanziari" : categoria,
      description,
      requisiti
    };
    var PositionIndex = indexOfPosition(posizioni, posizione);
    if (PositionIndex != -1) {
      return alert(
        "è gia stata aggiunta questa posizione, devi cambiare almeno un campo"
      );
    }
    client.writeData({
      data: {
        postPositions: [...posizioni, posizione]
      }
    });
    skip
      ? navigation.navigate("Anteprima")
      : navigation.navigate("Posizioni", {
          settore: Math.floor(Math.random() * -1000),
          item: null
        });
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <KeyboardAwareScrollView>
          <View opacity={0.6}>
            <StepsLabel text={"Cosa Cerco"} />
            <SingleFilter
              setItem={() => {}}
              inactive={true}
              settori={TipoSocio}
              settoreAttivi={activeIndexSocio}
            />
            <View style={{ height: 15 }}></View>
            {socio != "Socio Finanziatore" ? (
              <FormTextInput
                editable={false}
                style={FormStyles.input}
                value={title}
                placeholder="Titolo Posizione"
              />
            ) : null}
            <StepsLabel text={"Descrizione"} />
            <FormTextInput
              editable={false}
              large="true"
              multiline
              style={FormStyles.large}
              numberOfLines={4}
              placeholder="Descrizione"
              placeholderTextColor="#ADADAD"
              value={description}
            />
            {socio != "Socio Finanziatore" ? (
              <View>
                <StepsLabel text="Requisiti" />
                {
                  <View style={FormStyles.requisitiL}>
                    {requisiti.map(requisito => {
                      return (
                        <View
                          key={shortid.generate()}
                          style={{ margin: 5, flexDirection: "row" }}
                        >
                          <RoundButton
                            onPress={() => {}}
                            isLight={true}
                            text={requisito}
                            textColor={"white"}
                            color={"#26547C"}
                          ></RoundButton>
                        </View>
                      );
                    })}
                  </View>
                }
                <StepsLabel text="Categoria" />
                <SingleFilter
                  setItem={null}
                  inactive={true}
                  settori={Settori}
                  settoreAttivi={activeIndex}
                />
              </View>
            ) : null}
          </View>
          <View style={styles.buttonWrapper}>
            <RoundButton
              text={"Annulla"}
              color={"#DD1E63"}
              textColor={"white"}
              onPress={() => navigation.goBack()}
            />
            <RoundButton
              text={"Conferma"}
              color={"#10476C"}
              textColor={"white"}
              onPress={() => handlePress()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

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
