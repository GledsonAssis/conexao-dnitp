import dateFormatter from '../formatters/dateFormatter';

const projectActionItemParser = ({ id, idProject, date, description, shortDescription, title, project }) => ({
  id,
  idProject,
  date,
  description,
  formattedDate: dateFormatter(date),
  shortDescription,
  title,
  project,
});

export default projectActionItemParser;
