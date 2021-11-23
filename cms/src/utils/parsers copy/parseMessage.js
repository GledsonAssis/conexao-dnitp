import moment from 'moment';
import countDaysFromToday from '../formatters/countDaysFromToday';
import dateFormatter from '../formatters/dateFormatter';

const URL = window._env.REACT_APP__DATA_API_URL;

const mapReply = ({ id, dateTime, replyFrom, text }) => ({
  id,
  dateFormatted: countDaysFromToday(dateTime),
  dateTime: dateFormatter(dateTime),
  replyFrom: replyFrom && {
    ...replyFrom,
    imageUri: `${URL}/users/avatar/${replyFrom.id}?${new Date()}`,
  },
  text,
});

const reduceRecipients = (accum, current, index, array) =>
  `${accum} ${current.name}${array.length > index + 1 ? ', ' : ''}`;

export default ({
  id,
  dateTimeLastResponse,
  from,
  recipient,
  reply = [],
  subject,
  type,
  status,
  messageAttachments,
  unread,
}) => ({
  id,
  dateTimeLastResponse: countDaysFromToday(dateTimeLastResponse),
  from: {
    ...from,
    imageUri: `${URL}/users/avatar/${from.id}?${new Date()}`,
  },
  recipient,
  recipientShort: Array.isArray(recipient) ? recipient.reduce(reduceRecipients, '') : recipient.name,
  reply: reply.sort((a, b) => moment(a.dateTime) - moment(b.dateTime)).map(mapReply),
  subject,
  type,
  status,
  messageAttachments,
  unread,
});
