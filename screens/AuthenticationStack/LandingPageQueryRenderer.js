import React from "react";
import FindMeRelayQueryRenderer from "../../shared/relay/FindMeRelayQueryRenderer";
import LandingPage from "./LandingPage";
import environment from "../../shared/relay/environment";

export default class LandingPageQueryRenderer extends React.Component {

    render() {
        return (
            <FindMeRelayQueryRenderer
                environment={environment}
                query={graphql`
                    query LandingPageQueryRendererQuery {
                        currentUser{
                            id
                        }
                    }
                `}
                render={this.queryRender}
            />
        )
    }
    queryRender = ({ props: { currentUser: { id } } }) => {
        if (id) this.props.navigation.navigate("MainTabNavigator")
        else
            return <LandingPage />;
    };
}

LandingPageQueryRenderer.navigationOptions = {
    header: null,
};
