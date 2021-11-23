const disciplineParser = ({ id, name, color, icon }) => ({
  id: id.toString(),
  label: name,
  color,
  icon,
});

export default disciplineParser;
