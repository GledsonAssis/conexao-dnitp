export default (req, res, next) => {
  const {
    method,
    url,
  } = req;

  console.info(method, url); // eslint-disable-line no-console
  next();
};
