const getHiddenString = (hidden:boolean, nome:string, cognome:string) => {
	{
		return hidden ? nome + " " + cognome.substring(0, 1) + "." : nome;
	}
};

export default getHiddenString;
