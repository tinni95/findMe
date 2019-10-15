import { createStackNavigator } from 'react-navigation';

import { LoginScreen, LandingPageQueryRenderer, SignUpScreen } from '../screens/AuthenticationStack';

export default createStackNavigator({
    LandingPage: LandingPageQueryRenderer,
    LoginScreen,
    SignUpScreen
})

