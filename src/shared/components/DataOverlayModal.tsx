import { View, Picker, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import Overlay from 'react-native-modal-overlay';
import { Light, Bold, Body } from './StyledText';
import Colors from '../constants/Colors';

export default function DataOverlayModal({ fine, modalVisibile, setModalVisible, setDate }) {
  const [month, setMonth] = useState('Gen');
  const [year, setYear] = useState(2019);
  const handlePick = () => {
    setDate(month + ' ' + year);
    setModalVisible(false);
  };
  const handleInCorso = () => {
    setDate('In Corso');
    setModalVisible(false);
  };

  return (
    <Overlay
      childrenWrapperStyle={{
        height: Platform.OS == 'ios' ? 250 : fine ? 150 : 100,
        borderRadius: Platform.OS == 'ios' ? 15 : 5,
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
          <Body style={{ color: Colors.red }}>Annulla</Body>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePick()}>
          <Body style={{ color: Colors.blue }}>Conferma</Body>
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
            setYear(itemValue);
          }}>
          <Picker.Item label="2020" value="2020" />
          <Picker.Item label="2019" value="2019" />
          <Picker.Item label="2018" value="2018" />
          <Picker.Item label="2017" value="2017" />
          <Picker.Item label="2016" value="2016" />
          <Picker.Item label="2015" value="2015" />
          <Picker.Item label="2014" value="2014" />
          <Picker.Item label="2013" value="2013" />
          <Picker.Item label="2012" value="2012" />
          <Picker.Item label="2011" value="2011" />
          <Picker.Item label="2010" value="2010" />
          <Picker.Item label="2009" value="2009" />
          <Picker.Item label="2008" value="2008" />
          <Picker.Item label="2007" value="2007" />
          <Picker.Item label="2006" value="2006" />
          <Picker.Item label="2005" value="2005" />
          <Picker.Item label="2004" value="2004" />
          <Picker.Item label="2003" value="2003" />
          <Picker.Item label="2002" value="2002" />
          <Picker.Item label="2001" value="2001" />
          <Picker.Item label="2000" value="2000" />
          <Picker.Item label="1999" value="1999" />
          <Picker.Item label="1998" value="1998" />
          <Picker.Item label="1997" value="1997" />
          <Picker.Item label="1996" value="1996" />
          <Picker.Item label="1995" value="1995" />
          <Picker.Item label="1994" value="1994" />
          <Picker.Item label="1993" value="1993" />
          <Picker.Item label="1992" value="1992" />
          <Picker.Item label="1991" value="1991" />
        </Picker>
      </View>
    </Overlay>
  );
}
