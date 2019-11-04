import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer } from 'react-relay';
import { View } from 'react-native';

import FindMeSpinner from './FindMeSpinner';
import FindMeGraphQlErrorDisplay from './FindMeGraphQlErrorDisplay';

import environment from './environment';

class FindMeRelayQueryRenderer extends Component {
  render() {
    const { query, variables } = this.props;

    return (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={variables}
        render={this.queryRender}
      />
    );
  }

  queryRender = ({ error, props, retry }) => {
    if (error) return <FindMeGraphQlErrorDisplay />;
    if (!props) {
      return this.props.hideSpinner ? <View /> : <FindMeSpinner />;
    }
    return this.props.render({ error, props, retry });
  };
}

FindMeRelayQueryRenderer.propTypes = {
  query: PropTypes.any.isRequired,
  variables: PropTypes.object,
  render: PropTypes.func.isRequired,
  hideSpinner: PropTypes.bool
};

FindMeRelayQueryRenderer.defaultProps = {
  hideSpinner: false
};
export default FindMeRelayQueryRenderer;
