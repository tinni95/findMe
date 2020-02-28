const moment = require("moment");

const getAge = DoB => {
  const birthday = moment(DoB, "DD-MM-YYYY");
  return moment().diff(birthday, "years");
};

export default getAge;
