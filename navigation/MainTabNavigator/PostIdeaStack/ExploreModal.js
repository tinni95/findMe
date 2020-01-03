
import { createStackNavigator } from 'react-navigation-stack';
import Explore from '../../../screens/Explore/Explore';
import InsertStack from "../InsertStack"

export default ExploreModal = createStackNavigator(
    {
        Explore,
        InsertStack
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

ExploreModal.navigationOptions = {
    header: null
}