import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../../../screens/HomeStack/HomeScreen';
import CreateQuestionScreen from '../../../screens/HomeStack/CreateQuestionScreen';

export const HomeScreenModal = createStackNavigator(
    {
        HomeScreen,
        CreateQuestionScreen
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

HomeScreenModal.navigationOptions = {
    header: null
}
