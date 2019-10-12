import React from "react";
import { render } from "react-native-testing-library";

import FindMeGraphQlErrorDisplay from "./FindMeGraphQlErrorDisplay";

describe("FindMeGraphQlErrorDisplay", () => {
    describe("with no non-default props", () => {
        it("renders successfully to match snapshot", () => {
            const rendered = render(<FindMeGraphQlErrorDisplay />);
            expect(rendered.toJSON()).toBeTruthy();
            expect(rendered.toJSON()).toMatchSnapshot();
        });
    });
});
