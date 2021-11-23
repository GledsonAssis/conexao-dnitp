export default ({
  headers: {
    Authorization,
    authorization,
  },
}) => {
  let result;

  const bearerHeader = Authorization || authorization;
  if (bearerHeader) {
    const parts = bearerHeader.split(' ');
    if (parts.length === 2) {
      const [
        scheme,
        token,
      ] = parts;

      if (/^Bearer$/i.test(scheme)) {
        result = token;
      }
    }
  }

  return result;
};
