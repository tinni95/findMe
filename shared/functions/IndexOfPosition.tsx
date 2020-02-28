var _ = require("lodash");

export const indexOfPosition = (positions, position) => {
  let toReturn = -1;
  positions.forEach((temp, index) => {
    if (_.isEqual(temp, position)) {
      toReturn = index;
    }
  });
  return toReturn;
};
