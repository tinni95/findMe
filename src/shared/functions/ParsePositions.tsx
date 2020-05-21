export const parsePositions = (positions:any) => {
	return positions.map((position:any) => {
		return {
			titolo: position.title,
			type: "Socio",
			descrizione: position.description,
			requisiti: { set: position.requisiti }
		};
	});
};

export const parsePositionsLocal = (positions:any) => {
	return positions.map((position:any) => {
		return {
			titolo: position.title,
			type: "Socio",
			descrizione: position.description,
			requisiti: position.requisiti
		};
	});
};
