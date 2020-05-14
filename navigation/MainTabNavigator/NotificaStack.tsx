import { createStackNavigator } from 'react-navigation-stack';
import AttivitàScreen from "../../screens/Explore/Attività/AttivitàScreen";
import PostScreen from "../../screens/Explore/Post/PostScreen";
import UserVisitsProfileScreen from "../../screens/shared/UserVisitsProfileScreen";
import ApplicationReceivedChat from "../../screens/Explore/Post/ApplicationReceivedChat";
import ApplicationSentChat from "../../screens/Explore/Post/ApplicationSentChat";
import ApplicationReceivedScreen from "../../screens/Explore/Attività/ApplicationReceivedScreen";
import FormazioniVisitScreen from "../../screens/ProfileStack/Formazioni/FormazioniVisitScreen";
import ProgettiVisitScreen from "../../screens/ProfileStack/Progetti/ProgettiVisitScreen";
import EsperienzeVisitScreen from "../../screens/ProfileStack/Esperienze/EsperienzeVisitScreen";
const NotificaStack = createStackNavigator({
  AttivitàScreen,
  ApplicationReceivedScreen,
  PostScreen,
  UserVisitsProfileScreen,
  ApplicationReceivedChat,
  ApplicationSentChat,
  FormazioniVisitScreen,
  ProgettiVisitScreen,
  EsperienzeVisitScreen

});

export default NotificaStack;
