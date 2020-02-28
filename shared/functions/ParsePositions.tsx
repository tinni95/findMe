export const parsePositions = positions => {
  return positions.map(position => {
    return {
      ...position,
      requisiti: { set: position.requisiti }
    };
  });
};
