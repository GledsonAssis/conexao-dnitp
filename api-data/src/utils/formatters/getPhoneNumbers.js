import normalizePhone from '../normalize/normalizePhone';

const CELLPHONE = 1;
const PHONE = 2;

const getFullNumber = ({ DDD, number }) => `${DDD}${number}`;

const findPhone = (phones, phoneType) => phones.find(
  ({ idPhoneType }) => idPhoneType === phoneType,
);

export default (phones) => {
  const phone = findPhone(phones, PHONE);
  const cellphone = findPhone(phones, CELLPHONE);

  return {
    residential: {
      id: phones.length
        && phone
        ? phone.id
        : undefined,
      number: phones
        && phone
        ? normalizePhone(getFullNumber(phone))
        : '',
    },
    cellphone: {
      id: phones.length
        && cellphone
        ? cellphone.id
        : '',
      number: cellphone
        && CELLPHONE
        ? normalizePhone(getFullNumber(cellphone))
        : '',
    },
  };
};
