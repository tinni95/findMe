import React from 'react';
import { View, TouchableOpacity, Text, Linking, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { updateUser } from "../../mutations/UserMutations/UpdateUser";
export default class ProfilePage extends React.Component {

  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      Alert.alert(
        'Missing camera roll permissions',
        'Permissions can be edited in Settings',
        [
          { text: 'Go to Settings', onPress: () => Linking.openURL('app-settings:') },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: true }
      )
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      const response = await uploadImage(result.uri);
      console.log(response)
    }
  };

  state = {
    image: ""
  }
  render() {
    return (
      <TouchableOpacity onPress={this._pickImage} style={{ backgroundColor: "blue", flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{this.props.user.email}</Text>
        <Text style={{ fontSize: 30 }}>Image Upload</Text>
      </TouchableOpacity>
    );
  }
}
