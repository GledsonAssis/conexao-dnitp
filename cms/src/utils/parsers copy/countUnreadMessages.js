export default (messages) => {
  const unreadMessages = messages.filter(({ unread }) => unread).length;
  return unreadMessages <= 100 ? unreadMessages : 99;
};
