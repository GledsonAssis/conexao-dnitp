import { anonimo } from '../../infra/constants/profileRoles';

const userLogger = (user: { role: { id: number } }) => user && user.role && user.role.id !== anonimo;

export default userLogger;
