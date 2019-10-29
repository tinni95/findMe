import React from 'react';
import FindMeRelayQueryRenderer from '../../shared/relay/FindMeRelayQueryRenderer';
import ProfilePage from './ProfilePage';
import environment from '../../shared/relay/environment';

export default class ProfilePageQueryRenderer extends React.Component {
  render() {
    return (
      <FindMeRelayQueryRenderer
        environment={environment}
        query={graphql`
          query ProfilePageQueryRendererQuery {
            currentUser {
              email
            }
          }
        `}
        render={this.queryRender}
      />
    );
  }

  queryRender = ({ props: { currentUser } }) => {
    return <ProfilePage navigation={this.props.navigation} user={currentUser} />;
  };
}

ProfilePageQueryRenderer.navigationOptions = {
  header: null
};
