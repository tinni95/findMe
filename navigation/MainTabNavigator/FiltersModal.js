import { createStackNavigator } from 'react-navigation-stack';
import FiltersPage from "../../screens/Explore/FiltersStack";
import { AutoComplete } from "../../screens/shared/AutoComplete"

export default FiltersModal = createStackNavigator(
    {
        FiltersPage,
        AutoComplete
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);