const getHiddenString = (hidden, nome, cognome) => {
  {
    return hidden
      ? nome + " " + cognome.substring(0, 1) + "."
      : nome + " " + cognome;
  }
};

export default getHiddenString;
