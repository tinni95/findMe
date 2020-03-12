import React, { useState, useEffect, FunctionComponent } from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import RoundButton from "../RoundButton";
import Colors from "../../constants/Colors";

type SingleFilterProps = {
  wrapperStyle?: StyleProp<ViewStyle>;
  settoreAttivi: any;
  setItem: any;
  settori: any;
  inactive: Boolean;
};

const SingleFilter: FunctionComponent<SingleFilterProps> = ({
  inactive,
  settori,
  setItem,
  settoreAttivi,
  wrapperStyle
}) => {
  const [selected, setSelected] = useState(settoreAttivi);
  useEffect(() => {
    setSelected(settoreAttivi);
  }, [settoreAttivi]);

  let filters, active;
  filters = settori.map((settore, index) => {
    active = index === selected;
    return (
      <View key={index} style={{ margin: 5 }}>
        <RoundButton
          isMedium={true}
          text={settore}
          textColor={active ? "#FFF" : "#5F5E5E"}
          color={active ? Colors.ocean : "#FFF"}
          onPress={() => {
            if (!inactive) {
              setItem(settore);
              setSelected(index);
            }
          }}
        />
      </View>
    );
  });
  return <View style={[styles.wrapper, wrapperStyle]}>{filters}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default SingleFilter;
