const monthDic:any = {
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
	Dic: 12,
};

export const sortEsperienze = (esperienza:any) => {
	return esperienza.sort((a:any, b:any) => {
		if (a.dataFine === "In Corso") {
			return 0 - 1;
		}
		if (b.dataFine === "In Corso") {
			return 1 - 0;
		}
		const year1 = parseInt(a.dataFine.split(" ")[1]);
		const year2 = parseInt(b.dataFine.split(" ")[1]);
		if (year1 != year2) {
			return year2 - year1;
		}
		const date1 = monthDic[a.dataFine.split(" ")[2]];
		const date2 = monthDic[b.dataFine.split(" ")[2]];
		return date2 - date1;
	});
};
