import { EnvsConfig } from '@/infra/config/envs.config';
import onlyNumbers from '../formatters/onlyNumbers';
import normalizePhone from '../normalize/normalizePhone';

const URL = EnvsConfig.apiServicoDnit();

const DEFAULT_PHONES = [
  {
    idPhoneType: 1,
  },
  {
    idPhoneType: 2,
  },
];

const parsePhone = (phones: any[]) =>
  phones.map(({ DDD, fullNumber = '', number, ...rest }) => ({
    ...rest,
    DDD,
    number,
    fullNumber: fullNumber || normalizePhone(`${DDD}${number}`),
  }));

export const userNewPhones = (phones: any[]) =>
  phones
    .filter(({ fullNumber = '' }) => fullNumber.length > 0)
    .map(({ fullNumber, ...rest }) => ({
      ...rest,
      DDD: onlyNumbers(fullNumber).substring(0, 2),
      number: Number(onlyNumbers(fullNumber).substring(2)),
    }));

export const userParser = ({ id, phones = DEFAULT_PHONES, imageSrc = null, ...rest }) => {
  const userPhones = DEFAULT_PHONES;

  userPhones[0] = {
    ...userPhones[0],
    ...phones.find((obj) => obj.idPhoneType === 1),
  };
  userPhones[1] = {
    ...userPhones[1],
    ...phones.find((obj) => obj.idPhoneType === 2),
  };

  return {
    id,
    phones: parsePhone(userPhones),
    imageUri: imageSrc,
    ...rest,
  };
};

export default userParser;
