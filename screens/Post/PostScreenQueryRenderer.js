import React from "react";
import FindMeRelayQueryRenderer from "../../shared/relay/FindMeRelayQueryRenderer";
import PostScreen from "./PostScreen";
import environment from "../../shared/relay/environment";

export default class PostScreenQueryRenderer extends React.Component {
    render() {
        return (
            <FindMeRelayQueryRenderer
                environment={environment}
                query={graphql`
                    query PostScreenQueryRendererQuery($postId: ID!) {
                        singlePost(id: $postId) {
                            description
                            title
                            comune
                            regione
                            positions{
                                title
                                available
                                field
                            }
                        }
                    }
                `}
                variables={{
                    postId: this.props.navigation.getParam("id"),
                }}
                render={this.queryRender}
            />
        )
    }
    queryRender = ({ props: { singlePost } }) => {
        return <PostScreen post={singlePost} />;
    };
}


