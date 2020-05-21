import { View, Picker, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import Overlay from 'react-native-modal-overlay';
import { Light, Bold } from './StyledText';
import Colors from '../constants/Colors';

export default function HourOverlayModal({ fine, modalVisibile, setModalVisible, setTime }) {
  const [month, setMonth] = useState('Gen');
  const [minutes, setMinutes] = useState(2019);
  const handlePick = () => {
    setTime(month + ' ' + minutes);
    setModalVisible(false);
  };

  return (
    <Overlay
      childrenWrapperStyle={{
        height: Platform.OS == 'ios' ? 250 : fine ? 150 : 100,
      }}
      visible={modalVisibile}
      onClose={() => setModalVisible(false)}
      closeOnTouchOutside>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Light style={{ color: Colors.red }}>Annulla</Light>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePick()}>
          <Light style={{ color: Colors.blue }}>Conferma</Light>
        </TouchableOpacity>
      </View>
      {fine && (
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => handleInCorso()}>
          <Bold style={{ color: Colors.ocean }}>Ancora in Corso</Bold>
        </TouchableOpacity>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Picker
          selectedValue={month}
          style={{ height: 50, width: '45%' }}
          onValueChange={(itemValue, itemIndex) => {
            setMonth(itemValue);
          }}>
          <Picker.Item label="Gennaio" value="Gen" />
          <Picker.Item label="Febbraio" value="Feb" />
          <Picker.Item label="Marzo" value="Mar" />
          <Picker.Item label="Aprile" value="Apr" />
          <Picker.Item label="Maggio" value="Mag" />
          <Picker.Item label="Giugno" value="Giu" />
          <Picker.Item label="Luglio" value="Lug" />
          <Picker.Item label="Agosto" value="Ago" />
          <Picker.Item label="Settembre" value="Set" />
          <Picker.Item label="Ottobre" value="Ott" />
          <Picker.Item label="Novembre" value="Nov" />
          <Picker.Item label="Dicembre" value="Dic" />
        </Picker>
        <Picker
          selectedValue={year}
          style={{ height: 50, width: '45%' }}
          onValueChange={(itemValue, itemIndex) => {
            setMinutes(itemValue);
          }}>
          <Picker.Item label="00" value="00" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="20" value="20" />
          <Picker.Item label="30" value="30" />
          <Picker.Item label="40" value="40" />
          <Picker.Item label="50" value="50" />
        </Picker>
      </View>
    </Overlay>
  );
}
