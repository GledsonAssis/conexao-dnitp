const disciplineSubjectParser = ({ id, description, idDiscipline }) => ({
  id: id.toString(),
  idDiscipline,
  label: description,
  selected: false,
  value: description,
});

export default disciplineSubjectParser;
