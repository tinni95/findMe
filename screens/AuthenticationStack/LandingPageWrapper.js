import React from 'react';
import { AsyncStorage } from 'react-native';
import FindMeSpinner from '../../shared/relay/FindMeSpinner';
import { TOKEN_KEY } from '../../shared/Token';

const _asyncStorageGetToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export default class LandingPageWrapper extends React.Component {
  async componentDidMount() {
    const token = await _asyncStorageGetToken();
    console.log(token);
    if (token) {
      this.props.navigation.navigate('MainTabNavigator');
    } else {
      this.props.navigation.navigate('LandingPage');
    }
  }

  render() {
    return <FindMeSpinner />;
  }
}

LandingPageWrapper.navigationOptions = {
  header: null
};
