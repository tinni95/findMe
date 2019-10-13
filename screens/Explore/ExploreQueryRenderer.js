import React from "react";
import FindMeRelayQueryRenderer from "../../shared/relay/FindMeRelayQueryRenderer";
import Explore from "./Explore";
import environment from "../../shared/relay/environment";

export default class ExploreQueryRenderer extends React.Component {

    render() {
        return (
            <FindMeRelayQueryRenderer
                environment={environment}
                query={graphql`
                    query ExploreQueryRendererQuery {
                      postsFeed{
                        id
                      }
                    }
                `}
                render={this.queryRender}
            />
        )
    }
    queryRender = ({ props: { posts } }) => {
        return <Explore posts={posts} />;
    };
}



Explore.navigationOptions = {
    header: null,
};
