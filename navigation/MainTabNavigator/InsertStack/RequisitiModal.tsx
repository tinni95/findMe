
import { createStackNavigator } from 'react-navigation-stack';
import AutoCompletePosizioni from "../../../shared/components/AutoCompletePosizioni";
import Requisiti from "../../../screens/InsertStack/Requisiti";

const Stack = createStackNavigator();

const PosizioniModal = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Requisiti"
        component={Requisiti}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AutoComplete"
        options={{ headerShown: false }}
        component={AutoCompletePosizioni}
      />
    </Stack.Navigator>
  );
};
export default PosizioniModal;
