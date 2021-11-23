/**
 * Map item to be suported by Select as a valid option
 *
 * Required to have props:
 * @property id
 *
 * @param {object} req the actual {option} to be parsed
 * @param {object} res the value of (if any) selected option
 * @param {string} res the property with the value of the final object
 * @param {string} res the property with the label of the final object
 *
 * @returns {object}
 */
export default (option, idsSelected = [], valueName = 'id', labelName = 'name') => ({
  ...option,
  id: option.id,
  label: option[labelName],
  selected: idsSelected.includes(option[valueName]),
  value: option[valueName],
});
