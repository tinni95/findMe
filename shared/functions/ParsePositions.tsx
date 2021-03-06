export const parsePositions = positions => {
  return positions.map(position => {
    return {
      titolo: position.title,
      type: "Socio",
      descrizione: position.description,
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
      requisiti: position.requisiti
    };
  });
};
