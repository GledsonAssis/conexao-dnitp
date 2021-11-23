const getTranslatedRoutes = (t: any, path: any) => (acc: any) => {
  if (path) {
    const currentPath = path.replace(/:/gi, '');
    acc[path] = t(`general:Routes.${String(currentPath)}`);
  }
  return acc;
};

export default getTranslatedRoutes;
