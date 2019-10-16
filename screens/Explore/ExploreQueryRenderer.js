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
                        ...PostCard_post
                        }
                    }
                `}
                render={this.queryRender}
            />
        )
    }
    queryRender = ({ props: { postsFeed } }) => {
        return <Explore posts={postsFeed} />;
    };
}



ExploreQueryRenderer.navigationOptions = {
    header: null,
};
