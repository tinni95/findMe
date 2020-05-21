import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import { isSmallDevice } from '../constants/Layout';
const labels = ['Presentazione', 'Posizioni', 'Anteprima'];
const customStyles = {
  stepStrokeCurrentColor: '#10476C',
  stepStrokeFinishedColor: '#10476C',
  stepStrokeUnFinishedColor: '#707070',
  stepStrokeWidth: 1.5,
  separatorFinishedColor: '#10476C',
  separatorUnFinishedColor: '#707070',
  stepIndicatorFinishedColor: 'white',
  stepIndicatorUnFinishedColor: 'white',
  stepIndicatorLabelUnFinishedColor: 'grey',
  stepIndicatorLabelCurrentColor: 'black',
  stepIndicatorLabelFinishedColor: '#707070',
  labelColor: '#707070',
  labelSize: isSmallDevice ? 10 : 12,
  currentStepLabelColor: '#10476C',
};

export const StepsIndicator = ({ active, navigation: { navigate } }) => {
  return (
    <StepIndicator
      onPress={(step) => {
        {
          if (step == active) {
            null;
          } else if (step == 0) {
            navigate('Presentazione');
          } else if (step == 1) {
            navigate('Posizioni');
          } else {
            navigate('Anteprima');
          }
        }
      }}
      stepCount={3}
      currentPosition={active}
      labels={labels}
      customStyles={customStyles}
    />
  );
};
