const dict:any = {
	Gen: 1,
	Feb: 2,
	Mar: 3,
	Apr: 4,
	Mag: 5,
	Giu: 6,
	Lug: 7,
	Ago: 8,
	Set: 9,
	Ott: 10,
	Nov: 11,
	Dic: 12
};

export const invalidDate = (startDate:any, endDate:any) => {
	const startYear = startDate.split(" ")[1];
	const startMonth = dict[startDate.split(" ")[0]];
	const endMonth = dict[endDate.split(" ")[0]];
	const endYear = endDate.split(" ")[1];

	return (
		startYear > endYear ||
	(startYear == endYear && startMonth > endMonth) ||
	false
	);
};
