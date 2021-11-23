import i18n from '../../i18n';

const schoolYearParser = ({ icon, id, idSubTheme, ordinal, startYear, color }) => ({
  color,
  icon,
  id: id.toString(),
  label: idSubTheme.toString(),
  labelSelect: i18n.t('Home.selectYear', { year: ordinal.toString() }),
  ordinal,
  startYear,
  value: id.toString(),
});

export default schoolYearParser;
