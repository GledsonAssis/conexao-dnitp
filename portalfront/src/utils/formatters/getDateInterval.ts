import moment from 'moment';

const getDateinterval = (interval) => {
  switch (interval) {
    case 'anytime':
      return moment().subtract('30', 'years').toDate();
    case 'last7Days':
      return moment().subtract('7', 'days').toDate();
    case 'last30Days':
      return moment().subtract('30', 'days').toDate();
    case 'last12Months':
      return moment().subtract('12', 'months').toDate();
    default:
      return moment().toDate();
  }
};

export default getDateinterval;
