/* eslint-disable relay/unused-fields */

import React from "react";
import { render } from "react-native-testing-library";
import { graphql, QueryRenderer } from "react-relay";
import { View } from "react-native";

import FindMeSpinner from "./FindMeSpinner";

import environment from "./environment";
import FindMeRelayQueryRenderer from "./FindMeRelayQueryRenderer";

describe("FindMeRelayQueryRenderer", () => {
    it("is defined", () => {
        expect(FindMeRelayQueryRenderer).toBeDefined();
        expect(FindMeRelayQueryRenderer).not.toEqual({});
    });

    describe("render", () => {
        describe("given some valid props", () => {
            const props = {
                render: jest.fn(),
                variables: {},
            };
            var rendered;
            beforeEach(() => {
                rendered = render(
                    <FindMeRelayQueryRenderer
                        query={graphql`
                            query FindMeRelayQueryRendererTestQuery {
                              postsFeed{id}
                            }
                        `}
                        {...props}
                    />
                );
            });

            it("renders", () => {
                expect(rendered).toBeTruthy();
            });

            describe("QueryRenderer", () => {
                var queryRenderer;
                beforeEach(() => {
                    queryRenderer = rendered.getByType(QueryRenderer);
                });

                it("sets the query prop", () => {
                    expect(queryRenderer.props.query).toBeTruthy();
                });

                it("sets the environment prop to the relay environment", () => {
                    expect(queryRenderer.props.environment).toEqual(
                        environment
                    );
                });

                it("sets the variables from props", () => {
                    expect(queryRenderer.props.variables).toEqual(
                        props.variables
                    );
                });
            });
        });
    });

    describe("queryRender", () => {
        const baseProps = {
            render: jest.fn(() => "component"),
        };

        describe("whilst the query is being processed and we want a spinner", () => {
            const props = {
                ...baseProps,
            };
            var queryRender;
            beforeEach(() => {
                const component = new FindMeRelayQueryRenderer(props);
                queryRender = component.queryRender;
            });

            const param = {
                error: null,
                retry: null,
                props: null,
            };

            it("renders a spinner", () => {
                const rendered = render(queryRender(param));

                expect(rendered.toJSON()).toBeTruthy();
                expect(rendered.getByType(FindMeSpinner)).toBeTruthy();
            });
        });

        describe("whilst the query is being processed and we don't want a spinner", () => {
            const props = {
                ...baseProps,
                hideSpinner: true,
            };
            var queryRender;
            beforeEach(() => {
                const component = new FindMeRelayQueryRenderer(props);
                queryRender = component.queryRender;
            });

            const param = {
                error: null,
                retry: null,
                props: null,
            };

            it("it renders an empty View", () => {
                const rendered = render(queryRender(param));

                expect(rendered.toJSON()).toBeTruthy();
                expect(rendered.getByType(View)).toBeTruthy();
            });
        });

        describe("when the query response is successful", () => {
            const props = {
                ...baseProps,
            };
            var queryRender;
            beforeEach(() => {
                const component = new FindMeRelayQueryRenderer(props);
                queryRender = component.queryRender;
            });

            const param = {
                error: null,
                retry: jest.fn(),
                props: {},
            };

            it("invokes the supplied render method", () => {
                const result = queryRender(param);
                expect(props.render).toHaveBeenCalledWith(param);
                expect(result).toEqual(props.render());
            });
        });
    });
});
