import { createStackNavigator } from 'react-navigation';

import { LoginScreen, LandingPageWrapper, SignUpScreen } from '../screens/AuthenticationStack';

export default createStackNavigator({
    LandingPageWrapper,
    LoginScreen,
    SignUpScreen
})

