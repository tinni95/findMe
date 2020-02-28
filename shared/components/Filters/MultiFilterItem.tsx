import React, { useState, useEffect } from "react";
import RoundButton from "../RoundButton";
import Colors from "../../constants/Colors";

export function MultiFilterItem({
  maximum,
  items,
  text,
  removeItem,
  addItem,
  isActive,
  reset
}) {
  isActive = isActive ? true : false;
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    if (reset) {
      setActive(false);
    }
  }, [reset]);

  return (
    <RoundButton
      isLight={true}
      text={text}
      textColor={active ? "#FFF" : "#5F5E5E"}
      color={active ? Colors.ocean : "#FFF"}
      onPress={async () => {
        if (active) {
          removeItem(text);
          await setActive(!active);
        } else {
          addItem(text);
          maximum && items
            ? items.length < maximum && (await setActive(!active))
            : await setActive(!active);
        }
      }}
    />
  );
}
