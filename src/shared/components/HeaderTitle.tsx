import React, { FunctionComponent } from "react";

import { Body } from "../components/StyledText";

type HeaderProps = {
  text: string;
};

const HeaderTitle: FunctionComponent<HeaderProps> = ({ text }) => (
	<Body style={{ fontSize: 30, margin: 10, marginLeft: 20 }}>{text}:</Body>
);

export default HeaderTitle;
