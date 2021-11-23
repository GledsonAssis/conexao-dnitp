import onlyNumbers from '../formatters/onlyNumbers';

const validateCellphone = (value: any) => onlyNumbers(value).length === 11;

export default validateCellphone;
