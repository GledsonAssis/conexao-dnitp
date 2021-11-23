import Mimes from '../../services/general/Mime';

import getExtension from './getExtension';
import readFile from './readFile';

const parseFileBinary = (optional = {}) => async (value) => {
  const {
    headers,
    originalFilename: filename,
    path,
  } = value;
  const contentType = headers['content-type'];
  const extension = getExtension(path);
  const {
    id: idMime,
  } = await Mimes.find(extension, contentType);

  const file = await readFile(path);

  return {
    ...optional,
    idMime,
    file,
    name: filename,
  };
};

export default parseFileBinary;
