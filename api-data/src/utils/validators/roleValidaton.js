export default (idRole, categories) => {
  const alowedRoles = [4, 5, 6, 7, 10];
  if (!alowedRoles.includes(idRole) && categories === '"all"') {
    return '"projects", "courses", "projectActions"';
  }
  return categories;
};
