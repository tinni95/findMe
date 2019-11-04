import React from 'react';
import { Modal, View } from 'react-native';
import {FiltersModalHeader} from './FiltersModalHeader';
import {FiltersModalBody} from './FiltersModalBody';

export default class FiltersModal extends React.Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{ marginTop: 40 }}>
          <View>
            <FiltersModalHeader setModalVisible={this.props.setModalVisible} />
            <FiltersModalBody />
          </View>
        </View>
      </Modal>
    );
  }
}
