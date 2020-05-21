const moment = require('moment');

const getAge = (DoB: Date) => {
  const birthday = moment(DoB, 'DD-MM-YYYY');
  return moment().diff(birthday, 'years');
};

export default getAge;
