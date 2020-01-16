import { ActivityIndicator, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import Colors from "../constants/Colors";

const FindMeSpinner = ({ color }) => (
  <ActivityIndicator
    color={color}
    size="large"
    style={styles.activityIndicator}
  />
);

FindMeSpinner.propTypes = {
  color: PropTypes.string
};

FindMeSpinner.defaultProps = {
  color: Colors.ocean
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center"
  }
});

export default FindMeSpinner;
