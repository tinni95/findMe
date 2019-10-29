import { createStackNavigator } from 'react-navigation';

import {
  LoginScreen,
  LandingPageWrapper,
  LandingPage,
  SignUpScreenUser,
  SignUpScreenCompany
} from '../screens/AuthenticationStack';

export default createStackNavigator({
  LandingPageWrapper,
  LandingPage,
  LoginScreen,
  SignUpScreenUser,
  SignUpScreenCompany
});
