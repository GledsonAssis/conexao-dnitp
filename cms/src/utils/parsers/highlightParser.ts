import typeParser from './typeParser';
import getPathName from '../formatters/getPathName';
import { EnvsConfig } from '@/infra/config/envs.config';

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
  imageUrl: imageId ? `${EnvsConfig.apiServicoDnit()}/${typeParser(type)}/images/${imageId}` : '',
  extra,
  icon: `icon_${typeParser(type)}.svg`,
  detailsUrl: `${getPathName({ type: typeParser(type), id, extra: extra.trim() })}`,
});

export default highlightParser;
