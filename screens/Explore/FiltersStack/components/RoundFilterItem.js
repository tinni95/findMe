import React, { useState } from "react";
import RoundButton from "../../../../components/shared/RoundButton";

export function RoundFilterItem({ maximum, items, text, removeItem, addItem, isActive }) {
     isActive = isActive ? true : false
     const [active, setActive] = useState(isActive);
     return (
          <RoundButton isLight={true} styleProps={{ borderWidth: 0.5, borderColor: "#707070" }}
               text={text} textColor={active ? "#FFF" : "#5F5E5E"}
               color={active ? "#DD1E63" : "#FFF"}
               onPress={async () => {
                    if (active) {

                         removeItem(text)
                         await setActive(!active)
                    }
                    else {
                         addItem(text)
                         maximum && items ? items.length < maximum && await setActive(!active)
                              : await setActive(!active)
                    }

               }} />)
}
