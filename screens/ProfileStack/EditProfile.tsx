import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Platform
} from "react-native";
import Colors from "../../shared/constants/Colors";
import { width } from "../../shared/constants/Layout";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import FormTextInput from "../../shared/components/Form/FormTextInput";
import WithErrorString from "../../shared/components/Form/WithErrorString";
import StepsLabel, {
  StepsLabelWithHint
} from "../../shared/components/StepsLabel";
import { FormStyles } from "../../shared/components/Form/FormStyles";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import TenditSpinner from "../../shared/graphql/TenditSpinner";
import HeaderRight from "../../shared/components/HeaderRight";
import ZoomButton from "../../shared/components/ZoomButton";
const _ = require("lodash");
const UPDATEUSER_MUTATION = gql`
  mutation updateUser(
    $email: String
    $password: String
    $nome: String
    $cognome: String
    $comune: String
    $regione: String
    $provincia: String
    $picture: String
    $presentazione: String
    $posizione: String
    $DoB: String
  ) {
    updateUser(
      posizione: $posizione
      email: $email
      password: $password
      nome: $nome
      cognome: $cognome
      comune: $comune
      regione: $regione
      provincia: $provincia
      picture: $picture
      presentazione: $presentazione
      DoB: $DoB
    ) {
      pictureUrl
      posizione
    }
  }
`;

