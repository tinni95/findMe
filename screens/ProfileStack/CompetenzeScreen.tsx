import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../shared/constants/Colors";
import { Searchbar } from "react-native-paper";
import { Requisiti } from "../../shared/constants/Requisiti";
import RoundButton from "../../shared/components/RoundButton";
import { Body } from "../../shared/components/StyledText";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import HeaderRight from "../../shared/components/HeaderRight";
import { LinearGradient } from "expo-linear-gradient";
let shortid = require("shortid");

const UPDATEUSER_MUTATION = gql`
  mutation updateUser($competenze: UserUpdatecompetenzeInput) {
    updateUser(competenze: $competenze) {
      id
    }
  }
`;

export default function CompetenzeScreen({ navigation, route }) {
  navigation.setOptions({
    headerRight: () => (
      <HeaderRight
        text={"Conferma"}
        onPress={() =>
          updateUser({ variables: { competenze: { set: competenze } } })
        }
      />
    )
  });
  //mutation
  const [updateUser] = useMutation(UPDATEUSER_MUTATION, {
    onCompleted: async ({ updateUser }) => {
      navigation.navigate("ProfilePage", {
        refetch: Math.floor(Math.random() * -1000)
      });
    }
  });
  //hooks
  const [competenze, setCompetenze] = useState(route.params.competenze);
  const scrollViewRef = useRef<any>();
  const [text, setText] = useState<string>("");
  const [active, setActive] = useState<number>(-1);
  //functions
  let filteredItems = Requisiti.filter(item =>
    item.toLowerCase().includes(text.toLowerCase())
  );
  filteredItems = filteredItems.length == 0 ? [text] : filteredItems;
  const renderItems = filteredItems.slice(0, 10).map(item => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!competenze.includes(item)) {
            setCompetenze([...competenze, item]);
            setActive(-1);
          }
        }}
        key={shortid.generate()}
        style={styles.item}
      >
        <Body style={styles.itemText}>{item}</Body>
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={["#EBEBEB", "#FFFDFD"]}
          style={styles.line}
        />
      </TouchableOpacity>
    );
  });
  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Searchbar
          onChangeText={text => setText(text)}
          value={text}
          placeholder="Cerca Competenza"
          inputStyle={{ fontSize: 14 }}
          style={{
            backgroundColor: "#F2F2F2",
            shadowColor: "transparent",
            width: "80%",
            margin: 20,
            height: 35
          }}
        ></Searchbar>
      </View>
      <ScrollView
        onContentSizeChange={(contentWidth, contentHeight) => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        <View style={{ flexDirection: "row", marginLeft: 20, marginRight: 10 }}>
          {competenze.map((competenza, index) => {
            let isActive = active === index;
            return (
              <View
                style={{
                  margin: 5,
                  marginLeft: isActive ? 0 : 5,
                  marginRight: isActive ? 0 : 5,
                  flexDirection: "row"
                }}
                key={shortid.generate()}
              >
                <RoundButton
                  onPress={() => {
                    if (isActive) {
                      let newCompetenze = competenze.filter(
                        el => el != competenze[index]
                      );
                      setCompetenze(newCompetenze);
                      setActive(-1);
                    } else {
                      setActive(index);
                    }
                  }}
                  isMedium={true}
                  key={shortid.generate()}
                  color={isActive ? Colors.red : Colors.blue}
                  textColor="white"
                  text={competenza}
                ></RoundButton>
                {isActive ? (
                  <Ionicons
                    name={"ios-close"}
                    size={30}
                    color={"#989090"}
                    style={{ marginTop: -10 }}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.spacer}></View>
      <ScrollView onScrollBeginDrag={Keyboard.dismiss}>
        <View>{renderItems}</View>
      </ScrollView>
      <View style={styles.buttonWrapper}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemText: {
    color: Colors.black,
    margin: 10,
    marginBottom: 5,
    fontSize: 16
  },
  item: {
    marginTop: 5,
    marginLeft: 15
  },
  spacer: {
    height: 10
  },
  buttonWrapper: {
    alignItems: "center",
    margin: 35
  },
  line: {
    height: 1.5
  }
});
