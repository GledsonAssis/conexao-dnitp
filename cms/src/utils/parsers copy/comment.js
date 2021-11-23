import countDaysFromToday from '../formatters/countDaysFromToday';
import Session from '../Session';

const URL = window._env.REACT_APP__DATA_API_URL;

const parseComment =
  (idUser) =>
  ({ id, idParent, author: { id: idAuthor, name }, comment, dateTime }) => ({
    id,
    idAuthor,
    idParent,
    idUser,
    canRemove: idAuthor === idUser,
    date: dateTime,
    dateFormated: countDaysFromToday(dateTime),
    imageUri: `${URL}/users/avatar/${idAuthor}?${new Date()}`,
    text: comment,
    userName: name,
  });

export default (comment) => {
  const { id: idUser } = Session.getUser();

  return {
    ...parseComment(idUser)(comment),
    replies: comment.replies ? comment.replies.map(parseComment(idUser)) : [],
  };
};
