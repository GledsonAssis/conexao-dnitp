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
  endDate: type === 'customDate' ? arrDate[1] : moment().toDate(),
  keyword,
  startDate: type === 'customDate' ? arrDate[0] : getDateInterval(type),
});

export default generalSearchParser;
