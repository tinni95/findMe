import { View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Overlay from 'react-native-modal-overlay';
import { Light, Bold, Body } from './StyledText';
import Colors from '../constants/Colors';
import FormTextInput from './Form/FormTextInput';
import { FormStyles } from './Form/FormStyles';
import RoundButton from './RoundButton';
export default function InputOverlayModal({
  setInput,
  input,
  title,
  modalVisibile,
  setModalVisible,
}) {
  const preinput = useRef<any>();
  const [text, setText] = useState('');

  useEffect(() => {
    modalVisibile && preinput.current.focus();
  }, [modalVisibile]);

  const handlePick = () => {
    if (!input.includes(text) && text.length > 0) {
      setInput([...input, text]);
      setText('');
    }
    setModalVisible(false);
  };

  return (
    <Overlay
      visible={modalVisibile}
      animationType={'fadeInUp'}
      childrenWrapperStyle={{ borderRadius: 20 }}
      onClose={() => setModalVisible(false)}
      closeOnTouchOutside>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Body
          style={{
            textAlign: 'center',
            color: Colors.blue,
          }}>
          {title}
        </Body>
      </View>
      <View
        style={{
          padding: 50,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <FormTextInput
          reference={preinput}
          onChangeText={(val) => setText(val)}
          value={text}
          style={FormStyles.inputRequisiti}
          onSubmitEditing={handlePick}
        />
        <RoundButton
          buttonStyle={{ marginTop: 25 }}
          onPress={handlePick}
          text={'OK'}
          color={Colors.blue}
          textColor={'white'}
        />
      </View>
    </Overlay>
  );
}
