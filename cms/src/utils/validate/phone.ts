import onlyNumbers from '../formatters/onlyNumbers';

const validatePhone = (value: any) => onlyNumbers(value).length === 10;

export default validatePhone;
