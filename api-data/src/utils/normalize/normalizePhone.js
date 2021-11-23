import onlyNumbers from '../formatters/onlyNumbers';

const normalizePhone = (value) => {
  if (!value) {
    return value;
  }

  const onlyNums = onlyNumbers(value.toString());

  if (onlyNums.length <= 2) {
    return onlyNums;
  }

  if (onlyNums.length === 3) {
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`;
  }

  if (onlyNums.length <= 7) {
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}`;
  }

  if (onlyNums.length <= 10) {
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 6)}-${onlyNums.slice(6, 10)}`;
  }

  return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7, 11)}`;
};

export default normalizePhone;
