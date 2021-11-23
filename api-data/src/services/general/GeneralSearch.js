import generalSearch from '../../procedures/generalSearch';

const find = ({
  categories,
  endDate,
  keyword,
  startDate,
}) => generalSearch({
  categories,
  endDate,
  keyword: keyword || '',
  startDate,
});

export default {
  find,
};
