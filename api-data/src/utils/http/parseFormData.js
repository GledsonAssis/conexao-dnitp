import { Form } from 'multiparty';

export default (req) => {
  const form = new Form({
    autoFields: true,
    autoFiles: true,
  });

  return new Promise((resolve, reject) => form.parse(req, (error, fields, files) => {
    if (error) {
      reject(error);
    } else {
      const {
        data,
        ...rest
      } = files;
      const body = {};

      Object.keys(fields).forEach((key) => {
        const {
          [key]: [
            result,
          ],
        } = fields;

        try {
          const parsed = JSON.parse(result);

          if (typeof parsed === 'number'
            || typeof parsed === 'object'
            || typeof parsed === 'boolean'
            || Array.isArray(parsed)
          ) {
            body[key] = parsed;
          } else {
            body[key] = result;
          }
        } catch (e) {
          body[key] = result;
        }
      });

      resolve({
        body,
        files: data,
        ...rest,
      });
    }
  }));
};
