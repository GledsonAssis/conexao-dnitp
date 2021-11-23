import dateFormatter from '../formatters/dateFormatter';

const parseItems = ({ date, ...rest }) => ({
  ...rest,
  date,
  formattedDate: dateFormatter(date),
});

export default parseItems;
