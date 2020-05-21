import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MultiFilterItem } from "./MultiFilterItem";
import RoundButton from "../RoundButton";
import { Body } from "../StyledText";
import Colors from "../../constants/Colors"

export default function MultiFilters({
  inactive,
  maximum,
  settori,
  addItem,
  removeItem,
  settoreAttivi,
  reset,
  wrapperStyle,
  items,
  hide,
}) {
  const [hidden, setHidden] = useState(hide);
  const [selected, setSelected] = useState(settoreAttivi);
  useEffect(() => {
    setSelected(settoreAttivi);
  });


  let filters, active;
  if (maximum == 1) {
    filters = settori.map((settore, index) => {
      active = index === selected;
      if ((hide && index < 8) || !hide)
        return (
          <View key={index} style={{ margin: 5 }}>
            <RoundButton
              isLight={true}
              text={settore}
              textColor={active ? "#FFF" : "#5F5E5E"}
              color={active ? Colors.red : "#FFF"}
              onPress={() => {
                if (!inactive) {
                  addItem(settore);
                  setSelected(index);
                }
              }}
            />
          </View>
        );
    });
  } else {
    filters = settori.map((settore, index) => {
      if ((hidden && index < 5) || !hidden)
        return (
          <View key={index} style={{ margin: 5 }}>
            <MultiFilterItem
              reset={reset}
              maximum={maximum}
              items={items}
              addItem={addItem}
              removeItem={removeItem}
              text={settore}
              isActive={settoreAttivi.includes(settore) ? true : false}
            />
          </View>
        );
      if (hidden && index == 5)
        return (
          <Body
            style={{ margin: 5, marginTop: 15, fontSize: 12, color: Colors.red }}
            onPress={() => setHidden(!hidden)}
            key={index}
          >
            ..Altro
          </Body>
        );
    });
  }
  return <View style={[styles.wrapper, wrapperStyle]}>{filters}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
