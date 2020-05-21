import { createStackNavigator } from "react-navigation-stack";
import Categoria from "../../../screens/InsertStack/Categoria";
import Posizione from "../../../screens/InsertStack/Posizione";
import Quando from "../../../screens/InsertStack/Quando";
import Requisiti from "../../../screens/InsertStack/Requisiti";
import Descrizione from "../../../screens/InsertStack/Descrizione";
import Budget from "../../../screens/InsertStack/Budget";
import Anteprima from "../../../screens/InsertStack/Anteprima";
import Dove from "../../../screens/InsertStack/Dove";
import AutoCompleteLocation from "../../../shared/components/AutoCompleteLocation";
import UserVisitsProfileScreen from "../../../screens/shared/UserVisitsProfileScreen";
import FormazioniVisitScreen from "../../../screens/ProfileStack/Formazioni/FormazioniVisitScreen";
import ProgettiVisitScreen from "../../../screens/ProfileStack/Progetti/ProgettiVisitScreen";
import EsperienzeVisitScreen from "../../../screens/ProfileStack/Esperienze/EsperienzeVisitScreen";
const Stack = createStackNavigator({
	Categoria,
	AutoCompleteLocation,
	Posizione,
	Requisiti,
	Descrizione,
	Quando,
	Budget,
	Dove,
	Anteprima,
	UserVisitsProfileScreen,
	FormazioniVisitScreen,
	EsperienzeVisitScreen,
	ProgettiVisitScreen
  
});

Stack.navigationOptions = {
	headerMode:"none"
};
export default Stack;
