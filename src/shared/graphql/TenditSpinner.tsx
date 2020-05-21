import { ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../constants/Colors';

const TenditSpinner = ({ color }) => (
  <ActivityIndicator color={color} size="large" style={styles.activityIndicator} />
);

TenditSpinner.propTypes = {
  color: PropTypes.string,
};

TenditSpinner.defaultProps = {
  color: Colors.ocean,
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default TenditSpinner;
