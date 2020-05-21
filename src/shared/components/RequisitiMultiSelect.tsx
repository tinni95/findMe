import React, { FunctionComponent } from "react";
import { View, TouchableOpacity } from "react-native";
import RequisitiPicker from "./RequisitiPicker";

type HeaderProps = {
  items: Array<string>;
  active: any;
  setActive: any;
};

const RequisitiMultiSelect: FunctionComponent<HeaderProps> = ({
	items,
	active,
	setActive
}) => {
	return (
		<View>
			{items.map((item, index) => {
				let selected = active.includes(index);
				return (
					<TouchableOpacity
						key={index}
						onPress={() =>
							selected
								? setActive(active.filter(i => i !== index))
								: setActive([...active, index])
						}
					>
						<RequisitiPicker text={item} selected={selected} />
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default RequisitiMultiSelect;