export default function EditProfile({ navigation, route }) {
  navigation.setOptions({
    headerRight: () => (
      <HeaderRight text={"Conferma"} onPress={() => handlePress()} />
    )
  });
  //passedLocation (autocomplete)
  const passedComune = route.params?.comune ?? "";
  const passedRegione = route.params?.regione ?? "";
  const passedProvincia = route.params?.provincia ?? "";

  //hooks
  const [loading, setLoading] = useState(false);
  const currentUser = route.params?.currentUser ?? "";
  const [zoom, setZoom] = useState(false);
  const [visibleDate, setVisibleDate] = useState(false);
  const [nome, setNome] = useState(currentUser.nome);
  const [posizione, setPosizione] = useState(currentUser.posizione);
  const [nomeError, setNomeError] = useState(false);
  const [cognome, setCognome] = useState(currentUser.cognome);
  const [cognomeError, setCognomeError] = useState(false);
  const [DoB, setDoB] = useState(currentUser.DoB ? currentUser.DoB : "");
  const [comune, setComune] = useState(
    currentUser.comune ? currentUser.comune : ""
  );
  const [regione, setRegione] = useState(
    currentUser.regione ? currentUser.regione : ""
  );
  const [provincia, setProvincia] = useState(
    currentUser.provincia ? currentUser.provincia : ""
  );
  const [presentazione, setPresentazione] = useState(
    currentUser.presentazione ? currentUser.presentazione : ""
  );
  //useEffect
  useEffect(() => {
    passedComune ? setComune(passedComune) : null;
    passedProvincia ? setProvincia(passedProvincia) : null;
    passedRegione ? setRegione(passedRegione) : null;
  });

  let scrollview = useRef();

  const [updateUser] = useMutation(UPDATEUSER_MUTATION, {
    onCompleted: async ({ updateUser }) => {
      console.log(updateUser);
      navigation.navigate("ProfilePage", {
        refetch: Math.floor(Math.random() * -1000)
      });
    }
  });

  const _handleDatePicked = dates => {
    setVisibleDate(false);
    setDoB(moment(dates).format("DD-MM-YYYY"));
  };

  const getPermissionAsync = async () => {
    if (Platform.OS == "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const PickImage = async () => {
    await getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1
    });

    if (!result.cancelled) {
      setImage({ uri: result.uri });
    }
  };

  const handlePress = () => {
    if (nome.length === 0) {
      setNomeError(true);
    } else {
      setNomeError(false);
    }
    if (cognome.length === 0) {
      setCognomeError(true);
    } else {
      setCognomeError(false);
    }
    if (nome.length > 0 && cognome.length > 0) {
      submit();
    }
  };

  const submit = () => {
    const data = new FormData();
    const name = currentUser.email + ".jpg";

    if (_.isEqual(image, initialImage)) {
      console.log("yea");
      updateUser({
        variables: {
          DoB,
          nome,
          cognome,
          presentazione,
          comune,
          regione,
          provincia,
          posizione
        }
      });
    } else {
      data.append("photo", {
        uri:
          Platform.OS === "android"
            ? image.uri
            : image.uri.replace("file://", ""),
        type: "image/jpeg",
        name
      });
      setLoading(true);
      fetch("http://gladiator1924.com/images/upload2.php", {
        method: "post",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      }).then(response => {
        if (response == "No") {
          alert("error uploading file", "a");
          setLoading(false);
        } else {
          setLoading(true);
          updateUser({
            variables: {
              picture: "http://gladiator1924.com/images/images/" + name,
              DoB,
              nome,
              cognome,
              presentazione,
              comune,
              regione,
              posizione,
              provincia
            }
          });
        }
      });
    }
  };
  const initialImage = currentUser.pictureUrl
    ? { uri: currentUser.pictureUrl }
    : require("../../assets/images/placeholder.png");
  const [image, setImage] = useState(initialImage);

  const pen = require("../../assets/images/pen.png");
  if (loading) {
    return <TenditSpinner></TenditSpinner>;
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView ref={scrollview} contentContainerStyle={{ margin: 20 }}>
          {!zoom && (
            <View>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => PickImage()}>
                  <Image
                    source={image}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                  <View style={styles.penWrapper}>
                    <Image source={pen} style={{ width: 20, height: 20 }} />
                  </View>
                </TouchableOpacity>
              </View>
              <StepsLabel error={nomeError} text={"Nome"} />
              <WithErrorString
                error={nomeError}
                errorText={"Campo Obbligatorio"}
              >
                <FormTextInput
                  placeholder={"Nome"}
                  onChangeText={val => setNome(val)}
                  value={nome}
                  style={nomeError ? FormStyles.inputError : FormStyles.input}
                />
              </WithErrorString>
              <StepsLabel error={cognomeError} text={"Cognome"} />
              <WithErrorString
                error={cognomeError}
                errorText={"Campo Obbligatorio"}
              >
                <FormTextInput
                  placeholder={"Cognome"}
                  onChangeText={val => setCognome(val)}
                  value={cognome}
                  style={
                    cognomeError ? FormStyles.inputError : FormStyles.input
                  }
                />
              </WithErrorString>
              <StepsLabel text={"Posizione"} />
              <FormTextInput
                placeholder={"Posizione"}
                onChangeText={val => setPosizione(val)}
                value={posizione}
                style={FormStyles.input}
              />
              <StepsLabel text={"Data Di Nascita"} />
              <TouchableOpacity onPress={() => setVisibleDate(true)}>
                <FormTextInput
                  pointerEvents="none"
                  editable={false}
                  value={DoB}
                  style={
                    cognomeError ? FormStyles.inputError : FormStyles.input
                  }
                />
              </TouchableOpacity>
              <StepsLabel text={"Città"} />
              <FormTextInput
                style={FormStyles.input}
                value={
                  comune.length > 0
                    ? comune + ", " + provincia + ", " + regione
                    : ""
                }
                onFocus={() =>
                  navigation.navigate("AutoCompleteLocation", {
                    path: "Edit"
                  })
                }
              />
            </View>
          )}
          <StepsLabelWithHint
            tooltipText={
              "Scrivi una biografia che ti serve a descriverti, per aiutare agli altri utenti a capire se sei fatto per la loro attività"
            }
            text={"Presentazione"}
          />
          <FormTextInput
            large="true"
            multiline
            numberOfLines={4}
            onChangeText={val => setPresentazione(val)}
            onFocus={() => setZoom(true)}
            onEndEditing={() => setZoom(false)}
            textAlignVertical={"top"}
            style={zoom ? FormStyles.xlarge : FormStyles.large}
            value={presentazione}
          />
          {zoom && <ZoomButton onPress={() => setZoom(false)} />}
          <DateTimePicker
            isVisible={visibleDate}
            onConfirm={_handleDatePicked}
            onCancel={() => setVisibleDate(false)}
            maximumDate={new Date()}
          />
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flex: 1.5,
    backgroundColor: Colors.blue,
    width: width,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  button: {
    margin: 20
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  penWrapper: {
    backgroundColor: "white",
    alignSelf: "flex-end",
    marginTop: -30,
    marginRight: 5,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 5
      },
      web: {
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 3
      }
    }),
    padding: 7.5,
    borderRadius: 25
  },
  buttonWrapper: {
    alignItems: "center",
    margin: 35
  }
});
