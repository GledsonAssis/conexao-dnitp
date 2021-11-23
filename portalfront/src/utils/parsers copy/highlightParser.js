import typeParser from './typeParser';

const highlightParser = ({
  id,
  date,
  description,
  endDate,
  summary,
  position,
  title,
  type,
  imageId,
  imageName,
  extra,
}) => ({
  id,
  content: summary,
  date,
  endDate,
  description,
  position,
  title,
  type,
  imageAlt: imageName || '',
  imageUrl: imageId ? `${window._env.REACT_APP__DATA_API_URL}/${typeParser(type)}/images/${imageId}` : '',
  extra,
});

export default highlightParser;
