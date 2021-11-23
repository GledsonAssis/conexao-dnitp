import onlyNumbers from '../formatters/onlyNumbers';

const phonesParser = (phones: string[]) => phones && phones
  .filter((phone: string) => phone !== undefined)
  .map((item: string) => ({
    DDD: onlyNumbers(item).substring(0, 2),
    number: onlyNumbers(item).substring(2),
  }));

export default phonesParser
