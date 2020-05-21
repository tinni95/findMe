import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import FiltersPage from '../../../screens/Explore/FiltersStack/FiltersPage';
import { AutoCompleteFiltri } from '../../../shared/components/AutoCompleteFiltri';

const FiltersModal = createStackNavigator(
  {
    FiltersPage,
    AutoComplete: AutoCompleteFiltri,
  },
  {
    mode: 'modal',
  },
);

FiltersModal.navigationOptions = ({ navigation }) => {
  return {
    headerShown: false,
  };
};

export default FiltersModal;
