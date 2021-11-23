import Mime from '../../models/general/Mime';

let mimes = [];

/**
* Find in memory the mime by extension and content-type header.
*
* @param {String} extension
* @param {String} contentType

* @return {object}
*/
const find = (extension, contentType) => mimes
  .find(mime => mime.suffix.toLowerCase() === extension.toLowerCase());

const load = () => Mime
  .findAll()
  .then((result) => {
    mimes = result;
  });

export default {
  find,
  load,
};
