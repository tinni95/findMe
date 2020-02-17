
import React, { useState } from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import { View } from 'react-native';
import Colors from '../constants/Colors';

export default function TenditTextInput(props) {
    const [focus, setFocus] = useState(false);
    return (<View>
        <TextInput
            {...props}
            ref={props.reference}
            style={{ backgroundColor: "white" }}
            selectionColor={Colors.primary}
            underlineColor={"white"}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            theme={{ colors: { placeholder: focus ? "grey" : Colors.primary } }}
        />
        <View style={{ marginTop: -2, backgroundColor: "white", borderTopColor: "white", borderTopWidth: 10 }} />
        {(props.hintError ? <HelperText
            type="error"
            visible={props.hintError}>
            {props.hintText}
        </HelperText> : null)
        }
    </View>)
}