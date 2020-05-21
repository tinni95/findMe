var _ = require('lodash');

export const indexOfPosition = (positions: any, position: any) => {
  let toReturn = -1;
  positions.forEach((temp: any, index: number) => {
    if (_.isEqual(temp, position)) {
      toReturn = index;
    }
  });
  return toReturn;
};
