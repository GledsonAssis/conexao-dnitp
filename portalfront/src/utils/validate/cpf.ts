const sumPositionsMultiplication = (positionsArray: any[], multiplier: number) =>
  positionsArray.reduce(
    (acc: number, item: string, index: number) => acc + parseInt(item, 10) * (multiplier - index),
    0,
  );

const calculateReminder = (sum: number) => (sum * 10) % 11;

const adjustReminderIfNeeded = (remainder: number) => (remainder === 10 || remainder === 11 ? 0 : remainder);

const validateCPF = (strCPF: string) => {
  let sum = 0;
  let remainder: number;
  const cpfOnlyNums = strCPF.replace(/[^\d]/g, '');

  if (cpfOnlyNums === '00000000000' || cpfOnlyNums.length !== 11) {
    return false;
  }

  if (cpfOnlyNums.split(cpfOnlyNums[0]).length === 12) {
    return false;
  }

  const arrayCPF = [...cpfOnlyNums];

  sum = sumPositionsMultiplication(arrayCPF.slice(0, 9), 10);

  remainder = calculateReminder(sum);
  remainder = adjustReminderIfNeeded(remainder);

  if (remainder !== parseInt(arrayCPF[9], 10)) {
    return false;
  }

  sum = sumPositionsMultiplication(arrayCPF.slice(0, 10), 11);
  remainder = calculateReminder(sum);
  remainder = adjustReminderIfNeeded(remainder);

  if (remainder !== parseInt(arrayCPF[10], 10)) {
    return false;
  }

  return true;
};

export default validateCPF;
