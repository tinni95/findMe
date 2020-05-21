const moment = require('moment');

export const reOrderApplications = (applications: any) => {
  return applications.sort((a: any, b: any) => {
    console.log(a.messages.length);
    let date1 = moment(a.messages[a.messages.length - 1].createdAt);
    let date2 = moment(b.messages[b.messages.length - 1].createdAt);
    return date2.diff(date1);
  });
};
