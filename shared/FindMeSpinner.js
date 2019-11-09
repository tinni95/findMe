import { ActivityIndicator, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import React from "react";

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
  color: "blue"
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "flex-start"
  }
});

export default FindMeSpinner;
