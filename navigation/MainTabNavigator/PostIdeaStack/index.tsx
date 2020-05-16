
import { createStackNavigator } from 'react-navigation-stack';
import AttivitàScreen from "../../../screens/Explore/Attività/AttivitàScreen";
import ApplyScreen from "../../../screens/Explore/Post/ApplyScreen";
import PostScreen from "../../../screens/Explore/Post/PostScreen";
import Chat from "../../../screens/Explore/Post/Chat";
import ApplicationReceivedScreen from "../../../screens/Explore/Attività/ApplicationReceivedScreen";
import FiltersModal from "./FiltersModal";
import UserVisitsProfileScreen from "../../../screens/shared/UserVisitsProfileScreen";
import FormazioniVisitScreen from "../../../screens/ProfileStack/Formazioni/FormazioniVisitScreen";
import ProgettiVisitScreen from "../../../screens/ProfileStack/Progetti/ProgettiVisitScreen";
import EsperienzeVisitScreen from "../../../screens/ProfileStack/Esperienze/EsperienzeVisitScreen";
import Explore from "../../../screens/Explore";

const Stack = createStackNavigator({
  Explore,
  PostScreen,
  EsperienzeVisitScreen,
  ProgettiVisitScreen,
  FormazioniVisitScreen,
  UserVisitsProfileScreen,
  FiltersModal,
  Chat,
  ApplicationReceivedScreen,
  ApplyScreen,
  AttivitàScreen
});

export default Stack;

