const parseItem = ({
  id,
  date,
  description,
  endDate,
  isCover,
  isPublished,
  summary,
  title,
}) => ({
  id,
  date,
  description,
  endDate: endDate || undefined,
  isCover,
  isPublished,
  summary,
  title,
});

export default (data) => {
  const cover = data.find(item => item.isCover === true);
  return {
    cover: cover ? parseItem(cover) : undefined,
    list: data
      .filter(item => item.isCover === false)
      .map(parseItem),
  };
};
