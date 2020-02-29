export const parsePositions = positions => {
  return positions.map(position => {
    console.log(position);
    return {
      titolo: position.title,
      type: "Socio",
      descrizione: position.description,
      settore: position.field,
      requisiti: { set: position.requisiti }
    };
  });
};

export const parsePositionsLocal = positions => {
  return positions.map(position => {
    return {
      titolo: position.title,
      type: "Socio",
      descrizione: position.description,
      settore: position.field,
      requisiti: position.requisiti
    };
  });
};
