const getCategoriesList = ({ projects, actions, courses, projectActions }) => {
  if (actions && projects && courses && projectActions) {
    return ['all'];
  }

  const list = [];

  if (projects) {
    list.push('projects');
  }
  if (actions) {
    list.push('actions');
  }
  if (courses) {
    list.push('courses');
  }
  if (projectActions) {
    list.push('projectActions');
  }
  return list.length > 0 ? list : ['projects', 'courses', 'projectActions'];
};

export default getCategoriesList;
