const searchParametersParser = categories => `"${categories.join('","')}"`;

const alowedRoles = [4, 5, 6, 7, 10];

export default (categories, idRole) => {
  const parsedParameters = searchParametersParser(categories);

  if (!alowedRoles.includes(idRole) && categories.indexOf('all') > -1) {
    return '"projects","courses","projectActions"';
  }

  return parsedParameters;
};
