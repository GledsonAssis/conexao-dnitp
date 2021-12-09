import moment from 'moment';
import getDateInterval from '../formatters/getDateInterval';
import getCategoriesList from '../formatters/getCategoriesList';

const generalSearchParser = ({
  advancedSearch: {
    categories,
    interval: { arrDate, type },
  },
  keyword,
}) => ({
  categories: getCategoriesList(categories),
  endDate: type === 'customDate' ? moment(arrDate[1], 'DD/MM/YYYY').toISOString() : moment().toDate(),
  keyword,
  startDate: type === 'customDate' ? moment(arrDate[0], 'DD/MM/YYYY').toISOString() : getDateInterval(type),
});

export default generalSearchParser;
