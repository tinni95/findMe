import { createStackNavigator } from 'react-navigation';
import QuestionScreen from '../../../screens/HomeStack/QuestionScreen';
import CreateCommentScreen from '../../../screens/HomeStack/CreateCommentScreen';
import LikedByScreen from "../../../screens/HomeStack/LikedByScreen"

export const QuestionScreenModal = createStackNavigator(
    {
        QuestionScreen,
        CreateCommentScreen,
        LikedByScreen
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

QuestionScreenModal.navigationOptions = {
    header: null
}