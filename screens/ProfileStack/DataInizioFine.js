import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import FormTextInput from '../shared/Form/FormTextInput';
import { FormStyles } from '../shared/Form/FormStyles';
import WithErrorString from '../shared/Form/WithErrorString';
import DataOverlayModal from './DataOverlayModal';

export default function DataInizioFine({ dataInizio, setDataInizio, dataFine, setDataFine, dataInizioError, dataFineError }) {
    const [modalVisibile, setModalVisible] = useState(false)
    const [modal1Visibile, setModal1Visible] = useState(false)
    return (
        <View>
            <View style={FormStyles.inputHalfsContainer}>
                <View style={FormStyles.inputHalfContainer}>
                    <WithErrorString error={dataInizioError} errorText={"Campo Obbligatorio"}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}>
                            <FormTextInput
                                editable={false}
                                pointerEvents="none"
                                style={dataInizioError ? FormStyles.inputHalfError : FormStyles.inputHalf}
                                value={dataInizio}
                                placeholder="Data Inizio"
                                placeholderTextColor="#ADADAD"
                            />
                        </TouchableOpacity>
                    </WithErrorString>
                </View>
                <View style={FormStyles.inputHalfContainer}>
                    <WithErrorString error={dataFineError} errorText={"Campo Obbligatorio"}>
                        <TouchableOpacity
                            onPress={() => setModal1Visible(true)}>
                            <FormTextInput
                                editable={false}
                                pointerEvents="none"
                                style={dataFineError ? FormStyles.inputHalfError : FormStyles.inputHalf}
                                placeholder="Data Fine"
                                value={dataFine}
                                placeholderTextColor="#ADADAD"
                                onChangeText={val => setDataFine(val)}
                            />
                        </TouchableOpacity>
                    </WithErrorString>
                </View>
            </View>
            <DataOverlayModal modalVisibile={modalVisibile} setModalVisible={setModalVisible} setDate={setDataInizio}></DataOverlayModal>
            <DataOverlayModal fine={true} modalVisibile={modal1Visibile} setModalVisible={setModal1Visible} setDate={setDataFine}></DataOverlayModal>
        </View>)
}