import { anonimo, infantil, naoConfirmado } from '../../infra/constants/profileRoles';

const userLogger = (user: { role: { id: number } }) => user && user.role && ![anonimo, infantil, naoConfirmado].includes(user.role.id);

export default userLogger;
