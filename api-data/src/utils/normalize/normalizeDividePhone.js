import onlyNumbers from '../formatters/onlyNumbers';

const normalizeDividePhone = (value) => {
  const onlyNums = onlyNumbers(value.toString());

  if (onlyNums.length <= 2) {
    return { idPhoneType: 2, DDD: '', number: +onlyNums };
  }

  if (onlyNums.length <= 10 && onlyNums.split('')[2] !== 9) {
    return { idPhoneType: 2, DDD: onlyNums.slice(0, 2), number: +onlyNums.slice(2) };
  }

  return { idPhoneType: 1, DDD: onlyNums.slice(0, 2), number: +onlyNums.slice(2) };
};

export default normalizeDividePhone;
