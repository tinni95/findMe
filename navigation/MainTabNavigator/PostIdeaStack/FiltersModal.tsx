import React from "react";
import { createStackNavigator } from 'react-navigation-stack';
import FiltersPage from "../../../screens/Explore/FiltersStack/FiltersPage";
import { AutoCompleteFiltri } from "../../../shared/components/AutoCompleteFiltri";
import HeaderLeft from "../../../shared/components/HeaderLeft";
import {
  headerStyle,
  headerTitleStyle
} from "../../../shared/constants/HeaderStyles";

const FiltersModal = createStackNavigator(
  {
      FiltersPage,
      AutoComplete: AutoCompleteFiltri
  },
  {
      mode: 'modal',
      headerMode: 'none',
  }
);

FiltersModal.navigationOptions = ({ navigation }) => {
  return {
      title: null,
      headerStyle,
      headerTitleStyle,
      headerLeft: () => <HeaderLeft navigation={navigation}/>
  }
}

export default FiltersModal;