import { createStackNavigator } from 'react-navigation';

import { LoginScreen, LandingPage } from '../screens/AuthenticationStack';

export default createStackNavigator({
    LandingPage,
    LoginScreen
})

