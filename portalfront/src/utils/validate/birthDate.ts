import moment from 'moment';

const validateBirthDate = (birthDate: moment.MomentInput) => moment().diff(birthDate, 'years') > 12;

export default validateBirthDate;
